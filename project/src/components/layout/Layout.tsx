import { useState, useEffect, ReactNode } from 'react';
import { CookieConsent } from './CookieConsent';
import { Chatbot } from './Chatbot';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';
import { GlobalStructuredData } from '../seo/GlobalStructuredData';
import { languages, translations, TranslationContext, Language } from '../../lib/i18n';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [languageCode, setLanguageCode] = useState<string>(() => {
    const savedLang = window.localStorage.getItem('marmidon-language');
    return savedLang || languages[0].code;
  });

  const setLanguage = (lang: Language) => setLanguageCode(lang.code);
  const t = (key: string) => translations[languageCode]?.[key] ?? translations.en[key] ?? key;

  useEffect(() => {
    const savedLang = window.localStorage.getItem('marmidon-language');
    if (savedLang) {
      const lang = languages.find((item) => item.code === savedLang);
      if (lang) setLanguageCode(lang.code);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('marmidon-language', languageCode);
    document.documentElement.lang = languageCode;
  }, [languageCode]);

  return (
    <TranslationContext.Provider value={{ languageCode, setLanguage, t }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="min-h-screen flex flex-col">
        <GlobalStructuredData />
        <SiteNav />

        <main id="main-content" className="flex-1">{children}</main>

      <CookieConsent />

      <Chatbot />

      <SiteFooter />
      </div>
    </TranslationContext.Provider>
  );
}



