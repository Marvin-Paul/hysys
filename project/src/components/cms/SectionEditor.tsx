import React, { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { usePublishing, ContentVersion } from '../../hooks/usePublishing';
import { Edit3, Save, RotateCcw, ChevronDown, ChevronUp, Plus, Trash2, Archive, Check, X, RefreshCw, AlertTriangle } from 'lucide-react';
import {
  CMS_SECTIONS, ARRAY_TEMPLATES, ARRAY_FIELD_ORDER, ARRAY_ITEM_LABEL,
  formatFieldLabel, getFieldMeta, ICON_OPTIONS,
} from '../../lib/cms/cmsConfig';
import { getCmsDefault } from '../../lib/cms/cmsDefaults';
import { CmsImageField } from './CmsImageField';

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

function getSectionGroups(section: string) {
  return CMS_SECTIONS[section]?.groups ?? [];
}

// --- Inline Editor ---

function InlineEditor({ value, onSave, onCancel }: { value: string; onSave: (v: string) => void; onCancel: () => void }) {
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => { inputRef.current?.focus(); }, []);

  const commitAutoSave = useCallback((val: string) => {
    if (val !== value) {
      setAutoSaveStatus('saving');
      onSave(val);
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
    }
  }, [onSave, value]);

  useEffect(() => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => commitAutoSave(text), 2000);
    return () => { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); };
  }, [text, commitAutoSave]);

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
          onKeyDown={e => { if (e.key === 'Escape') onCancel(); if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); commitAutoSave(text); onCancel(); } }}
        />
      ) : (
        <input
          ref={inputRef as any}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 px-3 py-1.5 text-sm border border-[var(--color-primary)]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
          onKeyDown={e => { if (e.key === 'Enter') { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); commitAutoSave(text); onCancel(); } if (e.key === 'Escape') onCancel(); }}
        />
      )}
      <div className="flex flex-col items-center gap-0.5 pt-0.5">
        {autoSaveStatus === 'saving' && <span className="text-[9px] text-blue-500 font-medium whitespace-nowrap">Saving...</span>}
        {autoSaveStatus === 'saved' && <span className="text-[9px] text-green-600 font-medium whitespace-nowrap">Saved</span>}
        <button onClick={() => { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); commitAutoSave(text); onCancel(); }} className="p-1.5 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm" title="Save"><Check size={14} /></button>
        <button onClick={onCancel} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Cancel"><X size={14} /></button>
      </div>
    </div>
  );
}

// --- Field Row ---

function FieldRow({ label, value, onSave, saved, hint, sitePreview }: { label: string; value: string; onSave: (v: string) => void; saved?: boolean; hint?: string; sitePreview?: string }) {
  const [editing, setEditing] = useState(false);
  const display = typeof value === 'string' ? value : JSON.stringify(value);
  const showPreview = !display.trim() && sitePreview?.trim();
  return (
    <div className={`group flex items-start justify-between py-2.5 border-b border-gray-100 last:border-0 gap-2 px-1 -mx-1 rounded-lg transition-colors ${saved ? 'bg-green-50/40' : 'hover:bg-gray-50/50'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">{label}</span>
          {saved && <span className="text-[10px] text-green-600 font-medium flex items-center gap-0.5"><Check size={10} /> Saved</span>}
        </div>
        {hint && !editing && <p className="text-[10px] text-gray-400 mb-1">{hint}</p>}
        {editing ? (
          <InlineEditor value={display} onSave={v => { onSave(v); setEditing(false); }} onCancel={() => setEditing(false)} />
        ) : (
          <div
            className="text-sm text-gray-700 cursor-text hover:text-[var(--color-primary)] -ml-1 px-1 py-0.5 rounded transition-colors break-words"
            onClick={() => setEditing(true)}
            title="Click to edit"
          >
            {display.trim() ? display : (
              showPreview ? (
                <span>
                  <span className="italic text-gray-400">Not saved yet — site shows: </span>
                  <span className="text-gray-600">{sitePreview}</span>
                </span>
              ) : (
                <span className="italic text-gray-300">empty</span>
              )
            )}
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

function ArrayItemEditor({ item, fields, onChange, onRemove, onMoveUp, onMoveDown, index, itemLabel }: {
  item: Record<string, string>; fields: string[]; onChange: (key: string, val: string) => void;
  onRemove: () => void; onMoveUp?: () => void; onMoveDown?: () => void; index: number; itemLabel?: string;
}) {
  return (
    <div className="mb-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-700">{itemLabel || `Item ${index + 1}`}</span>
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
        const meta = getFieldMeta(field);
        const ftype = meta.type ?? guessFieldType(field);
        const isImage = ftype === 'image' || ['image', 'photo', 'avatar', 'logo', 'thumbnail'].includes(field);
        const isIcon = field === 'iconName';
        return (
          <div key={field} className="mb-2 last:mb-0">
            <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">
              {meta.label}
            </label>
            {meta.hint && <p className="text-[10px] text-gray-400 mb-1">{meta.hint}</p>}
            {isImage ? (
              <CmsImageField value={item[field] ?? ''} onChange={(url) => onChange(field, url)} />
            ) : isIcon ? (
              <select
                value={item[field] ?? ''}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select icon…</option>
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
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
  const [expanded, setExpanded] = useState(() => value.length <= 8);

  useEffect(() => { setItems(value); setExpanded(value.length <= 8); }, [value]);

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
  const discoveredFields = isObj && items.length > 0
    ? [...new Set(items.flatMap(item => Object.keys(item as Record<string, unknown>)))]
    : [];
  const fieldsFinal = templateKey && ARRAY_FIELD_ORDER[templateKey]?.length
    ? [...new Set([
        ...ARRAY_FIELD_ORDER[templateKey].filter((f) => discoveredFields.includes(f) || ARRAY_TEMPLATES[templateKey]?.[f] !== undefined),
        ...discoveredFields.filter((f) => !ARRAY_FIELD_ORDER[templateKey].includes(f)),
      ])]
    : discoveredFields;
  const itemLabelFn = templateKey ? ARRAY_ITEM_LABEL[templateKey] : undefined;

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
              fields={fieldsFinal}
              onChange={(f, v) => handleFieldChange(idx, f, v)}
              onRemove={() => handleRemove(idx)}
              onMoveUp={idx > 0 ? () => handleMove(idx, idx - 1) : undefined}
              onMoveDown={idx < items.length - 1 ? () => handleMove(idx, idx + 1) : undefined}
              index={idx}
              itemLabel={itemLabelFn ? itemLabelFn(item as Record<string, unknown>, idx) : undefined}
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
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [localEdits, setLocalEdits] = useState<Record<string, unknown>>({});
  const groups = getSectionGroups(section);
  const sectionMeta = CMS_SECTIONS[section];

  useEffect(() => {
    setSwitching(true);
    setSavedKeys(new Set());
    setLocalEdits({});
    setShowVersions(false);
    const t = setTimeout(() => setSwitching(false), 400);
    return () => clearTimeout(t);
  }, [section]);

  const content = { ...(allContent || {}), ...localEdits };
  const previewFor = (key: string) => getCmsDefault(section, key);

  const markSaved = (key: string) => {
    setSavedKeys((prev) => new Set(prev).add(key));
    setTimeout(() => {
      setSavedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }, 2500);
  };

  const showToast = useCallback((ok: boolean, text: string) => setToast({ ok, text }), []);

  const handleFieldSave = async (key: string, value: unknown) => {
    try {
      await updateContent(key, value);
      setLocalEdits(prev => ({ ...prev, [key]: value }));
      markSaved(key);
      showToast(true, 'Saved');
      onRefresh();
    } catch {
      showToast(false, `Failed to save "${key}"`);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    const ok = await publish(section, { ...(allContent || {}), ...localEdits } as Record<string, unknown>);
    showToast(ok, ok ? 'Published!' : 'Publish failed');
    if (ok) { setSavedKeys(new Set()); setLocalEdits({}); }
    setPublishing(false);
    onRefresh();
  };

  const handleSaveDraft = async () => {
    setPublishing(true);
    const ok = await saveDraft(section, { ...(allContent || {}), ...localEdits } as Record<string, unknown>);
    showToast(ok, ok ? 'Draft saved!' : 'Save failed');
    if (ok) { setSavedKeys(new Set()); setLocalEdits({}); }
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
      markSaved(key);
      showToast(true, 'Saved');
      onRefresh();
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
          <h3 className="text-base font-semibold text-gray-900">{sectionMeta?.label ?? section}</h3>
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
                <FieldRow key={key} label={formatFieldLabel(key)} value={typeof value === 'string' ? value : JSON.stringify(value)} onSave={v => handleFieldSave(key, v)} saved={savedKeys.has(key)} hint={getFieldMeta(key).hint} sitePreview={previewFor(key)} />
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
                      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-700">{group.label}</h4>
                          <span className="text-[10px] text-gray-400">{group.keys.length} fields</span>
                        </div>
                        {'description' in group && group.description && (
                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{group.description}</p>
                        )}
                      </div>
                      <div className="p-4">
                        <VisualHero content={heroContent} />
                        <div className="border-t border-gray-100 pt-3 mt-3">
                          {group.keys.map(key => (
                            <FieldRow key={key} label={formatFieldLabel(key)} value={typeof content[key] === 'string' ? content[key] as string : ''} onSave={v => handleFieldSave(key, v)} saved={savedKeys.has(key)} hint={getFieldMeta(key).hint} sitePreview={previewFor(key)} />
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
                      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-700">{group.label}</h4>
                          <span className="text-[10px] text-gray-400">{group.keys.length} fields</span>
                        </div>
                        {'description' in group && group.description && (
                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{group.description}</p>
                        )}
                      </div>
                      <div className="p-4">
                        <VisualStats content={statContent} />
                        <div className="border-t border-gray-100 pt-3 mt-3">
                          {group.keys.map(key => (
                            <FieldRow key={key} label={formatFieldLabel(key)} value={typeof content[key] === 'string' ? content[key] as string : ''} onSave={v => handleFieldSave(key, v)} saved={savedKeys.has(key)} hint={getFieldMeta(key).hint} sitePreview={previewFor(key)} />
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
                          <h4 className="text-sm font-semibold text-gray-700">{formatFieldLabel(key)}</h4>
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
                      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-700">{group.label}</h4>
                          <span className="text-[10px] text-gray-400">{group.keys.length} fields</span>
                        </div>
                        {'description' in group && group.description && (
                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{group.description}</p>
                        )}
                      </div>
                    <div className="p-4">
                      {group.keys.map(key => (
                        <FieldRow key={key} label={formatFieldLabel(key)} value={typeof content[key] === 'string' ? content[key] as string : ''} onSave={v => handleFieldSave(key, v)} saved={savedKeys.has(key)} hint={getFieldMeta(key).hint} sitePreview={previewFor(key)} />
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
