"""
Behavior Descriptions for SELVE Dimensions

Maps dimension codes to behavioral descriptions for AI-generated narratives.
This avoids leaking dimension names or psychological jargon to users.

IMPORTANT: These descriptions should focus on OBSERVABLE BEHAVIORS, not trait labels.
"""

# Dimension-to-behavior mapping for prompts
# These describe what friends might observe, NOT the dimension itself
DIMENSION_BEHAVIORS = {
    "LUMEN": "how you show up in social situations and groups",
    "AETHER": "how you handle stress and stay calm under pressure",
    "ORPHEUS": "how you connect with and support others emotionally",
    "VARA": "how authentic and straightforward you come across",
    "CHRONOS": "how patient and flexible you are with timing and plans",
    "KAEL": "how you take charge and speak up in groups",
    "ORIN": "how organized and reliable you are with commitments",
    "LYRA": "how curious and open you are to new ideas and experiences",
}

# Human-friendly dimension names (for internal reference only - NEVER show to users)
DIMENSION_NAMES = {
    "LUMEN": "Mindful Curiosity",
    "AETHER": "Rational Reflection",
    "ORPHEUS": "Compassionate Connection",
    "VARA": "Purposeful Commitment",
    "CHRONOS": "Adaptive Spontaneity",
    "KAEL": "Bold Resilience",
    "ORIN": "Structured Harmony",
    "LYRA": "Creative Expression",
}

# Dimension emojis for UI
DIMENSION_EMOJIS = {
    "LUMEN": "✨",
    "AETHER": "🌊",
    "ORPHEUS": "💜",
    "VARA": "🎯",
    "CHRONOS": "⏳",
    "KAEL": "⚡",
    "ORIN": "📋",
    "LYRA": "🎨",
}

# ============================================================================
# FORBIDDEN WORDS - Must never appear in generated narratives
# ============================================================================
# These words leak psychological jargon or dimension names disguised as behaviors.
# Post-generation validation should flag narratives containing these.

FORBIDDEN_WORDS = [
    # Big Five / OCEAN trait names
    "extraverted",
    "extraversion",
    "introverted",
    "introversion",
    "openness",
    "open to experience",
    "agreeableness",
    "agreeable",
    "conscientiousness",
    "conscientious",
    "neuroticism",
    "neurotic",
    
    # HEXACO additions
    "honesty-humility",
    "emotionality",
    
    # Common psychology jargon
    "assertive",
    "assertiveness",
    "dominant",
    "dominance",
    "submissive",
    "analytical",
    "intuitive",
    "sensing",
    "perceiving",
    "judging",
    
    # MBTI-ish terms
    "INTJ",
    "ENFP",
    "personality type",
    "type indicator",
    
    # Score/dimension references (should never appear)
    "dimension",
    "score",
    "percentile",
    "trait",
    "factor",
    
    # SELVE dimension names (NEVER leak these)
    "LUMEN",
    "AETHER",
    "ORPHEUS",
    "VARA",
    "CHRONOS",
    "KAEL",
    "ORIN",
    "LYRA",
    "lumen",
    "aether",
    "orpheus",
    "vara",
    "chronos",
    "kael",
    "orin",
    "lyra",
]

# Words that are borderline but acceptable in behavioral context
# (e.g., "organized" is okay, but "conscientiousness" is not)
ACCEPTABLE_BEHAVIOR_WORDS = [
    "organized",
    "calm",
    "patient",
    "flexible",
    "reliable",
    "supportive",
    "curious",
    "direct",
    "thoughtful",
    "easygoing",
    "grounded",
    "measured",
    "steady",
    "warm",
    "focused",
    "present",
]


def validate_narrative_content(narrative: str) -> tuple[bool, list[str]]:
    """
    Validate that a generated narrative doesn't contain forbidden words.
    
    Args:
        narrative: The generated narrative text
        
    Returns:
        Tuple of (is_valid, list_of_violations)
    """
    narrative_lower = narrative.lower()
    violations = []
    
    for word in FORBIDDEN_WORDS:
        if word.lower() in narrative_lower:
            violations.append(word)
    
    return len(violations) == 0, violations


def get_behavior_description(dimension: str) -> str:
    """
    Get the behavioral description for a dimension.
    Falls back to generic description if dimension not found.
    
    Args:
        dimension: SELVE dimension code (e.g., "LUMEN")
        
    Returns:
        Behavioral description string
    """
    return DIMENSION_BEHAVIORS.get(
        dimension.upper(),
        "how you come across to others"
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
