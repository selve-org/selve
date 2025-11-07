"""Protective and stable archetypes."""

from .types import Archetype


THE_GUARDIAN = Archetype(
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
)
