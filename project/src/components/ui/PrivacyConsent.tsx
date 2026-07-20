import { useId } from 'react';

interface PrivacyConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function PrivacyConsent({ checked, onChange, error }: PrivacyConsentProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex items-start gap-3 cursor-pointer ${error ? 'text-red-700' : 'text-slate-600'}`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <span className="text-sm">
          I agree to the processing of my personal data in accordance with the{' '}
          <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline hover:text-[var(--color-secondary)]">
            Privacy Policy
          </a>.
        </span>
      </label>
      {error && <p id={errorId} role="alert" className="mt-1 text-xs text-red-600 ml-7">{error}</p>}
    </div>
  );
}
