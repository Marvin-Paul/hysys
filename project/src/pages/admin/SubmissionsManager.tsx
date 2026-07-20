import { useState, useEffect, useCallback } from 'react';
import { Mail, Trash2, Eye, EyeOff, RefreshCw, Search } from 'lucide-react';
import { supabase } from '../../lib/db/supabase';

interface Submission {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  interest: string | null;
  message: string;
  form_type?: string | null;
  modules_interest?: string | null;
  sector_slug?: string | null;
  website?: string | null;
  consent_given?: boolean;
  is_read: boolean;
  created_at: string;
}

export function SubmissionsManager({ onUnreadChange }: { onUnreadChange?: (count: number) => void } = {}) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'demo' | 'contact' | 'partner'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSubmissions = useCallback(async () => {
    if (!supabase) {
      setFetchError('Supabase is not configured.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setFetchError(error.message);
      setSubmissions([]);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const unreadCount = submissions.filter((s) => !s.is_read).length;

  useEffect(() => {
    onUnreadChange?.(unreadCount);
  }, [unreadCount, onUnreadChange]);

  const toggleRead = async (id: string, current: boolean) => {
    if (!supabase) return;
    await supabase.from('contact_submissions').update({ is_read: !current }).eq('id', id);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_read: !current } : s))
    );
    if (selected?.id === id) setSelected({ ...selected, is_read: !current });
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    if (!supabase) return;
    await supabase.from('contact_submissions').delete().eq('id', id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = submissions.filter((s) => {
    if (filter === 'unread') return !s.is_read;
    if (filter === 'read') return s.is_read;
    return true;
  }).filter((s) => {
    if (typeFilter === 'all') return true;
    const formType = s.form_type || 'contact';
    return formType === typeFilter;
  }).filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.email.toLowerCase().includes(q) ||
      s.first_name?.toLowerCase().includes(q) ||
      s.last_name?.toLowerCase().includes(q) ||
      s.company?.toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q)
    );
  });

  const typeCounts = {
    demo: submissions.filter((s) => s.form_type === 'demo').length,
    contact: submissions.filter((s) => (s.form_type || 'contact') === 'contact').length,
    partner: submissions.filter((s) => s.form_type === 'partner').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Form Submissions</h1>
          <p className="text-sm text-gray-600 mt-1">
            Demo requests, contact messages, and partner applications
            {unreadCount > 0 ? ` · ${unreadCount} unread` : ''}
          </p>
        </div>
        <button
          onClick={fetchSubmissions}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {f === 'all' ? 'All' : f === 'unread' ? `Unread (${unreadCount})` : 'Read'}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {([
            { id: 'all', label: 'All types' },
            { id: 'demo', label: `Demo (${typeCounts.demo})` },
            { id: 'contact', label: `Contact (${typeCounts.contact})` },
            { id: 'partner', label: `Partner (${typeCounts.partner})` },
          ] as const).map((f) => (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                typeFilter === f.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search submissions..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {fetchError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4 text-sm text-red-700">
          Could not load submissions: {fetchError}. Make sure you are logged in as an admin.
        </div>
      ) : null}

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions</h3>
          <p className="text-gray-600">Demo, contact, and partner form submissions will appear here.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors ${
                  selected?.id === s.id ? 'bg-blue-50' : ''
                } ${!s.is_read ? 'border-l-2 border-l-[var(--color-primary)]' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!s.is_read && <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] flex-shrink-0" />}
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {s.first_name} {s.last_name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{s.email}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">
                    {new Date(s.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">{s.message}</p>
                {s.form_type && (
                  <span className="text-[10px] uppercase tracking-wide text-[var(--color-primary)] mt-1 block">
                    {s.form_type === 'demo' ? 'Demo request' : s.form_type}
                  </span>
                )}
                {s.company && (
                  <span className="text-xs text-gray-400 mt-1 block">{s.company}</span>
                )}
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Submission Details</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRead(selected.id, selected.is_read)}
                      className="p-2 text-gray-500 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-lg transition-colors"
                      title={selected.is_read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {selected.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteSubmission(selected.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Name</label>
                      <p className="text-sm font-medium text-gray-900">{selected.first_name} {selected.last_name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Date</label>
                      <p className="text-sm font-medium text-gray-900">{new Date(selected.created_at).toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                    <a href={`mailto:${selected.email}`} className="text-sm font-medium text-[var(--color-primary)] hover:underline block">
                      {selected.email}
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Phone</label>
                      <p className="text-sm font-medium text-gray-900">{selected.phone || '—'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Company</label>
                      <p className="text-sm font-medium text-gray-900">{selected.company || '—'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Form type</label>
                      <p className="text-sm font-medium text-gray-900 capitalize">{selected.form_type || 'contact'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Interest</label>
                      <p className="text-sm font-medium text-gray-900 capitalize">{selected.interest || '—'}</p>
                    </div>
                  </div>

                  {(selected.modules_interest || selected.sector_slug || selected.website) && (
                    <div className="grid grid-cols-2 gap-4">
                      {selected.modules_interest && (
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Modules</label>
                          <p className="text-sm font-medium text-gray-900">{selected.modules_interest}</p>
                        </div>
                      )}
                      {selected.sector_slug && (
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Sector</label>
                          <p className="text-sm font-medium text-gray-900">{selected.sector_slug}</p>
                        </div>
                      )}
                      {selected.website && (
                        <div className="col-span-2">
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Website</label>
                          <p className="text-sm font-medium text-gray-900">{selected.website}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Job Title</label>
                      <p className="text-sm font-medium text-gray-900">{selected.job_title || '—'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Privacy Consent</label>
                      <p className="text-sm font-medium text-gray-900">
                        {selected.consent_given ? (
                          <span className="text-green-600">Given</span>
                        ) : (
                          <span className="text-amber-600">Not given</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Message</label>
                    <p className="text-sm text-gray-700 mt-1 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
