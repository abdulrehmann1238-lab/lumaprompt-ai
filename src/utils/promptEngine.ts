import {
  AIDestination,
  GeneratedPrompt,
  PromptBreakdown,
  PromptFramework,
  PromptObjective,
  UserProfile,
} from '../types';
import { EXPERT_PROMPT_LIBRARY } from '../data/prompts';

export function matchExpertFramework(
  roughRequest: string,
  objective: PromptObjective,
  explicitFrameworkId?: string
): PromptFramework {
  if (explicitFrameworkId) {
    const found = EXPERT_PROMPT_LIBRARY.find((f) => f.id === explicitFrameworkId);
    if (found) return found;
  }

  const q = roughRequest.toLowerCase();

  if (q.includes('linkedin') && q.includes('launch')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-coaching-launch') || EXPERT_PROMPT_LIBRARY[3];
  }
  if (q.includes('linkedin')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-linkedin-strategy') || EXPERT_PROMPT_LIBRARY[3];
  }
  if (q.includes('instagram') || q.includes('carousel') || q.includes('reel')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-instagram-calendar') || EXPERT_PROMPT_LIBRARY[4];
  }
  if (q.includes('onboard') || q.includes('welcome')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-client-onboarding') || EXPERT_PROMPT_LIBRARY[5];
  }
  if (q.includes('pric') || q.includes('tier') || q.includes('package')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-strategic-pricing') || EXPERT_PROMPT_LIBRARY[6];
  }
  if (q.includes('boundary') || q.includes('scope') || q.includes('late')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-boundary-script') || EXPERT_PROMPT_LIBRARY[10];
  }
  if (q.includes('proposal') || q.includes('outreach') || q.includes('follow up') || q.includes('follow-up')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-networking-outreach') || EXPERT_PROMPT_LIBRARY[7];
  }
  if (q.includes('sales page') || q.includes('landing page')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-sales-page') || EXPERT_PROMPT_LIBRARY[8];
  }
  if (q.includes('email') || q.includes('newsletter')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-email-campaign') || EXPERT_PROMPT_LIBRARY[13];
  }
  if (q.includes('lead') || q.includes('freebie') || q.includes('magnet')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-lead-gen') || EXPERT_PROMPT_LIBRARY[12];
  }
  if (q.includes('bio') || q.includes('about') || q.includes('positioning')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-personal-brand') || EXPERT_PROMPT_LIBRARY[11];
  }
  if (q.includes('launch') || q.includes('program') || q.includes('cohort')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-product-launch') || EXPERT_PROMPT_LIBRARY[1];
  }
  if (q.includes('voice') || q.includes('tone')) {
    return EXPERT_PROMPT_LIBRARY.find((f) => f.id === 'fw-brand-voice') || EXPERT_PROMPT_LIBRARY[0];
  }

  const byObjective = EXPERT_PROMPT_LIBRARY.find((f) => f.objective === objective);
  return byObjective || EXPERT_PROMPT_LIBRARY[3];
}

const VARIATION_ANGLES = [
  {
    label: 'Signature Editorial Authority',
    rolePrefix: 'You are a senior brand strategist and LinkedIn content specialist',
    hookDirection: 'Strong opening hook grounded in a quiet, unmistakable industry truth.',
    structureNote: 'Concise rhythmic paragraphs with generous whitespace and zero filler.',
    ctaDirection: 'Appropriate, low-friction CTA inviting meaningful replies or direct messages.',
  },
  {
    label: 'Story-Led Founder Perspective',
    rolePrefix: 'You are an executive ghostwriter and narrative brand strategist',
    hookDirection: 'Strong opening hook starting with a behind-the-scenes founder realization or client moment.',
    structureNote: 'Narrative arc moving from lived observation to a clear shift in perspective.',
    ctaDirection: 'Warm conversational closing question that sparks peer-to-peer dialogue.',
  },
  {
    label: 'Direct Conversion & Clarity',
    rolePrefix: 'You are a conversion strategist and positioning advisor for boutique women-led brands',
    hookDirection: 'Strong opening hook contrasting the cost of staying stuck with the calm of a clear system.',
    structureNote: 'Crisp, scannable breakdown highlighting tangible client outcomes and transformation.',
    ctaDirection: 'Direct, poised invitation for ready-to-invest clients to inquire today.',
  },
];

export function buildPersonalizedPrompt(params: {
  roughRequest: string;
  profile: UserProfile;
  objective: PromptObjective;
  destination: AIDestination;
  frameworkId?: string;
  variationIndex?: number;
}): GeneratedPrompt {
  const {
    roughRequest,
    profile,
    objective,
    destination,
    frameworkId,
    variationIndex = 0,
  } = params;

  const cleanRequest = roughRequest.trim() || 'Write a LinkedIn post about my launch, keep it short.';
  const framework = matchExpertFramework(cleanRequest, objective, frameworkId);
  const angle = VARIATION_ANGLES[variationIndex % VARIATION_ANGLES.length];

  const isLinkedIn = cleanRequest.toLowerCase().includes('linkedin');
  const isInstagram = cleanRequest.toLowerCase().includes('instagram') || cleanRequest.toLowerCase().includes('carousel');
  const isEmail = cleanRequest.toLowerCase().includes('email') || cleanRequest.toLowerCase().includes('newsletter');

  const roleText = isLinkedIn
    ? `${angle.rolePrefix} advising ${profile.name}, founder of ${profile.businessName} (${profile.industry}).`
    : `${framework.roleDefinition} You are writing specifically for ${profile.name} at ${profile.businessName} (${profile.industry}).`;

  const businessContextText = [
    `Business Name: ${profile.businessName} (${profile.industry} · ${profile.businessStage})`,
    `About the Business: ${profile.businessDescription}`,
    `Core Transformation Provided: ${profile.transformationProvided}`,
    profile.website ? `Website Reference: ${profile.website}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const audienceText = [
    `Primary Audience: ${profile.targetAudience} (Typical age range: ${profile.audienceAgeRange})`,
    `Core Challenges They Face: ${profile.customerChallenges}`,
  ].join('\n');

  const voiceAttributes = profile.brandVoice.length > 0 ? profile.brandVoice.join(', ') : 'Warm, Confident, Professional';
  const brandVoiceText = [
    `Selected Voice Attributes: ${voiceAttributes}`,
    profile.wordsToUse ? `Signature Words to Weave In Naturally: ${profile.wordsToUse}` : '',
    profile.wordsToAvoid ? `Words & Clichés to Strictly Avoid: ${profile.wordsToAvoid}` : '',
    profile.additionalInstructions ? `Editorial Direction: ${profile.additionalInstructions}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const destinationHint =
    destination === 'Claude'
      ? 'Optimized for Claude: Prioritize nuanced editorial cadence, natural transitions, and reflective depth.'
      : destination === 'ChatGPT'
      ? 'Optimized for ChatGPT: Follow structural constraints strictly and avoid formulaic summary sentences at the end.'
      : destination === 'Gemini'
      ? 'Optimized for Google Gemini: Keep formatting crisp and ground claims in concrete examples.'
      : destination === 'Perplexity'
      ? 'Optimized for Perplexity: Incorporate relevant market context and authoritative benchmarks where helpful.'
      : 'Optimized for universal AI assistant execution.';

  const outputFormatText = isLinkedIn
    ? `A polished LinkedIn post ready for publication (130–175 words), followed by 2 alternative opening hooks. (${angle.label} variation)`
    : isInstagram
    ? `A complete slide-by-slide Instagram sequence with headline hooks, visual direction, and a ready-to-post caption. (${angle.label} variation)`
    : isEmail
    ? `3 high-open-rate subject lines + a polished, personal email ready to send. (${angle.label} variation)`
    : `${framework.outputFormat} (${angle.label} variation)`;

  const requirements = [
    angle.hookDirection,
    `Clear value proposition anchored in how ${profile.businessName} helps ${profile.targetAudience.toLowerCase()}.`,
    `Human conversational language calibrated to a ${voiceAttributes.toLowerCase()} tone.`,
    `No generic marketing language, artificial urgency, or forbidden words (${profile.wordsToAvoid || 'hustle clichés'}).`,
    angle.structureNote,
    angle.ctaDirection,
  ];

  const constraints = [
    `Never use phrases like "In today's fast-paced world", "Game-changer", "Unlock your potential", or ${profile.wordsToAvoid || 'bro-marketing buzzwords'}.`,
    destinationHint,
  ];

  const successCriteria = [
    `Sounds unmistakably like ${profile.name} speaking directly to ${profile.targetAudience.toLowerCase()}.`,
    'Ready to publish or send with minimal editing required.',
    ...framework.successCriteria.slice(0, 1),
  ];

  const breakdown: PromptBreakdown = {
    role: roleText,
    businessContext: businessContextText,
    audience: audienceText,
    brandVoice: brandVoiceText,
    objective: `${cleanRequest} (Strategic focus: ${objective} · Framework: ${framework.title})`,
    requirements,
    constraints,
    outputFormat: outputFormatText,
    successCriteria,
  };

  const fullPrompt = `ROLE:
${breakdown.role}

BUSINESS CONTEXT:
${breakdown.businessContext}

TARGET AUDIENCE:
${breakdown.audience}

BRAND VOICE:
${breakdown.brandVoice}

OBJECTIVE:
${cleanRequest}
(Applied Luma Framework: ${framework.title} · Strategic Goal: ${objective})

CONTENT REQUIREMENTS:
- Strong opening hook: ${requirements[0]}
- Clear value proposition: ${requirements[1]}
- Human conversational language: ${requirements[2]}
- No generic marketing language: ${requirements[3]}
- Concise structure: ${requirements[4]}
- Appropriate CTA: ${requirements[5]}

CONSTRAINTS & DESTINATION TUNING:
- ${constraints[0]}
- ${constraints[1]}

OUTPUT FORMAT:
${breakdown.outputFormat}`;

  // Derive a clean short title
  const words = cleanRequest.replace(/[^\w\s]/g, '').split(/\s+/).slice(0, 5).join(' ');
  const derivedTitle =
    cleanRequest.toLowerCase().includes('linkedin') && cleanRequest.toLowerCase().includes('launch')
      ? 'LinkedIn Product Launch'
      : words.charAt(0).toUpperCase() + words.slice(1);

  return {
    id: `prompt-${Date.now()}`,
    title: derivedTitle,
    roughRequest: cleanRequest,
    objective,
    destination,
    frameworkId: framework.id,
    frameworkTitle: framework.title,
    fullPrompt,
    breakdown,
    createdAt: 'Just now',
    isSaved: false,
    variationIndex,
  };
}

