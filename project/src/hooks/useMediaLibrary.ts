import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/db/supabase';

export interface MediaItem {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  public_url: string;
  alt_text: string | null;
  caption: string | null;
  folder: string;
  width: number | null;
  height: number | null;
  created_at: string;
}

export function useMediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const refresh = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('media_library')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setItems(data as MediaItem[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const upload = useCallback(async (file: File, folder: string = '/') => {
    if (!supabase) return null;
    setUploading(true);
    try {
      const timestamp = Date.now();
      const sanitizedName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const storagePath = `${folder === '/' ? '' : folder}/${sanitizedName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(storagePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(storagePath);

      const img = new Image();
      let width: number | null = null;
      let height: number | null = null;
      if (file.type.startsWith('image/')) {
        await new Promise<void>((resolve) => {
          img.onload = () => { width = img.naturalWidth; height = img.naturalHeight; resolve(); };
          img.onerror = () => resolve();
          img.src = publicUrl;
        });
      }

      const { error: dbError } = await supabase.from('media_library').insert({
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: storagePath,
        public_url: publicUrl,
        folder,
        width,
        height,
      });

      if (dbError) throw dbError;

      await refresh();
      return publicUrl;
    } catch (err) {
      console.error('Upload failed:', err);
      return null;
    } finally {
      setUploading(false);
    }
  }, [refresh]);

  const deleteItem = useCallback(async (item: MediaItem) => {
    if (!supabase) return false;
    try {
      if (item.storage_path) {
        await supabase.storage.from('media').remove([item.storage_path]);
      }
      await supabase.from('media_library').delete().eq('id', item.id);
      await refresh();
      return true;
    } catch (err) {
      console.error('Delete failed:', err);
      return false;
    }
  }, [refresh]);

  const addByUrl = useCallback(async (url: string, folder: string = '/') => {
    if (!supabase) return null;
    try {
      const name = url.split('/').pop() || 'remote-image';
      const { error: dbError } = await supabase.from('media_library').insert({
        file_name: name,
        file_type: 'image/url',
        file_size: 0,
        storage_path: '',
        public_url: url,
        folder,
        width: null,
        height: null,
      });
      if (dbError) throw dbError;
      await refresh();
      return url;
    } catch (err) {
      console.error('Import by URL failed:', err);
      return null;
    }
  }, [refresh]);

  const updateItem = useCallback(async (id: string, updates: Partial<MediaItem>) => {
    if (!supabase) return;
    await supabase.from('media_library').update(updates).eq('id', id);
    await refresh();
  }, [refresh]);

  return { items, loading, uploading, upload, deleteItem, updateItem, refresh, addByUrl };
}
