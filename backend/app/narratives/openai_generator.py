"""
OpenAI LLM Integration
Supports both GPT-5 (Responses API) and GPT-4 (Chat Completions API)
"""
import logging
from typing import Optional, Dict, Any
from openai import OpenAI
from openai.types.chat import ChatCompletion
from .openai_config import OpenAIConfig, estimate_cost

logger = logging.getLogger(__name__)


class OpenAIGenerator:
    """
    OpenAI API wrapper supporting GPT-5 and GPT-4 models
    
    Key differences:
    - GPT-5: Uses Responses API with reasoning/verbosity controls
    - GPT-4: Uses Chat Completions API with temperature/top_p controls
    """
    
    def __init__(self, config: Optional[OpenAIConfig] = None):
        """
        Initialize OpenAI generator
        
        Args:
            config: OpenAI configuration. If None, loads from environment.
        """
        self.config = config or OpenAIConfig.from_env()
        self.client = OpenAI(
            api_key=self.config.api_key,
            max_retries=self.config.max_retries,
            timeout=self.config.timeout
        )
        
        logger.info(f"Initialized OpenAI generator with model: {self.config.model}")
        logger.info(f"Model type: {'GPT-5 (Responses API)' if self.config.is_gpt5 else 'GPT-4 (Chat Completions API)'}")
    
    def generate(
        self,
        prompt: str,
        system_message: Optional[str] = None,
        max_output_tokens: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Generate text using appropriate API based on model
        
        Args:
            prompt: User prompt/input
            system_message: System instruction
            max_output_tokens: Override default max output tokens
            
        Returns:
            Dict with:
                - text: Generated text
                - model: Model used
                - usage: Token usage statistics
                - cost: Estimated cost in USD
        """
        if self.config.is_gpt5:
            return self._generate_gpt5(prompt, system_message, max_output_tokens)
        else:
            return self._generate_gpt4(prompt, system_message, max_output_tokens)
    
    def _generate_gpt5(
        self,
        prompt: str,
        system_message: Optional[str],
        max_output_tokens: Optional[int]
    ) -> Dict[str, Any]:
        """
        Generate using GPT-5 Responses API
        
        GPT-5 key differences:
        - Uses reasoning.effort instead of temperature
        - Uses text.verbosity instead of top_p  
        - Uses max_output_tokens (not max_tokens)
        - NO temperature, top_p, or logprobs support
        """
        logger.info(f"Generating with GPT-5 ({self.config.model})...")
        
        # Build input (combine system + user message)
        if system_message:
            full_input = f"{system_message}\n\n{prompt}"
        else:
            full_input = prompt
        
        try:
            response = self.client.responses.create(
                model=self.config.model,
                input=full_input,
                reasoning={
                    "effort": self.config.reasoning_effort
                },
                text={
                    "verbosity": self.config.text_verbosity
                },
                max_output_tokens=max_output_tokens or self.config.max_output_tokens
            )
            
            # Extract response data
            generated_text = response.output_text
            usage = response.usage
            
            # Calculate cost
            cost = estimate_cost(
                model=self.config.model,
                input_tokens=usage.input_tokens,
                output_tokens=usage.output_tokens
            )
            
            logger.info(
                f"Generated {len(generated_text)} characters | "
                f"Tokens: {usage.input_tokens} in + {usage.output_tokens} out | "
                f"Cost: ${cost:.4f}"
            )
            
            return {
                "text": generated_text,
                "model": self.config.model,
                "usage": {
                    "input_tokens": usage.input_tokens,
                    "output_tokens": usage.output_tokens,
                    "total_tokens": usage.total_tokens
                },
                "cost": cost
            }
            
        except Exception as e:
            logger.error(f"Error generating with GPT-5: {e}")
            raise
    
    def _generate_gpt4(
        self,
        prompt: str,
        system_message: Optional[str],
        max_output_tokens: Optional[int]
    ) -> Dict[str, Any]:
        """
        Generate using GPT-4 Chat Completions API
        
        GPT-4 uses traditional parameters:
        - temperature (creativity control)
        - top_p (nucleus sampling)
        - max_tokens (not max_output_tokens)
        """
        logger.info(f"Generating with GPT-4 ({self.config.model})...")
        
        # Build messages
        messages = []
        if system_message:
            messages.append({"role": "system", "content": system_message})
        messages.append({"role": "user", "content": prompt})
        
        try:
            response: ChatCompletion = self.client.chat.completions.create(
                model=self.config.model,
                messages=messages,
                temperature=self.config.temperature,
                top_p=self.config.top_p,
                max_tokens=max_output_tokens or self.config.max_output_tokens
            )
            
            # Extract response data
            generated_text = response.choices[0].message.content
            usage = response.usage
            
            # Calculate cost
            cost = estimate_cost(
                model=self.config.model,
                input_tokens=usage.prompt_tokens,
                output_tokens=usage.completion_tokens
            )
            
            logger.info(
                f"Generated {len(generated_text)} characters | "
                f"Tokens: {usage.prompt_tokens} in + {usage.completion_tokens} out | "
                f"Cost: ${cost:.4f}"
            )
            
            return {
                "text": generated_text,
                "model": self.config.model,
                "usage": {
                    "input_tokens": usage.prompt_tokens,
                    "output_tokens": usage.completion_tokens,
                    "total_tokens": usage.total_tokens
                },
                "cost": cost
            }
            
        except Exception as e:
            logger.error(f"Error generating with GPT-4: {e}")
            raise
    
    def generate_section(
        self,
        section_name: str,
        prompt: str,
        system_message: Optional[str] = None
    ) -> str:
        """
        Generate a specific narrative section
        
        Args:
            section_name: Name of section (for logging)
            prompt: The prompt
            system_message: Optional system instruction
            
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
        
        result = self.generate(
            prompt=prompt,
            system_message=system_message,
            max_output_tokens=max_tokens
        )
        
        return result["text"]


def get_openai_generator(config: Optional[OpenAIConfig] = None) -> OpenAIGenerator:
    """
    Get OpenAI generator instance
    
    Args:
        config: Optional configuration. If None, loads from environment.
        
    Returns:
        OpenAIGenerator instance
    """
    return OpenAIGenerator(config)


__all__ = ["OpenAIGenerator", "get_openai_generator"]
