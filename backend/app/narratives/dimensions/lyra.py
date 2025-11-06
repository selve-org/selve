"""
LYRA - Creativity & Openness

The dimension measuring creativity, imagination, and openness to experience.
Maps to Big Five Openness. Related to artistic thinking and intellectual curiosity.
"""

from .base import DimensionTemplate


"""
LYRA - Creativity & Openness

The dimension measuring creativity, imagination, and openness to experience.
Maps to Big Five Openness. Related to artistic thinking and intellectual curiosity.
"""

from .base import DimensionTemplate


LYRA_VERY_HIGH = DimensionTemplate(
    title="The Visionary Dreamer",
    core_nature="You live in possibilities. Your mind is a constant explosion of ideas, connections, what-ifs. Reality is just the starting point. You see patterns others miss, connections others don't make, possibilities that don't exist yet. You're creative, imaginative, intellectually restless. You're brilliant. You're also exhausting - to yourself and others.",
    description="You can't turn your mind off. New ideas interrupt conversations. You start seventeen projects because they all seem interesting. You see the world through metaphor, symbolism, possibility. Boring isn't a description of activities - it's a physical sensation you avoid at all costs. You need novelty, creativity, intellectual stimulation constantly. Routine feels like dying slowly. Convention feels like prison. You're perpetually seeking something new, different, transformative.",
    inner_world="Your mind is a pinball machine of ideas ricocheting at light speed. You make connections between disparate concepts. You think in metaphors and abstractions. You're three conversations ahead in your head while simultaneously thinking about an unrelated creative project. You can't follow linear conversations because your mind branches in seventeen directions at once. This is exhilarating and exhausting. You're intellectually alive but rarely at peace.",
    motivations=[
        "To create something novel and meaningful",
        "To explore every interesting idea",
        "To push boundaries and challenge conventions",
        "To experience intellectual and creative flow",
        "To avoid the soul-crushing weight of routine"
    ],
    fears=[
        "Becoming ordinary or conventional",
        "Wasting creative potential",
        "Being trapped in routine",
        "Your ideas never manifesting",
        "Your mind going quiet (it terrifies you)"
    ],
    strengths=[
        "Exceptional creativity and innovation",
        "See connections others miss",
        "Generate novel solutions effortlessly",
        "Inspire others with vision and possibilities",
        "Intellectually adventurous and brave"
    ],
    shadows=[
        "Can't finish what you start",
        "Too many ideas, not enough execution",
        "Seem scattered or unrealistic",
        "Bore easily, abandon commitments",
        "Your creativity becomes self-indulgence"
    ],
    in_relationships="Your partner finds you fascinating and frustrating in equal measure. You're never boring. You're also never content. You need constant novelty - new restaurants, new experiences, new conversations. Routine date nights feel suffocating. They want stability. You want adventure. You've changed career paths, hobbies, and philosophies multiple times. They're struggling to keep up. You're the partner who suggests moving to another country on a Tuesday. They need roots. You need wings. This might be incompatible.",
    at_work="You're the idea generator everyone wants in brainstorming, no one wants in execution. You have seventeen brilliant concepts and finish zero. You start projects with enthusiasm and abandon them when the novelty wears off. You excel in innovation, R&D, creative fields, strategy - anywhere ideas matter more than follow-through. You're terrible in routine roles, administrative work, or anything requiring consistent execution of the same process. You need variety or you die inside.",
    under_stress="Your creativity goes into overdrive. You start new projects, consume art obsessively, chase ideas frantically. This looks productive but it's avoidance. You're using creativity to escape rather than cope. OR you completely shut down creatively - can't access ideas, can't create, feel blocked. Both extremes are stress responses. Your creativity is your identity, so when it's threatened or overwhelming, you're untethered.",
    at_best="You've learned to channel your creative explosion into actual output. You have collaborators who handle execution while you generate ideas. You've found work that values innovation over consistency. You create regularly and finish some things. You've balanced novelty-seeking with enough routine to function. You're still wildly creative but also productive. Your ideas actually manifest instead of just existing in your head.",
    growth_path="Your creativity is a gift and a curse. The growth is learning to finish. Find collaborators who complement your ideation with execution. Build minimal routine so you can actually produce. And learn to sit with boredom - it won't kill you. Some of your best ideas come after sitting with a problem, not by immediately jumping to the next shiny thing. Harness your creativity; don't let it scatter you. Focus is the difference between brilliant and unfulfilled."
)

LYRA_HIGH = DimensionTemplate(
    title="The Creative Explorer",
    core_nature="You're creative, curious, and open to new experiences. You like novelty but you don't need it constantly. You enjoy creative pursuits and intellectual exploration, but you can also appreciate routine when it serves you. You're innovative without being impractical, imaginative without being scattered.",
    description="You have a rich creative life. You pursue hobbies, explore ideas, seek new experiences. You're intellectually curious - you read widely, try new things, ask interesting questions. But you also know when to focus and execute. You balance creativity with practicality. You're open-minded but not so open your brain falls out. You appreciate both novelty and familiarity in healthy doses.",
    inner_world="You think: 'What if?' but also 'How would this actually work?' You're creative but grounded. You generate ideas and evaluate them. You're intellectually curious without being obsessive. Your mind wanders but you can bring it back to focus when needed. You appreciate abstract thinking and concrete reality. You exist comfortably in both worlds.",
    motivations=[
        "To express creativity meaningfully",
        "To explore ideas and experiences",
        "To grow intellectually and artistically",
        "To balance innovation with practical execution",
        "To live a rich, engaged life"
    ],
    fears=[
        "Becoming creatively stagnant",
        "Missing interesting opportunities",
        "Being seen as conventional or boring",
        "Not developing your creative potential",
        "Losing intellectual curiosity"
    ],
    strengths=[
        "Creative and innovative",
        "Open to new ideas and experiences",
        "Can balance imagination with execution",
        "Intellectually engaged and curious",
        "Inspire others without overwhelming them"
    ],
    shadows=[
        "Might chase novelty over depth sometimes",
        "Could judge more conventional people",
        "May start more than you finish",
        "Might prioritize interesting over important",
        "Your creativity can become scattered"
    ],
    in_relationships="You're the partner who suggests trying new restaurants, exploring new places, having interesting conversations. You keep life interesting without making it chaotic. You appreciate both adventure and cozy nights in. You're intellectually stimulating but not exhaustingly so. Your partner appreciates your creativity and curiosity. You make their life richer without making them feel inadequate for being less adventurous.",
    at_work="You're creative, innovative, and actually productive. You generate good ideas AND execute on them. You're excellent in roles combining creativity with strategy: product development, design, marketing, content creation, education. You can do routine work when necessary but you need creative challenges to stay engaged. You're the colleague who makes work more interesting without disrupting workflow.",
    under_stress="You might seek creative escape - binge media, start new hobbies, chase novelty to avoid dealing with stressors. OR you lose access to creativity temporarily and feel depleted. Generally, you use creativity to cope in healthy doses. You make art, explore ideas, find new perspectives. This helps you process stress without becoming avoidance.",
    at_best="You've built a life that includes regular creative expression. You have hobbies you actually pursue. You read, explore, create, grow. You're intellectually alive and also practically functional. You balance innovation with execution, novelty with routine, imagination with reality. You're creative without being scattered, open without being impractical. You've found your rhythm.",
    growth_path="Keep nurturing your creativity while building discipline around it. Ensure you're finishing some of what you start. Stay curious but also commit. Explore new ideas but also go deep on some. Your openness is strength - don't let it become dilettantism. Be creative AND productive. That's where fulfillment lives."
)

LYRA_MODERATE = DimensionTemplate(
    title="The Practical Dreamer",
    core_nature="You're creative... sometimes. When inspired, when it matters, when the mood strikes. You appreciate art and new ideas but you're not driven to constantly create or explore. You can be imaginative and you can be conventional, depending on context. You're creatively flexible, which is useful and sometimes frustrating.",
    description="You have creative interests but they're not your whole identity. You like trying new things but you also appreciate familiar comforts. You're open to new ideas but also skeptical. You're neither the artist consumed by their craft nor the person who's never had a creative thought. You're somewhere in the middle - occasionally inspired, mostly practical. This balance serves you well in life but sometimes leaves you feeling neither fully creative nor fully grounded.",
    inner_world="You think: 'That's interesting... but is it practical?' You appreciate creativity but you also value functionality. You have ideas but you filter them through feasibility. You're not constantly seeking novelty but you're also not resistant to it. You're creatively ambivalent - you can engage with art and abstraction, but you can also just... not. Depends on your mood and the situation.",
    motivations=[
        "To be creative when it matters",
        "To balance imagination with practicality",
        "To appreciate both art and utility",
        "To not get too stuck in routine",
        "To not get too lost in abstract ideas"
    ],
    fears=[
        "Being too boring",
        "Being too impractical",
        "Missing creative opportunities",
        "Being judged by highly creative people as unimaginative",
        "Never fully developing creative potential"
    ],
    strengths=[
        "Can be creative when needed",
        "Balance novelty with familiarity",
        "Appreciate both art and practicality",
        "Not intimidated by creative people or conventional people",
        "Flexible in how you approach problems"
    ],
    shadows=[
        "Never fully commit to creative pursuits",
        "Can seem uncommitted or wishy-washy",
        "Don't develop expertise in creative areas",
        "Might dismiss creative impulses too quickly",
        "Not distinct in either direction"
    ],
    in_relationships="Your partner gets both creative dates and comfortable routine. You're up for trying new things but you also love your favorite spots. You're interesting enough to not be boring, conventional enough to not be exhausting. This works well with most partners. The challenge: highly creative partners might find you limiting, highly conventional partners might find you unpredictable. You need someone similarly balanced or someone who accepts your variability.",
    at_work="You can handle creative tasks and routine work equally. You're not the innovation leader but you're also not the person who resists all new ideas. You're valuable in roles requiring both creativity and execution: generalist positions, consulting, operations with innovation components. You're the person who can do the boring stuff AND contribute to brainstorming. You're versatile but not specialized in either creativity or routine.",
    under_stress="Your creativity drops. You default to familiar, safe, proven approaches. Novelty feels like risk you can't afford when stressed. You want comfort, routine, predictability. Your creative pursuits get put on hold. You'll get back to them... eventually. Maybe. When life is less chaotic. But also maybe you won't, and you're kind of okay with that.",
    at_best="You've found a life that includes some creativity without demanding it constantly. You have creative hobbies you engage with occasionally. You appreciate art and new experiences but you also love your routines. You're neither creatively stagnant nor constantly seeking novelty. You've accepted you're not an artist and you're not a robot. You're somewhere in the human middle. And that's fine.",
    growth_path="Decide what you want. Are you creatively unfulfilled or contentedly moderate? If unfulfilled, commit to developing creative skills - discipline, not just inspiration. If content, stop comparing yourself to highly creative people. There's no moral virtue in being artistic. You can live a meaningful life with moderate creativity. The key is being honest about what you actually want, not what you think you should want."
)

LYRA_LOW = DimensionTemplate(
    title="The Concrete Traditionalist",
    core_nature="Creativity confuses you. Abstract ideas feel pointless. You prefer proven methods, concrete facts, traditional approaches. You don't see the value in constantly seeking novelty. What works, works - why change it? You're practical, grounded, conventional. Some call this closed-minded. You call it sensible.",
    description="You don't understand modern art. You don't see the point of philosophical debates with no practical application. You like routine, familiarity, proven methods. New isn't better just because it's new. You trust experience over innovation. You're the person asking 'But will this actually work?' when others are excited about theoretical possibilities. You value concrete over abstract, practical over imaginative, traditional over novel.",
    inner_world="You think: 'What's the practical application?' Abstract concepts frustrate you. You want clear, concrete, actionable information. You don't see problems as opportunities for creative exploration - you see them as things to solve with proven methods. Your mind works linearly, logically, concretely. You don't naturally make abstract connections or see metaphorical meanings. You're literal, practical, grounded in observable reality.",
    motivations=[
        "To use what works reliably",
        "To avoid unnecessary risk and change",
        "To maintain stability and predictability",
        "To be seen as sensible and practical",
        "To prove that traditional methods work"
    ],
    fears=[
        "Chaos caused by unnecessary innovation",
        "Being forced into change for change's sake",
        "Abstract thinking leading nowhere useful",
        "Being judged as uncreative or closed-minded",
        "Valuable traditions being discarded"
    ],
    strengths=[
        "Highly practical and grounded",
        "Excellent at executing proven methods",
        "Value reliability over novelty",
        "Don't waste time on impractical ideas",
        "Preserve valuable traditional knowledge"
    ],
    shadows=[
        "Resistant to necessary change",
        "Miss opportunities in novel approaches",
        "Can seem closed-minded or rigid",
        "Dismiss creative ideas too quickly",
        "Limited by what's already known"
    ],
    in_relationships="Your partner knows what to expect - same restaurants, same routines, same conversations. You're comfortable and predictable. This is either comforting or boring depending on your partner. If they're creative, they're frustrated by your resistance to trying new things. If they're traditional, you're perfectly matched. You don't understand partners who need constant novelty. You've found what works. Why keep searching?",
    at_work="You excel at execution, implementation, process work. You're excellent in roles requiring precision and consistency: manufacturing, operations, administration, trades, technical work. You're terrible at innovation, R&D, creative roles, anything requiring openness to new approaches. You're the person who says 'We've always done it this way' - sometimes this preserves valuable knowledge, sometimes this blocks necessary progress.",
    under_stress="You become even more rigid. You cling to routine and proven methods even when they're not working. Change feels threatening when you're already stressed. You want familiarity, predictability, control. Creative solutions seem risky. You double down on what's always worked, even when circumstances have changed and it doesn't work anymore.",
    at_best="You're a valuable stabilizing force. While others chase novelty, you preserve what works. You execute reliably. You provide continuity. You're the institutional memory. You prevent organizations from abandoning valuable practices for flashy new trends. Your skepticism of unproven ideas protects against waste. You're practical, reliable, grounded. These are genuine strengths in a world obsessed with innovation.",
    growth_path="You don't need to become creative. You need to become less resistant to others' creativity. Learn to evaluate new ideas on merit, not novelty. Some traditional approaches are valuable; some are outdated. Practice curiosity: try one new thing monthly. It won't kill you. And recognize: sometimes 'we've always done it this way' is wisdom, sometimes it's stagnation. Learn to tell the difference."
)

LYRA_VERY_LOW = DimensionTemplate(
    title="The Rigid Pragmatist",
    core_nature="New ideas are threats. Change is dangerous. Creativity is frivolous waste. You need predictability, routine, proven methods. Anything abstract, novel, or unconventional triggers resistance in you. You're not just uncreative - you're anti-creative. You actively resist imagination, innovation, novelty. This keeps you safe and it keeps you stuck.",
    description="You don't do creative. You don't see the point of art, philosophy, innovation, or exploration. These things are useless distractions from practical reality. You want concrete, proven, traditional approaches to everything. You've never understood poetry or abstract art or 'thinking outside the box.' There is no box - there are proven methods and there are risky experiments. You choose proven every time. Change for change's sake is foolishness. Convention exists because it works.",
    inner_world="You think: 'Why would we change what works?' Your mind is concrete, literal, resistant to abstraction. Metaphors confuse you. Philosophical questions irritate you. Creative brainstorming feels like time-wasting. You want clear answers, proven methods, straightforward approaches. Your world is black and white, concrete and knowable. Ambiguity and possibility don't interest you - they threaten you.",
    motivations=[
        "To maintain absolute predictability",
        "To avoid risk and uncertainty",
        "To prove that traditional methods are sufficient",
        "To resist unnecessary change",
        "To protect yourself from chaos"
    ],
    fears=[
        "Being forced into change",
        "Chaos caused by experimentation",
        "Losing familiar structures and routines",
        "Being judged for not being creative",
        "The world changing too fast to keep up"
    ],
    strengths=[
        "Extremely reliable and consistent",
        "Excellent at executing standard procedures",
        "Preserve traditional knowledge and methods",
        "Don't waste resources on unproven ideas",
        "Provide stability in chaos"
    ],
    shadows=[
        "Cannot adapt to necessary change",
        "Miss opportunities in new approaches",
        "Actively resist innovation that could help",
        "Seen as rigid, closed-minded, or obstructionist",
        "Your fear of change becomes self-sabotage"
    ],
    in_relationships="Your partner knows exactly what to expect - same routine, same places, same conversations, forever. If they're okay with this, you're perfectly content. If they need growth, exploration, or novelty, they're desperately unhappy. You don't understand why they want to change things that work. They don't understand why you resist any change at all. You eat at the same restaurant, order the same food, have the same conversations. This is comfortable for you. This is suffocating for anyone with even moderate openness.",
    at_work="You're excellent at routine, standardized work requiring zero creativity. You follow procedures perfectly. You resist any process changes even when they're improvements. You're the person who blocks innovation because 'this is how we've always done it.' Sometimes you're right - not all change is good. Often you're wrong - resistance to all change prevents necessary adaptation. You excel in rigid, structured environments. You fail in dynamic, innovative, creative spaces.",
    under_stress="You become even more rigid. You cling desperately to routine and familiarity. Any change feels like attack. You resist adaptation even when circumstances demand it. Your inflexibility increases when you're stressed, which often makes situations worse. You can't pivot, can't adapt, can't try new approaches. You repeat what's worked before even when it's clearly not working now.",
    at_best="You've found work requiring zero creativity or adaptation. You have a structured routine that never changes. You've surrounded yourself with similarly conventional people. You're not expected to innovate or explore. You execute proven methods reliably. In environments valuing consistency over innovation, you thrive. You've built a predictable life and you're content with it. Change happens around you; you remain constant.",
    growth_path="This isn't about becoming creative - that's not happening. This is about becoming less threatened by others' creativity. Learn to tolerate change even if you don't embrace it. Recognize that some adaptation is survival, not betrayal. Try one new thing annually. Literally one. A new restaurant. A new route to work. Something. Prove to yourself that small changes don't destroy you. Your rigidity is protective but it's also limiting. Find the balance between valuing tradition and adapting to necessity."
)
