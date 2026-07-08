import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      if (!supabase) {
        setError('Supabase is not configured');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
        return;
      }

      try {
        const { error: authError } = await supabase.auth.exchangeCodeForSession(
          window.location.search
        );
        if (authError) {
          setError(authError.message);
          setTimeout(() => navigate('/login', { replace: true }), 2000);
          return;
        }

        // Fetch role from profiles table and redirect accordingly
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          const role = profile?.role || 'user';
          navigate(role === 'admin' ? '/dashboard' : '/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      }
    };
    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#032d60] to-[#0b5394] flex items-center justify-center">
        <div className="text-center text-white bg-white/10 rounded-xl p-8 max-w-md">
          <div className="text-red-400 text-5xl mb-4">!</div>
          <p className="text-xl mb-2">Authentication Failed</p>
          <p className="text-red-300">{error}</p>
          <p className="text-white/60 mt-4 text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#032d60] to-[#0b5394] flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xl">Signing you in...</p>
      </div>
    </div>
  );
}
