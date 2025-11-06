"""
ORIN - Organization & Conscientiousness

The dimension measuring organization, discipline, and conscientiousness.
Maps to Big Five Conscientiousness. LaHaye: Melancholy = perfectionist, Sanguine = chaos.
"""

from .base import DimensionTemplate


"""
ORIN - Organization & Conscientiousness

The dimension measuring organization, discipline, and conscientiousness.
Maps to Big Five Conscientiousness. LaHaye: Melancholy = perfectionist, Sanguine = chaos.
"""

from .base import DimensionTemplate


ORIN_VERY_HIGH = DimensionTemplate(
    title="The Control Perfectionist",
    core_nature="Everything has a place. Everything has a system. You don't just like organization - you need it. Chaos feels physically uncomfortable. Your closet is color-coded. Your files are labeled. Your calendar is blocked to the minute. You're either impressively disciplined or exhaustingly rigid, depending on who you ask.",
    description="You can't function in mess. A cluttered desk means a cluttered mind - literally, for you. You plan everything. You schedule spontaneity (yes, the irony isn't lost on you). You have contingency plans for your contingency plans. You're the person who actually reads instruction manuals, follows recipes exactly, and triple-checks their work. You're excellent at execution, terrible at improvisation.",
    inner_world="You think: 'What's the system for this?' Everything can be optimized. Everything should be organized. You see disorder where others see normal. That crooked picture frame bothers you for hours. Those unread emails create actual anxiety. Your mind is a series of checklists, timelines, and processes. You feel calm when things are structured, stressed when they're not. Structure isn't preference - it's necessity.",
    motivations=[
        "To create order from chaos",
        "To achieve perfection through systems",
        "To be prepared for any situation",
        "To prove that discipline yields results",
        "To avoid the anxiety that disorder creates"
    ],
    fears=[
        "Losing control",
        "Things falling apart due to poor planning",
        "Being seen as uptight or inflexible",
        "Making preventable mistakes",
        "Chaos overwhelming your carefully built systems"
    ],
    strengths=[
        "Exceptional reliability and follow-through",
        "High-quality work with attention to detail",
        "Can manage complex projects flawlessly",
        "Others trust your thoroughness",
        "Create systems that make everyone more effective"
    ],
    shadows=[
        "Perfectionism paralyzes you",
        "Can't adapt when plans change",
        "Micromanage others' work",
        "Your standards exhaust people around you",
        "Rigidity prevents spontaneity and joy"
    ],
    in_relationships="Your partner appreciates your reliability until they feel controlled by it. You want to schedule date nights three weeks in advance. They want to be spontaneous. You've color-coded the kitchen cabinets. They can't find anything now. You have routines for everything. They feel suffocated by structure. You're punctual, prepared, organized. They're... not. This creates constant tension. You see their flexibility as chaos. They see your structure as prison. You need someone equally structured or someone patient enough to work within your systems.",
    at_work="You're the person every project manager wants on their team. You meet every deadline, early. Your work is flawless. Your documentation is impeccable. You're promoted because you're dependable. But you're also exhausting. You can't let go of control. You redo others' work because it doesn't meet your standards. You're stressed when processes aren't followed exactly. You excel in roles requiring precision: project management, accounting, operations, quality control. You struggle in fast-paced, ambiguous, or creative environments where structure is fluid.",
    under_stress="You become more rigid, more controlling, more obsessive about order. You clean when you're anxious. You organize when you're overwhelmed. You make lists to calm down. Others see this as weird. For you, it's survival. When life feels out of control, you control what you can: your space, your schedule, your systems. This works until it doesn't. Eventually you're reorganizing your closet at 2am instead of sleeping, and you know you've crossed from coping to compulsion.",
    at_best="You've channeled your need for order into systems that serve you, not enslave you. You're still organized but you can flex when needed. You've learned that perfection isn't always necessary. You delegate without micromanaging. Your discipline is admirable, not oppressive. You've found the balance between structure and spontaneity. People respect your organization without feeling controlled by it. You've made peace with good enough.",
    growth_path="Learn to tolerate imperfection. Not everything needs to be optimized. Practice letting go of control in low-stakes situations. Let the dishes sit overnight. Leave the bed unmade. See: the world doesn't end. Your perfectionism is a cage disguised as achievement. Break one rule, miss one deadline, let one thing be messy. You'll survive. Then do it again. Freedom exists on the other side of your rigid systems - but you'll never find it if you don't occasionally break them."
)

ORIN_HIGH = DimensionTemplate(
    title="The Disciplined Organizer",
    core_nature="You're organized and disciplined, but not obsessively so. You have systems that work. You follow through on commitments. You plan ahead. But you can also adapt when things change. You're structured without being rigid, reliable without being perfectionist. You've found the sweet spot between chaos and control.",
    description="You like things organized but you don't lose sleep over a messy desk. You plan your week but you can handle spontaneity. You're the person who shows up prepared, meets deadlines, and follows through - but you're not stressed if everything isn't perfect. You have high standards without being impossible. You're disciplined without being inflexible. Others appreciate your reliability without feeling controlled by your structure.",
    inner_world="You think: 'What's the plan?' You like having structure but you're comfortable with some ambiguity. You make to-do lists but don't panic if you don't complete them. You prefer order but can function in mess. You're conscientious because it makes life easier, not because disorder causes existential anxiety. Your organization serves you - you don't serve your organization.",
    motivations=[
        "To be reliable and trustworthy",
        "To maintain productive systems",
        "To follow through on commitments",
        "To balance structure with flexibility",
        "To make life easier through organization"
    ],
    fears=[
        "Becoming too rigid or controlling",
        "Letting people down by missing commitments",
        "Losing your organizational edge",
        "Being seen as uptight",
        "Falling into chaos without systems"
    ],
    strengths=[
        "Reliable and trustworthy",
        "Good at planning and execution",
        "Balanced between structure and spontaneity",
        "Others respect your organization",
        "Can adapt when plans change"
    ],
    shadows=[
        "Might judge less organized people",
        "Could over-plan in some situations",
        "May struggle with truly chaotic environments",
        "Might default to structure when flexibility is better",
        "Could appear rigid even when you're not"
    ],
    in_relationships="You're the partner who plans vacations, remembers important dates, and handles logistics smoothly. You're organized but not controlling. You suggest structure but don't demand it. When your partner wants spontaneity, you can roll with it (even if you secretly wish you'd planned ahead). You bring stability without rigidity. You're reliable without being boring. Your organization makes their life easier, not harder.",
    at_work="You're the colleague everyone wants on their team. You deliver quality work on time. You're prepared for meetings. You follow through on commitments. You're not the person who needs three follow-ups to complete a task. You excel in structured roles but can handle some ambiguity. You're disciplined enough to be trusted with important work, flexible enough to adapt when priorities shift. You're productive without being perfectionist.",
    under_stress="You become more structured as a coping mechanism. You make lists, clean your space, organize your tasks. This helps you feel in control when other things aren't. But unlike extreme organizers, you don't spiral into compulsive organizing. You use structure to manage stress, then you let it go. You know when organizing is helping and when it's avoiding.",
    at_best="You've mastered the balance between discipline and flexibility. You have systems that work but aren't enslaved to them. You're organized enough to be effective, flexible enough to be pleasant. People respect your reliability. You deliver results through structure without imposing that structure on others. You've found your rhythm and it works.",
    growth_path="Keep refining your balance. Notice when your structure serves you and when it limits you. Practice spontaneity intentionally - it's a skill like any other. Learn to appreciate less organized people's strengths instead of judging their chaos. Your discipline is valuable but it's not the only way to be effective. Stay flexible in your structure."
)

ORIN_MODERATE = DimensionTemplate(
    title="The Conditional Planner",
    core_nature="You're organized... when it matters. When the deadline is real or the stakes are high, you're disciplined and structured. When it's low-priority or just for you, you're a mess. Your home is chaos but your work projects are pristine. You can be both Type A and Type B depending on what's at stake. This flexibility is useful but also deeply confusing.",
    description="Your desk at work is organized. Your desk at home looks like a tornado hit it. You meet client deadlines religiously but your personal goals slip repeatedly. You're capable of discipline - you just don't apply it consistently. You're organized when external accountability exists. Without it, you default to chaos. You're not lazy; you're just selectively conscientious. This works until it doesn't.",
    inner_world="You think: 'Do I really need to organize this?' You have the capacity for structure but limited motivation to maintain it for everything. You triage: work stuff gets organized, personal stuff gets handled eventually. You make plans and then don't follow them. You start organizational systems that collapse within weeks. You know you should be more consistent. You're just... not. And you've mostly made peace with that.",
    motivations=[
        "To be organized when it actually matters",
        "To meet external obligations reliably",
        "To avoid the stress of complete chaos",
        "To preserve energy by not organizing everything",
        "To appear more together than you feel"
    ],
    fears=[
        "Important things falling through the cracks",
        "Being exposed as less organized than you appear",
        "Your inconsistency catching up with you",
        "Missing opportunities due to disorganization",
        "Never developing real discipline"
    ],
    strengths=[
        "Can be highly organized when needed",
        "Flexible and adaptable",
        "Don't waste energy on unnecessary organization",
        "Understand context-appropriate structure",
        "Can shift between structured and spontaneous"
    ],
    shadows=[
        "Inconsistent - people don't know which version they'll get",
        "Personal life suffers while work life thrives",
        "Important personal goals get neglected",
        "Your disorganization stresses people around you",
        "You're capable of more but don't follow through"
    ],
    in_relationships="Your partner has learned that you're reliable about big stuff and chaotic about small stuff. You'll plan the wedding perfectly but forget to do laundry for three weeks. You remember their important presentation but forget to reply to their text. This frustrates them. You're capable of being organized - you just don't apply it to home life consistently. They want you to care about domestic organization the way you care about work organization. You want them to understand you have limited organizational energy and you spend it on what matters most (which apparently isn't matching socks).",
    at_work="You're seen as organized and reliable, which is partially true. You meet deadlines that matter. You prepare for important meetings. You deliver on high-visibility projects. But your filing system is chaos, your email is a disaster, and you're constantly scrambling on small tasks. You excel under pressure because pressure forces organization. Without it, you drift. Your manager sees competence. Your desk sees crime scene. Both are accurate.",
    under_stress="Your organization collapses. You revert to crisis management mode. Everything becomes urgent triage - you handle the loudest fires and ignore everything else. Your personal organization crumbles first. Then your work organization starts slipping. You're capable of discipline under stress, but only for the absolute essentials. Everything else becomes 'deal with later.' Later rarely comes.",
    at_best="You've accepted your conditional nature. You're ruthlessly organized about what matters and unapologetically chaotic about what doesn't. You've stopped trying to be consistently disciplined about everything - you focus your organizational energy strategically. You meet commitments that matter. You let go of perfectionism about the rest. You're not consistently organized, but you're consistently effective where it counts.",
    growth_path="Stop beating yourself up for not being perfectly consistent. You'll never be the person who organizes everything - accept that. The growth is identifying what truly matters and being disciplined there while consciously choosing chaos elsewhere. Create minimal viable systems: not perfect organization, just good enough. And extend some structure to personal goals - they matter even without external accountability. Find the balance between strategic organization and exhausting perfectionism."
)

ORIN_LOW = DimensionTemplate(
    title="The Chaotic Creator",
    core_nature="Organization is something you admire in others but can't seem to achieve yourself. You start with good intentions - make a plan, create a system, buy the planner. Then... you don't follow it. You're spontaneous, scattered, perpetually behind on everything. Your life is organized chaos at best, just chaos at worst. You know you should be more disciplined. You're just not.",
    description="Your space is a mess. Your schedule is a suggestion. Your plans are vague hopes. You miss deadlines not because you don't care but because you forgot or underestimated the time needed. You've bought seventeen organizational systems and used none consistently. You work in bursts when inspiration hits, not according to any structured plan. You're creative and spontaneous, which is great. You're also unreliable and scattered, which is not.",
    inner_world="You think: 'I'll do it later.' Later never comes. You have good intentions and poor follow-through. You make plans you don't keep. You start projects you don't finish. Your mind is scattered across seventeen things at once. You can't focus on organizing when there's something more interesting to think about. Structure feels constraining. Chaos feels natural. You're aware this is a problem. You're just not sure how to fix it.",
    motivations=[
        "To be more organized (someday)",
        "To stop disappointing people with missed commitments",
        "To feel less stressed by constant chaos",
        "To prove you're capable of discipline",
        "To find systems that actually work for your brain"
    ],
    fears=[
        "Never developing discipline",
        "Missing important opportunities due to disorganization",
        "Being seen as lazy or irresponsible",
        "Your chaos hurting people you care about",
        "Important things falling through the cracks"
    ],
    strengths=[
        "Spontaneous and adaptable",
        "Creative and unconventional thinking",
        "Can pivot quickly when needed",
        "Don't get stuck in rigid systems",
        "Comfortable with ambiguity and chaos"
    ],
    shadows=[
        "Chronically disorganized",
        "Miss deadlines and forget commitments",
        "Others can't rely on you",
        "Your chaos stresses everyone around you",
        "You're capable of more but self-sabotage through disorganization"
    ],
    in_relationships="Your partner has learned not to count on you for logistical things. You'll forget the reservation. You'll be late picking them up. You'll lose the tickets. They love your spontaneity and creativity. They're exhausted by your unreliability. You promise to be better. Sometimes you are, briefly. Then you slip back. They've become the organizer by default because someone has to be. This creates resentment on both sides. You feel nagged. They feel like your parent. Neither is happy.",
    at_work="You're creative and have great ideas. You're also the person who misses deadlines, shows up unprepared, and can't find important documents because your filing system is 'I'll remember where I put it' (you never do). You work best in last-minute crisis mode when adrenaline forces focus. You struggle in roles requiring consistent organization: project management, administration, anything with strict deadlines. You excel in creative roles where chaos is asset: brainstorming, innovation, creative work - as long as someone else handles execution.",
    under_stress="Your already-chaotic organization completely falls apart. You stop even pretending to have systems. You handle only the most urgent things and even those slip sometimes. Your space becomes more disorganized. Your commitments pile up. You're aware it's getting worse but you're too overwhelmed to start organizing. The thought of creating structure when you're already drowning feels impossible. So you don't. And things get worse.",
    at_best="You've found work that values creativity over organization. You've hired help or partnered with organized people to handle logistics. You've accepted you'll never be highly disciplined and stopped beating yourself up about it. You've created minimal systems for the truly important stuff. You're unreliable about small things but you show up for what matters. You've built a life that works with your chaos instead of fighting it.",
    growth_path="Stop trying to become highly organized - it's not happening. The goal is minimal viable organization: just enough structure to keep important things from falling apart. Partner with organized people. Use external accountability. Find one organizational system and stick with it (just one). And get real: is this disorganization or is this ADHD? If you can't focus, can't follow through, can't organize despite wanting to - that's not laziness, that's neurodivergence. Get evaluated. Get support. Stop fighting who you are and start building systems that actually work for your brain."
)

ORIN_VERY_LOW = DimensionTemplate(
    title="The Disaster Zone",
    core_nature="Organization is a myth. Discipline is a rumor. You live in perpetual chaos and you've basically given up on changing it. Your space looks like a crime scene. Your schedule doesn't exist. Your plans are 'I'll figure it out when I get there.' You're not just disorganized - you're organizationally challenged. And you've mostly stopped apologizing for it.",
    description="You can't find your keys. You don't know where important documents are. Your car is full of stuff you meant to deal with months ago. You've missed appointments because you forgot they existed. You've paid late fees on everything. You have no filing system, no schedule, no structure. You work purely reactively - handling crises as they emerge, never planning ahead. This is exhausting for everyone, especially you. But also... it's just who you are at this point.",
    inner_world="You think: 'Where did I put that?' You've lost important things so many times you've stopped trusting yourself with important things. Your mind is a jumble of half-remembered obligations, vague intentions, and forgotten deadlines. You have no mental filing system. You can't remember where you put things, what you committed to, or what you were supposed to do today. Structure is incomprehensible. Your brain doesn't work that way. You don't plan ahead because you can barely handle now.",
    motivations=[
        "To survive day-to-day without major disasters",
        "To stop losing important things",
        "To minimize the damage your chaos causes",
        "To figure out why organization is so impossible for you",
        "To find people who can tolerate your mess"
    ],
    fears=[
        "Missing something critically important",
        "Your disorganization destroying opportunities",
        "Everyone giving up on you",
        "Never being able to function like normal adults seem to",
        "Something being fundamentally broken in you"
    ],
    strengths=[
        "Excellent at crisis management",
        "Can improvise when plans fall apart",
        "Comfortable with extreme ambiguity",
        "Don't need structure to function (barely)",
        "Have learned to be resourceful out of necessity"
    ],
    shadows=[
        "You're completely unreliable",
        "Your chaos actively harms people around you",
        "You miss important opportunities constantly",
        "People can't count on you for anything",
        "Your disorganization is self-sabotage"
    ],
    in_relationships="If you're in a relationship, your partner is either equally chaotic or a saint. They've learned not to rely on you for anything logistical. They plan everything, remember everything, handle everything organizational because you can't. You've missed anniversaries. You've forgotten important events. You've lost things they needed. They love you despite your chaos, but the chaos is exhausting them. They've become the adult in the relationship by default. This isn't sustainable. They're tired. You feel guilty but not guilty enough to actually change. Because you've tried and failed so many times you're not sure change is possible.",
    at_work="You've been fired or nearly fired for disorganization. You miss deadlines. You lose important documents. You show up to meetings unprepared or don't show up at all because you forgot. You're underemployed because you can't handle roles requiring any organization. You work in positions below your capability because you can't demonstrate reliability. Your coworkers don't trust you with important tasks. Your managers have given up on you. You have potential - it's just buried under chaos.",
    under_stress="Nothing changes because you're already at maximum chaos. You can't get more disorganized - you're already there. The difference is you stop caring about even trying. You let everything slide. Bills go unpaid. Obligations forgotten. People stop expecting anything from you. You're aware this is rock bottom but you don't have energy to climb out. You're just... existing in chaos. Surviving, barely.",
    at_best="You've found work that requires zero organization - gig work, creative freelancing, anything where you show up, do the thing, leave. You've automated bill payments so you stop getting late fees. You've minimized your possessions so there's less to lose. You've found someone who handles logistics for you - partner, assistant, parent, friend. You've accepted you'll never be organized and built a life that accommodates extreme disorganization. You're functional within your chaos.",
    growth_path="This isn't about becoming organized - that ship sailed. This is about damage control and getting evaluated for ADHD or executive function disorders. If you literally cannot organize despite wanting to, despite trying, despite consequences - that's not laziness, that's neurodivergence. Get professional help. Find medication, therapy, coaches who specialize in executive function. Build external systems: reminders, alarms, automation, other people handling logistics. Stop trying to fix yourself and start building accommodations. You're not broken - you're just trying to function with a brain that doesn't do organization naturally. Get the support you actually need."
)
