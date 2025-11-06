"""
SELVE Narrative System

Modular narrative generation system that transforms SELVE scores
into deep psychological insights.
"""

from .generator import (
    NarrativeGenerator,
    PersonalityNarrative,
    DimensionNarrative,
    generate_narrative
)
from .archetypes import (
    Archetype,
    get_all_archetypes,
    match_archetype
)
from .dimensions import DIMENSION_TEMPLATES
from .dimensions.base import DimensionTemplate

# Helper function for backward compatibility
def get_template(dimension: str, level: str) -> DimensionTemplate:
    """Get template for specific dimension and level."""
    return DIMENSION_TEMPLATES[dimension][level]


__all__ = [
    # Main generator
    'NarrativeGenerator',
    'generate_narrative',
    
    # Data classes
    'PersonalityNarrative',
    'DimensionNarrative',
    'Archetype',
    'DimensionTemplate',
    
    # Functions
    'get_all_archetypes',
    'match_archetype',
    'get_template',
    
    # Templates dictionary (all 35 templates)
    'DIMENSION_TEMPLATES',
]
