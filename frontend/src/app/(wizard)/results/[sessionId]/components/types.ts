/**
 * Type definitions for assessment results
 */

export interface AssessmentResults {
  session_id: string;
  scores: Record<string, number>;
  narrative: {
    profile_pattern?: {
      pattern: string;
      description: string;
    };
    sections: {
      core_identity?: string;
      motivations?: string;
      conflicts?: string;
      strengths?: string;
      growth_areas?: string;
      relationships?: string;
      work_style?: string;
      // Old format fallback
      archetype?: {
        name: string;
        description: string;
      };
    };
    archetype?: {
      name: string;
      essence: string;
      description: string;
      core_traits: string[];
      strengths: string[];
      challenges: string[];
      life_purpose: string;
      relationships: string;
      career_paths: string[];
      famous_examples: string[];
      growth_direction: string;
    };
  };
  metadata: {
    timestamp: string;
    total_items: number;
    model_used?: string;
    generation_cost?: number;
  };
}

export const DIMENSION_NAMES: Record<string, string> = {
  LUMEN: "Social Radiance",
  AETHER: "Emotional Stability",
  ORPHEUS: "Empathy",
  ORIN: "Discipline",
  LYRA: "Intellectual Curiosity",
  VARA: "Moral Integrity",
  CHRONOS: "Patience",
  KAEL: "Boldness",
};

export const DIMENSION_DETAILS: Record<
  string,
  {
    name: string;
    highMeaning: string;
    lowMeaning: string;
    description: string;
  }
> = {
  LUMEN: {
    name: "Social Radiance",
    highMeaning: "Charismatic • Outgoing • Socially Confident",
    lowMeaning: "Reserved • Private • Independent",
    description:
      "Your magnetic pull in social spaces - how naturally you light up a room, command attention, and energize those around you.",
  },
  AETHER: {
    name: "Emotional Stability",
    highMeaning: "Calm • Resilient • Emotionally Steady",
    lowMeaning: "Intense • Reactive • Deeply Feeling",
    description:
      "Your emotional weather pattern - whether you're a steady climate or a storm system, both have their power.",
  },
  ORPHEUS: {
    name: "Empathy",
    highMeaning: "Deeply Empathetic • Emotionally Attuned • Compassionate",
    lowMeaning: "Logical • Objective • Emotionally Detached",
    description:
      "How deeply you feel others' emotions - whether you're an emotional sponge or a rational observer.",
  },
  ORIN: {
    name: "Discipline",
    highMeaning: "Organized • Systematic • Goal-Oriented",
    lowMeaning: "Spontaneous • Flexible • Improvising",
    description:
      "Your relationship with structure - whether you build scaffolding or dance in the chaos.",
  },
  LYRA: {
    name: "Intellectual Curiosity",
    highMeaning: "Curious • Abstract • Idea-Driven",
    lowMeaning: "Practical • Concrete • Action-Oriented",
    description:
      "How your mind explores the world - through concepts and theories, or through doing and experiencing.",
  },
  VARA: {
    name: "Moral Integrity",
    highMeaning: "Principled • Honest • Ethically Driven",
    lowMeaning: "Pragmatic • Flexible • Situation-Dependent",
    description:
      "Your ethical operating system - whether you follow an internal moral code or adapt to the situation.",
  },
  CHRONOS: {
    name: "Patience",
    highMeaning: "Patient • Tolerant • Even-Tempered",
    lowMeaning: "Impatient • Quick • Action-Biased",
    description:
      "Your relationship with time and frustration - whether you're a slow river or a flash flood.",
  },
  KAEL: {
    name: "Boldness",
    highMeaning: "Assertive • Confident • Risk-Taking",
    lowMeaning: "Cautious • Measured • Risk-Averse",
    description:
      "How you approach uncertainty and conflict - whether you charge forward or calculate carefully.",
  },
};
