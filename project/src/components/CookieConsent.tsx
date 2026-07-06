import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('hysys-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem('hysys-cookie-consent', 'all');
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('hysys-cookie-consent', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 rounded-xl bg-[#0b5394]/10 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-[#0b5394]" />
          </div>
          <div>
            <p className="text-sm text-gray-700">
              We use cookies to enhance your experience, analyze traffic, and deliver personalized content. 
              By clicking "Accept All", you consent to our use of cookies.{' '}
              <a href="/cookies" className="text-[#0b5394] underline hover:text-[#032d60]">Learn more</a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={acceptEssential}
            className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold text-white bg-[#0b5394] rounded-xl hover:bg-[#032d60] transition-colors"
          >
            Accept All
          </button>
          <button onClick={() => setVisible(false)} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
