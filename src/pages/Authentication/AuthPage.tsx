import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  ArrowLeft,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { isValidEmail } from '../../utils/validation';

interface AuthPageProps {
  initialMode?: 'signin' | 'signup' | 'forgot';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'signin' }) => {
  const location = useLocation();
  const derivedMode: 'signin' | 'signup' | 'forgot' =
    location.pathname === '/signup'
      ? 'signup'
      : location.pathname === '/forgot-password'
      ? 'forgot'
      : initialMode;

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(derivedMode);
  const [email, setEmail] = useState('sarah@bloomandco.studio');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Simulated Google OAuth Modal state
  const [showOAuthModal, setShowOAuthModal] = useState(false);
  const [oauthApproving, setOauthApproving] = useState(false);

  const navigate = useNavigate();
  const { loginUser, showToast } = useApp();

  // Keep mode in sync if route changes
  React.useEffect(() => {
    setMode(derivedMode);
    setError('');
    setResetSent(false);
  }, [derivedMode]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Please enter your password (at least 6 characters).');
      return;
    }
    setError('');
    loginUser(email);
    showToast('Welcome back, Sarah', 'Signed in to your Luma workspace.');
    navigate('/dashboard');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your confirmation password.');
      return;
    }
    setError('');
    loginUser(email);
    showToast('Account created', 'Let’s personalize your Luma business profile.');
    navigate('/onboarding');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter the email address associated with your Luma account.');
      return;
    }
    setError('');
    setResetSent(true);
    showToast('Password reset link sent', `Simulated reset instructions sent to ${email}.`);
  };

  const handleOAuthApprove = (destination: '/onboarding' | '/dashboard') => {
    setOauthApproving(true);
    setTimeout(() => {
      setOauthApproving(false);
      setShowOAuthModal(false);
      loginUser('sarah@bloomandco.studio', 'Sarah Mitchell');
      showToast(
        'Google OAuth 2.0 Verified',
        destination === '/onboarding'
          ? 'Continuing to your 4-step profile onboarding.'
          : 'Welcome back to your Luma workspace, Sarah.'
      );
      navigate(destination);
    }, 550);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#292722] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F2EEE8] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl leading-none text-[#292722]">Luma</span>
            <span className="text-[10px] text-[#817B73]">Prompt intelligence</span>
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#817B73] hover:text-[#292722]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Website
        </Link>
      </div>

      {/* Main Centered Auth Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="editorial-panel p-7 sm:p-9 bg-white">
          {mode === 'signin' && (
            <>
              <div className="text-center mb-7">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                  Welcome Back
                </span>
                <h1 className="font-serif text-3xl text-[#292722] mt-1">
                  Sign in to Luma
                </h1>
                <p className="text-xs text-[#817B73] mt-1.5">
                  Your saved business profile and prompt library are waiting.
                </p>
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={() => setShowOAuthModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-sm font-medium text-[#292722] flex items-center justify-center gap-3 transition-colors mb-5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#9B7775"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 15.64 5 12c0-3.64 3.36-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex py-2 items-center mb-5">
                <div className="flex-grow border-t border-[#E9E4DC]" />
                <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-[#817B73]">
                  or with email
                </span>
                <div className="flex-grow border-t border-[#E9E4DC]" />
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#817B73] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@bloomandco.studio"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#817B73] absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-[#817B73]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[#E9E4DC] text-[#9B7775] focus:ring-[#9B7775]"
                    />
                    <span>Remember me</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-[#9B7775] hover:text-[#50434F] font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <p className="text-xs text-[#9B7775] bg-[#E9DAD5]/40 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="text-center text-xs text-[#817B73] mt-6 pt-5 border-t border-[#E9E4DC]">
                New to Luma?{' '}
                <Link to="/signup" className="text-[#292722] font-semibold hover:text-[#9B7775]">
                  Create an account →
                </Link>
              </p>
            </>
          )}

          {mode === 'signup' && (
            <>
              <div className="text-center mb-7">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                  Create Your Workspace
                </span>
                <h1 className="font-serif text-3xl text-[#292722] mt-1">
                  Start with your profile
                </h1>
                <p className="text-xs text-[#817B73] mt-1.5">
                  Save your business context once. Generate tailored prompts forever.
                </p>
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={() => setShowOAuthModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-sm font-medium text-[#292722] flex items-center justify-center gap-3 transition-colors mb-5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#9B7775"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 15.64 5 12c0-3.64 3.36-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex py-2 items-center mb-5">
                <div className="flex-grow border-t border-[#E9E4DC]" />
                <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-[#817B73]">
                  or register with email
                </span>
                <div className="flex-grow border-t border-[#E9E4DC]" />
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@bloomandco.studio"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#292722] mb-1.5">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                  />
                </div>

                {error && (
                  <p className="text-xs text-[#9B7775] bg-[#E9DAD5]/40 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>Create account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="text-center text-xs text-[#817B73] mt-6 pt-5 border-t border-[#E9E4DC]">
                Already have an account?{' '}
                <Link to="/signin" className="text-[#292722] font-semibold hover:text-[#9B7775]">
                  Sign in →
                </Link>
              </p>
            </>
          )}

          {mode === 'forgot' && (
            <>
              <div className="text-center mb-7">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
                  Account Recovery
                </span>
                <h1 className="font-serif text-3xl text-[#292722] mt-1">
                  Reset your password
                </h1>
                <p className="text-xs text-[#817B73] mt-1.5">
                  Enter your email and we’ll send a simulated password reset link.
                </p>
              </div>

              {resetSent ? (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-[#EAEDE5] border border-[#728C75]/30 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#728C75] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#292722]">Check your inbox</p>
                      <p className="text-xs text-[#817B73] mt-0.5">
                        We’ve sent password reset instructions to{' '}
                        <span className="font-medium text-[#292722]">{email}</span>.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/signin"
                    className="w-full py-3 rounded-xl bg-[#292722] text-white text-center text-xs font-medium block"
                  >
                    Return to Sign In
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#292722] mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@bloomandco.studio"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
                    />
                  </div>
                  {error && <p className="text-xs text-[#9B7775]">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-sm font-medium transition-colors"
                  >
                    Send Reset Link
                  </button>
                </form>
              )}

              <p className="text-center text-xs text-[#817B73] mt-6 pt-5 border-t border-[#E9E4DC]">
                Remembered your password?{' '}
                <Link to="/signin" className="text-[#292722] font-semibold hover:text-[#9B7775]">
                  Back to Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Simulated OAuth 2.0 Authorization Screen Modal */}
      {showOAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292722]/45 backdrop-blur-[2px] p-4">
          <div className="bg-white border border-[#E9E4DC] rounded-[22px] max-w-md w-full p-6 sm:p-8 shadow-editorial-lg relative">
            <button
              type="button"
              onClick={() => setShowOAuthModal(false)}
              className="absolute top-5 right-5 text-[#817B73] hover:text-[#292722]"
              aria-label="Cancel OAuth"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#E9E4DC]">
              <div className="w-10 h-10 rounded-xl bg-[#F2EEE8] border border-[#E9E4DC] flex items-center justify-center text-[#9B7775]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#817B73]">
                  Simulated OAuth 2.0 Consent Screen
                </span>
                <h3 className="font-serif text-xl text-[#292722]">
                  Authorize LumaPrompt.ai
                </h3>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#E9DAD5] text-[#50434F] font-serif text-xs flex items-center justify-center font-semibold">
                SM
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#292722]">Sarah Mitchell</p>
                <p className="text-[#817B73]">sarah@bloomandco.studio · Google Workspace</p>
              </div>
            </div>

            <div className="space-y-2.5 mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#817B73]">
                Requested Profile Permissions:
              </p>
              {[
                'Verify your name, email address, and profile avatar',
                'Create an OAuth 2.0 session token for the Luma Engine & MCP Server',
                'Sync your saved Business Profile across web & Chrome Extension',
              ].map((perm) => (
                <div key={perm} className="flex items-start gap-2.5 text-xs text-[#292722]/90">
                  <CheckCircle2 className="w-4 h-4 text-[#728C75] shrink-0 mt-0.5" />
                  <span>{perm}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#F2EEE8]/70 text-[11px] text-[#817B73] mb-6">
              <strong>Prototype Notice:</strong> This is a simulated OAuth 2.0 authorization step demonstrating Milestone 1 authentication UX.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowOAuthModal(false)}
                className="w-full sm:w-1/3 py-2.5 rounded-xl border border-[#E9E4DC] bg-white hover:bg-[#FAF8F5] text-xs font-medium text-[#817B73]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={oauthApproving}
                onClick={() =>
                  handleOAuthApprove(mode === 'signup' ? '/onboarding' : '/dashboard')
                }
                className="w-full sm:w-2/3 py-2.5 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium transition-colors"
              >
                {oauthApproving
                  ? 'Authorizing Session...'
                  : mode === 'signup'
                  ? 'Approve & Start Onboarding'
                  : 'Approve & Open Dashboard'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="text-center text-xs text-[#817B73]">
        OAuth 2.0 & Luma Engine Prototype · Pre-filled with Sarah Mitchell’s demo credentials
      </div>
    </div>
  );
};

