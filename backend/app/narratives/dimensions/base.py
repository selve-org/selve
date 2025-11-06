"""
Base classes for SELVE dimension templates.
"""

from typing import List


class DimensionTemplate:
    """Template for a dimension at a specific level.
    
    These templates reveal WHO the person truly is - their core nature,
    motivations, fears, desires, and behavioral patterns.
    """
    
    def __init__(
        self,
        title: str,
        core_nature: str,
        description: str,
        inner_world: str,
        motivations: List[str],
        fears: List[str],
        strengths: List[str],
        shadows: List[str],
        in_relationships: str,
        at_work: str,
        under_stress: str,
        at_best: str,
        growth_path: str
    ):
        self.title = title
        self.core_nature = core_nature
        self.description = description
        self.inner_world = inner_world
        self.motivations = motivations
        self.fears = fears
        self.strengths = strengths
        self.shadows = shadows
        self.in_relationships = in_relationships
        self.at_work = at_work
        self.under_stress = under_stress
        self.at_best = at_best
        self.growth_path = growth_path
