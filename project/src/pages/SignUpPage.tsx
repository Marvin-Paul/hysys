import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Building, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle } = useAuth();

  const passwordStrength = () => {
    const p = formData.password;
    if (p.length === 0) return 0;
    if (p.length < 6) return 1;
    if (p.length < 8) return 2;
    return 3;
  };

  const friendlyError = (msg: string) => {
    if (msg.includes('User already registered') || msg.includes('already been registered'))
      return 'An account with this email already exists. Try signing in instead.';
    if (msg.includes('Password should be at least'))
      return 'Password must be at least 6 characters.';
    if (msg.includes('Unable to validate email'))
      return 'Please enter a valid email address.';
    if (msg.includes('signup is disabled'))
      return 'New sign-ups are currently disabled. Please contact support.';
    return msg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service to continue.');
      return;
    }

    setLoading(true);
    const { error } = await signUpWithEmail(formData.email, formData.password, {
      first_name: formData.firstName,
      last_name: formData.lastName,
      company: formData.company,
    });
    setLoading(false);

    if (error) {
      setError(friendlyError(error.message));
    } else {
      // Supabase sends a confirmation email — show success state
      setSuccess(true);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      // Google OAuth redirects the page, so no further action needed here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up with Google');
      setGoogleLoading(false);
    }
  };

  /* ── Email confirmation success screen ── */
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#032d60] to-[#0b5394] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h1>
            <p className="text-gray-600 mb-2">
              We sent a confirmation link to:
            </p>
            <p className="font-semibold text-[#032d60] mb-6 break-all">{formData.email}</p>
            <p className="text-sm text-gray-500 mb-8">
              Click the link in the email to activate your account. If you don't see it, check your spam folder.
            </p>
            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full py-3 bg-[#0b5394] text-white rounded-lg font-semibold hover:bg-[#032d60] transition-all text-center"
              >
                Go to Sign In
              </Link>
              <button
                type="button"
                onClick={() => { setSuccess(false); setFormData({ ...formData, password: '', confirmPassword: '' }); }}
                className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all text-center"
              >
                Use a different email
              </button>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link to="/" className="text-white/80 text-sm hover:text-white hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Sign-up form ── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#032d60] to-[#0b5394] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {/* Logo + heading */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex flex-col items-center gap-3 mb-6">
              <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-gray-200 overflow-hidden flex items-center justify-center">
                <img src="/Mavy%20logo2.png" alt="HYSYS logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-[#032d60]">HYSYS GLOBAL SOLUTIONS LIMITED</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm">Start your free 14-day trial today</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Company <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
                  placeholder="Company Inc."
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'} required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
                  placeholder="At least 6 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map((level) => (
                      <div key={level} className={`h-1 flex-1 rounded transition-all ${
                        passwordStrength() >= level
                          ? passwordStrength() === 1 ? 'bg-red-400' : passwordStrength() === 2 ? 'bg-yellow-400' : 'bg-green-500'
                          : 'bg-gray-200'
                      }`} />
                    ))}
                  </div>
                  <p className={`text-xs ${passwordStrength() === 1 ? 'text-red-500' : passwordStrength() === 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {passwordStrength() === 1 ? 'Weak — use at least 8 characters' : passwordStrength() === 2 ? 'Medium — add numbers or symbols' : 'Strong password'}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'} required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-9 pr-10 py-2.5 rounded-lg border focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  placeholder="Repeat your password"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0b5394] focus:ring-[#0b5394] cursor-pointer"
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-[#0b5394] hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-[#0b5394] hover:underline">Privacy Policy</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreedToTerms || loading}
              className="w-full py-3 bg-[#0b5394] text-white rounded-lg font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Social sign-up */}
          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-gray-200" />
              <span className="px-4 text-xs text-gray-400 bg-white">Or continue with</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleSignUp}
                disabled={googleLoading}
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50"
              >
                {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.23v2.84C4.13 20.46 7.82 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.23C1.18 8.88.68 10.87.68 12s.5 3.12 1.56 4.93l2.99-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.19 15.02 1 12 1 7.82 1 4.13 3.48 2.23 7.07l3.61 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.03-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.404-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.44-4.492 2.573-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
                  <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.803-3.532 1.815-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
                Apple
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400 mb-3">No credit card required</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
              {['Free trial', 'No setup fees', 'Cancel anytime'].map((t) => (
                <div key={t} className="flex flex-col items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign-in link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0b5394] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-white/80 text-sm hover:text-white hover:underline">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
