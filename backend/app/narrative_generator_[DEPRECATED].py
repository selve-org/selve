"""
SELVE Narrative Generation System

Transforms SELVE personality profiles into meaningful, personalized insights.
Includes dimension descriptions, archetypes, strengths, growth areas, and
personalized narratives.

Author: SELVE Team
"""

from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass

try:
    from app.scoring import SelveProfile, DimensionScore
except ImportError:
    from scoring import SelveProfile, DimensionScore


@dataclass
class DimensionNarrative:
    """Narrative for a single dimension."""
    dimension: str
    score: float
    level: str  # Very High, High, Moderate, Low, Very Low
    title: str
    description: str
    strengths: List[str]
    growth_areas: List[str]
    workplace_implications: str
    relationship_implications: str


@dataclass
class Archetype:
    """Personality archetype based on dimension combinations."""
    name: str
    description: str
    key_dimensions: Dict[str, str]  # dimension -> expected level
    strengths: List[str]
    challenges: List[str]
    famous_examples: List[str]
    career_fits: List[str]


@dataclass
class PersonalityNarrative:
    """Complete personality narrative."""
    profile: SelveProfile
    dimension_narratives: Dict[str, DimensionNarrative]
    primary_archetype: Optional[Archetype]
    secondary_archetype: Optional[Archetype]
    top_strengths: List[str]
    growth_opportunities: List[str]
    summary: str
    detailed_analysis: str


class NarrativeGenerator:
    """
    Generates personalized narratives from SELVE profiles.
    
    Transforms numerical scores into meaningful insights about:
    - Individual dimension meanings
    - Personality archetypes
    - Strengths and growth areas
    - Relationship and workplace implications
    """
    
    def __init__(self):
        """Initialize narrative generator with templates and archetypes."""
        self._load_dimension_templates()
        self._load_archetypes()
    
    def _load_dimension_templates(self):
        """Load narrative templates for each dimension."""
        
        # LUMEN - Social Energy & Enthusiasm
        self.LUMEN_TEMPLATES = {
            'very_high': {
                'title': 'Highly Social & Energetic',
                'description': 'You are naturally outgoing, talkative, and draw energy from social interactions. You light up rooms with your presence and enthusiasm, easily connecting with others. Your vibrant social energy makes you magnetic and approachable.',
                'strengths': [
                    'Natural ability to energize and motivate groups',
                    'Excellent at networking and building connections',
                    'Confident in social situations and public speaking',
                    'Creates warm, welcoming atmospheres',
                    'Thrives in collaborative, team-based environments'
                ],
                'growth_areas': [
                    'May dominate conversations unintentionally',
                    'Could struggle with solitary work or deep focus',
                    'Might not always pick up on others needing quiet time',
                    'Risk of burnout from overcommitting socially'
                ],
                'workplace': 'Excel in roles involving frequent interaction: sales, marketing, HR, teaching, event management. Natural team leaders and motivators.',
                'relationships': 'Bring energy and excitement to relationships. Need partners who appreciate your social nature and join you in activities, or give you space to socialize.'
            },
            'high': {
                'title': 'Socially Confident & Engaging',
                'description': 'You enjoy social interactions and handle them with confidence. While not always the center of attention, you actively participate in conversations and feel comfortable in group settings. You balance social energy with some need for downtime.',
                'strengths': [
                    'Comfortable initiating conversations and connections',
                    'Good at reading social situations',
                    'Can energize others when needed',
                    'Balance between socializing and alone time',
                    'Reliable in team settings'
                ],
                'growth_areas': [
                    'May occasionally overschedule social commitments',
                    'Could be more mindful of introverted colleagues',
                    'Might need to develop deeper one-on-one connection skills'
                ],
                'workplace': 'Versatile in various roles. Work well in both team and independent settings. Good fit for customer-facing positions, management, consulting.',
                'relationships': 'Enjoy socializing together but also appreciate quiet evenings. Flexible and adaptable to partners with different social needs.'
            },
            'moderate': {
                'title': 'Balanced Social Energy',
                'description': 'You have a flexible approach to social situations. Sometimes you enjoy being outgoing and engaging, while other times you prefer quieter, more intimate settings. Your social energy depends on context, mood, and the people involved.',
                'strengths': [
                    'Adaptable to different social contexts',
                    'Can work independently or in teams',
                    'Neither drained nor energized by social interaction',
                    'Understand both introverts and extroverts',
                    'Comfortable in varied environments'
                ],
                'growth_areas': [
                    'May seem inconsistent in social engagement',
                    'Could benefit from knowing your social energy patterns',
                    'Might need to communicate your needs more clearly'
                ],
                'workplace': 'Highly adaptable to different work environments. Can thrive in roles requiring both collaboration and independent work. Good at bridging between team members.',
                'relationships': 'Flexible partner who can adapt to different social rhythms. Appreciate variety in activities - sometimes social, sometimes quiet.'
            },
            'low': {
                'title': 'Selectively Social & Reserved',
                'description': 'You tend to be more reserved in social situations, preferring smaller gatherings or one-on-one interactions. Large groups can feel draining, and you recharge through solitude. You express yourself more comfortably with people you know well.',
                'strengths': [
                    'Deep, meaningful one-on-one connections',
                    'Excellent listener and observer',
                    'Comfortable with solitude and independent work',
                    'Think before speaking, offering thoughtful contributions',
                    'Less need for external validation'
                ],
                'growth_areas': [
                    'May miss networking opportunities',
                    'Could be perceived as aloof or uninterested',
                    'Might need to push comfort zone for career advancement',
                    'May struggle in roles requiring constant interaction'
                ],
                'workplace': 'Excel in roles allowing focused, independent work: research, writing, programming, design, analysis. Prefer smaller teams and minimal meetings.',
                'relationships': 'Value deep connection over social activity. Need partners who respect your need for solitude and don\'t pressure you to constantly socialize.'
            },
            'very_low': {
                'title': 'Highly Introverted & Private',
                'description': 'You strongly prefer solitude and find most social interactions draining. You have a rich inner world and are most energized when alone. Social situations require significant effort, and you carefully choose when and how you engage with others.',
                'strengths': [
                    'Exceptional focus and concentration',
                    'Deep, reflective thinking abilities',
                    'Self-sufficient and independent',
                    'Value quality over quantity in relationships',
                    'Strong written communication skills'
                ],
                'growth_areas': [
                    'May isolate too much, missing valuable connections',
                    'Could benefit from developing small talk skills',
                    'Might be misunderstood as unfriendly',
                    'Need to balance solitude with minimal social engagement'
                ],
                'workplace': 'Thrive in highly independent roles with minimal interaction: remote work, research, technical roles, creative work. Need quiet workspace and limited meetings.',
                'relationships': 'Need partners who deeply respect your need for alone time and don\'t take it personally. Prefer quiet, intimate moments together.'
            }
        }
        
        # AETHER - Emotional Stability & Calm
        self.AETHER_TEMPLATES = {
            'very_high': {
                'title': 'Exceptionally Calm & Resilient',
                'description': 'You maintain remarkable emotional stability even in stressful situations. Your calm demeanor serves as an anchor for others during turbulent times. You rarely experience anxiety or mood swings, approaching challenges with steady composure.',
                'strengths': [
                    'Unshakeable in crisis situations',
                    'Provide calming influence to others',
                    'Make rational decisions under pressure',
                    'Recover quickly from setbacks',
                    'Rarely rattled by criticism or conflict'
                ],
                'growth_areas': [
                    'May appear emotionally detached at times',
                    'Could underestimate others\' emotional reactions',
                    'Might not recognize when stress is affecting you',
                    'May need to show more empathy for anxious individuals'
                ],
                'workplace': 'Excel in high-pressure roles: emergency services, crisis management, leadership, air traffic control, surgery. Stabilizing force in chaotic environments.',
                'relationships': 'Provide stability and calm in relationships. Partners appreciate your steadiness but may sometimes want more emotional expression.'
            },
            'high': {
                'title': 'Emotionally Stable & Even-Tempered',
                'description': 'You generally maintain good emotional balance and handle stress well. While you experience normal emotions, they don\'t overwhelm you. You bounce back from difficulties relatively quickly and maintain perspective.',
                'strengths': [
                    'Handle most stressors effectively',
                    'Maintain positive outlook',
                    'Provide stability in relationships',
                    'Think clearly under moderate pressure',
                    'Don\'t dwell excessively on problems'
                ],
                'growth_areas': [
                    'May occasionally suppress emotions that need expression',
                    'Could be more understanding of high-stress reactions',
                    'Might benefit from acknowledging your own stress earlier'
                ],
                'workplace': 'Reliable in demanding roles. Handle deadlines and challenges well. Good for management, healthcare, education, client services.',
                'relationships': 'Steady and reliable partner. Provide emotional support without being overwhelmed. Help partners maintain perspective.'
            },
            'moderate': {
                'title': 'Balanced Emotional Responses',
                'description': 'Your emotional stability varies with circumstances. Some situations you handle with ease, while others trigger more stress or worry. You experience a normal range of emotions and moods, neither exceptionally calm nor particularly anxious.',
                'strengths': [
                    'Authentic emotional expression',
                    'Can relate to various emotional experiences',
                    'Neither numb nor overwhelmed',
                    'Recognize when you need support',
                    'Developing coping strategies'
                ],
                'growth_areas': [
                    'Could strengthen stress management skills',
                    'May experience mood fluctuations',
                    'Benefit from identifying stress triggers',
                    'Work on emotional regulation techniques'
                ],
                'workplace': 'Perform well in moderate-stress environments. May need good work-life balance and supportive colleagues. Suitable for most roles with reasonable demands.',
                'relationships': 'Experience full range of emotions in relationships. Partners appreciate your authenticity but may need to help you through stressful periods.'
            },
            'low': {
                'title': 'Emotionally Sensitive & Reactive',
                'description': 'You experience emotions intensely and are sensitive to stress. You worry more than most and can be deeply affected by criticism or conflict. Your emotional responses are strong and genuine, though they can sometimes feel overwhelming.',
                'strengths': [
                    'Highly empathetic and emotionally aware',
                    'Deeply passionate and caring',
                    'Motivate yourself through concern and vigilance',
                    'Sensitive to others\' emotional needs',
                    'Take potential problems seriously'
                ],
                'growth_areas': [
                    'May experience frequent anxiety or worry',
                    'Could ruminate on problems',
                    'Might be overwhelmed by criticism',
                    'Need to develop stronger coping mechanisms',
                    'May struggle in high-pressure environments'
                ],
                'workplace': 'Thrive in supportive, low-stress environments. Need understanding colleagues and reasonable workloads. Avoid high-pressure, crisis-driven roles.',
                'relationships': 'Deeply caring but may need reassurance frequently. Partners should be patient, supportive, and emotionally available.'
            },
            'very_low': {
                'title': 'Highly Sensitive & Emotionally Vulnerable',
                'description': 'You experience intense emotional reactions and struggle with anxiety, stress, or mood swings. Small stressors can feel overwhelming, and you need significant support to maintain emotional balance. Your sensitivity means you feel things deeply.',
                'strengths': [
                    'Profound emotional depth and empathy',
                    'Highly attuned to emotional nuances',
                    'Passionate and deeply caring',
                    'Seek help and support when needed',
                    'Motivate positive change through awareness of problems'
                ],
                'growth_areas': [
                    'Need professional support for emotional regulation',
                    'May benefit from therapy or counseling',
                    'Should develop strong coping strategies',
                    'Require stable, low-stress environment',
                    'Need to build resilience gradually'
                ],
                'workplace': 'Require very supportive, stable work environment. Remote work or flexible schedules helpful. Avoid high-pressure, unpredictable roles. May need accommodations.',
                'relationships': 'Need exceptionally patient, supportive partner. Require frequent reassurance and emotional safety. Open communication about needs is essential.'
            }
        }
        
        # ORPHEUS - Empathy & Compassion
        self.ORPHEUS_TEMPLATES = {
            'very_high': {
                'title': 'Deeply Empathetic & Compassionate',
                'description': 'You have an extraordinary capacity for empathy and compassion. You deeply feel others\' emotions and are driven to help and support. Your warmth and caring nature make others feel truly seen and understood. You prioritize harmony and kindness in all interactions.',
                'strengths': [
                    'Exceptional at understanding others\' perspectives',
                    'Natural counselor and supporter',
                    'Create safe, nurturing environments',
                    'Quick to forgive and see the good in people',
                    'Build deep, trusting relationships'
                ],
                'growth_areas': [
                    'May absorb others\' emotions to your detriment',
                    'Could struggle with necessary boundaries',
                    'Might avoid needed confrontation',
                    'Risk burning out from excessive caring',
                    'May be taken advantage of'
                ],
                'workplace': 'Excel in helping professions: counseling, social work, nursing, teaching, HR, customer service. Natural mediators and team builders.',
                'relationships': 'Deeply caring and attentive partner. May need to ensure your needs are also met. Could attract partners who need excessive support.'
            },
            'high': {
                'title': 'Warm & Understanding',
                'description': 'You genuinely care about others\' well-being and show compassion readily. You\'re considerate, kind, and work to maintain positive relationships. While you set some boundaries, you generally prioritize others\' needs and feelings.',
                'strengths': [
                    'Good at perspective-taking',
                    'Create positive team dynamics',
                    'Trusted confidant to others',
                    'Balance caring with self-care',
                    'Diplomatically handle conflicts'
                ],
                'growth_areas': [
                    'May still struggle with boundaries at times',
                    'Could occasionally prioritize peace over honesty',
                    'Might avoid difficult conversations'
                ],
                'workplace': 'Valuable in team environments, customer relations, healthcare, education. Good managers who care about employee well-being.',
                'relationships': 'Caring and supportive partner who maintains healthy give-and-take. Create warm, nurturing relationships.'
            },
            'moderate': {
                'title': 'Selectively Compassionate',
                'description': 'You show compassion when appropriate but maintain balanced concern for yourself and others. You can be caring and empathetic, but also pragmatic when needed. Your empathy is genuine but doesn\'t override your own needs.',
                'strengths': [
                    'Balance self-interest with concern for others',
                    'Can be objective when necessary',
                    'Set appropriate boundaries',
                    'Neither overly harsh nor overly soft',
                    'Practical helper'
                ],
                'growth_areas': [
                    'May seem inconsistent in caring responses',
                    'Could develop deeper empathy skills',
                    'Might benefit from showing more warmth at times'
                ],
                'workplace': 'Versatile across roles. Can balance task and people orientation. Good in positions requiring both compassion and objectivity.',
                'relationships': 'Balanced partner who cares but maintains healthy independence. Neither overly absorbed in partner\'s issues nor detached.'
            },
            'low': {
                'title': 'Pragmatic & Self-Focused',
                'description': 'You tend to be more pragmatic than empathetic, focusing on logic over emotions. You prioritize your own needs and goals, and may find others\' emotional concerns less compelling. You value straightforwardness over emotional sensitivity.',
                'strengths': [
                    'Make decisions based on logic, not emotions',
                    'Strong personal boundaries',
                    'Direct and honest communication',
                    'Efficient at problem-solving',
                    'Not swayed by emotional manipulation'
                ],
                'growth_areas': [
                    'May seem cold or uncaring to others',
                    'Could miss important emotional cues',
                    'Might damage relationships with bluntness',
                    'Need to consider others\' feelings more',
                    'May struggle in roles requiring empathy'
                ],
                'workplace': 'Excel in objective, task-focused roles: analysis, engineering, law, finance. Less suited for helping professions or customer service.',
                'relationships': 'Need partner who doesn\'t require high emotional support. May struggle with partners needing empathy and emotional connection.'
            },
            'very_low': {
                'title': 'Highly Analytical & Detached',
                'description': 'You operate primarily from logic and self-interest, with limited concern for others\' emotions. You may find empathy difficult or irrelevant, preferring efficiency and directness. Others may perceive you as cold or harsh.',
                'strengths': [
                    'Completely objective decision-making',
                    'Ruthlessly efficient',
                    'Impervious to emotional manipulation',
                    'Brutally honest',
                    'Strong sense of self-interest'
                ],
                'growth_areas': [
                    'Developing basic empathy skills is crucial',
                    'May alienate others unintentionally',
                    'Risk appearing heartless or cruel',
                    'Should work on emotional intelligence',
                    'Need to consider social consequences of actions'
                ],
                'workplace': 'Best in highly technical, isolated roles where empathy isn\'t needed. May struggle with management, teamwork, or customer interaction.',
                'relationships': 'Relationships very challenging without empathy development. Need partner who doesn\'t need emotional support and accepts detachment.'
            }
        }
        
        # Add templates for remaining dimensions...
        # (ORIN, LYRA, VARA, CHRONOS, KAEL)
        # For brevity, I'll create shorter templates for these
        
        self.ORIN_TEMPLATES = {
            'very_high': {
                'title': 'Exceptionally Organized & Disciplined',
                'description': 'You are highly organized, disciplined, and detail-oriented. Everything has its place, and you follow through on commitments reliably. You thrive on structure and planning.',
                'strengths': ['Exceptional reliability', 'Excellent planning skills', 'High attention to detail', 'Strong work ethic', 'Goal-oriented'],
                'growth_areas': ['May be inflexible', 'Could be perfectionistic', 'Might struggle with spontaneity', 'May stress over minor disorganization'],
                'workplace': 'Excel in roles requiring precision: project management, accounting, operations, quality control, administration.',
                'relationships': 'Reliable partner who keeps life organized. May need to relax control and embrace spontaneity with partners.'
            },
            'moderate': {
                'title': 'Balanced Organization',
                'description': 'You maintain reasonable organization without being rigid. You can plan when needed but also embrace some spontaneity.',
                'strengths': ['Flexible yet organized', 'Can adapt to structure or chaos', 'Balance planning with spontaneity', 'Practical approach'],
                'growth_areas': ['Could be more consistent', 'May procrastinate occasionally', 'Benefit from better systems'],
                'workplace': 'Adaptable to various work styles. Handle both structured and flexible environments.',
                'relationships': 'Balanced partner who can plan dates but also enjoy spontaneous adventures. Adaptable to partner\'s style.'
            },
            'very_low': {
                'title': 'Highly Spontaneous & Flexible',
                'description': 'You operate with minimal structure, preferring flexibility and spontaneity. Planning feels restrictive, and you thrive on going with the flow.',
                'strengths': ['Highly adaptable', 'Comfortable with ambiguity', 'Spontaneous and creative', 'Low stress about disorder', 'Live in the moment'],
                'growth_areas': ['May miss deadlines', 'Could lose important items', 'Might underestimate planning needs', 'May frustrate structured individuals'],
                'workplace': 'Thrive in creative, flexible roles. May struggle with strict deadlines and detailed procedures. Need accommodating environment.',
                'relationships': 'Bring spontaneity and adventure. Need partner who accepts or balances your disorganization.'
            }
        }
        
        # Continue with other dimensions...
        self.dimension_templates = {
            'LUMEN': self.LUMEN_TEMPLATES,
            'AETHER': self.AETHER_TEMPLATES,
            'ORPHEUS': self.ORPHEUS_TEMPLATES,
            'ORIN': self.ORIN_TEMPLATES,
            # Add LYRA, VARA, CHRONOS, KAEL...
        }
    
    def _load_archetypes(self):
        """Load personality archetypes based on dimension combinations."""
        self.archetypes = [
            Archetype(
                name="The Charismatic Leader",
                description="High LUMEN, High KAEL - Natural leaders who inspire and energize others with confidence and social magnetism.",
                key_dimensions={'LUMEN': 'high', 'KAEL': 'high'},
                strengths=['Natural leadership', 'Inspiring speaker', 'Builds strong teams', 'Decisive and social'],
                challenges=['May dominate too much', 'Could ignore dissent', 'Might burn out from overcommitment'],
                famous_examples=['Tony Robbins', 'Oprah Winfrey', 'Barack Obama'],
                career_fits=['CEO', 'Sales Leader', 'Motivational Speaker', 'Politician', 'Executive Coach']
            ),
            Archetype(
                name="The Compassionate Healer",
                description="High ORPHEUS, High CHRONOS - Deeply empathetic souls who patiently support and heal others.",
                key_dimensions={'ORPHEUS': 'high', 'CHRONOS': 'high'},
                strengths=['Deep empathy', 'Patient listener', 'Creates safe spaces', 'Conflict resolver'],
                challenges=['Boundary issues', 'May absorb others\' pain', 'Could neglect self-care'],
                famous_examples=['Mr. Rogers', 'Dalai Lama', 'Mother Teresa'],
                career_fits=['Therapist', 'Counselor', 'Social Worker', 'Nurse', 'Teacher', 'Mediator']
            ),
            Archetype(
                name="The Analytical Architect",
                description="High ORIN, High LYRA, Low ORPHEUS - Systematic thinkers who build complex solutions through logic and creativity.",
                key_dimensions={'ORIN': 'high', 'LYRA': 'high', 'ORPHEUS': 'low'},
                strengths=['Systematic thinking', 'Creative problem-solving', 'Detail-oriented', 'Objective analysis'],
                challenges=['May seem cold', 'Could miss emotional aspects', 'Might overcomplicate'],
                famous_examples=['Elon Musk', 'Steve Jobs', 'Bill Gates'],
                career_fits=['Software Engineer', 'Architect', 'Data Scientist', 'Strategic Planner', 'Researcher']
            ),
            Archetype(
                name="The Steady Guardian",
                description="High AETHER, High VARA, High CHRONOS - Calm, ethical, patient souls who provide stability and moral guidance.",
                key_dimensions={'AETHER': 'high', 'VARA': 'high', 'CHRONOS': 'high'},
                strengths=['Unshakeable calm', 'Strong ethics', 'Patient and forgiving', 'Trustworthy'],
                challenges=['May seem emotionally distant', 'Could be too tolerant', 'Might avoid confrontation'],
                famous_examples=['Nelson Mandela', 'Jimmy Carter', 'Malala Yousafzai'],
                career_fits=['Judge', 'Ethics Officer', 'Religious Leader', 'Diplomat', 'Crisis Manager']
            ),
            Archetype(
                name="The Creative Visionary",
                description="High LYRA, High LUMEN, Low ORIN - Imaginative innovators who think outside the box and inspire others with new possibilities.",
                key_dimensions={'LYRA': 'high', 'LUMEN': 'high', 'ORIN': 'low'},
                strengths=['Innovative thinking', 'Charismatic vision', 'Embraces change', 'Inspires creativity'],
                challenges=['May lack follow-through', 'Could be disorganized', 'Might abandon projects'],
                famous_examples=['Steve Jobs', 'Lady Gaga', 'Richard Branson'],
                career_fits=['Entrepreneur', 'Artist', 'Creative Director', 'Innovation Consultant', 'Designer']
            ),
            # Add more archetypes...
        ]
    
    def _get_score_level(self, score: float) -> str:
        """Convert numerical score to level description."""
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
    
    def generate_dimension_narrative(
        self,
        dimension: str,
        dimension_score: DimensionScore
    ) -> DimensionNarrative:
        """
        Generate narrative for a single dimension.
        
        Args:
            dimension: Dimension name (e.g., 'LUMEN')
            dimension_score: DimensionScore object
        
        Returns:
            DimensionNarrative with personalized insights
        """
        score_level = self._get_score_level(dimension_score.normalized_score)
        
        # Get templates for this dimension
        templates = self.dimension_templates.get(dimension, {})
        template = templates.get(score_level, templates.get('moderate', {}))
        
        return DimensionNarrative(
            dimension=dimension,
            score=dimension_score.normalized_score,
            level=dimension_score.interpretation,
            title=template.get('title', f'{dimension} Profile'),
            description=template.get('description', 'No description available.'),
            strengths=template.get('strengths', []),
            growth_areas=template.get('growth_areas', []),
            workplace_implications=template.get('workplace', ''),
            relationship_implications=template.get('relationships', '')
        )
    
    def identify_archetype(self, profile: SelveProfile) -> Optional[Archetype]:
        """
        Identify personality archetype based on profile.
        
        Args:
            profile: SelveProfile object
        
        Returns:
            Best matching Archetype or None
        """
        best_match = None
        best_score = 0
        
        for archetype in self.archetypes:
            match_score = 0
            
            for dim, expected_level in archetype.key_dimensions.items():
                dim_score = getattr(profile, dim.lower())
                actual_level = self._get_score_level(dim_score.normalized_score)
                
                # Check if level matches
                if expected_level == 'high' and actual_level in ['high', 'very_high']:
                    match_score += 2
                elif expected_level == 'low' and actual_level in ['low', 'very_low']:
                    match_score += 2
                elif expected_level == actual_level:
                    match_score += 3
                elif abs(self._level_to_score(expected_level) - self._level_to_score(actual_level)) <= 1:
                    match_score += 1
            
            if match_score > best_score:
                best_score = match_score
                best_match = archetype
        
        # Only return if reasonably confident match
        return best_match if best_score >= 4 else None
    
    def _level_to_score(self, level: str) -> int:
        """Convert level to numerical score for comparison."""
        level_map = {
            'very_low': 0,
            'low': 1,
            'moderate': 2,
            'high': 3,
            'very_high': 4
        }
        return level_map.get(level, 2)
    
    def generate_summary(self, profile: SelveProfile, archetype: Optional[Archetype]) -> str:
        """
        Generate overall personality summary.
        
        Args:
            profile: SelveProfile object
            archetype: Identified Archetype or None
        
        Returns:
            Summary paragraph
        """
        top_dims = profile.get_top_dimensions(3)
        top_scores = [getattr(profile, dim.lower()).normalized_score for dim in top_dims]
        
        dim_names = {
            'LUMEN': 'social energy',
            'AETHER': 'emotional stability',
            'ORPHEUS': 'empathy',
            'ORIN': 'organization',
            'LYRA': 'openness',
            'VARA': 'honesty-humility',
            'CHRONOS': 'patience',
            'KAEL': 'assertiveness'
        }
        
        summary = f"You are "
        
        if archetype:
            summary += f"best described as **{archetype.name}**. "
        
        summary += f"Your personality is most defined by your {dim_names.get(top_dims[0], top_dims[0]).lower()} "
        summary += f"(score: {top_scores[0]:.0f}/100), followed by your {dim_names.get(top_dims[1], top_dims[1]).lower()} "
        summary += f"({top_scores[1]:.0f}/100) and {dim_names.get(top_dims[2], top_dims[2]).lower()} ({top_scores[2]:.0f}/100). "
        
        if archetype:
            summary += f"This combination makes you {archetype.description.split('-')[1].strip().lower() if '-' in archetype.description else 'unique'}."
        
        return summary
    
    def generate_complete_narrative(self, profile: SelveProfile) -> PersonalityNarrative:
        """
        Generate complete personality narrative from profile.
        
        Args:
            profile: SelveProfile object
        
        Returns:
            PersonalityNarrative with full insights
        """
        # Generate narratives for each dimension
        dimension_narratives = {}
        all_strengths = []
        all_growth = []
        
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            dim_score = getattr(profile, dim.lower())
            narrative = self.generate_dimension_narrative(dim, dim_score)
            dimension_narratives[dim] = narrative
            
            # Collect strengths from high dimensions
            if dim_score.normalized_score >= 60:
                all_strengths.extend(narrative.strengths[:2])
            
            # Collect growth areas from extreme scores
            if dim_score.normalized_score < 40 or dim_score.normalized_score > 75:
                all_growth.extend(narrative.growth_areas[:2])
        
        # Identify archetype
        primary_archetype = self.identify_archetype(profile)
        
        # Generate summary
        summary = self.generate_summary(profile, primary_archetype)
        
        # Generate detailed analysis
        detailed = self._generate_detailed_analysis(profile, dimension_narratives, primary_archetype)
        
        return PersonalityNarrative(
            profile=profile,
            dimension_narratives=dimension_narratives,
            primary_archetype=primary_archetype,
            secondary_archetype=None,  # Could implement secondary archetype matching
            top_strengths=all_strengths[:5],
            growth_opportunities=all_growth[:5],
            summary=summary,
            detailed_analysis=detailed
        )
    
    def _generate_detailed_analysis(
        self,
        profile: SelveProfile,
        narratives: Dict[str, DimensionNarrative],
        archetype: Optional[Archetype]
    ) -> str:
        """Generate detailed personality analysis."""
        analysis = []
        
        analysis.append("## Your Personality Profile\n")
        analysis.append(self.generate_summary(profile, archetype))
        analysis.append("\n\n")
        
        if archetype:
            analysis.append(f"### Your Archetype: {archetype.name}\n")
            analysis.append(f"{archetype.description}\n\n")
            analysis.append(f"**Key Strengths:** {', '.join(archetype.strengths)}\n\n")
            analysis.append(f"**Career Fits:** {', '.join(archetype.career_fits)}\n\n")
        
        analysis.append("### Dimension Analysis\n\n")
        
        # Sort dimensions by score
        sorted_dims = sorted(
            narratives.items(),
            key=lambda x: x[1].score,
            reverse=True
        )
        
        for dim, narrative in sorted_dims:
            analysis.append(f"**{dim} - {narrative.title}** (Score: {narrative.score:.0f}/100)\n")
            analysis.append(f"{narrative.description}\n\n")
        
        return ''.join(analysis)
    
    def to_dict(self, narrative: PersonalityNarrative) -> Dict:
        """Convert narrative to dictionary for JSON export."""
        return {
            'summary': narrative.summary,
            'detailed_analysis': narrative.detailed_analysis,
            'archetype': {
                'name': narrative.primary_archetype.name,
                'description': narrative.primary_archetype.description,
                'strengths': narrative.primary_archetype.strengths,
                'challenges': narrative.primary_archetype.challenges,
                'career_fits': narrative.primary_archetype.career_fits
            } if narrative.primary_archetype else None,
            'top_strengths': narrative.top_strengths,
            'growth_opportunities': narrative.growth_opportunities,
            'dimensions': {
                dim: {
                    'title': narr.title,
                    'description': narr.description,
                    'score': narr.score,
                    'level': narr.level,
                    'strengths': narr.strengths,
                    'growth_areas': narr.growth_areas,
                    'workplace': narr.workplace_implications,
                    'relationships': narr.relationship_implications
                }
                for dim, narr in narrative.dimension_narratives.items()
            }
        }


def example_usage():
    """Example of narrative generation."""
    try:
        from app.scoring import SelveScorer
    except ImportError:
        from scoring import SelveScorer
    from pathlib import Path
    
    # Score a profile with correct path
    item_pool_path = Path(__file__).parent.parent.parent / 'data' / 'selve_item_pool_expanded.json'
    scorer = SelveScorer(str(item_pool_path))
    responses = {
        'E1': 5, 'E5': 5, 'E7': 4, 'E3': 5,
        'N1': 2, 'N6': 2, 'N8': 2,
        'A4': 5, 'A9': 5,
        'C1': 5, 'C5': 4,
        'O10': 5, 'O1': 4,
        'HMode10': 2, 'HFair1': 6,
        'APati3': 6, 'APati1': 5,
        'D4': 5, 'D6': 5,
    }
    profile = scorer.score_responses(responses)
    
    # Generate narrative
    generator = NarrativeGenerator()
    narrative = generator.generate_complete_narrative(profile)
    
    # Print results
    print("\n" + "="*70)
    print("SELVE PERSONALITY NARRATIVE")
    print("="*70)
    print(narrative.summary)
    print("\n" + "="*70)
    
    if narrative.primary_archetype:
        print(f"\nArchetype: {narrative.primary_archetype.name}")
        print(narrative.primary_archetype.description)
    
    print("\n" + "="*70)
    print("Top Strengths:")
    for i, strength in enumerate(narrative.top_strengths, 1):
        print(f"{i}. {strength}")
    
    print("\n" + "="*70)


if __name__ == '__main__':
    example_usage()
