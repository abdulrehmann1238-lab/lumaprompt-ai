import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Bookmark,
  User,
  Mic,
  Target,
  Blocks,
  Chrome,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUsage } from '../../hooks/useUsage';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { profile, resetAllDemoData } = useApp();
  const { usage, remaining } = useUsage();
  const location = useLocation();
  const navigate = useNavigate();

  const currentFullUrl = location.pathname + location.search;

  const isNavItemActive = (href: string) => {
    if (href.includes('?')) {
      return currentFullUrl === href;
    }
    if (href === '/profile' && location.pathname === '/profile' && location.search !== '') {
      return false;
    }
    return location.pathname === href;
  };

  const navGroups = [
    {
      label: 'WORKSPACE',
      items: [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Smart Builder', href: '/builder', icon: Sparkles },
        { name: 'Prompt Library', href: '/library', icon: BookOpen },
        { name: 'Saved Prompts', href: '/saved', icon: Bookmark },
      ],
    },
    {
      label: 'PERSONALIZATION',
      items: [
        { name: 'My Profile', href: '/profile', icon: User },
        { name: 'Brand Voice', href: '/profile?tab=voice', icon: Mic },
        { name: 'My Goals', href: '/profile?tab=goals', icon: Target },
      ],
    },
    {
      label: 'INTEGRATIONS',
      items: [
        { name: 'AI Connections', href: '/integrations', icon: Blocks },
        { name: 'Chrome Extension', href: '/extension', icon: Chrome },
      ],
    },
    {
      label: 'ACCOUNT',
      items: [
        { name: 'Usage & Plan', href: '/usage', icon: BarChart3 },
        { name: 'Settings', href: '/settings', icon: Settings },
        { name: 'Help & Support', href: '/support', icon: HelpCircle },
      ],
    },
  ];

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const renderSidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-[#F2EEE8] border-r border-[#E9E4DC] select-none">
      {/* Top Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#E9E4DC]">
        <Link
          to="/"
          className="flex items-center gap-2.5 overflow-hidden"
          onClick={() => isMobile && setMobileDrawerOpen(false)}
        >
          <div className="w-8 h-8 rounded-xl bg-white border border-[#E9E4DC] flex items-center justify-center text-[#9B7775] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          {(!collapsed || isMobile) && (
            <div className="flex flex-col">
              <span className="font-serif text-xl leading-none text-[#292722]">Luma</span>
              <span className="text-[10px] text-[#817B73] tracking-wide">Prompt intelligence</span>
            </div>
          )}
        </Link>

        {!isMobile && (
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-[#817B73] hover:text-[#292722] hover:bg-white/60 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}

        {isMobile && (
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(false)}
            className="p-1.5 rounded-lg text-[#817B73] hover:text-[#292722]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {(!collapsed || isMobile) && (
              <div className="px-2.5 mb-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#817B73] uppercase">
                {group.label}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isNavItemActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => isMobile && setMobileDrawerOpen(false)}
                    title={collapsed && !isMobile ? item.name : undefined}
                    className={`flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-white text-[#292722] shadow-sm border border-[#E9E4DC]'
                        : 'text-[#292722]/75 hover:text-[#292722] hover:bg-white/50 border border-transparent'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active ? 'text-[#9B7775]' : 'text-[#817B73]'
                      }`}
                    />
                    {(!collapsed || isMobile) && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-[#E9E4DC] bg-[#FAF8F5]/70">
        {(!collapsed || isMobile) ? (
          <div className="bg-white border border-[#E9E4DC] rounded-[14px] p-3">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full bg-[#E9DAD5] text-[#50434F] font-serif text-sm flex items-center justify-center shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#292722] truncate">{profile.name}</p>
                <p className="text-[11px] text-[#817B73] truncate">{profile.businessName}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#F2EEE8] border border-[#E9E4DC] text-[10px] font-medium text-[#50434F]">
                {usage.plan}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#817B73] mb-1.5">
              <span>Monthly prompts</span>
              <span className="font-medium text-[#292722]">
                {usage.used}/{usage.monthlyAllowance} used
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F2EEE8] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[#9B7775] rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (usage.used / usage.monthlyAllowance) * 100)}%`,
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (isMobile) setMobileDrawerOpen(false);
                navigate('/usage');
              }}
              className="w-full py-1.5 px-3 rounded-lg bg-[#50434F] hover:bg-[#3F343E] text-white text-xs font-medium transition-colors flex items-center justify-center gap-1"
            >
              <span>Upgrade / Pro Waitlist</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/profile')}
            title={`${profile.name} (${usage.plan} Plan)`}
            className="w-10 h-10 mx-auto rounded-full bg-[#E9DAD5] text-[#50434F] font-serif text-sm flex items-center justify-center"
          >
            {initials}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#292722] flex overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-200 ${
          collapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        <div className="fixed top-0 left-0 bottom-0 z-30" style={{ width: collapsed ? 72 : 256 }}>
          {renderSidebarContent(false)}
        </div>
      </aside>

      {/* Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#292722]/40 backdrop-blur-[1px]"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10">
            {renderSidebarContent(true)}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 h-16 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E9E4DC] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#E9E4DC] bg-white text-[#292722]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-[#817B73] truncate">
              <span className="hidden sm:inline font-medium text-[#292722]">
                {profile.businessName}
              </span>
              <span className="hidden sm:inline text-[#E9E4DC]">•</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F2EEE8] text-[#50434F] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#728C75]" />
                Profile Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick link to Public Marketing Site */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E9E4DC] bg-white hover:bg-[#F2EEE8] text-xs font-medium text-[#292722] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#9B7775]" />
              <span className="hidden sm:inline">Public Site</span>
            </Link>

            {/* Remaining Generations Pill */}
            <Link
              to="/usage"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F2EEE8] hover:bg-[#E9DAD5]/60 text-xs font-medium text-[#292722] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9B7775]" />
              <span>{remaining} prompts left</span>
            </Link>

            {/* Reset Demo Control */}
            <button
              type="button"
              onClick={resetAllDemoData}
              title="Reset Demo Data to Default"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E9E4DC] bg-white hover:bg-[#F2EEE8] text-xs font-medium text-[#817B73] hover:text-[#292722] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>

            {/* Profile Avatar */}
            <Link
              to="/profile"
              className="w-9 h-9 rounded-full bg-[#E9DAD5] border border-[#9B7775]/30 text-[#50434F] font-serif text-sm flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
              title={`${profile.name} — View Profile`}
            >
              {initials}
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

