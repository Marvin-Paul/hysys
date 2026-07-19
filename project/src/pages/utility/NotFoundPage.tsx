import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { SEO } from '../../components/ui/SEO';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <SEO title="Page Not Found" />
      <div className="text-center max-w-lg">
        <div className="text-[120px] font-bold leading-none tracking-tight text-[var(--color-primary)]/10 select-none">
          404
        </div>
        <h1 className="mt-[-24px] text-3xl font-bold text-slate-900">
          Page not found
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#08407a]"
          >
            <Home className="w-4 h-4" /> Go home
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            <Search className="w-4 h-4" /> Search site
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
        </div>
      </div>
    </div>
  );
}
