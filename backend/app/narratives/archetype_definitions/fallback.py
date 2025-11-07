"""Fallback archetype for balanced/unclear profiles."""

from .types import Archetype


THE_RENAISSANCE_SOUL = Archetype(
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
