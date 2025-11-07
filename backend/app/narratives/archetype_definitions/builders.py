"""Analytical and systematic archetypes."""

from .types import Archetype


THE_ARCHITECT = Archetype(
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
)


THE_STRATEGIST = Archetype(
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
)


THE_ACHIEVER = Archetype(
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
)


THE_CRAFTSMAN = Archetype(
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
)
