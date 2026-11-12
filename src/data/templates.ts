import { UserProfile } from '../types';

export interface LandingScenario {
  id: 'linkedin' | 'instagram' | 'proposal';
  label: string;
  tag: string;
  roughRequest: string;
  frameworkName: string;
  destination: string;
  structured: {
    expertRole: string;
    businessContext: string;
    audience: string;
    brandVoice: string;
    objective: string;
    contentRequirements: string[];
    outputFormat: string;
    successCriteria: string;
  };
  fullText: string;
}

export const LANDING_SCENARIOS: LandingScenario[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn product launch',
    tag: 'Thought Leadership & Launch',
    roughRequest: 'Write a LinkedIn post about my launch, keep it short.',
    frameworkName: 'Coaching Program Launch · Expert Framework #15',
    destination: 'Claude / ChatGPT',
    structured: {
      expertRole:
        'Senior brand strategist and executive LinkedIn ghostwriter for boutique women-led coaching studios.',
      businessContext:
        'Bloom & Co. (Business Coaching) — Helping women entrepreneurs build profitable, recognizable businesses through signature positioning.',
      audience:
        'Women entrepreneurs and early-stage founders (28–45) tired of scattered marketing and inconsistent client flow.',
      brandVoice:
        'Warm, Confident, Professional, Conversational. Use "intentional", "clarity", "signature presence". Never use "hustle", "grind", or "10x".',
      objective:
        'Announce the opening of our new coaching cohort with quiet confidence and clear transformation.',
      contentRequirements: [
        'Single-sentence editorial hook naming the shift from loud marketing to resonant authority.',
        'Concise 140–170 word body with generous line spacing for effortless mobile reading.',
        'Warm, low-friction invitation to start a conversation in the comments or DMs.',
      ],
      outputFormat: 'Publication-ready LinkedIn post + 2 alternative opening hooks.',
      successCriteria:
        'Sounds unmistakably like Sarah Mitchell speaking to a peer founder—zero AI clichés.',
    },
    fullText: `ROLE:
You are a senior brand strategist and executive LinkedIn ghostwriter for boutique women-led coaching studios.

BUSINESS CONTEXT:
Founder: Sarah Mitchell | Studio: Bloom & Co. (Business Coaching)
Positioning: A boutique brand and business coaching studio helping women entrepreneurs build profitable, recognizable businesses.

TARGET AUDIENCE:
Women entrepreneurs and early-stage founders (ages 28–45) who want sustainable client flow and a distinctive brand presence without burnout.

BRAND VOICE & GUARDRAILS:
Warm, Confident, Professional, Conversational.
Preferred vocabulary: intentional, clarity, sustainable growth, signature presence, aligned.
Forbidden words: hustle, grind, Boss Babe, crushing it, 10x, skyrocket.

OBJECTIVE:
Transform "Write a LinkedIn post about my launch, keep it short" into a poised, high-converting announcement.

CONTENT REQUIREMENTS:
- Open with an editorial single-sentence hook addressing the quiet frustration of outgrowing your current brand positioning.
- Introduce the new Bloom & Co. cohort as the structured bridge to calm, recognizable authority.
- Keep length between 140 and 170 words with clean paragraph pacing.
- Close with a warm, peer-level invitation to inquire.

OUTPUT FORMAT:
Complete LinkedIn post + 2 alternative opening hooks.

SUCCESS CRITERIA:
Reads with calm editorial authority and communicates the core transformation in the first 4 lines.`,
  },
  {
    id: 'instagram',
    label: 'Instagram campaign',
    tag: 'Visual Storytelling & Conversion',
    roughRequest: 'Create an Instagram carousel about why brand clarity matters more than posting every day.',
    frameworkName: 'Instagram Content Calendar · Expert Framework #05',
    destination: 'Claude / ChatGPT',
    structured: {
      expertRole:
        'Luxury social creative director and narrative strategist for modern women-led service brands.',
      businessContext:
        'Bloom & Co. — Boutique brand and business coaching studio guiding women founders toward recognizable positioning.',
      audience:
        'Women entrepreneurs feeling exhausted by daily content treadmills that fail to convert into high-ticket clients.',
      brandVoice:
        'Warm, Confident, Professional, Conversational. Poised editorial cadence with calm authority.',
      objective:
        'Create a save-worthy 6-slide educational carousel shifting followers from volume-obsessed posting to intentional brand clarity.',
      contentRequirements: [
        'Slide-by-slide headline and subtext (18–28 words per slide) optimized for editorial typography.',
        'Contrasts "The Content Treadmill" against "The Signature Brand Ecosystem".',
        'Includes an intimate founder caption ending with a DM keyword invitation.',
      ],
      outputFormat: '6-Slide Copy Breakdown + Visual Direction Notes + Full Caption.',
      successCriteria:
        'Designed to earn high saves and spark qualified DM conversations from ideal founders.',
    },
    fullText: `ROLE:
You are a luxury social creative director and narrative strategist for modern women-led service brands.

BUSINESS CONTEXT:
Brand: Bloom & Co. | Founder: Sarah Mitchell (Business Coaching)
Mission: Helping women entrepreneurs build profitable, recognizable businesses without content burnout.

TARGET AUDIENCE:
Women entrepreneurs and early-stage founders exhausted by posting daily without seeing consistent client inquiries.

BRAND VOICE:
Warm, Confident, Professional, Conversational. Calm editorial pacing; zero algorithm panic or hustle clichés.

OBJECTIVE:
Create a 6-slide Instagram carousel showing why brand clarity matters more than daily posting volume.

CONTENT REQUIREMENTS:
1. Slide 1 (Cover): Editorial thesis hook that stops the scroll through quiet recognition.
2. Slides 2–4: The core reframe—why 3 resonant posts rooted in positioning outperform 30 generic reels.
3. Slide 5: The Bloom & Co. 3-part clarity standard.
4. Slide 6: Warm invitation to reply or DM for our private positioning audit.

OUTPUT FORMAT:
Slide-by-slide copy matrix (Slides 1–6) + minimalist art direction notes + 120-word caption.

SUCCESS CRITERIA:
High save-ability, effortless readability, and authentic alignment with Sarah’s voice.`,
  },
  {
    id: 'proposal',
    label: 'Client proposal email',
    tag: 'Consultative High-Ticket Sales',
    roughRequest: 'Send a follow-up email with my coaching proposal after our discovery call.',
    frameworkName: 'Professional Networking Outreach · Expert Framework #08',
    destination: 'Claude / Gemini',
    structured: {
      expertRole:
        'Relationship-first client director and consultative sales advisor for boutique advisory practices.',
      businessContext:
        'Bloom & Co. — Private 1:1 brand and business coaching studio led by Sarah Mitchell.',
      audience:
        'A promising woman founder who just completed a 30-minute discovery call and requested proposal details.',
      brandVoice:
        'Warm, Confident, Professional, Conversational. Reassuring, clear, and unhurried.',
      objective:
        'Deliver the custom coaching proposal summary via email in a way that reinforces clarity, trust, and momentum.',
      contentRequirements: [
        'Warmly reference the specific vision and bottlenecks she shared during the conversation.',
        'Summarize the 3 core outcomes you will build together over the next 90 days.',
        'Outline the investment and effortless onboarding steps without artificial pressure.',
      ],
      outputFormat: '3 Refined Subject Lines + Complete Proposal Email (under 165 words).',
      successCriteria:
        'Makes the prospective client feel deeply understood and confident in saying yes.',
    },
    fullText: `ROLE:
You are a relationship-first client director and consultative sales advisor for boutique advisory practices.

BUSINESS CONTEXT:
Sender: Sarah Mitchell, Founder of Bloom & Co. (Business Coaching)
Focus: Helping women entrepreneurs transition from scattered marketing to a calm, high-converting brand presence.

TARGET AUDIENCE:
A prospective founder client who just completed a discovery call and is reviewing her private coaching proposal.

BRAND VOICE:
Warm, Confident, Professional, Conversational. Like a trusted advisor—poised, clear, and zero high-pressure sales tactics.

OBJECTIVE:
Write a personalized follow-up email accompanying her custom coaching proposal.

CONTENT REQUIREMENTS:
1. Open with genuine warmth, reflecting back the most important breakthrough from your conversation.
2. Summarize the 3 pillars of her custom 90-day roadmap at Bloom & Co.
3. Present the proposal link and onboarding timeline clearly, inviting any questions with grace.

OUTPUT FORMAT:
3 natural subject lines + complete email body (140–165 words).

SUCCESS CRITERIA:
Eliminates decision friction while honoring the client’s autonomy and excitement.`,
  },
];

export interface RecommendedPromptItem {
  id: string;
  title: string;
  category: string;
  reason: string;
  roughRequest: string;
  objective: 'Content Creation' | 'Marketing' | 'Sales' | 'Business Strategy' | 'Communication' | 'Personal Development';
  frameworkId: string;
}

export function getPersonalizedRecommendations(profile: UserProfile): RecommendedPromptItem[] {
  const ind = (profile.industry || '').toLowerCase();

  if (ind.includes('coach')) {
    return [
      {
        id: 'rec-coaching-1',
        title: 'Client onboarding strategy',
        category: 'Client Experience',
        reason: `Tailored for ${profile.businessName || 'your studio'}`,
        roughRequest: `Create a warm, luxury 48-hour client onboarding sequence and kickoff checklist for new private clients at ${profile.businessName}.`,
        objective: 'Communication',
        frameworkId: 'fw-client-onboarding',
      },
      {
        id: 'rec-coaching-2',
        title: 'Lead generation content',
        category: 'Demand Generation',
        reason: `Matches your goal: Generate qualified leads`,
        roughRequest: `Design a high-intent lead magnet and 3 organic content hooks that attract ${profile.targetAudience.toLowerCase()} ready for private coaching.`,
        objective: 'Marketing',
        frameworkId: 'fw-lead-gen',
      },
      {
        id: 'rec-coaching-3',
        title: 'Coaching program launch',
        category: 'Offer Launch',
        reason: `Built for ${profile.industry}`,
        roughRequest: `Write a poised LinkedIn and email announcement opening 4 new private coaching spots at ${profile.businessName} this month.`,
        objective: 'Sales',
        frameworkId: 'fw-coaching-launch',
      },
      {
        id: 'rec-coaching-4',
        title: 'Thought leadership posts',
        category: 'Brand Visibility',
        reason: `Calibrated to your ${profile.brandVoice.slice(0, 2).join(' & ').toLowerCase()} voice`,
        roughRequest: `Write 3 editorial LinkedIn thought leadership posts challenging loud marketing advice and championing intentional brand clarity.`,
        objective: 'Content Creation',
        frameworkId: 'fw-linkedin-strategy',
      },
    ];
  }

  if (ind.includes('beauty') || ind.includes('wellness') || ind.includes('commerce')) {
    return [
      {
        id: 'rec-bw-1',
        title: 'Sensory Product Launch Campaign',
        category: 'Campaign Launch',
        reason: `Tailored for ${profile.businessName} (${profile.industry})`,
        roughRequest: `Create a 7-day editorial launch story sequence for our newest collection at ${profile.businessName}, focusing on ritual and efficacy.`,
        objective: 'Marketing',
        frameworkId: 'fw-product-launch',
      },
      {
        id: 'rec-bw-2',
        title: 'Ingredient & Ritual Education Carousel',
        category: 'Educational Content',
        reason: `Resonates with ${profile.targetAudience}`,
        roughRequest: `Write a 5-slide Instagram educational carousel translating our hero ritual into calm, everyday guidance.`,
        objective: 'Content Creation',
        frameworkId: 'fw-wellness-ritual',
      },
      {
        id: 'rec-bw-3',
        title: 'VIP Customer Retention & Replenishment',
        category: 'Lifecycle Loyalty',
        reason: `Builds repeat customer lifetime value`,
        roughRequest: `Draft a warm post-purchase check-in and replenishment invitation for first-time customers at ${profile.businessName}.`,
        objective: 'Sales',
        frameworkId: 'fw-customer-retention',
      },
      {
        id: 'rec-bw-4',
        title: 'Founder Story & Brand Philosophy',
        category: 'Brand Positioning',
        reason: `Calibrated to your ${profile.brandVoice.slice(0, 2).join(' & ').toLowerCase()} voice`,
        roughRequest: `Refresh our founder origin story and About page messaging for ${profile.businessName}.`,
        objective: 'Content Creation',
        frameworkId: 'fw-personal-brand',
      },
    ];
  }

  return [
    {
      id: 'rec-gen-1',
      title: 'Thought leadership posts',
      category: 'Authority Building',
      reason: `Tailored for ${profile.businessName} (${profile.industry})`,
      roughRequest: `Write a compelling LinkedIn point-of-view post for ${profile.businessName} addressing the #1 mistake ${profile.targetAudience.toLowerCase()} make.`,
      objective: 'Content Creation',
      frameworkId: 'fw-linkedin-strategy',
    },
    {
      id: 'rec-gen-2',
      title: 'Lead generation content',
      category: 'Client Acquisition',
      reason: `Designed for ${profile.targetAudience}`,
      roughRequest: `Create a high-converting lead generation resource concept and promotional post for ${profile.businessName}.`,
      objective: 'Marketing',
      frameworkId: 'fw-lead-gen',
    },
    {
      id: 'rec-gen-3',
      title: 'Client onboarding strategy',
      category: 'Client Experience',
      reason: `Elevates retention & referrals`,
      roughRequest: `Draft a luxury welcome email and kickoff roadmap for new clients working with ${profile.businessName}.`,
      objective: 'Communication',
      frameworkId: 'fw-client-onboarding',
    },
    {
      id: 'rec-gen-4',
      title: 'Strategic 90-Day Growth Roadmap',
      category: 'Executive Strategy',
      reason: `Aligned with your top goals`,
      roughRequest: `Map out a focused 90-day growth plan for ${profile.businessName} to achieve our core visibility and revenue goals.`,
      objective: 'Business Strategy',
      frameworkId: 'fw-growth-roadmap',
    },
  ];
}

