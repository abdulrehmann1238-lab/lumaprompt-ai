import { useApp } from '../context/AppContext';

export function useUsage() {
  const {
    usage,
    usageLogs,
    incrementUsage,
    simulateReachLimit,
    restoreNormalUsage,
    joinProWaitlist,
    showLimitModal,
    setShowLimitModal,
  } = useApp();

  const remaining = Math.max(0, usage.monthlyAllowance - usage.used);
  const percentUsed = Math.min(100, Math.round((usage.used / usage.monthlyAllowance) * 100));

  return {
    usage,
    usageLogs,
    remaining,
    percentUsed,
    incrementUsage,
    simulateReachLimit,
    restoreNormalUsage,
    joinProWaitlist,
    showLimitModal,
    setShowLimitModal,
  };
}

