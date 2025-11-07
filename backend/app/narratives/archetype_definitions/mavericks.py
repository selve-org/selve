"""Bold and adventurous archetypes."""

from .types import Archetype


THE_MAVERICK = Archetype(
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
)


THE_REBEL = Archetype(
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
)


THE_EXPLORER = Archetype(
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
)


THE_WARRIOR = Archetype(
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
)


THE_PIONEER = Archetype(
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
)
