"""
SELVE Personality Archetypes

Rich archetype definitions that capture personality patterns.
These help users understand their unique combination of traits.
"""

from typing import Dict, List
from dataclasses import dataclass


@dataclass
class Archetype:
    """Complete archetype definition."""
    name: str
    essence: str  # One-line core essence
    description: str  # Deep description
    pattern: Dict[str, str]  # Dimension -> level expectations
    core_traits: List[str]
    strengths: List[str]
    challenges: List[str]
    life_purpose: str
    relationships: str
    career_paths: List[str]
    famous_examples: List[str]
    growth_direction: str


# ============================================================================
# THE 20 CORE ARCHETYPES
# ============================================================================

ARCHETYPES = [
    Archetype(
        name="The Luminary",
        essence="Radiant leader who illuminates and inspires",
        description="You are a natural beacon - drawing people in with magnetic charisma while maintaining deep integrity. You lead not through force but through inspiration. People follow you because being around you makes THEM feel more alive. You combine social brilliance with ethical grounding and emotional stability.",
        pattern={'LUMEN': 'very_high', 'VARA': 'high', 'AETHER': 'high'},
        core_traits=['Charismatic', 'Trustworthy', 'Inspiring', 'Stable', 'Authentic'],
        strengths=[
            'People naturally gravitate to your leadership',
            'Inspire genuine loyalty and trust',
            'Maintain composure under pressure',
            'Build ethical, lasting organizations',
            'Balance ambition with integrity'
        ],
        challenges=[
            'Heavy burden of others\' expectations',
            'Might sacrifice personal needs for public image',
            'Can attract people who drain your energy',
            'May struggle with genuine solitude'
        ],
        life_purpose="To elevate humanity - inspire people to their highest potential while maintaining unwavering ethical standards. You're here to show that leadership can be both powerful and principled.",
        relationships="You attract admirers but need someone who sees the REAL you - not just the light. Your ideal partner provides grounding, privacy, and doesn't compete for spotlight. They appreciate your impact but protect your humanity.",
        career_paths=['CEO/Founder', 'Inspirational Speaker', 'Political Leader', 'Social Movement Leader', 'University President', 'Non-profit Director'],
        famous_examples=['Nelson Mandela', 'Barack Obama', 'Brené Brown'],
        growth_direction="Learn that darkness isn't enemy of light - it's the canvas that makes light visible. Embrace your shadows. Let people see your struggles, not just your triumphs."
    ),
    
    Archetype(
        name="The Healer",
        essence="Compassionate soul who transforms pain into wisdom",
        description="You FEEL everything - yours and others'. This isn't weakness; it's your superpower. You understand suffering because you've known it intimately. Your empathy isn't abstract - it's lived, visceral, real. You have an uncanny ability to hold space for others' pain without trying to fix it immediately. People feel safe falling apart around you.",
        pattern={'ORPHEUS': 'very_high', 'CHRONOS': 'very_high', 'AETHER': 'low'},
        core_traits=['Deeply Empathetic', 'Patient', 'Emotionally Sensitive', 'Nurturing', 'Wounded Healer'],
        strengths=[
            'Profound emotional intelligence',
            'Make people feel truly seen and understood',
            'Patient with messy healing processes',
            'Transform your own pain into wisdom',
            'Create sanctuaries of psychological safety'
        ],
        challenges=[
            'Absorb others\' emotions to your detriment',
            'Struggle with boundaries',
            'Your own healing always in progress',
            'Can be overwhelmed by world\'s suffering',
            'May attract broken people seeking rescue'
        ],
        life_purpose="To transmute suffering into healing. You're here to prove that broken things can become beautiful, that pain has purpose, that healing is possible. Your scars are credentials, not shame.",
        relationships="You need a partner who doesn't need healing - someone stable who can hold YOU when you're depleted from holding others. Beware the pattern of choosing broken people you think you can save.",
        career_paths=['Therapist', 'Trauma Counselor', 'Hospice Worker', 'Crisis Intervention', 'Somatic Healer', 'Grief Counselor'],
        famous_examples=['Fred Rogers', 'Carl Rogers', 'Pema Chödrön'],
        growth_direction="Your compassion is infinite, but your capacity isn't. Learn that saying 'no' to others is saying 'yes' to yourself. You can't pour from an empty cup, and self-care isn't selfish - it's survival."
    ),
    
    Archetype(
        name="The Architect",
        essence="Systematic builder of complex, elegant solutions",
        description="You see patterns others miss. Systems, structures, processes - they make sense to you like music to a composer. You're driven to BUILD, to create order from chaos, to design solutions that are both functional and beautiful. You think in frameworks, models, blueprints. Details don't overwhelm you; they're the building blocks of your vision.",
        pattern={'ORIN': 'very_high', 'LYRA': 'high', 'ORPHEUS': 'low'},
        core_traits=['Systematic', 'Analytical', 'Innovative', 'Detail-Oriented', 'Strategic'],
        strengths=[
            'Design complex systems that actually work',
            'Think several steps ahead',
            'Combine creativity with rigor',
            'Not swayed by emotions in decision-making',
            'Turn abstract ideas into concrete plans'
        ],
        challenges=[
            'Can seem cold or unfeeling',
            'Might miss human/emotional factors',
            'Could get lost in perfection, never shipping',
            'May struggle with messy, non-linear humans',
            'Might isolate in pursuit of the vision'
        ],
        life_purpose="To build the future. You're here to create systems, tools, technologies that elevate humanity. Your legacy is in what you build, not who you know.",
        relationships="You need someone who respects your process and doesn't take your focus personally. Ideal partner provides emotional intelligence you lack, while appreciating your logical mind.",
        career_paths=['Software Architect', 'Systems Engineer', 'Urban Planner', 'Product Designer', 'Operations Strategist', 'Research Scientist'],
        famous_examples=['Elon Musk (early career)', 'Ada Lovelace', 'Buckminster Fuller'],
        growth_direction="Remember that the best systems serve PEOPLE, not the other way around. Include human factors in your designs. Efficiency without empathy creates dystopia."
    ),
    
    Archetype(
        name="The Maverick",
        essence="Bold disruptor who challenges conventions fearlessly",
        description="You don't just think outside the box - you question why there's a box at all. Rules feel like suggestions. Authority must earn your respect. You're driven by autonomy, innovation, and the thrill of breaking new ground. You'd rather fail at something original than succeed at something conventional. Your confidence borders on audacity, and that's exactly what changes the world.",
        pattern={'KAEL': 'very_high', 'LYRA': 'very_high', 'ORIN': 'low', 'CHRONOS': 'low'},
        core_traits=['Bold', 'Unconventional', 'Assertive', 'Innovative', 'Impatient'],
        strengths=[
            'Fearless in face of resistance',
            'Challenge outdated systems effectively',
            'Inspire others to break free from conformity',
            'Move fast while others deliberate',
            'Turn "impossible" into "inevitable"'
        ],
        challenges=[
            'Can be reckless or burn bridges',
            'Might alienate potential allies',
            'Struggle with necessary patience',
            'Could be seen as arrogant',
            'May lack follow-through on revolutionary ideas'
        ],
        life_purpose="To shatter cages - including ones people don't realize they're in. You're here to prove that the 'way things are' isn't the way things have to be.",
        relationships="You need a partner who won't try to tame you but also won't enable your destructive tendencies. Someone strong enough to challenge you, secure enough to let you soar.",
        career_paths=['Entrepreneur', 'Activist', 'Disruptive Innovator', 'Revolutionary', 'Avant-Garde Artist', 'Whistleblower'],
        famous_examples=['Steve Jobs', 'Elon Musk', 'Rosa Parks', 'Banksy'],
        growth_direction="Not every battle needs fighting. Not every rule needs breaking. Learn to pick your rebellions strategically. Destruction without construction leaves only rubble."
    ),
    
    Archetype(
        name="The Sage",
        essence="Wise observer who sees truth beneath surface",
        description="You watch, you listen, you SEE. While others perform, you observe. While they chase noise, you seek signal. You've learned that wisdom comes not from having all answers, but from asking better questions. You're comfortable with ambiguity, paradox, mystery. You know that certainty is often the enemy of truth.",
        pattern={'LYRA': 'very_high', 'AETHER': 'high', 'LUMEN': 'low'},
        core_traits=['Introspective', 'Curious', 'Calm', 'Perceptive', 'Reserved'],
        strengths=[
            'See patterns and connections others miss',
            'Comfortable with complexity and nuance',
            'Provide grounded, wise counsel',
            'Not reactive or impulsive',
            'Value depth over breadth'
        ],
        challenges=[
            'Can become too detached from life',
            'Might overthink rather than act',
            'Could seem aloof or superior',
            'May struggle with practical concerns',
            'Might use knowledge as shield from feeling'
        ],
        life_purpose="To illuminate truth in an age of noise. You're here to model thoughtfulness in a reactive world, depth in a shallow culture, wisdom in an information age.",
        relationships="You need someone who appreciates that silence isn't empty - it's full of thought. Partner must be comfortable with deep conversations and not need constant activity.",
        career_paths=['Philosopher', 'Researcher', 'Writer', 'Professor', 'Analyst', 'Consultant'],
        famous_examples=['Carl Jung', 'Susan Cain', 'Naval Ravikant'],
        growth_direction="Knowledge without application is masturbation. Wisdom must be embodied, not just contemplated. Share what you learn. Act on what you know."
    ),
    
    # Continue with 15 more archetypes...
    # The Guardian, The Performer, The Explorer, The Strategist, The Empath,
    # The Warrior, The Artist, The Mediator, The Achiever, The Rebel,
    # The Caregiver, The Visionary, The Scholar, The Adventurer, The Diplomat
]


def get_all_archetypes() -> List[Archetype]:
    """Return all defined archetypes."""
    return ARCHETYPES


def match_archetype(dimension_scores: Dict[str, float]) -> Archetype:
    """
    Match user's dimension scores to best-fitting archetype.
    
    Args:
        dimension_scores: Dict of dimension name -> normalized score (0-100)
    
    Returns:
        Best matching Archetype
    """
    def score_to_level(score: float) -> str:
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
    
    best_archetype = None
    best_score = 0
    
    for archetype in ARCHETYPES:
        match_score = 0
        
        for dim, expected_level in archetype.pattern.items():
            if dim not in dimension_scores:
                continue
                
            actual_level = score_to_level(dimension_scores[dim])
            
            # Perfect match
            if actual_level == expected_level:
                match_score += 5
            # Close match
            elif (expected_level in ['high', 'very_high'] and actual_level in ['high', 'very_high']) or \
                 (expected_level in ['low', 'very_low'] and actual_level in ['low', 'very_low']):
                match_score += 3
            # Moderate is always somewhat compatible
            elif actual_level == 'moderate':
                match_score += 1
        
        if match_score > best_score:
            best_score = match_score
            best_archetype = archetype
    
    return best_archetype
