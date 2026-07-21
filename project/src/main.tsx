import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { captureUtmParams } from './lib/analytics/utmCapture';
import { initMonitoring } from './lib/monitoring';
import './index.css';

initMonitoring();
captureUtmParams();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
