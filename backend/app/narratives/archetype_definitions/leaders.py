"""Core leadership archetypes."""

from .types import Archetype


THE_LUMINARY = Archetype(
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
)


THE_DIPLOMAT = Archetype(
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
)


THE_PERFORMER = Archetype(
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
)
