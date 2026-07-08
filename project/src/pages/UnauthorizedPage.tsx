import { Link } from 'react-router-dom';
import { ShieldX, Home } from 'lucide-react';

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">403 — Unauthorized</h1>
        <p className="text-gray-500 mb-2">
          You don't have permission to access this page.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          This area is restricted to administrators only.
          If you believe this is a mistake, please contact{' '}
          <a href="mailto:info@hysysglobal.com" className="text-[#0b5394] hover:underline">
            info@hysysglobal.com
          </a>
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b5394] text-white rounded-xl font-semibold hover:bg-[#032d60] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
