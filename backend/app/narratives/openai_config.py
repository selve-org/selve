"""
OpenAI Configuration
Centralized config for GPT-5 and GPT-4 models
"""
import os
from typing import Literal
from pydantic import BaseModel


class OpenAIConfig(BaseModel):
    """OpenAI API configuration"""
    
    # Model selection
    model: Literal["gpt-5-nano", "gpt-4o-mini"] = "gpt-5-nano"
    
    # API settings
    api_key: str
    max_retries: int = 3
    timeout: int = 60
    
    # GPT-5 specific parameters (reasoning models)
    reasoning_effort: Literal["minimal", "low", "medium", "high"] = "low"
    text_verbosity: Literal["low", "medium", "high"] = "medium"
    max_output_tokens: int = 1000
    
    # GPT-4 specific parameters (non-reasoning models)
    temperature: float = 0.7
    top_p: float = 0.9
    
    @property
    def is_gpt5(self) -> bool:
        """Check if using GPT-5 model"""
        return self.model.startswith("gpt-5")
    
    @property
    def is_gpt4(self) -> bool:
        """Check if using GPT-4 model"""
        return self.model.startswith("gpt-4")
    
    @classmethod
    def from_env(cls) -> "OpenAIConfig":
        """Load configuration from environment variables"""
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError(
                "OPENAI_API_KEY environment variable is required. "
                "Set it in your .env file or environment."
            )
        
        model = os.getenv("OPENAI_MODEL", "gpt-5-nano")
        
        # Validate model choice
        valid_models = ["gpt-5-nano", "gpt-5-mini", "gpt-5", "gpt-4o-mini"]
        if model not in valid_models:
            raise ValueError(
                f"Invalid OPENAI_MODEL: {model}. "
                f"Must be one of: {', '.join(valid_models)}"
            )
        
        return cls(
            api_key=api_key,
            model=model,
            reasoning_effort=os.getenv("OPENAI_REASONING_EFFORT", "low"),
            text_verbosity=os.getenv("OPENAI_TEXT_VERBOSITY", "medium"),
            max_output_tokens=int(os.getenv("OPENAI_MAX_OUTPUT_TOKENS", "1000")),
            temperature=float(os.getenv("OPENAI_TEMPERATURE", "0.7")),
            top_p=float(os.getenv("OPENAI_TOP_P", "0.9")),
            max_retries=int(os.getenv("OPENAI_MAX_RETRIES", "3")),
            timeout=int(os.getenv("OPENAI_TIMEOUT", "60"))
        )


# Model pricing (per 1M tokens)
MODEL_PRICING = {
    "gpt-5-nano": {
        "input": 0.05,
        "output": 0.40,
        "cached_input": 0.005,
    },
    "gpt-5-mini": {
        "input": 0.25,
        "output": 0.60,
        "cached_input": 0.025,
    },
    "gpt-5": {
        "input": 1.25,
        "output": 3.00,
        "cached_input": 0.125,
    },
    "gpt-4o-mini": {
        "input": 0.150,
        "output": 0.600,
        "cached_input": 0.015,
    }
}


def estimate_cost(model: str, input_tokens: int, output_tokens: int) -> float:
    """
    Estimate API cost for a request
    
    Args:
        model: Model name
        input_tokens: Number of input tokens
        output_tokens: Number of output tokens
        
    Returns:
        Estimated cost in USD
    """
    if model not in MODEL_PRICING:
        return 0.0
    
    pricing = MODEL_PRICING[model]
    input_cost = (input_tokens / 1_000_000) * pricing["input"]
    output_cost = (output_tokens / 1_000_000) * pricing["output"]
    
    return input_cost + output_cost


__all__ = ["OpenAIConfig", "MODEL_PRICING", "estimate_cost"]
