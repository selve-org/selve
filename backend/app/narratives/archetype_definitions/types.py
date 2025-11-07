"""
Base types for archetype definitions.
"""

from typing import Dict, List
from dataclasses import dataclass


@dataclass
class Archetype:
    """Complete archetype definition."""
    name: str
    essence: str  # One-line core essence
    description: str  # Deep description
    pattern: Dict[str, str]  # Dimension -> level expectations
    core_traits: List[str]
    strengths: List[str]
    challenges: List[str]
    life_purpose: str
    relationships: str
    career_paths: List[str]
    famous_examples: List[str]
    growth_direction: str
