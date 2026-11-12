import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Blocks,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Chrome,
  ArrowRight,
  X,
  Terminal,
  Sparkles,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IntegrationConfig } from '../../types';

export const IntegrationsPage: React.FC = () => {
  const { integrations, toggleIntegrationConnection, profile, showToast } = useApp();

  const [activeModalPlatform, setActiveModalPlatform] = useState<IntegrationConfig | null>(
    null
  );
  const [authStep, setAuthStep] = useState<'review' | 'authorizing' | 'confirmed'>('review');
  const [openTechAccordionId, setOpenTechAccordionId] = useState<string | null>('claude');

  const handleOpenConnectModal = (platform: IntegrationConfig) => {
    setActiveModalPlatform(platform);
    setAuthStep('review');
  };

  const handleSimulatedAuthorize = () => {
    if (!activeModalPlatform) return;
    setAuthStep('authorizing');
    setTimeout(() => {
      toggleIntegrationConnection(activeModalPlatform.id, true);
      setAuthStep('confirmed');
      showToast(
        `${activeModalPlatform.name} integration enabled (Simulated)`,
        `Connected ${profile.businessName} profile context.`
      );
    }, 850);
  };

  const handleDisconnect = (platform: IntegrationConfig) => {
    toggleIntegrationConnection(platform.id, false);
    setActiveModalPlatform(null);
    showToast(`${platform.name} disconnected`, 'Integration state updated.', 'info');
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
            Milestones 1 & 2 · Remote MCP & Apps SDK Architecture
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
            AI Connections Center
          </h1>
          <p className="text-sm text-[#817B73] mt-1 max-w-2xl">
            Manage how your saved <span className="text-[#292722] font-medium">{profile.businessName}</span> profile connects to Claude, ChatGPT, Google Gemini, and Perplexity.
          </p>
        </div>

        <Link
          to="/extension"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#50434F] hover:bg-[#3F343E] text-white text-xs font-medium transition-colors shrink-0"
        >
          <Chrome className="w-4 h-4" />
          <span>Test Chrome Extension Simulator</span>
        </Link>
      </div>

      {/* Prototype Clarity Banner */}
      <div className="p-4 rounded-2xl bg-[#F2EEE8] border border-[#E9E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#9B7775] shrink-0 mt-0.5 sm:mt-0" />
          <span className="text-[#292722]">
            <strong>Interactive Frontend Architecture Demo:</strong> Connection flows below simulate the user-facing OAuth 2.0, Remote MCP Server, and OpenAI Apps SDK experience for Milestones 1 & 2.
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-white border border-[#E9E4DC] text-[#50434F] font-medium shrink-0">
          Profile: {profile.businessName}
        </span>
      </div>

      {/* Platform Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item) => {
          const isTechOpen = openTechAccordionId === item.id;
          return (
            <div
              key={item.id}
              className={`editorial-panel p-6 sm:p-7 bg-white flex flex-col justify-between ${
                item.isPrimaryContract ? 'border-[#9B7775]/45' : ''
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    {/* Custom Editorial Monogram / Platform Emblem */}
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-serif text-xl shrink-0 ${
                        item.id === 'claude'
                          ? 'bg-[#E9DAD5]/60 border-[#9B7775]/30 text-[#50434F]'
                          : item.id === 'chatgpt'
                          ? 'bg-[#EAEDE5] border-[#728C75]/30 text-[#292722]'
                          : item.id === 'gemini'
                          ? 'bg-[#F2EEE8] border-[#E9E4DC] text-[#50434F]'
                          : 'bg-[#FAF8F5] border-[#E9E4DC] text-[#817B73]'
                      }`}
                    >
                      {item.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-serif text-2xl text-[#292722]">{item.name}</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F2EEE8] text-[#50434F] text-[10px] font-semibold">
                          {item.badgeText}
                        </span>
                      </div>
                      <p className="text-xs text-[#817B73] mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  {/* Connection State Badge */}
                  {item.connected ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAEDE5] text-[#728C75] text-xs font-medium shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#728C75]" />
                      Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E9E4DC] text-[#817B73] text-xs font-medium shrink-0">
                      Not Connected
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#817B73] leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Technical Details Accordion */}
                <div className="rounded-xl border border-[#E9E4DC] bg-[#FAF8F5] overflow-hidden mb-5">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenTechAccordionId(isTechOpen ? null : item.id)
                    }
                    className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-medium text-[#292722] hover:bg-[#F2EEE8]/60 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#9B7775]" />
                      <span>Technical Specification ({item.milestoneTag})</span>
                    </span>
                    {isTechOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#817B73]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#817B73]" />
                    )}
                  </button>

                  {isTechOpen && (
                    <div className="px-4 pb-4 pt-2 border-t border-[#E9E4DC] space-y-2.5 text-xs">
                      <div>
                        <span className="text-[#817B73] font-medium">Architecture: </span>
                        <span className="text-[#292722]">
                          {item.technicalDetails.architecture}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#817B73] font-medium">Authentication: </span>
                        <span className="text-[#292722]">
                          {item.technicalDetails.authProtocol}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#817B73] font-medium block mb-1">
                          Capabilities & Exposed Tools:
                        </span>
                        <ul className="space-y-1 pl-1">
                          {item.technicalDetails.capabilities.map((cap) => (
                            <li key={cap} className="flex items-start gap-1.5 text-[#292722]/90">
                              <Check className="w-3.5 h-3.5 text-[#728C75] shrink-0 mt-0.5" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-[#E9E4DC] font-mono text-[11px] text-[#50434F] truncate">
                        {item.technicalDetails.endpointPreview}
                      </div>
                      <p className="text-[11px] text-[#817B73] italic">
                        {item.technicalDetails.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-4 border-t border-[#E9E4DC] flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#817B73]">
                  {item.connected && item.connectedAt
                    ? item.connectedAt
                    : item.milestoneTag}
                </span>

                <div className="flex items-center gap-2">
                  {item.id === 'gemini' && (
                    <Link
                      to="/extension"
                      className="px-3.5 py-2 rounded-xl bg-[#F2EEE8] hover:bg-[#E9DAD5] text-xs font-medium text-[#50434F]"
                    >
                      Open in Extension
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => handleOpenConnectModal(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                      item.connected
                        ? 'bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-[#292722]'
                        : 'bg-[#9B7775] hover:bg-[#886563] text-white'
                    }`}
                  >
                    {item.connected ? 'Manage Connection' : `Connect ${item.name}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Directory Submission & Milestone 1/2 Readiness Card */}
      <div className="editorial-panel p-6 sm:p-8 bg-[#F2EEE8]/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7775]">
              Milestone 2 Deliverable Preview
            </span>
            <h3 className="font-serif text-2xl text-[#292722]">
              Anthropic MCP & OpenAI Apps Directory Readiness
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-white border border-[#E9E4DC] text-xs font-medium text-[#728C75]">
            Architecture Spec Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#E9E4DC]">
            <h4 className="font-semibold text-[#292722] mb-1">
              1. Unified Luma Engine (Claude Haiku API)
            </h4>
            <p className="text-[#817B73] leading-relaxed">
              Single remote MCP backend combines user profile context + human-written frameworks with sub-second response times.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#E9E4DC]">
            <h4 className="font-semibold text-[#292722] mb-1">
              2. OAuth 2.0 + Free Tier Metering
            </h4>
            <p className="text-[#817B73] leading-relaxed">
              Scoped user tokens authenticate requests across Claude, ChatGPT, and the Chrome Extension while enforcing the 20/month Free limit.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#E9E4DC]">
            <h4 className="font-semibold text-[#292722] mb-1">
              3. Directory Submission Package
            </h4>
            <p className="text-[#817B73] leading-relaxed">
              Includes verified manifest schemas, privacy disclosures, tool descriptions, and test credentials for partner review.
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Connection Modal */}
      {activeModalPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292722]/45 backdrop-blur-[2px] p-4">
          <div className="bg-white border border-[#E9E4DC] rounded-[22px] max-w-lg w-full p-6 sm:p-8 shadow-editorial-lg relative">
            <button
              type="button"
              onClick={() => setActiveModalPlatform(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-[#817B73] hover:text-[#292722]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7775]">
              {activeModalPlatform.badgeText} · Simulated Authorization
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#292722] mt-1 mb-2">
              {activeModalPlatform.connected
                ? `Manage ${activeModalPlatform.name} Integration`
                : `Connect Luma to ${activeModalPlatform.name}`}
            </h3>
            <p className="text-xs sm:text-sm text-[#817B73] leading-relaxed mb-5">
              {activeModalPlatform.description}
            </p>

            {authStep === 'review' && (
              <>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-2.5 mb-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#50434F]">
                    Permissions & Context Shared:
                  </div>
                  {activeModalPlatform.permissions.map((perm) => (
                    <div key={perm} className="flex items-start gap-2 text-xs text-[#292722]">
                      <CheckCircle2 className="w-4 h-4 text-[#728C75] shrink-0 mt-0.5" />
                      <span>{perm}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-[#F2EEE8]/75 text-[11px] text-[#817B73] mb-6">
                  <strong>Active Workspace Profile:</strong> {profile.name} · {profile.businessName} ({profile.industry})
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  {activeModalPlatform.connected ? (
                    <button
                      type="button"
                      onClick={() => handleDisconnect(activeModalPlatform)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E9E4DC] text-xs font-medium text-[#9B7775] hover:bg-[#FAF8F5]"
                    >
                      Disconnect {activeModalPlatform.name}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveModalPlatform(null)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E9E4DC] text-xs font-medium text-[#817B73]"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleSimulatedAuthorize}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium transition-colors"
                  >
                    {activeModalPlatform.connected
                      ? 'Re-Sync Profile Context'
                      : `Authorize & Connect ${activeModalPlatform.name}`}
                  </button>
                </div>
              </>
            )}

            {authStep === 'authorizing' && (
              <div className="py-10 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#9B7775] animate-spin mx-auto" />
                <p className="font-serif text-xl text-[#292722]">
                  Performing simulated OAuth 2.0 handshake...
                </p>
                <p className="text-xs text-[#817B73]">
                  Binding {profile.businessName} profile & MCP tool definitions.
                </p>
              </div>
            )}

            {authStep === 'confirmed' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-[#EAEDE5] border border-[#728C75]/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#728C75] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#292722]">
                      {activeModalPlatform.name} is now connected to your Luma profile
                    </p>
                    <p className="text-xs text-[#817B73] mt-0.5">
                      Simulated connection active for {profile.businessName}.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalPlatform(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#292722] text-white text-xs font-medium"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

