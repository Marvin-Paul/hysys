import {
  useState, useEffect, useCallback,
  createContext, useContext, type ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

// ── Types ────────────────────────────────────────────────────────────────────
interface ContentMap { [key: string]: unknown }
interface SectionCache {
  [section: string]: { data: ContentMap; loaded: boolean; fetchedAt: number }
}

interface SiteContentContextType {
  getContent:     (section: string, key: string, fallback?: string) => string;
  getContentRaw:  (section: string, key: string) => unknown;
  sectionLoaded:  (section: string) => boolean;
  refreshSection: (section: string) => Promise<void>;
  updateContent:  (section: string, key: string, value: unknown) => Promise<void>;
  saveAllContent: (section: string, content: Record<string, unknown>) => Promise<void>;
  getAllContent:   (section: string) => ContentMap;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

// Cache TTL — only refetch if data is older than 5 minutes
const CACHE_TTL_MS = 5 * 60 * 1000;

// ── Provider ─────────────────────────────────────────────────────────────────
export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<SectionCache>({});
  const { user, role } = useAuth();

  const fetchSection = useCallback(async (section: string) => {
    const existing = cache[section];
    // Skip if already loaded and not stale
    if (existing?.loaded && Date.now() - existing.fetchedAt < CACHE_TTL_MS) return;

    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content_key, content_value')
        .eq('section', section);

      if (error) {
        console.warn(`[useSiteContent] fetch failed for "${section}":`, error.message);
        // Mark as loaded anyway so we don't keep hammering Supabase
        setCache(prev => ({
          ...prev,
          [section]: { data: prev[section]?.data || {}, loaded: true, fetchedAt: Date.now() },
        }));
        return;
      }

      const map: ContentMap = {};
      (data || []).forEach((row: any) => { map[row.content_key] = row.content_value; });

      setCache(prev => ({
        ...prev,
        [section]: { data: map, loaded: true, fetchedAt: Date.now() },
      }));
    } catch (e) {
      console.warn(`[useSiteContent] unexpected error for "${section}":`, e);
    }
  }, [cache]);

  const refreshSection = useCallback(async (section: string) => {
    // Force refetch by resetting fetchedAt
    setCache(prev => ({
      ...prev,
      [section]: { ...(prev[section] || { data: {}, loaded: false }), fetchedAt: 0 },
    }));
    await fetchSection(section);
  }, [fetchSection]);

  const getContent = useCallback((section: string, key: string, fallback = ''): string => {
    const val = cache[section]?.data[key];
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (Array.isArray(val) || (val && typeof val === 'object')) return JSON.stringify(val);
    return fallback;
  }, [cache]);

  const getContentRaw = useCallback((section: string, key: string): unknown => {
    return cache[section]?.data[key];
  }, [cache]);

  const sectionLoaded = useCallback((section: string): boolean => {
    return !!cache[section]?.loaded;
  }, [cache]);

  const getAllContent = useCallback((section: string): ContentMap => {
    return cache[section]?.data || {};
  }, [cache]);

  const updateContent = useCallback(async (section: string, key: string, value: unknown) => {
    if (role !== 'admin') return;
    const { error } = await supabase.from('site_content').upsert(
      { section, content_key: key, content_value: value, updated_by: user?.id },
      { onConflict: 'section,content_key' }
    );
    if (error) throw error;
    setCache(prev => ({
      ...prev,
      [section]: {
        loaded: prev[section]?.loaded ?? false,
        fetchedAt: prev[section]?.fetchedAt ?? 0,
        data: { ...(prev[section]?.data || {}), [key]: value },
      },
    }));
  }, [role, user]);

  const saveAllContent = useCallback(async (section: string, content: Record<string, unknown>) => {
    if (role !== 'admin') return;
    const upserts = Object.entries(content).map(([key, value]) => ({
      section, content_key: key, content_value: value, updated_by: user?.id,
    }));
    const { error } = await supabase.from('site_content')
      .upsert(upserts, { onConflict: 'section,content_key' });
    if (error) throw error;
    setCache(prev => ({
      ...prev,
      [section]: {
        loaded: true,
        fetchedAt: Date.now(),
        data: { ...(prev[section]?.data || {}), ...content },
      },
    }));
  }, [role, user]);

  return (
    <SiteContentContext.Provider value={{
      getContent, getContentRaw, sectionLoaded, refreshSection,
      updateContent, saveAllContent, getAllContent,
    }}>
      {children}
    </SiteContentContext.Provider>
  );
}

// ── Per-section hook ─────────────────────────────────────────────────────────
export function useSiteContent(section: string) {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within a SiteContentProvider');

  const { refreshSection } = ctx;

  useEffect(() => {
    // Only fetch if not already cached — avoids hammering Supabase
    refreshSection(section);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return {
    getContent:     (key: string, fallback = '') => ctx.getContent(section, key, fallback),
    getContentRaw:  (key: string) => ctx.getContentRaw(section, key),
    loaded:         ctx.sectionLoaded(section),
    refresh:        () => ctx.refreshSection(section),
    updateContent:  (key: string, value: unknown) => ctx.updateContent(section, key, value),
    saveAllContent: (content: Record<string, unknown>) => ctx.saveAllContent(section, content),
    allContent:     ctx.getAllContent(section),
    // Compatibility alias
    getValue: (sectionAlias: string, key: string, fallback = '') =>
      ctx.getContent(sectionAlias === section ? section : sectionAlias, key, fallback),
  };
}

export function useAdminContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useAdminContent must be used within a SiteContentProvider');
  return ctx;
}
