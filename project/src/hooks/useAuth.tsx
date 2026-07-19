import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/db/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isAdminFromUser(user: User | null | undefined): boolean {
  if (!user) return false;
  const metaRole = user.app_metadata?.role;
  if (metaRole === 'admin') return true;
  return user.user_metadata?.role === 'admin';
}

async function fetchIsAdmin(user: User | null | undefined): Promise<boolean> {
  if (isAdminFromUser(user)) return true;
  if (!supabase || !user?.id || !UUID_RE.test(user.id)) return false;

  const { data: rpcData, error: rpcError } = await supabase.rpc('is_admin');
  if (!rpcError) return rpcData === true;

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error);
    return false;
  }
  return data?.role === 'admin';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      const nextUser = currentSession?.user ?? null;
      setSession(currentSession);
      setUser(nextUser);
      if (!nextUser?.id) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      fetchIsAdmin(nextUser).then(setIsAdmin).finally(() => setLoading(false));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      const nextUser = nextSession?.user ?? null;
      setSession(nextSession);
      setUser(nextUser);
      if (!nextUser?.id) {
        setIsAdmin(false);
        return;
      }
      fetchIsAdmin(nextUser).then(setIsAdmin);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase is not configured.' };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    const nextUser = data.user;
    setSession(data.session);
    setUser(nextUser);
    setIsAdmin(await fetchIsAdmin(nextUser));
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
