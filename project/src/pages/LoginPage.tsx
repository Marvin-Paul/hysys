import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signInWithEmail(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // Role-based redirect — fetch profile
      const { data: { user: u } } = await (await import('../lib/supabase')).supabase.auth.getUser();
      if (u) {
        const { data: profile } = await (await import('../lib/supabase')).supabase
          .from('profiles').select('role').eq('id', u.id).single();
        navigate(profile?.role === 'admin' ? '/dashboard' : '/crm', { replace: true });
      } else {
        navigate('/crm', { replace: true });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#032d60] to-[#0b5394] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex flex-col items-center gap-4 mb-6">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] rounded-full bg-white shadow-lg border-4 border-gray-300 overflow-hidden flex items-center justify-center">
                <img src="/Mavy%20logo2.png" alt="HYSYS logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-bold text-[#032d60]">HYSYS GLOBAL SOLUTIONS LIMITED</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0b5394] focus:ring-[#0b5394]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#0b5394] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0b5394] text-white rounded-lg font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.23v2.84C4.13 20.46 7.82 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.23C1.18 8.88.68 10.87.68 12s.5 3.12 1.56 4.93l2.99-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.19 15.02 1 12 1 7.82 1 4.13 3.48 2.23 7.07l3.61 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                )}
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.03-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.404-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.44-4.492 2.573-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/><path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.803-3.532 1.815-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                Apple
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#0b5394] font-semibold hover:underline">
                Sign up for free
              </Link>
            </p>
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
