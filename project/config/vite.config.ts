import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function devActivityLogger(): Plugin {
  const handleLog = (body: string, res: import('http').ServerResponse) => {
    try {
      const payload = JSON.parse(body) as {
        type?: string;
        path?: string;
        at?: string;
        kind?: string;
        label?: string;
        href?: string;
        from?: string;
        className?: string;
      };
      const time = payload.at
        ? new Date(payload.at).toLocaleTimeString()
        : new Date().toLocaleTimeString();
      if (payload.type === 'nav') {
        console.log(`[nav ${time}] ${payload.path ?? '(unknown)'}`);
      } else if (payload.type === 'click') {
        const target = payload.href ? ` \u2192 ${payload.href}` : '';
        const origin = payload.from ? ` (from ${payload.from})` : '';
        const classes = payload.className ? ` {${payload.className}}` : '';
        console.log(
          `[click ${time}] ${payload.kind ?? 'CLICK'} "${payload.label ?? '(no label)'}"${target}${origin}${classes}`
        );
      } else {
        console.log('[dev-log]', payload);
      }
    } catch {
      console.log('[dev-log] (invalid payload)');
    }
    res.statusCode = 204;
    res.end();
  };

  const readBody = (
    req: import('http').IncomingMessage,
    res: import('http').ServerResponse,
    next: () => void
  ) => {
    if (req.method !== 'POST') {
      next();
      return;
    }
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => handleLog(body, res));
  };

  return {
    name: 'dev-activity-logger',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__dev/log', readBody);
      server.middlewares.use('/__dev/nav', readBody);
    },
  };
}

export default defineConfig({
  plugins: [react(), devActivityLogger()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        app: './index.html',
      },
    },
  },
  ssr: {
    noExternal: [
      'lucide-react',
      'react-chartjs-2',
      'chart.js',
      'swiper',
    ],
  },
});
