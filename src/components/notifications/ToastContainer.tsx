import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[90] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-start gap-3 bg-white border border-[#E9E4DC] rounded-[14px] p-4 shadow-editorial-lg transition-all duration-200"
        >
          <div className="mt-0.5 shrink-0">
            {t.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-[#9B7775]" />
            ) : t.type === 'info' ? (
              <Info className="w-5 h-5 text-[#50434F]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#728C75]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#292722]">{t.title}</p>
            {t.description && (
              <p className="text-xs text-[#817B73] mt-0.5 leading-relaxed">{t.description}</p>
            )}
          </div>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-[#817B73] hover:text-[#292722] p-1 rounded-lg transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

