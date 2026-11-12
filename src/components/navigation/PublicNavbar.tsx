import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowUpRight } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E9E4DC] shadow-sm'
          : 'bg-[#FAF8F5]/80 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Luma wordmark + Small descriptor */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775] group-hover:border-[#9B7775]/50 transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl leading-none tracking-tight text-[#292722]">
              Luma
            </span>
            <span className="text-[11px] text-[#817B73] tracking-wide mt-0.5">
              Prompt intelligence
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm text-[#292722]/80 hover:text-[#292722] transition-colors font-medium"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="text-sm text-[#292722]/80 hover:text-[#292722] transition-colors font-medium"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('integrations')}
            className="text-sm text-[#292722]/80 hover:text-[#292722] transition-colors font-medium"
          >
            Integrations
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('pricing')}
            className="text-sm text-[#292722]/80 hover:text-[#292722] transition-colors font-medium"
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="text-sm text-[#292722]/80 hover:text-[#292722] transition-colors font-medium"
          >
            FAQ
          </button>
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2EEE8] hover:bg-[#E9DAD5]/70 text-xs font-medium text-[#50434F] transition-colors"
            title="Jump directly into Sarah's pre-populated demo workspace"
          >
            Live Demo App
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 text-sm font-medium text-[#292722] hover:text-[#9B7775] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-sm font-medium transition-all shadow-sm hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl border border-[#E9E4DC] bg-white text-[#292722]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E9E4DC] px-6 py-6 shadow-editorial-lg">
          <div className="flex flex-col gap-3 mb-6">
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 text-base font-medium text-[#292722] border-b border-[#E9E4DC]/60"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              className="text-left py-2 text-base font-medium text-[#292722] border-b border-[#E9E4DC]/60"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('integrations')}
              className="text-left py-2 text-base font-medium text-[#292722] border-b border-[#E9E4DC]/60"
            >
              Integrations
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2 text-base font-medium text-[#292722] border-b border-[#E9E4DC]/60"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 text-base font-medium text-[#292722] border-b border-[#E9E4DC]/60"
            >
              FAQ
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#9B7775] text-white text-center text-sm font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-white border border-[#E9E4DC] text-[#292722] text-center text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#F2EEE8] text-[#50434F] text-center text-xs font-medium"
            >
              Explore Sarah’s Live Workspace →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

