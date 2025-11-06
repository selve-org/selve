"""
LUMEN - Social Energy & Enthusiasm

The dimension measuring extraversion, social energy, and enthusiasm.
Maps to Big Five Extraversion and LaHaye Sanguine temperament.
"""

from .base import DimensionTemplate


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

LUMEN_LOW = DimensionTemplate(
    title="The Quiet Observer",
    core_nature="Social interaction is expensive energy. You budget it carefully. You're not shy - you're selective. Small groups are tolerable. Large gatherings are hell. You're most yourself alone, and that's not a problem for you even if it confuses everyone else.",
    description="You don't hate people - you just don't need them the way others seem to. Socializing drains you like a phone battery running Instagram. You can do it, but afterward you need hours to recharge. You've perfected the Irish goodbye. You RSVP 'maybe' knowing it means 'no.' You're the one who leaves the party early and feels relief, not FOMO.",
    inner_world="You think: 'How much longer do I have to be here?' You're not bored or anxious - you're just... done. Your social battery has a visible meter and everyone can see it dropping. You count the minutes until you can leave without being rude. You fantasize about canceling plans. You've used 'I'm not feeling well' more times than you can count, and half the time it's technically true - socially exhausted IS a real condition.",
    motivations=[
        "To protect your limited social energy",
        "To avoid draining interactions",
        "To maintain deep connections with a select few",
        "To preserve your internal world",
        "To be understood, not changed"
    ],
    fears=[
        "Being forced into constant social performance",
        "Losing your alone time",
        "Being seen as cold or unfriendly",
        "Your few close relationships ending",
        "Never being understood by extroverts"
    ],
    strengths=[
        "Deep, meaningful one-on-one connections",
        "Excellent listener when you're engaged",
        "Independent and self-sufficient",
        "Strong internal world and creativity",
        "Don't need external validation to feel whole"
    ],
    shadows=[
        "Can seem cold or disinterested",
        "Might hurt others by withdrawing",
        "May miss opportunities by avoiding social events",
        "Could isolate beyond what's healthy",
        "Might be seen as antisocial or unfriendly"
    ],
    in_relationships="Your partner has learned not to take your need for space personally. You love them, but you also love being alone. Date nights are fine, but you'd rather stay in than go out. You've explained a hundred times that needing space doesn't mean you're upset. They still don't fully get it. You recharge separately. They recharge together. This is your biggest relationship challenge. You're not avoiding them - you're preserving yourself so you can show up fully later.",
    at_work="You're the one with headphones on, door closed, 'Do Not Disturb' status permanently set. You dread team-building exercises. You're productive in isolation, drained by collaboration. Video calls are exhausting even when you're not talking. You've perfected the minimal-input meeting strategy: arrive exactly on time, contribute when necessary, leave immediately after. Your manager worries you're not engaged. You're engaged - just not performatively social about it.",
    under_stress="You withdraw completely. Social contact feels physically painful. You cancel everything. You ignore texts. You need absolute solitude to recover. People think you're mad at them. You're not - you're just depleted. Your alone time isn't optional; it's survival. When you finally re-emerge, you have to explain that you weren't ghosting anyone, you were recharging. They don't understand. You're tired of explaining.",
    at_best="You've found your people - the few who get you. You've set boundaries around your energy without guilt. You socialize when you want to, not because you feel obligated. You've stopped pretending to be an extrovert. Your close friendships are deep and genuine because you're selective. You've built a life that honors your nature instead of fighting it. You're not lonely - you're content.",
    growth_path="Stop apologizing for who you are. Needing less social interaction doesn't make you broken. Educate people: introversion isn't shyness, it's energy management. Set clear boundaries without guilt. Find friends who respect your need for space. Build recharge time into your schedule like you'd schedule meetings. And remember: you're not obligated to attend every event, explain every absence, or justify your nature to anyone."
)

LUMEN_VERY_LOW = DimensionTemplate(
    title="The Solitary Hermit",
    core_nature="People are exhausting. Not sometimes - always. Social interaction feels like work you didn't apply for and can't quit. You're not depressed or anxious (maybe you are, but that's separate) - you genuinely prefer solitude to company. Always. This confuses everyone, including sometimes yourself.",
    description="You've been called a hermit so many times you've stopped correcting people. Social invitations feel like obligations you didn't agree to. Small talk is torture. Group activities are nightmares. Even one-on-one interaction drains you. You've perfected the art of seeming present while being completely checked out. You count the seconds until you can escape back to solitude. Being alone isn't lonely - it's relief.",
    inner_world="Your mind is loudest when you're alone, and you prefer it that way. You have rich internal conversations. You don't need external input to feel stimulated. You've been told you're 'in your own world' because you ARE and you like it there. Social interaction interrupts your internal process. You're not ignoring people - you're just more interested in your own thoughts. This isn't arrogance; it's preference.",
    motivations=[
        "To minimize forced social interaction",
        "To protect your solitude at all costs",
        "To be left alone without judgment",
        "To understand why you're wired this way",
        "To survive in an extrovert-designed world"
    ],
    fears=[
        "Being trapped in social situations with no escape",
        "Losing your alone time permanently",
        "Being forced to explain yourself constantly",
        "People thinking you're broken",
        "Never finding others who understand"
    ],
    strengths=[
        "Complete self-sufficiency",
        "Deep capacity for solo work and creativity",
        "Don't need others for validation or happiness",
        "Can focus deeply without social distraction",
        "Comfortable with yourself in ways others never achieve"
    ],
    shadows=[
        "Isolation can become unhealthy",
        "You've hurt people by disappearing",
        "May miss important life experiences",
        "Could be lonely but too stubborn to admit it",
        "Risk becoming genuinely isolated, not just solitary"
    ],
    in_relationships="If you're in a relationship, it's a miracle. Your partner has to be extraordinarily independent or extraordinarily patient. You need separate spaces. You need alone time daily, not weekly. They've learned not to ask 'What's wrong?' when you're quiet - nothing's wrong, you're just recharging. You've probably said 'I need space' so many times it's lost meaning. You love them, but you also love being alone more than they'll ever fully understand. This isn't sustainable long-term, and you both know it.",
    at_work="You work alone or you're miserable. Remote work saved your life. You never turn your camera on. You respond to messages hours later because 'real-time communication' is an oxymoron for you. You've structured your entire career around minimizing human interaction. You're seen as antisocial, difficult, or 'not a team player.' You don't care. You produce results in isolation. That should be enough. It's not always enough for them.",
    under_stress="You disappear. Completely. Ghost everyone. Turn off your phone. Don't check email. Become unreachable. This is how you cope. People worry. You don't have energy to care. You're not suicidal or in danger - you're just done with people for now. When you re-emerge (days or weeks later), you face frustrated friends and concerned family. You can't explain that you needed to shut down. They don't get it. You're tired of trying to make them get it.",
    at_best="You've found work that requires minimal interaction. You live alone or with someone who respects your space. You've stopped feeling guilty about who you are. You have one or two people who truly understand you - and that's enough. You've built a life that honors your extreme introversion instead of fighting it. You're not broken - you're just wired for solitude. And you've stopped apologizing for it.",
    growth_path="This isn't about becoming more social - it's about ensuring your solitude doesn't become isolation. There's a difference between choosing to be alone and hiding from the world. Check in: Are you content or avoiding? Make sure you have at least one person who can reach you in crisis. Consider therapy to understand if your introversion masks depression or social anxiety. And remember: extreme introversion is valid, but complete isolation is dangerous. Find the balance between honoring your nature and staying connected to humanity."
)
