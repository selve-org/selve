"""
OpenAI Integration for Narrative Generation
Fast, high-quality generation for testing and production
"""
import os
from typing import Optional
import logging

logger = logging.getLogger(__name__)

# Try to import openai
try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
    logger.warning("openai package not installed. Run: pip install openai")


class OpenAIGenerator:
    """Wrapper for OpenAI API"""
    
    def __init__(self, api_key: Optional[str] = None, model: str = "gpt-4o-mini"):
        """
        Initialize OpenAI generator
        
        Args:
            api_key: OpenAI API key. If None, reads from OPENAI_API_KEY env var
            model: Model to use (gpt-4o-mini recommended for cost/quality balance)
        """
        if not OPENAI_AVAILABLE:
            raise RuntimeError(
                "openai package not installed. "
                "Install with: pip install openai"
            )
        
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError(
                "OpenAI API key required. Set OPENAI_API_KEY env var or pass api_key parameter.\n"
                "Get your key at: https://platform.openai.com/api-keys"
            )
        
        self.model = model
        self.client = OpenAI(api_key=self.api_key)
        
        logger.info(f"OpenAI generator initialized with model: {model}")
    
    def generate(
        self,
        prompt: str,
        max_tokens: int = 800,
        temperature: float = 0.7,
        system_prompt: Optional[str] = None
    ) -> str:
        """
        Generate text from prompt
        
        Args:
            prompt: The prompt to generate from
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature (0.0-2.0)
            system_prompt: Optional system prompt
            
        Returns:
            Generated text
        """
        logger.info("Generating narrative with OpenAI...")
        
        # Default system prompt
        if system_prompt is None:
            system_prompt = (
                "You are an expert personality psychologist writing in Tim LaHaye's "
                "direct, confrontational style. Write flowing, integrated prose - "
                "not lists or bullet points. Be brutally honest but constructive."
            )
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens,
                temperature=temperature
            )
            
            generated_text = response.choices[0].message.content.strip()
            
            # Log usage for cost tracking
            usage = response.usage
            logger.info(
                f"Generated {len(generated_text)} chars "
                f"(tokens: {usage.prompt_tokens} in, {usage.completion_tokens} out, "
                f"total: {usage.total_tokens})"
            )
            
            # Estimate cost (for gpt-4o-mini)
            if self.model == "gpt-4o-mini":
                input_cost = usage.prompt_tokens * 0.150 / 1_000_000
                output_cost = usage.completion_tokens * 0.600 / 1_000_000
                total_cost = input_cost + output_cost
                logger.info(f"Estimated cost: ${total_cost:.6f}")
            
            return generated_text
            
        except Exception as e:
            logger.error(f"Error generating text: {e}")
            raise
    
    def generate_section(self, section_name: str, prompt: str) -> str:
        """
        Generate a specific narrative section
        
        Args:
            section_name: Name of section (for logging)
            prompt: The prompt
            
        Returns:
            Generated section text
        """
        logger.info(f"Generating section: {section_name}")
        
        # Adjust max tokens based on section
        max_tokens_map = {
            'core_identity': 800,
            'motivations': 600,
            'conflicts': 600,
            'strengths': 500,
            'growth_path': 700,
            'relationships': 600,
            'work': 600,
            'internal': 500
        }
        
        max_tokens = max_tokens_map.get(section_name, 600)
        
        return self.generate(
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=0.7
        )


def get_openai_generator(api_key: Optional[str] = None) -> OpenAIGenerator:
    """
    Get OpenAI generator instance
    
    Args:
        api_key: Optional API key (otherwise reads from env)
        
    Returns:
        OpenAIGenerator instance
    """
    return OpenAIGenerator(api_key=api_key)


# Export
__all__ = ['OpenAIGenerator', 'get_openai_generator', 'OPENAI_AVAILABLE']
