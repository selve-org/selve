"""
Tests for SELVE narrative generation system.
"""

import pytest
from app.narratives import (
    NarrativeGenerator,
    generate_narrative,
    get_all_archetypes,
    match_archetype
)


class TestNarrativeGenerator:
    """Test the narrative generator."""
    
    def test_score_to_level_mapping(self):
        """Test score to level conversion."""
        generator = NarrativeGenerator()
        
        assert generator.score_to_level(85) == 'very_high'
        assert generator.score_to_level(75) == 'very_high'
        assert generator.score_to_level(70) == 'high'
        assert generator.score_to_level(60) == 'high'
        assert generator.score_to_level(50) == 'moderate'
        assert generator.score_to_level(40) == 'moderate'
        assert generator.score_to_level(30) == 'low'
        assert generator.score_to_level(25) == 'low'
        assert generator.score_to_level(20) == 'very_low'
        assert generator.score_to_level(10) == 'very_low'
    
    def test_generate_dimension_narrative(self):
        """Test generating narrative for single dimension."""
        generator = NarrativeGenerator()
        
        # Test with LUMEN (we have templates for it)
        narrative = generator.generate_dimension_narrative('LUMEN', 85)
        
        assert narrative is not None
        assert narrative.dimension == 'LUMEN'
        assert narrative.score == 85
        assert narrative.level == 'very_high'
        assert narrative.template.title == "The Radiant Socialite"
        assert 'ALIVE in the presence of others' in narrative.template.core_nature
    
    def test_generate_dimension_narrative_missing_template(self):
        """Test with dimension that doesn't have template yet."""
        generator = NarrativeGenerator()
        
        # KAEL doesn't have templates yet
        narrative = generator.generate_dimension_narrative('KAEL', 75)
        
        # Should return None gracefully
        assert narrative is None
    
    def test_generate_complete_narrative(self):
        """Test generating complete personality narrative."""
        test_scores = {
            'LUMEN': 85,
            'AETHER': 72,
            'ORPHEUS': 68,
            'ORIN': 55,
            'LYRA': 62,
            'VARA': 78,
            'CHRONOS': 81,
            'KAEL': 45
        }
        
        narrative = generate_narrative(test_scores)
        
        # Check archetype was identified
        assert narrative.archetype is not None
        assert narrative.archetype.name == "The Luminary"
        
        # Check top dimensions
        assert len(narrative.top_dimensions) == 3
        assert narrative.top_dimensions[0][0] == 'LUMEN'  # Highest score
        assert narrative.top_dimensions[0][1] == 85
        
        # Check summary was generated
        assert narrative.summary is not None
        assert 'Luminary' in narrative.summary
        assert 'Life Purpose' in narrative.summary
        
        # Check dimension narratives
        assert len(narrative.dimension_narratives) > 0  # At least LUMEN
        lumen_narrative = narrative.dimension_narratives[0]
        assert lumen_narrative.dimension == 'LUMEN'
    
    def test_narrative_to_dict(self):
        """Test JSON serialization."""
        test_scores = {
            'LUMEN': 85,
            'AETHER': 72,
            'ORPHEUS': 68,
            'ORIN': 55,
            'LYRA': 62,
            'VARA': 78,
            'CHRONOS': 81,
            'KAEL': 45
        }
        
        narrative = generate_narrative(test_scores)
        result = narrative.to_dict()
        
        # Check structure
        assert 'archetype' in result
        assert 'dimensions' in result
        assert 'top_dimensions' in result
        assert 'summary' in result
        
        # Check archetype details
        assert result['archetype']['name'] == 'The Luminary'
        assert 'essence' in result['archetype']
        assert 'strengths' in result['archetype']
        
        # Check dimensions
        assert len(result['dimensions']) > 0
        dim = result['dimensions'][0]
        assert 'dimension' in dim
        assert 'score' in dim
        assert 'core_nature' in dim
        assert 'motivations' in dim
        assert 'fears' in dim


class TestArchetypes:
    """Test archetype matching."""
    
    def test_get_all_archetypes(self):
        """Test retrieving all archetypes."""
        archetypes = get_all_archetypes()
        
        assert len(archetypes) >= 5  # We created 5 so far
        assert any(a.name == "The Luminary" for a in archetypes)
        assert any(a.name == "The Healer" for a in archetypes)
        assert any(a.name == "The Architect" for a in archetypes)
    
    def test_match_archetype_luminary(self):
        """Test matching The Luminary archetype."""
        scores = {
            'LUMEN': 85,  # Very high
            'VARA': 78,   # High
            'AETHER': 72  # High
        }
        
        archetype = match_archetype(scores)
        
        assert archetype is not None
        assert archetype.name == "The Luminary"
    
    def test_match_archetype_healer(self):
        """Test matching The Healer archetype."""
        scores = {
            'ORPHEUS': 90,  # Very high empathy
            'CHRONOS': 85,  # Very high patience
            'AETHER': 20    # Low honesty-humility
        }
        
        archetype = match_archetype(scores)
        
        assert archetype is not None
        assert archetype.name == "The Healer"
    
    def test_match_archetype_architect(self):
        """Test matching The Architect archetype."""
        scores = {
            'ORIN': 90,     # Very high curiosity
            'LYRA': 75,     # High creativity
            'ORPHEUS': 20   # Low empathy
        }
        
        archetype = match_archetype(scores)
        
        assert archetype is not None
        assert archetype.name == "The Architect"
    
    def test_archetype_has_complete_data(self):
        """Test that archetypes have all required fields."""
        archetypes = get_all_archetypes()
        
        for archetype in archetypes:
            assert archetype.name
            assert archetype.essence
            assert archetype.description
            assert archetype.pattern
            assert len(archetype.core_traits) > 0
            assert len(archetype.strengths) > 0
            assert len(archetype.challenges) > 0
            assert archetype.life_purpose
            assert archetype.relationships
            assert len(archetype.career_paths) > 0
            assert archetype.growth_direction


class TestDimensionTemplates:
    """Test dimension templates."""
    
    def test_lumen_templates_exist(self):
        """Test that LUMEN templates are available."""
        generator = NarrativeGenerator()
        
        very_high = generator.get_template('LUMEN', 'very_high')
        high = generator.get_template('LUMEN', 'high')
        moderate = generator.get_template('LUMEN', 'moderate')
        
        assert very_high is not None
        assert high is not None
        assert moderate is not None
    
    def test_template_has_complete_data(self):
        """Test that templates have all psychological depth fields."""
        generator = NarrativeGenerator()
        template = generator.get_template('LUMEN', 'very_high')
        
        assert template is not None
        assert template.title
        assert template.core_nature
        assert template.description
        assert template.inner_world
        assert len(template.motivations) > 0
        assert len(template.fears) > 0
        assert len(template.strengths) > 0
        assert len(template.shadows) > 0
        assert template.in_relationships
        assert template.at_work
        assert template.under_stress
        assert template.at_best
        assert template.growth_path
    
    def test_templates_are_psychologically_rich(self):
        """Test that templates contain deep psychological content."""
        generator = NarrativeGenerator()
        template = generator.get_template('LUMEN', 'very_high')
        
        # Check for psychological depth indicators
        assert 'fear' in template.core_nature.lower() or 'fear' in template.description.lower() \
            or len(template.fears) > 0
        assert len(template.motivations) >= 3
        assert len(template.fears) >= 3
        assert len(template.strengths) >= 3
        assert len(template.shadows) >= 3
        
        # Check that content is substantive, not generic
        assert len(template.core_nature) > 50
        assert len(template.description) > 100
        assert len(template.growth_path) > 50


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
