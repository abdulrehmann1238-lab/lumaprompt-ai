import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Check,
  CheckCircle2,
  Copy,
  Edit3,
  RefreshCw,
  Bookmark,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sliders,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { usePrompts } from '../../hooks/usePrompts';
import { useUsage } from '../../hooks/useUsage';
import { useApp } from '../../context/AppContext';
import { buildPersonalizedPrompt, matchExpertFramework } from '../../utils/promptEngine';
import { AIDestination, GeneratedPrompt, PromptObjective } from '../../types';

const OBJECTIVES: PromptObjective[] = [
  'Content Creation',
  'Marketing',
  'Sales',
  'Business Strategy',
  'Communication',
  'Personal Development',
];

const DESTINATIONS: AIDestination[] = ['Claude', 'ChatGPT', 'Gemini', 'Copy Only'];

const GENERATION_STAGES = [
  'Understanding your request.',
  'Applying your business profile.',
  'Matching expert-written frameworks.',
  'Structuring your final prompt.',
];

export const SmartBuilderPage: React.FC = () => {
  const { profile } = useProfile();
  const {
    library,
    builderDraft,
    setBuilderDraft,
    addGeneratedPrompt,
    updateGeneratedPrompt,
    toggleSaveGeneratedPrompt,
  } = usePrompts();
  const { incrementUsage } = useUsage();
  const { showToast } = useApp();

  const [roughRequest, setRoughRequest] = useState(
    builderDraft.roughRequest || 'Write a LinkedIn post about my launch, keep it short.'
  );
  const [objective, setObjective] = useState<PromptObjective>(
    builderDraft.objective || 'Content Creation'
  );
  const [destination, setDestination] = useState<AIDestination>(
    builderDraft.destination || 'Claude'
  );
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>(
    builderDraft.frameworkId || ''
  );

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [variationIndex, setVariationIndex] = useState(0);

  // Current assembled prompt
  const [currentOutput, setCurrentOutput] = useState<GeneratedPrompt>(() =>
    buildPersonalizedPrompt({
      roughRequest:
        builderDraft.roughRequest || 'Write a LinkedIn post about my launch, keep it short.',
      profile,
      objective: builderDraft.objective || 'Content Creation',
      destination: builderDraft.destination || 'Claude',
      frameworkId: builderDraft.frameworkId,
      variationIndex: 0,
    })
  );

  // Edit mode state
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [editableText, setEditableText] = useState(currentOutput.fullPrompt);

  // Collapsible "Show what Luma added" comparison
  const [showWhatLumaAdded, setShowWhatLumaAdded] = useState(true);

  const firstName = profile.name.split(' ')[0] || 'Sarah';
  const matchedFramework = matchExpertFramework(
    roughRequest,
    objective,
    selectedFrameworkId || undefined
  );

  const runGenerationSequence = useCallback(
    (nextVariation = 0, customDest?: AIDestination) => {
      const targetDest = customDest || destination;
      const result = buildPersonalizedPrompt({
        roughRequest,
        profile,
        objective,
        destination: targetDest,
        frameworkId: selectedFrameworkId || undefined,
        variationIndex: nextVariation,
      });

      const allowed = incrementUsage(result.title, targetDest, result.frameworkTitle);
      if (!allowed) return;

      setIsGenerating(true);
      setActiveStageIndex(0);
      setIsEditingPrompt(false);

      const t1 = setTimeout(() => setActiveStageIndex(1), 420);
      const t2 = setTimeout(() => setActiveStageIndex(2), 860);
      const t3 = setTimeout(() => setActiveStageIndex(3), 1300);
      const t4 = setTimeout(() => {
        setIsGenerating(false);
        setCurrentOutput(result);
        setEditableText(result.fullPrompt);
        addGeneratedPrompt(result);
      }, 1750);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    },
    [
      roughRequest,
      profile,
      objective,
      destination,
      selectedFrameworkId,
      incrementUsage,
      addGeneratedPrompt,
    ]
  );

  // If navigated from Dashboard or Library with autoGenerate = true, trigger sequence
  useEffect(() => {
    if (builderDraft.autoGenerate) {
      setBuilderDraft((prev) => ({ ...prev, autoGenerate: false }));
      runGenerationSequence(0);
    }
  }, [builderDraft.autoGenerate, setBuilderDraft, runGenerationSequence]);

  // Keep output updated when profile changes
  useEffect(() => {
    if (!isGenerating && !isEditingPrompt) {
      const refreshed = buildPersonalizedPrompt({
        roughRequest,
        profile,
        objective,
        destination,
        frameworkId: selectedFrameworkId || undefined,
        variationIndex,
      });
      setCurrentOutput((prev) => ({
        ...refreshed,
        id: prev.id,
        isSaved: prev.isSaved,
      }));
      setEditableText(refreshed.fullPrompt);
    }
  }, [profile]);

  const handleCopyFullPrompt = () => {
    const textToCopy = isEditingPrompt ? editableText : currentOutput.fullPrompt;
    navigator.clipboard?.writeText(textToCopy);
    showToast(
      'Full prompt copied to clipboard',
      `Ready to paste into ${currentOutput.destination === 'Copy Only' ? 'your AI chat' : currentOutput.destination}.`
    );
  };

  const handleToggleEdit = () => {
    if (isEditingPrompt) {
      // Save edits
      setCurrentOutput((prev) => ({ ...prev, fullPrompt: editableText }));
      updateGeneratedPrompt(currentOutput.id, editableText);
      setIsEditingPrompt(false);
      showToast('Prompt edits saved', 'Your custom adjustments have been applied.');
    } else {
      setEditableText(currentOutput.fullPrompt);
      setIsEditingPrompt(true);
    }
  };

  const handleRegenerate = () => {
    const nextVar = variationIndex + 1;
    setVariationIndex(nextVar);
    runGenerationSequence(nextVar);
    showToast(
      'Generating fresh variation',
      'Applying a new editorial angle and hook structure.'
    );
  };

  const handleSavePrompt = () => {
    const nextSaved = !currentOutput.isSaved;
    setCurrentOutput((prev) => ({ ...prev, isSaved: nextSaved }));
    toggleSaveGeneratedPrompt(currentOutput.id);
    if (nextSaved) {
      showToast('Saved to your workspace', `"${currentOutput.title}" added to Saved Prompts.`);
    }
  };

  const handleCycleDestination = () => {
    const idx = DESTINATIONS.indexOf(destination);
    const nextDest = DESTINATIONS[(idx + 1) % DESTINATIONS.length];
    setDestination(nextDest);
    const updated = buildPersonalizedPrompt({
      roughRequest,
      profile,
      objective,
      destination: nextDest,
      frameworkId: selectedFrameworkId || undefined,
      variationIndex,
    });
    setCurrentOutput((prev) => ({
      ...updated,
      id: prev.id,
      isSaved: prev.isSaved,
    }));
    setEditableText(updated.fullPrompt);
    showToast('Destination updated', `Prompt tuned for ${nextDest}.`);
  };

  const handleStartAnother = () => {
    setRoughRequest('');
    setSelectedFrameworkId('');
    setIsEditingPrompt(false);
    const inputEl = document.getElementById('smart-builder-textarea');
    if (inputEl) inputEl.focus();
    showToast('Ready for a new thought', 'Enter your next request on the left.');
  };

  return (
    <div className="space-y-8">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
            Luma Prompt Engine · Milestone 1 Core
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
            Smart Prompt Builder
          </h1>
          <p className="text-sm text-[#817B73] mt-1">
            Combine your saved profile and expert frameworks into a structured, ready-to-run prompt.
          </p>
        </div>

        <Link
          to="/library"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#50434F] hover:text-[#9B7775]"
        >
          <span>Browse 18 Expert Frameworks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Two-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* =====================================================
            LEFT COLUMN: REQUEST EDITOR
        ===================================================== */}
        <div className="lg:col-span-5 editorial-panel p-6 sm:p-7 bg-white space-y-6">
          <div>
            <label
              htmlFor="smart-builder-textarea"
              className="block font-serif text-2xl text-[#292722] mb-2"
            >
              What would you like to create?
            </label>
            <textarea
              id="smart-builder-textarea"
              rows={4}
              value={roughRequest}
              onChange={(e) => setRoughRequest(e.target.value)}
              placeholder="e.g. Write a LinkedIn post about my launch, keep it short."
              className="w-full p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm sm:text-base text-[#292722] focus:outline-none focus:border-[#9B7775] transition-colors leading-relaxed"
            />
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-[#817B73]">Try:</span>
              {[
                'Write a LinkedIn post about my launch, keep it short.',
                'Create a 5-slide Instagram carousel sharing my brand story.',
                'Write a warm boundary email for an out-of-scope client request.',
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setRoughRequest(preset)}
                  className="px-2 py-0.5 rounded-md bg-[#F2EEE8] hover:bg-[#E9DAD5]/70 text-[11px] text-[#50434F] transition-colors"
                >
                  {preset.slice(0, 26)}...
                </button>
              ))}
            </div>
          </div>

          {/* Objective Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#817B73] mb-2">
              Objective Selector
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {OBJECTIVES.map((obj) => {
                const active = objective === obj;
                return (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => setObjective(obj)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                      active
                        ? 'bg-[#292722] text-white border-[#292722]'
                        : 'bg-[#FAF8F5] text-[#292722] border-[#E9E4DC] hover:bg-[#F2EEE8]'
                    }`}
                  >
                    {obj}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destination Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#817B73] mb-2">
              Destination Selector
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DESTINATIONS.map((dest) => {
                const active = destination === dest;
                return (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setDestination(dest)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-center transition-all border ${
                      active
                        ? 'bg-[#50434F] text-white border-[#50434F]'
                        : 'bg-[#FAF8F5] text-[#292722] border-[#E9E4DC] hover:bg-[#F2EEE8]'
                    }`}
                  >
                    {dest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expert Framework Selector (Auto-Matched or Manual Override) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="framework-select"
                className="text-xs font-semibold uppercase tracking-wider text-[#817B73]"
              >
                Expert Framework
              </label>
              <span className="text-[11px] text-[#728C75] font-medium">
                {selectedFrameworkId ? 'Manually selected' : 'Auto-matched by intent'}
              </span>
            </div>
            <select
              id="framework-select"
              value={selectedFrameworkId}
              onChange={(e) => setSelectedFrameworkId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
            >
              <option value="">
                Auto-Match ({matchedFramework.title})
              </option>
              {library.map((fw) => (
                <option key={fw.id} value={fw.id}>
                  {fw.title} ({fw.category})
                </option>
              ))}
            </select>
          </div>

          {/* Saved Profile Indicator Box */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#728C75]" />
                <span className="text-xs font-semibold text-[#292722]">
                  Using {firstName}'s Business Profile.
                </span>
              </div>
              <Link
                to="/profile"
                className="text-xs font-medium text-[#9B7775] hover:text-[#50434F] underline"
              >
                Edit Profile
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-1.5 text-xs text-[#817B73] pt-1 border-t border-[#E9E4DC]/80">
              <div>
                <strong className="text-[#292722]">Business:</strong> {profile.businessName} ({profile.industry})
              </div>
              <div>
                <strong className="text-[#292722]">Audience:</strong> {profile.targetAudience}
              </div>
              <div>
                <strong className="text-[#292722]">Brand Voice:</strong>{' '}
                {profile.brandVoice.join(', ')}
              </div>
            </div>
          </div>

          {/* Main CTA */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={() => runGenerationSequence(variationIndex)}
            className="w-full py-4 px-6 rounded-xl bg-[#9B7775] hover:bg-[#886563] disabled:opacity-60 text-white text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {isGenerating ? 'Building Your Expert Prompt...' : 'Build My Expert Prompt'}
            </span>
          </button>
        </div>

        {/* =====================================================
            RIGHT COLUMN: ENHANCED PROMPT OUTPUT
        ===================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {isGenerating ? (
            /* 4-Stage Sequential Processing Animation */
            <div className="editorial-panel p-8 sm:p-12 bg-white min-h-[480px] flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#F2EEE8] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775] mb-5">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#292722] mb-2">
                Assembling your personalized prompt...
              </h2>
              <p className="text-xs text-[#817B73] mb-8 max-w-md">
                Combining {profile.businessName} context with the{' '}
                <span className="text-[#292722] font-medium">{matchedFramework.title}</span> framework.
              </p>

              <div className="max-w-md w-full space-y-3 text-left">
                {GENERATION_STAGES.map((stageLabel, idx) => {
                  const isCompleted = activeStageIndex > idx;
                  const isCurrent = activeStageIndex === idx;
                  return (
                    <div
                      key={stageLabel}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-[#FAF8F5] border-[#9B7775] shadow-sm'
                          : isCompleted
                          ? 'bg-[#EAEDE5]/50 border-[#728C75]/30'
                          : 'bg-[#FAF8F5]/50 border-[#E9E4DC] opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            isCompleted
                              ? 'bg-[#728C75] text-white'
                              : isCurrent
                              ? 'bg-[#9B7775] text-white'
                              : 'bg-[#E9E4DC] text-[#817B73]'
                          }`}
                        >
                          {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[#292722]">
                          {stageLabel}
                        </span>
                      </div>
                      {isCurrent && (
                        <span className="text-[11px] text-[#9B7775] font-medium">
                          In progress...
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[11px] text-[#728C75] font-medium">Done</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Assembled Output Panel */}
              <div className="editorial-panel p-6 sm:p-8 bg-white space-y-6">
                {/* Header & Metadata Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E9E4DC]">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#728C75] mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Your prompt is ready.</span>
                    </div>
                    <h2 className="font-serif text-2xl text-[#292722]">
                      {currentOutput.title}
                    </h2>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F2EEE8] text-[#50434F] font-medium">
                      Framework: {currentOutput.frameworkTitle}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#EAEDE5] text-[#728C75] font-medium">
                      Profile: {profile.businessName}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#E9DAD5]/60 text-[#50434F] font-medium">
                      Destination: {currentOutput.destination}
                    </span>
                  </div>
                </div>

                {/* Output Controls Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyFullPrompt}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium transition-colors shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Prompt</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleEdit}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                      isEditingPrompt
                        ? 'bg-[#728C75] text-white border-[#728C75]'
                        : 'bg-[#FAF8F5] hover:bg-[#F2EEE8] text-[#292722] border-[#E9E4DC]'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingPrompt ? 'Save Edits' : 'Edit Prompt'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-xs font-medium text-[#292722] transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#9B7775]" />
                    <span>Regenerate</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSavePrompt}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                      currentOutput.isSaved
                        ? 'bg-[#E9DAD5]/70 border-[#9B7775] text-[#50434F]'
                        : 'bg-[#FAF8F5] hover:bg-[#F2EEE8] border-[#E9E4DC] text-[#292722]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{currentOutput.isSaved ? 'Saved' : 'Save Prompt'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCycleDestination}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-xs font-medium text-[#292722] transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#817B73]" />
                    <span>Change Destination ({currentOutput.destination})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartAnother}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E9E4DC] text-xs font-medium text-[#817B73] hover:text-[#292722] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Start Another Prompt</span>
                  </button>
                </div>

                {/* Structured Prompt Display or Editable Textarea */}
                {isEditingPrompt ? (
                  <div>
                    <label className="block text-xs font-medium text-[#817B73] mb-1.5">
                      Editing Full Prompt Text (click “Save Edits” above when finished):
                    </label>
                    <textarea
                      rows={16}
                      value={editableText}
                      onChange={(e) => setEditableText(e.target.value)}
                      className="w-full p-4 rounded-xl bg-[#FAF8F5] border border-[#9B7775] font-sans text-xs sm:text-sm text-[#292722] leading-relaxed focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-4">
                    <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-[#292722]">
                      {currentOutput.fullPrompt}
                    </pre>
                  </div>
                )}
              </div>

              {/* =====================================================
                  COLLAPSIBLE "SHOW WHAT LUMA ADDED" COMPARISON
              ===================================================== */}
              <div className="editorial-panel bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowWhatLumaAdded(!showWhatLumaAdded)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-[#F2EEE8]/70 border-b border-[#E9E4DC] text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#9B7775]" />
                    <span className="font-serif text-lg text-[#292722]">
                      Show what Luma added to your rough request
                    </span>
                  </div>
                  {showWhatLumaAdded ? (
                    <ChevronUp className="w-4 h-4 text-[#817B73]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#817B73]" />
                  )}
                </button>

                {showWhatLumaAdded && (
                  <div className="p-6 space-y-5">
                    {/* Before vs After Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#817B73]">
                          Your Original Input ({currentOutput.roughRequest.split(/\s+/).length} words)
                        </span>
                        <p className="text-sm font-medium text-[#292722] mt-1">
                          “{currentOutput.roughRequest}”
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#EAEDE5]/60 border border-[#728C75]/30">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#728C75]">
                          Luma Enhanced Prompt ({currentOutput.fullPrompt.split(/\s+/).length} words)
                        </span>
                        <p className="text-xs text-[#292722] mt-1 leading-relaxed">
                          Enriched with 6 layers of personal business context, voice guardrails, and expert framework structure.
                        </p>
                      </div>
                    </div>

                    {/* 6 Highlighted Context Layers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="block font-semibold text-[#50434F] mb-1">
                          1. Expert Role
                        </span>
                        <p className="text-[#817B73] line-clamp-3">
                          {currentOutput.breakdown.role}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="block font-semibold text-[#50434F] mb-1">
                          2. Business Context
                        </span>
                        <p className="text-[#817B73] line-clamp-3">
                          {currentOutput.breakdown.businessContext}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="block font-semibold text-[#50434F] mb-1">
                          3. Target Audience
                        </span>
                        <p className="text-[#817B73] line-clamp-3">
                          {currentOutput.breakdown.audience}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="block font-semibold text-[#50434F] mb-1">
                          4. Brand Voice
                        </span>
                        <p className="text-[#817B73] line-clamp-3">
                          {currentOutput.breakdown.brandVoice}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="block font-semibold text-[#50434F] mb-1">
                          5. Anti-Cliché Constraints
                        </span>
                        <p className="text-[#817B73] line-clamp-3">
                          {currentOutput.breakdown.constraints.join(' ')}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                        <span className="block font-semibold text-[#50434F] mb-1">
                          6. Output Format
                        </span>
                        <p className="text-[#817B73] line-clamp-3">
                          {currentOutput.breakdown.outputFormat}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

