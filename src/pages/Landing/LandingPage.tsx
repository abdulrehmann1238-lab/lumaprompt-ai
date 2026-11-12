import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  RefreshCw,
  ChevronDown,
  Layers,
  UserCheck,
  BookOpen,
  Blocks,
  Chrome,
  BarChart3,
  ShieldCheck,
  Clock,
  Sliders,
  MessageSquare,
  Eye,
  Send,
  CheckCircle2,
  X,
} from 'lucide-react';
import { PublicNavbar } from '../../components/navigation/PublicNavbar';
import { ScrollReveal } from '../../components/animations/ScrollReveal';
import { LANDING_SCENARIOS } from '../../data/templates';
import { useApp } from '../../context/AppContext';
import { isValidEmail } from '../../utils/validation';

const HERO_POSTER_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF8F5"/>
      <stop offset="50%" stop-color="#F2EEE8"/>
      <stop offset="100%" stop-color="#E9DAD5" stop-opacity="0.45"/>
    </linearGradient>
    <radialGradient id="sunlight" cx="75%" cy="25%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#FAF8F5" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#F2EEE8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="1200" cy="220" r="650" fill="url(#sunlight)"/>
  <path d="M920,0 L1600,0 L1600,900 L680,900 Z" fill="#FFFFFF" fill-opacity="0.22"/>
  <rect x="1020" y="120" width="420" height="620" rx="210" fill="#E9DAD5" fill-opacity="0.22"/>
</svg>`);

const FAQ_ITEMS = [
  {
    q: 'What is Luma?',
    a: 'Luma (LumaPrompt.ai) is a personalized AI prompt intelligence platform built for women entrepreneurs, coaches, consultants, and modern professionals. By combining your one-time saved business profile with a library of human-written expert prompt frameworks, Luma turns simple everyday requests into deeply contextual, high-performing prompts.',
  },
  {
    q: 'How does Luma personalize prompts?',
    a: 'You save your profile once—including your business description, target audience, customer challenges, brand voice attributes, preferred vocabulary, and strategic goals. Whenever you enter a rough thought, the Luma Engine automatically injects your relevant context and pairs it with a matching expert-written framework.',
  },
  {
    q: 'Do I need prompt engineering experience?',
    a: 'Not at all. Luma was created specifically so you never have to memorize complex prompt formulas or rewrite instructions from scratch. You simply state what you need in plain conversational language, and Luma assembles the role, constraints, voice guardrails, and output structure for you.',
  },
  {
    q: 'Does Luma work with ChatGPT?',
    a: 'Yes. Luma integrates with ChatGPT both through our planned OpenAI Apps SDK integration (Milestone 2) and via the Luma Chrome Extension (Milestone 3), as well as one-click structured copy from the Smart Builder.',
  },
  {
    q: 'Does Luma work with Claude?',
    a: 'Yes. Claude is a core pillar of the Luma ecosystem. Luma connects with Claude via a dedicated Remote Model Context Protocol (MCP) server with OAuth 2.0 authentication, and also works directly inside the Claude web chat composer via our Chrome Extension.',
  },
  {
    q: 'How does the Chrome extension work?',
    a: 'The Luma Chrome Extension adds a subtle Luma button right inside the chat input bar of ChatGPT, Claude, and Google Gemini. Type a quick rough thought, click the Luma button to preview your enhanced profile-aware prompt, and click "Insert into Chat" to replace your rough draft cleanly.',
  },
  {
    q: 'Is my profile saved?',
    a: 'Yes. Once you complete your four-step onboarding, your business profile, audience insights, and brand voice guardrails are saved to your workspace and automatically power Smart Builder, recommendations, and connected integrations. You can edit or refine your profile at any time.',
  },
  {
    q: 'What happens when I reach my free usage limit?',
    a: 'The Free plan includes 20 personalized prompt generations per month. When you reach 20/20, you can still view your saved prompts, browse the expert library, and edit your profile while waiting for your monthly allowance reset—or join the waitlist for Luma Pro.',
  },
  {
    q: 'Will Luma have a paid plan?',
    a: 'Yes. Luma’s architecture is built with Stripe-ready subscription metering for our upcoming Pro tier, which will unlock higher monthly generation limits, expanded industry framework libraries, and advanced brand voice customization.',
  },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, setBuilderDraft, joinProWaitlist } = useApp();

  // Hero Interactive Preview state
  const [heroDestination, setHeroDestination] = useState<'Claude' | 'ChatGPT'>('Claude');
  const [heroEnhancing, setHeroEnhancing] = useState(false);
  const [heroPreviewMode, setHeroPreviewMode] = useState<'structured' | 'raw'>('structured');

  // Before/After Scenario state
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const [showFullPromptModal, setShowFullPromptModal] = useState(false);

  // Interactive How It Works step
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);

  // FAQ state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Newsletter & Contact Form states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Legal Modal state
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const currentScenario = LANDING_SCENARIOS[activeScenarioIdx];

  const handleSelectScenario = (idx: number) => {
    if (idx === activeScenarioIdx) return;
    setIsTransforming(true);
    setTimeout(() => {
      setActiveScenarioIdx(idx);
      setIsTransforming(false);
    }, 360);
  };

  const handleTryAnotherScenario = () => {
    const nextIdx = (activeScenarioIdx + 1) % LANDING_SCENARIOS.length;
    handleSelectScenario(nextIdx);
  };

  const handleCopyScenarioPrompt = () => {
    navigator.clipboard?.writeText(currentScenario.fullText);
    showToast(
      'Expert prompt copied',
      `Copied "${currentScenario.label}" prompt to your clipboard.`
    );
  };

  const handleOpenScenarioInBuilder = () => {
    setBuilderDraft({
      roughRequest: currentScenario.roughRequest,
      objective:
        currentScenario.id === 'linkedin'
          ? 'Content Creation'
          : currentScenario.id === 'instagram'
          ? 'Marketing'
          : 'Sales',
      destination: 'Claude',
      autoGenerate: true,
    });
    navigate('/builder');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubmitted(true);
    showToast('Welcome to the Luma Journal', `Subscribed ${newsletterEmail} to our editorial notes.`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      setContactError('Please enter your name.');
      return;
    }
    if (!isValidEmail(contactEmail)) {
      setContactError('Please enter a valid email address.');
      return;
    }
    if (contactMessage.trim().length < 10) {
      setContactError('Please share a brief message (at least 10 characters).');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
    showToast('Message received', 'Thank you for reaching out. Our team will respond shortly.');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#292722] flex flex-col overflow-x-hidden">
      <PublicNavbar />

      {/* =========================================================
          1. HERO SECTION WITH WARM EDITORIAL ATMOSPHERE
      ========================================================= */}
      <section className="relative overflow-hidden pt-8 pb-20 sm:pt-14 sm:pb-28 border-b border-[#E9E4DC]">
        {/* Subtle Background Video + Warm Ivory Overlay + Editorial Sunlight Fallback */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER_SVG}
            className="hidden md:block w-full h-full object-cover opacity-30 scale-105"
          >
            {/* Lightweight subtle fallback source; if offline/blocked in sandbox, poster renders seamlessly */}
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-her-laptop-at-home-4838-large.mp4"
              type="video/mp4"
            />
          </video>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url("${HERO_POSTER_SVG}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/90 to-[#FAF8F5]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EEE8] border border-[#E9E4DC] text-[#50434F] text-[11px] font-semibold tracking-[0.14em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#9B7775]" />
                MEET YOUR NEW AI PROMPT COMPANION
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292722] leading-[1.08] tracking-tight">
                Your ideas deserve better prompts.
              </h1>

              <p className="text-base sm:text-lg text-[#817B73] leading-relaxed max-w-xl">
                One personal profile. Hundreds of expert-written insights. Every prompt shaped around your business, your voice and the way you work.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-sm font-medium transition-all shadow-sm hover:-translate-y-0.5"
                >
                  <span>Build My First Prompt</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-[#F2EEE8] text-[#292722] border border-[#E9E4DC] text-sm font-medium transition-all"
                >
                  Explore How It Works
                </button>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3 text-xs text-[#817B73]">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#292722]/85">
                  <span className="w-2 h-2 rounded-full bg-[#728C75]" />
                  Human expertise. Personal context. Better AI conversations.
                </span>
                <span className="hidden sm:inline text-[#E9E4DC]">|</span>
                <Link
                  to="/builder"
                  className="underline decoration-[#9B7775]/50 underline-offset-4 hover:text-[#292722] font-medium"
                >
                  Or try Smart Builder directly →
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Smart Builder Preview Card */}
            <div className="lg:col-span-6 relative">
              {/* Floating Supporting Pill 1: Brand voice applied */}
              <div className="hidden sm:flex items-center gap-2.5 bg-white border border-[#E9E4DC] rounded-xl px-3.5 py-2.5 shadow-editorial absolute -top-5 left-4 z-20">
                <div className="w-6 h-6 rounded-full bg-[#EAEDE5] text-[#728C75] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-[#292722]">Brand voice applied.</span>
              </div>

              {/* Floating Supporting Pill 2: Audience context added */}
              <div className="hidden sm:flex items-center gap-2.5 bg-white border border-[#E9E4DC] rounded-xl px-3.5 py-2.5 shadow-editorial absolute -bottom-5 right-4 z-20">
                <div className="w-6 h-6 rounded-full bg-[#E9DAD5] text-[#50434F] flex items-center justify-center">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-[#292722]">Audience context added.</span>
              </div>

              {/* Main Preview Card */}
              <div className="editorial-panel p-5 sm:p-6 bg-white border border-[#E9E4DC] relative z-10">
                {/* Top Header Bar: Sarah's Business Profile */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E9E4DC]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E9DAD5] text-[#50434F] font-serif text-xs flex items-center justify-center font-medium">
                      SM
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#292722]">
                          Sarah’s Business Profile
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EAEDE5] text-[#728C75] text-[10px] font-medium">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-[#817B73]">
                        Bloom & Co. · Business Coaching · Warm, Confident
                      </p>
                    </div>
                  </div>

                  {/* Destination Chips */}
                  <div className="flex items-center gap-1.5">
                    {(['Claude', 'ChatGPT'] as const).map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => setHeroDestination(dest)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                          heroDestination === dest
                            ? 'bg-[#50434F] text-white border-[#50434F]'
                            : 'bg-[#FAF8F5] text-[#817B73] border-[#E9E4DC] hover:text-[#292722]'
                        }`}
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rough User Request Box */}
                <div className="bg-[#FAF8F5] border border-[#E9E4DC] rounded-xl p-3.5 mb-3.5">
                  <div className="flex items-center justify-between text-[11px] text-[#817B73] mb-1">
                    <span className="uppercase tracking-wider font-medium">Rough Request</span>
                    <span>9 words</span>
                  </div>
                  <p className="text-sm text-[#292722] font-medium">
                    “Write a LinkedIn post about my launch, keep it short.”
                  </p>
                </div>

                {/* Processing & Framework Indicator Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#F2EEE8]/80 border border-[#E9E4DC] mb-3.5">
                  <div className="flex items-center gap-2 text-xs text-[#50434F]">
                    <Sparkles className="w-3.5 h-3.5 text-[#9B7775]" />
                    <span className="font-medium">Framework:</span>
                    <span className="text-[#292722]">Coaching Program Launch</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroEnhancing(true);
                      setTimeout(() => {
                        setHeroEnhancing(false);
                        setHeroPreviewMode((m) => (m === 'structured' ? 'raw' : 'structured'));
                      }, 450);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#9B7775] hover:text-[#50434F]"
                  >
                    <RefreshCw className={`w-3 h-3 ${heroEnhancing ? 'animate-spin' : ''}`} />
                    <span>{heroPreviewMode === 'structured' ? 'View Raw Prompt' : 'View Structured'}</span>
                  </button>
                </div>

                {/* Enhanced Prompt Output Preview */}
                <div className="bg-white border border-[#E9E4DC] rounded-xl p-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#728C75] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#728C75]" />
                      Enhanced Luma Prompt · Ready for {heroDestination}
                    </span>
                    <Link
                      to="/builder"
                      className="text-[11px] font-medium text-[#9B7775] hover:underline"
                    >
                      Open in Builder →
                    </Link>
                  </div>

                  {heroPreviewMode === 'structured' ? (
                    <div className="space-y-2 pt-1">
                      <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E9E4DC]/70">
                        <span className="font-semibold text-[#50434F]">ROLE & CONTEXT: </span>
                        <span className="text-[#292722]/90">
                          Senior brand strategist writing for <strong>Sarah Mitchell</strong> at{' '}
                          <strong>Bloom & Co.</strong> (boutique business coaching studio for women founders).
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E9E4DC]/70">
                        <span className="font-semibold text-[#50434F]">AUDIENCE & VOICE: </span>
                        <span className="text-[#292722]/90">
                          Women entrepreneurs & early-stage founders. Tone: <strong>Warm, Confident, Conversational</strong>. Avoid “hustle” or “10x”.
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E9E4DC]/70">
                        <span className="font-semibold text-[#50434F]">STRUCTURE & OUTPUT: </span>
                        <span className="text-[#292722]/90">
                          Single-sentence editorial hook + transformation bridge + low-friction DM invitation (140–170 words).
                        </span>
                      </div>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-[11px] leading-relaxed text-[#292722]/90 bg-[#FAF8F5] p-3 rounded-lg border border-[#E9E4DC] max-h-44 overflow-y-auto">
{`ROLE: You are a senior brand strategist writing for Sarah Mitchell, founder of Bloom & Co.
AUDIENCE: Women entrepreneurs & early-stage founders seeking sustainable growth.
VOICE: Warm, Confident, Professional, Conversational. Use "intentional", "clarity". Avoid "hustle", "grind".
TASK: Write a 150-word LinkedIn launch post with an editorial hook and warm CTA.`}
                    </pre>
                  )}
                </div>

                {/* Mobile visible supporting pills */}
                <div className="flex sm:hidden items-center gap-2 mt-3 pt-3 border-t border-[#E9E4DC]">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#728C75] font-medium">
                    <Check className="w-3 h-3" /> Brand voice applied.
                  </span>
                  <span className="text-[#E9E4DC]">•</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#50434F] font-medium">
                    <Check className="w-3 h-3" /> Audience context added.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. INTERACTIVE BEFORE-AND-AFTER PROMPT DEMONSTRATION
      ========================================================= */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E9E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B7775]">
                Interactive Prompt Transformation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292722] mt-2 mb-4">
                Watch a simple thought become a powerful prompt.
              </h2>
              <p className="text-base text-[#817B73]">
                Select a real scenario below to see how Luma weaves Sarah’s saved profile and an expert-written framework around an everyday request.
              </p>
            </div>

            {/* Scenario Selector Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
              {LANDING_SCENARIOS.map((scen, idx) => (
                <button
                  key={scen.id}
                  type="button"
                  onClick={() => handleSelectScenario(idx)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    activeScenarioIdx === idx
                      ? 'bg-[#292722] text-white border-[#292722] shadow-sm'
                      : 'bg-white text-[#292722] border-[#E9E4DC] hover:bg-[#F2EEE8]'
                  }`}
                >
                  {idx + 1}. {scen.label}
                </button>
              ))}
            </div>

            {/* Three-Part Before / Transformation / After Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* LEFT CARD: Before Luma */}
              <div className="lg:col-span-4 editorial-card p-6 flex flex-col justify-between bg-[#F2EEE8]/60">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-white border border-[#E9E4DC] text-xs font-medium text-[#817B73]">
                      Before Luma
                    </span>
                    <span className="text-xs text-[#817B73]">Ordinary Request</span>
                  </div>

                  <div className="bg-white border border-[#E9E4DC] rounded-xl p-5 my-4 shadow-sm">
                    <p className="font-serif text-xl text-[#292722] leading-snug">
                      “{currentScenario.roughRequest}”
                    </p>
                  </div>

                  <p className="text-xs text-[#817B73] leading-relaxed mt-4">
                    Without context, AI guesses your tone, invents generic corporate hooks, and misses what makes your business distinct.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E9E4DC] space-y-2 text-xs text-[#817B73]">
                  <div className="flex items-center justify-between">
                    <span>Business context included:</span>
                    <span className="text-[#9B7775] font-medium">None</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Brand voice guardrails:</span>
                    <span className="text-[#9B7775] font-medium">None</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Expert structure:</span>
                    <span className="text-[#9B7775] font-medium">None</span>
                  </div>
                </div>
              </div>

              {/* CENTER: Animated Transformation State */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 rounded-[18px] bg-[#F2EEE8] border border-[#E9E4DC] text-center">
                <div
                  className={`w-12 h-12 rounded-2xl bg-white border border-[#E9E4DC] flex items-center justify-center text-[#9B7775] shadow-sm mb-4 transition-transform duration-300 ${
                    isTransforming ? 'scale-110 rotate-12' : ''
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>

                <p className="font-serif text-lg text-[#292722] mb-2">
                  Luma is bringing your context together...
                </p>
                <p className="text-xs text-[#817B73] mb-5">
                  Merging saved profile + human framework
                </p>

                <div className="w-full space-y-2 text-left text-xs">
                  <div className="px-3 py-2 rounded-xl bg-white border border-[#E9E4DC] flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#728C75] shrink-0" />
                    <span className="truncate">Profile: Bloom & Co.</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-white border border-[#E9E4DC] flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#728C75] shrink-0" />
                    <span className="truncate">Voice: Warm, Confident</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-white border border-[#E9E4DC] flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#728C75] shrink-0" />
                    <span className="truncate">{currentScenario.tag}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT CARD: With Luma */}
              <div
                className={`lg:col-span-5 editorial-card p-6 sm:p-7 bg-white border-[#9B7775]/40 transition-opacity duration-300 ${
                  isTransforming ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E9E4DC]">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#EAEDE5] text-[#728C75] text-xs font-semibold">
                      With Luma
                    </span>
                    <span className="text-xs font-medium text-[#50434F]">
                      {currentScenario.frameworkName}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#817B73]">
                    Ready for {currentScenario.destination}
                  </span>
                </div>

                {/* Detailed 8-point structured breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-5">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#9B7775] mb-1">
                      1. Expert Role
                    </span>
                    <p className="text-[#292722]/90 leading-relaxed">
                      {currentScenario.structured.expertRole}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#9B7775] mb-1">
                      2. Business Context
                    </span>
                    <p className="text-[#292722]/90 leading-relaxed">
                      {currentScenario.structured.businessContext}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#9B7775] mb-1">
                      3. Target Audience
                    </span>
                    <p className="text-[#292722]/90 leading-relaxed">
                      {currentScenario.structured.audience}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#9B7775] mb-1">
                      4. Brand Voice
                    </span>
                    <p className="text-[#292722]/90 leading-relaxed">
                      {currentScenario.structured.brandVoice}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs space-y-2 mb-5">
                  <div>
                    <span className="font-semibold text-[#50434F]">5. Objective: </span>
                    <span className="text-[#292722]/90">{currentScenario.structured.objective}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#50434F]">6. Content Requirements: </span>
                    <ul className="list-disc list-inside text-[#292722]/85 mt-1 space-y-0.5">
                      {currentScenario.structured.contentRequirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-1 border-t border-[#E9E4DC]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-semibold text-[#50434F]">7. Output Format: </span>
                      <span className="text-[#292722]/90">{currentScenario.structured.outputFormat}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-[#728C75]">8. Success Criteria: </span>
                    <span className="text-[#292722]/90">{currentScenario.structured.successCriteria}</span>
                  </div>
                </div>

                {/* Action Controls: Show Full Prompt, Copy Prompt, Try Another Example */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFullPromptModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#292722] hover:bg-[#50434F] text-white text-xs font-medium transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Show Full Prompt
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyScenarioPrompt}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F2EEE8] hover:bg-[#E9DAD5] text-[#292722] text-xs font-medium transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#9B7775]" />
                    Copy Prompt
                  </button>

                  <button
                    type="button"
                    onClick={handleTryAnotherScenario}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E9E4DC] hover:bg-[#FAF8F5] text-[#292722] text-xs font-medium transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#817B73]" />
                    Try Another Example
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Modal for Show Full Prompt */}
      {showFullPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292722]/40 backdrop-blur-[2px] p-4">
          <div className="bg-white border border-[#E9E4DC] rounded-[22px] max-w-2xl w-full p-6 sm:p-8 shadow-editorial-lg relative">
            <button
              type="button"
              onClick={() => setShowFullPromptModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#817B73] hover:text-[#292722] hover:bg-[#FAF8F5]"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7775]">
              {currentScenario.frameworkName}
            </span>
            <h3 className="font-serif text-2xl text-[#292722] mt-1 mb-4">
              Full Assembled Prompt — {currentScenario.label}
            </h3>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-[#292722] bg-[#FAF8F5] border border-[#E9E4DC] rounded-xl p-4 max-h-[55vh] overflow-y-auto mb-5">
              {currentScenario.fullText}
            </pre>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopyScenarioPrompt}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium"
              >
                <Copy className="w-4 h-4" />
                Copy Full Prompt
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowFullPromptModal(false);
                  handleOpenScenarioInBuilder();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F2EEE8] hover:bg-[#E9DAD5] text-[#292722] text-xs font-medium"
              >
                Customize in Smart Builder →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          3. PROBLEM SECTION
      ========================================================= */}
      <section className="py-20 sm:py-24 bg-[#F2EEE8]/65 border-b border-[#E9E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B7775]">
                The Context Gap
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292722] mt-2 mb-4">
                AI isn't the problem. Starting without context is.
              </h2>
              <p className="text-base text-[#817B73]">
                Most founders spend more time explaining who they are and fixing robotic drafts than actually doing their work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="editorial-card editorial-card-hover p-7">
                <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775] font-serif text-lg mb-5">
                  01
                </div>
                <h3 className="font-serif text-2xl text-[#292722] mb-3">
                  Starting from scratch.
                </h3>
                <p className="text-sm text-[#817B73] leading-relaxed">
                  Every new chat window has amnesia. Re-typing your business model, ideal client nuances, and offer details every single morning drains your creative momentum before you even begin.
                </p>
              </div>

              <div className="editorial-card editorial-card-hover p-7">
                <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775] font-serif text-lg mb-5">
                  02
                </div>
                <h3 className="font-serif text-2xl text-[#292722] mb-3">
                  Generic answers.
                </h3>
                <p className="text-sm text-[#817B73] leading-relaxed">
                  Short requests yield loud, cliché marketing copy filled with words you would never say out loud—making your boutique brand sound indistinguishable from everyone else online.
                </p>
              </div>

              <div className="editorial-card editorial-card-hover p-7">
                <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775] font-serif text-lg mb-5">
                  03
                </div>
                <h3 className="font-serif text-2xl text-[#292722] mb-3">
                  Rewriting endlessly.
                </h3>
                <p className="text-sm text-[#817B73] leading-relaxed">
                  Going back and forth six times saying “make it warmer, shorter, less salesy” wastes hours. When the initial prompt carries your exact voice and structure, the first draft actually works.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          4. HOW LUMA WORKS (Interactive 3-Step Walkthrough)
      ========================================================= */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E9E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B7775]">
                How Luma Works
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292722] mt-2 mb-4">
                Your context in. Better prompts out.
              </h2>
              <p className="text-base text-[#817B73]">
                Three calm, intentional steps that turn any AI assistant into a strategist who already knows your business inside and out.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Clickable 3 Steps */}
              <div className="lg:col-span-5 space-y-4">
                {[
                  {
                    num: '01',
                    title: '01 — Tell Luma about you.',
                    desc: 'Complete your four-step profile once: your business, ideal audience, signature voice attributes, vocabulary rules, and goals.',
                  },
                  {
                    num: '02',
                    title: '02 — Make your request.',
                    desc: 'Type what you need in plain language—inside Luma’s Smart Builder or directly inside ChatGPT, Claude, or Gemini.',
                  },
                  {
                    num: '03',
                    title: '03 — Get an expert-built prompt.',
                    desc: 'Luma pairs your profile with a curated human-written framework to assemble a complete, high-converting prompt in seconds.',
                  },
                ].map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => setActiveStep(idx as 0 | 1 | 2)}
                      className={`w-full text-left p-6 rounded-[16px] border transition-all ${
                        isActive
                          ? 'bg-white border-[#9B7775] shadow-editorial'
                          : 'bg-[#F2EEE8]/60 border-[#E9E4DC] hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-xl sm:text-2xl text-[#292722]">
                          {step.title}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            isActive
                              ? 'bg-[#E9DAD5] text-[#50434F]'
                              : 'bg-[#FAF8F5] text-[#817B73]'
                          }`}
                        >
                          Step {step.num}
                        </span>
                      </div>
                      <p className="text-sm text-[#817B73] leading-relaxed">{step.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Right: Interactive Visual Demonstration for Selected Step */}
              <div className="lg:col-span-7 editorial-panel p-6 sm:p-8 bg-white">
                {activeStep === 0 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-[#E9E4DC] pb-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7775]">
                          Step 01 Preview · Saved Once
                        </span>
                        <h3 className="font-serif text-2xl text-[#292722] mt-0.5">
                          Sarah Mitchell’s Business & Voice Profile
                        </h3>
                      </div>
                      <Link
                        to="/onboarding"
                        className="text-xs font-medium text-[#9B7775] hover:underline"
                      >
                        Try Onboarding Wizard →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="text-[#817B73] uppercase font-semibold text-[10px]">
                          Business & Industry
                        </span>
                        <p className="text-sm font-medium text-[#292722] mt-1">
                          Bloom & Co. · Business Coaching
                        </p>
                        <p className="text-[#817B73] mt-1">
                          Helping women entrepreneurs build profitable, recognizable businesses.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="text-[#817B73] uppercase font-semibold text-[10px]">
                          Target Audience
                        </span>
                        <p className="text-sm font-medium text-[#292722] mt-1">
                          Women entrepreneurs & early-stage founders
                        </p>
                        <p className="text-[#817B73] mt-1">
                          Seeking sustainable client flow & signature positioning.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                      <span className="text-[#817B73] uppercase font-semibold text-[10px] block mb-2">
                        Selected Brand Voice Chips
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {['Warm', 'Confident', 'Professional', 'Conversational'].map((chip) => (
                          <span
                            key={chip}
                            className="px-3 py-1 rounded-full bg-[#E9DAD5]/70 text-[#50434F] text-xs font-medium"
                          >
                            ✓ {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-[#E9E4DC] pb-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7775]">
                          Step 02 Preview · Plain Language Input
                        </span>
                        <h3 className="font-serif text-2xl text-[#292722] mt-0.5">
                          Enter a quick thought—no formulas needed
                        </h3>
                      </div>
                      <Link
                        to="/builder"
                        className="text-xs font-medium text-[#9B7775] hover:underline"
                      >
                        Open Smart Builder →
                      </Link>
                    </div>
                    <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                      <label className="block text-xs font-medium text-[#817B73] mb-2">
                        What would you like to create today?
                      </label>
                      <div className="p-4 rounded-xl bg-white border border-[#9B7775] text-sm text-[#292722] font-medium shadow-sm">
                        “Write a LinkedIn post about my launch, keep it short.”
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-[#E9E4DC] text-xs">
                        <span className="text-[#728C75] font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Using Sarah’s Business Profile
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-[#F2EEE8] text-[#50434F] font-medium">
                          Destination: Claude / ChatGPT
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-[#E9E4DC] pb-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#728C75]">
                          Step 03 Preview · Assembled Output
                        </span>
                        <h3 className="font-serif text-2xl text-[#292722] mt-0.5">
                          Ready-to-use structured prompt
                        </h3>
                      </div>
                      <Link
                        to="/extension"
                        className="text-xs font-medium text-[#9B7775] hover:underline"
                      >
                        See Chrome Extension Demo →
                      </Link>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-2 text-xs">
                      <p className="text-[#292722]">
                        <strong className="text-[#50434F]">ROLE:</strong> Senior brand strategist & executive LinkedIn specialist for Bloom & Co.
                      </p>
                      <p className="text-[#292722]">
                        <strong className="text-[#50434F]">CONTEXT & AUDIENCE:</strong> Tailored for women entrepreneurs (28–45) navigating brand positioning.
                      </p>
                      <p className="text-[#292722]">
                        <strong className="text-[#50434F]">VOICE RULES:</strong> Warm, Confident, Conversational. Use “intentional”, “clarity”. Zero “hustle” clichés.
                      </p>
                      <p className="text-[#292722]">
                        <strong className="text-[#50434F]">OUTPUT FORMAT:</strong> 150-word LinkedIn post + 2 alternative hooks.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          5. HUMAN EXPERTISE SECTION
      ========================================================= */}
      <section className="py-20 sm:py-24 bg-[#F2EEE8]/70 border-b border-[#E9E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B7775]">
                  Curated Editorial Intelligence
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#292722] leading-tight">
                  Human expertise. Never generic AI filler.
                </h2>
                <p className="text-sm sm:text-base text-[#817B73] leading-relaxed">
                  Unlike prompt generators that simply ask an LLM to “make this prompt longer,” Luma is anchored in a curated library of frameworks written by experienced brand strategists, copywriters, executive coaches, and operators.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      title: 'Expert-written frameworks',
                      desc: 'Proven narrative structures for launches, pricing, sales pages, and client communication.',
                    },
                    {
                      title: 'Curated industry knowledge',
                      desc: 'Domain-specific psychology tailored for coaching, consulting, wellness, and boutique brands.',
                    },
                    {
                      title: 'Structured instructions',
                      desc: 'Clear role definitions, pacing rules, and anti-cliché constraints.',
                    },
                    {
                      title: 'Personalized business context',
                      desc: 'Automatically merged with your saved profile via the Luma Engine.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EAEDE5] text-[#728C75] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#292722]">{item.title}</h4>
                        <p className="text-xs text-[#817B73] mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <Link
                    to="/library"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#50434F] hover:text-[#9B7775] transition-colors"
                  >
                    <span>Explore all 18 human-written frameworks in the Library</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right: Clear distinction between Human Source Framework & Luma Automated Assembly */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="editorial-card p-6 bg-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#F2EEE8] text-[#50434F] text-[11px] font-semibold mb-4">
                    Part 1 · Human-Written Source Framework
                  </span>
                  <h3 className="font-serif text-xl text-[#292722] mb-2">
                    Crafted by Domain Strategists
                  </h3>
                  <p className="text-xs text-[#817B73] leading-relaxed mb-4">
                    Every template in our library is architected by a human specialist—defining the psychological sequence, rhetorical cadence, and quality bar.
                  </p>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-2 text-xs">
                    <div className="font-medium text-[#292722]">Framework Blueprint:</div>
                    <p className="text-[#817B73]">• Hook: Quiet observation vs. industry myth</p>
                    <p className="text-[#817B73]">• Bridge: Transformation architecture</p>
                    <p className="text-[#817B73]">• Guardrail: Zero artificial scarcity</p>
                    <p className="text-[#817B73]">• Close: Peer-to-peer invitation</p>
                  </div>
                </div>

                <div className="editorial-card p-6 bg-white border-[#9B7775]/40">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#E9DAD5]/70 text-[#50434F] text-[11px] font-semibold mb-4">
                    Part 2 · Luma’s Automated Prompt Assembly
                  </span>
                  <h3 className="font-serif text-xl text-[#292722] mb-2">
                    Tailored to Your Saved Profile
                  </h3>
                  <p className="text-xs text-[#817B73] leading-relaxed mb-4">
                    When you make a request, the Luma Engine dynamically binds your saved business profile, audience, and voice rules into that human framework.
                  </p>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-2 text-xs">
                    <div className="font-medium text-[#292722]">Live Context Injection:</div>
                    <p className="text-[#728C75]">✓ Injects Bloom & Co. studio positioning</p>
                    <p className="text-[#728C75]">✓ Applies Warm, Confident voice lexicon</p>
                    <p className="text-[#728C75]">✓ Filters out forbidden hustle buzzwords</p>
                    <p className="text-[#728C75]">✓ Formats for Claude, ChatGPT, or Gemini</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          6. INTEGRATIONS SECTION (Milestones 1, 2 & 3 Showcase)
      ========================================================= */}
      <section id="integrations" className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E9E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B7775]">
                Seamless Ecosystem · Milestones 1, 2 & 3
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292722] mt-2 mb-4">
                Built to work inside the AI tools you already love.
              </h2>
              <p className="text-base text-[#817B73]">
                One unified Luma Engine powering our web studio, remote MCP server for Claude, ChatGPT Apps SDK connector, and Chrome Extension.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[
                {
                  name: 'Claude',
                  badge: 'Primary · Remote MCP Server',
                  desc: 'Connect Luma directly to Claude via OAuth 2.0 and our remote Model Context Protocol server.',
                  highlight: true,
                  link: '/integrations',
                },
                {
                  name: 'ChatGPT',
                  badge: 'Primary · OpenAI Apps SDK',
                  desc: 'Access your saved profile and expert frameworks inside ChatGPT via the Apps SDK and Chrome Extension.',
                  highlight: true,
                  link: '/integrations',
                },
                {
                  name: 'Google Gemini',
                  badge: 'Primary · Chrome Extension',
                  desc: 'Enhance rough prompts directly inside the Gemini composer with the inline Luma companion button.',
                  highlight: true,
                  link: '/extension',
                },
                {
                  name: 'Perplexity',
                  badge: 'Copy Destination Support',
                  desc: 'Generate deeply contextualized market and audience research prompts ready for Perplexity Pro.',
                  highlight: false,
                  link: '/builder',
                },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className={`editorial-card editorial-card-hover p-6 flex flex-col justify-between ${
                    platform.highlight ? 'border-[#9B7775]/45' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-serif text-2xl text-[#292722]">{platform.name}</span>
                      {platform.highlight && (
                        <span className="w-2 h-2 rounded-full bg-[#728C75]" title="Primary Milestone" />
                      )}
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#F2EEE8] text-[#50434F] text-[11px] font-medium mb-3">
                      {platform.badge}
                    </span>
                    <p className="text-xs text-[#817B73] leading-relaxed">{platform.desc}</p>
                  </div>

                  <Link
                    to={platform.link}
                    className="mt-6 pt-4 border-t border-[#E9E4DC] inline-flex items-center justify-between text-xs font-medium text-[#292722] hover:text-[#9B7775]"
                  >
                    <span>Explore Integration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Highlight Banner for Milestone 3 Chrome Extension Simulator */}
            <div className="editorial-panel p-6 sm:p-8 bg-[#F2EEE8] border border-[#E9E4DC] flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4DC] text-xs font-medium text-[#50434F]">
                  <Chrome className="w-3.5 h-3.5 text-[#9B7775]" />
                  Interactive Chrome Extension Simulator Included
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#292722]">
                  See the Luma button working live inside ChatGPT, Claude, and Gemini.
                </h3>
                <p className="text-sm text-[#817B73]">
                  Test the complete Milestone 3 browser workflow right now: type a rough prompt in the simulated chat bar, click the Luma button, and insert the enhanced prompt with one click.
                </p>
              </div>
              <Link
                to="/extension"
                className="px-6 py-3.5 rounded-xl bg-[#50434F] hover:bg-[#3F343E] text-white text-sm font-medium transition-colors shrink-0 inline-flex items-center gap-2"
              >
                <span>Launch Extension Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          7. FEATURES GRID SECTION
      ========================================================= */}
      <section id="features" className="py-20 sm:py-24 bg-[#F2EEE8]/50 border-b border-[#E9E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B7775]">
                Platform Capabilities
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292722] mt-2 mb-4">
                Everything you need for thoughtful AI conversations.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: UserCheck,
                  title: 'One-time personal profile',
                  desc: 'Save your business story, ideal client psychology, brand voice chips, and vocabulary guardrails once.',
                },
                {
                  icon: BookOpen,
                  title: 'Expert-written prompt library',
                  desc: 'Search and filter human-crafted frameworks across entrepreneurship, leadership, communication, and wellness.',
                },
                {
                  icon: Sparkles,
                  title: 'Context-aware prompt generation',
                  desc: 'Watch Luma merge your live profile with the ideal expert framework in under two seconds.',
                },
                {
                  icon: Blocks,
                  title: 'Claude integration',
                  desc: 'Built around a Remote MCP Server with OAuth 2.0 authentication and low-latency Claude Haiku context assembly.',
                },
                {
                  icon: MessageSquare,
                  title: 'ChatGPT integration',
                  desc: 'Designed for the OpenAI Apps SDK so your saved business context travels into every ChatGPT thread.',
                },
                {
                  icon: Chrome,
                  title: 'Chrome extension',
                  desc: 'Enhance and insert personalized prompts directly inside the ChatGPT, Claude, and Gemini chat bars.',
                },
                {
                  icon: BarChart3,
                  title: 'Usage tracking',
                  desc: 'Transparent monthly generation metering, weekly activity charts, and complete prompt history.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Future-ready premium plans',
                  desc: 'Architected for seamless Stripe subscription upgrades as your content and team needs grow.',
                },
              ].map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="editorial-card editorial-card-hover p-6 bg-white">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl text-[#292722] mb-2">{feat.title}</h3>
                    <p className="text-xs text-[#817B73] leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          8. PRICING SECTION (FREE $0 & PRO COMING SOON)
      ========================================================= */}
      <section id="pricing" className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E9E4DC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B7775]">
                Simple, Transparent Membership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292722] mt-2 mb-4">
                Start free today. Grow at your own pace.
              </h2>
              <p className="text-base text-[#817B73]">
                Experience personalized prompt intelligence with our generous free monthly allowance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* FREE PLAN */}
              <div className="editorial-panel p-8 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#817B73]">
                      FREE
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#EAEDE5] text-[#728C75] text-xs font-medium">
                      Available Now
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-serif text-5xl text-[#292722]">$0</span>
                    <span className="text-xs text-[#817B73]">/ month</span>
                  </div>
                  <p className="text-sm text-[#817B73] mb-6">
                    Everything you need to save your business profile and start creating tailored prompts.
                  </p>

                  <ul className="space-y-3 text-sm text-[#292722] border-t border-[#E9E4DC] pt-6">
                    {[
                      'Personal profile (Business, Audience, Voice & Goals)',
                      'Selected expert prompt frameworks',
                      'Limited monthly generations (20 / month)',
                      'Basic personalization across AI tools',
                      'Usage dashboard & prompt history',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#728C75] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/signup"
                  className="mt-8 w-full py-3.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-center text-sm font-medium transition-colors"
                >
                  Get Started Free
                </Link>
              </div>

              {/* PRO PLAN — COMING SOON */}
              <div className="editorial-panel p-8 bg-[#F2EEE8] border-[#9B7775]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#50434F]">
                      PRO
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#E9DAD5] text-[#50434F] text-xs font-semibold">
                      COMING SOON
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-serif text-4xl sm:text-5xl text-[#292722]">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-[#817B73] mb-6">
                    Designed for scaling founders, content-heavy studios, and multi-brand advisors.
                  </p>

                  <ul className="space-y-3 text-sm text-[#292722] border-t border-[#E9E4DC] pt-6">
                    {[
                      'Higher generation limits',
                      'Expanded expert library across all industries',
                      'Advanced personalization & multiple brand voices',
                      'Premium frameworks & deep launch sequences',
                      'Future premium features & priority MCP access',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#9B7775] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    joinProWaitlist('sarah@bloomandco.studio');
                  }}
                  className="mt-8 w-full py-3.5 rounded-xl bg-[#50434F] hover:bg-[#3F343E] text-white text-center text-sm font-medium transition-colors"
                >
                  Notify Me When Pro Launches
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          9. FAQ SECTION
      ========================================================= */}
      <section id="faq" className="py-20 sm:py-24 bg-[#F2EEE8]/50 border-b border-[#E9E4DC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B7775]">
                Frequently Asked Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-2">
                Everything you might wonder about Luma.
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={item.q}
                    className="editorial-card bg-white overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-lg text-[#292722]">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#817B73] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#9B7775]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm text-[#817B73] leading-relaxed border-t border-[#E9E4DC]/60">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          10. DETAILED EDITORIAL FOOTER (Contact + Newsletter + Links)
      ========================================================= */}
      <footer className="bg-[#FAF8F5] pt-16 pb-12 text-[#292722]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Split: Newsletter + Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-[#E9E4DC]">
            {/* Newsletter */}
            <div className="lg:col-span-5 editorial-card p-7 bg-[#F2EEE8]/70 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                  The Luma Note
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#292722] mt-2 mb-3">
                  Thoughtful prompts. Better possibilities.
                </h3>
                <p className="text-sm text-[#817B73] leading-relaxed mb-6">
                  Receive new human-written prompt frameworks and calm editorial guidance on using AI with intention.
                </p>
              </div>

              {newsletterSubmitted ? (
                <div className="p-4 rounded-xl bg-white border border-[#728C75]/40 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#728C75] shrink-0" />
                  <p className="text-xs text-[#292722]">
                    Thank you for subscribing. We’ve added <span className="font-medium">{newsletterEmail}</span> to our list.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address..."
                      className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-sm font-medium transition-colors shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                  {newsletterError && (
                    <p className="text-xs text-[#9B7775]">{newsletterError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 editorial-card p-7 bg-white">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                Direct Inquiry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#292722] mt-1 mb-2">
                Have a question? We'd love to hear from you.
              </h3>
              <p className="text-xs text-[#817B73] mb-5">
                Send a note to the Luma product team below.
              </p>

              {contactSubmitted ? (
                <div className="p-5 rounded-xl bg-[#EAEDE5] border border-[#728C75]/30 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#728C75] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#292722]">
                        Thank you, {contactName}. Your message has been sent.
                      </p>
                      <p className="text-xs text-[#817B73] mt-0.5">
                        Simulated local confirmation for {contactEmail}.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactEmail('');
                      setContactMessage('');
                    }}
                    className="text-xs text-[#50434F] underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#817B73] mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#817B73] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#817B73] mb-1">
                      Message
                    </label>
                    <textarea
                      rows={2}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="How can we help?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>
                  {contactError && <p className="text-xs text-[#9B7775]">{contactError}</p>}
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292722] hover:bg-[#50434F] text-white text-xs font-medium transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-[#E9E4DC] text-xs">
            <div className="col-span-2 md:col-span-2 space-y-3 pr-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F2EEE8] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-serif text-xl text-[#292722]">LumaPrompt.ai</span>
              </div>
              <p className="text-[#817B73] leading-relaxed max-w-xs">
                Personalized AI prompt intelligence built around your business, your audience, and your unmistakable voice.
              </p>
              <div className="flex items-center gap-2 pt-1">
                {['LinkedIn', 'Instagram', 'Editorial Journal'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      showToast(`${s} placeholder`, 'Social link placeholder for demo prototype.', 'info')
                    }
                    className="px-2.5 py-1 rounded-lg bg-[#F2EEE8] hover:bg-[#E9DAD5]/60 text-[11px] text-[#50434F] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="font-semibold uppercase tracking-wider text-[#292722]">Product</div>
              <ul className="space-y-2 text-[#817B73]">
                <li><Link to="/builder" className="hover:text-[#292722]">Smart Builder</Link></li>
                <li><Link to="/library" className="hover:text-[#292722]">Expert Prompt Library</Link></li>
                <li><Link to="/onboarding" className="hover:text-[#292722]">Personalization Wizard</Link></li>
                <li><Link to="/usage" className="hover:text-[#292722]">Pricing & Allowance</Link></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <div className="font-semibold uppercase tracking-wider text-[#292722]">Integrations</div>
              <ul className="space-y-2 text-[#817B73]">
                <li><Link to="/integrations" className="hover:text-[#292722]">Claude MCP Server</Link></li>
                <li><Link to="/integrations" className="hover:text-[#292722]">ChatGPT Apps SDK</Link></li>
                <li><Link to="/extension" className="hover:text-[#292722]">Chrome Extension</Link></li>
                <li><Link to="/extension" className="hover:text-[#292722]">Google Gemini Companion</Link></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <div className="font-semibold uppercase tracking-wider text-[#292722]">Company & Help</div>
              <ul className="space-y-2 text-[#817B73]">
                <li><Link to="/support" className="hover:text-[#292722]">Help & Support Center</Link></li>
                <li><Link to="/settings" className="hover:text-[#292722]">Account Settings</Link></li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalModal('privacy')}
                    className="hover:text-[#292722]"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalModal('terms')}
                    className="hover:text-[#292722]"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#817B73]">
            <p>© {new Date().getFullYear()} LumaPrompt.ai. Interactive Frontend Product Prototype.</p>
            <p>Designed with warmth, restraint & editorial clarity.</p>
          </div>
        </div>
      </footer>

      {/* Privacy / Terms Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292722]/40 backdrop-blur-[2px] p-4">
          <div className="bg-white border border-[#E9E4DC] rounded-[22px] max-w-lg w-full p-6 sm:p-8 shadow-editorial-lg relative">
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-[#817B73] hover:text-[#292722]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl text-[#292722] mb-3">
              {legalModal === 'privacy' ? 'Privacy Policy (Prototype Preview)' : 'Terms of Service (Prototype Preview)'}
            </h3>
            <p className="text-sm text-[#817B73] leading-relaxed mb-4">
              {legalModal === 'privacy'
                ? 'In this interactive frontend demonstration of LumaPrompt.ai, all profile information, brand voice settings, and generated prompts are stored locally in your browser via localStorage. No personal data is transmitted to external servers.'
                : 'This application is an interactive product prototype showcasing Milestone 1 (Luma Engine & MCP), Milestone 2 (Claude & ChatGPT Integrations), and Milestone 3 (Chrome Extension Simulator) for LumaPrompt.ai.'}
            </p>
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="px-5 py-2.5 rounded-xl bg-[#292722] text-white text-xs font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

