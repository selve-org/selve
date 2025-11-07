"""
Central registry of all archetype definitions.

Import all archetypes from their respective modules and expose them
as a single ARCHETYPES list for the matching algorithm.
"""

from typing import List
from .types import Archetype
from .leaders import THE_LUMINARY, THE_DIPLOMAT, THE_PERFORMER
from .healers import THE_HEALER, THE_EMPATH, THE_MEDIATOR, THE_MENTOR
from .builders import THE_ARCHITECT, THE_STRATEGIST, THE_ACHIEVER, THE_CRAFTSMAN
from .mavericks import THE_MAVERICK, THE_REBEL, THE_EXPLORER, THE_WARRIOR, THE_PIONEER
from .seekers import THE_SAGE, THE_ARTIST, THE_VISIONARY, THE_ALCHEMIST
from .protectors import THE_GUARDIAN
from .fallback import THE_RENAISSANCE_SOUL


# Complete list of all 21 archetypes (20 + 1 fallback)
ARCHETYPES: List[Archetype] = [
    # Leaders (3)
    THE_LUMINARY,
    THE_DIPLOMAT,
    THE_PERFORMER,
    
    # Healers (4)
    THE_HEALER,
    THE_EMPATH,
    THE_MEDIATOR,
    THE_MENTOR,
    
    # Builders (4)
    THE_ARCHITECT,
    THE_STRATEGIST,
    THE_ACHIEVER,
    THE_CRAFTSMAN,
    
    # Mavericks (5)
    THE_MAVERICK,
    THE_REBEL,
    THE_EXPLORER,
    THE_WARRIOR,
    THE_PIONEER,
    
    # Seekers (4)
    THE_SAGE,
    THE_ARTIST,
    THE_VISIONARY,
    THE_ALCHEMIST,
    
    # Protectors (1)
    THE_GUARDIAN,
]

# Fallback for balanced/unclear profiles
BALANCED_ARCHETYPE = THE_RENAISSANCE_SOUL


def get_all_archetypes() -> List[Archetype]:
    """Return all defined archetypes."""
    return ARCHETYPES
