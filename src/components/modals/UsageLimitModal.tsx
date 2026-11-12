import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsage } from '../../hooks/useUsage';
import { isValidEmail } from '../../utils/validation';

export const UsageLimitModal: React.FC = () => {
  const {
    usage,
    showLimitModal,
    setShowLimitModal,
    joinProWaitlist,
    restoreNormalUsage,
  } = useUsage();
  const [email, setEmail] = useState(usage.proWaitlistEmail || 'sarah@bloomandco.studio');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!showLimitModal) return null;

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    joinProWaitlist(email);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#292722]/40 backdrop-blur-[2px] p-4">
      <div className="bg-white border border-[#E9E4DC] rounded-[22px] max-w-lg w-full p-6 sm:p-8 shadow-editorial-lg relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setShowLimitModal(false)}
          className="absolute top-5 right-5 text-[#817B73] hover:text-[#292722] p-1.5 rounded-full hover:bg-[#FAF8F5] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9DAD5]/60 text-[#50434F] text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#9B7775]" />
          Monthly Free Tier Limit Reached ({usage.used}/{usage.monthlyAllowance})
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#292722] mb-2">
          You’ve used all 20 personalized prompts this month.
        </h3>
        <p className="text-sm text-[#817B73] leading-relaxed mb-6">
          Your saved Bloom & Co. profile and prompt library remain accessible at any time. Your free monthly allowance resets on{' '}
          <span className="text-[#292722] font-medium">{usage.resetDate}</span>, or you can join the priority list for{' '}
          <span className="text-[#292722] font-medium">Luma Pro</span>.
        </p>

        {usage.proWaitlistJoined ? (
          <div className="p-4 rounded-[14px] bg-[#EAEDE5] border border-[#728C75]/30 flex items-start gap-3 mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#728C75] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#292722]">You’re on the Luma Pro priority list</p>
              <p className="text-xs text-[#817B73] mt-0.5">
                We’ll send an invitation to <span className="font-medium">{usage.proWaitlistEmail}</span> as soon as expanded limits launch.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="mb-6">
            <label className="block text-xs font-medium uppercase tracking-wider text-[#817B73] mb-2">
              Notify Me When Luma Pro Launches
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E9E4DC] bg-[#FAF8F5] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-sm font-medium transition-colors shrink-0"
              >
                Notify Me
              </button>
            </div>
            {error && <p className="text-xs text-[#9B7775] mt-1.5">{error}</p>}
          </form>
        )}

        <div className="pt-4 border-t border-[#E9E4DC] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={restoreNormalUsage}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#F2EEE8] hover:bg-[#E9DAD5]/60 text-[#292722] text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#9B7775]" />
            Demo Control: Reset to 13 Remaining
          </button>

          <button
            type="button"
            onClick={() => {
              setShowLimitModal(false);
              navigate('/usage');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#50434F] hover:text-[#9B7775] transition-colors"
          >
            View Usage & Billing Architecture
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

