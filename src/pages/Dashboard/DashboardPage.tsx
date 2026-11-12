import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  User,
  Blocks,
  Copy,
  ExternalLink,
  CheckCircle2,
  Bookmark,
  Chrome,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { usePrompts } from '../../hooks/usePrompts';
import { useUsage } from '../../hooks/useUsage';
import { useApp } from '../../context/AppContext';
import { getPersonalizedRecommendations } from '../../data/templates';
import { GeneratedPrompt } from '../../types';

export const DashboardPage: React.FC = () => {
  const { profile } = useProfile();
  const { recentPrompts, setBuilderDraft, toggleSaveGeneratedPrompt } = usePrompts();
  const { usage, remaining, percentUsed } = useUsage();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [quickInput, setQuickInput] = useState('');

  const firstName = profile.name.split(' ')[0] || 'Sarah';
  const recommendations = getPersonalizedRecommendations(profile);

  const handleBuildQuickPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const requestToUse =
      quickInput.trim() ||
      'Write a short LinkedIn post announcing my new coaching program...';
    setBuilderDraft({
      roughRequest: requestToUse,
      objective: 'Content Creation',
      destination: 'Claude',
      autoGenerate: true,
    });
    navigate('/builder');
  };

  const handleOpenRecentPrompt = (prompt: GeneratedPrompt) => {
    setBuilderDraft({
      roughRequest: prompt.roughRequest,
      objective: prompt.objective,
      destination: prompt.destination,
      frameworkId: prompt.frameworkId,
      autoGenerate: false,
    });
    navigate('/builder');
  };

  const handleCopyPrompt = (prompt: GeneratedPrompt) => {
    navigator.clipboard?.writeText(prompt.fullPrompt);
    showToast('Prompt copied to clipboard', `Copied "${prompt.title}"`);
  };

  return (
    <div className="space-y-8">
      {/* 1. Dashboard Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
            {profile.businessName} · {profile.industry}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
            Good morning, {firstName}.
          </h1>
          <p className="text-sm sm:text-base text-[#817B73] mt-1">
            Let's make something meaningful today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/extension"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E9E4DC] hover:bg-[#F2EEE8] text-xs font-medium text-[#292722] transition-colors"
          >
            <Chrome className="w-4 h-4 text-[#9B7775]" />
            <span>Chrome Extension Simulator</span>
          </Link>
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F2EEE8] hover:bg-[#E9DAD5]/70 text-xs font-medium text-[#50434F] transition-colors"
          >
            <span>Voice: {profile.brandVoice.slice(0, 2).join(', ')}</span>
          </Link>
        </div>
      </div>

      {/* 2. Main Prompt Input Card & Usage Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Prompt Input Card */}
        <div className="lg:col-span-8 editorial-panel p-6 sm:p-8 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <label
                htmlFor="dashboard-prompt-input"
                className="font-serif text-2xl text-[#292722]"
              >
                What's on your mind today?
              </label>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAEDE5] text-[#728C75] text-[11px] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Using {firstName}’s Profile
              </span>
            </div>

            <form onSubmit={handleBuildQuickPrompt} className="space-y-4">
              <textarea
                id="dashboard-prompt-input"
                rows={3}
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="e.g. Write a short LinkedIn post announcing my new coaching program..."
                className="w-full p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm sm:text-base text-[#292722] placeholder:text-[#817B73]/70 focus:outline-none focus:border-[#9B7775] transition-colors"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#817B73]">
                  <span>Quick starters:</span>
                  {[
                    'Write a LinkedIn post about my launch, keep it short.',
                    'Draft a warm follow-up email after a discovery call.',
                  ].map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => setQuickInput(sample)}
                      className="px-2.5 py-1 rounded-lg bg-[#F2EEE8] hover:bg-[#E9DAD5]/60 text-[#292722] text-[11px] transition-colors"
                    >
                      “{sample.slice(0, 32)}...”
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-sm font-medium transition-all shadow-sm shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build My Prompt</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Usage Summary Card */}
        <div className="lg:col-span-4 editorial-panel p-6 bg-[#F2EEE8]/75 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#817B73]">
                Usage Summary
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white border border-[#E9E4DC] text-xs font-semibold text-[#50434F]">
                Current plan: {usage.plan}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-4">
              <div className="p-3 rounded-xl bg-white border border-[#E9E4DC] text-center">
                <span className="block font-serif text-2xl text-[#292722]">
                  {usage.monthlyAllowance}
                </span>
                <span className="text-[11px] text-[#817B73]">Allowance</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E9E4DC] text-center">
                <span className="block font-serif text-2xl text-[#9B7775]">
                  {usage.used}
                </span>
                <span className="text-[11px] text-[#817B73]">Used</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E9E4DC] text-center">
                <span className="block font-serif text-2xl text-[#728C75]">
                  {remaining}
                </span>
                <span className="text-[11px] text-[#817B73]">Remaining</span>
              </div>
            </div>

            <div className="space-y-1.5 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#817B73]">Monthly generation meter</span>
                <span className="font-medium text-[#292722]">{percentUsed}%</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E9E4DC]">
                <div
                  className="h-full bg-[#9B7775] rounded-full transition-all duration-300"
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E9E4DC] flex items-center justify-between text-xs">
            <span className="text-[#817B73]">Resets {usage.resetDate}</span>
            <Link
              to="/usage"
              className="font-medium text-[#50434F] hover:text-[#9B7775] inline-flex items-center gap-1"
            >
              Manage Plan <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Quick Action Cards */}
      <div>
        <h2 className="font-serif text-xl text-[#292722] mb-3.5">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Build a prompt',
              desc: 'Transform a rough thought into a structured prompt.',
              icon: Sparkles,
              href: '/builder',
              accent: 'bg-[#E9DAD5]/60 text-[#50434F]',
            },
            {
              title: 'Explore prompt library',
              desc: 'Browse 18 human-written frameworks by industry.',
              icon: BookOpen,
              href: '/library',
              accent: 'bg-[#F2EEE8] text-[#9B7775]',
            },
            {
              title: 'Edit my profile',
              desc: `Update ${profile.businessName} context & brand voice.`,
              icon: User,
              href: '/profile',
              accent: 'bg-[#EAEDE5] text-[#728C75]',
            },
            {
              title: 'Connect AI tools',
              desc: 'Manage Claude MCP, ChatGPT Apps SDK & Gemini.',
              icon: Blocks,
              href: '/integrations',
              accent: 'bg-[#EFECEF] text-[#50434F]',
            },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.href}
                className="editorial-card editorial-card-hover p-5 flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 ${action.accent}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-[#292722] group-hover:text-[#9B7775] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-[#817B73] mt-1 leading-relaxed">{action.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E9E4DC]/70 flex items-center justify-between text-xs font-medium text-[#292722]">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9B7775] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Recent Prompts & Personalized Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Prompts */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#292722]">Recent Prompts</h2>
              <p className="text-xs text-[#817B73]">
                Your latest personalized generations ready to copy or reopen.
              </p>
            </div>
            <Link
              to="/saved"
              className="text-xs font-medium text-[#9B7775] hover:text-[#50434F]"
            >
              View Saved →
            </Link>
          </div>

          <div className="space-y-3">
            {recentPrompts.slice(0, 4).map((prompt) => (
              <div
                key={prompt.id}
                className="editorial-card p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg text-[#292722] truncate">
                      {prompt.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-[#F2EEE8] text-[10px] font-medium text-[#50434F] shrink-0">
                      {prompt.destination}
                    </span>
                  </div>
                  <p className="text-xs text-[#817B73] truncate">
                    “{prompt.roughRequest}”
                  </p>
                  <p className="text-[11px] text-[#817B73]">
                    Framework: <span className="text-[#292722]">{prompt.frameworkTitle}</span> · {prompt.createdAt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleSaveGeneratedPrompt(prompt.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      prompt.isSaved
                        ? 'bg-[#E9DAD5]/50 border-[#9B7775] text-[#50434F]'
                        : 'bg-[#FAF8F5] border-[#E9E4DC] text-[#817B73] hover:text-[#292722]'
                    }`}
                    title={prompt.isSaved ? 'Saved' : 'Save prompt'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(prompt)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-xs font-medium text-[#292722] transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#9B7775]" />
                    <span>Copy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenRecentPrompt(prompt)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#292722] hover:bg-[#50434F] text-white text-xs font-medium transition-colors"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#292722]">
                Recommended for {profile.businessName}
              </h2>
              <p className="text-xs text-[#817B73]">
                Curated for <span className="font-medium text-[#292722]">{profile.industry}</span> & your active goals.
              </p>
            </div>
            <Link
              to="/profile"
              className="text-xs font-medium text-[#9B7775] hover:text-[#50434F]"
            >
              Adjust Profile →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="editorial-card editorial-card-hover p-5 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F2EEE8] text-[#50434F] text-[10px] font-semibold">
                      {rec.category}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#9B7775]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#292722] mb-1">
                    {rec.title}
                  </h3>
                  <p className="text-[11px] text-[#728C75] font-medium mb-2">
                    {rec.reason}
                  </p>
                  <p className="text-xs text-[#817B73] line-clamp-2 leading-relaxed">
                    “{rec.roughRequest}”
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBuilderDraft({
                      roughRequest: rec.roughRequest,
                      objective: rec.objective,
                      destination: 'Claude',
                      frameworkId: rec.frameworkId,
                      autoGenerate: true,
                    });
                    navigate('/builder');
                  }}
                  className="mt-4 pt-3 border-t border-[#E9E4DC] w-full flex items-center justify-between text-xs font-medium text-[#292722] hover:text-[#9B7775]"
                >
                  <span>Build with this template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

