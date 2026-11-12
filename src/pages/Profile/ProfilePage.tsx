import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  Mic,
  Target,
  Edit3,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../context/AppContext';

const VOICE_OPTIONS = [
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
  'Grow brand visibility',
  'Generate qualified leads',
  'Create content',
  'Launch digital products',
  'Grow my business',
  'Improve sales',
  'Build my personal brand',
  'Improve communication',
  'Save time',
  'Develop my career',
];

const INDUSTRIES = [
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

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, resetProfileToDefault } = useProfile();
  const { showToast } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(true);
  const [draft, setDraft] = useState({ ...profile });

  useEffect(() => {
    setDraft({ ...profile });
  }, [profile]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'voice') {
      const el = document.getElementById('profile-voice-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'goals') {
      const el = document.getElementById('profile-goals-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.search]);

  const toggleVoice = (chip: string) => {
    setDraft((prev) => {
      const exists = prev.brandVoice.includes(chip);
      return {
        ...prev,
        brandVoice: exists
          ? prev.brandVoice.filter((c) => c !== chip)
          : [...prev.brandVoice, chip],
      };
    });
  };

  const toggleGoal = (goal: string) => {
    setDraft((prev) => {
      const exists = prev.goals.includes(goal);
      return {
        ...prev,
        goals: exists ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
      };
    });
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateProfile(draft);
    showToast(
      'Profile changes saved',
      `Updated ${draft.businessName} context across Smart Builder, Recommendations & Extension.`
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
            Personalization Engine · Saved Context
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
            My Business & Voice Profile
          </h1>
          <p className="text-sm text-[#817B73] mt-1">
            Changes saved here immediately calibrate your Smart Builder prompts and dashboard recommendations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E9E4DC] bg-white hover:bg-[#F2EEE8] text-xs font-medium text-[#292722]"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#9B7775]" />
            <span>{isEditing ? 'Preview Mode' : 'Edit Profile'}</span>
          </button>

          <button
            type="button"
            onClick={resetProfileToDefault}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E9E4DC] bg-white hover:bg-[#F2EEE8] text-xs font-medium text-[#817B73] hover:text-[#292722]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Profile</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. BUSINESS SECTION */}
        <section className="editorial-panel p-6 sm:p-8 bg-white space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
            <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#292722]">Business</h2>
              <p className="text-xs text-[#817B73]">
                Core identity, industry positioning, and current stage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.businessName}
                onChange={(e) => setDraft({ ...draft, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Industry
              </label>
              <select
                disabled={!isEditing}
                value={draft.industry}
                onChange={(e) => setDraft({ ...draft, industry: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Website
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.website}
                onChange={(e) => setDraft({ ...draft, website: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Business Stage
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.businessStage}
                onChange={(e) => setDraft({ ...draft, businessStage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#292722] mb-1.5">
              Business Description
            </label>
            <textarea
              rows={3}
              disabled={!isEditing}
              value={draft.businessDescription}
              onChange={(e) => setDraft({ ...draft, businessDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
            />
          </div>
        </section>

        {/* 2. AUDIENCE SECTION */}
        <section className="editorial-panel p-6 sm:p-8 bg-white space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
            <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#292722]">Audience</h2>
              <p className="text-xs text-[#817B73]">
                Who you serve, their pain points, and the transformation you deliver.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Target Audience
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.targetAudience}
                onChange={(e) => setDraft({ ...draft, targetAudience: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Age Range
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.audienceAgeRange}
                onChange={(e) => setDraft({ ...draft, audienceAgeRange: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Pain Points & Customer Challenges
              </label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={draft.customerChallenges}
                onChange={(e) => setDraft({ ...draft, customerChallenges: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Desired Transformation
              </label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={draft.transformationProvided}
                onChange={(e) =>
                  setDraft({ ...draft, transformationProvided: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>
          </div>
        </section>

        {/* 3. BRAND VOICE SECTION */}
        <section
          id="profile-voice-section"
          className="editorial-panel p-6 sm:p-8 bg-white space-y-5"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
            <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#292722]">Brand Voice</h2>
              <p className="text-xs text-[#817B73]">
                Tone attributes, signature vocabulary, and anti-cliché rules.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#292722] mb-2">
              Selected Voice Chips
            </label>
            <div className="flex flex-wrap gap-2">
              {VOICE_OPTIONS.map((chip) => {
                const selected = draft.brandVoice.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    disabled={!isEditing}
                    onClick={() => toggleVoice(chip)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Words to Use
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.wordsToUse}
                onChange={(e) => setDraft({ ...draft, wordsToUse: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Words to Avoid
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={draft.wordsToAvoid}
                onChange={(e) => setDraft({ ...draft, wordsToAvoid: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#292722] mb-1.5">
              Extra Editorial Instructions
            </label>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={draft.additionalInstructions}
              onChange={(e) =>
                setDraft({ ...draft, additionalInstructions: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] disabled:opacity-75 focus:outline-none focus:border-[#9B7775]"
            />
          </div>
        </section>

        {/* 4. GOALS SECTION */}
        <section
          id="profile-goals-section"
          className="editorial-panel p-6 sm:p-8 bg-white space-y-5"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
            <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#292722]">Goals</h2>
              <p className="text-xs text-[#817B73]">
                Strategic objectives guiding your prompt recommendations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {GOAL_OPTIONS.map((goal) => {
              const selected = draft.goals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  disabled={!isEditing}
                  onClick={() => toggleGoal(goal)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
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

          <div className="pt-4 border-t border-[#E9E4DC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                handleSave();
                navigate('/builder');
              }}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#50434F] hover:text-[#9B7775]"
            >
              <Sparkles className="w-4 h-4 text-[#9B7775]" />
              <span>Save & Test Updated Profile in Smart Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

