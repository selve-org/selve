"""
Integrated Narrative Generator
Combines rule-based analysis with OpenAI-generated prose.

Optimized with parallel API calls for significant speed improvement.
"""
import asyncio
from typing import Dict, Any, Optional, List, Callable, Awaitable
import logging
import re
from .synthesizer import PersonalityAnalyzer, NarrativePromptBuilder
from .openai_generator import get_openai_generator, OpenAIGenerator
from .openai_config import OpenAIConfig
from .dimensions import DIMENSION_TEMPLATES
from .archetypes import match_archetype

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
    if not text:
        return ""
    
    # Remove markdown headers (## or #)
    text = re.sub(r'^#{1,6}\s+.*$', '', text, flags=re.MULTILINE)
    
    # Remove bold section titles at start of lines (e.g. **Conflicts** or **Growth Areas**)
    text = re.sub(r'^\*\*[^*]+\*\*\s*$', '', text, flags=re.MULTILINE)
    
    # Remove any resulting multiple blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # Strip leading/trailing whitespace
    return text.strip()


# Section configuration for parallel generation
SECTION_CONFIG = {
    'core_identity': {
        'max_tokens': 1200,
        'prompt_builder': 'build_core_identity_prompt',
        'priority': 1,  # Higher priority = generated first on fallback
    },
    'motivations': {
        'max_tokens': 800,
        'prompt_builder': 'build_motivations_prompt',
        'priority': 2,
    },
    'conflicts': {
        'max_tokens': 800,
        'prompt_builder': 'build_conflicts_prompt',
        'priority': 3,
    },
    'strengths': {
        'max_tokens': 800,
        'prompt_builder': 'build_strengths_prompt',
        'priority': 4,
    },
    'growth_areas': {
        'max_tokens': 800,
        'prompt_builder': 'build_growth_areas_prompt',
        'priority': 5,
    },
    'relationships': {
        'max_tokens': 800,
        'prompt_builder': 'build_relationships_prompt',
        'priority': 6,
    },
    'work_style': {
        'max_tokens': 800,
        'prompt_builder': 'build_work_style_prompt',
        'priority': 7,
    },
}

# System message used for all sections
SYSTEM_MESSAGE = (
    "You are a straight-talking personality psychologist. Write like you're having "
    "a real conversation with someone - clear, direct, and honest. Use everyday language, "
    "not flowery metaphors or dramatic prose. Be matter-of-fact and practical. "
    "Talk like a friend who tells you the truth, not a novelist writing a character study."
)


class IntegratedNarrativeGenerator:
    """
    Generates integrated personality narratives using hybrid approach.
    
    Optimized with parallel OpenAI API calls for ~3-4x faster generation.
    """
    
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
                logger.info("OpenAI generator initialized for parallel generation")
            except Exception as e:
                logger.warning(f"Could not initialize OpenAI: {e}")
                logger.warning("Falling back to template mode")
                self.use_llm = False
    
    def generate_narrative(self, scores: Dict[str, int]) -> Dict[str, Any]:
        """
        Generate complete integrated narrative (sync wrapper).
        
        This method runs the async generation in an event loop for backwards
        compatibility with sync callers.
        
        Args:
            scores: Dictionary of dimension scores (e.g., {'LUMEN': 50, 'AETHER': 37, ...})
            
        Returns:
            Dictionary with narrative sections
        """
        try:
            # Check if we're already in an async context
            loop = asyncio.get_running_loop()
            # If we get here, we're in an async context - create a new loop in thread
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                future = pool.submit(asyncio.run, self.generate_narrative_async(scores))
                return future.result()
        except RuntimeError:
            # No running loop - safe to use asyncio.run
            return asyncio.run(self.generate_narrative_async(scores))
    
    async def generate_narrative_async(
        self, 
        scores: Dict[str, int],
        on_section_complete: Optional[Callable[[str, int], Awaitable[None]]] = None
    ) -> Dict[str, Any]:
        """
        Generate complete integrated narrative asynchronously.
        
        Uses parallel API calls for all sections simultaneously.
        
        Args:
            scores: Dictionary of dimension scores
            on_section_complete: Optional async callback called when each section completes.
                                 Receives (section_name, completed_count) as arguments.
            
        Returns:
            Dictionary with narrative sections
        """
        logger.info("Starting parallel narrative generation")
        logger.info(f"Scores: {scores}")
        
        # Step 1: Rule-based analysis (fast, sync)
        analyzer = PersonalityAnalyzer(scores, DIMENSION_TEMPLATES)
        prompt_builder = NarrativePromptBuilder(analyzer)
        
        # Match user to personality archetype
        archetype = match_archetype(scores)
        
        # Safety check
        if archetype is None:
            logger.error("❌ match_archetype returned None! Using emergency fallback.")
            from .archetypes import BALANCED_ARCHETYPE
            archetype = BALANCED_ARCHETYPE
        
        conflicts = analyzer.detect_conflicts()
        growth_priorities = analyzer.prioritize_growth_areas()
        
        logger.info(f"Matched archetype: {archetype.name}")
        logger.info(f"Detected {len(conflicts)} conflicts")
        logger.info(f"Identified {len(growth_priorities)} growth priorities")
        
        # Step 2: Initialize narrative structure
        narrative: Dict[str, Any] = {
            'profile_pattern': {
                'pattern': archetype.name,
                'description': archetype.essence
            },
            'archetype': {
                'name': archetype.name,
                'essence': archetype.essence,
                'description': archetype.description,
                'core_traits': archetype.core_traits,
                'strengths': archetype.strengths,
                'challenges': archetype.challenges,
                'life_purpose': archetype.life_purpose,
                'relationships': archetype.relationships,
                'career_paths': archetype.career_paths,
                'famous_examples': archetype.famous_examples,
                'growth_direction': archetype.growth_direction
            },
            'scores': scores,
            'sections': {},
            'generation_cost': 0.0
        }
        
        # Human-readable names for progress display
        SECTION_DISPLAY_NAMES = {
            'core_identity': 'Core Identity',
            'motivations': 'Motivations',
            'conflicts': 'Inner Conflicts',
            'strengths': 'Strengths',
            'growth_areas': 'Growth Areas',
            'relationships': 'Relationships',
            'work_style': 'Work Style',
        }
        
        # Step 3: Generate sections
        if self.use_llm and self.llm:
            logger.info("Generating all sections in PARALLEL with OpenAI...")
            
            # Build all requests upfront with section names for progress tracking
            requests: List[Dict[str, Any]] = []
            section_names: List[str] = []
            
            for section_name, config in SECTION_CONFIG.items():
                prompt_method = getattr(prompt_builder, config['prompt_builder'])
                requests.append({
                    'prompt': prompt_method(),
                    'system_message': SYSTEM_MESSAGE,
                    'max_output_tokens': config['max_tokens'],
                    'name': section_name  # For progress tracking
                })
                section_names.append(section_name)
            
            # Execute all requests in parallel with progress callback
            import time
            start_time = time.time()
            
            results = await self.llm.generate_batch_async(
                requests, 
                max_concurrent=5,  # Limit to avoid rate limits
                on_complete=on_section_complete  # Pass progress callback
            )
            
            elapsed = time.time() - start_time
            logger.info(f"Parallel generation completed in {elapsed:.2f}s")
            
            # Process results
            total_cost = 0.0
            for section_name, result in zip(section_names, results):
                if 'error' in result and result.get('text', '') == '':
                    # Generation failed for this section - use fallback
                    logger.warning(f"Section {section_name} failed, using fallback")
                    narrative['sections'][section_name] = self._get_section_fallback(
                        section_name, analyzer
                    )
                else:
                    narrative['sections'][section_name] = strip_markdown_headers(result['text'])
                    total_cost += result.get('cost', 0.0)
            
            narrative['generation_cost'] = total_cost
            logger.info(f"Total generation cost: ${total_cost:.4f}")
            
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
            'generation_method': 'openai_parallel' if self.use_llm else 'template',
            'model': self.llm.config.model if self.llm else None
        }
        
        logger.info("Narrative generation complete")
        return narrative
    
    def _get_section_fallback(self, section_name: str, analyzer: PersonalityAnalyzer) -> str:
        """Get fallback text for a section that failed to generate."""
        templates = self._generate_with_templates(analyzer)
        return templates.get(section_name, f"Unable to generate {section_name} section.")
    
    def _generate_with_templates(self, analyzer: PersonalityAnalyzer) -> Dict[str, str]:
        """Fallback: Generate using templates only"""
        sections: Dict[str, str] = {}
        
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
        else:
            sections['conflicts'] = "You have a well-balanced personality with few internal conflicts."
        
        # Strengths
        if high_traits:
            strengths = []
            for trait in high_traits[:3]:
                if 'strengths' in trait.template:
                    strengths.extend(trait.template['strengths'][:2])
            sections['strengths'] = "Your key strengths: " + "; ".join(strengths[:5])
        else:
            sections['strengths'] = "Your balanced approach is itself a strength."
        
        # Growth Areas
        if low_traits:
            growth = []
            for trait in low_traits[:3]:
                if 'growth_actions' in trait.template:
                    growth.extend(trait.template['growth_actions'][:2])
            sections['growth_areas'] = "Areas for growth: " + "; ".join(growth[:5])
        else:
            sections['growth_areas'] = "Continue developing your already balanced traits."
        
        # Relationships (generic fallback)
        sections['relationships'] = (
            "Your personality influences how you connect with others. "
            "Understanding your traits can help you build stronger relationships."
        )
        
        # Work Style (generic fallback)
        sections['work_style'] = (
            "Your unique combination of traits shapes how you approach work. "
            "Leveraging your strengths while being aware of growth areas can enhance your effectiveness."
        )
        
        return sections


# Convenience functions
def generate_integrated_narrative(
    scores: Dict[str, int],
    use_llm: bool = True,
    config: Optional[OpenAIConfig] = None
) -> Dict[str, Any]:
    """
    Generate integrated narrative from scores (sync version).
    
    Args:
        scores: Dimension scores
        use_llm: Whether to use LLM generation
        config: OpenAI configuration
        
    Returns:
        Complete narrative dictionary
    """
    generator = IntegratedNarrativeGenerator(use_llm=use_llm, config=config)
    return generator.generate_narrative(scores)


async def generate_integrated_narrative_async(
    scores: Dict[str, int],
    use_llm: bool = True,
    config: Optional[OpenAIConfig] = None,
    on_section_complete: Optional[Callable[[str, int], Awaitable[None]]] = None
) -> Dict[str, Any]:
    """
    Generate integrated narrative from scores (async version).
    
    Use this when you're already in an async context for better performance.
    
    Args:
        scores: Dimension scores
        use_llm: Whether to use LLM generation
        config: OpenAI configuration
        on_section_complete: Optional async callback called when each section completes.
                             Receives (section_name, completed_count) as arguments.
        
    Returns:
        Complete narrative dictionary
    """
    generator = IntegratedNarrativeGenerator(use_llm=use_llm, config=config)
    return await generator.generate_narrative_async(scores, on_section_complete=on_section_complete)


__all__ = [
    'IntegratedNarrativeGenerator', 
    'generate_integrated_narrative',
    'generate_integrated_narrative_async'
]
