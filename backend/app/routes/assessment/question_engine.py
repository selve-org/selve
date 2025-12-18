"""
Assessment Module - Question Engine

Handles all question-related operations:
- Question type detection and configuration
- Context-aware filtering (demographics-based exclusions)
- Adaptive question selection
- Batch management
- Consistency check injection

This centralizes the complex question selection logic.
"""

import logging
from typing import Dict, List, Optional, Any, Tuple, Set
from datetime import datetime

from app.adaptive_testing import AdaptiveTester
from app.scoring import SelveScorer

from .constants import (
    DIMENSIONS,
    DEMOGRAPHIC_QUESTIONS,
    DEMOGRAPHIC_QUESTION_ORDER,
    LIKERT_5_LABELS,
    LIKERT_7_OPTIONS,
    AssessmentConfig,
    ContextExclusions,
    DeduplicationRules,
)
from .schemas import QuestionResponse

logger = logging.getLogger(__name__)


class QuestionEngine:
    """
    Manages question selection, filtering, and formatting.
    
    Responsibilities:
    - Determine question type and render config based on item code
    - Filter questions based on user demographics
    - Apply deduplication rules
    - Handle emergency coverage for zero-item dimensions
    - Inject consistency check questions
    """
    
    def __init__(self, tester: AdaptiveTester, scorer: SelveScorer):
        self.tester = tester
        self.scorer = scorer
    
    # ========================================================================
    # Question Type Detection
    # ========================================================================
    
    def get_question_type_and_config(self, item_code: str) -> Tuple[str, Dict[str, Any]]:
        """
        Generate question type and renderConfig based on item code's scale range.
        
        Scale Detection:
        - Big Five items (E, N, A, C, O + digit): 1-5 scale (horizontal slider)
        - 16PF Dominance items (D + digit): 1-5 scale (horizontal slider)
        - HEXACO items (all others): 1-7 scale (vertical radio buttons)
        
        Args:
            item_code: Question item code (e.g., "E1", "LUMEN_SC1")
            
        Returns:
            Tuple of (question_type, render_config)
        """
        # 16PF Dominance items (D): 1-5 scale
        if item_code.startswith('D') and len(item_code) > 1 and item_code[1:].isdigit():
            return self._get_5_point_config()
        
        # Big Five items (E, N, A, C, O - single letter + digit): 1-5 scale
        if (len(item_code) >= 2 and 
            item_code[0] in ['E', 'N', 'A', 'C', 'O'] and 
            item_code[1:].isdigit()):
            return self._get_5_point_config()
        
        # HEXACO items: 1-7 scale (vertical radio)
        return self._get_7_point_config()
    
    def _get_5_point_config(self) -> Tuple[str, Dict[str, Any]]:
        """Get config for 5-point Likert scale (slider)."""
        return ("scale-slider", {
            "min": 1,
            "max": 5,
            "step": 1,
            "labels": LIKERT_5_LABELS,
        })
    
    def _get_7_point_config(self) -> Tuple[str, Dict[str, Any]]:
        """Get config for 7-point scale (radio buttons)."""
        return ("radio", {
            "options": LIKERT_7_OPTIONS,
        })
    
    # ========================================================================
    # Question Formatting
    # ========================================================================
    
    def format_question(self, item: Dict[str, Any]) -> QuestionResponse:
        """
        Format a raw item dict into a QuestionResponse.
        
        Args:
            item: Raw item from the item pool
            
        Returns:
            Formatted QuestionResponse
        """
        question_type, render_config = self.get_question_type_and_config(item["item"])
        
        return QuestionResponse(
            id=item["item"],
            text=item["text"],
            dimension=item.get("dimension", "UNKNOWN"),
            type=question_type,
            isRequired=True,
            renderConfig=render_config,
        )
    
    def format_questions(self, items: List[Dict[str, Any]]) -> List[QuestionResponse]:
        """Format multiple items into QuestionResponses."""
        return [self.format_question(item) for item in items]
    
    def get_demographic_questions(self) -> List[QuestionResponse]:
        """Get all demographic questions in order."""
        return [
            QuestionResponse(**DEMOGRAPHIC_QUESTIONS[q_id])
            for q_id in DEMOGRAPHIC_QUESTION_ORDER
        ]
    
    def get_demographic_question(self, question_id: str) -> Optional[QuestionResponse]:
        """Get a single demographic question by ID."""
        if question_id in DEMOGRAPHIC_QUESTIONS:
            return QuestionResponse(**DEMOGRAPHIC_QUESTIONS[question_id])
        return None
    
    # ========================================================================
    # Question Selection
    # ========================================================================
    
    def select_next_questions(
        self,
        responses: Dict[str, Any],
        demographics: Dict[str, Any],
        pending_questions: Set[str],
        max_items: int = AssessmentConfig.DEFAULT_BATCH_SIZE,
    ) -> List[Dict[str, Any]]:
        """
        Select the next batch of questions using adaptive algorithm.
        
        Handles:
        - Context-aware filtering (demographics)
        - Deduplication
        - Zero-item dimension emergency coverage
        - Consistency check injection
        
        Args:
            responses: Already answered questions
            demographics: User's demographic responses
            pending_questions: Questions sent but not yet answered
            max_items: Maximum questions to return
            
        Returns:
            List of item dicts for next questions
        """
        # Build exclusion list
        all_seen = set(responses.keys()) | pending_questions
        context_exclusions = ContextExclusions.get_exclusions_for_demographics(demographics)
        dedup_exclusions = DeduplicationRules.get_dedup_exclusions(responses, pending_questions)
        
        all_exclusions = all_seen | set(context_exclusions) | set(dedup_exclusions)
        
        # Log exclusions
        if context_exclusions:
            logger.debug(f"Context exclusions: {len(context_exclusions)} items")
        if dedup_exclusions:
            logger.debug(f"Dedup exclusions: {len(dedup_exclusions)} items")
        
        # Check for zero-item dimensions (critical priority)
        zero_dims = self._find_zero_item_dimensions(responses)
        
        if zero_dims:
            logger.warning(f"Zero-item dimensions detected: {zero_dims}")
            items = self._get_emergency_items(
                zero_dims, 
                responses, 
                all_exclusions,
                context_exclusions,
                max_items
            )
            if items:
                return items
        
        # Normal adaptive selection
        items = self.tester.select_next_items_excluding(
            responses, 
            all_exclusions, 
            max_items=max_items
        )
        
        # Final filter (in case items were selected before demographics complete)
        items = self._apply_final_filter(items, context_exclusions)
        
        # Inject consistency check if appropriate
        items = self._maybe_inject_consistency_check(
            items, 
            responses, 
            pending_questions,
            zero_dims
        )
        
        return items
    
    def _find_zero_item_dimensions(self, responses: Dict[str, Any]) -> List[str]:
        """Find dimensions with zero answered items."""
        zero_dims = []
        
        for dim in DIMENSIONS:
            dim_items = self.scorer.get_items_by_dimension(dim)
            answered = [
                code for code in responses.keys()
                if any(item['item'] == code for item in dim_items)
            ]
            if len(answered) == 0:
                zero_dims.append(dim)
        
        return zero_dims
    
    def _get_emergency_items(
        self,
        zero_dims: List[str],
        responses: Dict[str, Any],
        all_exclusions: Set[str],
        demographic_exclusions: List[str],
        max_items: int,
    ) -> List[Dict[str, Any]]:
        """
        Get emergency items for zero-coverage dimensions.
        
        This prevents completing assessment with dimensions that have no data.
        """
        logger.info(f"Emergency mode: Getting items for {zero_dims}")
        
        emergency_items = []
        
        for dim in zero_dims:
            dim_items = self.scorer.get_items_by_dimension(dim)
            
            # Find items not answered, not excluded, not demographically filtered
            available = [
                item for item in dim_items
                if (item['item'] not in responses and
                    item['item'] not in all_exclusions and
                    item['item'] not in demographic_exclusions)
            ]
            
            if available:
                # Sort by correlation (best discriminators first)
                available.sort(key=lambda x: x.get('correlation', 0), reverse=True)
                
                for item in available[:AssessmentConfig.EMERGENCY_BATCH_SIZE]:
                    if 'dimension' not in item:
                        item['dimension'] = dim
                    emergency_items.append(item)
                    
                logger.debug(f"Added {len(available[:2])} emergency items for {dim}")
            else:
                logger.warning(f"No available items for dimension {dim}")
        
        return emergency_items[:max_items]
    
    def _apply_final_filter(
        self, 
        items: List[Dict[str, Any]], 
        context_exclusions: List[str]
    ) -> List[Dict[str, Any]]:
        """Apply final demographic filter to selected items."""
        if not context_exclusions:
            return items
        
        filtered = [
            item for item in items 
            if item.get("item") not in context_exclusions
        ]
        
        if len(filtered) < len(items):
            logger.debug(f"Final filter removed {len(items) - len(filtered)} items")
        
        return filtered
    
    def _maybe_inject_consistency_check(
        self,
        items: List[Dict[str, Any]],
        responses: Dict[str, Any],
        pending_questions: Set[str],
        zero_dims: List[str],
    ) -> List[Dict[str, Any]]:
        """
        Inject consistency check question if appropriate.
        
        Rules:
        - Only after MIN responses
        - Not in emergency mode (zero dims)
        - Replace lowest priority item
        """
        if not items or zero_dims:
            return items
        
        if len(responses) < AssessmentConfig.CONSISTENCY_CHECK_MIN_RESPONSES:
            return items
        
        # Get validator's recommendation
        from app.response_validator import ResponseValidator
        validator = ResponseValidator()
        
        consistency_item_id = validator.should_show_consistency_question(
            responses, 
            pending_questions
        )
        
        if not consistency_item_id:
            return items
        
        # Find the full item object
        consistency_item = self._find_item_by_id(consistency_item_id)
        
        if consistency_item:
            # Replace last (lowest priority) item
            items[-1] = consistency_item
            logger.debug(f"Injected consistency check: {consistency_item_id}")
        
        return items
    
    def _find_item_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        """Find item object by ID from scorer's item pool."""
        for dim in DIMENSIONS:
            dim_items = self.scorer.get_items_by_dimension(dim)
            for item in dim_items:
                if item['item'] == item_id:
                    result = item.copy()
                    if 'dimension' not in result:
                        result['dimension'] = dim
                    return result
        return None
    
    # ========================================================================
    # Completion Check
    # ========================================================================
    
    def should_continue_testing(
        self, 
        responses: Dict[str, Any]
    ) -> Tuple[bool, str]:
        """
        Check if testing should continue.
        
        Returns:
            Tuple of (should_continue, reason)
        """
        # Let adaptive tester make the decision
        should_continue, reason = self.tester.should_continue_testing(responses)
        
        # Override if any dimension has 0 items
        if not should_continue:
            zero_dims = self._find_zero_item_dimensions(responses)
            if zero_dims:
                logger.warning(f"Override stop: Zero-item dimensions {zero_dims}")
                return True, f"Need data for: {', '.join(zero_dims)}"
        
        return should_continue, reason
    
    def check_minimum_coverage(self, responses: Dict[str, Any]) -> Tuple[bool, List[str]]:
        """
        Check if minimum coverage requirements are met.
        
        Returns:
            Tuple of (is_valid, incomplete_dimensions)
        """
        incomplete = []
        
        for dim in DIMENSIONS:
            dim_items = self.scorer.get_items_by_dimension(dim)
            answered = [
                code for code in responses.keys()
                if any(item['item'] == code for item in dim_items)
            ]
            if len(answered) < AssessmentConfig.MIN_ITEMS_PER_DIMENSION:
                incomplete.append(dim)
        
        return len(incomplete) == 0, incomplete
    
    # ========================================================================
    # Back Navigation Support
    # ========================================================================
    
    def get_question_for_back_navigation(
        self,
        question_id: str,
    ) -> Optional[QuestionResponse]:
        """
        Get question details for back navigation.
        
        Args:
            question_id: Question to retrieve
            
        Returns:
            QuestionResponse or None if not found
        """
        # Check demographics first
        if question_id.startswith("demo_"):
            return self.get_demographic_question(question_id)
        
        # Search personality questions
        item = self._find_item_by_id(question_id)
        if item:
            return self.format_question(item)
        
        return None
