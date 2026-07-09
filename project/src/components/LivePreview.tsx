import { useState, useCallback } from 'react';
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw } from 'lucide-react';

type Device = 'desktop' | 'tablet' | 'mobile';

const DEVICE_WIDTHS: Record<Device, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export function LivePreview({ section }: { section: string }) {
  const [device, setDevice] = useState<Device>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);

  const previewUrl = `${window.location.origin}${section === 'homepage' ? '' : `/${section}`}?preview=${refreshKey}`;

  const handleRefresh = useCallback(() => setRefreshKey(k => k + 1), []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Live Preview
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            {[
              { id: 'desktop' as Device, icon: Monitor },
              { id: 'tablet' as Device, icon: Tablet },
              { id: 'mobile' as Device, icon: Smartphone },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id)}
                className={`p-1.5 rounded-md transition-colors ${
                  device === d.id ? 'bg-white shadow-sm text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <d.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="bg-gray-100 p-4 flex justify-center">
        <div
          className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300"
          style={{
            width: DEVICE_WIDTHS[device],
            height: device === 'desktop' ? '500px' : '600px',
          }}
        >
          <iframe
            key={refreshKey}
            src={previewUrl}
            className="w-full h-full border-0"
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
      <div className="px-6 py-2 border-t border-gray-100 text-xs text-gray-400 text-center">
        Click refresh to see saved changes
      </div>
    </div>
  );
}
