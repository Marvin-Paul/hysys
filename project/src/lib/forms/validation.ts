import { useState, useCallback } from 'react';

type FieldErrors = Record<string, string | undefined>;

export function useFieldValidation() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const validate = useCallback((fields: Record<string, { value: string; label: string }>): boolean => {
    const newErrors: FieldErrors = {};
    let valid = true;
    for (const [name, { value, label }] of Object.entries(fields)) {
      if (!value.trim()) {
        newErrors[name] = `${label} is required.`;
        valid = false;
      } else if (name === 'email' && value.includes('@') === false) {
        newErrors[name] = 'Please enter a valid email address.';
        valid = false;
      }
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return valid;
  }, []);

  const markTouched = useCallback((name: string) => {
    setTouched((prev) => new Set(prev).add(name));
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const ariaProps = (name: string) => ({
    'aria-invalid': errors[name] ? true as const : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const reset = useCallback(() => {
    setErrors({});
    setTouched(new Set());
  }, []);

  return { errors, touched, validate, markTouched, clearError, ariaProps, reset };
}
