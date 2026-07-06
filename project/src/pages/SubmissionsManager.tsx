import { useState, useEffect, useCallback } from 'react';
import { Mail, Trash2, Eye, EyeOff, RefreshCw, ChevronDown, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  is_read: boolean;
  created_at: string;
}

export function SubmissionsManager() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setSubmissions(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from('contact_submissions').update({ is_read: !current }).eq('id', id);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_read: !current } : s))
    );
    if (selected?.id === id) setSelected({ ...selected, is_read: !current });
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    await supabase.from('contact_submissions').delete().eq('id', id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = submissions.filter((s) => {
    if (filter === 'unread') return !s.is_read;
    if (filter === 'read') return s.is_read;
    return true;
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

  const unreadCount = submissions.filter((s) => !s.is_read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-sm text-gray-600 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        <button
          onClick={fetchSubmissions}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="flex gap-4 mb-4">
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
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search submissions..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <div className="w-8 h-8 border-4 border-[#0b5394] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions</h3>
          <p className="text-gray-600">Contact form submissions will appear here.</p>
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
                } ${!s.is_read ? 'border-l-2 border-l-[#0b5394]' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!s.is_read && <span className="w-2 h-2 rounded-full bg-[#0b5394] flex-shrink-0" />}
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
                      className="p-2 text-gray-500 hover:text-[#0b5394] hover:bg-gray-100 rounded-lg transition-colors"
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
                    <a href={`mailto:${selected.email}`} className="text-sm font-medium text-[#0b5394] hover:underline block">
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
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Job Title</label>
                      <p className="text-sm font-medium text-gray-900">{selected.job_title || '—'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Interest</label>
                      <p className="text-sm font-medium text-gray-900 capitalize">{selected.interest || '—'}</p>
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
