import { createContext, useContext } from 'react';

export interface Language {
  code: string;
  label: string;
}

export const languages: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
  { code: 'ar', label: 'العربية' },
  { code: 'pt', label: 'Português' },
  { code: 'ja', label: '日本語' },
  { code: 'sw', label: 'Kiswahili' },
];

export const translations: Record<string, Record<string, string>> = {
  en: {
    heroTag: 'AI-Powered CRM Platform',
    heroTitleLine1: 'Unify Your Customer',
    heroTitleLine2: 'Experience',
    heroDescription: "The world's leading CRM platform that helps businesses of all sizes connect with customers, streamline operations, and drive growth.",
    startFreeTrial: 'Start Free Trial',
    watchDemo: 'Watch Demo',
    trustedBy: 'Trusted by industry leaders',

    companiesTrustUs: 'Companies Trust Us',
    uptimeSLA: 'Uptime SLA',
    activeUsers: 'Active Users',
    countries: 'Countries',

    completeSuiteTitle: 'Complete Suite of Cloud Products',
    completeSuiteDesc: 'Everything you need to connect with customers, automate processes, and grow your business.',

    lovedByHeading: 'Loved by Teams Worldwide',
    lovedByDesc: 'See why thousands of businesses choose HYSYS GLOBAL SOLUTIONS LIMITED',

    readyTitle: 'Ready to Transform Your Business?',
    readyDesc: 'Start your free trial today. No credit card required.',
    contactSales: 'Contact Sales',
    learnMore: 'Learn more',
    noCreditCard: 'No credit card required.',

    lightningFast: 'Lightning Fast',
    lightningFastDesc: 'Sub-second response times ensure your team never waits.',
    enterpriseSecurity: 'Enterprise Security',
    enterpriseSecurityDesc: 'SOC 2 Type II compliant with end-to-end encryption.',
    globalScale: 'Global Scale',
    globalScaleDesc: 'Data centers worldwide for local performance.',
    awardWinning: 'Award Winning',
    awardWinningDesc: 'Recognized as the #1 CRM platform 10 years running.',

    heroFeatureNewLead: 'New Lead',
    heroFeatureEnterprise: 'Enterprise Account',
    demoTitle: 'See HYSYS in action',
    demoDescription: 'Watch a concise product demo to understand how our CRM platform accelerates sales, service, and marketing across teams.',
    demoWhatYoullSee: "What you'll see",
    demoBullet1: 'Intelligent pipeline management',
    demoBullet2: 'Automated service workflows',
    demoBullet3: 'Personalized marketing journeys',
    demoBullet4: 'Real-time customer analytics',
    demoStartTrial: 'Start your free trial',
    navigationTitle: 'Navigation',
    exploreServices: 'Explore HYSYS products and services',
    languageLabel: 'Language',
    more: 'More',
    contact: 'Contact',
    signUp: 'Sign Up',
    searchPlaceholder: 'Ask Hysys AI anything',
  },
  sw: {
    heroTag: 'Jukwaa la CRM linalotumia AI',
    heroTitleLine1: 'Unganisha Mteja Wako',
    heroTitleLine2: 'Uzoefu',
    heroDescription: 'Jukwaa la CRM kinara duniani linalosaidia biashara za kila ukubwa kuungana na wateja, kurahisisha shughuli, na kuongeza ukuaji.',
    startFreeTrial: 'Anza Jaribio Bure',
    watchDemo: 'Tazama Demo',
    trustedBy: 'Imeaminika na viongozi wa sekta',

    companiesTrustUs: 'Kampuni zinatuamini',
    uptimeSLA: 'SLA ya Upatikanaji',
    activeUsers: 'Watumiaji Hai',
    countries: 'Nchi',

    completeSuiteTitle: 'Suite Kamili ya Bidhaa za Wingu',
    completeSuiteDesc: 'Kila unachohitaji kuungana na wateja, kuomboleza michakato, na kukuza biashara yako.',

    lovedByHeading: 'Inapendwa na Timu Duniani',
    lovedByDesc: 'Tazama kwa nini maelfu ya biashara zinachagua HYSYS GLOBAL SOLUTIONS LIMITED',

    readyTitle: 'Tayari Kubadilisha Biashara Yako?',
    readyDesc: 'Anza jaribio lako la bure leo. Hakuna kadi ya mkopo inayohitajika.',
    contactSales: 'Wasiliana na Mauzo',
    learnMore: 'Jifunze Zaidi',
    noCreditCard: 'Hakuna kadi ya mkopo inayohitajika.',

    lightningFast: 'Haraka Sana',
    lightningFastDesc: 'Muda wa majibu chini ya sekunde moja kuhakikisha timu yako haisubiri.',
    enterpriseSecurity: 'Usalama wa Kiwanda',
    enterpriseSecurityDesc: 'SOC 2 Aina II inayokidhi usimbaji fiche mwishoni mwishoni.',
    globalScale: 'Upanuzi wa Kimataifa',
    globalScaleDesc: 'Kituo cha data kote ulimwenguni kwa utendaji wa ndani.',
    awardWinning: 'Inayeshinda Tuzo',
    awardWinningDesc: 'Imetambuliwa kama jukwaa la CRM nambari 1 kwa miaka 10 mfululizo.',

    heroFeatureNewLead: 'Mteja Mpya',
    heroFeatureEnterprise: 'Akaunti ya Kiwanda',
    demoTitle: 'Tazama HYSYS ikifanya kazi',
    demoDescription: 'Tazama demo fupi ya bidhaa kuelewa jinsi jukwaa letu la CRM linavyoboost mauzo, huduma, na uuzaji kwa timu.',
    demoWhatYoullSee: 'Kile utakachoona',
    demoBullet1: 'Usimamizi wa mchakato wa moja kwa moja',
    demoBullet2: 'Mifumo ya huduma otomatiki',
    demoBullet3: 'Njia za uuzaji zilizobinafsishwa',
    demoBullet4: 'Uchambuzi wa wateja wa wakati halisi',
    demoStartTrial: 'Anza jaribio lako la bure',
    navigationTitle: 'Uvinjari',
    exploreServices: 'Gundua bidhaa na huduma za HYSYS',
    languageLabel: 'Lugha',
    more: 'Zaidi',
    contact: 'Wasiliana',
    signUp: 'Jisajili',
    searchPlaceholder: 'Uliza Hysys AI chochote',
  },
};

export interface TranslationContextValue {
  languageCode: string;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

export function useTranslation(): TranslationContextValue {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationContext.Provider');
  }
  return context;
}
