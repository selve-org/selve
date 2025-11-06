"""
Integrated Narrative Generator
Combines rule-based analysis with OpenAI-generated prose
"""
from typing import Dict, Any, Optional
import logging
import re
from .synthesizer import PersonalityAnalyzer, NarrativePromptBuilder
from .openai_generator import get_openai_generator, OpenAIGenerator
from .openai_config import OpenAIConfig
from .dimensions import DIMENSION_TEMPLATES

logger = logging.getLogger(__name__)


def strip_markdown_headers(text: str) -> str:
    """
    Remove markdown headers from text since we have our own UI headings.
    Strips patterns like:
    - ## Heading
    - # Heading
    - **Section Title**
    at the start of lines.
    """
    # Remove markdown headers (## or #)
    text = re.sub(r'^#{1,6}\s+.*$', '', text, flags=re.MULTILINE)
    
    # Remove bold section titles at start of lines (e.g. **Conflicts** or **Growth Areas**)
    text = re.sub(r'^\*\*[^*]+\*\*\s*$', '', text, flags=re.MULTILINE)
    
    # Remove any resulting multiple blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # Strip leading/trailing whitespace
    return text.strip()


class IntegratedNarrativeGenerator:
    """Generates integrated personality narratives using hybrid approach"""
    
    def __init__(self, use_llm: bool = True, config: Optional[OpenAIConfig] = None):
        """
        Initialize generator
        
        Args:
            use_llm: Whether to use LLM for prose generation (vs templates only)
            config: OpenAI configuration. If None, loads from environment.
        """
        self.use_llm = use_llm
        self.llm: Optional[OpenAIGenerator] = None
        self.total_cost = 0.0
        
        if use_llm:
            try:
                self.llm = get_openai_generator(config)
                logger.info("OpenAI generator initialized")
            except Exception as e:
                logger.warning(f"Could not initialize OpenAI: {e}")
                logger.warning("Falling back to template mode")
                self.use_llm = False
    
    def generate_narrative(self, scores: Dict[str, int]) -> Dict[str, Any]:
        """
        Generate complete integrated narrative
        
        Args:
            scores: Dictionary of dimension scores (e.g., {'LUMEN': 50, 'AETHER': 37, ...})
            
        Returns:
            Dictionary with narrative sections
        """
        logger.info("Starting narrative generation")
        logger.info(f"Scores: {scores}")
        
        # Step 1: Rule-based analysis
        analyzer = PersonalityAnalyzer(scores, DIMENSION_TEMPLATES)
        prompt_builder = NarrativePromptBuilder(analyzer)
        
        # Detect patterns
        profile_pattern = analyzer.detect_profile_pattern()
        conflicts = analyzer.detect_conflicts()
        growth_priorities = analyzer.prioritize_growth_areas()
        
        logger.info(f"Profile pattern: {profile_pattern['pattern']}")
        logger.info(f"Detected {len(conflicts)} conflicts")
        logger.info(f"Identified {len(growth_priorities)} growth priorities")
        
        # Step 2: Generate narrative sections
        narrative = {
            'profile_pattern': profile_pattern,
            'scores': scores,
            'sections': {},
            'generation_cost': 0.0
        }
        
        if self.use_llm and self.llm:
            # LLM-generated sections
            logger.info("Generating sections with OpenAI...")
            
            # System message for all sections
            system_message = (
                "You are a straight-talking personality psychologist. Write like you're having "
                "a real conversation with someone - clear, direct, and honest. Use everyday language, "
                "not flowery metaphors or dramatic prose. Be matter-of-fact and practical. "
                "Talk like a friend who tells you the truth, not a novelist writing a character study."
            )
            
            # Core Identity (longest section - 400-600 words)
            result = self.llm.generate(
                prompt=prompt_builder.build_core_identity_prompt(),
                system_message=system_message,
                max_output_tokens=1200  # Increased to prevent cutoffs
            )
            narrative['sections']['core_identity'] = strip_markdown_headers(result['text'])
            narrative['generation_cost'] += result['cost']
            
            # Motivations (300-400 words)
            result = self.llm.generate(
                prompt=prompt_builder.build_motivations_prompt(),
                system_message=system_message,
                max_output_tokens=800
            )
            narrative['sections']['motivations'] = strip_markdown_headers(result['text'])
            narrative['generation_cost'] += result['cost']
            
            # Conflicts
            result = self.llm.generate(
                prompt=prompt_builder.build_conflicts_prompt(),
                system_message=system_message,
                max_output_tokens=800
            )
            narrative['sections']['conflicts'] = strip_markdown_headers(result['text'])
            narrative['generation_cost'] += result['cost']
            
            # Strengths
            result = self.llm.generate(
                prompt=prompt_builder.build_strengths_prompt(),
                system_message=system_message,
                max_output_tokens=800
            )
            narrative['sections']['strengths'] = strip_markdown_headers(result['text'])
            narrative['generation_cost'] += result['cost']
            
            # Growth Areas
            result = self.llm.generate(
                prompt=prompt_builder.build_growth_areas_prompt(),
                system_message=system_message,
                max_output_tokens=800
            )
            narrative['sections']['growth_areas'] = strip_markdown_headers(result['text'])
            narrative['generation_cost'] += result['cost']
            
            # Relationships
            result = self.llm.generate(
                prompt=prompt_builder.build_relationships_prompt(),
                system_message=system_message,
                max_output_tokens=800
            )
            narrative['sections']['relationships'] = strip_markdown_headers(result['text'])
            narrative['generation_cost'] += result['cost']
            
            # Work Style
            result = self.llm.generate(
                prompt=prompt_builder.build_work_style_prompt(),
                system_message=system_message,
                max_output_tokens=800
            )
            narrative['sections']['work_style'] = strip_markdown_headers(result['text'])
            narrative['generation_cost'] += result['cost']
            
            logger.info(f"Total generation cost: ${narrative['generation_cost']:.4f}")
            
        else:
            # Template-based fallback
            logger.info("Generating sections with templates...")
            narrative['sections'] = self._generate_with_templates(analyzer)
        
        # Add metadata
        narrative['metadata'] = {
            'high_traits': [d.name for d in analyzer.get_high_traits()],
            'low_traits': [d.name for d in analyzer.get_low_traits()],
            'conflicts': [
                {
                    'dim1': c.dim1.name,
                    'dim2': c.dim2.name,
                    'description': c.description
                }
                for c in conflicts
            ],
            'generation_method': 'openai' if self.use_llm else 'template',
            'model': self.llm.config.model if self.llm else None
        }
        
        logger.info("Narrative generation complete")
        return narrative
    
    def _generate_with_templates(self, analyzer: PersonalityAnalyzer) -> Dict[str, str]:
        """Fallback: Generate using templates only"""
        sections = {}
        
        # Core Identity (from templates)
        core_parts = []
        profile = analyzer.detect_profile_pattern()
        core_parts.append(f"You have a {profile['pattern']} personality. {profile['description']}")
        
        high_traits = analyzer.get_high_traits()
        if high_traits:
            trait_names = [f"{analyzer.DIMENSION_NAMES[d.name]}" for d in high_traits[:3]]
            core_parts.append(f"Your strongest traits are {', '.join(trait_names)}.")
        
        low_traits = analyzer.get_low_traits()
        if low_traits:
            trait_names = [f"{analyzer.DIMENSION_NAMES[d.name]}" for d in low_traits[:3]]
            core_parts.append(f"You struggle most with {', '.join(trait_names)}.")
        
        sections['core_identity'] = " ".join(core_parts)
        
        # Motivations (from templates)
        all_motivations = []
        for dim in analyzer.dimensions:
            template = dim.template
            if 'what_drives_you' in template:
                all_motivations.extend(template['what_drives_you'][:2])
        
        sections['motivations'] = "What drives you: " + "; ".join(all_motivations[:5])
        
        # Conflicts
        conflicts = analyzer.detect_conflicts()
        if conflicts:
            conflict_text = "Key conflicts: " + "; ".join([c.impact for c in conflicts])
            sections['conflicts'] = conflict_text
        
        return sections


# Convenience function
def generate_integrated_narrative(
    scores: Dict[str, int],
    use_llm: bool = True,
    config: Optional[OpenAIConfig] = None
) -> Dict[str, Any]:
    """
    Generate integrated narrative from scores
    
    Args:
        scores: Dimension scores
        use_llm: Whether to use LLM generation
        config: OpenAI configuration
        
    Returns:
        Complete narrative dictionary
    """
    generator = IntegratedNarrativeGenerator(use_llm=use_llm, config=config)
    return generator.generate_narrative(scores)


__all__ = ['IntegratedNarrativeGenerator', 'generate_integrated_narrative']
