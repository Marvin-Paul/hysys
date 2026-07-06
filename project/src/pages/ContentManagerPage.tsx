import { useState, useEffect, useCallback } from 'react';
import {
  Globe, Save, RefreshCw, CheckCircle, AlertCircle, ChevronRight,
  Eye, Type, AlignLeft, Hash, List, Trash2, Plus, GripVertical, Edit3, X, Check,
} from 'lucide-react';
import { useAdminContent } from '../hooks/useSiteContent';

const SECTIONS = [
  { id: 'homepage',      label: 'Homepage' },
  { id: 'about',         label: 'About' },
  { id: 'products',      label: 'Products' },
  { id: 'solutions',     label: 'Solutions' },
  { id: 'industries',    label: 'Industries' },
  { id: 'pricing',       label: 'Pricing' },
  { id: 'contact',       label: 'Contact' },
  { id: 'learning',      label: 'Learning' },
  { id: 'stories',       label: 'Customer Stories' },
];

interface EditableField {
  key: string;
  value: unknown;
  originalValue: unknown;
}

function guessFieldType(key: string, value: unknown): 'text' | 'textarea' | 'number' | 'list' {
  if (typeof value === 'number') return 'number';
  if (Array.isArray(value)) return 'list';
  if (typeof value === 'string' && value.length > 80) return 'textarea';
  if (key.endsWith('_desc') || key.endsWith('_text') || key.includes('description')) return 'textarea';
  return 'text';
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function ArrayEditor({
  value, onChange,
}: {
  value: unknown[];
  onChange: (v: unknown[]) => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string> | string>('');
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState<Record<string, string> | string>('');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const isArrayOfObjects = value.length > 0 && typeof value[0] === 'object' && !Array.isArray(value[0]);
  const keys = isArrayOfObjects && value.length > 0
    ? [...new Set(value.flatMap((item) => Object.keys(item as Record<string, unknown>)))]
    : [];

  const startEdit = (index: number) => {
    const item = value[index];
    if (isArrayOfObjects) {
      const form: Record<string, string> = {};
      for (const k of keys) {
        form[k] = String((item as Record<string, unknown>)[k] ?? '');
      }
      setEditForm(form);
    } else {
      setEditForm(String(item ?? ''));
    }
    setEditingIndex(index);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const newArr = [...value];
    newArr[editingIndex] = isArrayOfObjects
      ? Object.fromEntries(
          Object.entries(editForm as Record<string, string>).map(([k, v]) => [k, tryParse(v)])
        )
      : tryParse(editForm as string);
    onChange(newArr);
    setEditingIndex(null);
    setEditForm('');
  };

  const startAdd = () => {
    if (isArrayOfObjects) {
      const form: Record<string, string> = {};
      for (const k of keys) form[k] = '';
      setAddForm(form);
    } else {
      setAddForm('');
    }
    setAdding(true);
  };

  const saveAdd = () => {
    const newItem = isArrayOfObjects
      ? Object.fromEntries(
          Object.entries(addForm as Record<string, string>).map(([k, v]) => [k, tryParse(v)])
        )
      : tryParse(addForm as string);
    onChange([...value, newItem]);
    setAdding(false);
    setAddForm('');
  };

  const deleteItem = (index: number) => {
    const newArr = value.filter((_, i) => i !== index);
    onChange(newArr);
    setConfirmDelete(null);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const newArr = [...value];
    [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
    onChange(newArr);
  };

  const renderFormFields = (
    form: Record<string, string> | string,
    setter: typeof setEditForm | typeof setAddForm,
    isObject: boolean,
  ) => {
    if (!isObject) {
      return (
        <input
          type="text"
          value={form as string}
          onChange={(e) => setter(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
          placeholder="Enter value"
        />
      );
    }
    const formObj = form as Record<string, string>;
    return keys.map((k) => (
      <div key={k}>
        <label className="block text-xs font-medium text-gray-600 mb-1">{formatKey(k)}</label>
        <input
          type="text"
          value={formObj[k] ?? ''}
          onChange={(e) => setter({ ...formObj, [k]: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
        />
      </div>
    ));
  };

  return (
    <div className="space-y-2">
      {isArrayOfObjects ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {keys.map((k) => (
                  <th key={k} className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {formatKey(k)}
                  </th>
                ))}
                <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {value.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50">
                  {keys.map((k) => (
                    <td key={k} className="px-3 py-2.5 text-gray-700 max-w-[200px] truncate">
                      {String((item as Record<string, unknown>)[k] ?? '')}
                    </td>
                  ))}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => moveItem(idx, -1)} disabled={idx === 0}
                        className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed">
                        <GripVertical className="w-3.5 h-3.5 rotate-90" />
                      </button>
                      <button onClick={() => moveItem(idx, 1)} disabled={idx === value.length - 1}
                        className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed">
                        <GripVertical className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                      <button onClick={() => startEdit(idx)}
                        className="p-1 rounded hover:bg-blue-50 text-blue-500 hover:text-blue-700">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {confirmDelete === idx ? (
                        <>
                          <button onClick={() => deleteItem(idx)}
                            className="p-1 rounded hover:bg-red-50 text-red-500">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setConfirmDelete(null)}
                            className="p-1 rounded hover:bg-gray-100 text-gray-400">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setConfirmDelete(idx)}
                          className="p-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {value.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">Array is empty</p>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          {value.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
              <div className="flex-1">{String(item ?? '')}</div>
              <button onClick={() => moveItem(idx, -1)} disabled={idx === 0}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed">
                <GripVertical className="w-3.5 h-3.5 rotate-90" />
              </button>
              <button onClick={() => moveItem(idx, 1)} disabled={idx === value.length - 1}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed">
                <GripVertical className="w-3.5 h-3.5 -rotate-90" />
              </button>
              <button onClick={() => startEdit(idx)}
                className="p-1 rounded hover:bg-blue-50 text-blue-500">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              {confirmDelete === idx ? (
                <>
                  <button onClick={() => deleteItem(idx)}
                    className="p-1 rounded hover:bg-red-50 text-red-500">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setConfirmDelete(null)}
                    className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <button onClick={() => setConfirmDelete(idx)}
                  className="p-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
          {value.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-2">Array is empty</p>
          )}
        </div>
      )}

      {/* Inline edit modal */}
      {editingIndex !== null && (
        <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
          <p className="text-sm font-medium text-gray-700">Edit Item #{editingIndex + 1}</p>
          {renderFormFields(editForm, setEditForm, isArrayOfObjects)}
          <div className="flex items-center gap-2 pt-1">
            <button onClick={saveEdit}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#0b5394] rounded-lg hover:bg-[#032d60] transition-colors flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Save
            </button>
            <button onClick={() => { setEditingIndex(null); setEditForm(''); }}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add new item */}
      {adding ? (
        <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
          <p className="text-sm font-medium text-gray-700">Add New Item</p>
          {renderFormFields(addForm, setAddForm, isArrayOfObjects)}
          <div className="flex items-center gap-2 pt-1">
            <button onClick={saveAdd}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#0b5394] rounded-lg hover:bg-[#032d60] transition-colors flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
            <button onClick={() => { setAdding(false); setAddForm(''); }}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={startAdd}
          className="w-full px-3 py-2 text-sm font-medium text-[#0b5394] border border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      )}
    </div>
  );
}

function tryParse(val: string): unknown {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === '' || val === 'null') return null;
  const num = Number(val);
  if (!Number.isNaN(num) && val.trim() !== '') return num;
  return val;
}

export function ContentManagerPage() {
  const [activeSection, setActiveSection] = useState('homepage');
  const [fields, setFields] = useState<EditableField[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dirtyCount, setDirtyCount] = useState(0);

  const { refreshSection, saveAllContent, getAllContent, sectionLoaded } = useAdminContent();

  const loadSection = useCallback((sectionId: string) => {
    const content = getAllContent(sectionId);
    const fieldList: EditableField[] = Object.entries(content).map(([key, value]) => ({
      key,
      value,
      originalValue: value,
    }));
    fieldList.sort((a, b) => a.key.localeCompare(b.key));
    setFields(fieldList);
    setDirtyCount(0);
    setSaved(false);
    setError(null);
  }, [getAllContent]);

  useEffect(() => {
    loadSection(activeSection);
  }, [activeSection, loadSection, sectionLoaded(activeSection)]);

  const handleRefresh = async () => {
    await refreshSection(activeSection);
    loadSection(activeSection);
  };

  const handleValueChange = (fieldKey: string, newValue: unknown) => {
    setFields((prev) => {
      const updated = prev.map((f) =>
        f.key === fieldKey ? { ...f, value: newValue } : f
      );
      const dirty = updated.filter(
        (f) => JSON.stringify(f.value) !== JSON.stringify(f.originalValue)
      ).length;
      setDirtyCount(dirty);
      return updated;
    });
    setSaved(false);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const content: Record<string, unknown> = {};
      fields.forEach((f) => {
        content[f.key] = f.value;
      });
      await saveAllContent(activeSection, content);
      setFields((prev) => prev.map((f) => ({ ...f, originalValue: f.value })));
      setDirtyCount(0);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const hasDirtyFields = dirtyCount > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Content Manager</h1>
          <p className="text-sm text-gray-600 mt-1">
            Edit text content for all marketing pages. Changes appear live after saving.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={!hasDirtyFields || saving}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
              hasDirtyFields && !saving
                ? 'bg-[#0b5394] text-white hover:bg-[#032d60] shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
          <CheckCircle className="w-4 h-4" /> Content saved successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {dirtyCount > 0 && (
        <div className="mb-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {dirtyCount} unsaved change{dirtyCount !== 1 ? 's' : ''}
        </div>
      )}

      <div className="flex gap-6">
        {/* Section sidebar */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Sections
              </h2>
            </div>
            <nav className="p-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    activeSection === section.id
                      ? 'bg-[#0b5394] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{section.label}</span>
                  <ChevronRight className={`w-4 h-4 ${activeSection === section.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content editor */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {SECTIONS.find((s) => s.id === activeSection)?.label || activeSection}
              </h2>
              <span className="text-xs text-gray-400">{fields.length} fields</span>
            </div>

            {fields.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No content loaded for this section.</p>
                <p className="text-sm mt-1">Run the database migration to seed default content, then click Refresh.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {fields.map((field) => (
                  <FieldEditor
                    key={field.key}
                    fieldKey={field.key}
                    value={field.value}
                    originalValue={field.originalValue}
                    onChange={(v) => handleValueChange(field.key, v)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldEditor({
  fieldKey, value, originalValue, onChange,
}: {
  fieldKey: string;
  value: unknown;
  originalValue: unknown;
  onChange: (v: unknown) => void;
}) {
  const type = guessFieldType(fieldKey, value);
  const isDirty = JSON.stringify(value) !== JSON.stringify(originalValue);
  const strValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  const numValue = typeof value === 'number' ? value : Number(strValue) || 0;

  const typeIcon = type === 'text' ? <Type className="w-3 h-3" /> :
    type === 'textarea' ? <AlignLeft className="w-3 h-3" /> :
    type === 'number' ? <Hash className="w-3 h-3" /> :
    <List className="w-3 h-3" />;

  return (
    <div className={`px-6 py-4 ${isDirty ? 'bg-amber-50/50' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 flex items-center gap-1">{typeIcon} {type}</span>
          <label className="text-sm font-medium text-gray-800">{formatKey(fieldKey)}</label>
          {isDirty && <span className="text-xs text-amber-600 font-medium">(modified)</span>}
        </div>
        <code className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{fieldKey}</code>
      </div>

      {Array.isArray(value) ? (
        <ArrayEditor value={value} onChange={(v) => onChange(v)} />
      ) : typeof value === 'object' && value !== null ? (
        <div className="space-y-2">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Eye className="w-3 h-3" /> JSON object — edit raw below
          </p>
          <textarea
            value={strValue}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onChange(parsed);
              } catch {
                onChange(e.target.value);
              }
            }}
            rows={6}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm font-mono resize-y"
          />
        </div>
      ) : type === 'textarea' ? (
        <textarea
          value={strValue}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm resize-y"
        />
      ) : type === 'number' ? (
        <input
          type="number"
          value={numValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full max-w-xs px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
        />
      ) : (
        <input
          type="text"
          value={strValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm"
        />
      )}
    </div>
  );
}
