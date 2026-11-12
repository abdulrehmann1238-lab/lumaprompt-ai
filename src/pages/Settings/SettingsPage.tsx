import React, { useState } from 'react';
import {
  User,
  Sliders,
  Bell,
  Shield,
  Database,
  Download,
  Trash2,
  RotateCcw,
  Check,
  Monitor,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIDestination } from '../../types';

export const SettingsPage: React.FC = () => {
  const {
    profile,
    updateProfile,
    extensionSettings,
    updateExtensionSettings,
    notificationPrefs,
    updateNotificationPrefs,
    clearSavedPrompts,
    resetAllDemoData,
    showToast,
  } = useApp();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [defaultDestination, setDefaultDestination] = useState<AIDestination>('Claude');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    showToast('Account settings saved', 'Updated your name and email preferences.');
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('Password too short', 'Please enter at least 6 characters.', 'warning');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    showToast('Password updated (Simulated)', 'Your security credentials have been refreshed.');
  };

  const handleExportProfile = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `luma-profile-${profile.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Profile exported', 'Downloaded your Luma profile JSON file.');
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
          Workspace Preferences
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
          Settings
        </h1>
        <p className="text-sm text-[#817B73] mt-1">
          Manage your account details, default personalization behavior, notifications, security, and local demo data.
        </p>
      </div>

      {/* 1. GENERAL */}
      <section className="editorial-panel p-6 sm:p-8 bg-white space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
          <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#292722]">General</h2>
            <p className="text-xs text-[#817B73]">Name, email, and profile avatar</p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#E9DAD5] text-[#50434F] font-serif text-xl flex items-center justify-center">
              {initials}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#292722]">Profile Image</p>
              <p className="text-xs text-[#817B73]">
                Editorial monogram avatar generated from your name
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#292722] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save General Settings</span>
          </button>
        </form>
      </section>

      {/* 2. PERSONALIZATION */}
      <section className="editorial-panel p-6 sm:p-8 bg-white space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
          <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#292722]">Personalization Defaults</h2>
            <p className="text-xs text-[#817B73]">
              Default voice, AI destination, and automatic profile injection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#292722] mb-1.5">
              Default Brand Voice Calibration
            </label>
            <select
              value={extensionSettings.preferredBrandVoice}
              onChange={(e) => {
                updateExtensionSettings({ preferredBrandVoice: e.target.value });
                showToast('Default voice updated', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722]"
            >
              <option value="Warm & Confident (Profile Default)">
                Warm & Confident (Profile Default)
              </option>
              <option value="Executive & Concise">Executive & Concise</option>
              <option value="Story-Led & Conversational">Story-Led & Conversational</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#292722] mb-1.5">
              Default AI Destination
            </label>
            <select
              value={defaultDestination}
              onChange={(e) => {
                const val = e.target.value as AIDestination;
                setDefaultDestination(val);
                showToast('Default destination updated', `Set to ${val}.`);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722]"
            >
              <option value="Claude">Claude</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Gemini">Gemini</option>
              <option value="Copy Only">Copy Only</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. NOTIFICATIONS */}
      <section className="editorial-panel p-6 sm:p-8 bg-white space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
          <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#292722]">Notifications</h2>
            <p className="text-xs text-[#817B73]">
              Choose which updates you receive from Luma
            </p>
          </div>
        </div>

        {[
          {
            key: 'productUpdates' as const,
            title: 'Product updates',
            desc: 'New AI integrations, Chrome Extension improvements, and feature announcements.',
          },
          {
            key: 'usageNotifications' as const,
            title: 'Usage notifications',
            desc: 'Helpful alerts when you reach 80% or 100% of your monthly prompt allowance.',
          },
          {
            key: 'newPromptReleases' as const,
            title: 'New prompt releases',
            desc: 'Bi-weekly digest of newly added human-written expert frameworks.',
          },
        ].map((item) => {
          const active = notificationPrefs[item.key];
          return (
            <div
              key={item.key}
              className="flex items-center justify-between py-2.5 border-b border-[#E9E4DC]/60 last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium text-[#292722]">{item.title}</p>
                <p className="text-xs text-[#817B73]">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => updateNotificationPrefs({ [item.key]: !active })}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                  active ? 'bg-[#728C75]' : 'bg-[#D8D0C4]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </section>

      {/* 4. SECURITY */}
      <section className="editorial-panel p-6 sm:p-8 bg-white space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
          <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#292722]">Security & Sessions</h2>
            <p className="text-xs text-[#817B73]">
              Password management, active sessions, and connected OAuth accounts
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordUpdate} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#292722] hover:bg-[#50434F] text-white text-xs font-medium"
          >
            Update Password
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Monitor className="w-4 h-4 text-[#9B7775]" />
              <div>
                <p className="font-semibold text-[#292722]">Current Web Session</p>
                <p className="text-[#817B73]">Active Now · OAuth 2.0 Verified</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAEDE5] text-[#728C75] font-medium">
              Active
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-[#292722]">Google Account Connection</p>
              <p className="text-[#817B73]">{profile.email}</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F2EEE8] text-[#50434F] font-medium">
              Linked
            </span>
          </div>
        </div>
      </section>

      {/* 5. DATA MANAGEMENT */}
      <section className="editorial-panel p-6 sm:p-8 bg-white space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#E9E4DC]">
          <div className="w-9 h-9 rounded-xl bg-[#F2EEE8] text-[#9B7775] flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#292722]">Data & Demo Controls</h2>
            <p className="text-xs text-[#817B73]">
              Export your profile JSON, clear saved prompts, or reset the entire demo workspace
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportProfile}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-xs font-medium text-[#292722]"
          >
            <Download className="w-4 h-4 text-[#9B7775]" />
            <span>Export Profile (JSON)</span>
          </button>

          <button
            type="button"
            onClick={clearSavedPrompts}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-xs font-medium text-[#292722]"
          >
            <Trash2 className="w-4 h-4 text-[#817B73]" />
            <span>Clear Saved Prompts</span>
          </button>

          <button
            type="button"
            onClick={resetAllDemoData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E9DAD5]/60 hover:bg-[#9B7775] text-[#50434F] hover:text-white text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </section>
    </div>
  );
};

