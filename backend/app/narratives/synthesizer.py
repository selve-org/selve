"""
Hybrid Narrative Synthesizer
Combines rule-based analysis with LLM-generated prose for integrated personality narratives
"""
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass
import json


@dataclass
class DimensionAnalysis:
    """Analysis of a single dimension"""
    name: str
    score: int
    level: str  # very_low, low, moderate, high, very_high
    template: Dict[str, Any]  # Full template data
    
    @property
    def is_high(self) -> bool:
        return self.score >= 60
    
    @property
    def is_low(self) -> bool:
        return self.score <= 40
    
    @property
    def is_extreme(self) -> bool:
        return self.score <= 20 or self.score >= 80


@dataclass
class TraitConflict:
    """Represents a conflict between two dimensions"""
    dim1: DimensionAnalysis
    dim2: DimensionAnalysis
    description: str
    impact: str


class PersonalityAnalyzer:
    """Rule-based analysis of personality patterns"""
    
    DIMENSION_NAMES = {
        'LUMEN': 'Social Energy',
        'AETHER': 'Emotional Stability',
        'ORPHEUS': 'Empathy',
        'ORIN': 'Organization',
        'LYRA': 'Creativity',
        'VARA': 'Honesty',
        'CHRONOS': 'Patience',
        'KAEL': 'Confidence'
    }
    
    def __init__(self, scores: Dict[str, int], dimension_templates: Dict[str, Dict]):
        self.scores = scores
        self.templates = dimension_templates
        self.dimensions = self._create_dimension_analyses()
    
    def _create_dimension_analyses(self) -> List[DimensionAnalysis]:
        """Convert scores and templates into DimensionAnalysis objects"""
        analyses = []
        for dim_name, score in self.scores.items():
            level = self._score_to_level(score)
            template = self.templates.get(f"{dim_name}_{level.upper()}", {})
            analyses.append(DimensionAnalysis(
                name=dim_name,
                score=score,
                level=level,
                template=template
            ))
        return analyses
    
    def _score_to_level(self, score: int) -> str:
        """Convert numeric score to level"""
        if score <= 20:
            return 'very_low'
        elif score <= 40:
            return 'low'
        elif score <= 60:
            return 'moderate'
        elif score <= 80:
            return 'high'
        else:
            return 'very_high'
    
    def get_high_traits(self) -> List[DimensionAnalysis]:
        """Get dimensions with high scores (>60)"""
        return sorted([d for d in self.dimensions if d.is_high], 
                     key=lambda x: x.score, reverse=True)
    
    def get_low_traits(self) -> List[DimensionAnalysis]:
        """Get dimensions with low scores (<40)"""
        return sorted([d for d in self.dimensions if d.is_low], 
                     key=lambda x: x.score)
    
    def get_extreme_traits(self) -> List[DimensionAnalysis]:
        """Get dimensions with extreme scores (<20 or >80)"""
        return [d for d in self.dimensions if d.is_extreme]
    
    def detect_conflicts(self) -> List[TraitConflict]:
        """Detect conflicting trait combinations"""
        conflicts = []
        
        # Check for specific conflict patterns
        dim_dict = {d.name: d for d in self.dimensions}
        
        # Pattern 1: High empathy + Low emotional stability
        if 'ORPHEUS' in dim_dict and 'AETHER' in dim_dict:
            orpheus = dim_dict['ORPHEUS']
            aether = dim_dict['AETHER']
            if orpheus.score >= 40 and aether.score <= 40:
                conflicts.append(TraitConflict(
                    dim1=orpheus,
                    dim2=aether,
                    description="Moderate empathy clashes with emotional reactivity",
                    impact="You want to help others emotionally but get overwhelmed by their feelings"
                ))
        
        # Pattern 2: High social energy + Low emotional stability
        if 'LUMEN' in dim_dict and 'AETHER' in dim_dict:
            lumen = dim_dict['LUMEN']
            aether = dim_dict['AETHER']
            if lumen.score >= 40 and aether.score <= 40:
                conflicts.append(TraitConflict(
                    dim1=lumen,
                    dim2=aether,
                    description="Social desires conflict with anxiety",
                    impact="You want connection but find social situations exhausting due to anxiety"
                ))
        
        # Pattern 3: High creativity + Low organization
        if 'LYRA' in dim_dict and 'ORIN' in dim_dict:
            lyra = dim_dict['LYRA']
            orin = dim_dict['ORIN']
            if lyra.score >= 60 and orin.score <= 40:
                conflicts.append(TraitConflict(
                    dim1=lyra,
                    dim2=orin,
                    description="Creative chaos meets organizational struggle",
                    impact="Ideas flow freely but execution is chaotic and inconsistent"
                ))
        
        # Pattern 4: High honesty + Low patience
        if 'VARA' in dim_dict and 'CHRONOS' in dim_dict:
            vara = dim_dict['VARA']
            chronos = dim_dict['CHRONOS']
            if vara.score >= 60 and chronos.score <= 40:
                conflicts.append(TraitConflict(
                    dim1=vara,
                    dim2=chronos,
                    description="Brutal honesty meets impatience",
                    impact="You value truth but lack patience to deliver it kindly"
                ))
        
        # Pattern 5: Low confidence + High demands (any other high trait)
        if 'KAEL' in dim_dict:
            kael = dim_dict['KAEL']
            if kael.score <= 30:
                high_traits = self.get_high_traits()
                if high_traits:
                    conflicts.append(TraitConflict(
                        dim1=kael,
                        dim2=high_traits[0],
                        description="Low confidence limits high potential",
                        impact="You have capabilities but can't assert them due to lack of confidence"
                    ))
        
        return conflicts
    
    def detect_profile_pattern(self) -> Dict[str, Any]:
        """Detect overall personality pattern"""
        high = len(self.get_high_traits())
        low = len(self.get_low_traits())
        extreme = len(self.get_extreme_traits())
        
        # Calculate score variance
        scores = [d.score for d in self.dimensions]
        mean_score = sum(scores) / len(scores)
        variance = sum((s - mean_score) ** 2 for s in scores) / len(scores)
        
        # Determine pattern type
        if extreme >= 2:
            pattern = "Extreme Profile"
            description = "You have pronounced strengths and weaknesses - very high and very low traits"
        elif variance < 100:  # Low variance
            pattern = "Balanced Profile"
            description = "Your traits are relatively consistent - mostly in the moderate range"
        elif high >= 3 and low <= 1:
            pattern = "High Functioning"
            description = "You have multiple strengths and few significant weaknesses"
        elif low >= 3 and high <= 1:
            pattern = "Struggling Pattern"
            description = "Multiple challenges across different dimensions require attention"
        elif self.get_low_traits() and any(d.name == 'AETHER' for d in self.get_low_traits()):
            pattern = "Anxious Moderate"
            description = "Moderate in most areas but anxiety significantly impacts functioning"
        else:
            pattern = "Mixed Profile"
            description = "A combination of strengths and challenges across different dimensions"
        
        return {
            'pattern': pattern,
            'description': description,
            'high_count': high,
            'low_count': low,
            'extreme_count': extreme,
            'variance': variance,
            'mean_score': mean_score
        }
    
    def prioritize_growth_areas(self) -> List[Tuple[DimensionAnalysis, str]]:
        """Prioritize which dimensions to work on first"""
        growth_priorities = []
        
        # Priority 1: Extreme lows (especially AETHER, KAEL)
        for dim in self.dimensions:
            if dim.score <= 20:
                if dim.name == 'AETHER':
                    priority = f"CRITICAL: Emotional stability is severely impacting everything"
                elif dim.name == 'KAEL':
                    priority = f"CRITICAL: Confidence issues are holding you back from all potential"
                else:
                    priority = f"HIGH: Very low {self.DIMENSION_NAMES[dim.name]} needs immediate attention"
                growth_priorities.append((dim, priority))
        
        # Priority 2: Low scores that conflict with high scores
        conflicts = self.detect_conflicts()
        for conflict in conflicts:
            if conflict.dim2.score < conflict.dim1.score:
                priority = f"MEDIUM: {self.DIMENSION_NAMES[conflict.dim2.name]} is limiting your {self.DIMENSION_NAMES[conflict.dim1.name]}"
                if (conflict.dim2, priority) not in growth_priorities:
                    growth_priorities.append((conflict.dim2, priority))
        
        # Priority 3: Other low scores
        for dim in self.get_low_traits():
            if not any(d[0].name == dim.name for d in growth_priorities):
                priority = f"LOW: Improving {self.DIMENSION_NAMES[dim.name]} would enhance overall functioning"
                growth_priorities.append((dim, priority))
        
        return growth_priorities


class NarrativePromptBuilder:
    """Builds prompts for LLM narrative generation"""
    
    def __init__(self, analyzer: PersonalityAnalyzer):
        self.analyzer = analyzer
    
    @staticmethod
    def _format_rules(section_name: str) -> str:
        """Standard formatting rules for all sections"""
        return f"""FORMATTING RULES:
- Write in plain paragraphs ONLY - absolutely NO bullet points, NO lists, NO dashes
- Do NOT start with a section heading like "{section_name}" - we already have that heading in the UI
- Start directly with the content
- NEVER use markdown formatting (no ##, no **, no bullet points, no numbered lists)
- Just write naturally flowing paragraphs

CONTENT RULES:
- NEVER mention dimension variable names (LUMEN, AETHER, CHRONOS, KAEL, etc)
- NEVER say "Your X score is..." or "X is high/low at..."
- Just describe the person naturally using everyday language
- Write in second person ("You...")"""
    
    def build_core_identity_prompt(self) -> str:
        """Build prompt for Core Identity section"""
        profile = self.analyzer.detect_profile_pattern()
        high_traits = self.analyzer.get_high_traits()
        low_traits = self.analyzer.get_low_traits()
        conflicts = self.analyzer.detect_conflicts()
        
        # Build dimension summaries WITHOUT showing variable names
        dim_summaries = []
        for dim in self.analyzer.dimensions:
            template = dim.template
            trait_name = self.analyzer.DIMENSION_NAMES[dim.name]
            level = dim.level.replace('_', ' ').title()
            core_nature = template.get('core_nature', 'N/A')[:200]
            
            summary = f"""
{trait_name}: {dim.score}/100 - {level}
Core: {core_nature}...
"""
            dim_summaries.append(summary)
        
        # Build conflict descriptions WITHOUT variable names
        conflict_text = "\n".join([
            f"- {self.analyzer.DIMENSION_NAMES[c.dim1.name]} ({c.dim1.score}) vs {self.analyzer.DIMENSION_NAMES[c.dim2.name]} ({c.dim2.score}): {c.impact}"
            for c in conflicts
        ]) if conflicts else "No major conflicts detected"
        
        prompt = f"""Write a personality assessment that sounds like a real conversation, not a novel.

PROFILE: {profile['pattern']}
{profile['description']}

TRAIT SCORES:
{"".join(dim_summaries)}

CONFLICTS:
{conflict_text}

YOUR TASK:
Write the "Core Identity" section (400-600 words) that explains who this person is.

FORMATTING RULES:
- Wrwite in plain paragraphs ONLY - absolutely NO bullet points, NO lists, NO dashes
- Do NOT start with a section heading like "Core Identity" or "Who You Are" - we already have that
- Start directly with the content
- NEVER use markdown formatting (no ##, no **, no bullet points, no numbered lists)
- Just write naturally flowing paragraphs

CONTENT RULES:
- NEVER mention dimension variable names (LUMEN, AETHER, CHRONOS, KAEL, etc) in your response
- NEVER say "Your X score is..." or "X is high/low at..."
- Just describe the person naturally using everyday language
- Readers should NOT see internal variable names - only natural descriptions

Guidelines:
1. Explain how these 8 traits work together to make one person
2. Point out conflicts and contradictions directly
3. Use everyday language - avoid metaphors, drama, and flowery writing
4. Be honest and practical, like a friend giving straight advice
5. Focus on what matters most (the extreme scores and conflicts)
6. Keep it conversational and easy to understand

Write in second person ("You are..."). Remember: plain paragraphs only, NO formatting."""

        return prompt
    
    def build_motivations_prompt(self) -> str:
        """Build prompt for unified motivations section"""
        # Extract all "what drives you" from templates WITHOUT variable names
        all_motivations = []
        for dim in self.analyzer.dimensions:
            template = dim.template
            trait_name = self.analyzer.DIMENSION_NAMES[dim.name]
            if 'what_drives_you' in template:
                for motivation in template['what_drives_you']:
                    all_motivations.append(f"{trait_name}: {motivation}")
        
        prompt = f"""Write a personality assessment in plain, conversational language.

TRAIT SCORES:
{self._get_dimension_summary()}

WHAT DRIVES THIS PERSON:
{chr(10).join(all_motivations)}

YOUR TASK:
Write a "Core Motivations" section (300-400 words) that explains what really drives this person.

FORMATTING RULES:
- Write in plain paragraphs ONLY - absolutely NO bullet points, NO lists, NO dashes
- Do NOT start with a section heading like "Core Motivations" or "What Drives You" - we already have that
- Start directly with the content
- NEVER use markdown formatting (no ##, no **, no bullet points, no numbered lists)
- Just write naturally flowing paragraphs

CONTENT RULES:
- NEVER mention dimension variable names (LUMEN, AETHER, CHRONOS, KAEL, etc) in your response
- NEVER say "Your X score is..." or "X is high/low at..."
- Just describe the person naturally using everyday language

Guidelines:
1. Find 3-5 main themes that connect different motivations
2. Explain what they really want and why
3. Use simple, everyday language - no metaphors or drama
4. Be direct and practical
5. Make it flow naturally, not like a list

Write in second person. Remember: plain paragraphs only, NO formatting."""

        return prompt
    
    def build_conflicts_prompt(self) -> str:
        """Build prompt for conflicts section"""
        conflicts = self.analyzer.detect_conflicts()
        
        if not conflicts:
            conflict_details = "No major conflicts detected between traits."
        else:
            conflict_details = "\n".join([
                f"- {self.analyzer.DIMENSION_NAMES[c.dim1.name]} ({c.dim1.score}) vs {self.analyzer.DIMENSION_NAMES[c.dim2.name]} ({c.dim2.score}): {c.impact}"
                for c in conflicts
            ])
        
        prompt = f"""Explain the conflicts in this person's personality in simple terms.

TRAIT SCORES:
{self._get_dimension_summary()}

CONFLICTS DETECTED:
{conflict_details}

YOUR TASK:
Write a "Conflicts" section (200-300 words) that explains where this person's traits clash.

CRITICAL RULES:
- NEVER mention dimension variable names (LUMEN, AETHER, CHRONOS, KAEL, etc) in your response
- NEVER say "Your X score is..." or "X is high/low at..."
- Just describe the conflicts naturally using everyday language

Guidelines:
1. Explain each conflict in plain English - what's pulling in different directions
2. Show how these conflicts play out in real life
3. Be specific about the problems this causes
4. Use everyday language - no drama or fancy words
5. Keep it practical and honest

Write in second person. Just explain what's going on clearly."""

        return prompt
    
    def build_strengths_prompt(self) -> str:
        """Build prompt for strengths section"""
        high_traits = self.analyzer.get_high_traits()
        
        if not high_traits:
            strengths_text = "Scores are mostly in the moderate range - no extreme strengths identified."
        else:
            strengths_text = "\n".join([
                f"- {self.analyzer.DIMENSION_NAMES[d.name]}: {d.score}/100 - {d.template.get('core_nature', 'N/A')[:150]}"
                for d in high_traits
            ])
        
        prompt = f"""Explain this person's strengths in simple, direct language.

TRAIT SCORES:
{self._get_dimension_summary()}

HIGH SCORING TRAITS:
{strengths_text}

YOUR TASK:
Write a "Strengths" section (200-300 words) that explains what this person does well.

CRITICAL RULES:
- NEVER mention dimension variable names (LUMEN, AETHER, CHRONOS, KAEL, etc) in your response
- NEVER say "Your X score is..." or "X is high/low at..."
- Just describe their strengths naturally using everyday language

Guidelines:
1. Focus on the highest scoring traits and what they mean in practice
2. Explain how these strengths help in real situations
3. Be specific about what works for this person
4. Use plain language - no hype or exaggeration
5. Keep it grounded and practical

Write in second person. Just tell them what they're good at."""

        return prompt
    
    def build_growth_areas_prompt(self) -> str:
        """Build prompt for growth areas section"""
        growth_priorities = self.analyzer.prioritize_growth_areas()
        
        if not growth_priorities:
            growth_text = "No major growth areas identified - scores are mostly balanced."
        else:
            growth_text = "\n".join([
                f"- {self.analyzer.DIMENSION_NAMES[dim.name]} ({dim.score}/100): {priority}"
                for dim, priority in growth_priorities[:5]
            ])
        
        prompt = f"""Explain what this person should work on, in plain talk.

TRAIT SCORES:
{self._get_dimension_summary()}

GROWTH PRIORITIES:
{growth_text}

YOUR TASK:
Write a "Growth Areas" section (200-300 words) that explains what needs improvement.

CRITICAL RULES:
- NEVER mention dimension variable names (LUMEN, AETHER, CHRONOS, KAEL, etc) in your response
- NEVER say "Your X score is..." or "X is high/low at..."
- Just describe growth areas naturally using everyday language

Guidelines:
1. Focus on the lowest scores and biggest problems
2. Explain why these matter and what they're costing this person
3. Be direct about what needs to change
4. Use simple language - no sugarcoating but no drama either
5. Keep it practical and actionable

Write in second person. Just tell them what to work on and why."""

        return prompt
    
    def build_relationships_prompt(self) -> str:
        """Build prompt for relationships section"""
        # Get relevant relationship dimensions
        dim_dict = {d.name: d for d in self.analyzer.dimensions}
        lumen = dim_dict.get('LUMEN')
        orpheus = dim_dict.get('ORPHEUS')
        aether = dim_dict.get('AETHER')
        vara = dim_dict.get('VARA')
        
        rel_summary = f"""
Social Energy: {lumen.score if lumen else 'N/A'}/100
Empathy: {orpheus.score if orpheus else 'N/A'}/100
Emotional Stability: {aether.score if aether else 'N/A'}/100
Honesty: {vara.score if vara else 'N/A'}/100
"""
        
        prompt = f"""Explain how this person shows up in relationships.

TRAIT SCORES:
{self._get_dimension_summary()}

KEY RELATIONSHIP TRAITS:
{rel_summary}

YOUR TASK:
Write a "Relationships" section (200-300 words) about how this person connects with others.

CRITICAL RULES:
- NEVER mention dimension variable names (LUMEN, AETHER, CHRONOS, KAEL, etc) in your response
- NEVER say "Your X score is..." or "X is high/low at..."
- Just describe their relationship style naturally using everyday language

Guidelines:
1. Explain their relationship style in everyday terms
2. Talk about what they're like as a friend, partner, or family member
3. Point out patterns in how they connect (or struggle to connect)
4. Use simple language - no psychology jargon
5. Be honest about strengths and challenges

Write in second person. Just explain how they are with people."""

        return prompt
    
    def build_work_style_prompt(self) -> str:
        """Build prompt for work style section"""
        # Get relevant work dimensions
        dim_dict = {d.name: d for d in self.analyzer.dimensions}
        orin = dim_dict.get('ORIN')
        lyra = dim_dict.get('LYRA')
        chronos = dim_dict.get('CHRONOS')
        kael = dim_dict.get('KAEL')
        
        work_summary = f"""
Organization: {orin.score if orin else 'N/A'}/100
Creativity: {lyra.score if lyra else 'N/A'}/100
Patience: {chronos.score if chronos else 'N/A'}/100
Confidence: {kael.score if kael else 'N/A'}/100
"""
        
        prompt = f"""Explain how this person operates at work or with tasks.

TRAIT SCORES:
{self._get_dimension_summary()}

KEY WORK TRAITS:
{work_summary}

YOUR TASK:
Write a "Work Style" section (200-300 words) about how this person gets things done.

CRITICAL RULES:
- NEVER mention dimension variable names (LUMEN, AETHER, CHRONOS, KAEL, etc) in your response
- NEVER say "Your X score is..." or "X is high/low at..."
- Just describe their work style naturally using everyday language

Guidelines:
1. Explain their approach to work and tasks in plain terms
2. Talk about how they handle planning, deadlines, and pressure
3. Point out what works and what doesn't in their work habits
4. Use everyday language - no business buzzwords
5. Be practical and specific

Write in second person. Just tell them how they work."""

        return prompt
    
    def _get_dimension_summary(self) -> str:
        """Get brief summary of all dimensions WITHOUT variable names"""
        lines = []
        for dim in self.analyzer.dimensions:
            trait_name = self.analyzer.DIMENSION_NAMES[dim.name]
            lines.append(f"- {trait_name}: {dim.score}/100 ({dim.level.replace('_', ' ')})")
        return "\n".join(lines)


# Export main classes
__all__ = ['PersonalityAnalyzer', 'NarrativePromptBuilder', 'DimensionAnalysis', 'TraitConflict']
