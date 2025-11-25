"""
SELVE Constants

Centralized constants for the SELVE personality framework.
"""

from .behavior_descriptions import (
    DIMENSION_BEHAVIORS,
    DIMENSION_NAMES,
    DIMENSION_EMOJIS,
    FORBIDDEN_WORDS,
    ACCEPTABLE_BEHAVIOR_WORDS,
    validate_narrative_content,
    get_behavior_description,
)

__all__ = [
    "DIMENSION_BEHAVIORS",
    "DIMENSION_NAMES",
    "DIMENSION_EMOJIS",
    "FORBIDDEN_WORDS",
    "ACCEPTABLE_BEHAVIOR_WORDS",
    "validate_narrative_content",
    "get_behavior_description",
]
