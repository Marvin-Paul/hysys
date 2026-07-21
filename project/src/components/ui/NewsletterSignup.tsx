import { useState, useRef } from 'react';
import { Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { trackEvent } from '../../lib/analytics/track';
import { supabase } from '../../lib/db/supabase';
import { FormHoneypot } from './FormHoneypot';
import { TurnstileWidget } from './TurnstileWidget';

export function NewsletterSignup({ title, description }: { title?: string; description?: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get('website_url') ?? '')) return;

    setSending(true);
    setError(null);

    try {
      if (supabase) {
        const { error: dbError } = await supabase.from('newsletter_subscriptions').insert({
          email: email.trim().toLowerCase(),
          source: window.location.pathname,
          turnstile_token: turnstileToken,
        });
        if (dbError && dbError.code !== '23505') {
          setError('Could not subscribe. Please try again.');
          setSending(false);
          return;
        }
      }
      trackEvent('newsletter_signup', { email_provided: !!email });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSending(false);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-8 text-center">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
        <p className="font-semibold text-green-800">You are subscribed!</p>
        <p className="text-sm text-green-600 mt-1">Stay tuned for ERP insights and updates.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <Mail className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{title || 'Stay informed'}</h3>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2">
        <FormHoneypot />
        <div className="flex gap-2">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
          />
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-xl font-semibold text-sm hover:bg-[var(--color-secondary)] transition-colors disabled:opacity-50"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Subscribe
          </button>
        </div>
        <TurnstileWidget onToken={setTurnstileToken} />
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
