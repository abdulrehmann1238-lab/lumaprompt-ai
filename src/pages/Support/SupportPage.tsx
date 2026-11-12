import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Sparkles,
  Blocks,
  Chrome,
  HelpCircle,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { isValidEmail } from '../../utils/validation';

const HELP_ARTICLES = [
  {
    id: 'getting-started',
    category: 'Getting started',
    title: 'How to set up your Luma profile in under 3 minutes',
    content:
      'Complete the 4-step Onboarding Wizard (or visit My Profile) to save your business description, target audience challenges, desired transformation, and brand voice chips. Once saved, Luma automatically injects this context into every prompt you build.',
  },
  {
    id: 'how-personalization-works',
    category: 'How personalization works',
    title: 'How Luma merges human frameworks with your brand voice',
    content:
      'When you enter a rough request like "Write a LinkedIn post about my launch", the Luma Engine selects the best-matching human-written framework from our library and binds your saved Business Context, Audience, and Brand Voice guardrails (including Words to Use and Words to Avoid).',
  },
  {
    id: 'connecting-claude',
    category: 'Connecting Claude',
    title: 'Using Luma with Claude via the Remote MCP Server',
    content:
      'Milestone 1 & 2 connect Luma to Claude using the Model Context Protocol (MCP) over OAuth 2.0. Once authorized in the AI Connections Center, Claude can call Luma’s prompt generation tool with your live profile context.',
  },
  {
    id: 'connecting-chatgpt',
    category: 'Connecting ChatGPT',
    title: 'Connecting Luma with ChatGPT through the Apps SDK',
    content:
      'Milestone 2 brings Luma into ChatGPT via the OpenAI Apps SDK and our shared MCP-compatible backend. You can also use the Luma Chrome Extension directly inside the ChatGPT web composer.',
  },
  {
    id: 'chrome-extension-guide',
    category: 'Chrome extension guide',
    title: 'Enhancing and inserting prompts inside ChatGPT, Claude & Gemini',
    content:
      'Inside the Chrome Extension Simulator, choose your AI chat tab, type a rough thought into the composer, and click the rose Luma button. Review the enhanced prompt in the compact popup and click "Insert into Chat" to replace your draft.',
  },
  {
    id: 'usage-questions',
    category: 'Usage questions',
    title: 'Understanding your 20 monthly Free generations and Luma Pro',
    content:
      'Every Free account includes 20 personalized prompt generations per month. You can inspect your weekly chart, reset date, and test the 20/20 limit flow on the Usage & Plan page.',
  },
];

export const SupportPage: React.FC = () => {
  const { profile, showToast } = useApp();

  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('getting-started');

  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState(profile.email);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredArticles = HELP_ARTICLES.filter((a) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${a.category} ${a.title} ${a.content}`.toLowerCase().includes(q);
  });

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      setFormError('Please enter a subject.');
      return;
    }
    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setFormError('Please describe your question (at least 10 characters).');
      return;
    }
    setFormError('');
    setSubmitted(true);
    showToast('Support ticket submitted', 'Our team will reply to your inquiry shortly.');
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
          Knowledge Base & Concierge Support
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
          Help & Support Center
        </h1>
        <p className="text-sm text-[#817B73] mt-1">
          Search guides on personalization, Claude MCP, ChatGPT Apps SDK, and the Chrome Extension.
        </p>
      </div>

      {/* Search Bar */}
      <div className="editorial-panel p-5 bg-white">
        <div className="relative">
          <Search className="w-4 h-4 text-[#817B73] absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help articles (e.g. Claude MCP, Chrome extension, personalization, usage)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
          />
        </div>
      </div>

      {/* Help Topics & Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-7 space-y-3">
          <h2 className="font-serif text-2xl text-[#292722] mb-2">
            Guides & Documentation ({filteredArticles.length})
          </h2>

          {filteredArticles.map((article) => {
            const isOpen = openId === article.id;
            return (
              <div
                key={article.id}
                className="editorial-card bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : article.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9B7775] block mb-1">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-lg text-[#292722]">
                      {article.title}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#9B7775] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#817B73] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#E9E4DC]/70 text-xs sm:text-sm text-[#817B73] leading-relaxed">
                    {article.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Contact Form */}
        <div className="lg:col-span-5 editorial-panel p-6 sm:p-7 bg-white space-y-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7775]">
              Direct Concierge Support
            </span>
            <h2 className="font-serif text-2xl text-[#292722] mt-1">
              Send us a message
            </h2>
            <p className="text-xs text-[#817B73] mt-1">
              Need help customizing a framework for {profile.businessName}? Ask us anything.
            </p>
          </div>

          {submitted ? (
            <div className="p-5 rounded-xl bg-[#EAEDE5] border border-[#728C75]/30 space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#728C75] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#292722]">
                    We’ve received your request
                  </p>
                  <p className="text-xs text-[#817B73] mt-0.5">
                    Confirmation sent to {email}.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSubject('');
                  setMessage('');
                }}
                className="text-xs font-medium text-[#50434F] underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSupportSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-[#292722] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Customizing my brand voice guardrails"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#292722] mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#292722] mb-1">
                  How can we help?
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about what you're building..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                />
              </div>

              {formError && <p className="text-xs text-[#9B7775]">{formError}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Support Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

