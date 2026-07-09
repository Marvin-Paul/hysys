import React, { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';
import { usePublishing, ContentVersion } from '../hooks/usePublishing';
import { Edit3, Save, RotateCcw, ChevronDown, ChevronUp, Plus, Trash2, Archive, Check, X, RefreshCw, AlertTriangle } from 'lucide-react';

// --- Error Boundary ---

class ErrorBoundaryInner extends React.Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function ErrorFallback({ label, onRetry }: { label: string; onRetry: () => void }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
      <AlertTriangle size={14} />
      <span>Failed to render <strong>{label}</strong>.</span>
      <button onClick={onRetry} className="ml-auto text-xs underline">Retry</button>
    </div>
  );
}

// --- Toast ---

function Toast({ ok, text, onDone }: { ok: boolean; text: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all animate-slide-up ${ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {ok ? <Check size={16} /> : <X size={16} />}
      {text}
    </div>
  );
}

// --- Skeleton ---

function SkeletonBlock() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-24 bg-gray-100 rounded" />
      <div className="h-24 bg-gray-100 rounded" />
      <div className="h-24 bg-gray-100 rounded" />
    </div>
  );
}

// --- Type helpers ---

interface SectionEditorProps {
  section: string;
  onRefresh: () => void;
}

interface SectionGroup {
  label: string;
  keys: string[];
  visual?: 'hero' | 'stats' | 'list' | 'text';
  groups?: SectionGroup[];
}

function getSectionGroups(section: string): SectionGroup[] {
  const sections: Record<string, { label: string; groups: SectionGroup[] }> = {
    homepage: {
      label: 'Homepage',
      groups: [
        { label: 'Hero', keys: ['hero_title', 'hero_subtitle', 'hero_cta', 'hero_cta_secondary'], visual: 'hero' },
        { label: 'Stats Bar', keys: ['stats_companies', 'stats_companies_label', 'stats_users', 'stats_users_label', 'stats_countries', 'stats_countries_label', 'stats_integrations', 'stats_integrations_label'], visual: 'stats' },
        { label: 'Video', keys: ['video_url'], visual: 'text' },
        { label: 'Product Cards', keys: ['product_cards'], visual: 'list' },
        { label: 'Features', keys: ['features'], visual: 'list' },
        { label: 'Trusted Brands', keys: ['trusted_brands'], visual: 'list' },
        { label: 'Stats', keys: ['stats'], visual: 'list' },
      ]
    },
    about: {
      label: 'About',
      groups: [
        { label: 'Hero', keys: ['hero_title', 'hero_desc'], visual: 'hero' },
        { label: 'Mission', keys: ['mission_title', 'mission_text_1', 'mission_text_2'], visual: 'text' },
        { label: 'Values', keys: ['values_title'], visual: 'text' },
        { label: 'Core Values', keys: ['values'], visual: 'list' },
        { label: 'Leadership', keys: ['leadership_title'], visual: 'text' },
        { label: 'Team Members', keys: ['leadership_team'], visual: 'list' },
        { label: 'Journey', keys: ['journey_title'], visual: 'text' },
        { label: 'Milestones', keys: ['milestones'], visual: 'list' },
        { label: 'Stats', keys: ['stats_badge'], visual: 'text' },
        { label: 'CTA', keys: ['cta_title', 'cta_desc', 'cta_button'], visual: 'text' },
      ]
    },
    products: {
      label: 'Products',
      groups: [
        { label: 'Hero', keys: ['hero_title', 'hero_desc'], visual: 'hero' },
        { label: 'Products List', keys: ['products_list'], visual: 'list' },
        { label: 'CTA', keys: ['cta_title', 'cta_desc', 'cta_button'], visual: 'text' },
      ]
    },
    solutions: {
      label: 'Solutions',
      groups: [
        { label: 'Hero', keys: ['hero_title', 'hero_desc'], visual: 'hero' },
        { label: 'Solutions List', keys: ['solutions_list'], visual: 'list' },
        { label: 'CTA', keys: ['cta_title', 'cta_desc', 'cta_button'], visual: 'text' },
      ]
    },
    industries: {
      label: 'Industries',
      groups: [
        { label: 'Hero', keys: ['hero_title', 'hero_desc'], visual: 'hero' },
        { label: 'Industries List', keys: ['industries_list'], visual: 'list' },
      ]
    },
    pricing: {
      label: 'Pricing',
      groups: [
        { label: 'Hero', keys: ['hero_title', 'hero_desc'], visual: 'hero' },
        { label: 'Pricing Plans', keys: ['pricing_plans'], visual: 'list' },
        { label: 'FAQs', keys: ['faqs'], visual: 'list' },
        { label: 'CTA', keys: ['cta_title', 'cta_desc', 'cta_button'], visual: 'text' },
      ]
    },
    contact: {
      label: 'Contact',
      groups: [
        { label: 'Hero', keys: ['hero_title', 'hero_desc'], visual: 'hero' },
      ]
    },
    stories: {
      label: 'Customer Stories',
      groups: [
        { label: 'Hero', keys: ['hero_title', 'hero_desc'], visual: 'hero' },
        { label: 'Customer Stories List', keys: ['customer_stories'], visual: 'list' },
        { label: 'CTA', keys: ['cta_title', 'cta_desc', 'cta_button'], visual: 'text' },
      ]
    },
  };
  return sections[section]?.groups || [];
}

const LABEL_MAP: Record<string, string> = {
  key: 'Page ID (short, no spaces, e.g. my-product)',
  titleKey: 'Title (translation key)',
  subtitleKey: 'Subtitle (translation key)',
  ctaKey: 'Button Text Key',
  descriptionKey: 'Description Key',
  iconName: 'Icon',
  nameKey: 'Name Key',
  labelKey: 'Label Key',
  questionKey: 'Question Key',
  answerKey: 'Answer Key',
  eventKey: 'Event Key',
  featureKeys: 'Features Key',
  bgColor: 'Background Color',
  title: 'Display Title',
  description: 'Display Description',
  features: 'Features (comma separated)',
  benefits: 'Benefits (comma separated)',
  stats: 'Statistics',
};

function formatLabel(key: string): string {
  if (LABEL_MAP[key]) return LABEL_MAP[key];
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase());
}

const ARRAY_TEMPLATES: Record<string, Record<string, string>> = {
  product_cards: { titleKey: '', subtitleKey: '', descriptionKey: '', color: 'from-blue-500 to-blue-700', bgColor: 'bg-blue-50', link: '/', gradient: 'from-blue-400 to-cyan-400', iconName: 'Users', image: '' },
  features: { titleKey: '', descriptionKey: '', iconName: 'Zap' },
  stats: { value: '', labelKey: '' },
  products_list: { key: '', title: '', titleKey: '', subtitleKey: '', description: '', image: '', features: '', ctaKey: '', color: 'from-blue-500 to-blue-700', bgColor: 'bg-blue-50', iconName: 'Users' },
  solutions_list: { key: '', title: '', titleKey: '', subtitleKey: '', description: '', features: '', benefits: '', color: 'from-blue-500 to-blue-700', iconName: 'Building2' },
  industries_list: { key: '', title: '', titleKey: '', subtitleKey: '', description: '', features: '', color: 'from-blue-500 to-blue-700', iconName: 'Heart' },
  pricing_plans: { nameKey: '', price: '', periodKey: '', descriptionKey: '', featureKeys: '', ctaKey: '' },
  faqs: { questionKey: '', answerKey: '' },
  leadership_team: { name: '', role: '', bio: '', image: '' },
  milestones: { year: '', eventKey: '' },
  values: { titleKey: '', descriptionKey: '', iconName: 'Users' },
  customer_stories: { name: '', title: '', company: '', thumbnail: '', quote: '', nameKey: '', industryKey: '', quoteKey: '', results: '', challengeKey: '', solutionKey: '' },
};

// --- Inline Editor ---

function InlineEditor({ value, onSave, onCancel }: { value: string; onSave: (v: string) => void; onCancel: () => void }) {
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const isLong = text.length > 60 || text.includes('\n');
  return (
    <div className="flex items-start gap-1.5">
      {isLong ? (
        <textarea
          ref={inputRef as any}
          value={text}
          onChange={e => setText(e.target.value)}
          rows={2}
          className="flex-1 px-3 py-1.5 text-sm border border-[var(--color-primary)]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] resize-y"
          onKeyDown={e => { if (e.key === 'Escape') onCancel(); if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') onSave(text); }}
        />
      ) : (
        <input
          ref={inputRef as any}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 px-3 py-1.5 text-sm border border-[var(--color-primary)]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
          onKeyDown={e => { if (e.key === 'Enter') onSave(text); if (e.key === 'Escape') onCancel(); }}
        />
      )}
      <button onClick={() => onSave(text)} className="p-1.5 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm" title="Save"><Check size={14} /></button>
      <button onClick={onCancel} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Cancel"><X size={14} /></button>
    </div>
  );
}

// --- Field Row ---

function FieldRow({ label, value, onSave, dirty }: { label: string; value: string; onSave: (v: string) => void; dirty?: boolean }) {
  const [editing, setEditing] = useState(false);
  const display = typeof value === 'string' ? value : JSON.stringify(value);
  return (
    <div className={`group flex items-start justify-between py-2.5 border-b border-gray-100 last:border-0 gap-2 px-1 -mx-1 rounded-lg transition-colors ${dirty ? 'bg-amber-50/50' : 'hover:bg-gray-50/50'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">{label}</span>
          {dirty && <span className="text-[10px] text-amber-600 font-medium">(modified)</span>}
        </div>
        {editing ? (
          <InlineEditor value={display} onSave={v => { onSave(v); setEditing(false); }} onCancel={() => setEditing(false)} />
        ) : (
          <div
            className="text-sm text-gray-700 cursor-text hover:text-[var(--color-primary)] -ml-1 px-1 py-0.5 rounded transition-colors break-words"
            onClick={() => setEditing(true)}
            title="Click to edit"
          >
            {display || <span className="italic text-gray-300">empty</span>}
          </div>
        )}
      </div>
      <button
        onClick={() => setEditing(!editing)}
        className="mt-1 p-1.5 text-gray-300 opacity-0 group-hover:opacity-100 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded shrink-0 transition-all"
        title="Edit"
      >
        <Edit3 size={13} />
      </button>
    </div>
  );
}

// --- Array Field Editor ---

const TEXTAREA_KEYS = ['description', 'desc', 'challenge', 'solution', 'bio', 'answer', 'benefits', 'features'];
const NUMBER_KEYS = ['price', 'hours', 'modules'];

function guessFieldType(key: string): 'text' | 'textarea' | 'number' {
  if (NUMBER_KEYS.some(k => key === k || key.endsWith(`_${k}`) || key.endsWith(k))) return 'number';
  if (TEXTAREA_KEYS.some(k => key === k || key.endsWith(`_${k}`) || key.includes('description'))) return 'textarea';
  return 'text';
}

function ArrayItemEditor({ item, fields, onChange, onRemove, onMoveUp, onMoveDown, index }: {
  item: Record<string, string>; fields: string[]; onChange: (key: string, val: string) => void;
  onRemove: () => void; onMoveUp?: () => void; onMoveDown?: () => void; index: number;
}) {
  return (
    <div className="mb-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500">Item {index + 1}</span>
        <div className="flex gap-0.5">
          {onMoveUp && (
            <button onClick={onMoveUp} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded">
              <ChevronUp size={12} />
            </button>
          )}
          {onMoveDown && (
            <button onClick={onMoveDown} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded">
              <ChevronDown size={12} />
            </button>
          )}
          <button onClick={onRemove} className="p-1.5 text-red-400 hover:text-red-700 hover:bg-red-50 rounded">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      {fields.map(field => {
        const ftype = guessFieldType(field);
        const isImage = ['image', 'photo', 'avatar', 'logo', 'thumbnail'].includes(field);
        return (
          <div key={field} className="mb-2 last:mb-0">
            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">
              {isImage ? 'Image URL' : formatLabel(field)}
            </label>
            {isImage ? (
              <div className="flex items-center gap-2">
                {item[field] && (
                  <img src={item[field]} alt=""
                    className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                <input type="text" value={item[field] ?? ''} placeholder="Paste image URL from Media Library"
                  onChange={e => onChange(field, e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
            ) : ftype === 'number' ? (
              <input
                type="number"
                value={item[field] ?? ''}
                onChange={e => onChange(field, e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            ) : ftype === 'textarea' ? (
              <textarea
                value={item[field] ?? ''}
                onChange={e => onChange(field, e.target.value)}
          rows={3}
                className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y"
              />
            ) : (
              <input
                type="text"
                value={item[field] ?? ''}
                onChange={e => onChange(field, e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ArrayEditor({ value, onSave, templateKey }: { value: unknown[]; onSave: (v: unknown[]) => void; templateKey?: string }) {
  const [items, setItems] = useState(value);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { setItems(value); }, [value]);

  const commit = (next: unknown[]) => { setItems(next); onSave(next); };

  const handleMove = (from: number, to: number) => {
    const next = [...items]; const [moved] = next.splice(from, 1); next.splice(to, 0, moved); commit(next);
  };
  const handleRemove = (idx: number) => commit(items.filter((_, i) => i !== idx));
  const handleAdd = () => {
    const template = templateKey ? ARRAY_TEMPLATES[templateKey] : undefined;
    if (template) {
      commit([...items, { ...template }]);
    } else if (templateKey) {
      commit([...items, '']);
    } else {
      commit([...items, {}]);
    }
  };
  const handleFieldChange = (idx: number, field: string, val: string) => {
    const next = [...items];
    const ftype = guessFieldType(field);
    next[idx] = { ...(next[idx] as Record<string, unknown>), [field]: ftype === 'number' ? (Number(val) || 0) : val };
    commit(next);
  };

  const isObj = items.length > 0 && typeof items[0] === 'object';
  const fields = isObj && items.length > 0
    ? [...new Set(items.flatMap(item => Object.keys(item as Record<string, unknown>)))]
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''}</span>
        <div className="flex gap-1">
          <button onClick={handleAdd} className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors">
            <Plus size={12} /> Add
          </button>
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" title={expanded ? 'Collapse' : 'Expand'}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>
      {expanded && items.map((item, idx) => {
        if (isObj) {
          return (
            <ArrayItemEditor
              key={idx}
              item={item as Record<string, string>}
              fields={fields}
              onChange={(f, v) => handleFieldChange(idx, f, v)}
              onRemove={() => handleRemove(idx)}
              onMoveUp={idx > 0 ? () => handleMove(idx, idx - 1) : undefined}
              onMoveDown={idx < items.length - 1 ? () => handleMove(idx, idx + 1) : undefined}
              index={idx}
            />
          );
        }
        return (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={String(item ?? '')}
              onChange={e => {
                const next = [...items]; next[idx] = e.target.value; commit(next);
              }}
              className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded"
            />
            <button onClick={() => handleMove(idx, Math.max(0, idx - 1))} disabled={idx === 0}
              className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronUp size={12} /></button>
            <button onClick={() => handleMove(idx, Math.min(items.length - 1, idx + 1))} disabled={idx === items.length - 1}
              className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronDown size={12} /></button>
            <button onClick={() => handleRemove(idx)} className="p-1 text-red-400 hover:text-red-700"><Trash2 size={12} /></button>
          </div>
        );
      })}
    </div>
  );
}

// --- Visual Previews ---

function VisualHero({ content }: { content: Record<string, unknown> }) {
  const c = content as Record<string, string>;
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 p-6 mb-3 border border-blue-100/60">
      <div className="relative z-10">
        <h2 className="text-lg font-bold text-gray-900 leading-tight">{c.hero_title || <span className="italic text-gray-300">No title</span>}</h2>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{c.hero_subtitle || <span className="italic text-gray-300">No subtitle</span>}</p>
        <div className="flex gap-2 mt-3">
          <span className="inline-flex px-4 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md shadow-sm">{c.hero_cta || 'Button'}</span>
          {c.hero_cta_secondary && <span className="inline-flex px-4 py-1.5 text-xs font-medium border border-gray-300 text-gray-600 rounded-md">{c.hero_cta_secondary}</span>}
        </div>
      </div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100/40 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-100/30 rounded-full blur-xl" />
    </div>
  );
}

function VisualStats({ content }: { content: Record<string, unknown> }) {
  const stats = ['companies', 'users', 'countries', 'integrations'];
  const hasAny = stats.some(s => content[`stats_${s}`]);
  if (!hasAny) return null;
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-5 mb-3 border border-gray-200/60">
      <div className="grid grid-cols-4 gap-4">
        {stats.map(stat => {
          const val = content[`stats_${stat}`] as string;
          const label = content[`stats_${stat}_label`] as string;
          if (!val) return null;
          return (
            <div key={stat} className="text-center">
              <div className="text-xl font-bold text-gray-900">{val}</div>
              <div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Main SectionEditor ---

export function SectionEditor({ section, onRefresh }: SectionEditorProps) {
  const { allContent, updateContent, loaded } = useSiteContent(section);
  const { versions, loadVersions, publish, saveDraft, restore } = usePublishing();
  const [publishing, setPublishing] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);
  const [switching, setSwitching] = useState(true);
  const [dirtyKeys, setDirtyKeys] = useState<Set<string>>(new Set());
  const [localEdits, setLocalEdits] = useState<Record<string, unknown>>({});
  const groups = getSectionGroups(section);

  useEffect(() => {
    setSwitching(true);
    setDirtyKeys(new Set());
    setLocalEdits({});
    setShowVersions(false);
    const t = setTimeout(() => setSwitching(false), 400);
    return () => clearTimeout(t);
  }, [section]);

  const content = { ...(allContent || {}), ...localEdits };
  const hasDirty = dirtyKeys.size > 0;

  const showToast = useCallback((ok: boolean, text: string) => setToast({ ok, text }), []);

  const handleFieldSave = async (key: string, value: unknown) => {
    try {
      await updateContent(key, value);
      setLocalEdits(prev => ({ ...prev, [key]: value }));
      setDirtyKeys(prev => new Set(prev).add(key));
      showToast(true, 'Saved');
    } catch {
      showToast(false, `Failed to save "${key}"`);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    const ok = await publish(section, { ...(allContent || {}), ...localEdits } as Record<string, unknown>);
    showToast(ok, ok ? 'Published!' : 'Publish failed');
    if (ok) { setDirtyKeys(new Set()); setLocalEdits({}); }
    setPublishing(false);
    onRefresh();
  };

  const handleSaveDraft = async () => {
    setPublishing(true);
    const ok = await saveDraft(section, { ...(allContent || {}), ...localEdits } as Record<string, unknown>);
    showToast(ok, ok ? 'Draft saved!' : 'Save failed');
    if (ok) { setDirtyKeys(new Set()); setLocalEdits({}); }
    setPublishing(false);
    onRefresh();
  };

  const handleRestore = async (version: ContentVersion) => {
    if (!confirm('Restore this version? Current content will be replaced.')) return;
    const ok = await restore(version);
    showToast(ok, ok ? 'Version restored!' : 'Restore failed');
    if (ok) { onRefresh(); await loadVersions(section); }
  };

  const handleLoadVersions = () => {
    setShowVersions(!showVersions);
    if (!showVersions) loadVersions(section);
  };

  const handleArraySave = async (key: string, arr: unknown[]) => {
    try {
      await updateContent(key, arr);
      setLocalEdits(prev => ({ ...prev, [key]: arr }));
      setDirtyKeys(prev => new Set(prev).add(key));
    } catch {
      showToast(false, `Failed to save "${key}"`);
    }
  };

  const saveDraftRef = useRef(handleSaveDraft);
  saveDraftRef.current = handleSaveDraft;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveDraftRef.current();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (switching) return <SkeletonBlock />;

  return (
    <div>
      {toast && <Toast ok={toast.ok} text={toast.text} onDone={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-gray-900 capitalize">{section}</h3>
          {hasDirty && (
            <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full">
              <AlertTriangle size={10} /> {dirtyKeys.size} unsaved
            </span>
          )}
          {!loaded && <span className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSaveDraft} disabled={publishing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
            <Save size={14} /> Save Draft
          </button>
          <button onClick={handlePublish} disabled={publishing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] disabled:opacity-50 transition-colors shadow-sm">
            <Archive size={14} /> Publish
          </button>
          <button onClick={handleLoadVersions}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <RotateCcw size={14} /> Versions
          </button>
        </div>
      </div>

      {showVersions && (
        <div className="mb-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw size={14} className="text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-700">Version History</h4>
          </div>
          {versions.length === 0 ? (
            <p className="text-xs text-gray-400">No versions yet. Use <strong>Save Draft</strong> or <strong>Publish</strong> to create one.</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {versions.map(v => (
                <div key={v.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider ${v.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {v.status}
                    </span>
                    <span className="text-xs text-gray-700 font-medium">{v.version_label}</span>
                    <span className="text-[11px] text-gray-400">{new Date(v.created_at).toLocaleString()}</span>
                  </div>
                  <button onClick={() => handleRestore(v)}
                    className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline">Restore</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!loaded && Object.keys(content).length === 0 && (
        <div className="mb-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-blue-700 text-sm">
          <RefreshCw size={14} /> Loading content...
        </div>
      )}

      {loaded && Object.keys(content).length === 0 && (
        <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
          <strong>No content found.</strong> Run the database migration to seed default content, then click <strong>Refresh</strong> in the sidebar.
        </div>
      )}

      <ErrorBoundaryInner fallback={<p className="text-red-500 text-sm p-4">Something went wrong loading the editor.</p>}>
        {groups.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            {Object.entries(content).length > 0 ? (
              Object.entries(content).map(([key, value]) => (
                <FieldRow key={key} label={formatLabel(key)} value={typeof value === 'string' ? value : JSON.stringify(value)} onSave={v => handleFieldSave(key, v)} dirty={dirtyKeys.has(key)} />
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">No content fields defined for this section.</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => {
              if (group.visual === 'hero') {
                const heroContent: Record<string, unknown> = {};
                group.keys.forEach(k => { heroContent[k] = content[k]; });
                return (
                  <ErrorBoundaryInner key={group.label} fallback={<ErrorFallback label={group.label} onRetry={() => {}} />}>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm relative">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-primary)]/20 rounded-l-xl" />
                      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-700">{group.label}</h4>
                        <span className="text-[10px] text-gray-400">{group.keys.length} fields</span>
                      </div>
                      <div className="p-4">
                        <VisualHero content={heroContent} />
                        <div className="border-t border-gray-100 pt-3 mt-3">
                          {group.keys.map(key => (
                            <FieldRow key={key} label={formatLabel(key)} value={typeof content[key] === 'string' ? content[key] as string : ''} onSave={v => handleFieldSave(key, v)} dirty={dirtyKeys.has(key)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </ErrorBoundaryInner>
                );
              }

              if (group.visual === 'stats') {
                const statContent: Record<string, unknown> = {};
                group.keys.forEach(k => { statContent[k] = content[k]; });
                return (
                  <ErrorBoundaryInner key={group.label} fallback={<ErrorFallback label={group.label} onRetry={() => {}} />}>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm relative">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-primary)]/20 rounded-l-xl" />
                      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-700">{group.label}</h4>
                        <span className="text-[10px] text-gray-400">{group.keys.length} fields</span>
                      </div>
                      <div className="p-4">
                        <VisualStats content={statContent} />
                        <div className="border-t border-gray-100 pt-3 mt-3">
                          {group.keys.map(key => (
                            <FieldRow key={key} label={formatLabel(key)} value={typeof content[key] === 'string' ? content[key] as string : ''} onSave={v => handleFieldSave(key, v)} dirty={dirtyKeys.has(key)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </ErrorBoundaryInner>
                );
              }

              if (group.visual === 'list') {
                return group.keys.map(key => {
                  const arr = Array.isArray(content[key]) ? content[key] as unknown[] : [];
                  return (
                    <ErrorBoundaryInner key={key} fallback={<ErrorFallback label={key} onRetry={() => {}} />}>
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-primary)]/20 rounded-l-xl" />
                        <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-700">{formatLabel(key)}</h4>
                          <span className="text-[10px] text-gray-400">{arr.length} items</span>
                        </div>
                        <div className="p-4">
                          <ArrayEditor value={arr} onSave={v => handleArraySave(key, v)} templateKey={key} />
                        </div>
                      </div>
                    </ErrorBoundaryInner>
                  );
                });
              }

              return (
                <ErrorBoundaryInner key={group.label} fallback={<ErrorFallback label={group.label} onRetry={() => {}} />}>
<div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm relative">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-primary)]/20 rounded-l-xl" />
                      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-700">{group.label}</h4>
                        <span className="text-[10px] text-gray-400">{group.keys.length} fields</span>
                      </div>
                    <div className="p-4">
                      {group.keys.map(key => (
                        <FieldRow key={key} label={formatLabel(key)} value={typeof content[key] === 'string' ? content[key] as string : ''} onSave={v => handleFieldSave(key, v)} dirty={dirtyKeys.has(key)} />
                      ))}
                    </div>
                  </div>
                </ErrorBoundaryInner>
              );
            })}
          </div>
        )}
      </ErrorBoundaryInner>
    </div>
  );
}
