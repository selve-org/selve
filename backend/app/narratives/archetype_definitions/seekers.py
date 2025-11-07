"""Creative and introspective archetypes."""

from .types import Archetype


THE_SAGE = Archetype(
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
)


THE_ARTIST = Archetype(
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
)


THE_VISIONARY = Archetype(
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
)


THE_ALCHEMIST = Archetype(
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
)
