"""
Assessment Module - Constants

Centralized configuration and constants for the assessment module.
All magic numbers, question definitions, and configuration values live here.

Benefits:
- Single source of truth
- Easy to modify without touching business logic
- Clear documentation of all configurable values
- Type-safe access to constants
"""

from typing import Dict, List, Any, Final
from enum import Enum


# ============================================================================
# Assessment Configuration
# ============================================================================

class AssessmentConfig:
    """Core assessment configuration values."""
    
    # Session limits
    MAX_MEMORY_SESSIONS: Final[int] = 1000  # Max sessions in memory cache
    SESSION_TTL_HOURS: Final[int] = 24  # Redis session TTL
    
    # Question counts
    TOTAL_DEMOGRAPHIC_QUESTIONS: Final[int] = 7
    ESTIMATED_PERSONALITY_QUESTIONS: Final[int] = 37
    ESTIMATED_TOTAL_QUESTIONS: Final[int] = 44  # demographics + personality
    
    # Dimension requirements
    MIN_ITEMS_PER_DIMENSION: Final[int] = 2  # Minimum for valid results
    QUICK_SCREEN_ITEMS: Final[int] = 16  # Initial quick screen size
    
    # Navigation limits
    MAX_BACK_DEPTH: Final[int] = 10  # How far back user can navigate
    
    # Validation intervals
    VALIDATION_CHECK_INTERVAL: Final[int] = 10  # Check consistency every N questions
    CONSISTENCY_CHECK_MIN_RESPONSES: Final[int] = 15  # Min responses before consistency injection
    
    # Batch sizes
    DEFAULT_BATCH_SIZE: Final[int] = 3  # Questions per batch
    EMERGENCY_BATCH_SIZE: Final[int] = 2  # Questions in emergency mode
    
    # Timeouts (seconds)
    NARRATIVE_GENERATION_TIMEOUT: Final[int] = 180  # 3 minutes
    LOCK_BLOCKING_TIMEOUT: Final[int] = 200  # 3.5 minutes
    
    # Age restrictions
    MIN_AGE: Final[int] = 13
    MIN_BIRTH_YEAR: Final[int] = 1900
    MAX_BIRTH_YEAR: Final[int] = 2012  # 13+ years old


# ============================================================================
# Personality Dimensions
# ============================================================================

class Dimension(str, Enum):
    """SELVE personality dimensions."""
    
    LUMEN = "LUMEN"
    AETHER = "AETHER"
    ORPHEUS = "ORPHEUS"
    ORIN = "ORIN"
    LYRA = "LYRA"
    VARA = "VARA"
    CHRONOS = "CHRONOS"
    KAEL = "KAEL"


DIMENSIONS: Final[List[str]] = [d.value for d in Dimension]


# ============================================================================
# Scale Configurations
# ============================================================================

LIKERT_5_LABELS: Final[Dict[int, str]] = {
    1: "Strongly Disagree",
    2: "Disagree",
    3: "Neutral",
    4: "Agree",
    5: "Strongly Agree",
}

LIKERT_7_OPTIONS: Final[List[Dict[str, Any]]] = [
    {"value": 1, "label": "That is definitely NOT me!"},
    {"value": 2, "label": "Disagree"},
    {"value": 3, "label": "Somewhat Disagree"},
    {"value": 4, "label": "Neutral"},
    {"value": 5, "label": "Somewhat Agree"},
    {"value": 6, "label": "Agree"},
    {"value": 7, "label": "That IS definitely me!"},
]


# ============================================================================
# Demographic Questions Definition
# ============================================================================

DEMOGRAPHIC_QUESTIONS: Final[Dict[str, Dict[str, Any]]] = {
    "demo_name": {
        "id": "demo_name",
        "text": "What's your name?",
        "type": "text-input",
        "dimension": "demographics",
        "isRequired": True,
        "renderConfig": {
            "placeholder": "Enter your full name",
            "helpText": "We'll use this to personalize your results"
        }
    },
    "demo_dob": {
        "id": "demo_dob",
        "text": "What's your date of birth?",
        "type": "date-input",
        "dimension": "demographics",
        "isRequired": True,
        "renderConfig": {
            "placeholder": "Select your birth date",
            "helpText": "Must be 13 or older to take this assessment",
            "maxDate": "today",
            "yearRange": [AssessmentConfig.MIN_BIRTH_YEAR, AssessmentConfig.MAX_BIRTH_YEAR]
        }
    },
    "demo_gender": {
        "id": "demo_gender",
        "text": "What's your gender?",
        "type": "pill-select",
        "dimension": "demographics",
        "isRequired": False,
        "renderConfig": {
            "options": [
                {"label": "Male", "value": "male"},
                {"label": "Female", "value": "female"},
                {"label": "Non-binary", "value": "non_binary"},
                {"label": "Prefer not to say", "value": "prefer_not_to_say"}
            ]
        }
    },
    "demo_country": {
        "id": "demo_country",
        "text": "Which country do you live in?",
        "type": "country-select",
        "dimension": "demographics",
        "isRequired": True,
        "renderConfig": {
            "placeholder": "Start typing your country...",
            "helpText": "This helps us provide culturally relevant questions"
        }
    },
    "demo_drives": {
        "id": "demo_drives",
        "text": "Do you drive a car regularly?",
        "type": "radio",
        "dimension": "demographics",
        "isRequired": False,
        "renderConfig": {
            "options": [
                {"value": "yes", "label": "Yes"},
                {"value": "no", "label": "No"}
            ]
        }
    },
    "demo_credit_cards": {
        "id": "demo_credit_cards",
        "text": "Do you use credit cards?",
        "type": "radio",
        "dimension": "demographics",
        "isRequired": False,
        "renderConfig": {
            "options": [
                {"value": "yes", "label": "Yes"},
                {"value": "no", "label": "No"}
            ]
        }
    },
    "demo_has_yard": {
        "id": "demo_has_yard",
        "text": "Do you have a yard or garden at home?",
        "type": "radio",
        "dimension": "demographics",
        "isRequired": False,
        "renderConfig": {
            "options": [
                {"value": "yes", "label": "Yes"},
                {"value": "no", "label": "No"}
            ]
        }
    },
}

# Ordered list of demographic question IDs
DEMOGRAPHIC_QUESTION_ORDER: Final[List[str]] = [
    "demo_name",
    "demo_dob", 
    "demo_gender",
    "demo_country",
    "demo_drives",
    "demo_credit_cards",
    "demo_has_yard",
]


# ============================================================================
# Context-Based Question Exclusions
# ============================================================================

class ContextExclusions:
    """
    Questions to exclude based on user's demographic context.
    
    This prevents showing irrelevant scenarios (e.g., driving questions
    to someone who doesn't drive).
    """
    
    # Questions requiring driving
    NO_DRIVING: Final[List[str]] = [
        "LUMEN_SC2",   # "When driving, you find yourself wanting to look at..."
        "KAEL_SC1",    # "You're a daring driver who darts in and out of traffic..."
        "CHRONOS_SC2", # "You're the last one to leave an intersection..."
    ]
    
    # Questions requiring credit cards
    NO_CREDIT_CARDS: Final[List[str]] = [
        "AETHER_SC2",  # "You pride yourself on having a triple 'A' credit rating..."
        "AETHER_SC4",  # "You balance your checkbook to the penny..."
    ]
    
    # Questions requiring a yard
    NO_YARD: Final[List[str]] = [
        "LUMEN_SC3",   # "You start yard work with great enthusiasm..."
        "ORIN_SC5",    # "You can be found on your hands and knees, 'manicuring' your lawn..."
    ]
    
    @classmethod
    def get_exclusions_for_demographics(cls, demographics: Dict[str, Any]) -> List[str]:
        """
        Get all question exclusions based on user demographics.
        
        Args:
            demographics: User's demographic responses
            
        Returns:
            List of question IDs to exclude
        """
        exclusions = []
        
        if demographics.get("demo_drives") == "no":
            exclusions.extend(cls.NO_DRIVING)
            
        if demographics.get("demo_credit_cards") == "no":
            exclusions.extend(cls.NO_CREDIT_CARDS)
            
        if demographics.get("demo_has_yard") == "no":
            exclusions.extend(cls.NO_YARD)
            
        return exclusions


# ============================================================================
# Question Deduplication Rules
# ============================================================================

class DeduplicationRules:
    """
    Rules for avoiding similar/redundant questions.
    
    Strategy: Maximum 2 similar questions per cluster for consistency checking.
    Never show 3+ identical questions - that's exhausting for users.
    """
    
    # Map of preferred item -> items to exclude if preferred is used
    PREFER_EXCLUDE: Final[Dict[str, List[str]]] = {
        "APati8": ["N9"],      # "irritated easily" - keep APati8 (0.72), exclude N9 (0.64)
        "APati7": ["APati6"],  # "angry easily" vs "annoyed easily" - keep APati7 (0.73)
    }
    
    # Clusters of similar items (max 2 from each cluster)
    ANGER_CLUSTER: Final[List[str]] = ["APati7", "APati6", "APati8", "N9"]
    
    MAX_PER_CLUSTER: Final[int] = 2
    
    @classmethod
    def get_dedup_exclusions(
        cls,
        responses: Dict[str, Any],
        pending_questions: set
    ) -> List[str]:
        """
        Get exclusions based on deduplication rules.
        
        Args:
            responses: Already answered questions
            pending_questions: Questions queued but not yet answered
            
        Returns:
            List of question IDs to exclude
        """
        exclusions = []
        seen = set(responses.keys()) | pending_questions
        
        # Apply prefer/exclude rules
        for preferred, duplicates in cls.PREFER_EXCLUDE.items():
            if preferred in seen:
                exclusions.extend(duplicates)
        
        # Check cluster limits
        anger_seen = [item for item in cls.ANGER_CLUSTER if item in seen]
        if len(anger_seen) >= cls.MAX_PER_CLUSTER:
            # Block remaining anger questions
            for item in cls.ANGER_CLUSTER:
                if item not in anger_seen:
                    exclusions.append(item)
        
        return exclusions


# ============================================================================
# Response Validation Limits
# ============================================================================

class ValidationLimits:
    """Input validation constants."""
    
    MAX_TEXT_LENGTH: Final[int] = 5000
    MAX_NUMERIC_VALUE: Final[int] = 100
    MIN_NUMERIC_VALUE: Final[int] = -100
    MAX_JSON_SIZE: Final[int] = 10000  # bytes
    
    # Forbidden characters in text responses
    FORBIDDEN_CHARS: Final[set] = {'\x00'}  # Null bytes


# ============================================================================
# Share Link Configuration
# ============================================================================

class ShareConfig:
    """Configuration for result sharing."""
    
    SHARE_ID_LENGTH: Final[int] = 12  # URL-safe token length (produces 16 chars)
    
    # Fields to strip from demographics for public view
    PRIVATE_DEMOGRAPHIC_FIELDS: Final[List[str]] = [
        'email',
        'full_name', 
        'name',
        'demo_name',  # Also strip the actual name field
    ]
