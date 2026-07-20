import { useEffect, useRef } from 'react';

/**
 * Invisible bot challenge (TSR-004 §5.3, §8.1).
 * Records page-load timestamp; forms submitted in < 2s are likely bots.
 * Works alongside FormHoneypot without needing a third-party CAPTCHA API key.
 */
export function InvisibleChallenge() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) ref.current.value = 'verified';
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <input
      ref={ref}
      type="hidden"
      name="_challenge"
      defaultValue="pending"
      aria-hidden
    />
  );
}
