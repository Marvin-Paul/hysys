import { useId, type ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: (id: string, errorId: string) => ReactNode;
}

export function FormField({ label, required, error, children }: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}{required ? ' *' : ''}
      </label>
      {children(id, errorId)}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function inputClass(error?: string): string {
  return `form-control${error ? ' border-red-400 focus:ring-red-400' : ''}`;
}
