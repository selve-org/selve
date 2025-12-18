"""
Assessment Module - Utility Functions

Common helper functions used across the assessment module.

Includes:
- Progress calculation
- Score normalization
- Response validation analysis
- Narrative generation helpers
- Share link utilities
"""

import logging
import secrets
from typing import Dict, List, Optional, Any, Tuple
from datetime import datetime

from .constants import (
    DIMENSIONS,
    AssessmentConfig,
    ShareConfig,
)

logger = logging.getLogger(__name__)


# ============================================================================
# Progress Calculation
# ============================================================================

def calculate_progress(
    demographics_count: int,
    responses_count: int,
    estimated_total: int = AssessmentConfig.ESTIMATED_TOTAL_QUESTIONS,
) -> float:
    """
    Calculate assessment progress as a fraction.
    
    Args:
        demographics_count: Number of demographics answered
        responses_count: Number of personality questions answered
        estimated_total: Estimated total questions
        
    Returns:
        Progress between 0.0 and 0.95 (cap prevents 100% before completion)
    """
    total_answered = demographics_count + responses_count
    progress = total_answered / estimated_total
    return min(progress, 0.95)  # Cap at 95% until actually complete


def get_dimension_counts(
    responses: Dict[str, Any],
    scorer: Any,  # SelveScorer
) -> Dict[str, int]:
    """
    Count answered items per dimension.
    
    Args:
        responses: Answered questions
        scorer: SelveScorer instance
        
    Returns:
        Dict mapping dimension name to count
    """
    counts = {dim: 0 for dim in DIMENSIONS}
    
    for question_id in responses.keys():
        for dim in DIMENSIONS:
            dim_items = scorer.get_items_by_dimension(dim)
            if any(item['item'] == question_id for item in dim_items):
                counts[dim] += 1
                break
    
    return counts


# ============================================================================
# Back Navigation Analysis
# ============================================================================

def analyze_back_navigation(back_count: int) -> Optional[str]:
    """
    Interpret back navigation behavior.
    
    Args:
        back_count: Number of times user went back
        
    Returns:
        Analysis string or None if count is 0
    """
    if back_count == 0:
        return None
    
    if back_count >= 10:
        return (
            "High back-navigation (10+ times) may indicate "
            "perfectionism, anxiety, or indecisiveness"
        )
    elif back_count >= 5:
        return (
            "Moderate back-navigation (5-9 times) suggests "
            "thoughtful consideration or some uncertainty"
        )
    else:
        return f"Low back-navigation ({back_count} times) indicates confidence in responses"


def log_back_navigation(
    session: Dict[str, Any],
    question_id: str,
    old_value: Any,
    new_value: Any,
) -> None:
    """
    Record back navigation event in session.
    
    Args:
        session: Session dict to update
        question_id: Question being changed
        old_value: Previous answer
        new_value: New answer
    """
    session["back_navigation_count"] = session.get("back_navigation_count", 0) + 1
    
    log_entry = {
        "question_id": question_id,
        "from_value": old_value,
        "to_value": new_value,
        "timestamp": datetime.now().isoformat(),
    }
    
    if "back_navigation_log" not in session:
        session["back_navigation_log"] = []
    session["back_navigation_log"].append(log_entry)
    
    logger.info(
        f"Back navigation: {question_id} changed from {old_value} to {new_value}"
    )


# ============================================================================
# Validation Utilities
# ============================================================================

def build_validation_response(
    validator: Any,  # ResponseValidator
    responses: Dict[str, Any],
    session: Dict[str, Any],
) -> Optional[Dict[str, Any]]:
    """
    Build validation results for response.
    
    Args:
        validator: ResponseValidator instance
        responses: Answered questions
        session: Session dict
        
    Returns:
        Validation dict or None
    """
    if not validator:
        return None
    
    try:
        validation_result = validator.validate_responses(responses)
        back_count = session.get("back_navigation_count", 0)
        
        return {
            "consistency_score": validation_result["consistency_score"],
            "attention_score": validation_result["attention_score"],
            "flags": validation_result["flags"],
            "consistency_report": validator.get_consistency_report(responses),
            "back_navigation_count": back_count,
            "back_navigation_analysis": analyze_back_navigation(back_count),
        }
    except Exception as e:
        logger.error(f"Validation failed: {e}")
        return None


def should_run_validation_check(responses_count: int) -> bool:
    """Check if it's time for periodic validation."""
    return (
        responses_count > 0 and
        responses_count % AssessmentConfig.VALIDATION_CHECK_INTERVAL == 0 and
        responses_count >= AssessmentConfig.VALIDATION_CHECK_INTERVAL
    )


# ============================================================================
# Narrative Utilities
# ============================================================================

def personalize_narrative(
    narrative: Dict[str, Any],
    demographics: Dict[str, Any],
) -> Dict[str, Any]:
    """
    Add personalization to narrative based on demographics.
    
    Args:
        narrative: Generated narrative dict
        demographics: User's demographic responses
        
    Returns:
        Personalized narrative dict
    """
    name = demographics.get("demo_name")
    
    if name:
        # Use first name only
        first_name = name.split()[0]
        
        # Prepend greeting to core identity
        if 'sections' in narrative and 'core_identity' in narrative['sections']:
            original = narrative['sections']['core_identity']
            narrative['sections']['core_identity'] = f"Hi {first_name}! {original}"
    
    return narrative


def build_fallback_narrative(
    profile: Any,  # ScoringProfile
    narrative: Any,  # GeneratedNarrative
) -> Dict[str, Any]:
    """
    Build narrative dict from template-based fallback.
    
    Args:
        profile: Scoring profile with dimension scores
        narrative: Template-generated narrative
        
    Returns:
        Narrative dict in standard format
    """
    return {
        'profile_pattern': {
            'pattern': 'Generated Profile',
            'description': narrative.summary
        },
        'sections': {
            'core_identity': narrative.summary,
            'archetype': {
                'name': narrative.archetype.name,
                'description': narrative.archetype.description,
                'core_traits': narrative.archetype.core_traits,
                'strengths': narrative.archetype.strengths,
                'challenges': narrative.archetype.challenges,
            }
        },
        'scores': profile.dimension_scores,
        'generation_cost': 0.0,
        'metadata': {
            'generation_method': 'template'
        }
    }


# ============================================================================
# Share Link Utilities
# ============================================================================

def generate_share_id() -> str:
    """Generate a URL-safe share ID."""
    return secrets.token_urlsafe(ShareConfig.SHARE_ID_LENGTH)


def sanitize_demographics_for_sharing(
    demographics: Optional[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Remove identifying information from demographics for public sharing.
    
    Args:
        demographics: Full demographics dict
        
    Returns:
        Sanitized demographics safe for public view
    """
    if not demographics:
        return {}
    
    return {
        k: v for k, v in demographics.items()
        if k not in ShareConfig.PRIVATE_DEMOGRAPHIC_FIELDS
    }


def build_share_url(share_id: str) -> str:
    """Build the share URL path."""
    return f"/share/{share_id}"


# ============================================================================
# Response Conversion
# ============================================================================

def ensure_numeric_response(
    response: Any,
    question_id: str,
) -> int:
    """
    Ensure personality question response is numeric.
    
    Args:
        response: Raw response value
        question_id: Question identifier (for error messages)
        
    Returns:
        Integer response value
        
    Raises:
        ValueError: If response cannot be converted to int
    """
    try:
        if isinstance(response, str):
            return int(response)
        return int(response)
    except (ValueError, TypeError) as e:
        raise ValueError(
            f"Personality question responses must be numeric (1-7). "
            f"Got: {response} for question {question_id}"
        ) from e


# ============================================================================
# Logging Utilities
# ============================================================================

def log_adaptive_decision(
    responses_count: int,
    should_continue: bool,
    reason: str,
    dimension_uncertainties: Optional[Dict[str, Any]] = None,
) -> None:
    """
    Log adaptive testing decision for debugging.
    
    Args:
        responses_count: Number of responses so far
        should_continue: Whether to continue testing
        reason: Reason for decision
        dimension_uncertainties: Optional uncertainty details per dimension
    """
    decision = "CONTINUE" if should_continue else "STOP"
    logger.info(f"Adaptive decision after {responses_count} responses: {decision}")
    logger.info(f"Reason: {reason}")
    
    if dimension_uncertainties:
        for dim, uncertainty in dimension_uncertainties.items():
            status = "needs_more" if uncertainty.get("needs_more") else "confident"
            score = uncertainty.get("score", "N/A")
            logger.debug(f"  {dim}: {status} (uncertainty={score})")


def log_question_selection(
    items: List[Dict[str, Any]],
    is_emergency: bool = False,
) -> None:
    """
    Log selected questions for debugging.
    
    Args:
        items: Selected question items
        is_emergency: Whether emergency selection was used
    """
    mode = "EMERGENCY" if is_emergency else "NORMAL"
    logger.info(f"Selected {len(items)} questions ({mode} mode)")
    
    for item in items:
        dim = item.get('dimension', 'UNKNOWN')
        code = item.get('item', 'UNKNOWN')
        corr = item.get('correlation', 0)
        text = item.get('text', '')[:50]
        logger.debug(f"  {dim}: {code} (r={corr:.2f}) - {text}...")
