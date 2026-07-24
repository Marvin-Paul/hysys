import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';
import { supabase, type SiteContent } from '../lib/db/supabase';
import { TranslationContext } from '../lib/i18n';
import { getI18nKey, getCmsEnglishDefault } from '../lib/cms/cmsDefaults';

interface ContentMap {
  [key: string]: unknown;
}

interface SectionCache {
  [section: string]: {
    data: ContentMap;
    loaded: boolean;
  };
}

interface SiteContentContextType {
  getContent: (section: string, key: string, fallback?: string) => string;
  getContentAny: (section: string, keys: string[], fallback?: string) => string;
  getContentRaw: (section: string, key: string) => unknown;
  sectionLoaded: (section: string) => boolean;
  refreshSection: (section: string) => Promise<void>;
  updateContent: (section: string, key: string, value: unknown) => Promise<void>;
  saveAllContent: (section: string, content: Record<string, unknown>) => Promise<void>;
  getAllContent: (section: string) => ContentMap;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<SectionCache>({});

  const fetchSection = useCallback(async (section: string) => {
    if (!supabase) {
      setCache((prev) => ({
        ...prev,
        [section]: { data: {}, loaded: true },
      }));
      return;
    }

    const { data, error } = await supabase
      .from('site_content')
      .select('content_key, content_value')
      .eq('section', section);

    if (error) {
      console.error(`Error fetching site content for "${section}":`, error);
      return;
    }

    const map: ContentMap = {};
    (data as Pick<SiteContent, 'content_key' | 'content_value'>[]).forEach((row) => {
      map[row.content_key] = row.content_value;
    });

    setCache((prev) => ({
      ...prev,
      [section]: { data: map, loaded: true },
    }));
  }, []);

  const refreshSection = useCallback(async (section: string) => {
    await fetchSection(section);
  }, [fetchSection]);

  const getContent = useCallback((section: string, key: string, fallback = ''): string => {
    const sectionData = cache[section];
    if (!sectionData || !sectionData.loaded) return fallback;
    const val = sectionData.data[key];
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (Array.isArray(val) || (val && typeof val === 'object')) return JSON.stringify(val);
    return fallback;
  }, [cache]);

  const getContentAny = useCallback((section: string, keys: string[], fallback = ''): string => {
    for (const key of keys) {
      const val = getContent(section, key, '');
      if (val.trim()) return val;
    }
    return fallback;
  }, [getContent]);

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
    if (!supabase) {
      throw new Error('Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
    }
    const { error } = await supabase
      .from('site_content')
      .upsert(
        {
          section,
          content_key: key,
          content_value: value,
        },
        { onConflict: 'section,content_key' }
      );

    if (error) {
      console.error('Error updating site content:', error);
      throw error;
    }

    setCache((prev) => ({
      ...prev,
      [section]: {
        loaded: prev[section]?.loaded ?? false,
        data: { ...(prev[section]?.data || {}), [key]: value },
      },
    }));
  }, []);

  const saveAllContent = useCallback(async (section: string, content: Record<string, unknown>) => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
    }

    const upserts = Object.entries(content).map(([key, value]) => ({
      section,
      content_key: key,
      content_value: value,
    }));

    const { error } = await supabase
      .from('site_content')
      .upsert(upserts, { onConflict: 'section,content_key' });

    if (error) {
      console.error('Error saving site content:', error);
      throw error;
    }

    setCache((prev) => ({
      ...prev,
      [section]: { loaded: true, data: { ...(prev[section]?.data || {}), ...content } },
    }));
  }, []);

  return (
    <SiteContentContext.Provider value={{
      getContent, getContentAny, getContentRaw, sectionLoaded, refreshSection,
      updateContent, saveAllContent, getAllContent,
    }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(section: string) {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within a SiteContentProvider');

  const { refreshSection } = ctx;
  useEffect(() => {
    refreshSection(section);
  }, [section, refreshSection]);

  const translationCtx = useContext(TranslationContext);

  const getContentWithI18n = useCallback((key: string, fallback = '') => {
    const cmsVal = ctx.getContent(section, key, '');
    const trimmedCms = cmsVal.trim();

    if (translationCtx && trimmedCms) {
      const englishDefault = getCmsEnglishDefault(section, key).trim();
      if (englishDefault && trimmedCms === englishDefault) {
        const i18nKey = getI18nKey(section, key);
        if (i18nKey) {
          const translated = translationCtx.t(i18nKey);
          if (translated && translated !== i18nKey) return translated;
        }
      }
      return cmsVal;
    }

    if (trimmedCms) return cmsVal;

    if (translationCtx) {
      const i18nKey = getI18nKey(section, key);
      if (i18nKey) {
        const translated = translationCtx.t(i18nKey);
        if (translated && translated !== i18nKey) return translated;
      }
    }
    return fallback;
  }, [ctx, section, translationCtx]);

  const getContentAnyWithI18n = useCallback((keys: string[], fallback = '') => {
    for (const key of keys) {
      const val = getContentWithI18n(key, '');
      if (val.trim()) return val;
    }
    return fallback;
  }, [getContentWithI18n]);

  return {
    getContent: getContentWithI18n,
    getContentAny: getContentAnyWithI18n,
    getContentRaw: (key: string) => ctx.getContentRaw(section, key),
    loaded: ctx.sectionLoaded(section),
    refresh: () => ctx.refreshSection(section),
    updateContent: (key: string, value: unknown) => ctx.updateContent(section, key, value),
    saveAllContent: (content: Record<string, unknown>) => ctx.saveAllContent(section, content),
    allContent: ctx.getAllContent(section),
  };
}

export function useAdminContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useAdminContent must be used within a SiteContentProvider');
  return ctx;
}
