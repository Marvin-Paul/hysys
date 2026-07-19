import { useState } from 'react';
import { Image, X } from 'lucide-react';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';

interface CmsImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  onOpenMediaTab?: () => void;
}

export function CmsImageField({ value, onChange }: CmsImageFieldProps) {
  const { items } = useMediaLibrary();
  const [showPicker, setShowPicker] = useState(false);
  const images = items.filter((item) => item.file_type.startsWith('image/'));

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {value ? (
          <img src={value} alt="" className="h-12 w-12 rounded-lg border border-gray-200 object-cover flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 flex-shrink-0">
            <Image className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type="text"
          value={value}
          placeholder="Paste image URL or pick from library"
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/30"
        />
        {value && (
          <button type="button" onClick={() => onChange('')} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500" title="Clear">
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-[var(--color-primary)] hover:bg-blue-50 whitespace-nowrap"
        >
          {showPicker ? 'Hide' : 'Pick'} ({images.length})
        </button>
      </div>
      {showPicker && (
        <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-2 grid grid-cols-4 gap-2">
          {images.length === 0 ? (
            <p className="col-span-4 text-xs text-gray-400 py-4 text-center">No images yet — upload in the Media tab first.</p>
          ) : (
            images.slice(0, 24).map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => { onChange(img.public_url); setShowPicker(false); }}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${value === img.public_url ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/30' : 'border-transparent'}`}
                title={img.file_name}
              >
                <img src={img.public_url} alt={img.alt_text || img.file_name} className="h-full w-full object-cover" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
