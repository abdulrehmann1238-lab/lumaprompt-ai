import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Chrome,
  Sparkles,
  Check,
  CheckCircle2,
  ArrowUp,
  Sliders,
  ShieldCheck,
  X,
  Copy,
  RefreshCw,
  UserCheck,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useProfile } from '../../hooks/useProfile';
import { usePrompts } from '../../hooks/usePrompts';
import { useUsage } from '../../hooks/useUsage';
import { buildPersonalizedPrompt, matchExpertFramework } from '../../utils/promptEngine';

type BrowserTabPlatform = 'ChatGPT' | 'Claude' | 'Gemini';

export const ChromeExtensionPage: React.FC = () => {
  const { extensionSettings, updateExtensionSettings, showToast } = useApp();
  const { profile } = useProfile();
  const { library, addGeneratedPrompt } = usePrompts();
  const { incrementUsage } = useUsage();

  const [activeTab, setActiveTab] = useState<BrowserTabPlatform>('ChatGPT');
  const [composerText, setComposerText] = useState(
    'Write a LinkedIn post about my launch, keep it short.'
  );
  const [isPromptInserted, setIsPromptInserted] = useState(false);

  // Luma Inline Popup State
  const [lumaPopupOpen, setLumaPopupOpen] = useState(false);
  const [popupFrameworkId, setPopupFrameworkId] = useState<string>('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedPreviewText, setEnhancedPreviewText] = useState<string>('');

  // Simulated Chat Thread Messages when user clicks Send in the browser mockup
  const [simulatedMessages, setSimulatedMessages] = useState<
    { role: 'user' | 'assistant'; text: string; platform: BrowserTabPlatform }[]
  >([]);

  // Prototype Installation Modal
  const [showInstallModal, setShowInstallModal] = useState(false);

  const matchedFramework = matchExpertFramework(
    composerText,
    'Content Creation',
    popupFrameworkId || undefined
  );

  const handleSwitchTab = (tab: BrowserTabPlatform) => {
    setActiveTab(tab);
    setLumaPopupOpen(false);
    setEnhancedPreviewText('');
    setIsPromptInserted(false);
    if (!composerText.trim()) {
      setComposerText('Write a LinkedIn post about my launch, keep it short.');
    }
  };

  const handleOpenLumaPopup = () => {
    if (!extensionSettings.enabled) {
      showToast(
        'Luma Extension is disabled',
        'Toggle "Enable Luma" in the Extension Settings panel to use the inline button.',
        'info'
      );
      return;
    }
    setLumaPopupOpen((prev) => !prev);
    setEnhancedPreviewText('');
  };

  const handleEnhanceInPopup = () => {
    const generated = buildPersonalizedPrompt({
      roughRequest: composerText || 'Write a LinkedIn post about my launch, keep it short.',
      profile,
      objective: 'Content Creation',
      destination: activeTab,
      frameworkId: popupFrameworkId || undefined,
    });

    const allowed = incrementUsage(generated.title, activeTab, generated.frameworkTitle);
    if (!allowed) return;

    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setEnhancedPreviewText(generated.fullPrompt);
      addGeneratedPrompt(generated);

      if (!extensionSettings.showEnhancementPreview) {
        // Direct insertion if preview is turned off in settings
        setComposerText(generated.fullPrompt);
        setIsPromptInserted(true);
        setLumaPopupOpen(false);
        showToast(
          `Inserted into ${activeTab}`,
          'Your rough prompt was automatically enhanced and inserted.'
        );
      }
    }, 950);
  };

  const handleInsertIntoChat = () => {
    if (!enhancedPreviewText) return;
    setComposerText(enhancedPreviewText);
    setIsPromptInserted(true);
    setLumaPopupOpen(false);
    showToast(
      `Enhanced prompt inserted into ${activeTab}`,
      'Replaced your rough draft inside the chat composer.'
    );
  };

  const handleSimulatedChatSend = () => {
    if (!composerText.trim()) return;
    const userMsg = composerText;
    const replySnippet = `Here is your tailored draft for ${profile.businessName}, written in your ${profile.brandVoice
      .slice(0, 2)
      .join(' & ')
      .toLowerCase()} voice for ${profile.targetAudience.toLowerCase()}:\n\n"There comes a quiet moment in every founder’s journey when working harder on your marketing stops being the answer—and clarity becomes everything.\n\nOver the past few months at ${profile.businessName}, we’ve refined a calmer, more intentional way to build a recognizable brand presence that attracts aligned clients consistently.\n\nToday, we are opening doors to our newest cohort. If you’re ready to trade scattered content for a signature presence this quarter, send me a quick note or comment below and I’ll share the details."`;

    setSimulatedMessages((prev) => [
      ...prev,
      { role: 'user', text: userMsg, platform: activeTab },
      { role: 'assistant', text: replySnippet, platform: activeTab },
    ]);
    setComposerText('Write a LinkedIn post about my launch, keep it short.');
    setIsPromptInserted(false);
  };

  const browserUrl =
    activeTab === 'ChatGPT'
      ? 'https://chatgpt.com'
      : activeTab === 'Claude'
      ? 'https://claude.ai/new'
      : 'https://gemini.google.com/app';

  const currentTabMessages = simulatedMessages.filter((m) => m.platform === activeTab);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
            Milestone 3 Deliverable · Interactive Browser Companion
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
            Take Luma wherever you chat.
          </h1>
          <p className="text-sm sm:text-base text-[#817B73] mt-1">
            Bring your personalized prompt intelligence directly into ChatGPT, Claude and Gemini.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowInstallModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#50434F] hover:bg-[#3F343E] text-white text-xs sm:text-sm font-medium transition-colors shadow-sm shrink-0"
        >
          <Chrome className="w-4 h-4 text-[#E9DAD5]" />
          <span>Install Chrome Extension</span>
        </button>
      </div>

      {/* Guided Interactive Step Banner */}
      <div className="p-4 rounded-2xl bg-[#F2EEE8] border border-[#E9E4DC] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#292722]">
          <span className="font-semibold text-[#50434F] uppercase tracking-wider">
            Try the Simulation:
          </span>
          <span>1. Choose ChatGPT, Claude, or Gemini</span>
          <span className="text-[#817B73]">→</span>
          <span>2. Type a rough prompt in the chat box</span>
          <span className="text-[#817B73]">→</span>
          <span>3. Click the rose “Luma” button</span>
          <span className="text-[#817B73]">→</span>
          <span>4. Click “Enhance” & “Insert into Chat”</span>
        </div>
      </div>

      {/* Main Layout: Left 8 Cols Interactive Browser Mockup, Right 4 Cols Extension Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* =====================================================
            INTERACTIVE BROWSER MOCKUP (8 COLUMNS)
        ===================================================== */}
        <div className="lg:col-span-8 editorial-panel overflow-hidden bg-white border border-[#E9E4DC]">
          {/* Browser Chrome Top Bar & Tabs */}
          <div className="bg-[#F2EEE8] border-b border-[#E9E4DC] px-4 pt-3">
            <div className="flex items-center justify-between gap-2 pb-2.5">
              {/* Traffic lights + Platform Tabs */}
              <div className="flex items-center gap-3 overflow-x-auto">
                <div className="hidden sm:flex items-center gap-1.5 mr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8D0C4]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8D0C4]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8D0C4]" />
                </div>

                {(['ChatGPT', 'Claude', 'Gemini'] as BrowserTabPlatform[]).map((tab) => {
                  const active = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => handleSwitchTab(tab)}
                      className={`px-4 py-2 rounded-t-xl text-xs font-medium transition-all flex items-center gap-2 border-t border-x ${
                        active
                          ? 'bg-white text-[#292722] border-[#E9E4DC] -mb-[1px]'
                          : 'bg-[#FAF8F5]/60 text-[#817B73] border-transparent hover:text-[#292722]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          tab === 'ChatGPT'
                            ? 'bg-[#728C75]'
                            : tab === 'Claude'
                            ? 'bg-[#9B7775]'
                            : 'bg-[#50434F]'
                        }`}
                      />
                      <span>{tab}</span>
                    </button>
                  );
                })}
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E9E4DC] text-[11px] font-medium text-[#50434F]">
                <Sparkles className="w-3 h-3 text-[#9B7775]" />
                Luma Extension v1.0 Active
              </span>
            </div>

            {/* Browser Address Bar */}
            <div className="py-2 border-t border-[#E9E4DC] flex items-center justify-between gap-3">
              <div className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-[#E9E4DC] flex items-center gap-2 text-xs text-[#817B73]">
                <Lock className="w-3 h-3 text-[#728C75]" />
                <span className="text-[#292722] font-medium">{browserUrl}</span>
              </div>
              <div className="text-[11px] text-[#817B73] hidden sm:block">
                Shortcut: {extensionSettings.keyboardShortcut}
              </div>
            </div>
          </div>

          {/* Simulated AI Chat Viewport */}
          <div
            className={`p-5 sm:p-8 min-h-[500px] flex flex-col justify-between relative transition-colors ${
              activeTab === 'Claude'
                ? 'bg-[#FAF8F5]'
                : activeTab === 'ChatGPT'
                ? 'bg-white'
                : 'bg-[#FAF8F5]/60'
            }`}
          >
            {/* Platform Welcome Header or Simulated Conversation */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between border-b border-[#E9E4DC]/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-serif ${
                      activeTab === 'ChatGPT'
                        ? 'bg-[#728C75]'
                        : activeTab === 'Claude'
                        ? 'bg-[#9B7775]'
                        : 'bg-[#50434F]'
                    }`}
                  >
                    {activeTab[0]}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-[#292722]">
                      {activeTab === 'ChatGPT'
                        ? 'ChatGPT 4o'
                        : activeTab === 'Claude'
                        ? 'Claude 3.5 Sonnet'
                        : 'Google Gemini Advanced'}
                    </h2>
                    <p className="text-[11px] text-[#817B73]">
                      Simulated {activeTab} web interface with Luma inline button
                    </p>
                  </div>
                </div>

                {currentTabMessages.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSimulatedMessages((prev) =>
                        prev.filter((m) => m.platform !== activeTab)
                      )
                    }
                    className="text-xs text-[#817B73] hover:text-[#292722] underline"
                  >
                    Clear thread
                  </button>
                )}
              </div>

              {currentTabMessages.length === 0 ? (
                <div className="py-6 text-center max-w-md mx-auto space-y-2">
                  <h3 className="font-serif text-2xl text-[#292722]">
                    {activeTab === 'Claude'
                      ? `Good morning, ${profile.name.split(' ')[0]}.`
                      : activeTab === 'ChatGPT'
                      ? 'What can I help with?'
                      : `Hello, ${profile.name.split(' ')[0]}. Ready to create?`}
                  </h3>
                  <p className="text-xs text-[#817B73]">
                    Type a quick thought in the chat composer below, then click the{' '}
                    <strong className="text-[#9B7775]">✨ Luma</strong> button to enhance and insert your personalized prompt.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                    {[
                      'Write a LinkedIn post about my launch, keep it short.',
                      'Draft an Instagram carousel about brand clarity.',
                      'Write a warm discovery call follow-up email.',
                    ].map((sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => {
                          setComposerText(sample);
                          setIsPromptInserted(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#F2EEE8] hover:bg-[#E9DAD5]/70 text-[11px] text-[#292722]"
                      >
                        “{sample.slice(0, 30)}...”
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {currentTabMessages.map((m, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-[#F2EEE8] text-[#292722] ml-8 border border-[#E9E4DC]'
                          : 'bg-white text-[#292722] mr-8 border border-[#9B7775]/40 shadow-sm'
                      }`}
                    >
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#817B73] mb-1">
                        {m.role === 'user' ? 'You (Enhanced via Luma)' : `${activeTab} Response`}
                      </span>
                      <pre className="whitespace-pre-wrap font-sans">{m.text}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* =====================================================
                COMPACT LUMA EXTENSION POPUP OVERLAY
            ===================================================== */}
            <div className="relative">
              {lumaPopupOpen && (
                <div className="mb-3 rounded-[18px] bg-white border-2 border-[#9B7775] shadow-editorial-lg p-4 sm:p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {/* Popup Header */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E9E4DC]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-serif text-base text-[#292722] block leading-none">
                          Luma Prompt Companion
                        </span>
                        <span className="text-[11px] text-[#728C75] font-medium">
                          ✓ Using {profile.name.split(' ')[0]}’s Profile ({profile.businessName})
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLumaPopupOpen(false)}
                      className="p-1 rounded-lg text-[#817B73] hover:text-[#292722]"
                      aria-label="Close Luma popup"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Profile & Selected Expert Framework Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                      <span className="block text-[10px] uppercase tracking-wider text-[#817B73]">
                        Saved Profile Context
                      </span>
                      <span className="font-medium text-[#292722]">
                        {profile.businessName} · {profile.brandVoice.slice(0, 2).join(', ')}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                      <span className="block text-[10px] uppercase tracking-wider text-[#817B73]">
                        Selected Expert Framework
                      </span>
                      <select
                        value={popupFrameworkId}
                        onChange={(e) => setPopupFrameworkId(e.target.value)}
                        className="w-full bg-transparent font-medium text-[#292722] focus:outline-none text-xs"
                      >
                        <option value="">Auto: {matchedFramework.title}</option>
                        {library.map((fw) => (
                          <option key={fw.id} value={fw.id}>
                            {fw.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Animated Processing or Enhanced Preview */}
                  {isEnhancing ? (
                    <div className="py-6 text-center space-y-2 bg-[#FAF8F5] rounded-xl border border-[#E9E4DC]">
                      <RefreshCw className="w-5 h-5 text-[#9B7775] animate-spin mx-auto" />
                      <p className="text-xs font-medium text-[#292722]">
                        Luma is weaving your {profile.businessName} profile & expert framework...
                      </p>
                    </div>
                  ) : enhancedPreviewText ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#728C75] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Enhanced Prompt Ready for {activeTab}
                        </span>
                        <button
                          type="button"
                          onClick={handleEnhanceInPopup}
                          className="text-[11px] text-[#9B7775] hover:underline"
                        >
                          Regenerate
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#292722] bg-[#FAF8F5] border border-[#E9E4DC] rounded-xl p-3 max-h-40 overflow-y-auto">
                        {enhancedPreviewText}
                      </pre>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(enhancedPreviewText);
                            showToast('Copied from Luma Extension');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs font-medium text-[#292722]"
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={handleInsertIntoChat}
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium transition-colors shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Insert into Chat</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-xs text-[#817B73] truncate">
                        Draft: “{composerText.slice(0, 48)}...”
                      </span>
                      <button
                        type="button"
                        onClick={handleEnhanceInPopup}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium transition-colors shrink-0 shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Enhance</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* =====================================================
                  SIMULATED CHAT COMPOSER WITH INLINE LUMA BUTTON
              ===================================================== */}
              <div
                className={`rounded-2xl border p-3.5 transition-all bg-white shadow-sm ${
                  isPromptInserted
                    ? 'border-[#728C75] ring-2 ring-[#728C75]/15'
                    : 'border-[#E9E4DC]'
                }`}
              >
                {isPromptInserted && (
                  <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#E9E4DC] text-[11px]">
                    <span className="text-[#728C75] font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Luma Enhanced Prompt Inserted ({composerText.split(/\s+/).length} words)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setComposerText('Write a LinkedIn post about my launch, keep it short.');
                        setIsPromptInserted(false);
                      }}
                      className="text-[#817B73] hover:text-[#292722] underline"
                    >
                      Reset to rough prompt
                    </button>
                  </div>
                )}

                <textarea
                  rows={isPromptInserted ? 6 : 2}
                  value={composerText}
                  onChange={(e) => {
                    setComposerText(e.target.value);
                    setIsPromptInserted(false);
                  }}
                  placeholder={`Message ${activeTab}...`}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#292722] focus:outline-none resize-none leading-relaxed"
                />

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E9E4DC]/60">
                  <div className="flex items-center gap-2">
                    {/* THE INLINE LUMA BUTTON INSIDE THE CHAT COMPOSER */}
                    <button
                      type="button"
                      onClick={handleOpenLumaPopup}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shadow-sm ${
                        lumaPopupOpen
                          ? 'bg-[#50434F] text-white'
                          : 'bg-[#9B7775] hover:bg-[#886563] text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Luma</span>
                    </button>

                    <span className="text-[11px] text-[#817B73] hidden sm:inline">
                      Click Luma to personalize this prompt with {profile.businessName}
                    </span>
                  </div>

                  {/* Simulated Send Message Button */}
                  <button
                    type="button"
                    onClick={handleSimulatedChatSend}
                    title={`Send message to simulated ${activeTab}`}
                    className="w-8 h-8 rounded-xl bg-[#292722] hover:bg-[#50434F] text-white flex items-center justify-center transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            EXTENSION SETTINGS PANEL (4 COLUMNS)
        ===================================================== */}
        <div className="lg:col-span-4 editorial-panel p-6 bg-white space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#E9E4DC]">
            <Sliders className="w-4 h-4 text-[#9B7775]" />
            <div>
              <h2 className="font-serif text-xl text-[#292722]">Extension Settings</h2>
              <p className="text-[11px] text-[#817B73]">
                Saved automatically in localStorage
              </p>
            </div>
          </div>

          {/* Toggle 1: Enable Luma */}
          <div className="flex items-center justify-between py-2 border-b border-[#E9E4DC]/60">
            <div>
              <p className="text-xs font-semibold text-[#292722]">Enable Luma in Composer</p>
              <p className="text-[11px] text-[#817B73]">
                Show inline button in ChatGPT, Claude & Gemini
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updateExtensionSettings({ enabled: !extensionSettings.enabled })
              }
              className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                extensionSettings.enabled ? 'bg-[#728C75]' : 'bg-[#D8D0C4]'
              }`}
              aria-label="Toggle Enable Luma"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  extensionSettings.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Default Destination */}
          <div>
            <label className="block text-xs font-semibold text-[#292722] mb-1.5">
              Default Destination
            </label>
            <select
              value={extensionSettings.defaultDestination}
              onChange={(e) => {
                const val = e.target.value as BrowserTabPlatform;
                updateExtensionSettings({ defaultDestination: val });
                setActiveTab(val);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs text-[#292722] focus:outline-none focus:border-[#9B7775]"
            >
              <option value="Claude">Claude</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Gemini">Gemini</option>
            </select>
          </div>

          {/* Toggle 2: Automatically apply saved profile */}
          <div className="flex items-center justify-between py-2 border-b border-[#E9E4DC]/60">
            <div>
              <p className="text-xs font-semibold text-[#292722]">
                Automatically apply saved profile
              </p>
              <p className="text-[11px] text-[#817B73]">
                Inject {profile.businessName} context by default
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updateExtensionSettings({
                  autoApplyProfile: !extensionSettings.autoApplyProfile,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                extensionSettings.autoApplyProfile ? 'bg-[#728C75]' : 'bg-[#D8D0C4]'
              }`}
              aria-label="Toggle Auto Apply Profile"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  extensionSettings.autoApplyProfile ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Show enhancement preview */}
          <div className="flex items-center justify-between py-2 border-b border-[#E9E4DC]/60">
            <div>
              <p className="text-xs font-semibold text-[#292722]">Show enhancement preview</p>
              <p className="text-[11px] text-[#817B73]">
                Review structured prompt before inserting
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updateExtensionSettings({
                  showEnhancementPreview: !extensionSettings.showEnhancementPreview,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                extensionSettings.showEnhancementPreview ? 'bg-[#728C75]' : 'bg-[#D8D0C4]'
              }`}
              aria-label="Toggle Enhancement Preview"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  extensionSettings.showEnhancementPreview
                    ? 'translate-x-5'
                    : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Preferred Brand Voice */}
          <div>
            <label className="block text-xs font-semibold text-[#292722] mb-1.5">
              Preferred Brand Voice
            </label>
            <select
              value={extensionSettings.preferredBrandVoice}
              onChange={(e) =>
                updateExtensionSettings({ preferredBrandVoice: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs text-[#292722] focus:outline-none focus:border-[#9B7775]"
            >
              <option value="Warm & Confident (Profile Default)">
                Warm & Confident (Profile Default)
              </option>
              <option value="Executive & Concise">Executive & Concise</option>
              <option value="Story-Led & Conversational">Story-Led & Conversational</option>
              <option value="Educational & Empathetic">Educational & Empathetic</option>
            </select>
          </div>

          {/* Keyboard Shortcut */}
          <div>
            <label className="block text-xs font-semibold text-[#292722] mb-1.5">
              Keyboard Shortcut
            </label>
            <input
              type="text"
              value={extensionSettings.keyboardShortcut}
              onChange={(e) =>
                updateExtensionSettings({ keyboardShortcut: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs font-mono text-[#50434F] focus:outline-none focus:border-[#9B7775]"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-[11px] text-[#817B73] space-y-1">
            <div className="font-semibold text-[#292722] flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#728C75]" />
              Synced with Smart Builder Engine
            </div>
            <p>
              Edits made in <Link to="/profile" className="underline text-[#9B7775]">My Profile</Link> immediately update the Chrome Extension popup.
            </p>
          </div>
        </div>
      </div>

      {/* Prototype-Only Installation Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292722]/45 backdrop-blur-[2px] p-4">
          <div className="bg-white border border-[#E9E4DC] rounded-[22px] max-w-lg w-full p-6 sm:p-8 shadow-editorial-lg relative">
            <button
              type="button"
              onClick={() => setShowInstallModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-[#817B73] hover:text-[#292722]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9DAD5]/60 text-[#50434F] text-xs font-medium mb-3">
              <Chrome className="w-3.5 h-3.5 text-[#9B7775]" />
              Interactive Prototype Preview · Milestone 3
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#292722] mb-2">
              Luma Chrome Extension Preview
            </h3>
            <p className="text-xs sm:text-sm text-[#817B73] leading-relaxed mb-5">
              This page provides a live interactive simulation of the Milestone 3 Chrome Extension experience inside ChatGPT, Claude, and Google Gemini. It is an interactive frontend prototype rather than a published Chrome Web Store package.
            </p>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-2 text-xs mb-6">
              <div className="font-semibold text-[#50434F]">
                Milestone 3 Production Architecture Highlights:
              </div>
              <p className="text-[#292722]/90">
                • <strong>Manifest V3 Content Scripts:</strong> Scoped strictly to `chatgpt.com`, `claude.ai`, and `gemini.google.com`.
              </p>
              <p className="text-[#292722]/90">
                • <strong>Shadow DOM Composer Button:</strong> Zero CSS collision with host AI chat interfaces.
              </p>
              <p className="text-[#292722]/90">
                • <strong>Chrome Web Store Package:</strong> Prepared with store assets, least-privilege permissions rationale, and privacy policy disclosure.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowInstallModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#292722] hover:bg-[#50434F] text-white text-xs font-medium"
              >
                Continue Exploring Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

