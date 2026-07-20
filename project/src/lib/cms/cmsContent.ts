type SlugItem = { id?: string; key?: string };

export function cmsSlug(item: SlugItem): string {
  return item.id || item.key || '';
}

export function toCmsArray(v: unknown): string[] {
  if (typeof v === 'string') {
    return v.split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (Array.isArray(v)) return v;
  return [];
}

/** Merge CMS list items onto defaults keyed by id/key */
export function mergeCmsRecord<T extends Record<string, unknown>>(
  items: unknown[] | null | undefined,
  defaults: Record<string, T>,
  merge: (item: Record<string, unknown>, slug: string, fallback: Partial<T>) => T
): Record<string, T> {
  if (!items?.length) return defaults;

  const result = { ...defaults };
  for (const raw of items) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Record<string, unknown>;
    const slug = cmsSlug(item as SlugItem);
    if (!slug || !(slug in defaults)) continue;
    result[slug] = merge(item, slug, defaults[slug] ?? {});
  }
  return result;
}

export function slugFromProductLink(link: unknown): string {
  const match = String(link ?? '').match(/\/products\/([^/?#]+)/);
  return match?.[1] ?? '';
}

/** Apply CMS product_card overrides onto catalog cards; ignores legacy cloud-product entries. */
export function mergeMarmidonProductCards<T extends Record<string, unknown>>(
  rawCms: unknown[] | null | undefined,
  defaults: T[],
  apply: (card: T, cms?: Record<string, unknown>) => T,
  matchKey: (card: T) => string = (card) => String(card.titleKey ?? card.id ?? '')
): T[] {
  const cmsByKey = new Map<string, Record<string, unknown>>();
  if (rawCms?.length) {
    const byTitleKey = Object.fromEntries(defaults.map((card) => [matchKey(card), card]));
    const bySlug = Object.fromEntries(
      defaults.map((card) => {
        const slug = slugFromProductLink(card.link) || String(card.id ?? '');
        return [slug, card];
      })
    );

    for (const raw of rawCms) {
      if (!raw || typeof raw !== 'object') continue;
      const item = raw as Record<string, unknown>;
      const titleKey = String(item.titleKey ?? '');
      const slug = slugFromProductLink(item.link) || cmsSlug(item as SlugItem);
      const card = (titleKey && byTitleKey[titleKey]) || (slug && bySlug[slug]);
      if (!card) continue;
      cmsByKey.set(matchKey(card as T), item);
    }
  }

  return defaults.map((card) => {
    const cms = cmsByKey.get(matchKey(card));
    if (!cms) return apply(card);
    return apply(card, cms);
  });
}

export function pickCmsField(value: unknown, fallback: string): string {
  const text = typeof value === 'string' ? value.trim() : '';
  return text || fallback;
}

const LEGACY_HOMEPAGE_COPY =
  /SALESFORCE|Agentic AI|Dreamforce|Trailblazer|AppExchange|Gartner|Forrester|Agentforce|Magic Quadrant|DIY approach|greatest platform for change|Take the pledge/i;

/** Ignore legacy homepage copy stored in CMS. */
export function pickMarmidonHomepageText(value: unknown, fallback: string): string {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text || LEGACY_HOMEPAGE_COPY.test(text)) return fallback;
  return text;
}

/** Merge CMS array items onto defaults by id */
export function mergeCmsList<T extends { id: string }>(
  items: unknown[] | null | undefined,
  defaults: T[]
): T[] {
  if (!items?.length) return defaults;

  const defaultById = Object.fromEntries(defaults.map((item) => [item.id, item]));
  const textFields = ['title', 'description', 'subtitle', 'name', 'quote', 'desc', 'label', 'text'] as const;

  return items.map((raw, index) => {
    if (!raw || typeof raw !== 'object') return (defaults[index] ?? defaults[0]) as T;
    const item = raw as Record<string, unknown>;
    const id = cmsSlug(item as SlugItem) || String(item.id ?? item.titleKey ?? item.key ?? '').trim();
    const fallback = (id ? defaultById[id] : undefined) ?? defaults[index] ?? {};
    const stableId = id || String((fallback as T).id ?? `item-${index}`);
    const merged = { ...fallback, ...item, id: stableId } as Record<string, unknown>;
    for (const field of textFields) {
      const val = merged[field];
      if (val === '' || val === null || val === undefined) {
        merged[field] = (fallback as Record<string, unknown>)[field] ?? val;
      }
    }
    return merged as T;
  });
}

export function resolveText(
  direct: string | undefined,
  key: string | undefined,
  translate: (key: string) => string
): string {
  if (direct?.trim()) return direct;
  if (key) {
    const translated = translate(key);
    if (translated && translated !== key) return translated;
  }
  return '';
}

/** Prefer CMS direct text, then i18n key, then hard fallback. */
export function cmsText(
  direct: unknown,
  key: string | undefined,
  translate: (k: string) => string,
  hardFallback = ''
): string {
  const stored = typeof direct === 'string' ? direct.trim() : '';
  if (stored) return stored;
  return resolveText('', key, translate) || hardFallback;
}

/** Replace {{var}} placeholders in CMS template strings. */
export function cmsTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '');
}
