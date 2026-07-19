import { useState, useEffect } from 'react';

import { X, Cookie } from 'lucide-react';

import { onConsentGranted } from '../../lib/analytics/track';



export function CookieConsent() {

  const [visible, setVisible] = useState(false);



  useEffect(() => {

    const consent = localStorage.getItem('marmidon-cookie-consent');

    if (!consent) {

      setVisible(true);

    } else if (consent === 'all') {

      onConsentGranted('all');

    }

  }, []);



  const acceptAll = () => {

    localStorage.setItem('marmidon-cookie-consent', 'all');

    onConsentGranted('all');

    setVisible(false);

  };



  const acceptEssential = () => {

    localStorage.setItem('marmidon-cookie-consent', 'essential');

    onConsentGranted('essential');

    setVisible(false);

  };



  const rejectAll = () => {

    localStorage.setItem('marmidon-cookie-consent', 'rejected');

    setVisible(false);

  };



  if (!visible) return null;



  return (

    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">

        <div className="flex items-start gap-4 flex-1">

          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">

            <Cookie className="w-5 h-5 text-[var(--color-primary)]" />

          </div>

          <div>

            <p className="text-sm text-gray-700">

              We use cookies to enhance your experience, analyze traffic, and deliver personalized content.

              Choose essential-only cookies, accept all, or reject non-essential tracking.{' '}

              <a href="/legal/cookies" className="text-[var(--color-primary)] underline hover:text-[var(--color-secondary)]">Learn more</a>

            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 flex-shrink-0 w-full sm:w-auto">

          <button

            onClick={rejectAll}

            className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"

          >

            Reject

          </button>

          <button

            onClick={acceptEssential}

            className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"

          >

            Essential Only

          </button>

          <button

            onClick={acceptAll}

            className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold text-white bg-[var(--color-primary)] rounded-xl hover:bg-[var(--color-secondary)] transition-colors"

          >

            Accept All

          </button>

          <button onClick={rejectAll} className="p-2 text-gray-400 hover:text-gray-600" aria-label="Dismiss">

            <X className="w-5 h-5" />

          </button>

        </div>

      </div>

    </div>

  );

}

