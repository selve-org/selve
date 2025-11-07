"""Empathetic and healing archetypes."""

from .types import Archetype


THE_HEALER = Archetype(
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
)


THE_EMPATH = Archetype(
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
)


THE_MEDIATOR = Archetype(
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
)


THE_MENTOR = Archetype(
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
)
