import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface BrandedLoadingScreenProps {
  onComplete: () => void;
}

export const BrandedLoadingScreen: React.FC<BrandedLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(8);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(100);
      const quickTimer = setTimeout(() => onComplete(), 300);
      return () => clearTimeout(quickTimer);
    }

    const step1 = setTimeout(() => setProgress(45), 180);
    const step2 = setTimeout(() => setProgress(82), 620);
    const step3 = setTimeout(() => setProgress(100), 1050);
    const fadeTimer = setTimeout(() => setFadingOut(true), 1250);
    const doneTimer = setTimeout(() => onComplete(), 1550);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5] px-6 transition-opacity duration-300 ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="max-w-md w-full text-center flex flex-col items-center">
        {/* Subtle top emblem */}
        <div className="w-9 h-9 rounded-full bg-[#F2EEE8] border border-[#E9E4DC] flex items-center justify-center mb-5 text-[#9B7775]">
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Elegant Luma Wordmark in DM Serif Display */}
        <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#292722] mb-3">
          Luma<span className="text-[#9B7775] italic font-normal">Prompt</span>
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-[#292722]/85 font-normal tracking-wide mb-9">
          “A little more clarity. A lot more possibility.”
        </p>

        {/* Very thin dusty-rose animated loading line */}
        <div className="w-56 sm:w-64 h-[2px] bg-[#E9E4DC] rounded-full overflow-hidden mb-3.5">
          <div
            className="h-full bg-[#9B7775] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Small caption */}
        <span className="text-xs uppercase tracking-[0.16em] text-[#817B73]">
          Preparing your workspace...
        </span>
      </div>
    </div>
  );
};

