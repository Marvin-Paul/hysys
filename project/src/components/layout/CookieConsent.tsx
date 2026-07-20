import { useState, useEffect } from 'react';

import { X, Cookie, Settings } from 'lucide-react';

import { onConsentGranted } from '../../lib/analytics/track';

export function CookieConsent() {

  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({ necessary: true, analytics: false, functional: false });

  useEffect(() => {
    const stored = localStorage.getItem('marmidon-cookie-consent');
    if (!stored) {
      setVisible(true);
    } else if (stored === 'all') {
      onConsentGranted('all');
    } else if (stored === 'custom') {
      const saved = localStorage.getItem('marmidon-cookie-prefs');
      if (saved) {
        try { setPrefs(JSON.parse(saved)); } catch { /* ignore */ }
      }
      onConsentGranted('custom');
    }
  }, []);

  const saveConsent = (type: string, preferences?: typeof prefs) => {
    localStorage.setItem('marmidon-cookie-consent', type);
    if (preferences) {
      localStorage.setItem('marmidon-cookie-prefs', JSON.stringify(preferences));
    }
    if (type !== 'rejected') {
      onConsentGranted(type as 'all' | 'essential' | 'custom');
    }
    setVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    saveConsent('custom', prefs);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-sm text-gray-700">
                We use cookies to enhance your experience, analyze traffic, and deliver personalized content.
                Choose essential-only cookies, accept all, or customize your preferences.{' '}
                <a href="/legal/cookies" className="text-[var(--color-primary)] underline hover:text-[var(--color-secondary)]">Learn more</a>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={() => saveConsent('rejected')}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => setShowPreferences(true)}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Preferences
            </button>
            <button
              onClick={() => saveConsent('essential')}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={() => saveConsent('all')}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold text-white bg-[var(--color-primary)] rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
            >
              Accept All
            </button>
            <button onClick={() => saveConsent('rejected')} className="p-2 text-gray-400 hover:text-gray-600" aria-label="Dismiss">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showPreferences && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPreferences(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5" role="dialog" aria-modal="true" aria-label="Cookie preferences">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--color-secondary)]">Cookie Preferences</h2>
              <button onClick={() => setShowPreferences(false)} className="p-1 text-gray-400 hover:text-gray-600" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600">Choose which cookies to allow. Necessary cookies are always enabled for basic functionality.</p>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <input type="checkbox" checked={prefs.necessary} disabled className="mt-0.5 accent-[var(--color-primary)]" />
              <div>
                <span className="text-sm font-semibold text-gray-900">Necessary</span>
                <p className="text-xs text-gray-500">Required for the site to function properly. Cannot be disabled.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })} className="mt-0.5 accent-[var(--color-primary)]" />
              <div>
                <span className="text-sm font-semibold text-gray-900">Analytics</span>
                <p className="text-xs text-gray-500">Help us understand how visitors use the site so we can improve.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <input type="checkbox" checked={prefs.functional} onChange={(e) => setPrefs({ ...prefs, functional: e.target.checked })} className="mt-0.5 accent-[var(--color-primary)]" />
              <div>
                <span className="text-sm font-semibold text-gray-900">Functional</span>
                <p className="text-xs text-gray-500">Enable personalized features like saved preferences and chat.</p>
              </div>
            </label>

            <div className="flex gap-3 pt-2">
              <button onClick={() => saveConsent('rejected')} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Reject All</button>
              <button onClick={handleSavePreferences} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--color-primary)] rounded-xl hover:bg-[var(--color-secondary)] transition-colors">Save Preferences</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
