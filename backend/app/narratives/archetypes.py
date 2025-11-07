"""
SELVE Personality Archetypes

Rich archetype definitions that capture personality patterns.
These help users understand their unique combination of traits.
"""

from typing import Dict, List
from dataclasses import dataclass
import logging

logger = logging.getLogger(__name__)


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
    
    Archetype(
        name="The Guardian",
        essence="Steadfast protector who creates safety and order",
        description="You are the one people count on when chaos strikes. Responsibility isn't a burden - it's your purpose. You create structure, maintain boundaries, and protect what matters. While others chase novelty, you perfect what works. You understand that freedom requires guardrails, and that safety is the foundation of growth.",
        pattern={'VARA': 'very_high', 'CHRONOS': 'very_high', 'KAEL': 'low'},
        core_traits=['Responsible', 'Reliable', 'Disciplined', 'Protective', 'Traditional'],
        strengths=[
            'Rock-solid reliability in crisis',
            'Create and maintain healthy boundaries',
            'Patient with slow, steady progress',
            'Protect vulnerable people and systems',
            'Honor commitments even when difficult'
        ],
        challenges=[
            'Can be rigid or inflexible',
            'Might resist necessary change',
            'Could enable dependence in others',
            'May sacrifice growth for security',
            'Might judge those who break rules'
        ],
        life_purpose="To be the foundation others build upon. You're here to prove that stability isn't boring - it's the bedrock of all achievement. Without you, nothing lasts.",
        relationships="You need a partner who appreciates your steadiness and doesn't confuse stability with stagnation. Someone who feels safe with you but also gently challenges your comfort zone.",
        career_paths=['Security Professional', 'Risk Manager', 'Compliance Officer', 'Military Officer', 'Emergency Responder', 'Family Law Attorney'],
        famous_examples=['Jimmy Carter', 'Angela Merkel', 'Mr. Rogers (Guardian aspect)'],
        growth_direction="Not all change is threat. Not all rules serve life. Learn to distinguish between wisdom and rigidity. Sometimes protection means letting go."
    ),
    
    Archetype(
        name="The Performer",
        essence="Captivating entertainer who brings joy and energy",
        description="You light up rooms. Your energy is infectious, your presence magnetic. You don't just experience life - you perform it. Whether on stage or in conversation, you make everything more vivid, more fun, more ALIVE. You feed on attention not from insecurity, but because shared joy multiplies.",
        pattern={'LUMEN': 'very_high', 'KAEL': 'high', 'AETHER': 'moderate'},
        core_traits=['Charismatic', 'Spontaneous', 'Expressive', 'Energetic', 'Attention-Seeking'],
        strengths=[
            'Make everything more enjoyable',
            'Natural at public speaking/performance',
            'Quick-witted and adaptable',
            'Lift others out of dark moods',
            'Create memorable experiences'
        ],
        challenges=[
            'May struggle when not center of attention',
            'Could prioritize entertainment over depth',
            'Might avoid difficult emotions with humor',
            'Can be exhausting to be around',
            'May mistake performance for authentic connection'
        ],
        life_purpose="To remind humanity that life isn't meant to be endured - it's meant to be celebrated. You're here to turn the mundane into magic, the ordinary into extraordinary.",
        relationships="You need a partner who enjoys your energy but also sees through the performance. Someone who loves both the show and the quiet person behind it.",
        career_paths=['Actor', 'Comedian', 'Event Host', 'Sales Professional', 'Social Media Influencer', 'Tour Guide'],
        famous_examples=['Robin Williams', 'Ellen DeGeneres', 'Dwayne "The Rock" Johnson'],
        growth_direction="The standing ovation ends. The crowd goes home. Who are you in the silence? Build a self that doesn't require an audience."
    ),
    
    Archetype(
        name="The Explorer",
        essence="Adventurous pioneer who seeks new horizons",
        description="You're allergic to routine. The unknown doesn't scare you - it CALLS you. You collect experiences like others collect objects. Travel, ideas, people, perspectives - you're hungry for it all. You understand that comfort zones are actually prisons, and that growth lives on the other side of fear.",
        pattern={'KAEL': 'very_high', 'LYRA': 'high', 'CHRONOS': 'low'},
        core_traits=['Adventurous', 'Curious', 'Independent', 'Restless', 'Open-Minded'],
        strengths=[
            'Fearless in face of uncertainty',
            'Adapt quickly to new environments',
            'Collect diverse experiences and wisdom',
            'Break free from limiting traditions',
            'Inspire others to expand their world'
        ],
        challenges=[
            'May confuse motion with progress',
            'Could struggle with commitment or roots',
            'Might run from problems rather than solve them',
            'Can be unreliable or flaky',
            'May miss depth in pursuit of breadth'
        ],
        life_purpose="To push humanity's boundaries - geographic, intellectual, spiritual. You're here to prove that the map is not the territory, and the menu is not the meal.",
        relationships="You need a partner who's either equally adventurous or secure enough to let you roam. Someone who understands that your wandering isn't rejection.",
        career_paths=['Travel Writer', 'Foreign Correspondent', 'Adventure Guide', 'Digital Nomad', 'Cultural Anthropologist', 'International Aid Worker'],
        famous_examples=['Anthony Bourdain', 'Cheryl Strayed', 'Bear Grylls'],
        growth_direction="Not all who wander are lost, but some are running. Ask yourself: What am I seeking? Or what am I fleeing?"
    ),
    
    Archetype(
        name="The Strategist",
        essence="Masterful planner who anticipates and outmaneuvers",
        description="You play chess while others play checkers. You see 10 moves ahead, anticipate obstacles before they appear, and always have a backup plan. You're patient, calculating, and ruthlessly efficient. You understand that winning isn't about working harder - it's about thinking smarter.",
        pattern={'ORIN': 'very_high', 'AETHER': 'high', 'LUMEN': 'low'},
        core_traits=['Strategic', 'Patient', 'Analytical', 'Reserved', 'Calculating'],
        strengths=[
            'Excel at long-term planning',
            'Stay calm under competitive pressure',
            'Spot opportunities others miss',
            'Turn disadvantages into advantages',
            'Master resource allocation'
        ],
        challenges=[
            'Can be manipulative or Machiavellian',
            'Might alienate with cold pragmatism',
            'Could overthink and miss opportunities',
            'May struggle with spontaneity or play',
            'Might treat people as chess pieces'
        ],
        life_purpose="To prove that intelligence beats force, that patience beats speed, that strategy beats luck. You're here to elevate the game.",
        relationships="You need a partner who appreciates your mind but ensures you don't forget your heart. Someone who keeps you human while you plot world domination.",
        career_paths=['Management Consultant', 'Investment Strategist', 'Military Strategist', 'Political Advisor', 'Competitive Gamer', 'Negotiator'],
        famous_examples=['Warren Buffett', 'Garry Kasparov', 'Sun Tzu (historical)'],
        growth_direction="The best strategy sometimes is no strategy. Not everything is a game to win. Sometimes presence beats planning."
    ),
    
    Archetype(
        name="The Empath",
        essence="Intuitive feeler who absorbs and understands emotions",
        description="You don't just understand emotions - you FEEL them. Others' joy lifts you, their pain crushes you. You're an emotional sponge, absorbing the unspoken feelings in any room. This gift makes you incredibly connected but also incredibly vulnerable. You sense what people need before they speak it.",
        pattern={'ORPHEUS': 'very_high', 'AETHER': 'low', 'KAEL': 'low'},
        core_traits=['Highly Sensitive', 'Intuitive', 'Compassionate', 'Gentle', 'Boundary-Challenged'],
        strengths=[
            'Read emotional undercurrents with precision',
            'Provide exactly what people need emotionally',
            'Create deep, authentic connections',
            'Spot inauthenticity immediately',
            'Make others feel deeply understood'
        ],
        challenges=[
            'Easily overwhelmed by crowds or conflict',
            'Struggle to separate your emotions from others\'',
            'Vulnerable to manipulation',
            'May neglect your needs for others',
            'Can be paralyzed by others\' suffering'
        ],
        life_purpose="To prove that feeling deeply isn't weakness - it's a superpower. You're here to model emotional courage in a world that's numb.",
        relationships="You need a partner who is emotionally stable and can handle your intensity. Someone who protects your sensitivity without trying to fix it.",
        career_paths=['Energy Healer', 'Animal Communicator', 'Intuitive Coach', 'Art Therapist', 'Spiritual Counselor', 'Crisis Support'],
        famous_examples=['Elaine Aron (HSP researcher)', 'Princess Diana', 'Thích Nhất Hạnh'],
        growth_direction="Other people's feelings are not your responsibility. You can witness pain without taking it on. Compassion with boundaries isn't selfish - it's sustainable."
    ),
    
    Archetype(
        name="The Warrior",
        essence="Fierce fighter who battles for what's right",
        description="You're built for battle - not the destructive kind, but the kind that protects, defends, and fights for justice. You have a fire in your belly that refuses to accept injustice. You're not aggressive for its own sake; you're fierce in service of what matters. Challenges don't intimidate you - they activate you.",
        pattern={'KAEL': 'very_high', 'VARA': 'high', 'ORPHEUS': 'moderate'},
        core_traits=['Courageous', 'Assertive', 'Protective', 'Competitive', 'Justice-Oriented'],
        strengths=[
            'Stand up when others back down',
            'Channel anger into productive action',
            'Defend the vulnerable fearlessly',
            'Thrive under pressure',
            'Turn obstacles into training grounds'
        ],
        challenges=[
            'Can be combative even when unnecessary',
            'Might create enemies where none exist',
            'Could struggle with peace/softness',
            'May burn out from constant fighting',
            'Might use force when finesse would work'
        ],
        life_purpose="To fight the battles that need fighting. You're here to prove that aggression channeled toward justice is noble, that fierceness in service of love is sacred.",
        relationships="You need a partner strong enough to handle your intensity but wise enough to know when to de-escalate. Someone who fights WITH you, not against you.",
        career_paths=['Activist', 'Prosecutor', 'Competitive Athlete', 'Union Organizer', 'MMA Fighter', 'Investigative Journalist'],
        famous_examples=['Muhammad Ali', 'Malala Yousafzai', 'Ruth Bader Ginsburg'],
        growth_direction="Not every disagreement is a war. Not every opponent is an enemy. Learn when to fight and when to surrender. Sometimes the bravest thing is peace."
    ),
    
    Archetype(
        name="The Artist",
        essence="Creative visionary who transforms inner world into beauty",
        description="You see beauty where others see ordinary. Your inner world is rich, complex, and often overwhelming. You MUST create - it's not a choice, it's a need. Whether through paint, words, music, or simply how you live, you transform the invisible into the visible. You're allergic to anything fake or superficial.",
        pattern={'LYRA': 'very_high', 'ORPHEUS': 'high', 'ORIN': 'low'},
        core_traits=['Creative', 'Sensitive', 'Expressive', 'Unconventional', 'Intense'],
        strengths=[
            'Transform pain into beauty',
            'See possibilities others miss',
            'Create work that moves people deeply',
            'Unafraid of emotional intensity',
            'Make the invisible visible'
        ],
        challenges=[
            'Can be moody or temperamental',
            'Might struggle with practical matters',
            'Could be overly self-absorbed',
            'May romanticize suffering',
            'Might isolate in pursuit of vision'
        ],
        life_purpose="To remind humanity that we're not just surviving - we're capable of creating meaning, beauty, transcendence. You're here to prove that art isn't luxury - it's survival.",
        relationships="You need a partner who appreciates your depth and doesn't try to 'fix' your intensity. Someone who understands that your moods are weather, not character.",
        career_paths=['Visual Artist', 'Musician', 'Poet', 'Designer', 'Creative Director', 'Art Therapist'],
        famous_examples=['Frida Kahlo', 'Vincent van Gogh', 'Patti Smith'],
        growth_direction="Your art matters, but so does your life. Don't sacrifice your humanity at the altar of your creativity. Create to LIVE, not instead of living."
    ),
    
    Archetype(
        name="The Mediator",
        essence="Harmonious peacemaker who bridges divides",
        description="You see all sides. When others polarize, you integrate. When they fight, you mediate. You have a gift for holding space for opposing truths, for finding common ground in conflict. You're uncomfortable with tension - not from weakness, but from a deep belief that most conflicts arise from misunderstanding, not true incompatibility.",
        pattern={'CHRONOS': 'very_high', 'ORPHEUS': 'high', 'KAEL': 'very_low'},
        core_traits=['Diplomatic', 'Patient', 'Empathetic', 'Harmonious', 'Conflict-Averse'],
        strengths=[
            'De-escalate tense situations naturally',
            'Help opposing sides find common ground',
            'Build bridges between different groups',
            'Create environments of psychological safety',
            'See value in all perspectives'
        ],
        challenges=[
            'May avoid necessary conflict',
            'Could lose yourself in accommodating others',
            'Might be seen as indecisive',
            'Can be manipulated by aggressive people',
            'May suppress your own needs for peace'
        ],
        life_purpose="To prove that unity doesn't require uniformity. You're here to model how holding space for difference creates strength, not weakness.",
        relationships="You need a partner who won't take advantage of your accommodating nature. Someone who values your peacemaking but also encourages you to assert your needs.",
        career_paths=['Mediator', 'Conflict Resolution Specialist', 'HR Professional', 'Diplomat', 'Family Therapist', 'Community Organizer'],
        famous_examples=['Desmond Tutu', 'John Lewis', 'Thích Nhất Hạnh (Mediator aspect)'],
        growth_direction="Not all conflict is bad. Sometimes peace requires tension. Your voice matters too - don't silence it for the sake of harmony."
    ),
    
    Archetype(
        name="The Achiever",
        essence="Driven performer who pursues excellence relentlessly",
        description="You're built to WIN. Success isn't ego - it's oxygen. You set high goals and actually reach them. You're productive, efficient, and always optimizing. You measure your worth by your accomplishments, and you have a lot to show for it. You make things HAPPEN while others are still planning.",
        pattern={'ORIN': 'very_high', 'LUMEN': 'high', 'CHRONOS': 'low'},
        core_traits=['Ambitious', 'Efficient', 'Competitive', 'Image-Conscious', 'Results-Driven'],
        strengths=[
            'Turn vision into reality consistently',
            'Master time management and productivity',
            'Inspire others through your example',
            'Maintain high standards',
            'Create impressive track records'
        ],
        challenges=[
            'Self-worth tied to achievement',
            'May sacrifice relationships for success',
            'Could be workaholic or burned out',
            'Might seem superficial or inauthentic',
            'Can be devastated by failure'
        ],
        life_purpose="To prove that excellence isn't elitist - it's aspirational. You're here to show what's possible when talent meets tenacity.",
        relationships="You need a partner who admires your drive but loves you separate from your achievements. Someone who reminds you that you're enough even when you're not 'doing'.",
        career_paths=['CEO', 'Professional Athlete', 'Sales Executive', 'Surgeon', 'Entrepreneur', 'Management Consultant'],
        famous_examples=['Serena Williams', 'Elon Musk (Achiever aspect)', 'Sheryl Sandberg'],
        growth_direction="You are not your résumé. Your worth isn't measured by your wins. Learn to BE, not just DO. Sometimes the highest achievement is presence."
    ),
    
    Archetype(
        name="The Rebel",
        essence="Defiant nonconformist who challenges authority",
        description="You're allergic to being told what to do. Authority must EARN your respect - titles mean nothing. You question everything, challenge conventions, and refuse to conform just because 'that's how it's done'. You'd rather be authentic and rejected than fake and accepted. Your defiance isn't just rebellion - it's integrity.",
        pattern={'KAEL': 'very_high', 'LYRA': 'high', 'VARA': 'low'},
        core_traits=['Independent', 'Questioning', 'Nonconformist', 'Provocative', 'Anti-Authority'],
        strengths=[
            'Spot bullshit immediately',
            'Challenge harmful systems fearlessly',
            'Inspire others to think for themselves',
            'Refuse to be controlled or manipulated',
            'Bring fresh perspectives'
        ],
        challenges=[
            'May rebel just for rebellion\'s sake',
            'Could struggle with legitimate authority',
            'Might alienate potential allies',
            'Can be exhausting contrarian',
            'May lack discipline or follow-through'
        ],
        life_purpose="To question the unquestionable. You're here to prove that blind obedience is the enemy of progress, that sacred cows make the best burgers.",
        relationships="You need a partner who doesn't try to tame you but also doesn't enable your self-destruction. Someone strong enough to challenge you without controlling you.",
        career_paths=['Activist', 'Punk Musician', 'Independent Journalist', 'Whistleblower', 'Counterculture Leader', 'Disruptive Entrepreneur'],
        famous_examples=['Banksy', 'Noam Chomsky', 'Patti Smith (Rebel aspect)'],
        growth_direction="Not every rule is oppression. Not every authority is corrupt. Pick your battles. Sometimes working within the system is more radical than burning it down."
    ),
    
    Archetype(
        name="The Mentor",
        essence="Wise guide who elevates others' potential",
        description="You're not here to shine - you're here to help others shine. You see potential in people they don't see in themselves. You have wisdom earned through experience, and you're generous with it. You measure success not by your achievements, but by the achievements of those you've guided. You're a gardener of human potential.",
        pattern={'CHRONOS': 'very_high', 'VARA': 'high', 'KAEL': 'low'},
        core_traits=['Patient', 'Wise', 'Generous', 'Nurturing', 'Humble'],
        strengths=[
            'Spot and cultivate hidden potential',
            'Patient with others\' growth processes',
            'Share wisdom without ego',
            'Create safe space for learning',
            'Celebrate others\' successes genuinely'
        ],
        challenges=[
            'May neglect your own growth',
            'Could enable dependence',
            'Might be taken advantage of',
            'Can be disappointed when students don\'t listen',
            'May live vicariously through others'
        ],
        life_purpose="To multiply wisdom. You're here to prove that the highest achievement is not what you accomplish, but what you help others accomplish.",
        relationships="You need a partner who appreciates your generosity but ensures you don't lose yourself in service. Someone who mentors YOU too.",
        career_paths=['Teacher', 'Coach', 'Professor', 'Therapist', 'Training Developer', 'Youth Counselor'],
        famous_examples=['Mr. Rogers (Mentor aspect)', 'Maya Angelou', 'Carl Rogers (Mentor aspect)'],
        growth_direction="You can't grow for others. Sometimes the greatest gift is letting them struggle. Your wisdom isn't help if it creates dependence."
    ),
    
    Archetype(
        name="The Visionary",
        essence="Prophetic dreamer who sees future possibilities",
        description="You see what COULD be, not just what is. The future is more real to you than the present. You're driven by a vision so compelling that the obstacles don't matter. You think in decades while others think in days. You inspire with possibility, energize with purpose, and frustrate with your disconnection from current reality.",
        pattern={'LYRA': 'very_high', 'LUMEN': 'high', 'CHRONOS': 'low'},
        core_traits=['Imaginative', 'Inspirational', 'Future-Oriented', 'Idealistic', 'Impatient'],
        strengths=[
            'See possibilities invisible to others',
            'Inspire movements and organizations',
            'Connect dots across domains',
            'Think at scale (decades, millions)',
            'Energize with compelling vision'
        ],
        challenges=[
            'Can be disconnected from present reality',
            'May struggle with implementation',
            'Could frustrate with impossible timelines',
            'Might ignore practical constraints',
            'Can be seen as unrealistic dreamer'
        ],
        life_purpose="To pull the future into the present. You're here to prove that the 'impossible' is just the 'not yet', that imagination precedes innovation.",
        relationships="You need a partner who's inspired by your vision but also keeps you grounded. Someone who helps you build the bridge between dream and reality.",
        career_paths=['Founder/CEO', 'Futurist', 'Innovation Strategist', 'Documentary Filmmaker', 'Social Entrepreneur', 'Author/Speaker'],
        famous_examples=['Steve Jobs', 'Jane Goodall', 'Elon Musk (Visionary aspect)'],
        growth_direction="Vision without execution is hallucination. The future requires foundations built in the present. Honor the mundane work that makes magic possible."
    ),
    
    Archetype(
        name="The Craftsman",
        essence="Master builder who perfects through dedicated practice",
        description="You believe in MASTERY - the slow, patient accumulation of skill through deliberate practice. You're not chasing fame or novelty; you're chasing excellence. You respect tradition, honor apprenticeship, and understand that shortcuts create mediocrity. Your hands know what your mind doesn't need to explain.",
        pattern={'CHRONOS': 'very_high', 'ORIN': 'high', 'LUMEN': 'low'},
        core_traits=['Skilled', 'Patient', 'Perfectionist', 'Humble', 'Detail-Oriented'],
        strengths=[
            'Achieve true mastery through persistence',
            'Create work of lasting quality',
            'Patient with long learning curves',
            'Take pride in process, not just product',
            'Honor tradition while innovating within it'
        ],
        challenges=[
            'Can be overly perfectionistic',
            'May resist helpful innovation',
            'Could isolate in pursuit of mastery',
            'Might undervalue your expertise',
            'Can be too detail-focused'
        ],
        life_purpose="To prove that mastery matters. You're here to model dedication in an age of shortcuts, quality in an age of quick consumption.",
        relationships="You need a partner who respects your craft but ensures you don't disappear into it. Someone who appreciates your dedication without feeling neglected.",
        career_paths=['Artisan', 'Master Chef', 'Luthier', 'Surgeon', 'Classical Musician', 'Watchmaker'],
        famous_examples=['Jiro Ono (sushi master)', 'Antonio Stradivari', 'Yo-Yo Ma'],
        growth_direction="Perfection is a direction, not a destination. Sometimes 'good enough' is good enough. Don't let perfectionism become procrastination."
    ),
    
    Archetype(
        name="The Diplomat",
        essence="Sophisticated negotiator who builds powerful alliances",
        description="You understand that power isn't about force - it's about relationships. You're skilled at reading social dynamics, building coalitions, and navigating complex political landscapes. You know exactly what to say, when to say it, and to whom. You're charming without being fake, strategic without being cold.",
        pattern={'LUMEN': 'very_high', 'ORIN': 'high', 'ORPHEUS': 'moderate'},
        core_traits=['Socially Intelligent', 'Strategic', 'Charming', 'Political', 'Tactful'],
        strengths=[
            'Build powerful networks effortlessly',
            'Navigate complex social dynamics',
            'Negotiate win-win outcomes',
            'Read unspoken power structures',
            'Unite disparate groups toward common goals'
        ],
        challenges=[
            'Can be manipulative or two-faced',
            'May prioritize politics over principles',
            'Could be seen as inauthentic',
            'Might compromise values for alliances',
            'Can be exhausted by constant performance'
        ],
        life_purpose="To prove that influence is more powerful than force. You're here to show that the right relationship at the right time changes everything.",
        relationships="You need a partner who sees through your charm to the real you. Someone who loves you for who you are, not what you can do for them.",
        career_paths=['Diplomat', 'Lobbyist', 'Public Relations', 'Talent Agent', 'Fundraiser', 'Political Strategist'],
        famous_examples=['Henry Kissinger', 'Oprah Winfrey', 'Kofi Annan'],
        growth_direction="Connection without authenticity is manipulation. Make sure you're building relationships, not just using people. Let someone see the REAL you."
    ),
    
    Archetype(
        name="The Pioneer",
        essence="Courageous trailblazer who ventures into the unknown",
        description="You go first. Into the wilderness, into the unknown, into the 'impossible'. You're comfortable with uncertainty because you know that's where discovery lives. You're not reckless - you're brave. You understand that someone has to take the first step, blaze the first trail, prove it can be done. That someone is you.",
        pattern={'KAEL': 'very_high', 'ORIN': 'high', 'CHRONOS': 'low'},
        core_traits=['Courageous', 'Independent', 'Resourceful', 'Risk-Taking', 'Pioneering'],
        strengths=[
            'Thrive in uncharted territory',
            'Take calculated risks others avoid',
            'Resourceful when resources are scarce',
            'Inspire others through your courage',
            'Create paths for others to follow'
        ],
        challenges=[
            'May underestimate risks',
            'Could be lonely at the frontier',
            'Might struggle with collaboration',
            'Can be impatient with followers',
            'May sacrifice relationships for exploration'
        ],
        life_purpose="To prove what's possible. You're here to go where others won't, to show that the frontier isn't just geographic - it's anywhere no one has gone yet.",
        relationships="You need a partner adventurous enough to join you or secure enough to let you go. Someone who understands that your leaving isn't abandoning.",
        career_paths=['Entrepreneur', 'Explorer', 'Startup Founder', 'Research Scientist', 'Astronaut', 'War Correspondent'],
        famous_examples=['Sally Ride', 'Ernest Shackleton', 'Jane Goodall (Pioneer aspect)'],
        growth_direction="Being first isn't always being best. Sometimes the second or third path is wiser. Don't let ego drive your pioneering."
    ),
    
    Archetype(
        name="The Alchemist",
        essence="Transformative catalyst who turns lead into gold",
        description="You're a transformer - of ideas, systems, people, yourself. You see potential for transformation everywhere. You understand that everything is in process, nothing is fixed. You're comfortable with paradox, with holding opposites, with the messy middle of metamorphosis. You trust the process even when it looks like destruction.",
        pattern={'LYRA': 'very_high', 'ORPHEUS': 'high', 'VARA': 'low'},
        core_traits=['Transformative', 'Introspective', 'Paradoxical', 'Process-Oriented', 'Mystical'],
        strengths=[
            'Facilitate deep transformation in others',
            'Comfortable with ambiguity and paradox',
            'See potential where others see waste',
            'Trust the process even in darkness',
            'Integrate seeming opposites'
        ],
        challenges=[
            'Can be overly abstract or mystical',
            'May struggle with practical matters',
            'Could romanticize suffering/transformation',
            'Might be difficult to understand',
            'Can be unstable from constant change'
        ],
        life_purpose="To prove that transformation is always possible. You're here to show that breakdowns are breakthroughs, that death precedes rebirth, that the caterpillar must dissolve to become the butterfly.",
        relationships="You need a partner comfortable with your depth and complexity. Someone who won't try to stabilize or simplify you, but also provides grounding when needed.",
        career_paths=['Transformational Coach', 'Jungian Analyst', 'Spiritual Teacher', 'Change Management Consultant', 'Shamanic Practitioner'],
        famous_examples=['Carl Jung', 'Ram Dass', 'Clarissa Pinkola Estés'],
        growth_direction="Not everything needs transforming. Sometimes what you have is already gold. Learn to appreciate stability, not just change."
    ),
]

# Fallback archetype for balanced/unclear profiles
BALANCED_ARCHETYPE = Archetype(
    name="The Renaissance Soul",
    essence="Multifaceted individual who defies simple categorization",
    description="You don't fit neatly into boxes, and that's your strength. You're a blend of seemingly contradictory traits - equally comfortable with logic and emotion, solitude and socializing, tradition and innovation. While others specialize, you integrate. You see connections across domains that specialists miss. Your complexity is not confusion - it's sophistication.",
    pattern={},  # No specific pattern - it's the fallback
    core_traits=['Multifaceted', 'Balanced', 'Adaptable', 'Complex', 'Integrative'],
    strengths=[
        'Draw from diverse strengths flexibly',
        'See connections others miss',
        'Adapt to wide range of situations',
        'Understand multiple perspectives',
        'Integrate seemingly opposite qualities'
    ],
    challenges=[
        'May feel you don\'t belong anywhere',
        'Could be seen as unfocused or scattered',
        'Might struggle with single-path careers',
        'Can be misunderstood by specialists',
        'May face pressure to "pick a lane"'
    ],
    life_purpose="To prove that you don't have to choose one way of being. You're here to model integration in a world that demands categorization, to show that complexity is not confusion but richness.",
    relationships="You need a partner who appreciates your multifaceted nature. Someone who doesn't try to simplify you or make you choose one version of yourself.",
    career_paths=['Polymath Consultant', 'Renaissance Entrepreneur', 'Interdisciplinary Researcher', 'Portfolio Career', 'Creative Director', 'Innovation Strategist'],
    famous_examples=['Leonardo da Vinci', 'Benjamin Franklin', 'Maya Angelou (Renaissance aspect)'],
    growth_direction="Your breadth is a gift, but depth matters too. Pick a few domains to master deeply. Integration requires understanding, not just sampling."
)


def get_all_archetypes() -> List[Archetype]:
    """Return all defined archetypes."""
    return ARCHETYPES


def match_archetype(dimension_scores: Dict[str, float]) -> Archetype:
    """
    Match user's dimension scores to best-fitting archetype.
    
    Uses a scoring system:
    - Perfect match (exact level): +5 points
    - Close match (adjacent high levels or low levels): +3 points
    - Moderate match (actual score is moderate): +1 point
    - Pattern mismatch: 0 points (but not negative)
    
    Args:
        dimension_scores: Dict of dimension name -> normalized score (0-100)
    
    Returns:
        Best matching Archetype (or BALANCED_ARCHETYPE if no good match)
    """
    def score_to_level(score: float) -> str:
        """Convert 0-100 score to categorical level."""
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
    
    # Log dimension scores for debugging
    logger.info("=" * 60)
    logger.info("🎯 ARCHETYPE MATCHING")
    logger.info("=" * 60)
    logger.info("Dimension Scores:")
    for dim, score in sorted(dimension_scores.items()):
        level = score_to_level(score)
        logger.info(f"  {dim:8} = {score:5.1f} ({level})")
    
    best_archetype = None
    best_score = 0
    all_scores = []  # For debugging
    
    for archetype in ARCHETYPES:
        match_score = 0
        matches_detail = []
        
        for dim, expected_level in archetype.pattern.items():
            if dim not in dimension_scores:
                logger.warning(f"  ⚠️  Dimension {dim} not found in scores for {archetype.name}")
                continue
                
            actual_score = dimension_scores[dim]
            actual_level = score_to_level(actual_score)
            
            # Perfect match
            if actual_level == expected_level:
                match_score += 5
                matches_detail.append(f"{dim}={actual_score:.0f}✓ (perfect {expected_level})")
            # Close match (both high or both low)
            elif (expected_level in ['high', 'very_high'] and actual_level in ['high', 'very_high']) or \
                 (expected_level in ['low', 'very_low'] and actual_level in ['low', 'very_low']):
                match_score += 3
                matches_detail.append(f"{dim}={actual_score:.0f}≈ (close to {expected_level})")
            # Moderate is always somewhat compatible (reduced from +1 to +0.5 to be less permissive)
            elif actual_level == 'moderate':
                match_score += 0.5
                matches_detail.append(f"{dim}={actual_score:.0f}~ (moderate, expected {expected_level})")
            else:
                matches_detail.append(f"{dim}={actual_score:.0f}✗ (mismatch: {actual_level} vs {expected_level})")
        
        all_scores.append((archetype.name, match_score, matches_detail))
        
        if match_score > best_score:
            best_score = match_score
            best_archetype = archetype
    
    # Log all archetype scores
    logger.info("\nArchetype Match Scores:")
    for name, score, details in sorted(all_scores, key=lambda x: x[1], reverse=True):
        logger.info(f"  {score:5.1f} points - {name}")
        if score == best_score:  # Show details for winner(s)
            for detail in details:
                logger.info(f"         {detail}")
    
    # Use fallback if best match is too weak
    MIN_MATCH_THRESHOLD = 8.0  # Require at least 8 points (e.g., 1 perfect + 1 close match)
    
    if best_score < MIN_MATCH_THRESHOLD:
        logger.warning(f"\n⚠️  Best match score ({best_score:.1f}) below threshold ({MIN_MATCH_THRESHOLD})")
        logger.info(f"✨ Using fallback: {BALANCED_ARCHETYPE.name}")
        logger.info("=" * 60)
        return BALANCED_ARCHETYPE
    
    logger.info(f"\n✅ Best Match: {best_archetype.name} (score: {best_score:.1f})")
    logger.info("=" * 60)
    return best_archetype

