import { useState, useRef } from 'react';
import {
  Upload, Trash2, Copy, Image, Film, FileText, FolderOpen, Check,
  Loader2, Search, X, Link,
} from 'lucide-react';
import { useMediaLibrary, MediaItem } from '../hooks/useMediaLibrary';

function FileIcon({ type }: { type: string }) {
  if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
  if (type.startsWith('video/')) return <Film className="w-8 h-8 text-purple-500" />;
  return <FileText className="w-8 h-8 text-gray-500" />;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function MediaLibrary({ onSelect }: { onSelect?: (url: string) => void }) {
  const { items, loading, uploading, upload, deleteItem, updateItem, addByUrl } = useMediaLibrary();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [folder, setFolder] = useState('/');
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMode, setImportMode] = useState<'file' | 'url'>('file');
  const [urlInput, setUrlInput] = useState('');
  const [importingUrl, setImportingUrl] = useState(false);

  const filtered = items.filter((item) => {
    const matchesSearch = !search || item.file_name.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = folder === '/' || item.folder === folder;
    return matchesSearch && matchesFolder;
  });

  const folders = [...new Set(items.map((i) => i.folder))].sort();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const result = await upload(file, folder);
    if (!result) setError('Upload failed. Check that the "media" storage bucket exists in Supabase and RLS is disabled.');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImportUrl = async () => {
    const url = urlInput.trim();
    if (!url) return;
    setError(null);
    setImportingUrl(true);
    const result = await addByUrl(url, folder);
    if (!result) {
      setError('Failed to import URL. Make sure it is a valid image URL.');
    } else {
      setUrlInput('');
      setImportMode('file');
    }
    setImportingUrl(false);
  };

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    await deleteItem(item);
    if (selected?.id === item.id) setSelected(null);
  };

  const handleSaveAlt = async (id: string) => {
    await updateItem(id, { alt_text: altText } as Partial<MediaItem>);
    setEditingAlt(null);
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search files..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                />
              </div>
              <select value={folder} onChange={(e) => setFolder(e.target.value)}
                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white">
                <option value="/">All Folders</option>
                {folders.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  <button onClick={() => setImportMode('file')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${importMode === 'file' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Upload className="w-3.5 h-3.5 inline mr-1" />Upload
                  </button>
                  <button onClick={() => setImportMode('url')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${importMode === 'url' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Link className="w-3.5 h-3.5 inline mr-1" />From URL
                  </button>
                </div>
                {importMode === 'file' ? (
                  <>
                    <input ref={fileInputRef} type="file" accept="image/*,video/*,.pdf,.doc,.docx" className="hidden"
                      onChange={handleUpload} />
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                      className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition-colors flex items-center gap-2 disabled:opacity-50">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? 'Uploading...' : 'Choose File'}
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Paste image URL here..."
                      className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleImportUrl()} />
                    <button onClick={handleImportUrl} disabled={importingUrl || !urlInput.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition-colors flex items-center gap-2 disabled:opacity-50 whitespace-nowrap">
                      {importingUrl ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link className="w-4 h-4" />}
                      {importingUrl ? 'Importing...' : 'Import'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Upload Error</p>
                <p className="text-xs text-red-600 mt-0.5">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="p-0.5 rounded hover:bg-red-100 text-red-400">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FolderOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">No files found</p>
                <p className="text-sm mt-1">Upload an image or file to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {filtered.map((item) => (
                  <div key={item.id}
                    className={`group relative bg-gray-50 rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                      selected?.id === item.id ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20' : 'border-transparent hover:border-gray-200'
                    }`}
                    onClick={() => setSelected(item)}
                  >
                    {item.file_type.startsWith('image/') ? (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img src={item.public_url} alt={item.alt_text || item.file_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    ) : (
                      <div className="aspect-video flex items-center justify-center bg-gray-100">
                        <FileIcon type={item.file_type} />
                      </div>
                    )}
                    <div className="p-2.5">
                      <p className="text-xs font-medium text-gray-800 truncate">{item.file_name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{formatSize(item.file_size)}</p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button onClick={(e) => { e.stopPropagation(); handleCopyUrl(item.public_url, item.id); }}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                        title="Copy URL">
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gray-600" />}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                        title="Delete">
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">File Details</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-gray-100 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {selected.file_type.startsWith('image/') && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img src={selected.public_url} alt={selected.alt_text || selected.file_name}
                    className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">File Name</label>
                  <p className="text-sm text-gray-800 break-all">{selected.file_name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Size</label>
                    <p className="text-sm text-gray-800">{formatSize(selected.file_size)}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Type</label>
                    <p className="text-sm text-gray-800">{selected.file_type}</p>
                  </div>
                  {selected.width && selected.height && (
                    <div>
                      <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Dimensions</label>
                      <p className="text-sm text-gray-800">{selected.width} x {selected.height}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Uploaded</label>
                    <p className="text-sm text-gray-800">{formatDate(selected.created_at)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Alt Text</label>
                  {editingAlt === selected.id ? (
                    <div className="flex gap-1 mt-1">
                      <input type="text" value={altText} onChange={(e) => setAltText(e.target.value)}
                        className="flex-1 px-2 py-1 text-xs rounded border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
                      <button onClick={() => handleSaveAlt(selected.id)}
                        className="px-2 py-1 text-xs font-medium text-white bg-[var(--color-primary)] rounded hover:bg-[var(--color-secondary)]">
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 cursor-pointer mt-0.5"
                      onClick={() => { setEditingAlt(selected.id); setAltText(selected.alt_text || ''); }}>
                      {selected.alt_text || <span className="text-gray-400 italic">Click to add alt text</span>}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Public URL</label>
                  <div className="flex gap-1 mt-1">
                    <code className="flex-1 text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded truncate">
                      {selected.public_url}
                    </code>
                    <button onClick={() => handleCopyUrl(selected.public_url, selected.id)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500" title="Copy URL">
                      {copiedId === selected.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                {onSelect && (
                  <button onClick={() => onSelect(selected.public_url)}
                    className="w-full py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition-colors">
                    Use This Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
