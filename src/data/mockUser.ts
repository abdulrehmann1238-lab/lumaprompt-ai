import { UserProfile, GeneratedPrompt, UsageState, ExtensionSettings, UsageLogEntry } from '../types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Sarah Mitchell',
  email: 'sarah@bloomandco.studio',
  businessName: 'Bloom & Co.',
  website: 'https://www.bloomandco.studio',
  industry: 'Business Coaching',
  businessDescription:
    'A boutique brand and business coaching studio helping women entrepreneurs build profitable, recognizable businesses.',
  businessStage: 'Established & Scaling (2–5 years)',
  targetAudience: 'Women entrepreneurs and early-stage founders.',
  audienceAgeRange: '28–45',
  customerChallenges:
    'Feeling overwhelmed by inconsistent client flow, struggling to articulate their distinct brand value, and spending hours rewriting content that still sounds generic.',
  transformationProvided:
    'Transitioning from scattered marketing to a calm, high-converting brand presence that attracts aligned, high-ticket clients consistently.',
  brandVoice: ['Warm', 'Confident', 'Professional', 'Conversational'],
  wordsToUse: 'intentional, clarity, sustainable growth, signature presence, aligned, resonant, elevated',
  wordsToAvoid: 'hustle, grind, Boss Babe, synergetic, crushing it, 10x, disrupt, skyrocket',
  additionalInstructions:
    'Write with poised authority and warmth—like a trusted advisor over morning coffee. Use short, rhythmic paragraphs and avoid exclamation-point overuse.',
  goals: [
    'Grow brand visibility',
    'Generate qualified leads',
    'Create content',
    'Launch digital products',
  ],
  onboardingCompleted: true,
};

export const INITIAL_RECENT_PROMPTS: GeneratedPrompt[] = [
  {
    id: 'recent-1',
    title: 'LinkedIn Product Launch',
    roughRequest: 'Write a LinkedIn post about my launch, keep it short.',
    objective: 'Content Creation',
    destination: 'Claude',
    frameworkId: 'fw-coaching-launch',
    frameworkTitle: 'Coaching Program Launch',
    createdAt: 'Today, 9:42 AM',
    isSaved: true,
    breakdown: {
      role: 'You are a senior brand strategist and executive LinkedIn ghostwriter specializing in boutique women-led coaching and advisory businesses.',
      businessContext:
        'Business: Bloom & Co. (Business Coaching) — A boutique brand and business coaching studio helping women entrepreneurs build profitable, recognizable businesses.',
      audience:
        'Women entrepreneurs and early-stage founders (ages 28–45) who want sustainable client flow and a distinctive brand presence without burnout.',
      brandVoice:
        'Warm, Confident, Professional, Conversational. Use words like "intentional", "clarity", "signature presence". Avoid "hustle", "grind", "10x".',
      objective: 'Write a concise, high-impact LinkedIn post announcing the launch of our new signature coaching program.',
      requirements: [
        'Open with an editorial, resonant single-sentence hook addressing the quiet frustration of inconsistent positioning.',
        'Introduce the new program at Bloom & Co. as the structured bridge from scattered effort to calm, recognizable authority.',
        'Keep total length between 130 and 175 words with generous white space.',
        'Conclude with a low-friction, conversational call-to-action inviting thoughtful dialogue or DM inquiries.',
      ],
      constraints: [
        'Strictly avoid bro-marketing urgency tactics, countdown hype, or cliché AI transition phrases.',
        'Maximum of one subtle emoji if appropriate; zero hashtags in the body copy.',
      ],
      outputFormat: 'A publication-ready LinkedIn post with 1–2 alternative opening hooks at the bottom.',
      successCriteria: [
        'Sounds unmistakably like Sarah Mitchell speaking to a peer founder.',
        'Communicates the core transformation within the first 4 lines.',
      ],
    },
    fullPrompt: `ROLE:
You are a senior brand strategist and executive LinkedIn ghostwriter specializing in boutique women-led coaching and advisory businesses.

BUSINESS CONTEXT:
You are writing on behalf of Sarah Mitchell, founder of Bloom & Co. (Business Coaching).
About the business: A boutique brand and business coaching studio helping women entrepreneurs build profitable, recognizable businesses.
Core transformation provided: Transitioning from scattered marketing to a calm, high-converting brand presence that attracts aligned, high-ticket clients consistently.

TARGET AUDIENCE:
Women entrepreneurs and early-stage founders (ages 28–45).
Key challenges they face: Feeling overwhelmed by inconsistent client flow, struggling to articulate their distinct brand value, and spending hours rewriting content that still sounds generic.

BRAND VOICE & LEXICON:
- Tone attributes: Warm, Confident, Professional, Conversational.
- Preferred vocabulary: intentional, clarity, sustainable growth, signature presence, aligned, resonant, elevated.
- Prohibited language: hustle, grind, Boss Babe, synergetic, crushing it, 10x, disrupt, skyrocket.
- Editorial direction: Write with poised authority and warmth—like a trusted advisor over morning coffee. Use short, rhythmic paragraphs.

OBJECTIVE:
Transform this request into polished execution: "Write a LinkedIn post about my launch, keep it short."

CONTENT REQUIREMENTS:
1. Open with a resonant single-sentence hook that names the quiet frustration of outgrowing your current brand positioning.
2. Introduce the new Bloom & Co. program clearly, focusing on the shift from scattered effort to signature presence.
3. Keep the post concise (130–175 words) with clean line breaks for effortless mobile reading.
4. Close with an inviting, non-pushy call to action for founders ready for intentional growth this quarter.

OUTPUT FORMAT:
Provide the complete, publication-ready LinkedIn post followed by two alternative opening hooks.`,
  },
  {
    id: 'recent-2',
    title: 'Instagram Brand Story',
    roughRequest: 'Create a 5-slide Instagram carousel sharing why I started Bloom & Co.',
    objective: 'Marketing',
    destination: 'ChatGPT',
    frameworkId: 'fw-instagram-calendar',
    frameworkTitle: 'Instagram Content Calendar',
    createdAt: 'Yesterday, 4:15 PM',
    isSaved: true,
    breakdown: {
      role: 'You are a creative director and editorial social strategist for luxury and boutique service brands.',
      businessContext:
        'Bloom & Co. — A boutique brand and business coaching studio helping women entrepreneurs build profitable, recognizable businesses.',
      audience: 'Women entrepreneurs and early-stage founders seeking clarity and elevated positioning.',
      brandVoice: 'Warm, Confident, Professional, Conversational.',
      objective: 'Create a 5-slide Instagram carousel narrative sharing the founder origin story behind Bloom & Co.',
      requirements: [
        'Structure slide-by-slide copy (Slide 1 Cover through Slide 5 Call to Conversation).',
        'Keep each slide between 18 and 32 words for clean editorial typography.',
        'Include an accompanying caption with a reflective question.',
      ],
      constraints: ['No generic motivational quotes or loud sales pitches.'],
      outputFormat: 'Slide-by-slide copy table + caption + visual art direction notes.',
      successCriteria: ['Evokes emotional resonance and positions Bloom & Co. as an intentional partner.'],
    },
    fullPrompt: `ROLE:
You are a creative director and editorial social strategist for boutique women-led service brands.

BUSINESS CONTEXT:
Brand: Bloom & Co. | Founder: Sarah Mitchell (Business Coaching)
Description: A boutique brand and business coaching studio helping women entrepreneurs build profitable, recognizable businesses.

TARGET AUDIENCE:
Women entrepreneurs and early-stage founders who want sustainable growth without sacrificing their authentic voice.

BRAND VOICE:
Warm, Confident, Professional, Conversational. Avoid hustle clichés; lean into intentional clarity and editorial poise.

OBJECTIVE:
Create a 5-slide Instagram carousel sharing why I started Bloom & Co.

CONTENT REQUIREMENTS:
- Slide 1: Editorial headline hook that stops the scroll through quiet truth.
- Slide 2: The gap Sarah noticed in traditional loud business coaching.
- Slide 3: The philosophy behind Bloom & Co. (clarity + signature positioning).
- Slide 4: What changes when a founder builds around her true voice.
- Slide 5: Warm invitation to connect or explore working together.

OUTPUT FORMAT:
Slide-by-slide text breakdown, visual layout suggestion in warm ivory/editorial tones, and accompanying caption.`,
  },
  {
    id: 'recent-3',
    title: 'Client Outreach Email',
    roughRequest: 'Follow up warmly with a prospective coaching client after our discovery call.',
    objective: 'Sales',
    destination: 'Claude',
    frameworkId: 'fw-networking-outreach',
    frameworkTitle: 'Professional Networking Outreach',
    createdAt: 'Nov 10, 2:20 PM',
    isSaved: false,
    breakdown: {
      role: 'You are a relationship-first client director and high-ticket consultative sales advisor.',
      businessContext: 'Bloom & Co. — Boutique brand and business coaching studio led by Sarah Mitchell.',
      audience: 'Prospective founder who recently completed a discovery conversation.',
      brandVoice: 'Warm, Confident, Professional, Conversational.',
      objective: 'Write a personalized, zero-pressure follow-up email after a discovery call.',
      requirements: [
        'Reference key insights discussed during the call.',
        'Reiterate the custom roadmap toward her desired transformation.',
        'Provide clear next steps without artificial scarcity.',
      ],
      constraints: ['Keep under 160 words; avoid pushy sales follow-up templates.'],
      outputFormat: 'Subject line options + complete email body with placeholders for personal details.',
      successCriteria: ['Feels deeply personal, respectful, and effortless to reply to.'],
    },
    fullPrompt: `ROLE:
You are a relationship-first client director and consultative sales advisor for boutique coaching studios.

BUSINESS CONTEXT:
Sender: Sarah Mitchell, Founder of Bloom & Co. (Business Coaching).
Mission: Helping women entrepreneurs build profitable, recognizable businesses through intentional positioning.

TARGET AUDIENCE:
A woman entrepreneur / early-stage founder who just completed a discovery call and is considering private coaching.

BRAND VOICE:
Warm, Confident, Professional, Conversational. Poised, calm, and reassuring.

OBJECTIVE:
Follow up warmly with a prospective coaching client after our discovery call.

CONTENT REQUIREMENTS:
1. Express genuine appreciation for the conversation and highlight a specific moment of clarity from the call.
2. Summarize the core shift she is stepping into (from scattered marketing to a calm, recognizable brand presence).
3. Outline the simple next step to begin together, leaving space for any thoughtful questions.

OUTPUT FORMAT:
3 refined subject lines + complete email body (under 160 words).`,
  },
];

export const DEFAULT_USAGE_STATE: UsageState = {
  monthlyAllowance: 20,
  used: 7,
  plan: 'Free',
  resetDate: 'December 1, 2026',
  weeklyUsage: [
    { day: 'Mon', count: 1 },
    { day: 'Tue', count: 2 },
    { day: 'Wed', count: 0 },
    { day: 'Thu', count: 2 },
    { day: 'Fri', count: 1 },
    { day: 'Sat', count: 0 },
    { day: 'Sun', count: 1 },
  ],
  proWaitlistJoined: false,
  proWaitlistEmail: 'sarah@bloomandco.studio',
};

export const INITIAL_USAGE_LOG: UsageLogEntry[] = [
  {
    id: 'log-1',
    promptTitle: 'LinkedIn Product Launch',
    destination: 'Claude',
    frameworkUsed: 'Coaching Program Launch',
    timestamp: 'Today, 9:42 AM',
  },
  {
    id: 'log-2',
    promptTitle: 'Instagram Brand Story',
    destination: 'ChatGPT',
    frameworkUsed: 'Instagram Content Calendar',
    timestamp: 'Yesterday, 4:15 PM',
  },
  {
    id: 'log-3',
    promptTitle: 'Client Outreach Email',
    destination: 'Claude',
    frameworkUsed: 'Professional Networking Outreach',
    timestamp: 'Nov 10, 2:20 PM',
  },
  {
    id: 'log-4',
    promptTitle: 'Q1 Signature Offer Pricing Review',
    destination: 'Claude',
    frameworkUsed: 'Strategic Pricing Framework',
    timestamp: 'Nov 8, 11:05 AM',
  },
  {
    id: 'log-5',
    promptTitle: 'Welcome Packet for Private Clients',
    destination: 'ChatGPT',
    frameworkUsed: 'Client Onboarding Experience',
    timestamp: 'Nov 6, 3:48 PM',
  },
  {
    id: 'log-6',
    promptTitle: 'Founder Bio Refresh for Podcast Pitch',
    destination: 'Gemini',
    frameworkUsed: 'Personal Brand Positioning',
    timestamp: 'Nov 4, 10:15 AM',
  },
  {
    id: 'log-7',
    promptTitle: 'Newsletter Welcome Sequence',
    destination: 'Claude',
    frameworkUsed: 'Email Marketing Campaign',
    timestamp: 'Nov 2, 1:30 PM',
  },
];

export const DEFAULT_EXTENSION_SETTINGS: ExtensionSettings = {
  enabled: true,
  defaultDestination: 'Claude',
  autoApplyProfile: true,
  showEnhancementPreview: true,
  preferredBrandVoice: 'Warm & Confident (Profile Default)',
  keyboardShortcut: 'Cmd + Shift + L',
};

