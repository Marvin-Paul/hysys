/** Normalize watch / youtu.be / embed URLs to a YouTube video id. */
export function parseYouTubeId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  const shortMatch = trimmed.match(/^([a-zA-Z0-9_-]{11})$/);
  return shortMatch?.[1] ?? null;
}

export function toYouTubeEmbedUrl(url: string): string | null {
  const id = parseYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function youTubeThumbnailUrl(url: string, quality: 'hq' | 'max' = 'hq'): string | null {
  const id = parseYouTubeId(url);
  if (!id) return null;
  return quality === 'max'
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function withYouTubeAutoplay(embedUrl: string, muted = false): string {
  const separator = embedUrl.includes('?') ? '&' : '?';
  return `${embedUrl}${separator}autoplay=1${muted ? '&mute=1' : ''}&rel=0`;
}

/** Marmidon homepage defaults — replace in CMS when official Marmidon videos are published. */
export const DEFAULT_ERP_OVERVIEW_VIDEO = 'https://www.youtube.com/watch?v=RLn756ttsrg';
export const DEFAULT_CUSTOMER_PROOF_VIDEO = 'https://www.youtube.com/watch?v=DMv_LuaCm48';
