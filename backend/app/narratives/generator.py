"""
SELVE Narrative Generator

Core narrative generation logic that transforms dimension scores
into deep psychological insights about who the user truly is.
"""

from typing import Dict, List, Optional
from dataclasses import dataclass
from .dimensions import DimensionTemplate, DIMENSION_TEMPLATES
from .archetypes import Archetype, match_archetype, get_all_archetypes


@dataclass
class DimensionNarrative:
    """Narrative for a single dimension."""
    dimension: str
    score: float
    level: str
    template: DimensionTemplate
    
    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            'dimension': self.dimension,
            'score': self.score,
            'level': self.level,
            'title': self.template.title,
            'core_nature': self.template.core_nature,
            'description': self.template.description,
            'inner_world': self.template.inner_world,
            'motivations': self.template.motivations,
            'fears': self.template.fears,
            'strengths': self.template.strengths,
            'shadows': self.template.shadows,
            'in_relationships': self.template.in_relationships,
            'at_work': self.template.at_work,
            'under_stress': self.template.under_stress,
            'at_best': self.template.at_best,
            'growth_path': self.template.growth_path
        }


@dataclass
class PersonalityNarrative:
    """Complete personality narrative."""
    archetype: Archetype
    dimension_narratives: List[DimensionNarrative]
    top_dimensions: List[tuple]  # (dimension_name, score)
    summary: str
    
    def to_dict(self) -> dict:
        """Convert to dictionary for JSON export."""
        return {
            'archetype': {
                'name': self.archetype.name,
                'essence': self.archetype.essence,
                'description': self.archetype.description,
                'core_traits': self.archetype.core_traits,
                'strengths': self.archetype.strengths,
                'challenges': self.archetype.challenges,
                'life_purpose': self.archetype.life_purpose,
                'relationships': self.archetype.relationships,
                'career_paths': self.archetype.career_paths,
                'famous_examples': self.archetype.famous_examples,
                'growth_direction': self.archetype.growth_direction
            },
            'dimensions': [dn.to_dict() for dn in self.dimension_narratives],
            'top_dimensions': [
                {'name': name, 'score': score} 
                for name, score in self.top_dimensions
            ],
            'summary': self.summary
        }


class NarrativeGenerator:
    """Generates deep psychological narratives from SELVE scores."""
    
    # All available dimension templates (loaded from dimensions package)
    AVAILABLE_TEMPLATES = DIMENSION_TEMPLATES
    
    # Dimension names for display
    DIMENSION_NAMES = {
        'LUMEN': 'Social Energy',
        'AETHER': 'Honesty-Humility',
        'ORPHEUS': 'Empathy',
        'ORIN': 'Curiosity',
        'LYRA': 'Creativity',
        'VARA': 'Agreeableness',
        'CHRONOS': 'Patience',
        'KAEL': 'Confidence'
    }
    
    def __init__(self):
        """Initialize the narrative generator."""
        self.archetypes = get_all_archetypes()
    
    def score_to_level(self, score: float) -> str:
        """
        Convert numeric score (0-100) to level category.
        
        Args:
            score: Normalized score from 0-100
            
        Returns:
            Level string: very_high, high, moderate, low, very_low
        """
        if score >= 75:
            return 'very_high'
        elif score >= 60:
            return 'high'
        elif score >= 40:
            return 'moderate'
        elif score >= 25:
            return 'low'
        else:
            return 'very_low'
    
    def get_template(self, dimension: str, level: str) -> Optional[DimensionTemplate]:
        """
        Get template for a dimension at specific level.
        
        Args:
            dimension: Dimension name (e.g., 'LUMEN')
            level: Level string (e.g., 'very_high')
            
        Returns:
            DimensionTemplate if available, None otherwise
        """
        return self.AVAILABLE_TEMPLATES.get(dimension, {}).get(level)
    
    def generate_dimension_narrative(
        self, 
        dimension: str, 
        score: float
    ) -> Optional[DimensionNarrative]:
        """
        Generate narrative for a single dimension.
        
        Args:
            dimension: Dimension name
            score: Normalized score (0-100)
            
        Returns:
            DimensionNarrative if template available, None otherwise
        """
        level = self.score_to_level(score)
        template = self.get_template(dimension, level)
        
        if not template:
            return None
        
        return DimensionNarrative(
            dimension=dimension,
            score=score,
            level=level,
            template=template
        )
    
    def generate_summary(
        self,
        archetype: Archetype,
        top_dimensions: List[tuple]
    ) -> str:
        """
        Generate executive summary of personality.
        
        Args:
            archetype: Identified archetype
            top_dimensions: Top 3 dimensions with scores
            
        Returns:
            Summary text
        """
        summary_parts = []
        
        # Archetype introduction
        summary_parts.append(
            f"You are best described as **{archetype.name}**. "
            f"{archetype.essence}"
        )
        
        # Top dimensions
        dim_descriptions = []
        for dim_name, score in top_dimensions:
            display_name = self.DIMENSION_NAMES.get(dim_name, dim_name)
            dim_descriptions.append(f"{display_name.lower()} (score: {score:.0f}/100)")
        
        if dim_descriptions:
            dims_text = ", ".join(dim_descriptions[:-1])
            if len(dim_descriptions) > 1:
                dims_text += f", and {dim_descriptions[-1]}"
            else:
                dims_text = dim_descriptions[0]
            
            summary_parts.append(
                f"Your personality is most defined by your {dims_text}."
            )
        
        # Core purpose
        summary_parts.append(f"\n\n**Your Life Purpose:**\n{archetype.life_purpose}")
        
        return " ".join(summary_parts)
    
    def generate_complete_narrative(
        self,
        dimension_scores: Dict[str, float]
    ) -> PersonalityNarrative:
        """
        Generate complete personality narrative from dimension scores.
        
        Args:
            dimension_scores: Dict of dimension name -> normalized score (0-100)
            
        Returns:
            PersonalityNarrative with archetype, dimensions, summary
        """
        # Identify archetype
        archetype = match_archetype(dimension_scores)
        
        # Get top 3 dimensions
        sorted_dims = sorted(
            dimension_scores.items(),
            key=lambda x: x[1],
            reverse=True
        )
        top_dimensions = sorted_dims[:3]
        
        # Generate narratives for each dimension
        dimension_narratives = []
        for dim_name, score in dimension_scores.items():
            narrative = self.generate_dimension_narrative(dim_name, score)
            if narrative:  # Only include if we have a template
                dimension_narratives.append(narrative)
        
        # Generate summary
        summary = self.generate_summary(archetype, top_dimensions)
        
        return PersonalityNarrative(
            archetype=archetype,
            dimension_narratives=dimension_narratives,
            top_dimensions=top_dimensions,
            summary=summary
        )


# Convenience function for quick access
def generate_narrative(dimension_scores: Dict[str, float]) -> PersonalityNarrative:
    """
    Generate personality narrative from dimension scores.
    
    Args:
        dimension_scores: Dict of dimension name -> score (0-100)
        
    Returns:
        Complete PersonalityNarrative
    """
    generator = NarrativeGenerator()
    return generator.generate_complete_narrative(dimension_scores)


if __name__ == "__main__":
    # Test with example scores
    test_scores = {
        'LUMEN': 85,  # Very high social energy
        'AETHER': 72,  # High honesty-humility
        'ORPHEUS': 68,  # High empathy
        'ORIN': 55,  # Moderate curiosity
        'LYRA': 62,  # High creativity
        'VARA': 78,  # High agreeableness
        'CHRONOS': 81,  # Very high patience
        'KAEL': 45  # Moderate confidence
    }
    
    print("=" * 80)
    print("SELVE PERSONALITY NARRATIVE - TEST")
    print("=" * 80)
    
    narrative = generate_narrative(test_scores)
    
    print("\n" + narrative.summary)
    
    print("\n" + "=" * 80)
    print("YOUR ARCHETYPE")
    print("=" * 80)
    print(f"\n**{narrative.archetype.name}**")
    print(f"\n{narrative.archetype.description}")
    
    print("\n**Core Traits:**")
    for trait in narrative.archetype.core_traits:
        print(f"  • {trait}")
    
    print("\n**Your Strengths:**")
    for strength in narrative.archetype.strengths[:5]:
        print(f"  • {strength}")
    
    print("\n**Growth Areas:**")
    for challenge in narrative.archetype.challenges[:3]:
        print(f"  • {challenge}")
    
    print("\n**Career Paths That Fit You:**")
    for career in narrative.archetype.career_paths:
        print(f"  • {career}")
    
    print("\n" + "=" * 80)
    print("DEEP DIVE: YOUR DIMENSIONS")
    print("=" * 80)
    
    for dn in narrative.dimension_narratives:
        print(f"\n{'─' * 80}")
        print(f"{dn.dimension} - {dn.template.title}")
        print(f"Score: {dn.score:.0f}/100 ({dn.level.replace('_', ' ').title()})")
        print(f"{'─' * 80}")
        
        print(f"\n**Core Nature:**")
        print(dn.template.core_nature)
        
        print(f"\n**Who You Are:**")
        print(dn.template.description)
        
        print(f"\n**Inner World:**")
        print(dn.template.inner_world)
        
        print(f"\n**What Drives You:**")
        for motivation in dn.template.motivations:
            print(f"  • {motivation}")
        
        print(f"\n**What You Fear:**")
        for fear in dn.template.fears:
            print(f"  • {fear}")
        
        print(f"\n**Your Strengths:**")
        for strength in dn.template.strengths:
            print(f"  • {strength}")
        
        print(f"\n**Your Shadows:**")
        for shadow in dn.template.shadows:
            print(f"  • {shadow}")
        
        print(f"\n**In Relationships:**")
        print(dn.template.in_relationships)
        
        print(f"\n**At Work:**")
        print(dn.template.at_work)
        
        print(f"\n**Under Stress:**")
        print(dn.template.under_stress)
        
        print(f"\n**At Your Best:**")
        print(dn.template.at_best)
        
        print(f"\n**Growth Path:**")
        print(dn.template.growth_path)
    
    print("\n" + "=" * 80)
    print("FINAL WISDOM")
    print("=" * 80)
    print(f"\n{narrative.archetype.growth_direction}")
    
    print("\n" + "=" * 80)
    
    # Test JSON export
    import json
    print("\nJSON Export Test:")
    json_output = narrative.to_dict()
    print(f"Successfully serialized to JSON ({len(json.dumps(json_output))} chars)")
