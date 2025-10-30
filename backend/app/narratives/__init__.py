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
from .dimension_templates import (
    DimensionTemplate,
    LUMEN_VERY_HIGH,
    LUMEN_HIGH,
    LUMEN_MODERATE
)

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
    
    # Available templates (will expand as we add more)
    'LUMEN_VERY_HIGH',
    'LUMEN_HIGH',
    'LUMEN_MODERATE',
]
