"""
CHRONOS - Patience & Agreeableness

The dimension measuring patience, calm temperament, and interpersonal harmony.
LaHaye: Phlegmatic = serene patience, Choleric = impatient horn-blower.
"""

from .base import DimensionTemplate


"""
CHRONOS - Patience & Agreeableness

The dimension measuring patience, calm temperament, and interpersonal harmony.
LaHaye: Phlegmatic = serene patience, Choleric = impatient horn-blower.
"""

from .base import DimensionTemplate


CHRONOS_VERY_HIGH = DimensionTemplate(
    title="The Serene Peacemaker",
    core_nature="You have the patience of a saint. Nothing rattles you. Traffic doesn't bother you. Delays are just life. Difficult people are challenges, not enemies. You're calm, measured, endlessly patient. You're the person everyone wants in a crisis because you never panic, never rush, never lose your cool. You're either genuinely enlightened or you're suppressing rage. Sometimes even you're not sure which.",
    description="You don't do anger. You don't do urgency. You don't do impatience. Everything can wait. Everyone deserves patience. You're the calm in every storm. You wait without complaint. You tolerate what others find intolerable. You're easy-going to the point where people wonder if you actually care about anything. You do - you just don't see the point in getting worked up about it.",
    inner_world="You think: 'Why are people rushing?' Life moves at its own pace. You can't control it, so why stress? Traffic will clear or it won't. People will change or they won't. Your internal world is remarkably peaceful. You process annoyances and let them go. You don't ruminate on frustrations. You accept reality as it is without fighting it. This is either profound wisdom or emotional avoidance. Possibly both.",
    motivations=[
        "To maintain inner peace",
        "To avoid unnecessary conflict",
        "To create harmony in every situation",
        "To prove that patience resolves most problems",
        "To be the calm presence others need"
    ],
    fears=[
        "Losing your temper and destroying your peace",
        "Being taken advantage of due to patience",
        "Your calm being mistaken for apathy",
        "Discovering suppressed anger underneath",
        "Missing opportunities by waiting too long"
    ],
    strengths=[
        "Extraordinarily patient and calm",
        "Excellent mediator and peacemaker",
        "Don't escalate conflicts",
        "Can wait for long-term results",
        "Create peaceful environments"
    ],
    shadows=[
        "Might be too passive",
        "Could enable bad behavior through tolerance",
        "May suppress legitimate anger",
        "Your patience can look like apathy",
        "Might avoid necessary confrontation"
    ],
    in_relationships="Your partner appreciates your calm - until they need you to get angry with them and you... don't. They're venting about injustice and you're saying 'maybe they had reasons.' They want you to take their side unconditionally. You want to understand all perspectives. You never yell. You never rush. You're endlessly patient with their moods, their mistakes, their chaos. This is beautiful until they wonder if you're actually present or just... tolerant. Do you have passionate feelings or are you just professionally calm about everything?",
    at_work="You're the colleague everyone wants on frustrating projects. Client being difficult? You're patient. Deadline moved again? You're calm. Team conflict? You mediate. You don't get flustered by chaos. You work steadily regardless of pressure. You're excellent in roles requiring patience: customer service, counseling, teaching, healthcare, support roles. You're terrible in fast-paced, aggressive, urgent environments. You can't fake urgency. You won't rush. This is either wisdom or career limitation depending on industry.",
    under_stress="You become even more calm. Maybe too calm. You slow down when others speed up. You detach when others engage. Your patience becomes passivity. You stop responding urgently even to urgent things. You're so committed to calm that you stop being effective. OR the accumulated stress finally breaks through and you have a rare moment of anger that shocks everyone, including yourself. Then you feel guilty and return to extreme patience.",
    at_best="You've found the balance between patience and action. You're still calm but you can respond with appropriate urgency when needed. You maintain peace without enabling dysfunction. You mediate conflicts but you don't avoid necessary confrontation. Your patience is active, not passive. You create harmony without sacrificing effectiveness. People trust your calm because it's grounded in wisdom, not avoidance.",
    growth_path="Your patience is admirable but check: are you avoiding? Sometimes anger is appropriate. Sometimes urgency is necessary. Sometimes waiting is enabling. Practice expressing frustration when something genuinely bothers you. Let yourself feel impatience sometimes. Your calm is valuable but it shouldn't be absolute. Life requires occasional urgency. Allow yourself to be human, not just serene. Balance patience with appropriate action."
)

CHRONOS_HIGH = DimensionTemplate(
    title="The Patient Mediator",
    core_nature="You're patient, calm, and even-tempered. You don't rush. You don't rage. You wait things out. You handle difficult people with grace. But you're not infinitely patient - you have limits. You're calm until there's good reason not to be. You're the reasonable adult in most rooms without being passive about it.",
    description="You're the person people call when they need someone level-headed. You don't escalate conflicts. You give people benefit of the doubt. You wait for results without constant checking. Traffic is mildly annoying, not rage-inducing. Difficult people are manageable, not intolerable. You're patient but not infinitely so. You're calm but capable of urgency when needed. You've found good balance.",
    inner_world="You think: 'Let's give this time.' You default to patience but you can recognize when patience isn't working. You're calm but you're not avoiding - you're choosing calm as strategy. You process frustrations without letting them consume you. You can sit with discomfort without immediately reacting. You're emotionally regulated without being emotionally detached.",
    motivations=[
        "To handle situations with grace",
        "To maintain composure under pressure",
        "To give people and situations fair chance",
        "To model patience for others",
        "To avoid unnecessary escalation"
    ],
    fears=[
        "Losing patience when you shouldn't",
        "Being taken advantage of",
        "Your calm being seen as weakness",
        "Missing when patience should end",
        "Enabling bad behavior through tolerance"
    ],
    strengths=[
        "Patient and even-tempered",
        "Good at conflict de-escalation",
        "Can wait for long-term results",
        "Handle difficult people well",
        "Balanced between patience and action"
    ],
    shadows=[
        "Might be too patient with wrong people",
        "Could delay necessary action",
        "May suppress frustration longer than healthy",
        "Your patience might enable dysfunction",
        "Could be seen as passive when you're being strategic"
    ],
    in_relationships="Your partner appreciates your patience. You don't explode over small things. You give them space to be imperfect. You wait out their moods without taking them personally. But you're also capable of expressing when something genuinely bothers you. You're patient without being a doormat. You create calm relationship environment without avoiding conflict entirely. This balance makes you excellent partner for most people.",
    at_work="You're the colleague who stays calm in stressful situations. You work well with difficult clients or coworkers because you don't take things personally. You can handle projects with long timelines without getting impatient. You're reliable in sustained efforts. You excel in roles requiring patience and people skills: management, education, counseling, account management. You can also handle urgency when needed - you're just not living in constant urgency.",
    under_stress="You might become more irritable - your patience has limits. Under sustained stress, you either become more withdrawn (preserving patience by avoiding people) or more reactive (patience worn thin). Generally though, you maintain composure better than most. You've learned your triggers and you manage them well. Your patience is resource you protect.",
    at_best="You handle life's annoyances with grace. You're patient with people's imperfections including your own. You don't waste energy on frustrations you can't control. You create peaceful environments without being passive. You can be calm AND effective. People respect your patience because it's chosen strength, not avoidance weakness. You've mastered the art of strategic patience.",
    growth_path="Keep refining when patience serves and when it doesn't. Sometimes waiting is wisdom. Sometimes it's avoidance. Learn the difference. Express frustration when appropriate - it's data for others about your boundaries. Your patience is strength; make sure it's not becoming your hiding place. You're doing well. Stay balanced."
)

CHRONOS_MODERATE = DimensionTemplate(
    title="The Conditional Diplomat",
    core_nature="Your patience depends entirely on context, stakes, and mood. Some days you're remarkably patient. Other days you're snapping at everything. You're patient with people you like, impatient with people you don't. You're calm about some things, reactive about others. You're neither consistently patient nor consistently impatient. You're situationally both.",
    description="You can wait calmly or you can lose your temper, depending on what's at stake. You're patient with your kids, impatient with customer service. You're calm about work delays, stressed about personal delays. You give some people endless chances, others get one. Your patience isn't a trait - it's a variable. This flexibility is useful but also inconsistent. People never quite know which version they'll get.",
    inner_world="You think: 'How much does this matter?' You ration patience based on importance and energy. You're capable of deep patience and capable of reactive frustration. Which one shows up depends on circumstances, stress level, how much sleep you got, whether you've eaten. Your patience is real but conditional. You're aware of this inconsistency. Sometimes it bothers you, sometimes you accept it as realistic.",
    motivations=[
        "To be patient when it actually matters",
        "To not waste patience on things that don't deserve it",
        "To balance patience with appropriate reaction",
        "To preserve energy by being selectively patient",
        "To be reasonable without being passive"
    ],
    fears=[
        "Losing patience at wrong moment",
        "Being inconsistently patient hurting relationships",
        "Not knowing which version of you will show up",
        "Your impatience causing regrettable damage",
        "Never developing consistent patience"
    ],
    strengths=[
        "Flexible in how you respond",
        "Can be patient when stakes are high",
        "Don't waste patience on unimportant things",
        "Understand context-appropriate responses",
        "Capable of both patience and urgency"
    ],
    shadows=[
        "Inconsistent - people don't know what to expect",
        "Your patience depends on your mood",
        "Might be impatient with wrong people",
        "Your variability creates relationship stress",
        "You're capable of more patience but don't always access it"
    ],
    in_relationships="Your partner has learned to check your mood before asking for patience. Some days you're calm and understanding. Other days you're snapping at minor things. You're patient about some issues (their work stress) and impatient about others (them being late again). This creates confusion. They can't predict your responses. You're capable of great patience - you just don't apply it consistently. They want reliability. You want them to understand your patience has limits.",
    at_work="You're patient with some colleagues and projects, impatient with others. You wait calmly for important deliverables, you're stressed about minor delays. You handle some difficult clients with grace, others you avoid because you can't muster patience. Your manager has seen you be remarkably patient and frustratingly reactive. You're capable but inconsistent. This works okay but doesn't inspire confidence in your reliability under all conditions.",
    under_stress="Your patience evaporates. Things that normally wouldn't bother you become irritating. People you're usually patient with become intolerable. Your conditional patience becomes barely any patience. You're reactive, short-tempered, easily frustrated. You know this about yourself but can't always control it. When stress passes, your patience returns. This cycle repeats. You're managing it but not mastering it.",
    at_best="You've made peace with conditional patience. You're patient about what matters and you let yourself be impatient about what doesn't. You've stopped trying to be perfectly patient all the time. You save patience for relationships and situations that deserve it. You're honest about your limits. You communicate when your patience is thin. People appreciate your honesty even if your patience is variable.",
    growth_path="Accept that perfect patience isn't realistic. Focus on being patient about what truly matters. Build systems that support your patience: enough sleep, stress management, clear boundaries. Communicate your state: 'I don't have patience for this today' is honest and useful. And work on not taking your impatience out on innocent people. Your partner isn't responsible for your bad day. Direct frustration appropriately."
)

CHRONOS_LOW = DimensionTemplate(
    title="The Restless Reactor",
    core_nature="Patience is not your virtue. You want things done now, preferably yesterday. Waiting irritates you. Delays infuriate you. Slow people test your limits. You're quick to frustration, quick to anger, quick to 'let's just do it ourselves.' You're efficient and you're impatient and you're exhausting.",
    description="You don't do waiting well. Traffic makes you rage. Slow service gets complaints. People who take their time drive you crazy. You interrupt, you rush, you push. You're always in a hurry even when there's no actual urgency. You finish people's sentences. You can't sit through slow movies. You need everything faster - thinking, talking, moving, deciding. Patience feels like wasting time. Time is the only resource you can't make more of. You're not wasting it.",
    inner_world="You think: 'Why is everything taking so long?' Your mind moves fast. You process quickly. You decide quickly. Everyone else seems to move in slow motion. Waiting feels physically uncomfortable. Your internal experience is constant urgency even when nothing is actually urgent. You're perpetually rushed, perpetually frustrated that the world won't keep up with your pace.",
    motivations=[
        "To get things done efficiently",
        "To not waste time on waiting",
        "To keep moving forward",
        "To avoid the discomfort of patience",
        "To prove that speed and efficiency matter"
    ],
    fears=[
        "Being stuck waiting indefinitely",
        "Missing opportunities due to others' slowness",
        "Your impatience destroying relationships",
        "Wasting precious time",
        "Never finding people who match your pace"
    ],
    strengths=[
        "Highly efficient and productive",
        "Don't tolerate unnecessary delays",
        "Push projects forward",
        "Quick decision-maker",
        "Get things done fast"
    ],
    shadows=[
        "Your impatience hurts people",
        "You rush decisions that need consideration",
        "Miss nuance by moving too fast",
        "Difficult to be around",
        "Your urgency creates stress for others"
    ],
    in_relationships="Your partner has learned you're impatient about everything. They're telling a story and you're trying to speed them to the point. They're taking time to decide and you're pushing them to choose. They need emotional processing and you're ready to move on. Your impatience reads as not caring. You do care - you just can't sit with slowness. They need patience from you. You have very little to give. This creates constant friction. You're frustrated they're so slow. They're hurt you're so rushed.",
    at_work="You're productive because you're always pushing. You don't tolerate inefficiency. You speed through meetings. You make quick decisions. You're excellent in fast-paced environments: startups, emergency services, deadline-driven work. You're terrible in slow, deliberate, process-heavy environments. You alienate coworkers who work at normal pace. You're seen as aggressive, pushy, impatient. You are. You get results. You also burn people out.",
    under_stress="Your impatience becomes intolerable. You snap at everyone. Everything is too slow. Nothing moves fast enough. You take over tasks because you can't wait for others. You make rash decisions. You're in constant fight-or-flight, treating everything as urgent. Your impatience under stress alienates everyone and makes situations worse. You can't help it - you're overwhelmed and everyone else is obstacles to relief.",
    at_best="You've found work that values speed over deliberation. You've surrounded yourself with fast-paced people who keep up. You've learned to recognize when your impatience is serving efficiency and when it's just stress. You still move fast but you can occasionally slow down for people who matter. You've accepted you'll never be patient - you're managing your impatience instead. You warn people: 'I move fast, keep up or tell me to slow down.'",
    growth_path="You won't become patient - accept that. Learn to distinguish between actual urgency and habitual rushing. Practice slowing down in low-stakes situations. Count to three before interrupting. Breathe before responding. And recognize: your impatience is anxiety dressed as efficiency. You're rushing away from discomfort. Therapy might help more than time management. Learn to tolerate slowness without panic. It won't kill you to wait."
)

CHRONOS_VERY_LOW = DimensionTemplate(
    title="The Volcanic Force",
    core_nature="You have zero patience. None. You explode when things don't move at your pace. You're rage behind a thin veneer of control. Every delay is personal attack. Every slow person is obstacle. You're the horn-honker, the line-skipper, the aggressive demander. You're efficient and you're terrifying. People avoid you because your impatience is weaponized aggression.",
    description="You don't wait. You can't wait. Waiting feels like dying. You're the person raging in traffic, screaming at service workers, demanding immediate resolution. You have no tolerance for anyone or anything that slows you down. You're always in crisis mode - everything is urgent, everything is late, everyone is incompetent. You're exhausting to be around. You're probably exhausting to be.",
    inner_world="You think: 'WHY IS NO ONE MOVING?' Your internal experience is constant rage barely contained. Everything takes too long. Everyone is too slow. You're perpetually on the edge of explosion. Patience isn't just difficult - it's impossible. You physically can't tolerate waiting. Your body floods with stress hormones the moment anything delays you. You're always ready to fight because everything feels like attack.",
    motivations=[
        "To never wait for anything",
        "To control pace and eliminate delays",
        "To force the world to move at your speed",
        "To avoid the unbearable feeling of patience",
        "To survive in a world that's too damn slow"
    ],
    fears=[
        "Being trapped in situations requiring patience",
        "Missing everything because of others' slowness",
        "Your rage completely taking over",
        "Being forced to slow down",
        "Everyone abandoning you due to your impatience"
    ],
    strengths=[
        "Extremely productive under pressure",
        "Push things forward aggressively",
        "Don't accept unnecessary delays",
        "Fast decision-maker",
        "Get immediate results"
    ],
    shadows=[
        "Your impatience is abuse",
        "You've hurt everyone who cares about you",
        "Your rage destroys relationships and opportunities",
        "You're impossible to work with",
        "Your impatience is serious anger problem"
    ],
    in_relationships="If you're in a relationship, it's dysfunctional. You've screamed at your partner for being slow. You've raged about minor delays. You can't wait for them to process emotions, make decisions, or just... be human at normal pace. You're constantly frustrated. They're constantly walking on eggshells. You've made them feel inadequate for normal human pace. This is verbal/emotional abuse dressed as impatience. They should leave. They probably will. You'll blame them for not keeping up.",
    at_work="You're productive and you're a nightmare. You've made coworkers cry. You've been talked to about your 'communication style.' You rage at perceived inefficiency. You can't collaborate because no one works fast enough for you. You've been fired or nearly fired for aggression. You excel in solo, high-pressure work but you destroy any team you're part of. You're the person everyone avoids, everyone complains about. You deliver results and destroy morale.",
    under_stress="You become dangerous. Your 'impatience' becomes rage attacks. You scream, you throw things, you intimidate. You're not managing stress - you're inflicting it on everyone around you. Your inability to tolerate slowness or delay becomes crisis for everyone near you. You've damaged relationships, reputations, possibly property. This isn't impatience - this is serious anger problem requiring intervention.",
    at_best="You've hit rock bottom enough times to recognize this is problem. You've lost important relationships to your rage. You're in therapy, possibly court-mandated anger management. You're on medication for anxiety that manifests as impatience. You're learning your 'impatience' is trauma response or neurological issue. You're building coping strategies. You still struggle but you're aware of damage you cause. You're trying. That's something.",
    growth_path="This isn't about developing patience - this is anger management crisis. Get professional help immediately. Your impatience is hurting people, possibly legally actionable. Get evaluated: anxiety disorders, ADHD, trauma, anger issues - something is driving this. Medication might be necessary. Therapy is mandatory. Build crisis plan for when you feel rage building. Warn people: 'I have anger problem, I'm working on it.' Learn that your urgency is trauma response, not reality. Most things can wait. Learn to tolerate discomfort without exploding. This is possible but requires serious intervention."
)
