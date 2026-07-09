import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface ContentVersion {
  id: string;
  section: string;
  version_data: Record<string, unknown>;
  version_label: string | null;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
}

export function usePublishing() {
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [loading, setLoading] = useState(false);

  const loadVersions = useCallback(async (section: string) => {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from('content_versions')
      .select('*')
      .eq('section', section)
      .order('created_at', { ascending: false });
    if (data) setVersions(data as ContentVersion[]);
    setLoading(false);
  }, []);

  const writeSiteContent = useCallback(async (section: string, content: Record<string, unknown>) => {
    if (!supabase) return false;
    const entries = Object.entries(content).map(([content_key, content_value]) => ({
      section, content_key, content_value,
    }));
    if (entries.length === 0) return false;
    const { error } = await supabase
      .from('site_content')
      .upsert(entries, { onConflict: 'section,content_key' });
    return !error;
  }, []);

  const publish = useCallback(async (section: string, content: Record<string, unknown>, label?: string) => {
    if (!supabase) return false;
    const ok = await writeSiteContent(section, content);
    if (!ok) { console.error('Publish error: failed to write site_content'); return false; }
    const { error } = await supabase.from('content_versions').insert({
      section,
      version_data: content,
      version_label: label || `v${Date.now()}`,
      status: 'published',
    });
    if (error) { console.error('Publish version error:', error); return false; }
    await loadVersions(section);
    return true;
  }, [loadVersions, writeSiteContent]);

  const saveDraft = useCallback(async (section: string, content: Record<string, unknown>) => {
    if (!supabase) return false;
    const ok = await writeSiteContent(section, content);
    if (!ok) { console.error('Draft error: failed to write site_content'); return false; }
    const { error } = await supabase.from('content_versions').insert({
      section,
      version_data: content,
      version_label: `Draft ${new Date().toLocaleString()}`,
      status: 'draft',
    });
    if (error) { console.error('Draft version error:', error); return false; }
    await loadVersions(section);
    return true;
  }, [loadVersions, writeSiteContent]);

  const restore = useCallback(async (version: ContentVersion) => {
    if (!supabase) return false;
    const entries = Object.entries(version.version_data).map(([content_key, content_value]) => ({
      section: version.section,
      content_key,
      content_value,
    }));
    if (entries.length === 0) return false;

    const { error: delError } = await supabase
      .from('site_content')
      .delete()
      .eq('section', version.section);
    if (delError) { console.error('Delete error:', delError); return false; }

    const { error: insError } = await supabase
      .from('site_content')
      .insert(entries);
    if (insError) { console.error('Restore error:', insError); return false; }

    return true;
  }, []);

  return { versions, loading, loadVersions, publish, saveDraft, restore };
}
