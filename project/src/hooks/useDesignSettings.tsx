import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { supabase } from '../lib/db/supabase';

export interface DesignColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  nav: string;
  footer: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface DesignTypography {
  fontFamily: string;
  headingH1: number;
  headingH2: number;
  headingH3: number;
  headingH4: number;
  bodySize: number;
  fontWeightHeading: string;
  fontWeightBody: string;
  lineSpacing: number;
}

export interface DesignButtons {
  borderRadius: number;
  style: 'filled' | 'outline' | 'ghost';
  hoverEffect: 'none' | 'lift' | 'glow' | 'darken';
  shadow: string;
  paddingX: number;
  paddingY: number;
}

export interface DesignCards {
  borderRadius: number;
  shadow: string;
  border: string;
  hoverAnimation: 'none' | 'lift' | 'scale' | 'border' | 'glow' | 'tilt';
  spacing: number;
  backgroundColor: string;
  padding: number;
  titleSize: number;
  titleColor: string;
  bodySize: number;
  bodyColor: string;
  iconSize: number;
  iconColor: string;
  minHeight: number;
  hoverLift: number;
  hoverScale: number;
  borderHover: string;
  customCSS: string;
}

export interface DesignLayout {
  containerWidth: number;
  contentMaxWidth: number;
  contentPadding: number;
  pageSpacing: number;
  gridGap: number;
  sectionSpacing: number;
  sidebarWidth: number;
  borderRadiusScale: number;
  shadowIntensity: 'none' | 'subtle' | 'medium' | 'strong';
  customCSS: string;
}

export interface DesignNavigation {
  sticky: boolean;
  transparent: boolean;
  logoSize: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  activeColor: string;
  borderRadius: number;
  shadow: string;
  mobileBreakpoint: number;
  showSearch: boolean;
  showCta: boolean;
  ctaText: string;
  ctaLink: string;
  customCSS: string;
}

export interface DesignAnimations {
  enabled: boolean;
  speed: 'slow' | 'normal' | 'fast';
  easing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'spring';
  entranceEffect: 'fadeIn' | 'fadeUp' | 'fadeDown' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'flip' | 'bounce';
  scrollEffects: boolean;
  scrollType: 'fade' | 'slide' | 'zoom' | 'blur';
  hoverEffects: boolean;
  hoverType: 'lift' | 'glow' | 'darken' | 'scale' | 'border' | 'rotate' | 'tilt';
  loadingAnimation: 'shimmer' | 'pulse' | 'spinner' | 'none';
  staggerDelay: number;
  parallaxSpeed: number;
  customCSS: string;
}

export interface DesignSettings {
  colors: DesignColors;
  typography: DesignTypography;
  buttons: DesignButtons;
  cards: DesignCards;
  layout: DesignLayout;
  navigation: DesignNavigation;
  animations: DesignAnimations;
}

export const DEFAULT_DESIGN: DesignSettings = {
  colors: {
    primary: '#0b5394',
    secondary: '#032d60',
    accent: '#00a3e0',
    background: '#ffffff',
    card: '#f8fafc',
    nav: '#032d60',
    footer: '#032d60',
    text: '#111827',
    textMuted: '#6b7280',
    border: '#e5e7eb',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    headingH1: 48,
    headingH2: 36,
    headingH3: 24,
    headingH4: 20,
    bodySize: 16,
    fontWeightHeading: '700',
    fontWeightBody: '400',
    lineSpacing: 1.6,
  },
  buttons: {
    borderRadius: 8,
    style: 'filled',
    hoverEffect: 'lift',
    shadow: '0 1px 3px rgba(0,0,0,0.12)',
    paddingX: 24,
    paddingY: 12,
  },
  cards: {
    borderRadius: 12,
    shadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
    hoverAnimation: 'lift',
    spacing: 24,
    backgroundColor: '#ffffff',
    padding: 24,
    titleSize: 18,
    titleColor: '#111827',
    bodySize: 14,
    bodyColor: '#6b7280',
    iconSize: 40,
    iconColor: '#0b5394',
    minHeight: 0,
    hoverLift: 4,
    hoverScale: 1.02,
    borderHover: '1px solid #0b5394',
    customCSS: '',
  },
  layout: {
    containerWidth: 1200,
    contentMaxWidth: 800,
    contentPadding: 24,
    pageSpacing: 80,
    gridGap: 32,
    sectionSpacing: 96,
    sidebarWidth: 280,
    borderRadiusScale: 1,
    shadowIntensity: 'medium',
    customCSS: '',
  },
  navigation: {
    sticky: true,
    transparent: false,
    logoSize: 80,
    height: 72,
    backgroundColor: '#032d60',
    textColor: '#ffffff',
    activeColor: '#00a3e0',
    borderRadius: 0,
    shadow: '0 1px 4px rgba(0,0,0,0.1)',
    mobileBreakpoint: 768,
    showSearch: true,
    showCta: true,
    ctaText: 'Get Started',
    ctaLink: '/contact',
    customCSS: '',
  },
  animations: {
    enabled: true,
    speed: 'normal',
    easing: 'ease-out',
    entranceEffect: 'fadeUp',
    scrollEffects: true,
    scrollType: 'fade',
    hoverEffects: true,
    hoverType: 'lift',
    loadingAnimation: 'shimmer',
    staggerDelay: 100,
    parallaxSpeed: 0.3,
    customCSS: '',
  },
};

function applyDesignToCSS(settings: DesignSettings) {
  const root = document.documentElement;
  const c = settings.colors;
  root.style.setProperty('--color-primary', c.primary);
  root.style.setProperty('--color-secondary', c.secondary);
  root.style.setProperty('--color-accent', c.accent);
  root.style.setProperty('--color-background', c.background);
  root.style.setProperty('--color-card', c.card);
  root.style.setProperty('--color-nav', c.nav);
  root.style.setProperty('--color-footer', c.footer);
  root.style.setProperty('--color-text', c.text);
  root.style.setProperty('--color-text-muted', c.textMuted);
  root.style.setProperty('--color-border', c.border);

  const t = settings.typography;
  root.style.setProperty('--font-family', t.fontFamily);
  root.style.setProperty('--font-size-h1', `${t.headingH1}px`);
  root.style.setProperty('--font-size-h2', `${t.headingH2}px`);
  root.style.setProperty('--font-size-h3', `${t.headingH3}px`);
  root.style.setProperty('--font-size-h4', `${t.headingH4}px`);
  root.style.setProperty('--font-size-body', `${t.bodySize}px`);
  root.style.setProperty('--font-weight-heading', t.fontWeightHeading);
  root.style.setProperty('--font-weight-body', t.fontWeightBody);
  root.style.setProperty('--line-spacing', String(t.lineSpacing));

  const b = settings.buttons;
  root.style.setProperty('--button-radius', `${b.borderRadius}px`);
  root.style.setProperty('--button-shadow', b.shadow);
  root.style.setProperty('--button-padding-x', `${b.paddingX}px`);
  root.style.setProperty('--button-padding-y', `${b.paddingY}px`);

  const cd = settings.cards;
  root.style.setProperty('--card-radius', `${cd.borderRadius}px`);
  root.style.setProperty('--card-shadow', cd.shadow);
  root.style.setProperty('--card-border', cd.border);
  root.style.setProperty('--card-spacing', `${cd.spacing}px`);
  root.style.setProperty('--card-bg', cd.backgroundColor);
  root.style.setProperty('--card-padding', `${cd.padding}px`);
  root.style.setProperty('--card-title-size', `${cd.titleSize}px`);
  root.style.setProperty('--card-title-color', cd.titleColor);
  root.style.setProperty('--card-body-size', `${cd.bodySize}px`);
  root.style.setProperty('--card-body-color', cd.bodyColor);
  root.style.setProperty('--card-icon-size', `${cd.iconSize}px`);
  root.style.setProperty('--card-icon-color', cd.iconColor);
  root.style.setProperty('--card-min-height', `${cd.minHeight}px`);
  root.style.setProperty('--card-hover-lift', `${cd.hoverLift}px`);
  root.style.setProperty('--card-hover-scale', String(cd.hoverScale));
  root.style.setProperty('--card-border-hover', cd.borderHover);

  if (cd.customCSS) {
    const existing = document.getElementById('custom-cards-style');
    if (existing) existing.remove();
    const style = document.createElement('style');
    style.id = 'custom-cards-style';
    style.textContent = cd.customCSS;
    document.head.appendChild(style);
  }

  const l = settings.layout;
  root.style.setProperty('--container-width', `${l.containerWidth}px`);
  root.style.setProperty('--content-max-width', `${l.contentMaxWidth}px`);
  root.style.setProperty('--content-padding', `${l.contentPadding}px`);
  root.style.setProperty('--page-spacing', `${l.pageSpacing}px`);
  root.style.setProperty('--grid-gap', `${l.gridGap}px`);
  root.style.setProperty('--section-spacing', `${l.sectionSpacing}px`);
  root.style.setProperty('--sidebar-width', `${l.sidebarWidth}px`);
  root.style.setProperty('--radius-scale', String(l.borderRadiusScale));
  root.style.setProperty('--shadow-intensity', l.shadowIntensity);

  if (l.customCSS) {
    const existing = document.getElementById('custom-layout-style');
    if (existing) existing.remove();
    const style = document.createElement('style');
    style.id = 'custom-layout-style';
    style.textContent = l.customCSS;
    document.head.appendChild(style);
  }

  const n = settings.navigation;
  root.style.setProperty('--nav-sticky', n.sticky ? 'fixed' : 'relative');
  root.style.setProperty('--nav-logo-size', `${n.logoSize}px`);
  root.style.setProperty('--nav-height', `${n.height}px`);
  root.style.setProperty('--nav-bg', n.backgroundColor);
  root.style.setProperty('--nav-text', n.textColor);
  root.style.setProperty('--nav-active', n.activeColor);
  root.style.setProperty('--nav-radius', `${n.borderRadius}px`);
  root.style.setProperty('--nav-shadow', n.shadow);
  root.style.setProperty('--nav-mobile-breakpoint', `${n.mobileBreakpoint}px`);

  if (n.customCSS) {
    const existing = document.getElementById('custom-nav-style');
    if (existing) existing.remove();
    const style = document.createElement('style');
    style.id = 'custom-nav-style';
    style.textContent = n.customCSS;
    document.head.appendChild(style);
  }

  const a = settings.animations;
  root.style.setProperty('--animations-enabled', a.enabled ? '1' : '0');
  root.style.setProperty('--animation-speed', a.speed === 'slow' ? '0.5s' : a.speed === 'fast' ? '0.1s' : '0.3s');
  root.style.setProperty('--animation-easing', a.easing === 'bounce' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : a.easing === 'spring' ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : a.easing);
  root.style.setProperty('--entrance-effect', a.entranceEffect);
  root.style.setProperty('--scroll-type', a.scrollType);
  root.style.setProperty('--hover-type', a.hoverType);
  root.style.setProperty('--loading-animation', a.loadingAnimation);
  root.style.setProperty('--stagger-delay', `${a.staggerDelay}ms`);
  root.style.setProperty('--parallax-speed', String(a.parallaxSpeed));

  if (a.customCSS) {
    const existing = document.getElementById('custom-animations-style');
    if (existing) existing.remove();
    const style = document.createElement('style');
    style.id = 'custom-animations-style';
    style.textContent = a.customCSS;
    document.head.appendChild(style);
  }
}

interface DesignContextType {
  settings: DesignSettings;
  loading: boolean;
  updateSettings: (settings: DesignSettings) => Promise<void>;
  resetSettings: () => Promise<void>;
  savePreset: (name: string) => Promise<void>;
  loadPreset: (name: string) => Promise<DesignSettings | null>;
  presets: string[];
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DesignSettings>(DEFAULT_DESIGN);
  const [loading, setLoading] = useState(true);
  const [presets, setPresets] = useState<string[]>([]);

  useEffect(() => {
    if (!supabase) {
      applyDesignToCSS(DEFAULT_DESIGN);
      setLoading(false);
      return;
    }
    supabase
      .from('design_settings')
      .select('setting_key, setting_value')
      .in('setting_key', ['theme', ...Array.from({ length: 10 }, (_, i) => `preset_${i}`)])
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to load design settings:', error);
          applyDesignToCSS(DEFAULT_DESIGN);
          setLoading(false);
          return;
        }
        const themeRow = data?.find(r => r.setting_key === 'theme');
        if (themeRow?.setting_value) {
          const merged = { ...DEFAULT_DESIGN, ...(themeRow.setting_value as Partial<DesignSettings>) };
          setSettings(merged);
          applyDesignToCSS(merged);
        } else {
          applyDesignToCSS(DEFAULT_DESIGN);
        }
        const names = data?.filter(r => r.setting_key.startsWith('preset_')).map(r => r.setting_key.replace('preset_', '')) || [];
        setPresets(names);
        setLoading(false);
      });
  }, []);

  const updateSettings = useCallback(async (newSettings: DesignSettings) => {
    setSettings(newSettings);
    applyDesignToCSS(newSettings);
    if (!supabase) return;
    await supabase.from('design_settings').upsert(
      { setting_key: 'theme', setting_value: newSettings as unknown as Record<string, unknown> },
      { onConflict: 'setting_key' }
    );
  }, []);

  const resetSettings = useCallback(async () => {
    setSettings(DEFAULT_DESIGN);
    applyDesignToCSS(DEFAULT_DESIGN);
    if (!supabase) return;
    await supabase.from('design_settings').upsert(
      { setting_key: 'theme', setting_value: DEFAULT_DESIGN as unknown as Record<string, unknown> },
      { onConflict: 'setting_key' }
    );
  }, []);

  const savePreset = useCallback(async (name: string) => {
    if (!supabase) return;
    await supabase.from('design_settings').upsert(
      { setting_key: `preset_${name}`, setting_value: settings as unknown as Record<string, unknown> },
      { onConflict: 'setting_key' }
    );
    setPresets(prev => prev.includes(name) ? prev : [...prev, name]);
  }, [settings]);

  const loadPreset = useCallback(async (name: string): Promise<DesignSettings | null> => {
    if (!supabase) return null;
    const { data } = await supabase
      .from('design_settings')
      .select('setting_value')
      .eq('setting_key', `preset_${name}`)
      .single();
    if (data?.setting_value) {
      const preset = { ...DEFAULT_DESIGN, ...(data.setting_value as Partial<DesignSettings>) };
      return preset;
    }
    return null;
  }, []);

  return (
    <DesignContext.Provider value={{ settings, loading, updateSettings, resetSettings, savePreset, loadPreset, presets }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error('useDesign must be used within DesignProvider');
  return ctx;
}
