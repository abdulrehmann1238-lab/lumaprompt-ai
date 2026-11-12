import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AIDestination,
  ExtensionSettings,
  GeneratedPrompt,
  IntegrationConfig,
  PromptObjective,
  ToastMessage,
  UsageLogEntry,
  UsageState,
  UserProfile,
} from '../types';
import {
  DEFAULT_EXTENSION_SETTINGS,
  DEFAULT_USAGE_STATE,
  DEFAULT_USER_PROFILE,
  INITIAL_RECENT_PROMPTS,
  INITIAL_USAGE_LOG,
} from '../data/mockUser';
import { INITIAL_INTEGRATIONS } from '../data/integrations';
import { clearLumaStorage, loadFromStorage, saveToStorage } from '../utils/storage';

interface BuilderDraft {
  roughRequest: string;
  objective: PromptObjective;
  destination: AIDestination;
  frameworkId?: string;
  autoGenerate?: boolean;
}

interface NotificationPrefs {
  productUpdates: boolean;
  usageNotifications: boolean;
  newPromptReleases: boolean;
}

interface AppContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfileToDefault: () => void;

  isAuthenticated: boolean;
  loginUser: (email?: string, name?: string) => void;
  logoutUser: () => void;

  recentPrompts: GeneratedPrompt[];
  addGeneratedPrompt: (prompt: GeneratedPrompt) => void;
  updateGeneratedPrompt: (id: string, fullPrompt: string) => void;
  toggleSaveGeneratedPrompt: (id: string) => void;
  clearSavedPrompts: () => void;

  savedFrameworkIds: string[];
  toggleSaveFramework: (frameworkId: string) => void;

  integrations: IntegrationConfig[];
  toggleIntegrationConnection: (id: IntegrationConfig['id'], connectState?: boolean) => void;

  extensionSettings: ExtensionSettings;
  updateExtensionSettings: (updates: Partial<ExtensionSettings>) => void;

  usage: UsageState;
  usageLogs: UsageLogEntry[];
  incrementUsage: (promptTitle: string, destination: AIDestination, frameworkUsed: string) => boolean;
  simulateReachLimit: () => void;
  restoreNormalUsage: () => void;
  joinProWaitlist: (email: string) => void;

  showLimitModal: boolean;
  setShowLimitModal: (show: boolean) => void;

  builderDraft: BuilderDraft;
  setBuilderDraft: React.Dispatch<React.SetStateAction<BuilderDraft>>;

  notificationPrefs: NotificationPrefs;
  updateNotificationPrefs: (updates: Partial<NotificationPrefs>) => void;

  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;

  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() =>
    loadFromStorage('luma_profile', DEFAULT_USER_PROFILE)
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    loadFromStorage('luma_authenticated', true)
  );
  const [recentPrompts, setRecentPrompts] = useState<GeneratedPrompt[]>(() =>
    loadFromStorage('luma_recent_prompts', INITIAL_RECENT_PROMPTS)
  );
  const [savedFrameworkIds, setSavedFrameworkIds] = useState<string[]>(() =>
    loadFromStorage('luma_saved_frameworks', [
      'fw-brand-voice',
      'fw-coaching-launch',
      'fw-linkedin-strategy',
    ])
  );
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>(() =>
    loadFromStorage('luma_integrations', INITIAL_INTEGRATIONS)
  );
  const [extensionSettings, setExtensionSettings] = useState<ExtensionSettings>(() =>
    loadFromStorage('luma_extension_settings', DEFAULT_EXTENSION_SETTINGS)
  );
  const [usage, setUsage] = useState<UsageState>(() =>
    loadFromStorage('luma_usage', DEFAULT_USAGE_STATE)
  );
  const [usageLogs, setUsageLogs] = useState<UsageLogEntry[]>(() =>
    loadFromStorage('luma_usage_logs', INITIAL_USAGE_LOG)
  );
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>(() =>
    loadFromStorage('luma_notifications', {
      productUpdates: true,
      usageNotifications: true,
      newPromptReleases: true,
    })
  );

  const [builderDraft, setBuilderDraft] = useState<BuilderDraft>({
    roughRequest: 'Write a LinkedIn post about my launch, keep it short.',
    objective: 'Content Creation',
    destination: 'Claude',
    frameworkId: undefined,
    autoGenerate: false,
  });

  const [showLimitModal, setShowLimitModal] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    saveToStorage('luma_profile', profile);
  }, [profile]);

  useEffect(() => {
    saveToStorage('luma_authenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    saveToStorage('luma_recent_prompts', recentPrompts);
  }, [recentPrompts]);

  useEffect(() => {
    saveToStorage('luma_saved_frameworks', savedFrameworkIds);
  }, [savedFrameworkIds]);

  useEffect(() => {
    saveToStorage('luma_integrations', integrations);
  }, [integrations]);

  useEffect(() => {
    saveToStorage('luma_extension_settings', extensionSettings);
  }, [extensionSettings]);

  useEffect(() => {
    saveToStorage('luma_usage', usage);
  }, [usage]);

  useEffect(() => {
    saveToStorage('luma_usage_logs', usageLogs);
  }, [usageLogs]);

  useEffect(() => {
    saveToStorage('luma_notifications', notificationPrefs);
  }, [notificationPrefs]);

  const showToast = useCallback(
    (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, title, description, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3600);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetProfileToDefault = useCallback(() => {
    setProfile(DEFAULT_USER_PROFILE);
    showToast('Profile reset', 'Restored Sarah Mitchell’s default Bloom & Co. profile.');
  }, [showToast]);

  const loginUser = useCallback((email?: string, name?: string) => {
    setIsAuthenticated(true);
    if (email || name) {
      setProfile((prev) => ({
        ...prev,
        email: email || prev.email,
        name: name || prev.name,
      }));
    }
  }, []);

  const logoutUser = useCallback(() => {
    setIsAuthenticated(false);
    showToast('Signed out', 'You have been signed out of your Luma workspace.', 'info');
  }, [showToast]);

  const addGeneratedPrompt = useCallback((prompt: GeneratedPrompt) => {
    setRecentPrompts((prev) => [prompt, ...prev.slice(0, 19)]);
  }, []);

  const updateGeneratedPrompt = useCallback((id: string, fullPrompt: string) => {
    setRecentPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, fullPrompt } : p))
    );
  }, []);

  const toggleSaveGeneratedPrompt = useCallback(
    (id: string) => {
      setRecentPrompts((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            const nextSaved = !p.isSaved;
            showToast(
              nextSaved ? 'Prompt saved to workspace' : 'Removed from saved prompts',
              p.title
            );
            return { ...p, isSaved: nextSaved };
          }
          return p;
        })
      );
    },
    [showToast]
  );

  const clearSavedPrompts = useCallback(() => {
    setRecentPrompts((prev) => prev.map((p) => ({ ...p, isSaved: false })));
    setSavedFrameworkIds([]);
    showToast('Saved prompts cleared', 'Your saved prompt bookmarks have been cleared.');
  }, [showToast]);

  const toggleSaveFramework = useCallback(
    (frameworkId: string) => {
      setSavedFrameworkIds((prev) => {
        const exists = prev.includes(frameworkId);
        const next = exists ? prev.filter((id) => id !== frameworkId) : [...prev, frameworkId];
        showToast(
          exists ? 'Removed from saved frameworks' : 'Saved to your library',
          exists ? 'Framework removed from bookmarks.' : 'Ready whenever you need it in Smart Builder.'
        );
        return next;
      });
    },
    [showToast]
  );

  const toggleIntegrationConnection = useCallback(
    (id: IntegrationConfig['id'], connectState?: boolean) => {
      setIntegrations((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          const nextConnected = connectState !== undefined ? connectState : !item.connected;
          return {
            ...item,
            connected: nextConnected,
            connectedAt: nextConnected ? 'Connected Just Now' : undefined,
          };
        })
      );
    },
    []
  );

  const updateExtensionSettings = useCallback((updates: Partial<ExtensionSettings>) => {
    setExtensionSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const incrementUsage = useCallback(
    (promptTitle: string, destination: AIDestination, frameworkUsed: string): boolean => {
      if (usage.used >= usage.monthlyAllowance) {
        setShowLimitModal(true);
        return false;
      }
      setUsage((prev) => {
        const nextUsed = Math.min(prev.monthlyAllowance, prev.used + 1);
        const updatedWeekly = prev.weeklyUsage.map((d, idx) =>
          idx === prev.weeklyUsage.length - 1 ? { ...d, count: d.count + 1 } : d
        );
        return {
          ...prev,
          used: nextUsed,
          weeklyUsage: updatedWeekly,
        };
      });
      const newEntry: UsageLogEntry = {
        id: `log-${Date.now()}`,
        promptTitle,
        destination,
        frameworkUsed,
        timestamp: 'Just now',
      };
      setUsageLogs((prev) => [newEntry, ...prev]);
      return true;
    },
    [usage.used, usage.monthlyAllowance]
  );

  const simulateReachLimit = useCallback(() => {
    setUsage((prev) => ({ ...prev, used: prev.monthlyAllowance }));
    setShowLimitModal(true);
    showToast(
      'Demo limit reached (20/20)',
      'Showing how Luma handles the monthly Free tier limit.',
      'warning'
    );
  }, [showToast]);

  const restoreNormalUsage = useCallback(() => {
    setUsage(DEFAULT_USAGE_STATE);
    setShowLimitModal(false);
    showToast('Allowance restored (7/20 used)', 'You have 13 remaining generations this month.');
  }, [showToast]);

  const joinProWaitlist = useCallback(
    (email: string) => {
      setUsage((prev) => ({
        ...prev,
        proWaitlistJoined: true,
        proWaitlistEmail: email,
      }));
      showToast('Added to Luma Pro waitlist', `We’ll notify ${email} as soon as Pro launches.`);
    },
    [showToast]
  );

  const updateNotificationPrefs = useCallback((updates: Partial<NotificationPrefs>) => {
    setNotificationPrefs((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetAllDemoData = useCallback(() => {
    clearLumaStorage();
    setProfile(DEFAULT_USER_PROFILE);
    setIsAuthenticated(true);
    setRecentPrompts(INITIAL_RECENT_PROMPTS);
    setSavedFrameworkIds(['fw-brand-voice', 'fw-coaching-launch', 'fw-linkedin-strategy']);
    setIntegrations(INITIAL_INTEGRATIONS);
    setExtensionSettings(DEFAULT_EXTENSION_SETTINGS);
    setUsage(DEFAULT_USAGE_STATE);
    setUsageLogs(INITIAL_USAGE_LOG);
    setBuilderDraft({
      roughRequest: 'Write a LinkedIn post about my launch, keep it short.',
      objective: 'Content Creation',
      destination: 'Claude',
      frameworkId: undefined,
      autoGenerate: false,
    });
    setShowLimitModal(false);
    showToast(
      'Demo workspace reset',
      'All profile data, usage counters, and prompts have been restored to default.'
    );
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfileToDefault,
        isAuthenticated,
        loginUser,
        logoutUser,
        recentPrompts,
        addGeneratedPrompt,
        updateGeneratedPrompt,
        toggleSaveGeneratedPrompt,
        clearSavedPrompts,
        savedFrameworkIds,
        toggleSaveFramework,
        integrations,
        toggleIntegrationConnection,
        extensionSettings,
        updateExtensionSettings,
        usage,
        usageLogs,
        incrementUsage,
        simulateReachLimit,
        restoreNormalUsage,
        joinProWaitlist,
        showLimitModal,
        setShowLimitModal,
        builderDraft,
        setBuilderDraft,
        notificationPrefs,
        updateNotificationPrefs,
        toasts,
        showToast,
        dismissToast,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}

