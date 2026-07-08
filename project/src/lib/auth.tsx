import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

// ── Types ────────────────────────────────────────────────────────────────────
interface AuthContextType {
  user:            User | null;
  session:         Session | null;
  loading:         boolean;
  role:            'admin' | 'user' | null;
  isAdmin:         boolean;
  signInWithGoogle: (redirectTo?: string) => Promise<void>;
  signInWithEmail:  (email: string, password: string) => Promise<{ error: Error | null; user: User | null }>;
  signUpWithEmail:  (
    email: string,
    password: string,
    metadata?: { first_name?: string; last_name?: string; company?: string }
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Helper: fetch role from profiles table ───────────────────────────────────
async function fetchUserRole(userId: string): Promise<'admin' | 'user'> {
  if (!supabase) return 'user';
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !data) return 'user'; // default to user if not found
  return (data.role === 'admin') ? 'admin' : 'user';
}

// ── Helper: ensure profile row exists ───────────────────────────────────────
async function ensureProfile(user: User): Promise<void> {
  if (!supabase) return;
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (!existing) {
    const fullName = [
      user.user_metadata?.first_name,
      user.user_metadata?.last_name,
    ].filter(Boolean).join(' ') || user.email?.split('@')[0] || '';

    await supabase.from('profiles').insert({
      id:         user.id,
      full_name:  fullName,
      email:      user.email,
      role:       'user', // always default — never allow self-assignment
      created_at: new Date().toISOString(),
    });
  }
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const sb = supabase;

  const [user,    setUser]    = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role,    setRole]    = useState<'admin' | 'user' | null>(null);

  const isAdmin = role === 'admin';

  // Load session + role on mount
  useEffect(() => {
    if (!sb) {
      setLoading(false);
      return;
    }

    const timeout = setTimeout(() => setLoading(false), 6000); // safety fallback

    sb.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await ensureProfile(session.user);
        const r = await fetchUserRole(session.user.id);
        setRole(r);
      }
      clearTimeout(timeout);
      setLoading(false);
    });

    const { data: { subscription } } = sb.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await ensureProfile(session.user);
          const r = await fetchUserRole(session.user.id);
          setRole(r);
        } else {
          setRole(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  // ── Auth methods ────────────────────────────────────────────────────────────

  const notConfigured = (msg: string) => new Error(`Supabase is not configured. ${msg}`);

  const signInWithGoogle = async (redirectTo?: string) => {
    if (!sb) throw notConfigured('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo ?? `${window.location.origin}/auth/callback`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!sb) return { error: notConfigured('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'), user: null as User | null };
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    return { error, user: data?.user ?? null };
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    metadata?: { first_name?: string; last_name?: string; company?: string }
  ) => {
    if (!sb) return { error: notConfigured('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.') };
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });

    // Manually create profile if trigger hasn't fired (belt-and-suspenders)
    if (!error && data.user) {
      await ensureProfile(data.user);
    }

    return { error };
  };

  const signOut = async () => {
    if (sb) await sb.auth.signOut();
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{
      user, session, loading, role, isAdmin,
      signInWithGoogle, signInWithEmail, signUpWithEmail, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
