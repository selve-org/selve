"""
SELVE Dimension Templates

Comprehensive, psychologically rich descriptions for each dimension at all levels.
These templates reveal WHO the person truly is - their core nature, motivations,
fears, desires, and behavioral patterns.
"""

from typing import Dict, List


class DimensionTemplate:
    """Template for a dimension at a specific level."""
    
    def __init__(
        self,
        title: str,
        core_nature: str,
        description: str,
        inner_world: str,
        motivations: List[str],
        fears: List[str],
        strengths: List[str],
        shadows: List[str],
        in_relationships: str,
        at_work: str,
        under_stress: str,
        at_best: str,
        growth_path: str
    ):
        self.title = title
        self.core_nature = core_nature
        self.description = description
        self.inner_world = inner_world
        self.motivations = motivations
        self.fears = fears
        self.strengths = strengths
        self.shadows = shadows
        self.in_relationships = in_relationships
        self.at_work = at_work
        self.under_stress = under_stress
        self.at_best = at_best
        self.growth_path = growth_path


# ============================================================================
# LUMEN - Social Energy & Enthusiasm
# ============================================================================

LUMEN_VERY_HIGH = DimensionTemplate(
    title="The Radiant Socialite",
    core_nature="You are ALIVE in the presence of others. Social connection isn't just enjoyable - it's oxygen to you. You're the spark that ignites rooms, the warmth people gravitate toward.",
    description="Your energy flows outward like sunlight. When you're with people, you shine - ideas flow, laughter comes easily, and you feel most authentically yourself. Alone too long, you dim. You don't just like people; you NEED them to feel fully alive.",
    inner_world="Inside, you're thinking: 'Who can I connect with? What's happening? Where's the energy?' Silence feels empty. Your mind comes alive through conversation, through bouncing ideas off others, through seeing yourself reflected in people's reactions.",
    motivations=[
        "To energize and inspire others",
        "To be seen, heard, and valued",
        "To create memorable, joyful moments",
        "To build a wide network of connections",
        "To avoid the emptiness of isolation"
    ],
    fears=[
        "Being alone, forgotten, or invisible",
        "Missing out on experiences (FOMO)",
        "Boring others or being seen as dull",
        "Losing your social status or popularity",
        "Silence and its accompanying self-doubt"
    ],
    strengths=[
        "Magnetic charisma that draws people in",
        "Natural ability to lift spirits and motivate",
        "Fearless in social situations",
        "Build bridges between people effortlessly",
        "Create energy where there was none"
    ],
    shadows=[
        "Can dominate conversations without realizing it",
        "May struggle with deep introspection",
        "Might avoid being alone with uncomfortable truths",
        "Can be exhausting to quieter personalities",
        "May chase external validation excessively"
    ],
    in_relationships="You're the partner who plans adventures, brings friends together, and keeps life exciting. You need someone who either matches your energy or gives you space to socialize freely. Your love language includes shared experiences and public affection. Danger: You might avoid difficult, quiet conversations or choose partners who keep you entertained rather than truly understood.",
    at_work="You're a force multiplier. You motivate teams, network effortlessly, and bring enthusiasm that's contagious. Excel in sales, events, teaching, leadership - anywhere you interact. Struggle with: isolated work, repetitive tasks, roles requiring long periods of silence. You need an audience, even if small.",
    under_stress="You seek MORE people, MORE activity, MORE noise to drown out stress. Can become manic, overscheduled, scattered. Might party harder, talk faster, fill every moment. The thought of being alone with stress terrifies you. May develop anxiety if forced into extended isolation.",
    at_best="When balanced, you're a genuine light in the world. You make people feel seen, valued, alive. Your energy is authentic joy, not performance. You connect deeply even in crowds, and you also know when to retreat and recharge without guilt.",
    growth_path="Learn to befriend solitude. Discover that being alone doesn't mean being abandoned. Practice sitting with your own thoughts without immediately reaching for your phone. Your depth exists - you just need quiet to hear it. Balance your 'broadcast' energy with 'receive' mode. True confidence comes from within, not from reflections in others' eyes."
)

LUMEN_HIGH = DimensionTemplate(
    title="The Confident Connector",
    core_nature="Social interaction energizes you, but you don't depend on it. You genuinely enjoy people and navigate social worlds with ease, yet you can also appreciate solitude.",
    description="You're socially confident without being attention-hungry. You initiate conversations naturally, enjoy group activities, and feel comfortable being visible. Unlike extreme extroverts, you can also work alone productively and don't spiral when social plans fall through.",
    inner_world="You think: 'People are interesting, but I don't need constant validation.' You're curious about others, enjoy connection, but also value your inner life. You can be alone with your thoughts without restlessness.",
    motivations=[
        "To build meaningful connections",
        "To contribute positively to groups",
        "To maintain a healthy social life",
        "To balance social and personal time",
        "To be known for authenticity, not just visibility"
    ],
    fears=[
        "Becoming too isolated",
        "Losing touch with friends",
        "Being misunderstood as aloof when you need space",
        "Social skills atrophying"
    ],
    strengths=[
        "Balanced social energy",
        "Can adapt to both extroverts and introverts",
        "Genuine, not performative",
        "Build lasting friendships",
        "Know when to engage and when to step back"
    ],
    shadows=[
        "Might occasionally overcommit socially",
        "Could take relationships for granted",
        "May assume everyone else is equally comfortable socializing",
        "Might miss how your energy affects more introverted people"
    ],
    in_relationships="You're an engaged, present partner who enjoys doing things together but respects independence. You bring people into each other's lives naturally. You're comfortable with both date nights out and quiet evenings in. Your partner appreciates your social confidence but also your ability to focus on them.",
    at_work="Versatile. You work well in teams but don't need constant collaboration. Good at client-facing roles, management, consulting. You can present, facilitate, and also do focused independent work. You're the colleague people actually want at lunch.",
    under_stress="You might withdraw temporarily or seek support from friends, depending on the stressor. Generally handle stress with a mix of social processing and personal reflection. Less likely to spiral than extreme scores in either direction.",
    at_best="You model healthy social engagement. You're present when with others, productive when alone. You maintain friendships without making them your identity. People feel better after being around you, and you genuinely care about their well-being.",
    growth_path="Continue refining your social intuition. Learn to read when people need you to bring energy versus when they need quiet presence. Your gift is flexibility - use it intentionally rather than defaulting to sociability."
)

LUMEN_MODERATE = DimensionTemplate(
    title="The Situational Socializer",
    core_nature="Your social energy is context-dependent. Sometimes you're the life of the party; other times you're the wallflower. It depends on mood, setting, and who's there.",
    description="You're truly in the middle - neither clearly extroverted nor introverted. Some situations energize you; others drain you. You can enjoy socializing but also crave alone time. This flexibility is both a strength and sometimes confusing for you and others.",
    inner_world="You think: 'It depends.' Your energy shifts based on countless factors: who's there, what you did earlier, how you're feeling, the environment. You don't have a clear 'social identity' and that can feel disorienting when others seem more defined.",
    motivations=[
        "To maintain flexibility",
        "To honor your varying needs",
        "To avoid being boxed into a social role",
        "To find the right balance for you",
        "To be accepted in different social contexts"
    ],
    fears=[
        "Being inconsistent or unpredictable",
        "Not belonging in either extrovert or introvert spaces",
        "Having people misunderstand your shifting energy",
        "Missing out by not committing to either side"
    ],
    strengths=[
        "Highly adaptable to different social contexts",
        "Understand both introverts and extroverts",
        "Can be whatever a situation needs",
        "Aren't trapped by social expectations",
        "Genuine in multiple modes"
    ],
    shadows=[
        "May seem flaky or inconsistent",
        "Could confuse people with your shifting energy",
        "Might not develop a clear social identity",
        "Could struggle to honor your own needs",
        "May feel like you don't fully fit anywhere"
    ],
    in_relationships="You need a partner who understands your variability. Some days you want adventure and socializing; other days you want solitude. This can confuse partners who prefer consistency. Your ideal match either shares this flexibility or respects it without taking it personally.",
    at_work="You adapt well to different work environments. Can handle collaborative projects and solo work. You're valuable in roles requiring versatility. Challenge: You might struggle in extremely social roles or extremely isolated ones. You need variety.",
    under_stress="Your social needs become unpredictable. Might crave people one day, isolation the next. Can feel confused about what you actually need. May exhaust yourself trying to figure out if you should reach out or retreat.",
    at_best="You're a bridge between different personality types. You help extroverts understand introverts and vice versa. Your flexibility allows you to connect across social styles. You've learned to honor your needs without judgment.",
    growth_path="Stop apologizing for your flexibility. Track your patterns: when does socializing energize you? When does it drain you? Understanding your triggers gives you agency. Communicate your needs clearly to avoid being misunderstood."
)

# Continue with LUMEN_LOW and LUMEN_VERY_LOW...

# ============================================================================
# Templates dictionary for easy access
# ============================================================================

DIMENSION_TEMPLATES = {
    'LUMEN': {
        'very_high': LUMEN_VERY_HIGH,
        'high': LUMEN_HIGH,
        'moderate': LUMEN_MODERATE,
        # Add low and very_low
    },
    # Add AETHER, ORPHEUS, ORIN, LYRA, VARA, CHRONOS, KAEL
}


def get_template(dimension: str, level: str) -> DimensionTemplate:
    """Get template for a dimension at a specific level."""
    return DIMENSION_TEMPLATES.get(dimension, {}).get(level)
