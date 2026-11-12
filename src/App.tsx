import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { BrandedLoadingScreen } from './components/animations/BrandedLoadingScreen';
import { ToastContainer } from './components/notifications/ToastContainer';
import { UsageLimitModal } from './components/modals/UsageLimitModal';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingPage } from './pages/Landing/LandingPage';

// Code-split workspace and auth routes for fast initial load
const AuthPage = React.lazy(() =>
  import('./pages/Authentication/AuthPage').then((m) => ({ default: m.AuthPage }))
);
const OnboardingPage = React.lazy(() =>
  import('./pages/Onboarding/OnboardingPage').then((m) => ({ default: m.OnboardingPage }))
);
const DashboardPage = React.lazy(() =>
  import('./pages/Dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const SavedPromptsPage = React.lazy(() =>
  import('./pages/Dashboard/SavedPromptsPage').then((m) => ({ default: m.SavedPromptsPage }))
);
const SmartBuilderPage = React.lazy(() =>
  import('./pages/SmartBuilder/SmartBuilderPage').then((m) => ({ default: m.SmartBuilderPage }))
);
const PromptLibraryPage = React.lazy(() =>
  import('./pages/PromptLibrary/PromptLibraryPage').then((m) => ({ default: m.PromptLibraryPage }))
);
const ProfilePage = React.lazy(() =>
  import('./pages/Profile/ProfilePage').then((m) => ({ default: m.ProfilePage }))
);
const IntegrationsPage = React.lazy(() =>
  import('./pages/Integrations/IntegrationsPage').then((m) => ({ default: m.IntegrationsPage }))
);
const ChromeExtensionPage = React.lazy(() =>
  import('./pages/ChromeExtension/ChromeExtensionPage').then((m) => ({
    default: m.ChromeExtensionPage,
  }))
);
const UsagePage = React.lazy(() =>
  import('./pages/Usage/UsagePage').then((m) => ({ default: m.UsagePage }))
);
const SettingsPage = React.lazy(() =>
  import('./pages/Settings/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);
const SupportPage = React.lazy(() =>
  import('./pages/Support/SupportPage').then((m) => ({ default: m.SupportPage }))
);

const RouteFallback: React.FC = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="w-32 h-[2px] bg-[#E9E4DC] rounded-full overflow-hidden">
      <div className="w-1/2 h-full bg-[#9B7775] animate-pulse" />
    </div>
  </div>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  return (
    <AppProvider>
      {showInitialLoader && (
        <BrandedLoadingScreen onComplete={() => setShowInitialLoader(false)} />
      )}
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        <UsageLimitModal />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Public & Auth Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<AuthPage initialMode="signin" />} />
            <Route path="/signup" element={<AuthPage initialMode="signup" />} />
            <Route path="/forgot-password" element={<AuthPage initialMode="forgot" />} />
            <Route path="/onboarding" element={<OnboardingPage />} />

            {/* Main SaaS Workspace Routes */}
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/builder"
              element={
                <DashboardLayout>
                  <SmartBuilderPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/library"
              element={
                <DashboardLayout>
                  <PromptLibraryPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/saved"
              element={
                <DashboardLayout>
                  <SavedPromptsPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <DashboardLayout>
                  <ProfilePage />
                </DashboardLayout>
              }
            />
            <Route
              path="/integrations"
              element={
                <DashboardLayout>
                  <IntegrationsPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/extension"
              element={
                <DashboardLayout>
                  <ChromeExtensionPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/usage"
              element={
                <DashboardLayout>
                  <UsagePage />
                </DashboardLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/support"
              element={
                <DashboardLayout>
                  <SupportPage />
                </DashboardLayout>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
