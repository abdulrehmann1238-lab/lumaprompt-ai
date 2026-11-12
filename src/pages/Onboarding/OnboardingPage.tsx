import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Building2,
  Users,
  Mic,
  Target,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../context/AppContext';

const INDUSTRY_OPTIONS = [
  'Business Coaching',
  'Coaching',
  'Consulting',
  'E-commerce',
  'Beauty & Wellness',
  'Marketing',
  'Education',
  'Technology',
  'Creative Services',
  'Other',
];

const STAGE_OPTIONS = [
  'Idea & Pre-Launch',
  'Early Stage (0–2 years)',
  'Established & Scaling (2–5 years)',
  'Mature Studio / Enterprise (5+ years)',
];

const VOICE_CHIPS = [
  'Warm',
  'Confident',
  'Professional',
  'Conversational',
  'Sophisticated',
  'Playful',
  'Educational',
  'Bold',
  'Empathetic',
];

const GOAL_OPTIONS = [
  'Grow my business',
  'Generate leads',
  'Create better content',
  'Improve sales',
  'Build my personal brand',
  'Improve communication',
  'Save time',
  'Develop my career',
  'Grow brand visibility',
  'Generate qualified leads',
  'Launch digital products',
];

export const OnboardingPage: React.FC = () => {
  const { profile, updateProfile } = useProfile();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({ ...profile });
  const [savingAnimation, setSavingAnimation] = useState(false);

  const toggleVoiceChip = (chip: string) => {
    setFormData((prev) => {
      const exists = prev.brandVoice.includes(chip);
      const next = exists
        ? prev.brandVoice.filter((c) => c !== chip)
        : [...prev.brandVoice, chip];
      return { ...prev, brandVoice: next };
    });
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => {
      const exists = prev.goals.includes(goal);
      const next = exists
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal];
      return { ...prev, goals: next };
    });
  };

  const handleSaveProfile = () => {
    updateProfile({
      ...formData,
      onboardingCompleted: true,
    });
    setSavingAnimation(true);
    setTimeout(() => {
      showToast(
        'Profile saved & active',
        `${formData.businessName} context now powers your entire Luma workspace.`
      );
      navigate('/dashboard');
    }, 1350);
  };

  const stepsMeta = [
    { num: 1, label: 'Your Business', icon: Building2 },
    { num: 2, label: 'Your Audience', icon: Users },
    { num: 3, label: 'Your Brand Voice', icon: Mic },
    { num: 4, label: 'Your Goals', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#292722] flex flex-col justify-between py-6 px-4 sm:px-8">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F2EEE8] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl leading-none text-[#292722]">Luma</span>
            <span className="text-[10px] text-[#817B73]">Profile Personalization</span>
          </div>
        </Link>

        <Link
          to="/dashboard"
          className="text-xs font-medium text-[#817B73] hover:text-[#292722]"
        >
          Skip to Dashboard →
        </Link>
      </div>

      {/* Main Wizard Container */}
      <div className="max-w-3xl w-full mx-auto my-8">
        {/* Progress Indicator at Top */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-3">
            {stepsMeta.map((s) => {
              const Icon = s.icon;
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(s.num as 1 | 2 | 3 | 4)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'bg-white border-[#9B7775] shadow-sm'
                      : isDone
                      ? 'bg-[#EAEDE5]/60 border-[#728C75]/40'
                      : 'bg-[#F2EEE8]/60 border-[#E9E4DC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#817B73]">
                      Step 0{s.num}
                    </span>
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 text-[#728C75]" />
                    ) : (
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isCurrent ? 'text-[#9B7775]' : 'text-[#817B73]'
                        }`}
                      />
                    )}
                  </div>
                  <p className="text-xs font-medium text-[#292722] truncate">{s.label}</p>
                </button>
              );
            })}
          </div>
          <div className="w-full h-1.5 bg-[#E9E4DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9B7775] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Saving Confirmation Animation Overlay */}
        {savingAnimation ? (
          <div className="editorial-panel p-12 bg-white text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EAEDE5] text-[#728C75] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h2 className="font-serif text-3xl text-[#292722]">
              Your profile is ready, {formData.name.split(' ')[0]}.
            </h2>
            <p className="text-sm text-[#817B73] max-w-md mx-auto">
              Calibrating Smart Builder, human frameworks, and AI integrations around{' '}
              <span className="font-medium text-[#292722]">{formData.businessName}</span>...
            </p>
          </div>
        ) : (
          <div className="editorial-panel p-6 sm:p-10 bg-white">
            {/* STEP 1 — YOUR BUSINESS */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                    Step 1 of 4 — Your Business
                  </span>
                  <h1 className="font-serif text-3xl text-[#292722] mt-1">
                    Tell Luma about your business.
                  </h1>
                  <p className="text-xs sm:text-sm text-[#817B73] mt-1">
                    Save this once so you never have to re-introduce your work to AI again.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Business name
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      placeholder="e.g. Bloom & Co."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Website
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      placeholder="https://www.bloomandco.studio"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    >
                      {INDUSTRY_OPTIONS.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Business stage
                    </label>
                    <select
                      value={formData.businessStage}
                      onChange={(e) =>
                        setFormData({ ...formData, businessStage: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    >
                      {STAGE_OPTIONS.map((stg) => (
                        <option key={stg} value={stg}>
                          {stg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Business description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.businessDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, businessDescription: e.target.value })
                    }
                    placeholder="Describe what your business does and what makes your approach distinct..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                  />
                </div>
              </div>
            )}

            {/* STEP 2 — YOUR AUDIENCE */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                    Step 2 of 4 — Your Audience
                  </span>
                  <h1 className="font-serif text-3xl text-[#292722] mt-1">
                    Who are you speaking to?
                  </h1>
                  <p className="text-xs sm:text-sm text-[#817B73] mt-1">
                    Luma uses your audience’s real challenges and desires to make every prompt deeply relevant.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Who do you serve?
                    </label>
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) =>
                        setFormData({ ...formData, targetAudience: e.target.value })
                      }
                      placeholder="Women entrepreneurs and early-stage founders."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Audience age range
                    </label>
                    <input
                      type="text"
                      value={formData.audienceAgeRange}
                      onChange={(e) =>
                        setFormData({ ...formData, audienceAgeRange: e.target.value })
                      }
                      placeholder="28–45"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Customer challenges
                  </label>
                  <textarea
                    rows={3}
                    value={formData.customerChallenges}
                    onChange={(e) =>
                      setFormData({ ...formData, customerChallenges: e.target.value })
                    }
                    placeholder="What keeps your ideal client stuck or frustrated?"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Transformation you provide
                  </label>
                  <textarea
                    rows={3}
                    value={formData.transformationProvided}
                    onChange={(e) =>
                      setFormData({ ...formData, transformationProvided: e.target.value })
                    }
                    placeholder="How does their business or life look after working with you?"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                  />
                </div>
              </div>
            )}

            {/* STEP 3 — YOUR BRAND VOICE */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                    Step 3 of 4 — Your Brand Voice
                  </span>
                  <h1 className="font-serif text-3xl text-[#292722] mt-1">
                    How should your brand sound?
                  </h1>
                  <p className="text-xs sm:text-sm text-[#817B73] mt-1">
                    Select the voice attributes and vocabulary rules Luma should enforce in every prompt.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-2">
                    Select your brand voice attributes (choose multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {VOICE_CHIPS.map((chip) => {
                      const selected = formData.brandVoice.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleVoiceChip(chip)}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                            selected
                              ? 'bg-[#50434F] text-white border-[#50434F]'
                              : 'bg-[#FAF8F5] text-[#292722] border-[#E9E4DC] hover:bg-[#F2EEE8]'
                          }`}
                        >
                          {selected ? `✓ ${chip}` : chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Words to use
                    </label>
                    <input
                      type="text"
                      value={formData.wordsToUse}
                      onChange={(e) =>
                        setFormData({ ...formData, wordsToUse: e.target.value })
                      }
                      placeholder="intentional, clarity, signature presence..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Words to avoid
                    </label>
                    <input
                      type="text"
                      value={formData.wordsToAvoid}
                      onChange={(e) =>
                        setFormData({ ...formData, wordsToAvoid: e.target.value })
                      }
                      placeholder="hustle, grind, 10x, skyrocket..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Additional instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.additionalInstructions}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalInstructions: e.target.value })
                    }
                    placeholder="Editorial pacing preferences, formatting notes..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                  />
                </div>
              </div>
            )}

            {/* STEP 4 — YOUR GOALS & COMPLETE PROFILE SUMMARY */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                    Step 4 of 4 — Your Goals & Summary
                  </span>
                  <h1 className="font-serif text-3xl text-[#292722] mt-1">
                    What are you focusing on right now?
                  </h1>
                  <p className="text-xs sm:text-sm text-[#817B73] mt-1">
                    Select your current priorities and review your complete profile before saving.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-2">
                    Selectable objectives
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {GOAL_OPTIONS.map((goal) => {
                      const selected = formData.goals.includes(goal);
                      return (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleGoal(goal)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                            selected
                              ? 'bg-[#9B7775] text-white border-[#9B7775]'
                              : 'bg-[#FAF8F5] text-[#292722] border-[#E9E4DC] hover:bg-[#F2EEE8]'
                          }`}
                        >
                          {selected ? `✓ ${goal}` : goal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Complete Profile Summary Before Saving */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-[#E9E4DC] pb-2.5">
                    <span className="font-semibold uppercase tracking-wider text-[#50434F]">
                      Complete Profile Summary
                    </span>
                    <span className="text-[#728C75] font-medium">Ready to power Luma</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[#817B73]">Business:</span>{' '}
                      <strong className="text-[#292722]">
                        {formData.businessName} ({formData.industry})
                      </strong>
                      <p className="text-[#817B73] mt-0.5 line-clamp-2">
                        {formData.businessDescription}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#817B73]">Audience:</span>{' '}
                      <strong className="text-[#292722]">
                        {formData.targetAudience} ({formData.audienceAgeRange})
                      </strong>
                      <p className="text-[#817B73] mt-0.5 line-clamp-2">
                        {formData.transformationProvided}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E9E4DC]/70 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[#817B73]">Brand Voice: </span>
                      <strong className="text-[#292722]">
                        {formData.brandVoice.join(', ')}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#817B73]">Active Goals: </span>
                      <strong className="text-[#292722]">{formData.goals.length} selected</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Wizard Controls */}
            <div className="mt-8 pt-6 border-t border-[#E9E4DC] flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E9E4DC] bg-white hover:bg-[#FAF8F5] text-xs font-medium text-[#292722]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous Step
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3 | 4)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#50434F] hover:bg-[#3F343E] text-white text-sm font-medium transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#E9DAD5]" />
                  <span>Save My Profile</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-[#817B73]">
        You can edit your business profile, voice chips, and goals at any time from your dashboard.
      </div>
    </div>
  );
};

