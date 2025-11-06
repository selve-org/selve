"""
KAEL - Assertiveness & Confidence

The dimension measuring assertiveness, confidence, and leadership drive.
LaHaye: Choleric = walks over people, Phlegmatic = reluctant leader.
"""

from .base import DimensionTemplate


"""
KAEL - Assertiveness & Confidence

The dimension measuring assertiveness, confidence, and leadership presence.
LaHaye: Choleric = dominates everything, Phlegmatic = reluctant leader.
"""

from .base import DimensionTemplate


KAEL_VERY_HIGH = DimensionTemplate(
    title="The Unstoppable Force",
    core_nature="You walk into rooms and take over. Not intentionally - it just happens. You're confident, assertive, naturally dominant. You speak up without hesitation. You take charge without asking. You assume leadership because why wouldn't you? You're either genuinely that capable or so confident no one questions you. Usually both. You're the person everyone looks to for direction because your certainty is magnetic - and occasionally terrifying.",
    description="You don't ask permission. You act. You decide. You lead. Confidence is your default state. Doubt is theoretical concept you understand intellectually but don't experience often. You speak with authority even when you're guessing. You assert your needs without apology. You challenge people who are wrong. You take up space unapologetically. You're impressive and intimidating in roughly equal measure.",
    inner_world="You think: 'Obviously I should handle this.' Your internal experience is fundamental belief in your own competence and right to leadership. You don't question whether you should speak up - you question why others don't. You're not arrogant (in your view) - you're just realistic about your abilities and confident in your judgment. Uncertainty is temporary state you resolve through action. Passivity is incomprehensible.",
    motivations=[
        "To lead and create impact",
        "To prove your competence",
        "To control outcomes through decisive action",
        "To be recognized as capable and strong",
        "To never be overlooked or dismissed"
    ],
    fears=[
        "Being seen as weak or incompetent",
        "Losing control or being controlled",
        "Your confidence being shaken publicly",
        "Being ignored or sidelined",
        "Discovering you're not as capable as you believe"
    ],
    strengths=[
        "Natural leadership ability",
        "Confident decision-maker",
        "Assert boundaries clearly",
        "Take initiative without prompting",
        "Inspire confidence in others through your certainty"
    ],
    shadows=[
        "You might steamroll people",
        "Your confidence can read as arrogance",
        "You dominate conversations and decisions",
        "Hard to collaborate with equals",
        "Your assertiveness becomes aggression"
    ],
    in_relationships="Your partner deals with your dominance constantly. You make plans without consulting. You assert your preferences strongly. You're confident in your opinions about their choices. You're decisive when they're uncertain - which is helpful until they want to decide for themselves. You don't mean to dominate but you naturally take charge. They either appreciate your leadership or feel controlled. Usually both. Do you leave space for them to lead or do you unconsciously assume you're better at everything?",
    at_work="You're in leadership or you're frustrated. You take charge in meetings. You volunteer for presentations. You challenge decisions you disagree with. You're confident speaking to executives. You negotiate assertively. You're excellent in leadership roles, sales, entrepreneurship, anywhere that values confidence and assertion. You're difficult as subordinate unless you deeply respect your manager. You're the person who gets promoted quickly or starts their own thing because you can't follow mediocre leadership.",
    under_stress="You become more aggressive. Your assertiveness turns into domination. You stop listening entirely. You push through resistance with force. Your confidence becomes rigid certainty that brooks no disagreement. You're less leader and more dictator. You alienate people who would otherwise follow you. Your stress manifests as increased control, not collaboration. You know this but you can't help it - when threatened, you dominate.",
    at_best="You've learned to use your confidence to empower others, not just direct them. You still lead naturally but you invite input genuinely. Your assertiveness includes space for others' voices. You recognize that confident leadership includes admitting uncertainty. You're still decisive but you're collaborative. People follow you because you're both strong and humble enough to listen. Your confidence inspires rather than intimidates.",
    growth_path="Your confidence is gift - don't weaponize it. Practice asking rather than telling. Make space for others to lead. Listen fully before asserting your view. Admit uncertainty when you feel it - vulnerability is strength, not weakness. Check: are you collaborating or controlling? Are people following you or just not arguing? True leadership means others grow stronger, not smaller. Your confidence should create more leaders, not more followers."
)

KAEL_HIGH = DimensionTemplate(
    title="The Natural Leader",
    core_nature="You're confident and assertive without being overwhelming. You speak up when you have something to say. You take charge when needed. You assert your boundaries and needs clearly. You're comfortable with leadership but you don't dominate. You're the person people naturally follow because you're capable and not terrifying about it.",
    description="You're confident in your abilities and willing to demonstrate them. You volunteer for challenges. You speak up in meetings. You handle confrontation without anxiety. You negotiate for yourself. You're assertive about your needs without being aggressive. You lead when appropriate and follow when it makes sense. You're balanced - confident enough to act, humble enough to learn.",
    inner_world="You think: 'I can handle this.' You have healthy confidence in your abilities. You're aware of your strengths and realistic about your limits. You don't need constant validation but you appreciate recognition. You're comfortable with responsibility. Leadership feels natural, not burdensome. You can assert yourself without internal conflict - you just don't need to assert dominance over everyone.",
    motivations=[
        "To contribute meaningfully",
        "To lead when you have something to offer",
        "To assert your needs and boundaries",
        "To be recognized for competence",
        "To create positive impact through confidence"
    ],
    fears=[
        "Being overlooked when you're capable",
        "Your confidence being seen as arrogance",
        "Not living up to others' confidence in you",
        "Being dominated by more aggressive people",
        "Losing confidence when challenged"
    ],
    strengths=[
        "Confident without being overwhelming",
        "Natural leadership ability",
        "Assert boundaries appropriately",
        "Comfortable with responsibility",
        "Balanced between confidence and humility"
    ],
    shadows=[
        "Might be too assertive sometimes",
        "Could dominate less confident people",
        "Your confidence might intimidate some",
        "May not recognize when to follow",
        "Your assertiveness might come across as pushy"
    ],
    in_relationships="Your partner appreciates your confidence. You make decisions when needed. You assert what you want. You handle conflicts directly. But you're also flexible - you don't need to control everything. You listen. You compromise. You let them lead sometimes. You're confident enough to be vulnerable. This balance makes you good partner for most people - strong enough to lean on, secure enough to lean back.",
    at_work="You're leadership material. You speak up with good ideas. You volunteer for challenges. You handle difficult conversations. You're comfortable presenting, negotiating, leading projects. You work well both as leader and team member because your confidence isn't dependent on position. You excel in roles valuing initiative and confidence: management, sales, consulting, project leadership. People trust your judgment and follow your lead.",
    under_stress="You might become more aggressive or more withdrawn depending on stress type. Under pressure, you might push harder - more assertive, less patient. OR you might doubt yourself and become uncharacteristically passive. Generally though, your confidence is resilient. You maintain assertion even under stress. You're reliable that way.",
    at_best="You lead when it serves the team and follow when someone else is better positioned. You're confident in what you know and comfortable admitting what you don't. Your assertiveness includes listening. Your confidence inspires others without intimidating them. You handle responsibility well and share credit. You're the kind of leader people want to work with, not just for. You've mastered confident humility.",
    growth_path="Keep refining balance between assertion and receptiveness. Notice when your confidence might be overshadowing quieter voices. Practice inviting others to lead. Your confidence is strength - use it to empower others. Check occasionally: are you listening as much as leading? Are you assertive or aggressive? Keep growing both your confidence and your humility. You're doing well."
)

KAEL_MODERATE = DimensionTemplate(
    title="The Situational Commander",
    core_nature="Your confidence and assertiveness are context-dependent. With topics you know well, you're assertive. With unfamiliar territory, you're hesitant. With trusted people, you're confident. With strangers or authority figures, you're cautious. You can lead but you don't seek it. You can assert yourself but it takes effort. You're neither naturally dominant nor naturally submissive. You're situationally both.",
    description="Some days you're confident leader. Other days you're hesitant follower. You speak up about things you're certain about. You stay quiet when you're not. You'll take charge in familiar situations. You'll defer in unfamiliar ones. Your assertiveness depends on context, energy, how much you've slept, whether you've prepared. People get different versions of you depending on circumstances. You're capable of confidence - you just don't always access it.",
    inner_world="You think: 'Should I say something?' You're capable of confidence but it requires conscious effort. You're aware you could speak up but you calculate whether it's worth it. You can lead but you question whether you should. Your internal experience is perpetual evaluation: 'Do I know enough? Will I sound stupid? Is this my place?' You're not naturally confident - you build confidence through preparation and context.",
    motivations=[
        "To be confident when it matters",
        "To speak up about things you're certain about",
        "To lead when you're clearly most qualified",
        "To avoid looking incompetent or arrogant",
        "To build confidence over time"
    ],
    fears=[
        "Speaking up and being wrong",
        "Not speaking up and missing opportunity",
        "Your uncertainty showing publicly",
        "Being seen as either weak or arrogant",
        "Never developing natural confidence"
    ],
    strengths=[
        "Thoughtful about when to assert",
        "Can lead when situation requires",
        "Don't dominate unnecessarily",
        "Flexible - can lead or follow",
        "Your confidence is usually well-founded"
    ],
    shadows=[
        "Inconsistent - confidence depends on mood",
        "Miss opportunities due to hesitation",
        "Your uncertainty might read as incompetence",
        "You're capable of more assertion than you show",
        "Context-dependent confidence is exhausting"
    ],
    in_relationships="Your partner has seen you be confident leader and hesitant follower. You make some decisions easily, agonize over others. You assert yourself about important things but let small things slide even when they bother you. You're confident in established relationship but were probably anxious early on. They want consistency. You want them to understand your confidence varies. Sometimes you wish you were more naturally assertive. Sometimes you're fine with your flexibility.",
    at_work="You're confident presenting topics you know well. You're hesitant with new material. You lead projects in your expertise area. You follow in unfamiliar territory. You speak up in meetings when you're certain. You stay quiet when you're not. Your manager has seen you be both confident and uncertain. You're capable but you don't always show it. You excel when you have time to prepare. You struggle with spontaneous assertion.",
    under_stress="Your confidence evaporates. You second-guess everything. You don't speak up even when you should. You defer to others even when you're more qualified. OR you overcompensate and become unusually aggressive in asserting yourself. Your stress manifests as either excessive hesitation or forced confidence. Neither feels authentic. You know you're more capable than you're showing but you can't access that capability under pressure.",
    at_best="You've made peace with context-dependent confidence. You're assertive when you're prepared and humble when you're not. You've stopped trying to be confident about everything. You focus your assertion on areas that matter. You're honest about uncertainty. You prepare for situations requiring confidence. People appreciate your thoughtful assertion - you speak up when you have something valuable to say, not just to hear yourself talk.",
    growth_path="Build confidence through competence. You're not naturally assertive - that's okay. Prepare thoroughly for situations requiring confidence. Practice small assertions to build momentum. Speak up once per meeting even if you're uncertain. Your confidence will grow with evidence of capability. And remember: uncertainty isn't weakness. 'I don't know but I'll find out' is assertive honesty. You don't need to dominate - you need to show up."
)

KAEL_LOW = DimensionTemplate(
    title="The Hesitant Follower",
    core_nature="You're not confident. Leadership terrifies you. Speaking up feels risky. Asserting yourself requires enormous effort. You default to following, deferring, staying quiet. You have good ideas you don't share. You have needs you don't express. You're capable but invisible because confidence is struggle you usually lose.",
    description="You don't volunteer for leadership. You don't speak up in meetings unless directly asked. You let others make decisions. You avoid confrontation. You struggle to assert your needs or boundaries. You're uncomfortable with attention. You'd rather be overlooked than risk looking stupid. You have opinions but you keep them internal. You're exhausting yourself by constantly holding back what you think and need.",
    inner_world="You think: 'Everyone else is more qualified.' Your internal narrative is constant self-doubt. You second-guess everything you might say before you say it. You assume others know better. You discount your own expertise. Your inner voice is harsh critic telling you you're not good enough, not ready, not qualified. You're capable of confidence but your internal world doesn't support it.",
    motivations=[
        "To avoid looking stupid or incompetent",
        "To not stand out or draw criticism",
        "To stay safe by not asserting",
        "To avoid conflict at all costs",
        "To find confidence someday"
    ],
    fears=[
        "Being exposed as incompetent",
        "Speaking up and being wrong publicly",
        "Conflict resulting from assertion",
        "Being seen as arrogant for expressing confidence",
        "Never developing confidence or courage"
    ],
    strengths=[
        "Good team player",
        "Don't dominate or create conflict",
        "Listen well because you're not performing",
        "Humble about limitations",
        "When you do speak, people listen because it's rare"
    ],
    shadows=[
        "You're invisible when you're capable",
        "Miss opportunities constantly",
        "Your talent goes unrecognized",
        "You enable others to dominate you",
        "Your lack of assertion hurts your career and relationships"
    ],
    in_relationships="Your partner makes most decisions. Not because they're controlling but because you won't weigh in. They ask your preference, you say 'whatever you want.' They want you to assert your needs. You don't. You agree to things you don't want. You don't express when something bothers you. You're conflict-avoidant to the point of self-erasure. Eventually they either become frustrated with your passivity or they take advantage of it. Either way, you're not showing up as equal partner.",
    at_work="You're overlooked for promotions. Your ideas get credited to louder colleagues. You do good work that no one notices because you don't advocate for yourself. You're passed over for projects because you don't volunteer. You have expertise you don't demonstrate. You're in meetings contributing nothing visible. You're reliable worker but invisible human. Your career is limited not by capability but by confidence. You know this. It kills you. You still can't change it.",
    under_stress="You disappear completely. You stop expressing anything. You become purely reactive - waiting to be told what to do. Your already-low confidence becomes complete self-doubt. You catastrophize any situation requiring assertion. Your lack of confidence under stress makes everything worse because you can't advocate for what you need. You're drowning and you can't even ask for help.",
    at_best="You've found niche where your skills matter more than your voice. You work with people who draw you out. You've built confidence in specific area and you can assert yourself there, if nowhere else. You've learned to speak up occasionally about things that really matter. You're still not confident but you're functional. You've accepted this is who you are and you're working around it rather than fighting it constantly.",
    growth_path="Start micro-asserting. Speak up once in meetings. Express a preference when asked. Say 'actually, I'd prefer X' one time. Build confidence through small wins. Get therapy - your lack of confidence is probably rooted in something deeper than circumstance. Practice self-advocacy as skill, not personality trait. Remember: being wrong occasionally is fine. Being invisible is slow death. You're more capable than you believe. Act like it, even when you don't feel it. Fake it til you make it is real strategy."
)

KAEL_VERY_LOW = DimensionTemplate(
    title="The Invisible Presence",
    core_nature="You don't exist in rooms you occupy. You're silent in meetings. You never volunteer for anything. You defer every decision. You can't assert a need or boundary to save your life. You're competent but invisible, capable but silent, present but erased. Your lack of confidence isn't just limitation - it's how you've learned to survive. Be small, be quiet, don't make waves. You've disappeared yourself so thoroughly you barely remember you could exist differently.",
    description="You don't speak unless spoken to. You don't express preferences. You don't make decisions. You let others control everything - your schedule, your choices, your life. You're the person everyone forgets was in the meeting. You have no presence. You take up no space. You're apologizing for existing. You're incapable of assertion even when it's desperately needed. You're not living - you're hiding.",
    inner_world="You think: 'I shouldn't be here.' Your internal narrative is constant self-erasure. You're convinced you're less capable, less important, less valuable than everyone around you. You don't question this - you know it. Your inner voice is vicious cycle of shame and self-doubt. You can't imagine asserting yourself because you fundamentally believe you have no right to space, voice, or needs. You've internalized invisibility as identity.",
    motivations=[
        "To avoid any attention or criticism",
        "To not be burden or problem",
        "To survive by being unnoticeable",
        "To avoid conflict at all costs",
        "To protect yourself through invisibility"
    ],
    fears=[
        "Being noticed and criticized",
        "Speaking up and confirming your incompetence",
        "Conflict of any kind",
        "Asserting yourself and being rejected",
        "Existing visibly at all"
    ],
    strengths=[
        "You don't create conflict",
        "You're extremely accommodating",
        "You can work independently without needing validation",
        "When you speak, it's usually well-considered",
        "You're not adding to drama or chaos"
    ],
    shadows=[
        "You don't exist in your own life",
        "You're completely overlooked professionally",
        "You enable others to use or abuse you",
        "Your talents and needs are completely invisible",
        "You're living half-life of constant self-erasure"
    ],
    in_relationships="If you're in relationship, it's probably unhealthy. Your partner makes every decision. You never express needs. You agree to things you hate. You can't set boundaries. You can't say no. You're either with someone who appreciates your compliance (red flag) or with someone frustrated by your inability to show up as person with needs and preferences. You're not partner - you're shadow. This isn't sustainable. You know it. You can't change it.",
    at_work="You're the person no one remembers works there. You do adequate work that goes unnoticed. You never get promoted because you never demonstrate capability publicly. You're in meetings contributing nothing visible. You have ideas you'll never share. You have expertise no one knows about. You're passed over constantly. You might be exploited - given extra work because you can't say no. Your career is non-existent because you are non-existent professionally.",
    under_stress="You shut down completely. You become even more invisible. You can't function independently at all. You need explicit instruction for everything because you can't assert any judgment or decision. You're paralyzed by any situation requiring confidence or assertion. Your complete lack of confidence becomes crisis - you can't advocate for yourself even in emergencies. You're trapped in your own invisibility.",
    at_best="You've recognized this is serious problem. You're in therapy, probably dealing with trauma, abuse, or severe anxiety that created this pattern. You're learning that you have right to exist, to have needs, to take space. You're practicing tiny assertions. You're on medication for crippling anxiety. You're slowly, painfully building belief that you matter. You're not confident yet but you're working on existing. That's something. Keep going.",
    growth_path="This isn't about building confidence - this is about recovering from something that destroyed it. Get professional help immediately. This level of self-erasure suggests trauma, abuse, severe anxiety disorder, or deep shame. You need therapy, possibly medication, definitely support system that helps you believe you're allowed to exist. Start with existing physically: take up space, speak once per day, express one preference per week. Build evidence you can survive being visible. You deserve to exist. You don't believe that yet. That's what you're working toward. You're worthy of space, voice, and needs. Practice believing it."
)
