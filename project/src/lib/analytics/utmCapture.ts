const UTM_STORAGE_KEY = 'marmidon-utm-params';

type UtmParams = Record<string, string>;

function extractUtmParams(): UtmParams {
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

export function captureUtmParams(): void {
  if (typeof window === 'undefined') return;
  const utm = extractUtmParams();
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  }
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* invalid JSON — ignore */
  }
  return {};
}

export function getUtmForForm(): Record<string, string | null> {
  const utm = getStoredUtmParams();
  return {
    utm_source: utm.utm_source ?? null,
    utm_medium: utm.utm_medium ?? null,
    utm_campaign: utm.utm_campaign ?? null,
    utm_term: utm.utm_term ?? null,
    utm_content: utm.utm_content ?? null,
  };
}
