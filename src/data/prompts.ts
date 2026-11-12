import { PromptFramework } from '../types';

export const EXPERT_PROMPT_LIBRARY: PromptFramework[] = [
  {
    id: 'fw-brand-voice',
    title: 'Signature Brand Voice Builder',
    shortDescription:
      'Codify your nuanced tone, cadence, and vocabulary into a reusable editorial style guide that prevents generic AI output.',
    fullDescription:
      'Crafted by senior editorial directors, this framework distills how you naturally speak, teach, and advise into concrete linguistic guardrails—including rhythm, sentence length, signature phrases, and anti-patterns.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Creative Services', 'Marketing'],
    objective: 'Content Creation',
    relevantAudience: 'Founders, coaches, and creative directors refining their brand identity',
    popularRank: 1,
    dateAdded: '2026-11-10',
    authorRole: 'Former Editorial Director & Brand Strategist',
    whatItHelpsAchieve: [
      'Defines 4 distinct pillars of your brand voice with real writing samples',
      'Creates a "Say This, Never That" vocabulary matrix for every piece of content',
      'Establishes paragraph pacing and emotional resonance rules for AI assistants',
    ],
    whoItIsFor: 'Women founders and personal brands who are tired of AI sounding stiff, corporate, or overly enthusiastic.',
    frameworkOverview:
      'Combines sociolinguistic tone mapping with comparative editorial examples so any LLM immediately adopts your cadence.',
    originalFrameworkPreview: `[EDITORIAL VOICE ARCHITECTURE]
1. Voice Pillar Matrix (Warmth vs. Authority calibration)
2. Cadence & Sentence Structure Rules (Rhythm, punctuation, white space)
3. Signature Lexicon & Forbidden Clichés
4. Before/After Calibration Samples tailored to {{BUSINESS_NAME}}`,
    roleDefinition:
      'You are an executive editorial director and brand verbal identity strategist who specializes in distinctive, human-first founder voices.',
    contentRequirements: [
      'Analyze the provided business context and voice attributes to define 4 clear voice pillars.',
      'Create a comparative "This, Not That" table showing how the brand speaks in 3 real scenarios.',
      'Establish concrete formatting, pacing, and vocabulary rules.',
    ],
    outputFormat: 'A comprehensive Brand Voice Style Guide with actionable prompt instructions and 3 sample paragraphs.',
    successCriteria: [
      'Zero generic corporate buzzwords or AI filler.',
      'Immediately usable as a reference standard for future content.',
    ],
    defaultRoughRequest: 'Help me define my signature brand voice guide so all my content sounds unmistakably like me.',
  },
  {
    id: 'fw-product-launch',
    title: 'High-Converting Product Launch',
    shortDescription:
      'Map a calm, high-trust 14-day launch runway that builds genuine anticipation and converts without high-pressure tactics.',
    fullDescription:
      'Designed for service launches, digital products, and signature cohorts. This framework sequences storytelling, authority-building proof, and clear invitations so your audience feels guided rather than sold to.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Coaching', 'E-commerce', 'Education', 'Marketing'],
    objective: 'Marketing',
    relevantAudience: 'Entrepreneurs launching a new offer, digital product, or signature service',
    popularRank: 2,
    dateAdded: '2026-11-09',
    authorRole: 'Launch Strategist for 7-Figure Boutique Brands',
    whatItHelpsAchieve: [
      'Structures a 3-phase launch arc: Quiet Curiosity, Deep Resonance, and Clear Invitation',
      'Produces channel-specific messaging angles tailored to your exact buyer hesitations',
      'Replaces fake urgency with authentic positioning and transformation clarity',
    ],
    whoItIsFor: 'Founders preparing to release a new program, collection, or service who want high conversion with integrity.',
    frameworkOverview:
      'Uses buyer-psychology milestones (problem awareness → paradigm shift → solution fit → confident decision) mapped across your launch calendar.',
    originalFrameworkPreview: `[INTENTIONAL LAUNCH SEQUENCE]
Phase 1: The Paradigm Shift (Days 1–4) — Naming the unspoken gap for {{TARGET_AUDIENCE}}
Phase 2: The Architecture of Transformation (Days 5–9) — How {{BUSINESS_NAME}} bridges the gap
Phase 3: The Direct Invitation (Days 10–14) — Clear decision support & FAQ framing`,
    roleDefinition:
      'You are a senior launch strategist and conversion copywriter for premium, relationship-driven brands.',
    contentRequirements: [
      'Map out a structured launch narrative tailored to the offer and target audience.',
      'Address the top 3 unspoken objections of the audience with empathy and clarity.',
      'Provide ready-to-use copy assets for the announcement and closing invitation.',
    ],
    outputFormat: 'Phased launch roadmap + flagship announcement copy + objection-handling talking points.',
    successCriteria: [
      'Builds genuine desire through clarity rather than artificial scarcity.',
      'Aligns seamlessly with the founder’s brand voice and audience maturity.',
    ],
    defaultRoughRequest: 'Create a 2-week launch narrative and announcement post for my new offer.',
  },
  {
    id: 'fw-ideal-client',
    title: 'Ideal Client Clarity Framework',
    shortDescription:
      'Go beyond surface demographics to uncover the exact internal monologue, decision triggers, and desires of your best clients.',
    fullDescription:
      'Most audience avatars stop at age and job title. This human-crafted framework uncovers the emotional context, late-night questions, and buying readiness criteria that make your messaging feel like mind-reading.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Marketing', 'Creative Services'],
    objective: 'Business Strategy',
    relevantAudience: 'Service providers and founders refining their positioning and messaging',
    popularRank: 5,
    dateAdded: '2026-11-06',
    authorRole: 'Consumer Psychologist & Positioning Advisor',
    whatItHelpsAchieve: [
      'Articulates the 3 levels of client desire: External problem, Internal feeling, and Identity shift',
      'Identifies exact trigger events that prompt your ideal client to seek support right now',
      'Generates 10 resonant messaging hooks pulled directly from client psychology',
    ],
    whoItIsFor: 'Coaches, consultants, and founders whose content gets polite likes but not enough qualified inquiries.',
    frameworkOverview:
      'Synthesizes psychographic depth interviews and jobs-to-be-done methodology into a living messaging compass.',
    originalFrameworkPreview: `[DEEP PSYCHOGRAPHIC MATRIX]
1. The Current Reality vs. The Quiet Aspiration
2. Catalyst Moments (Why they buy now vs. six months from now)
3. Previous Solutions Tried & Why They Fell Short
4. Exact Resonance Messaging Hooks for {{BUSINESS_NAME}}`,
    roleDefinition:
      'You are a consumer psychologist and positioning strategist who helps boutique brands understand their highest-value clients.',
    contentRequirements: [
      'Map the external symptoms vs. internal experience of the target audience.',
      'Identify the 3 catalyst moments that trigger buying readiness.',
      'Translate these insights into 5 immediate content or sales messaging angles.',
    ],
    outputFormat: 'Structured Ideal Client Psychographic Brief + 5 high-converting messaging angles.',
    successCriteria: [
      'Reads like a real human portrait rather than a marketing textbook persona.',
      'Directly usable for writing website copy, emails, and social posts.',
    ],
    defaultRoughRequest: 'Deepen my ideal client profile and give me 5 messaging angles that speak to their real challenges.',
  },
  {
    id: 'fw-linkedin-strategy',
    title: 'Thought Leadership LinkedIn Strategy',
    shortDescription:
      'Turn your lived expertise and client observations into authoritative, conversation-starting LinkedIn essays and posts.',
    fullDescription:
      'Built specifically for women executives, consultants, and founders who want to build high-trust visibility on LinkedIn without sounding performative or copying viral bro-marketing templates.',
    category: 'Career & Leadership',
    industry: ['Business Coaching', 'Consulting', 'Technology', 'Marketing', 'Education'],
    objective: 'Content Creation',
    relevantAudience: 'Founders, consultants, and leaders growing authority on LinkedIn',
    popularRank: 3,
    dateAdded: '2026-11-11',
    authorRole: 'Executive Ghostwriter & B2B Editorial Strategist',
    whatItHelpsAchieve: [
      'Transforms an everyday client insight or launch update into a sharp point-of-view post',
      'Balances personal warmth with undeniable professional credibility',
      'Includes 3 editorial hook variations and a conversation-sparking closing prompt',
    ],
    whoItIsFor: 'Founders and leaders who want their LinkedIn presence to attract inbound clients, speaking invites, and partnerships.',
    frameworkOverview:
      'Follows the Observation → Conventional Myth → Nuanced Truth → Practical Shift arc used by top editorial columnists.',
    originalFrameworkPreview: `[EDITORIAL LINKEDIN ARCHITECTURE]
Hook: Quiet, specific observation that challenges conventional wisdom
Body: The nuanced truth from inside {{BUSINESS_NAME}}
Takeaway: Actionable shift for {{TARGET_AUDIENCE}}
Close: Warm, peer-level invitation to weigh in`,
    roleDefinition:
      'You are a senior brand strategist and LinkedIn content specialist writing for accomplished women founders and executives.',
    contentRequirements: [
      'Start with a strong, specific opening hook that earns the "see more" click without clickbait.',
      'Deliver a clear value proposition rooted in real-world expertise.',
      'Use human conversational language with concise paragraph structure and zero generic marketing fluff.',
      'End with an appropriate, thoughtful CTA.',
    ],
    outputFormat: 'A polished LinkedIn post ready for publication, plus 2 alternative opening hooks.',
    successCriteria: [
      'Reads with calm authority and natural cadence.',
      'Positions the author as a trusted advisor to her target audience.',
    ],
    defaultRoughRequest: 'Write a LinkedIn post about my launch, keep it short.',
  },
  {
    id: 'fw-instagram-calendar',
    title: 'Instagram Content Calendar',
    shortDescription:
      'Design a cohesive 2-week editorial grid balancing educational carousels, founder stories, and high-converting offer spotlights.',
    fullDescription:
      'Stop staring at a blank grid every morning. This framework balances four intentional content pillars—Authority, Connection, Proof, and Invitation—so your Instagram presence feels like a curated magazine that steadily converts followers into clients.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Beauty & Wellness', 'E-commerce', 'Creative Services', 'Marketing'],
    objective: 'Content Creation',
    relevantAudience: 'Visual brands, coaches, and creative entrepreneurs on Instagram',
    popularRank: 6,
    dateAdded: '2026-11-08',
    authorRole: 'Creative Director & Social Media Strategist',
    whatItHelpsAchieve: [
      'Maps 8–10 cohesive posts across Reels, Carousels, and Editorial Stories',
      'Writes slide-by-slide carousel hooks and complete captions in your brand voice',
      'Pairs every post with a clear business intention (saveable value, DM trigger, or link click)',
    ],
    whoItIsFor: 'Entrepreneurs who want an elevated, cohesive Instagram presence without spending 15 hours a week creating content.',
    frameworkOverview:
      'Integrates visual pacing with narrative storytelling arcs tailored to your current business priority.',
    originalFrameworkPreview: `[CURATED INSTAGRAM SYSTEM]
Pillar 1: Signature Point of View (Saveable Carousel)
Pillar 2: Behind the Studio / Founder Perspective (Warm Connection)
Pillar 3: Client Transformation Story (Social Proof)
Pillar 4: Direct Offer Invitation (DM Conversation Trigger)`,
    roleDefinition:
      'You are a luxury social creative director and conversion strategist for modern women-led brands.',
    contentRequirements: [
      'Structure a strategic sequence of Instagram posts or slide-by-slide carousel copy.',
      'Write scroll-stopping editorial first lines and warm, conversational captions.',
      'Include visual direction notes that match a refined, minimalist brand aesthetic.',
    ],
    outputFormat: 'Structured Instagram content plan with complete slide copy, captions, and visual cues.',
    successCriteria: [
      'Every piece serves a clear strategic goal while feeling effortless and human.',
    ],
    defaultRoughRequest: 'Plan a 5-part Instagram campaign introducing my signature methodology and inviting DMs.',
  },
  {
    id: 'fw-client-onboarding',
    title: 'Client Onboarding Experience',
    shortDescription:
      'Craft a luxury, reassuring welcome sequence that eliminates buyer’s remorse and sets clear boundaries from day one.',
    fullDescription:
      'The first 48 hours after a client pays determine the entire tone of your relationship. This framework builds your welcome email, intake questionnaire framing, and kickoff agenda so clients immediately feel held by a world-class studio.',
    category: 'Relationships & Communication',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Creative Services'],
    objective: 'Communication',
    relevantAudience: 'Coaches, studios, and consultants onboarding high-ticket clients',
    popularRank: 7,
    dateAdded: '2026-11-05',
    authorRole: 'Client Experience Director',
    whatItHelpsAchieve: [
      'Delivers a warm, celebratory welcome email that reinforces their decision',
      'Sets clear communication hours and response expectations with grace',
      'Outlines pre-work steps so the client arrives at Session 1 prepared and energized',
    ],
    whoItIsFor: 'Service providers and coaches who want their client onboarding to feel as elevated as their marketing.',
    frameworkOverview:
      'Combines hospitality-grade reassurance with operational clarity and boundary framing.',
    originalFrameworkPreview: `[ELEVATED ONBOARDING SEQUENCE]
1. The Immediate Celebration & Reassurance Note
2. How We Work Together (Communication rhythm & studio hours)
3. Deep-Dive Intake Framing & Kickoff Call Preparation`,
    roleDefinition:
      'You are a head of client experience for a boutique luxury coaching and advisory practice.',
    contentRequirements: [
      'Write a warm, reassuring welcome email for a newly signed client.',
      'Clearly outline the immediate next 3 steps without overwhelming them.',
      'Weave in communication boundaries naturally so they feel like a hallmark of thoughtful service.',
    ],
    outputFormat: 'Complete Welcome Email + Kickoff Checklist + Boundary Framing Snippet.',
    successCriteria: [
      'Eliminates post-purchase anxiety and inspires immediate confidence.',
    ],
    defaultRoughRequest: 'Write a warm welcome email and onboarding checklist for a new private coaching client.',
  },
  {
    id: 'fw-strategic-pricing',
    title: 'Strategic Pricing Framework',
    shortDescription:
      'Structure tiered packages and articulate the ROI of your work so clients focus on transformation rather than hourly rates.',
    fullDescription:
      'Helps women founders transition away from undercharging or hourly billing toward value-anchored signature packages with clear scope, outcomes, and investment framing.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Consulting', 'Creative Services', 'Marketing'],
    objective: 'Business Strategy',
    relevantAudience: 'Founders and consultants restructuring offers or raising prices',
    popularRank: 8,
    dateAdded: '2026-11-03',
    authorRole: 'Fractional CFO & Offer Architect',
    whatItHelpsAchieve: [
      'Structures 2–3 clear offer tiers with distinct outcome boundaries',
      'Articulates the tangible and intangible ROI of your transformation',
      'Provides confident scripts for presenting your investment live or in proposals',
    ],
    whoItIsFor: 'Service business owners ready to elevate their pricing and communicate value with poise.',
    frameworkOverview:
      'Uses value-anchoring and outcome-based packaging to detach your income from raw hours worked.',
    originalFrameworkPreview: `[VALUE-ANCHORED OFFER ARCHITECTURE]
1. Core Transformation & Cost of Inaction
2. Tiered Scope Matrix (Essential vs. Signature vs. Advisory)
3. Poised Investment Presentation Script`,
    roleDefinition:
      'You are a strategic offer architect and pricing advisor for profitable women-led service businesses.',
    contentRequirements: [
      'Design a clear, value-based pricing and packaging structure for the user’s offer.',
      'Write outcome-focused bullet points for each tier rather than just listing deliverables.',
      'Include a poised script for stating the investment and handling price hesitation.',
    ],
    outputFormat: 'Offer Tier Breakdown + ROI Positioning Statement + Investment Script.',
    successCriteria: [
      'Frames price around transformation value and clarity.',
    ],
    defaultRoughRequest: 'Help me structure two tiers for my private coaching offer and explain the value clearly.',
  },
  {
    id: 'fw-networking-outreach',
    title: 'Professional Networking Outreach',
    shortDescription:
      'Initiate genuine peer relationships, podcast pitches, and warm prospect follow-ups that people actually look forward to answering.',
    fullDescription:
      'Whether following up after a discovery call, pitching a dream podcast host, or reaching out to a strategic partner, this framework crafts personalized, concise notes rooted in mutual value.',
    category: 'Relationships & Communication',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Technology', 'Marketing'],
    objective: 'Communication',
    relevantAudience: 'Founders, executives, and creators building strategic relationships',
    popularRank: 9,
    dateAdded: '2026-11-07',
    authorRole: 'Partnerships & Communications Advisor',
    whatItHelpsAchieve: [
      'Replaces awkward "just checking in" emails with specific, thoughtful connection points',
      'Structures concise outreach under 140 words that respects a busy recipient’s inbox',
      'Ends with a low-pressure, easy-to-answer question',
    ],
    whoItIsFor: 'Professionals and founders who want to grow their network and client roster through warm, respectful outreach.',
    frameworkOverview:
      'Built on the Specific Appreciation → Shared Context → Low-Friction Invitation structure.',
    originalFrameworkPreview: `[WARM OUTREACH FORMULA]
1. Genuine, specific point of connection (Zero flattery filler)
2. Why this matters to their audience or current season
3. Effortless 1-sentence invitation`,
    roleDefinition:
      'You are an executive communications advisor specializing in high-trust relationship building and consultative outreach.',
    contentRequirements: [
      'Draft a personalized, concise outreach or follow-up message.',
      'Keep the tone warm, peer-to-peer, and completely free of needy or pushy sales language.',
      'Provide 2 subject line options that feel natural and personal.',
    ],
    outputFormat: '2 Subject Lines + Primary Outreach Email + Short LinkedIn DM adaptation.',
    successCriteria: [
      'Under 150 words, warm, specific, and easy to reply to.',
    ],
    defaultRoughRequest: 'Write a warm client proposal email following up after our consultation call.',
  },
  {
    id: 'fw-sales-page',
    title: 'Sales Page Messaging',
    shortDescription:
      'Write an editorial, conversion-optimized landing page narrative that guides ideal buyers from quiet recognition to a confident yes.',
    fullDescription:
      'Forget endless red headlines and manipulative countdown timers. This framework structures a sophisticated, story-driven sales page that honors your reader’s intelligence while making the value of your offer unmistakable.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Coaching', 'Education', 'E-commerce', 'Beauty & Wellness'],
    objective: 'Sales',
    relevantAudience: 'Founders writing sales pages for programs, services, or digital products',
    popularRank: 4,
    dateAdded: '2026-11-11',
    authorRole: 'Senior Conversion Copywriter',
    whatItHelpsAchieve: [
      'Writes a magnetic hero section (Eyebrow, Headline, Subheadline, and Primary CTA)',
      'Frames the "Before vs. After" transformation with emotional precision',
      'Drafts an "Is This For You?" self-qualification section that filters for ideal clients',
    ],
    whoItIsFor: 'Business owners who want a high-converting sales page that looks and sounds like an editorial brand.',
    frameworkOverview:
      'Sequences Resonance → Reframe → Method → Proof → Offer Details → Reassuring FAQ.',
    originalFrameworkPreview: `[EDITORIAL SALES PAGE BLUEPRINT]
01. Hero Promise & Subhead
02. The Quiet Frustration (Why traditional advice hasn't worked)
03. The Signature Method at {{BUSINESS_NAME}}
04. Transformation & Tangible Outcomes
05. Who This Is Built For + Poised CTA`,
    roleDefinition:
      'You are a conversion copywriter for luxury and editorial women-led brands.',
    contentRequirements: [
      'Write complete, structured copy for the key sections of the sales page.',
      'Weave the user’s specific customer challenges and transformation naturally into the narrative.',
      'Maintain the exact brand voice attributes and forbidden word rules.',
    ],
    outputFormat: 'Section-by-section Sales Page Copy Deck ready for design placement.',
    successCriteria: [
      'Persuasive, clear, and deeply aligned with an elevated brand identity.',
    ],
    defaultRoughRequest: 'Write the hero section, problem reframe, and transformation blocks for my coaching sales page.',
  },
  {
    id: 'fw-growth-roadmap',
    title: 'Business Growth Roadmap',
    shortDescription:
      'Clarify your next 90 days of revenue priorities, marketing channels, and operational focus without spreading yourself thin.',
    fullDescription:
      'When everything feels urgent, growth stalls. This strategic planning framework acts like a fractional COO—evaluating your current stage and goals to distill 3 high-leverage priorities for the quarter.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Consulting', 'E-commerce', 'Technology', 'Other'],
    objective: 'Business Strategy',
    relevantAudience: 'Founders planning quarterly priorities and sustainable revenue growth',
    popularRank: 10,
    dateAdded: '2026-11-01',
    authorRole: 'Fractional COO & Growth Advisor',
    whatItHelpsAchieve: [
      'Narrows scattered to-do lists down to 3 high-impact quarterly rocks',
      'Aligns weekly marketing habits directly with revenue targets',
      'Identifies what to deliberately pause or delegate this quarter',
    ],
    whoItIsFor: 'Founders who want a calm, structured 90-day growth plan tailored to their capacity.',
    frameworkOverview:
      'Applies the Focus-Leverage-Sustainability triad to quarterly business planning.',
    originalFrameworkPreview: `[90-DAY SUSTAINABLE GROWTH ARCHITECTURE]
1. Primary Revenue Driver & Offer Focus
2. Core Visibility Engine (1 Primary + 1 Nurture Channel)
3. The "Not Doing This Quarter" Boundary List
4. 30-60-90 Day Milestone Checkpoints`,
    roleDefinition:
      'You are a seasoned fractional COO and business strategist advising women founders on sustainable scaling.',
    contentRequirements: [
      'Synthesize the user’s business stage and stated goals into a focused 90-day roadmap.',
      'Define 3 core strategic pillars with measurable 30-60-90 day milestones.',
      'Include a "Permission to Pause" list of low-ROI distractions to avoid.',
    ],
    outputFormat: 'Executive 90-Day Growth Brief with monthly milestones and weekly cadence.',
    successCriteria: [
      'Actionable, realistic, and immediately calming to execute.',
    ],
    defaultRoughRequest: 'Build a focused 90-day growth roadmap to increase qualified leads and launch my digital product.',
  },
  {
    id: 'fw-boundary-script',
    title: 'Confident Boundary-Setting Script',
    shortDescription:
      'Navigate scope creep, late payments, or last-minute reschedules with warmth, poise, and zero guilt.',
    fullDescription:
      'Protecting your time and energy shouldn’t require sounding cold or defensive. This communication framework crafts gracious, firm scripts that preserve relationship warmth while holding clear professional standards.',
    category: 'Relationships & Communication',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Creative Services', 'Other'],
    objective: 'Communication',
    relevantAudience: 'Service providers, leaders, and professionals holding clear boundaries',
    popularRank: 11,
    dateAdded: '2026-11-04',
    authorRole: 'Executive Leadership Coach & Mediator',
    whatItHelpsAchieve: [
      'Removes over-apologizing and lengthy justifications from boundary emails',
      'Provides 3 calibrated tone options: Gentle Reminder, Clear Standard, and Firm Redirect',
      'Protects client goodwill while clearly pricing out-of-scope additions',
    ],
    whoItIsFor: 'Founders, freelancers, and leaders who want to hold firm standards without second-guessing their tone.',
    frameworkOverview:
      'Uses the Warm Acknowledgment → Clear Policy/Boundary → Collaborative Next Step structure.',
    originalFrameworkPreview: `[POISED BOUNDARY FRAMEWORK]
1. Warm affirmation of the project/relationship
2. Neutral, apology-free statement of scope or timeline
3. Clear options for moving forward`,
    roleDefinition:
      'You are an executive communication coach who specializes in warm, high-authority boundary setting.',
    contentRequirements: [
      'Write a clear, gracious response addressing the boundary situation.',
      'Eliminate weak hedging language ("just", "sorry to bother", "I feel like").',
      'Provide both a standard version and a slightly firmer follow-up option.',
    ],
    outputFormat: '2 Ready-to-Send Scripts (Warm Standard & Firm Redirect) + Key Phrasing Notes.',
    successCriteria: [
      'Kind, clear, unapologetic, and relationship-preserving.',
    ],
    defaultRoughRequest: 'Write a warm but firm email to a client asking for extra deliverables outside our agreed scope.',
  },
  {
    id: 'fw-personal-brand',
    title: 'Personal Brand Positioning',
    shortDescription:
      'Articulate your founder story, category of one positioning statement, and media bio across every platform.',
    fullDescription:
      'Whether updating your website about page, speaker bio, or LinkedIn headline, this framework distills your credentials and lived story into magnetic positioning.',
    category: 'Career & Leadership',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Creative Services', 'Beauty & Wellness'],
    objective: 'Marketing',
    relevantAudience: 'Founders, speakers, and executives elevating their public profile',
    popularRank: 12,
    dateAdded: '2026-11-02',
    authorRole: 'Personal Brand Publicist',
    whatItHelpsAchieve: [
      'Creates your 1-sentence Category Positioning Statement',
      'Writes 3 bio lengths: 160-character social bio, 75-word podcast intro, and 200-word editorial bio',
      'Connects your personal philosophy directly to the results you create for clients',
    ],
    whoItIsFor: 'Women leaders and founders stepping into bigger visibility, speaking, and press opportunities.',
    frameworkOverview:
      'Blends credibility markers with human mission and distinct point of view.',
    originalFrameworkPreview: `[FOUNDER POSITIONING SUITE]
1. The One-Line Positioning Anchor
2. Short Social & Directory Bio
3. Press & Podcast Editorial Bio
4. Signature Philosophy Statement`,
    roleDefinition:
      'You are a personal brand publicist and positioning director for prominent women founders.',
    contentRequirements: [
      'Craft a cohesive suite of positioning assets using the founder’s profile context.',
      'Highlight authority and client transformation without sounding boastful or stiff.',
    ],
    outputFormat: 'Complete Personal Brand Bio Suite (Headline, Short Bio, Editorial Bio, and Philosophy Hook).',
    successCriteria: [
      'Distinctive, memorable, and ready to paste onto websites and press kits.',
    ],
    defaultRoughRequest: 'Refresh my founder bio and LinkedIn headline to reflect my boutique coaching studio.',
  },
  {
    id: 'fw-lead-gen',
    title: 'Lead Generation Strategy',
    shortDescription:
      'Design a high-value lead magnet and organic nurture pathway that attracts ready-to-invest clients rather than freebie seekers.',
    fullDescription:
      'Not all leads are equal. This framework designs a diagnostic resource, private audio guide, or curated playbook that solves a specific precursor problem for your highest-value buyers.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Marketing', 'Education'],
    objective: 'Marketing',
    relevantAudience: 'Business owners building an intentional email list and client pipeline',
    popularRank: 13,
    dateAdded: '2026-10-30',
    authorRole: 'Demand Generation Strategist',
    whatItHelpsAchieve: [
      'Designs 3 high-intent lead magnet concepts aligned with your signature offer',
      'Outlines the complete content inside your chosen resource so you can create it in an afternoon',
      'Maps the bridge from downloading the free resource to booking a consultation',
    ],
    whoItIsFor: 'Entrepreneurs who want a steady, predictable flow of qualified leads entering their ecosystem.',
    frameworkOverview:
      'Aligns precursor problem-solving with your core paid transformation.',
    originalFrameworkPreview: `[HIGH-INTENT LEAD ECOSYSTEM]
1. Precursor Problem Selection (What sophisticated buyers ask first)
2. Resource Architecture & Title Options
3. The Bridge to Paid Work`,
    roleDefinition:
      'You are a demand generation strategist for boutique high-ticket service brands.',
    contentRequirements: [
      'Propose 3 high-trust lead magnet concepts tailored to the audience’s real challenges.',
      'Provide a detailed outline for the strongest concept.',
      'Write the opt-in promise copy and the bridge CTA to the main offer.',
    ],
    outputFormat: '3 Lead Magnet Concepts + Detailed Content Outline + Opt-In Copy.',
    successCriteria: [
      'Attracts decision-makers rather than passive freebie collectors.',
    ],
    defaultRoughRequest: 'Create a high-converting lead magnet concept and outline that leads naturally into my coaching program.',
  },
  {
    id: 'fw-email-campaign',
    title: 'Email Marketing Campaign',
    shortDescription:
      'Write editorial weekly newsletters and nurture sequences that feel like a coveted Sunday letter from a trusted mentor.',
    fullDescription:
      'Email remains the most intimate, algorithm-proof channel for women-led businesses. This framework structures story-led newsletters and 3-part nurture sequences with high open and reply rates.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Beauty & Wellness', 'E-commerce', 'Coaching', 'Creative Services'],
    objective: 'Marketing',
    relevantAudience: 'Founders and creators nurturing an email newsletter community',
    popularRank: 14,
    dateAdded: '2026-10-28',
    authorRole: 'Editorial Newsletter Strategist',
    whatItHelpsAchieve: [
      'Crafts curiosity-driven subject lines and preview text that avoid spam triggers',
      'Weaves personal observation into a practical business or life takeaway',
      'Transitions effortlessly into a soft PS or direct offer invitation',
    ],
    whoItIsFor: 'Founders who want their email list to be their warmest, highest-converting asset.',
    frameworkOverview:
      'Follows the Personal Moment → Shared Principle → Reader Application → Soft Invitation arc.',
    originalFrameworkPreview: `[EDITORIAL NEWSLETTER FORMULA]
- Subject Line Suite (Curiosity + Direct Clarity)
- Opening Scene (Specific, relatable moment)
- Core Insight & Reframe for {{TARGET_AUDIENCE}}
- Graceful Sign-off & PS Offer Link`,
    roleDefinition:
      'You are an editorial newsletter writer and lifecycle email strategist for boutique brands.',
    contentRequirements: [
      'Write a complete, engaging email newsletter or campaign message.',
      'Include 4 subject line and preview text pairings.',
      'Maintain an intimate, one-to-one conversational tone.',
    ],
    outputFormat: 'Subject Line Suite + Complete Email Copy + PS Call to Action.',
    successCriteria: [
      'Feels personal, insightful, and worthy of a reader’s quiet morning inbox.',
    ],
    defaultRoughRequest: 'Write a warm weekly newsletter about why clarity beats hustle when growing a business.',
  },
  {
    id: 'fw-coaching-launch',
    title: 'Coaching Program Launch',
    shortDescription:
      'Announce new 1:1 spots, group cohorts, or advisory containers with magnetic positioning that fills seats through resonance.',
    fullDescription:
      'Purpose-built for coaches, mentors, and advisors. This framework highlights the container intimacy, the specific founder profile it serves best, and the tangible shifts participants experience.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Education'],
    objective: 'Sales',
    relevantAudience: 'Coaches and advisors filling private or group coaching containers',
    popularRank: 2,
    dateAdded: '2026-11-12',
    authorRole: 'Master Certified Coach & Offer Strategist',
    whatItHelpsAchieve: [
      'Articulates the difference between where your client is today and where she will be in 90 days',
      'Highlights the emotional safety and strategic rigor of your coaching container',
      'Generates ready-to-post announcement copy for LinkedIn, Instagram, or email',
    ],
    whoItIsFor: 'Coaches opening enrollment for private 1:1 work, masterminds, or signature group programs.',
    frameworkOverview:
      'Combines Transformation Contrast with Container Intimacy and Peer Qualification.',
    originalFrameworkPreview: `[SIGNATURE COACHING INVITATION]
1. The Season of Business This Container Serves
2. What We Build Together Inside {{BUSINESS_NAME}}
3. Who Thrives in This Room
4. Calm, Direct Application / DM Invitation`,
    roleDefinition:
      'You are a senior brand strategist and launch copywriter specializing in boutique women-led coaching studios.',
    contentRequirements: [
      'Open with a compelling hook that speaks directly to the ideal client’s current season.',
      'Clearly explain the transformation and structure of the coaching program.',
      'Keep the tone warm, confident, and conversational—never desperate or hype-driven.',
      'Finish with a clear, inviting call to action.',
    ],
    outputFormat: 'Polished announcement post + 2 alternative hooks + short DM follow-up script.',
    successCriteria: [
      'Inspires aligned founders to reach out immediately while filtering out mismatched leads.',
    ],
    defaultRoughRequest: 'Write a LinkedIn post announcing new private coaching spots at Bloom & Co., keep it short.',
  },
  {
    id: 'fw-customer-retention',
    title: 'Customer Retention Framework',
    shortDescription:
      'Turn first-time buyers and graduating clients into long-term brand advocates, repeat purchasers, and referral partners.',
    fullDescription:
      'Sustainable businesses are built on repeat trust. This framework designs milestone check-ins, graduation reflections, and alumni continuation invitations that extend client lifetime value naturally.',
    category: 'Business & Entrepreneurship',
    industry: ['Business Coaching', 'E-commerce', 'Beauty & Wellness', 'Consulting', 'Coaching'],
    objective: 'Business Strategy',
    relevantAudience: 'Founders increasing repeat renewals, referrals, and customer loyalty',
    popularRank: 15,
    dateAdded: '2026-10-25',
    authorRole: 'Customer Lifecycle & Retention Director',
    whatItHelpsAchieve: [
      'Creates a celebratory offboarding or milestone reflection touchpoint',
      'Captures powerful, story-rich client testimonials naturally',
      'Introduces next-level continuation or referral rewards without awkwardness',
    ],
    whoItIsFor: 'Service providers and product founders who want higher retention and effortless word-of-mouth referrals.',
    frameworkOverview:
      'Structures Milestone Celebration → Value Reflection → Next-Chapter Continuation.',
    originalFrameworkPreview: `[LIFECYCLE RETENTION TOUCHPOINTS]
1. The Progress Reflection & Win Documentation
2. Natural Testimonial Capture Prompt
3. Alumni Continuation or Referral Invitation`,
    roleDefinition:
      'You are a customer lifecycle and retention strategist for premium relationship-first brands.',
    contentRequirements: [
      'Map out a 3-touchpoint retention and renewal sequence.',
      'Write the exact copy for celebrating client wins and inviting continuation or referrals.',
    ],
    outputFormat: '3-Step Retention Sequence + Testimonial Request Prompt + Renewal Invitation.',
    successCriteria: [
      'Makes existing clients feel deeply valued while opening the door to continued work.',
    ],
    defaultRoughRequest: 'Create a warm client wrap-up email that celebrates their wins, asks for a testimonial, and introduces our alumni retainer.',
  },
  {
    id: 'fw-wellness-ritual',
    title: 'Holistic Wellness & Skincare Education',
    shortDescription:
      'Translate complex ingredient science or wellness rituals into calming, trustworthy educational storytelling.',
    fullDescription:
      'Created for beauty, skincare, and wellness founders who want to educate customers with editorial sophistication while respecting compliance and avoiding miracle-claim hyperbole.',
    category: 'Beauty, Skincare & Wellness',
    industry: ['Beauty & Wellness', 'E-commerce', 'Education'],
    objective: 'Content Creation',
    relevantAudience: 'Beauty, skincare, aesthetic, and holistic wellness founders',
    popularRank: 16,
    dateAdded: '2026-10-29',
    authorRole: 'Beauty Editorial Director',
    whatItHelpsAchieve: [
      'Explains product formulation or wellness rituals in accessible, sensory language',
      'Builds deep customer trust through transparency and ritual framing',
      'Adapts seamlessly for product pages, Instagram education, or journal essays',
    ],
    whoItIsFor: 'Skincare, wellness, and lifestyle founders building an authoritative, calming brand world.',
    frameworkOverview:
      'Pairs Sensory Ritual Framing with Clear Efficacy Explanation.',
    originalFrameworkPreview: `[SENSORY EDUCATION FRAMEWORK]
1. The Daily Ritual Context
2. Why Traditional Approaches Overcomplicate It
3. The Thoughtful Formulation / Practice
4. How to Incorporate It Morning or Evening`,
    roleDefinition:
      'You are a beauty and wellness editorial director writing for a refined, ingredient-conscious audience.',
    contentRequirements: [
      'Use calm, sensory, and trustworthy educational language.',
      'Explain the benefit clearly without exaggerated medical claims.',
    ],
    outputFormat: 'Editorial Educational Post + Ritual Step-by-Step Guide.',
    successCriteria: [
      'Evokes calm luxury and informed trust.',
    ],
    defaultRoughRequest: 'Write an educational post explaining the benefits of a simplified evening ritual for busy founders.',
  },
  {
    id: 'fw-ceo-mindset',
    title: 'Founder Clarity & Weekly Reset Ritual',
    shortDescription:
      'Move from mental clutter and decision fatigue into calm, decisive leadership with a structured executive reflection prompt.',
    fullDescription:
      'Designed for the woman behind the business. Use this framework on Monday mornings or Friday afternoons to sort signal from noise, process hard decisions, and protect your creative energy.',
    category: 'Self Mastery & Mindset',
    industry: ['Business Coaching', 'Coaching', 'Consulting', 'Creative Services', 'Other'],
    objective: 'Personal Development',
    relevantAudience: 'Women founders, executives, and creatives navigating leadership',
    popularRank: 17,
    dateAdded: '2026-11-05',
    authorRole: 'Executive Mindset & Leadership Advisor',
    whatItHelpsAchieve: [
      'Audits where your energy leaked vs. where it compounded this week',
      'Helps untangle a high-stakes leadership or creative decision calmly',
      'Re-anchors your schedule around your highest personal and business priorities',
    ],
    whoItIsFor: 'Founders who use AI not just as a copywriter, but as a calm, structured thinking partner.',
    frameworkOverview:
      'Uses Socratic executive coaching prompts to surface your own clearest intuition and strategy.',
    originalFrameworkPreview: `[EXECUTIVE CLARITY PROTOCOL]
1. Energy & Revenue Signal Audit
2. The Core Decision Reframe
3. Next Week's Non-Negotiable Standard`,
    roleDefinition:
      'You are a calm, perceptive executive leadership coach and strategic thinking partner.',
    contentRequirements: [
      'Reflect the founder’s current situation back with clarity and compassion.',
      'Offer a structured 3-part perspective shift and 3 grounding questions.',
    ],
    outputFormat: 'Executive Clarity Synthesis + 3 Focused Priorities + Grounding Reframe.',
    successCriteria: [
      'Leaves the founder feeling lighter, clearer, and decisive.',
    ],
    defaultRoughRequest: 'Help me organize my thoughts and set 3 calm, high-impact priorities for my business this week.',
  },
];
