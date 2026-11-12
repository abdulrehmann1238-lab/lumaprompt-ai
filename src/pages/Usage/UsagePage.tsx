import React, { useState } from 'react';
import {
  BarChart3,
  Sparkles,
  Check,
  CheckCircle2,
  Calendar,
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  Database,
  CreditCard,
} from 'lucide-react';
import { useUsage } from '../../hooks/useUsage';
import { isValidEmail } from '../../utils/validation';

export const UsagePage: React.FC = () => {
  const {
    usage,
    usageLogs,
    remaining,
    percentUsed,
    simulateReachLimit,
    restoreNormalUsage,
    joinProWaitlist,
  } = useUsage();

  const [waitlistEmail, setWaitlistEmail] = useState(
    usage.proWaitlistEmail || 'sarah@bloomandco.studio'
  );
  const [emailError, setEmailError] = useState('');

  const maxDaily = Math.max(...usage.weeklyUsage.map((d) => d.count), 4);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(waitlistEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    joinProWaitlist(waitlistEmail);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Demo Limit Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
            Metering & Membership · Milestone 1 Architecture
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
            Usage & Future Plan
          </h1>
          <p className="text-sm text-[#817B73] mt-1">
            Track your monthly prompt generations across Smart Builder, Claude MCP, ChatGPT, and the Chrome Extension.
          </p>
        </div>

        {/* Demo-Only Controls to Test Usage Limit */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={simulateReachLimit}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E9DAD5] hover:bg-[#9B7775] text-[#50434F] hover:text-white text-xs font-medium transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Demo Control: Test Usage Limit (20/20)</span>
          </button>

          {usage.used !== 7 && (
            <button
              type="button"
              onClick={restoreNormalUsage}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E9E4DC] hover:bg-[#F2EEE8] text-xs font-medium text-[#292722] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#9B7775]" />
              <span>Restore Demo Allowance (7/20)</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Row: Usage Progress Card + Weekly Usage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Free Plan & Metering Summary */}
        <div className="lg:col-span-7 editorial-panel p-6 sm:p-8 bg-white flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E9E4DC]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#817B73]">
                  Current Membership
                </span>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <h2 className="font-serif text-3xl text-[#292722]">Free Plan</h2>
                  <span className="font-serif text-xl text-[#9B7775]">$0 / month</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs text-[#817B73]">
                <Calendar className="w-3.5 h-3.5 text-[#9B7775]" />
                <span>Monthly reset date: {usage.resetDate}</span>
              </div>
            </div>

            {/* 3 Stat Blocks */}
            <div className="grid grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                <span className="text-xs text-[#817B73] block">Monthly Allowance</span>
                <span className="font-serif text-3xl text-[#292722] mt-1 block">
                  {usage.monthlyAllowance}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                <span className="text-xs text-[#817B73] block">Used This Month</span>
                <span className="font-serif text-3xl text-[#9B7775] mt-1 block">
                  {usage.used}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                <span className="text-xs text-[#817B73] block">Remaining</span>
                <span className="font-serif text-3xl text-[#728C75] mt-1 block">
                  {remaining}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#292722]">
                  {usage.used} of {usage.monthlyAllowance} monthly demo generations used
                </span>
                <span className="font-semibold text-[#50434F]">{percentUsed}%</span>
              </div>
              <div className="w-full h-3 bg-[#F2EEE8] rounded-full overflow-hidden border border-[#E9E4DC]">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    remaining === 0 ? 'bg-[#50434F]' : 'bg-[#9B7775]'
                  }`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-[#817B73] mt-6 pt-4 border-t border-[#E9E4DC]">
            Every generation in Smart Builder or the Chrome Extension increments your unified Luma Engine counter.
          </p>
        </div>

        {/* Right: Weekly Usage Chart */}
        <div className="lg:col-span-5 editorial-panel p-6 sm:p-8 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl text-[#292722]">Weekly Activity</h2>
                <p className="text-xs text-[#817B73]">Prompts generated over the past 7 days</p>
              </div>
              <BarChart3 className="w-5 h-5 text-[#9B7775]" />
            </div>

            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-[#E9E4DC]">
              {usage.weeklyUsage.map((item) => {
                const heightPct = Math.max(12, Math.round((item.count / maxDaily) * 100));
                return (
                  <div
                    key={item.day}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                  >
                    <span className="text-[11px] font-semibold text-[#292722]">
                      {item.count}
                    </span>
                    <div
                      className={`w-full max-w-[32px] rounded-t-lg transition-all duration-300 ${
                        item.count > 0 ? 'bg-[#9B7775]' : 'bg-[#F2EEE8]'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2.5 px-2 text-xs text-[#817B73]">
              {usage.weeklyUsage.map((item) => (
                <span key={item.day} className="flex-1 text-center font-medium">
                  {item.day}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs text-[#817B73]">
            Most active destination this week: <strong className="text-[#292722]">Claude (MCP)</strong>
          </div>
        </div>
      </div>

      {/* Second Row: Pro Plan Coming Soon + Generation History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Pro Plan Coming Soon Card */}
        <div
          id="pro-waitlist"
          className="lg:col-span-5 editorial-panel p-6 sm:p-8 bg-[#F2EEE8] border-[#9B7775]/45 space-y-5"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#E9DAD5] text-[#50434F] text-xs font-semibold">
              COMING SOON
            </span>
            <Sparkles className="w-5 h-5 text-[#9B7775]" />
          </div>

          <div>
            <h2 className="font-serif text-3xl text-[#292722]">Luma Pro</h2>
            <p className="text-xs sm:text-sm text-[#817B73] mt-1 leading-relaxed">
              Built for scaling founders, content studios, and advisors managing multiple brand voices.
            </p>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-[#292722] pt-2 border-t border-[#E9E4DC]">
            {[
              'Higher usage limits for daily multi-channel creation',
              'Expanded prompt library across specialized verticals',
              'Advanced personalization & multiple saved profiles',
              'Premium frameworks & complete launch playbooks',
            ].map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#728C75] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          {usage.proWaitlistJoined ? (
            <div className="p-4 rounded-xl bg-white border border-[#728C75]/40 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#728C75] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#292722]">
                  You’re on the Luma Pro Waitlist
                </p>
                <p className="text-[11px] text-[#817B73] mt-0.5">
                  We will notify <strong>{usage.proWaitlistEmail}</strong> when Pro memberships open.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="space-y-2.5 pt-2">
              <input
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
              />
              {emailError && <p className="text-xs text-[#9B7775]">{emailError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#50434F] hover:bg-[#3F343E] text-white text-xs sm:text-sm font-medium transition-colors"
              >
                Notify Me When Pro Launches
              </button>
            </form>
          )}
        </div>

        {/* Generation History Table */}
        <div className="lg:col-span-7 editorial-panel p-6 sm:p-8 bg-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9E4DC]">
            <div>
              <h2 className="font-serif text-2xl text-[#292722]">Generation History</h2>
              <p className="text-xs text-[#817B73]">
                Recent prompts metered against your monthly allowance
              </p>
            </div>
            <span className="text-xs font-medium text-[#817B73]">
              {usageLogs.length} entries
            </span>
          </div>

          <div className="divide-y divide-[#E9E4DC] max-h-80 overflow-y-auto pr-1">
            {usageLogs.map((entry) => (
              <div
                key={entry.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <p className="font-medium text-[#292722]">{entry.promptTitle}</p>
                  <p className="text-[11px] text-[#817B73]">
                    Framework: {entry.frameworkUsed}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#F2EEE8] text-[#50434F] font-medium">
                    {entry.destination}
                  </span>
                  <span className="text-[#817B73]">{entry.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Architecture Preview: Future Stripe & Metering Readiness */}
      <div className="editorial-panel p-6 sm:p-8 bg-white space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E9E4DC]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7775]">
              Milestone 1 Architecture Specification
            </span>
            <h3 className="font-serif text-2xl text-[#292722]">
              Future Stripe Subscription & Metering Architecture
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#EAEDE5] text-[#728C75] text-xs font-medium">
            Stripe-Ready Schema
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-[#292722]">
              <Database className="w-4 h-4 text-[#9B7775]" />
              <span>1. Unified Entitlement Ledger</span>
            </div>
            <p className="text-[#817B73] leading-relaxed">
              User records store `plan_tier` (`free` | `pro`), `monthly_quota` (20 vs. Pro), `period_used`, and `billing_cycle_anchor` so MCP and Extension calls check quota atomically.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-[#292722]">
              <CreditCard className="w-4 h-4 text-[#9B7775]" />
              <span>2. Plug-and-Play Stripe Webhooks</span>
            </div>
            <p className="text-[#817B73] leading-relaxed">
              Pre-structured handlers for `checkout.session.completed`, `customer.subscription.updated`, and `invoice.paid` to upgrade user tiers without refactoring the Luma Engine.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-[#292722]">
              <ShieldCheck className="w-4 h-4 text-[#9B7775]" />
              <span>3. Graceful Rate-Limit Responses</span>
            </div>
            <p className="text-[#817B73] leading-relaxed">
              When `period_used == monthly_quota`, the MCP tool and Chrome Extension return a friendly structured upgrade prompt rather than an unhandled error.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

