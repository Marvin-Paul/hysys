import { useState, useEffect } from 'react';
import {
  Palette, Type, Square, Layout, Menu, Play, Save, RotateCcw, Sun,
  Eye, ChevronRight,
} from 'lucide-react';
import { useDesign, DesignSettings } from '../../hooks/useDesignSettings';

type Tab = 'colors' | 'typography' | 'buttons' | 'cards' | 'layout' | 'navigation' | 'animations';

const TABS: { id: Tab; label: string; icon: typeof Palette; desc: string }[] = [
  { id: 'colors', label: 'Colors', icon: Palette, desc: 'Brand palette & surface colors' },
  { id: 'typography', label: 'Typography', icon: Type, desc: 'Fonts, sizes & weights' },
  { id: 'buttons', label: 'Buttons', icon: Square, desc: 'Button shape & interaction' },
  { id: 'cards', label: 'Cards', icon: Square, desc: 'Card style & hover effects' },
  { id: 'layout', label: 'Layout', icon: Layout, desc: 'Spacing & container width' },
  { id: 'navigation', label: 'Navigation', icon: Menu, desc: 'Nav bar & logo settings' },
  { id: 'animations', label: 'Animations', icon: Play, desc: 'Motion & scroll effects' },
];

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5" />
        <span className="absolute inset-0.5 rounded-md pointer-events-none" style={{ backgroundColor: value }} />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
      </div>
    </div>
  );
}

function RangeSlider({ label, value, min, max, step, onChange, suffix }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <span className="text-xs text-gray-500 font-mono">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step || 1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]" />
    </div>
  );
}

function SelectInput({ label, value, options, onChange }: {
  label: string; value: string; options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

function ColorPaletteBar({ colors }: { colors: DesignSettings['colors'] }) {
  const items = [
    { label: 'Primary', color: colors.primary },
    { label: 'Secondary', color: colors.secondary },
    { label: 'Accent', color: colors.accent },
    { label: 'Bg', color: colors.background },
    { label: 'Card', color: colors.card },
    { label: 'Nav', color: colors.nav },
    { label: 'Footer', color: colors.footer },
    { label: 'Text', color: colors.text },
    { label: 'Muted', color: colors.textMuted },
    { label: 'Border', color: colors.border },
  ];
  return (
    <div className="flex items-stretch rounded-lg overflow-hidden border border-gray-200 h-8">
      {items.map((item) => (
        <div key={item.label} className="flex-1 relative group cursor-pointer"
          style={{ backgroundColor: item.color }}>
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: /^#([0-9a-f]{3}){1,2}$/i.test(item.color) && parseInt(item.color.slice(1), 16) > 0x666666 ? '#000' : '#fff' }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function LivePreview({ settings }: { settings: DesignSettings }) {
  const c = settings.colors;
  const t = settings.typography;
  const b = settings.buttons;
  const cd = settings.cards;
  const l = settings.layout;
  const n = settings.navigation;

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
        <Eye className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs font-medium text-gray-500">Live Preview</span>
        <span className="text-[10px] text-gray-400 ml-auto">Changes reflect instantly</span>
      </div>
      <div style={{ backgroundColor: c.background, fontFamily: t.fontFamily }}>
        <div style={{ backgroundColor: n.backgroundColor, height: n.height, borderRadius: n.borderRadius, boxShadow: n.shadow }}>
          <div className="flex items-center justify-between h-full px-6" style={{ maxWidth: l.containerWidth, margin: '0 auto' }}>
            <div className="flex items-center gap-3">
              <div style={{ width: n.logoSize, height: 24, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 }} />
            </div>
            <div className="flex items-center gap-4">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <span key={item} className="text-xs" style={{ color: n.textColor }}>{item}</span>
              ))}
              {n.showSearch && (
                <div className="w-20 h-5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
              )}
              {n.showCta && (
                <div className="px-3 py-1 text-xs font-semibold rounded" style={{ backgroundColor: settings.colors.primary, color: '#fff' }}>
                  {n.ctaText}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: `${l.pageSpacing}px 0` }}>
          <div style={{ maxWidth: l.containerWidth, margin: '0 auto', padding: '0 24px' }}>
            <div className="text-center mb-8" style={{ marginBottom: l.sectionSpacing }}>
              <h1 style={{
                fontSize: t.headingH1, fontWeight: t.fontWeightHeading,
                color: c.text, lineHeight: t.lineSpacing, marginBottom: 16,
              }}>
                Build Something Great
              </h1>
              <p style={{
                fontSize: t.bodySize, fontWeight: t.fontWeightBody,
                color: c.textMuted, lineHeight: t.lineSpacing, maxWidth: 600, margin: '0 auto',
              }}>
                Marmidon delivers enterprise-grade solutions with intelligent automation and real-time analytics.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button style={{
                  backgroundColor: b.style === 'filled' ? c.primary : 'transparent',
                  color: b.style === 'filled' ? '#fff' : c.primary,
                  border: b.style === 'outline' ? `2px solid ${c.primary}` : 'none',
                  borderRadius: b.borderRadius,
                  padding: `${b.paddingY}px ${b.paddingX}px`,
                  boxShadow: b.shadow,
                  fontSize: t.bodySize, fontWeight: 600, cursor: 'pointer',
                }}>Get Started</button>
                <button style={{
                  backgroundColor: 'transparent', color: c.primary, border: 'none',
                  borderRadius: b.borderRadius,
                  padding: `${b.paddingY}px ${b.paddingX}px`,
                  fontSize: t.bodySize, fontWeight: 600, cursor: 'pointer',
                }}>Learn More</button>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: cd.spacing, marginBottom: l.sectionSpacing,
            }}>
              {['Smart Automation', 'Real-Time Analytics', 'Seamless Integration'].map((title) => (
                <div key={title} style={{
                  backgroundColor: c.card, borderRadius: cd.borderRadius,
                  boxShadow: cd.shadow, border: cd.border,
                  padding: cd.spacing,
                }}>
                  <div className="w-10 h-10 rounded-lg mb-3" style={{ backgroundColor: `${c.primary}20` }} />
                  <h3 style={{
                    fontSize: t.headingH3, fontWeight: t.fontWeightHeading,
                    color: c.text, marginBottom: 8,
                  }}>{title}</h3>
                  <p style={{
                    fontSize: t.bodySize, fontWeight: t.fontWeightBody,
                    color: c.textMuted, lineHeight: t.lineSpacing,
                  }}>Powerful features to help you grow your business.</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: c.footer, padding: '32px 0' }}>
          <div style={{ maxWidth: l.containerWidth, margin: '0 auto', padding: '0 24px' }}>
            <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
              &copy; 2026 Marmidon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorsPanel({ settings, onChange }: { settings: DesignSettings; onChange: (s: DesignSettings) => void }) {
  const setColor = (key: keyof typeof settings.colors, val: string) => {
    onChange({ ...settings, colors: { ...settings.colors, [key]: val } });
  };
  return (
    <div className="space-y-6">
      <ColorPaletteBar colors={settings.colors} />
      <SectionHeading title="Brand Colors" subtitle="Primary, secondary and accent colors define your brand identity" />
      <div className="grid grid-cols-2 gap-4">
        <ColorInput label="Primary" value={settings.colors.primary} onChange={(v) => setColor('primary', v)} />
        <ColorInput label="Secondary" value={settings.colors.secondary} onChange={(v) => setColor('secondary', v)} />
        <ColorInput label="Accent" value={settings.colors.accent} onChange={(v) => setColor('accent', v)} />
      </div>
      <hr className="border-gray-100" />
      <SectionHeading title="Surface Colors" subtitle="Background, card and navigation area colors" />
      <div className="grid grid-cols-2 gap-4">
        <ColorInput label="Background" value={settings.colors.background} onChange={(v) => setColor('background', v)} />
        <ColorInput label="Card" value={settings.colors.card} onChange={(v) => setColor('card', v)} />
        <ColorInput label="Navigation" value={settings.colors.nav} onChange={(v) => setColor('nav', v)} />
        <ColorInput label="Footer" value={settings.colors.footer} onChange={(v) => setColor('footer', v)} />
      </div>
      <hr className="border-gray-100" />
      <SectionHeading title="Text & Borders" subtitle="Text contrast and border colors" />
      <div className="grid grid-cols-2 gap-4">
        <ColorInput label="Text" value={settings.colors.text} onChange={(v) => setColor('text', v)} />
        <ColorInput label="Muted Text" value={settings.colors.textMuted} onChange={(v) => setColor('textMuted', v)} />
        <ColorInput label="Border" value={settings.colors.border} onChange={(v) => setColor('border', v)} />
      </div>
    </div>
  );
}

function TypographyPanel({ settings, onChange }: { settings: DesignSettings; onChange: (s: DesignSettings) => void }) {
  const t = settings.typography;
  const set = (partial: Partial<typeof t>) => onChange({ ...settings, typography: { ...t, ...partial } });
  return (
    <div className="space-y-6">
      <div>
        <SectionHeading title="Font Family" subtitle="The base font applied to all text" />
        <select value={t.fontFamily} onChange={(e) => set({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white">
          <option value="Inter, system-ui, sans-serif">Inter (Default)</option>
          <option value="'Segoe UI', system-ui, sans-serif">Segoe UI</option>
          <option value="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">System Stack</option>
          <option value="'SF Pro Display', -apple-system, sans-serif">SF Pro Display</option>
          <option value="Roboto, system-ui, sans-serif">Roboto</option>
          <option value="'Open Sans', system-ui, sans-serif">Open Sans</option>
          <option value="'Helvetica Neue', Arial, sans-serif">Helvetica Neue</option>
          <option value="Poppins, system-ui, sans-serif">Poppins</option>
          <option value="'Public Sans', system-ui, sans-serif">Public Sans</option>
          <option value="Inter, system-ui, sans-serif">Inter</option>
          <option value="'DM Sans', system-ui, sans-serif">DM Sans</option>
          <option value="'Work Sans', system-ui, sans-serif">Work Sans</option>
          <option value="'IBM Plex Sans', system-ui, sans-serif">IBM Plex Sans</option>
          <option value="'Space Grotesk', system-ui, sans-serif">Space Grotesk</option>
          <option value="'Cabinet Grotesk', system-ui, sans-serif">Cabinet Grotesk</option>
          <option value="'Satoshi', system-ui, sans-serif">Satoshi</option>
          <option value="Georgia, 'Times New Roman', serif">Georgia (Serif)</option>
          <option value="'Playfair Display', Georgia, serif">Playfair Display (Serif)</option>
          <option value="'DM Serif Display', Georgia, serif">DM Serif Display</option>
          <option value="'JetBrains Mono', 'Fira Code', monospace">JetBrains Mono (Mono)</option>
        </select>
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm" style={{ fontFamily: t.fontFamily }}>The quick brown fox jumps over the lazy dog. 1234567890</p>
        </div>
      </div>
      <hr className="border-gray-100" />
      <SectionHeading title="Heading Sizes" subtitle="Font sizes for H1 through H4" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Heading H1" value={t.headingH1} min={24} max={80} onChange={(v) => set({ headingH1: v })} suffix="px" />
        <RangeSlider label="Heading H2" value={t.headingH2} min={20} max={64} onChange={(v) => set({ headingH2: v })} suffix="px" />
        <RangeSlider label="Heading H3" value={t.headingH3} min={16} max={48} onChange={(v) => set({ headingH3: v })} suffix="px" />
        <RangeSlider label="Heading H4" value={t.headingH4} min={14} max={40} onChange={(v) => set({ headingH4: v })} suffix="px" />
      </div>
      <hr className="border-gray-100" />
      <SectionHeading title="Body Text" subtitle="Base size and line spacing for paragraphs" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Body Text" value={t.bodySize} min={12} max={24} onChange={(v) => set({ bodySize: v })} suffix="px" />
        <RangeSlider label="Line Spacing" value={t.lineSpacing} min={1} max={2.5} step={0.1} onChange={(v) => set({ lineSpacing: v })} />
      </div>
      <hr className="border-gray-100" />
      <SectionHeading title="Special Sizes" subtitle="Display, lead, button and caption sizes" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Display (Hero)" value={t.displaySize} min={36} max={80} onChange={(v) => set({ displaySize: v })} suffix="px" />
        <RangeSlider label="Body Large (Lead)" value={t.bodyLgSize} min={14} max={28} onChange={(v) => set({ bodyLgSize: v })} suffix="px" />
        <RangeSlider label="Button Label" value={t.buttonSize} min={12} max={22} onChange={(v) => set({ buttonSize: v })} suffix="px" />
        <RangeSlider label="Small / Caption" value={t.smallSize} min={10} max={18} onChange={(v) => set({ smallSize: v })} suffix="px" />
      </div>
      <hr className="border-gray-100" />
      <SectionHeading title="Font Weights" subtitle="Heading and body font weight" />
      <div className="grid grid-cols-2 gap-4">
        <SelectInput label="Heading Font Weight" value={t.fontWeightHeading} onChange={(v) => set({ fontWeightHeading: v })}
          options={['300','400','500','600','700','800','900'].map(w => ({ value: w, label: `Weight ${w}` }))} />
        <SelectInput label="Body Font Weight" value={t.fontWeightBody} onChange={(v) => set({ fontWeightBody: v })}
          options={['300','400','500','600','700'].map(w => ({ value: w, label: `Weight ${w}` }))} />
      </div>
    </div>
  );
}

function ButtonsPanel({ settings, onChange }: { settings: DesignSettings; onChange: (s: DesignSettings) => void }) {
  const b = settings.buttons;
  const set = (partial: Partial<typeof b>) => onChange({ ...settings, buttons: { ...b, ...partial } });
  return (
    <div className="space-y-6">
      <SectionHeading title="Button Shape" subtitle="Border radius and padding for all buttons" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Border Radius" value={b.borderRadius} min={0} max={40} onChange={(v) => set({ borderRadius: v })} suffix="px" />
        <RangeSlider label="Padding X" value={b.paddingX} min={8} max={64} onChange={(v) => set({ paddingX: v })} suffix="px" />
        <RangeSlider label="Padding Y" value={b.paddingY} min={4} max={32} onChange={(v) => set({ paddingY: v })} suffix="px" />
      </div>
      <hr className="border-gray-100" />
      <SectionHeading title="Button Style" subtitle="Visual style and hover interaction" />
      <div className="grid grid-cols-2 gap-4">
        <SelectInput label="Button Style" value={b.style} onChange={(v) => set({ style: v as 'filled'|'outline'|'ghost' })}
          options={[{value:'filled',label:'Filled'},{value:'outline',label:'Outline'},{value:'ghost',label:'Ghost'}]} />
        <SelectInput label="Hover Effect" value={b.hoverEffect} onChange={(v) => set({ hoverEffect: v as 'none'|'lift'|'glow'|'darken' })}
          options={[{value:'none',label:'None'},{value:'lift',label:'Lift'},{value:'glow',label:'Glow'},{value:'darken',label:'Darken'}]} />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Shadow</label>
        <input type="text" value={b.shadow} onChange={(e) => set({ shadow: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none font-mono" />
      </div>
      <div className="p-5 bg-gray-50 rounded-xl">
        <p className="text-xs font-medium text-gray-500 mb-3">Preview</p>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="text-sm font-semibold cursor-pointer transition-all"
            style={{
              backgroundColor: b.style === 'filled' ? settings.colors.primary : 'transparent',
              color: b.style === 'filled' ? '#fff' : settings.colors.primary,
              border: b.style === 'outline' ? `2px solid ${settings.colors.primary}` : 'none',
              borderRadius: b.borderRadius,
              padding: `${b.paddingY}px ${b.paddingX}px`,
              boxShadow: b.shadow,
            }}
            onMouseEnter={(e) => {
              if (b.hoverEffect === 'lift') e.currentTarget.style.transform = 'translateY(-2px)';
              if (b.hoverEffect === 'glow') e.currentTarget.style.boxShadow = `0 0 20px ${settings.colors.primary}40`;
              if (b.hoverEffect === 'darken') e.currentTarget.style.filter = 'brightness(0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = b.shadow;
              e.currentTarget.style.filter = '';
            }}
          >Primary</button>
          <button className="text-sm font-semibold cursor-pointer transition-all"
            style={{
              backgroundColor: b.style === 'filled' ? settings.colors.secondary : 'transparent',
              color: b.style === 'filled' ? '#fff' : settings.colors.secondary,
              border: b.style === 'outline' ? `2px solid ${settings.colors.secondary}` : 'none',
              borderRadius: b.borderRadius,
              padding: `${b.paddingY}px ${b.paddingX}px`,
              boxShadow: b.shadow,
            }}
            onMouseEnter={(e) => {
              if (b.hoverEffect === 'lift') e.currentTarget.style.transform = 'translateY(-2px)';
              if (b.hoverEffect === 'glow') e.currentTarget.style.boxShadow = `0 0 20px ${settings.colors.secondary}40`;
              if (b.hoverEffect === 'darken') e.currentTarget.style.filter = 'brightness(0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = b.shadow;
              e.currentTarget.style.filter = '';
            }}
          >Secondary</button>
        </div>
      </div>
    </div>
  );
}

function CardsPanel({ settings, onChange }: { settings: DesignSettings; onChange: (s: DesignSettings) => void }) {
  const c = settings.cards;
  const set = (partial: Partial<typeof c>) => onChange({ ...settings, cards: { ...c, ...partial } });
  return (
    <div className="space-y-6">
      <SectionHeading title="Card Appearance" subtitle="Border radius, shadow and border styling" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Border Radius" value={c.borderRadius} min={0} max={40} onChange={(v) => set({ borderRadius: v })} suffix="px" />
        <RangeSlider label="Spacing (Gap)" value={c.spacing} min={8} max={64} onChange={(v) => set({ spacing: v })} suffix="px" />
        <RangeSlider label="Padding" value={c.padding} min={8} max={64} onChange={(v) => set({ padding: v })} suffix="px" />
        <RangeSlider label="Min Height" value={c.minHeight} min={0} max={600} step={20} onChange={(v) => set({ minHeight: v })} suffix="px" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Shadow</label>
          <input type="text" value={c.shadow} onChange={(e) => set({ shadow: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none font-mono" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Border</label>
          <input type="text" value={c.border} onChange={(e) => set({ border: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none font-mono" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Border on Hover</label>
          <input type="text" value={c.borderHover} onChange={(e) => set({ borderHover: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none font-mono" />
        </div>
        <ColorInput label="Card Background" value={c.backgroundColor} onChange={(v) => set({ backgroundColor: v })} />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Typography" subtitle="Title and body text sizes & colors" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Title Size" value={c.titleSize} min={12} max={40} onChange={(v) => set({ titleSize: v })} suffix="px" />
        <RangeSlider label="Body Size" value={c.bodySize} min={10} max={24} onChange={(v) => set({ bodySize: v })} suffix="px" />
        <ColorInput label="Title Color" value={c.titleColor} onChange={(v) => set({ titleColor: v })} />
        <ColorInput label="Body Color" value={c.bodyColor} onChange={(v) => set({ bodyColor: v })} />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Icon" subtitle="Card icon size & color" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Icon Size" value={c.iconSize} min={16} max={80} step={4} onChange={(v) => set({ iconSize: v })} suffix="px" />
        <ColorInput label="Icon Color" value={c.iconColor} onChange={(v) => set({ iconColor: v })} />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Interaction" subtitle="Hover animation when users mouse over cards" />
      <div className="grid grid-cols-2 gap-4">
        <SelectInput label="Hover Animation" value={c.hoverAnimation} onChange={(v) => set({ hoverAnimation: v as any })}
          options={[
            {value:'none',label:'None'},
            {value:'lift',label:'Lift'},
            {value:'scale',label:'Scale'},
            {value:'border',label:'Border Glow'},
            {value:'glow',label:'Glow'},
            {value:'tilt',label:'Tilt'},
          ]} />
        {c.hoverAnimation === 'lift' && <RangeSlider label="Lift Amount" value={c.hoverLift} min={2} max={20} onChange={(v) => set({ hoverLift: v })} suffix="px" />}
        {c.hoverAnimation === 'scale' && <RangeSlider label="Scale Amount" value={c.hoverScale} min={1} max={1.2} step={0.01} onChange={(v) => set({ hoverScale: v })} suffix="x" />}
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Custom CSS" subtitle="Override card styles" />
      <textarea value={c.customCSS} onChange={(e) => set({ customCSS: e.target.value })}
        placeholder="e.g. .card:hover { transform: rotate(2deg); }"
        className="w-full h-24 px-3 py-2 text-xs font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y" />

      <hr className="border-gray-100" />
      <SectionHeading title="Preview" />
      <div className="grid grid-cols-2 gap-4">
        {['Feature Card', 'Another Card'].map((title) => (
          <div key={title} className="p-5 transition-all"
            style={{
              borderRadius: c.borderRadius,
              boxShadow: c.shadow,
              border: c.border,
              backgroundColor: c.backgroundColor,
              minHeight: c.minHeight || undefined,
            }}>
            <div className="w-8 h-8 rounded-lg mb-3"
              style={{ backgroundColor: `${settings.colors.primary}20` }} />
            <h4 className="font-semibold mb-1 text-sm"
              style={{ fontSize: c.titleSize, color: c.titleColor }}>{title}</h4>
            <p className="text-xs"
              style={{ fontSize: c.bodySize, color: c.bodyColor }}>
              Sample card content showing how your design settings look in practice.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayoutPanel({ settings, onChange }: { settings: DesignSettings; onChange: (s: DesignSettings) => void }) {
  const l = settings.layout;
  const set = (partial: Partial<typeof l>) => onChange({ ...settings, layout: { ...l, ...partial } });
  return (
    <div className="space-y-6">
      <SectionHeading title="Container Widths" subtitle="Max widths for the outer wrapper and text content areas" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Container Width" value={l.containerWidth} min={800} max={1600} step={20} onChange={(v) => set({ containerWidth: v })} suffix="px" />
        <RangeSlider label="Content Max Width" value={l.contentMaxWidth} min={480} max={1200} step={20} onChange={(v) => set({ contentMaxWidth: v })} suffix="px" />
        <RangeSlider label="Content Padding" value={l.contentPadding} min={0} max={80} step={4} onChange={(v) => set({ contentPadding: v })} suffix="px" />
        <RangeSlider label="Sidebar Width" value={l.sidebarWidth} min={200} max={400} step={10} onChange={(v) => set({ sidebarWidth: v })} suffix="px" />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Spacing" subtitle="Gaps between sections, pages & grid items" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Page Spacing" value={l.pageSpacing} min={16} max={160} step={8} onChange={(v) => set({ pageSpacing: v })} suffix="px" />
        <RangeSlider label="Section Spacing" value={l.sectionSpacing} min={16} max={200} step={8} onChange={(v) => set({ sectionSpacing: v })} suffix="px" />
        <RangeSlider label="Grid Gap" value={l.gridGap} min={8} max={80} step={4} onChange={(v) => set({ gridGap: v })} suffix="px" />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Global Style" subtitle="Border radius multiplier & shadow intensity" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Border Radius Scale" value={l.borderRadiusScale} min={0} max={2} step={0.1} onChange={(v) => set({ borderRadiusScale: v })} suffix="x" />
        <SelectInput label="Shadow Intensity" value={l.shadowIntensity} onChange={(v) => set({ shadowIntensity: v as 'none'|'subtle'|'medium'|'strong' })}
          options={[
            {value:'none',label:'None'},
            {value:'subtle',label:'Subtle'},
            {value:'medium',label:'Medium'},
            {value:'strong',label:'Strong'},
          ]} />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Custom CSS" subtitle="Override layout styles or add media queries" />
      <textarea value={l.customCSS} onChange={(e) => set({ customCSS: e.target.value })}
        placeholder="e.g. @media (max-width: 768px) { --container-width: 100%; --grid-gap: 16px; }"
        className="w-full h-24 px-3 py-2 text-xs font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y" />
      <p className="text-[11px] text-gray-400">Custom CSS is injected into <code>&lt;head&gt;</code> when saved. Use <code>var(--container-width)</code> etc. to reference design tokens.</p>
    </div>
  );
}

function NavigationPanel({ settings, onChange }: { settings: DesignSettings; onChange: (s: DesignSettings) => void }) {
  const n = settings.navigation;
  const set = (partial: Partial<typeof n>) => onChange({ ...settings, navigation: { ...n, ...partial } });
  return (
    <div className="space-y-6">
      <SectionHeading title="Nav Bar Size" subtitle="Logo size and navigation bar height" />
      <div className="grid grid-cols-2 gap-4">
        <RangeSlider label="Logo Size" value={n.logoSize} min={32} max={200} step={4} onChange={(v) => set({ logoSize: v })} suffix="px" />
        <RangeSlider label="Nav Height" value={n.height} min={40} max={120} step={4} onChange={(v) => set({ height: v })} suffix="px" />
        <RangeSlider label="Border Radius" value={n.borderRadius} min={0} max={40} step={2} onChange={(v) => set({ borderRadius: v })} suffix="px" />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Colors" subtitle="Navigation bar background, text and active link colors" />
      <div className="grid grid-cols-2 gap-4">
        <ColorInput label="Background" value={n.backgroundColor} onChange={(v) => set({ backgroundColor: v })} />
        <ColorInput label="Text Color" value={n.textColor} onChange={(v) => set({ textColor: v })} />
        <ColorInput label="Active Color" value={n.activeColor} onChange={(v) => set({ activeColor: v })} />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Shadow" subtitle="Drop shadow for the navigation bar" />
      <input type="text" value={n.shadow} onChange={(e) => set({ shadow: e.target.value })}
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none font-mono" />
      <hr className="border-gray-100" />

      <SectionHeading title="Behavior" subtitle="Navigation bar positioning and responsive breakpoint" />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={n.sticky} onChange={(e) => set({ sticky: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
            <span className="text-sm text-gray-700">Sticky</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={n.transparent} onChange={(e) => set({ transparent: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
            <span className="text-sm text-gray-700">Transparent</span>
          </label>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Mobile Breakpoint (px)</label>
          <input type="number" min={480} max={1200} step={16} value={n.mobileBreakpoint}
            onChange={(e) => set({ mobileBreakpoint: Number(e.target.value) })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
        </div>
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Features" subtitle="Show/hide search bar and CTA button" />
      <div className="flex items-center gap-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={n.showSearch} onChange={(e) => set({ showSearch: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
          <span className="text-sm text-gray-700">Show Search</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={n.showCta} onChange={(e) => set({ showCta: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
          <span className="text-sm text-gray-700">Show CTA Button</span>
        </label>
      </div>
      {n.showCta && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">CTA Text</label>
            <input type="text" value={n.ctaText} onChange={(e) => set({ ctaText: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">CTA Link</label>
            <input type="text" value={n.ctaLink} onChange={(e) => set({ ctaLink: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
          </div>
        </div>
      )}
      <hr className="border-gray-100" />

      <SectionHeading title="Custom CSS" subtitle="Override navigation styles" />
      <textarea value={n.customCSS} onChange={(e) => set({ customCSS: e.target.value })}
        placeholder="e.g. nav { backdrop-filter: blur(10px); }"
        className="w-full h-24 px-3 py-2 text-xs font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y" />
    </div>
  );
}

function AnimationsPanel({ settings, onChange }: { settings: DesignSettings; onChange: (s: DesignSettings) => void }) {
  const a = settings.animations;
  const set = (partial: Partial<typeof a>) => onChange({ ...settings, animations: { ...a, ...partial } });
  return (
    <div className="space-y-6">
      <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-100">
        <input type="checkbox" checked={a.enabled} onChange={(e) => set({ enabled: e.target.checked })}
          className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
        <div>
          <span className="text-sm font-medium text-gray-900">Enable Animations</span>
          <p className="text-xs text-gray-500">Master toggle for all motion effects on the site</p>
        </div>
      </label>
      <hr className="border-gray-100" />

      <SectionHeading title="Speed & Easing" subtitle="Animation duration and motion curve" />
      <div className="grid grid-cols-2 gap-4">
        <SelectInput label="Speed" value={a.speed} onChange={(v) => set({ speed: v as 'slow'|'normal'|'fast' })}
          options={[{value:'slow',label:'Slow (0.5s)'},{value:'normal',label:'Normal (0.3s)'},{value:'fast',label:'Fast (0.1s)'}]} />
        <SelectInput label="Easing" value={a.easing} onChange={(v) => set({ easing: v as any })}
          options={[
            {value:'ease',label:'Ease'},
            {value:'ease-in',label:'Ease In'},
            {value:'ease-out',label:'Ease Out'},
            {value:'ease-in-out',label:'Ease In Out'},
            {value:'bounce',label:'Bounce'},
            {value:'spring',label:'Spring'},
          ]} />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Entrance Effects" subtitle="How elements appear when the page loads" />
      <SelectInput label="Entrance Animation" value={a.entranceEffect} onChange={(v) => set({ entranceEffect: v as any })}
        options={[
          {value:'fadeIn',label:'Fade In'},
          {value:'fadeUp',label:'Fade & Slide Up'},
          {value:'fadeDown',label:'Fade & Slide Down'},
          {value:'slideUp',label:'Slide Up'},
          {value:'slideDown',label:'Slide Down'},
          {value:'slideLeft',label:'Slide Left'},
          {value:'slideRight',label:'Slide Right'},
          {value:'zoomIn',label:'Zoom In'},
          {value:'flip',label:'Flip'},
          {value:'bounce',label:'Bounce'},
        ]} />
      <hr className="border-gray-100" />

      <SectionHeading title="Scroll Animations" subtitle="Effects triggered while scrolling" />
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={a.scrollEffects} onChange={(e) => set({ scrollEffects: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
          <span className="text-sm text-gray-700">Enable Scroll Effects</span>
        </label>
        <SelectInput label="Scroll Type" value={a.scrollType} onChange={(v) => set({ scrollType: v as any })}
          options={[
            {value:'fade',label:'Fade'},
            {value:'slide',label:'Slide'},
            {value:'zoom',label:'Zoom'},
            {value:'blur',label:'Blur'},
          ]} />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Hover Effects" subtitle="Interactions when hovering over cards & buttons" />
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={a.hoverEffects} onChange={(e) => set({ hoverEffects: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
          <span className="text-sm text-gray-700">Enable Hover Effects</span>
        </label>
        <SelectInput label="Hover Type" value={a.hoverType} onChange={(v) => set({ hoverType: v as any })}
          options={[
            {value:'lift',label:'Lift'},
            {value:'glow',label:'Glow'},
            {value:'darken',label:'Darken'},
            {value:'scale',label:'Scale'},
            {value:'border',label:'Border Glow'},
            {value:'rotate',label:'Rotate'},
            {value:'tilt',label:'Tilt'},
          ]} />
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Loading Animation" subtitle="Placeholder effect while content loads" />
      <SelectInput label="Loading Style" value={a.loadingAnimation} onChange={(v) => set({ loadingAnimation: v as any })}
        options={[
          {value:'shimmer',label:'Shimmer'},
          {value:'pulse',label:'Pulse'},
          {value:'spinner',label:'Spinner'},
          {value:'none',label:'None'},
        ]} />
      <hr className="border-gray-100" />

      <SectionHeading title="Advanced" subtitle="Stagger delay & parallax intensity" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Stagger Delay (ms)</label>
          <input type="number" min={0} max={1000} step={50} value={a.staggerDelay}
            onChange={(e) => set({ staggerDelay: Number(e.target.value) })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Parallax Speed</label>
          <input type="number" min={0} max={1} step={0.1} value={a.parallaxSpeed}
            onChange={(e) => set({ parallaxSpeed: Number(e.target.value) })}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
        </div>
      </div>
      <hr className="border-gray-100" />

      <SectionHeading title="Custom CSS" subtitle="Add your own animation keyframes or override any animation style" />
      <textarea value={a.customCSS} onChange={(e) => set({ customCSS: e.target.value })}
        placeholder="e.g. @keyframes myAnim { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }"
        className="w-full h-24 px-3 py-2 text-xs font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y" />
      <p className="text-[11px] text-gray-400">CSS is injected into <code>&lt;head&gt;</code> when saved. Use <code>var(--animation-speed)</code> to respect user speed preference.</p>
    </div>
  );
}

export function DesignManager() {
  const { settings, updateSettings, resetSettings, savePreset, loadPreset, presets } = useDesign();
  const [activeTab, setActiveTab] = useState<Tab>('colors');
  const [presetName, setPresetName] = useState('');
  const [saved, setSaved] = useState(false);
  const [localSettings, setLocalSettings] = useState<DesignSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const hasChanges = JSON.stringify(localSettings) !== JSON.stringify(settings);

  const handleSave = async () => {
    await updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
    await resetSettings();
  };

  const handleSavePreset = async () => {
    if (!presetName.trim()) return;
    await updateSettings(localSettings);
    await savePreset(presetName.trim());
    setPresetName('');
  };

  const handleLoadPreset = async (name: string) => {
    const preset = await loadPreset(name);
    if (preset) setLocalSettings(preset);
  };

  const TabIcon = TABS.find(t => t.id === activeTab)?.icon || Palette;

  return (
    <div className="flex gap-6">
      <div className="w-56 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Sun className="w-4 h-4 text-[var(--color-primary)]" /> Design
            </h2>
          </div>
          <nav className="p-2 space-y-0.5">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2.5 group ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}>
                <div className={`p-1 rounded-md ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                } transition-colors`}>
                  <tab.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{tab.label}</div>
                  {activeTab === tab.id && (
                    <div className="text-[10px] opacity-80 truncate">{tab.desc}</div>
                  )}
                </div>
                {activeTab === tab.id && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">Theme Presets</h3>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input type="text" value={presetName} onChange={(e) => setPresetName(e.target.value)}
                placeholder="Preset name"
                className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
              <button onClick={handleSavePreset}
                className="px-2.5 py-1.5 text-xs font-medium text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition-colors">
                Save
              </button>
            </div>
            {presets.length === 0 ? (
              <p className="text-xs text-gray-400">No presets saved yet</p>
            ) : (
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {presets.map((name) => (
                  <button key={name} onClick={() => handleLoadPreset(name)}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between">
                    <span>{name}</span>
                    <span className="text-[10px] text-gray-400">Load</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-[var(--color-primary)]/10">
                <TabIcon className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  {TABS.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-xs text-gray-500">{TABS.find(t => t.id === activeTab)?.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasChanges && (
                <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md font-medium">Unsaved</span>
              )}
              {saved && (
                <span className="text-xs text-white bg-green-500 px-2 py-1 rounded-md font-medium">Saved!</span>
              )}
              <button onClick={handleReset}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
              <button onClick={handleSave}
                className="px-4 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1">
                <Save className="w-3.5 h-3.5" /> Save Design
              </button>
            </div>
          </div>
          <div className="p-6">
            {activeTab === 'colors' && <ColorsPanel settings={localSettings} onChange={setLocalSettings} />}
            {activeTab === 'typography' && <TypographyPanel settings={localSettings} onChange={setLocalSettings} />}
            {activeTab === 'buttons' && <ButtonsPanel settings={localSettings} onChange={setLocalSettings} />}
            {activeTab === 'cards' && <CardsPanel settings={localSettings} onChange={setLocalSettings} />}
            {activeTab === 'layout' && <LayoutPanel settings={localSettings} onChange={setLocalSettings} />}
            {activeTab === 'navigation' && <NavigationPanel settings={localSettings} onChange={setLocalSettings} />}
            {activeTab === 'animations' && <AnimationsPanel settings={localSettings} onChange={setLocalSettings} />}
          </div>
        </div>

        <LivePreview settings={localSettings} />
      </div>
    </div>
  );
}
