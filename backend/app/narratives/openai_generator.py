"""
OpenAI LLM Integration
Supports both GPT-5 (Responses API) and GPT-4 (Chat Completions API)
with async support for parallel generation.
"""
import asyncio
import logging
from typing import Optional, Dict, Any, List, Tuple, Callable, Awaitable
from concurrent.futures import ThreadPoolExecutor
from openai import OpenAI, AsyncOpenAI
from openai.types.chat import ChatCompletion
from .openai_config import OpenAIConfig, estimate_cost

logger = logging.getLogger(__name__)

# Thread pool for running sync OpenAI calls concurrently
_executor: Optional[ThreadPoolExecutor] = None


def get_executor() -> ThreadPoolExecutor:
    """Get or create the thread pool executor."""
    global _executor
    if _executor is None:
        # Limit concurrent OpenAI requests to avoid rate limits
        _executor = ThreadPoolExecutor(max_workers=5, thread_name_prefix="openai_")
    return _executor


class OpenAIGenerator:
    """
    OpenAI API wrapper supporting GPT-5 and GPT-4 models
    with both sync and async generation methods.
    
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
        # Async client for parallel requests
        self.async_client = AsyncOpenAI(
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
        Generate text using appropriate API based on model (sync version)
        
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
    
    async def generate_async(
        self,
        prompt: str,
        system_message: Optional[str] = None,
        max_output_tokens: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Generate text asynchronously for parallel execution.
        
        Args:
            prompt: User prompt/input
            system_message: System instruction
            max_output_tokens: Override default max output tokens
            
        Returns:
            Dict with text, model, usage, and cost
        """
        if self.config.is_gpt5:
            return await self._generate_gpt5_async(prompt, system_message, max_output_tokens)
        else:
            return await self._generate_gpt4_async(prompt, system_message, max_output_tokens)
    
    async def generate_batch_async(
        self,
        requests: List[Dict[str, Any]],
        max_concurrent: int = 5,
        on_complete: Optional[Callable[[str, int], Awaitable[None]]] = None
    ) -> List[Dict[str, Any]]:
        """
        Generate multiple texts in parallel with concurrency control.
        
        Args:
            requests: List of dicts with 'prompt', 'system_message', 'max_output_tokens', 'name' (optional)
            max_concurrent: Maximum concurrent requests (default 5 to avoid rate limits)
            on_complete: Optional async callback called when each request completes.
                         Receives (request_name, completed_count) as arguments.
            
        Returns:
            List of results in same order as requests
        """
        semaphore = asyncio.Semaphore(max_concurrent)
        completed_count = 0
        completed_lock = asyncio.Lock()
        
        async def generate_with_semaphore(req: Dict[str, Any], index: int) -> Tuple[int, Dict[str, Any]]:
            nonlocal completed_count
            async with semaphore:
                try:
                    result = await self.generate_async(
                        prompt=req.get('prompt', ''),
                        system_message=req.get('system_message'),
                        max_output_tokens=req.get('max_output_tokens')
                    )
                    # Track completion and call callback
                    async with completed_lock:
                        completed_count += 1
                        if on_complete:
                            request_name = req.get('name', f'request_{index}')
                            try:
                                await on_complete(request_name, completed_count)
                            except Exception as e:
                                logger.warning(f"Progress callback error: {e}")
                    return (index, result)
                except Exception as e:
                    logger.error(f"Batch generation failed for request {index}: {e}")
                    # Still increment count on failure
                    async with completed_lock:
                        completed_count += 1
                        if on_complete:
                            request_name = req.get('name', f'request_{index}')
                            try:
                                await on_complete(request_name, completed_count)
                            except Exception as cb_error:
                                logger.warning(f"Progress callback error: {cb_error}")
                    return (index, {
                        "text": "",
                        "model": self.config.model,
                        "usage": {"input_tokens": 0, "output_tokens": 0, "total_tokens": 0},
                        "cost": 0.0,
                        "error": str(e)
                    })
        
        # Create tasks with index tracking
        tasks = [
            generate_with_semaphore(req, i) 
            for i, req in enumerate(requests)
        ]
        
        # Run all tasks concurrently
        results_with_indices = await asyncio.gather(*tasks)
        
        # Sort by original index and extract results
        sorted_results = sorted(results_with_indices, key=lambda x: x[0])
        return [result for _, result in sorted_results]
    
    def _generate_gpt5(
        self,
        prompt: str,
        system_message: Optional[str],
        max_output_tokens: Optional[int]
    ) -> Dict[str, Any]:
        """
        Generate using GPT-5 Responses API (sync)
        
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
    
    async def _generate_gpt5_async(
        self,
        prompt: str,
        system_message: Optional[str],
        max_output_tokens: Optional[int]
    ) -> Dict[str, Any]:
        """Generate using GPT-5 Responses API (async)"""
        logger.info(f"Generating with GPT-5 async ({self.config.model})...")
        
        if system_message:
            full_input = f"{system_message}\n\n{prompt}"
        else:
            full_input = prompt
        
        try:
            response = await self.async_client.responses.create(
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
            
            generated_text = response.output_text
            usage = response.usage
            
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
            logger.error(f"Error generating with GPT-5 async: {e}")
            raise
    
    def _generate_gpt4(
        self,
        prompt: str,
        system_message: Optional[str],
        max_output_tokens: Optional[int]
    ) -> Dict[str, Any]:
        """
        Generate using GPT-4 Chat Completions API (sync)
        
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
            generated_text = response.choices[0].message.content or ""
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
    
    async def _generate_gpt4_async(
        self,
        prompt: str,
        system_message: Optional[str],
        max_output_tokens: Optional[int]
    ) -> Dict[str, Any]:
        """Generate using GPT-4 Chat Completions API (async)"""
        logger.info(f"Generating with GPT-4 async ({self.config.model})...")
        
        messages = []
        if system_message:
            messages.append({"role": "system", "content": system_message})
        messages.append({"role": "user", "content": prompt})
        
        try:
            response = await self.async_client.chat.completions.create(
                model=self.config.model,
                messages=messages,
                temperature=self.config.temperature,
                top_p=self.config.top_p,
                max_tokens=max_output_tokens or self.config.max_output_tokens
            )
            
            generated_text = response.choices[0].message.content or ""
            usage = response.usage
            
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
            logger.error(f"Error generating with GPT-4 async: {e}")
            raise
    
    def generate_section(
        self,
        section_name: str,
        prompt: str,
        system_message: Optional[str] = None
    ) -> str:
        """
        Generate a specific narrative section (sync)
        
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
            'core_identity': 1200,
            'motivations': 800,
            'conflicts': 800,
            'strengths': 800,
            'growth_areas': 800,
            'growth_path': 700,
            'relationships': 800,
            'work_style': 800,
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


# Singleton instance for reuse
_generator_instance: Optional[OpenAIGenerator] = None


def get_openai_generator(config: Optional[OpenAIConfig] = None) -> OpenAIGenerator:
    """
    Get OpenAI generator instance (singleton for efficiency)
    
    Args:
        config: Optional configuration. If None, loads from environment.
        
    Returns:
        OpenAIGenerator instance
    """
    global _generator_instance
    
    # If custom config provided, create new instance
    if config is not None:
        return OpenAIGenerator(config)
    
    # Use singleton for default config
    if _generator_instance is None:
        _generator_instance = OpenAIGenerator()
    
    return _generator_instance


__all__ = ["OpenAIGenerator", "get_openai_generator"]
