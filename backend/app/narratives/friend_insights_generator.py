"""
Friend Insights Narrative Generator

Generates warm, conversational AI narratives explaining what friends see differently.
Uses behavioral descriptions (NOT dimension names) to keep language accessible.
"""
import logging
from typing import Dict, List, Optional, Any

from app.constants import (
    DIMENSION_BEHAVIORS,
    validate_narrative_content,
)
from app.narratives.openai_generator import get_openai_generator, OpenAIGenerator
from app.narratives.openai_config import OpenAIConfig

logger = logging.getLogger(__name__)


class FriendInsightsPromptBuilder:
    """Builds prompts for friend insights narrative generation."""
    
    SYSTEM_MESSAGE = """You are a warm, supportive friend helping someone understand how others see them. 
Write in a conversational, encouraging tone - like a good friend sharing observations over coffee. 
Be honest but kind. Use everyday language, not psychological jargon.

STRICT RULES:
- Never mention dimension names, scores, percentages, or numbers
- Never use words like: assertive, introverted, extraverted, agreeable, conscientious, neurotic, open, analytical, intuitive, dominant
- Don't use bullet points, headers, or markdown formatting
- Write in second person ("You...")
- Focus on observable behaviors, not abstract traits
- Keep it to 2-4 short paragraphs
- Be specific but warm
- Maximum length: 220-350 words
- If there are no differences, celebrate the consistency
- Never say things like "your LUMEN score" or "in terms of openness"

Write as if you're chatting with a friend at a coffee shop - natural, warm, helpful."""

    def __init__(
        self,
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float],
        blind_spots: List[Dict],
        friend_count: int
    ):
        """
        Initialize the prompt builder.
        
        Args:
            self_scores: User's self-assessment scores {DIMENSION: score}
            friend_scores: Aggregated friend scores {DIMENSION: score}
            blind_spots: List of blind spot dicts with dimension, selfScore, friendScore, diff
            friend_count: Number of friends who provided feedback
        """
        self.self_scores = self_scores
        self.friend_scores = friend_scores
        self.blind_spots = blind_spots
        self.friend_count = friend_count
    
    def _describe_blind_spot(self, spot: Dict) -> str:
        """Convert a blind spot to a behavioral description."""
        dimension = spot["dimension"]
        behavior = DIMENSION_BEHAVIORS.get(dimension, "how you come across")
        self_score = spot["selfScore"]
        friend_score = spot["friendScore"]
        diff = abs(friend_score - self_score)
        
        if friend_score > self_score:
            # Friends see them higher than they see themselves
            direction = "more"
            interpretation = "give yourself less credit than you deserve"
        else:
            # Friends see them lower than they see themselves
            direction = "less"
            interpretation = "might come across differently than you intend"
        
        # Create behavioral description without numbers
        if diff >= 25:
            intensity = "significantly"
        elif diff >= 20:
            intensity = "noticeably"
        else:
            intensity = "somewhat"
        
        return f"When it comes to {behavior}, your friends see you as {intensity} {direction} [positive trait] than you see yourself. You {interpretation}."
    
    def _describe_alignment(self, dimension: str, self_score: float, friend_score: float) -> str:
        """Describe a dimension where self and friend scores align well."""
        behavior = DIMENSION_BEHAVIORS.get(dimension, "how you come across")
        return f"Your friends see {behavior} very similarly to how you see it yourself."
    
    def build_prompt(self) -> str:
        """Build the complete user prompt."""
        # Friend count context
        if self.friend_count == 1:
            friend_context = "one friend has shared their perspective on you"
            caveat = "\n\nRemember: This is just one person's view. As more friends share their thoughts, you'll get a fuller picture."
        else:
            friend_context = f"{self.friend_count} friends have shared their perspectives on you"
            caveat = ""
        
        # Build blind spots description
        if self.blind_spots:
            blind_spots_section = "Here are the areas where friends see you differently than you see yourself:\n\n"
            
            for spot in self.blind_spots:
                dimension = spot["dimension"]
                behavior = DIMENSION_BEHAVIORS.get(dimension, "how you come across")
                self_score = spot["selfScore"]
                friend_score = spot["friendScore"]
                diff = abs(friend_score - self_score)
                
                if friend_score > self_score:
                    # Underestimating themselves
                    if diff >= 25:
                        insight = f"- {behavior.capitalize()}: Your friends see you as much stronger here than you give yourself credit for. You're probably too modest about this."
                    elif diff >= 20:
                        insight = f"- {behavior.capitalize()}: Friends notice this is a strength of yours that you might undervalue."
                    else:
                        insight = f"- {behavior.capitalize()}: You're slightly better at this than you realize, according to your friends."
                else:
                    # Overestimating themselves
                    if diff >= 25:
                        insight = f"- {behavior.capitalize()}: You might think you're stronger here than how you actually come across. Worth reflecting on."
                    elif diff >= 20:
                        insight = f"- {behavior.capitalize()}: There's a noticeable gap between how you see this and how friends experience it."
                    else:
                        insight = f"- {behavior.capitalize()}: Friends see this slightly differently than you do."
                
                blind_spots_section += f"{insight}\n"
        else:
            blind_spots_section = """There are no major differences between how you see yourself and how your friends see you.
This is actually quite rare! It suggests strong self-awareness."""
        
        # Find aligned areas (difference < 10)
        aligned_areas = []
        for dim in self.self_scores:
            if dim in self.friend_scores:
                diff = abs(self.self_scores[dim] - self.friend_scores[dim])
                if diff < 10:
                    aligned_areas.append(DIMENSION_BEHAVIORS.get(dim, dim))
        
        if aligned_areas and self.blind_spots:  # Only mention if we have both
            alignment_section = f"\n\nAreas where you and your friends see eye-to-eye: {', '.join(aligned_areas[:3])}."
        else:
            alignment_section = ""
        
        prompt = f"""Based on feedback from {friend_context}:

{blind_spots_section}{alignment_section}

Write a warm, friendly summary (2-4 paragraphs, 220-350 words) explaining what their friends notice about them. 
Focus on behaviors and how they come across to others. 
Don't mention scores, dimensions, or percentages - just describe what friends observe in everyday language.
Be encouraging but honest.{caveat}"""
        
        return prompt


class FriendInsightsGenerator:
    """Generates AI narratives for friend insights."""
    
    def __init__(self, config: Optional[OpenAIConfig] = None):
        """
        Initialize the generator.
        
        Args:
            config: OpenAI configuration. If None, loads from environment.
        """
        self.llm: Optional[OpenAIGenerator] = None
        
        try:
            self.llm = get_openai_generator(config)
            logger.info("Friend insights generator initialized with OpenAI")
        except Exception as e:
            logger.error(f"Failed to initialize OpenAI for friend insights: {e}")
    
    def generate(
        self,
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float],
        blind_spots: List[Dict],
        friend_count: int
    ) -> Dict[str, Any]:
        """
        Generate a friend insights narrative.
        
        Args:
            self_scores: User's self-assessment scores
            friend_scores: Aggregated friend scores
            blind_spots: List of blind spots
            friend_count: Number of friends
            
        Returns:
            Dict with:
                - narrative: Generated text (or None if failed)
                - promptTokens: Input tokens used
                - completionTokens: Output tokens used
                - cost: Generation cost in USD
                - model: Model used
                - error: Error message if failed
                - violations: Any forbidden words found
        """
        if not self.llm:
            return {
                "narrative": None,
                "promptTokens": None,
                "completionTokens": None,
                "cost": None,
                "model": None,
                "error": "OpenAI not initialized",
                "violations": [],
            }
        
        # Build prompt
        prompt_builder = FriendInsightsPromptBuilder(
            self_scores=self_scores,
            friend_scores=friend_scores,
            blind_spots=blind_spots,
            friend_count=friend_count
        )
        
        prompt = prompt_builder.build_prompt()
        system_message = FriendInsightsPromptBuilder.SYSTEM_MESSAGE
        
        logger.info(f"Generating friend insights narrative for {friend_count} friend(s)")
        logger.debug(f"Prompt: {prompt[:200]}...")
        
        try:
            # Generate with reasonable token limit for 220-350 words
            result = self.llm.generate(
                prompt=prompt,
                system_message=system_message,
                max_output_tokens=600  # ~350 words with buffer
            )
            
            narrative = result["text"]
            
            # Validate for forbidden words
            is_valid, violations = validate_narrative_content(narrative)
            
            if not is_valid:
                logger.warning(f"Narrative contains forbidden words: {violations}")
                # Don't reject - just log for monitoring
                # In production, you might want to regenerate
            
            return {
                "narrative": narrative,
                "promptTokens": result["usage"]["input_tokens"],
                "completionTokens": result["usage"]["output_tokens"],
                "cost": result["cost"],
                "model": result["model"],
                "error": None,
                "violations": violations,
            }
            
        except Exception as e:
            logger.error(f"Failed to generate friend insights: {e}")
            return {
                "narrative": None,
                "promptTokens": None,
                "completionTokens": None,
                "cost": None,
                "model": None,
                "error": str(e),
                "violations": [],
            }


# Convenience function
def generate_friend_insights_narrative(
    self_scores: Dict[str, float],
    friend_scores: Dict[str, float],
    blind_spots: List[Dict],
    friend_count: int,
    config: Optional[OpenAIConfig] = None
) -> Dict[str, Any]:
    """
    Generate friend insights narrative.
    
    Args:
        self_scores: User's self-assessment scores
        friend_scores: Aggregated friend scores  
        blind_spots: List of blind spots
        friend_count: Number of friends
        config: Optional OpenAI config
        
    Returns:
        Generation result dict
    """
    generator = FriendInsightsGenerator(config)
    return generator.generate(
        self_scores=self_scores,
        friend_scores=friend_scores,
        blind_spots=blind_spots,
        friend_count=friend_count
    )


__all__ = [
    "FriendInsightsPromptBuilder",
    "FriendInsightsGenerator", 
    "generate_friend_insights_narrative",
]
