"""
AETHER - Emotional Stability / Honesty-Humility

The dimension measuring emotional resilience, low neuroticism, and integrity.
Maps to Big Five Emotional Stability (reversed Neuroticism).
"""

from .base import DimensionTemplate


AETHER_VERY_HIGH = DimensionTemplate(
    title="The Unshakeable",
    core_nature="You're the person everyone calls in a crisis because panic isn't in your vocabulary. While others spiral, you're already solving the problem. Your emotional thermostat is set to 'steady' and rarely moves, even when it probably should.",
    description="Stress slides off you like water off a duck. You don't lose sleep over what-ifs. You don't catastrophize. When the plane hits turbulence, you're the one still reading your book while others white-knuckle the armrest. You're either remarkably emotionally intelligent or you've mastered the art of emotional detachment - and honestly, sometimes it's hard to tell which.",
    inner_world="Inside, you think: 'Why is everyone so worked up about this?' You genuinely don't understand what others find stressful. Your baseline is calm. You process emotions intellectually, not viscerally. You can acknowledge stress exists without actually feeling stressed. It's not that you don't care - you just don't panic.",
    motivations=[
        "To maintain inner peace regardless of circumstances",
        "To be the steady presence others can count on",
        "To prove that most problems aren't as serious as people think",
        "To avoid being swept up in others' emotional chaos",
        "To solve problems, not feel them"
    ],
    fears=[
        "Losing control of your emotions",
        "Being overwhelmed by circumstances",
        "Becoming 'one of those dramatic people'",
        "Having your calm mistaken for not caring",
        "Being manipulated through emotional tactics"
    ],
    strengths=[
        "Exceptional crisis management",
        "Can think clearly under pressure",
        "Don't make impulsive emotional decisions",
        "Stabilizing presence in chaos",
        "Recover quickly from setbacks"
    ],
    shadows=[
        "Can appear cold or detached",
        "Might underestimate others' legitimate emotional needs",
        "May suppress emotions that actually need processing",
        "Could seem unsympathetic during others' crises",
        "Might not recognize your own stress until physical symptoms appear"
    ],
    in_relationships="Your partner appreciates your steadiness - until they need you to freak out with them and you... don't. When they're spiraling about the future, you're problem-solving. They want empathy; you give solutions. You think you're being helpful. They think you don't care. You've said 'it's going to be fine' seventeen times this month and meant it every time. They've stopped telling you about their problems because your calm feels like dismissal. Learn this: Sometimes people need you to validate their panic before you fix it.",
    at_work="You're the one they want in the crisis meeting. While others are scrambling, you're already mapping solutions. You don't send panic emails at 2am. You don't cry in bathrooms. You meet deadlines because stress doesn't paralyze you. Your boss loves this. Your coworkers think you're either superhuman or a robot. You've been told 'I don't know how you stay so calm' more times than you can count. Danger: You might take on too much because you genuinely don't feel overwhelmed until you collapse.",
    under_stress="You don't 'get stressed' the way others do - until suddenly you do, and it manifests as physical symptoms: headaches, exhaustion, illness. You ignore warning signs because you don't recognize them as stress. Your body will force you to stop long before your mind admits you need rest. When you finally crash, everyone is shocked because you gave no warning. You need to learn that being calm doesn't mean being invincible.",
    at_best="You're a lighthouse in the storm - steady, reliable, guiding. You make others feel safe. Your calm isn't detachment; it's strength. You validate emotions while maintaining perspective. You've learned that empathy and solutions aren't mutually exclusive. People don't just respect you - they genuinely trust you.",
    growth_path="Learn that emotions are data, not threats. Your calm is a gift, but emotional connection requires vulnerability. Practice sitting with others' anxiety without immediately fixing it. Let yourself feel stressed sometimes - it makes you human. Your partner doesn't need you to solve everything; sometimes they need you to freak out with them for five minutes. Balance your stability with genuine emotional presence."
)

AETHER_HIGH = DimensionTemplate(
    title="The Steady Rock",
    core_nature="You're the calm in most storms, but not all of them. You handle stress better than most people, bounce back quicker, and don't catastrophize easily. You're emotionally stable without being emotionally unavailable.",
    description="When problems arise, you're usually the level-headed one. You don't panic easily, but you're not immune to stress either. You just process it differently - you feel it, acknowledge it, then move forward. You're the friend people call for advice because you won't spiral with them, but you also won't dismiss their concerns.",
    inner_world="You think: 'This is manageable.' You feel stress, but it doesn't consume you. You can sit with discomfort without drowning in it. You process emotions at a healthy pace - not suppressing them, not wallowing in them. You have bad days, but they're days, not weeks.",
    motivations=[
        "To maintain emotional balance",
        "To be reliable for others",
        "To handle challenges with grace",
        "To model healthy stress management",
        "To stay grounded in chaos"
    ],
    fears=[
        "Becoming emotionally unstable",
        "Letting others down in crisis",
        "Losing your composure",
        "Being seen as weak",
        "Stress affecting your performance"
    ],
    strengths=[
        "Resilient under pressure",
        "Balanced emotional responses",
        "Can support others without being pulled down",
        "Recover from setbacks efficiently",
        "Maintain perspective in difficulty"
    ],
    shadows=[
        "Might minimize your own struggles",
        "Could appear less empathetic than you are",
        "May hold yourself to unrealistic 'keeping it together' standards",
        "Might not ask for help when you need it",
        "Could dismiss legitimate concerns as 'overreacting'"
    ],
    in_relationships="You're the partner who stays calm during arguments, which is helpful 80% of the time and frustrating 20% of the time. You can hear criticism without defensiveness. You don't hold grudges. When your partner is stressed, you listen, validate, then gently offer perspective. You've learned that sometimes people need you to just be present, not fix things. Your steadiness is comforting, not cold.",
    at_work="You meet deadlines without drama. You handle feedback without spiraling. When a project goes sideways, you adjust course calmly. You're the colleague people want on challenging projects because you won't panic-quit at 3am. You're professional under pressure. You've been described as 'dependable' more than once, and you earned it.",
    under_stress="You acknowledge it, deal with it, move on. You might vent to a friend, take a walk, or tackle the problem head-on. Stress doesn't immobilize you, but you also don't pretend it doesn't exist. You've learned your limits and (usually) respect them. When overwhelmed, you actually take a break instead of pushing through until you break.",
    at_best="You're the person people trust to stay steady. You validate emotions while maintaining perspective. You're calm without being cold, stable without being rigid. You handle your own stress while still having capacity to support others. You've found the balance between emotional awareness and emotional resilience.",
    growth_path="Keep refining your balance. Sometimes your calm can feel dismissive even when you don't mean it that way - check in on how you're coming across. Don't use your stability as a shield against vulnerability. Your strength is admirable, but letting people see your struggles makes you relatable, not weak."
)

AETHER_MODERATE = DimensionTemplate(
    title="The Emotional Weather System",
    core_nature="Some days you're a rock. Other days you're a sinking ship. Your emotional stability isn't a trait - it's a variable that depends on sleep, stress, coffee intake, and whether Mercury is in retrograde (okay, maybe not that last one, but it feels like it).",
    description="You handle stress well... until you don't. You're calm under pressure... except when you're not. People never quite know which version they're getting. Neither do you. Monday you're handling five crises with grace. Wednesday you're crying in your car over a parking spot. You're not unstable - you're just highly context-dependent.",
    inner_world="You think: 'Am I overreacting or is this genuinely stressful?' You genuinely can't tell sometimes. You compare yourself to others constantly - 'They're handling this fine, why am I struggling?' or 'Everyone else is panicking, why am I so calm?' You second-guess your emotional responses in both directions.",
    motivations=[
        "To achieve more consistent emotional balance",
        "To stop feeling like you're on a mood rollercoaster",
        "To understand what triggers your good days vs. bad days",
        "To be more reliably 'together'",
        "To feel less reactive to circumstances"
    ],
    fears=[
        "Being seen as emotionally unstable",
        "Not knowing which 'you' will show up tomorrow",
        "Overreacting and embarrassing yourself",
        "Under-reacting and seeming cold",
        "Never achieving consistent peace"
    ],
    strengths=[
        "Understand both high and low emotional states",
        "Can relate to both anxious and calm people",
        "Aware of your emotional variability (self-knowledge)",
        "Capable of resilience when you're in a good state",
        "Empathetic to others' emotional struggles"
    ],
    shadows=[
        "Inconsistent - people don't know which version they'll get",
        "Might use stress as an excuse when you're actually capable",
        "Could exhaust yourself trying to maintain perfect calm",
        "May confuse yourself with contradictory reactions",
        "Your emotional unpredictability affects how others trust you"
    ],
    in_relationships="Your partner has learned to check the weather report before asking difficult questions. Some days you handle conflict with maturity and grace. Other days they ask 'What's for dinner?' and you spiral into existential crisis. You've apologized for overreactions, then later wondered if you were actually right and just gaslit yourself. When you're good, you're great - present, balanced, supportive. When you're not, you're exhausting. Both of you know this. Neither knows how to fix it.",
    at_work="Your performance is excellent... when you're in a good headspace. You meet deadlines... unless stress breaks you first. You're professional... except that one time you definitely weren't. Your manager has seen you handle impossible pressure with grace AND seen you nearly quit over a scheduling conflict. You're capable but unpredictable. People hesitate to rely on you for high-stakes projects because they're not sure which version of you will show up.",
    under_stress="Flip a coin. Heads: You handle it like a champion, stay up all night, get it done, barely break a sweat. Tails: You catastrophize, spiral, convince yourself everything is falling apart, text your friend seventeen times, lose sleep, and maybe get it done but at what cost? You genuinely don't know which response you'll have until you're in it. Your stress response has a stress response.",
    at_best="You're working on understanding your triggers. You've noticed patterns: bad sleep = emotional chaos. Good routine = stability. You're learning to create conditions for your better self to show up. When you do, you're balanced, capable, and genuine. You're not trying to be perfectly calm anymore - just consistently functional.",
    growth_path="Track your patterns ruthlessly. What makes your good days good? Sleep? Exercise? Saying no? Replicate that. What triggers your spirals? Lack of control? Too many commitments? Avoid that. You can't control your baseline emotional stability, but you can control your environment. Stop comparing yourself to the naturally calm people - you're playing a different game. Build systems that support your better self. Consistency comes from structure, not willpower."
)

AETHER_LOW = DimensionTemplate(
    title="The Live Wire",
    core_nature="You feel everything at maximum volume. What others call 'a stressful day,' you experience as a five-alarm fire. Your emotional responses are big, immediate, and often exhausting - for you and everyone around you.",
    description="Small problems feel catastrophic. Criticism lands like a punch. Uncertainty spirals into worst-case scenarios before you've had your second cup of coffee. You're not being dramatic - this is genuinely how you experience the world. Everything is louder, sharper, more intense. You've been called 'too sensitive' so many times you've stopped counting.",
    inner_world="Your mind is a pinball machine and every thought is a ball ricocheting at high speed. You ruminate, catastrophize, replay conversations seventeen times looking for hidden meanings. Sleep is difficult because your brain won't shut off. You're exhausted by your own intensity but have no idea how to turn it down.",
    motivations=[
        "To feel less overwhelmed by existence",
        "To stop disappointing people with your emotional reactions",
        "To achieve even one day of inner peace",
        "To prove you're capable despite your anxiety",
        "To stop feeling like you're too much"
    ],
    fears=[
        "Being abandoned for being 'too much'",
        "Completely falling apart",
        "Never finding stability",
        "Your emotions destroying your opportunities",
        "Being seen as weak or broken"
    ],
    strengths=[
        "Deeply empathetic - you understand others' pain viscerally",
        "Highly attuned to emotional nuance",
        "Passionate and engaged with life",
        "Your intensity fuels creativity and connection",
        "You know your struggles - self-awareness is your strength"
    ],
    shadows=[
        "Emotional exhaustion is your baseline",
        "Others walk on eggshells around you",
        "You catastrophize minor setbacks",
        "Criticism devastates you disproportionately",
        "Your relationships suffer from your intensity"
    ],
    in_relationships="Your partner loves you but is tired. They've learned to preface every conversation with emotional calculation: 'Is this going to set them off?' You've cried over dishes in the sink. You've spiraled over a tone of voice. When they need support, they hesitate because your anxiety will amplify theirs. You don't mean to make everything about you - but your emotions are so loud they drown out everything else. You've apologized for overreacting more times than you can count. They say it's fine. You know it's not.",
    at_work="You second-guess every email seventeen times. Feedback feels like an attack. You've cried in the bathroom more than once. You miss deadlines because anxiety paralyzed you, then you beat yourself up about it, which creates more anxiety. You're capable - but your emotions sabotage you. Colleagues like you but won't put you on high-pressure projects. Your potential is obvious. So is your liability.",
    under_stress="You spiral. Hard. One setback becomes 'everything is falling apart.' You can't sleep. You can't eat. You text your support system at 2am. You catastrophize until you're convinced disaster is imminent. When it doesn't happen, you don't feel relief - you feel stupid for overreacting. Then you're anxious about being anxious. It's exhausting. You know this. You can't stop it.",
    at_best="You're learning your triggers. You've found coping tools that actually help. You're working with a therapist or using medication or both, and you're not ashamed anymore. You've stopped apologizing for feeling things deeply and started building a life that accommodates your emotional intensity. You're still sensitive, but you've learned to channel it into art, connection, advocacy. Your emotions are no longer your enemy - they're just loud passengers you've learned to coexist with.",
    growth_path="Your emotional intensity isn't a character flaw - it's a nervous system configuration. Stop trying to be calm like naturally calm people. That's not your path. Find tools: therapy, medication, meditation, exercise, routine, boundaries. All of it. Build a support system that understands you're not broken, just wired differently. Learn to differentiate between 'real threat' and 'anxious brain lying to me.' Most importantly: Stop judging yourself for not being someone else."
)

AETHER_VERY_LOW = DimensionTemplate(
    title="The Emotional Supernova",
    core_nature="You don't just feel emotions - you are consumed by them. Your baseline is overwhelm. Calm is a myth you've heard about but never experienced. Every day is a battle with your own nervous system, and you're losing.",
    description="You wake up anxious. You go to bed anxious. In between, you cycle through panic, dread, spiraling thoughts, and brief moments of exhaustion-induced numbness. You've been told you're 'too much' so many times you've started believing it. Managing your emotions takes more energy than most people spend on their entire day. You're not weak - you're just carrying a weight no one else can see.",
    inner_world="Chaos. Pure chaos. Your thoughts race, catastrophize, loop endlessly. You can't remember the last time your mind was quiet. You're exhausted by yourself. You know you're overreacting, but knowing doesn't stop it. You feel everything everyone else feels plus your own emotions plus anxiety about having emotions. It's like living with the volume on life turned up to eleven and you can't find the dial.",
    motivations=[
        "To survive each day without falling apart",
        "To convince others you're functional",
        "To find even momentary relief from the internal storm",
        "To stop feeling like a burden",
        "To understand what 'normal' feels like"
    ],
    fears=[
        "Complete emotional breakdown",
        "Being institutionalized or seen as crazy",
        "Losing everyone because you're too exhausting",
        "Never experiencing peace",
        "Your emotions destroying your life"
    ],
    strengths=[
        "Profound empathy born from suffering",
        "Resilience - you're still here despite everything",
        "Deep appreciation for moments of calm when they come",
        "Understanding of mental health struggles",
        "Capacity for intense connection with others who understand"
    ],
    shadows=[
        "Relationships are nearly impossible to maintain",
        "Your emotional state dictates your entire life",
        "Simple tasks become overwhelming",
        "Others give up on you because it's too hard",
        "You've hurt people unintentionally through your intensity"
    ],
    in_relationships="If you're in a relationship, your partner is a saint or an enabler or both. They've talked you down from the ledge dozens of times. They've learned your panic patterns. They love you but they're drowning too. You've driven away good people because caring about you is exhausting. You don't mean to be a black hole of emotional need, but that's how it feels - to you and to them. You've broken up with people to spare them. They've broken up with you because they couldn't take it anymore. Both hurt equally.",
    at_work="You've called in sick because anxiety wouldn't let you leave the house. You've quit jobs because the stress was unbearable - then realized every job will feel this way. You're underemployed because high-responsibility roles break you. Your colleagues don't trust you with important projects. You've had panic attacks at your desk. You're smart, capable, and completely sabotaged by your nervous system.",
    under_stress="You don't have stress responses anymore - you have stress as a permanent state with varying degrees of intensity. A bad day means you can't function. You've lost jobs, relationships, opportunities because your emotions hijacked everything. You've considered checking yourself into a hospital. You've Googled 'how to make emotions stop' at 4am. You're not okay, and pretending you are takes everything you have.",
    at_best="You're getting professional help - intensive therapy, medication, possibly both - and you're starting to see that this isn't normal and you don't have to live this way forever. You've stopped believing you're broken and started understanding you have a treatable condition. You have bad days, but you also have days that don't feel like drowning. You're building a life around your limitations instead of fighting them. You're surviving, and that's enough.",
    growth_path="This isn't about 'growth' - this is about survival and treatment. You need professional intervention, not self-help. Medication might save your life. Therapy is non-negotiable. Build a crisis plan. Find your people - others who understand this level of struggle. Stop comparing yourself to functional people; they're playing a different game with different rules. Your goal isn't to be calm - it's to be functional. Accept help. Accept accommodations. Accept that this is a disability, not a personality flaw. You're not too much - you're suffering, and suffering deserves compassion, especially from yourself."
)
