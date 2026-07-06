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
    readyTitle: 'Ready to Transform Your Business?',
    readyDesc: 'Start your free trial today. No credit card required.',
    contactSales: 'Contact Sales',
    learnMore: 'Learn more',
    noCreditCard: 'No credit card required.',
    products: 'Products',
    solutions: 'Solutions',
    more: 'More',
    contact: 'Contact',
    signUp: 'Sign Up',
    searchPlaceholder: 'Ask Hysys AI anything',
    languageLabel: 'Language',
    navigationTitle: 'Navigation',
    exploreServices: 'Explore HYSYS products and services',
    demoTitle: 'See HYSYS in action',
    demoDescription: 'Watch a concise product demo to understand how our CRM platform accelerates sales, service, and marketing across teams.',
    demoStartTrial: 'Start your free trial',

    // AboutPage
    aboutTitle: 'About HYSYS GLOBAL SOLUTIONS LIMITED',
    aboutDesc: "We believe business is the greatest platform for change and are committed to helping companies connect with customers in a whole new way.",
    ourMission: 'Our Mission',
    missionText1: 'HYSYS GLOBAL SOLUTIONS LIMITED is dedicated to empowering businesses of all sizes to connect with their customers in meaningful ways. We believe that when companies have the right tools, they can transform industries and improve lives.',
    missionText2: "Founded on the principle that customer relationships are the heart of every successful business, we've grown to become the world's leading CRM platform, serving over 150,000 companies globally.",
    joinJourney: 'Join our journey',
    ourValues: 'Our Values',
    valueCustomerSuccess: 'Customer Success',
    valueCustomerSuccessDesc: "Our customers' success is our success. Everything we do is focused on helping them thrive.",
    valueTrustSecurity: 'Trust & Security',
    valueTrustSecurityDesc: 'We earn and maintain trust through transparency, security, and ethical practices.',
    valueEquality: 'Equality',
    valueEqualityDesc: 'We believe in equality for all and are committed to building a more inclusive world.',
    valueInnovation: 'Innovation',
    valueInnovationDesc: 'We continuously push boundaries to deliver cutting-edge solutions.',
    leadershipTeam: 'Leadership Team',
    ourJourney: 'Our Journey',
    joinOurTeam: 'Join Our Team',
    joinOurTeamDesc: "We're always looking for talented people who share our passion for helping businesses succeed.",
    viewOpenPositions: 'View Open Positions',

    // ContactPage
    contactTitle: 'Contact Us',
    contactDesc: "We're here to help. Reach out and we'll get back to you as soon as possible.",
    getInTouch: 'Get in Touch',
    phoneLabel: 'Phone',
    phoneNumbers: '0782-602854 · 0752602857 · 0757 602854',
    phoneHours: 'Mon-Fri 9am-6pm (local time)',
    emailLabel: 'Email',
    emailAddress: 'info@hysysglobal.com',
    emailResponse: "We'll respond within 24 hours",
    websiteLabel: 'Website',
    headquartersLabel: 'Headquarters',
    headquartersAddress: 'Plot 19 Sir Albert Cook Road, MENGO - KAMPALA',
    poBox: "P.O.Box 16435 K'la",
    businessHoursLabel: 'Business Hours',
    hoursWeekdays: 'Mon-Fri: 9am-6pm',
    hoursWeekend: 'Sat-Sun: Closed',
    sendUsMessage: 'Send us a message',
    firstNameLabel: 'First Name *',
    lastNameLabel: 'Last Name *',
    workEmailLabel: 'Work Email *',
    phoneInputLabel: 'Phone',
    companyLabel: 'Company *',
    jobTitleLabel: 'Job Title',
    interestedInLabel: "I'm interested in *",
    selectOption: 'Select an option',
    productDemoOption: 'Product Demo',
    pricingInfoOption: 'Pricing Information',
    technicalSupportOption: 'Technical Support',
    partnershipOption: 'Partnership Opportunities',
    otherOption: 'Other',
    messageLabel: 'Message *',
    messagePlaceholder: 'Tell us about your needs...',
    sendMessageBtn: 'Send Message',

    // PricingPage
    pricingTitle: 'Simple, Transparent Pricing',
    pricingDesc: 'Choose the plan that fits your business. All plans include a 14-day free trial.',
    essentials: 'Essentials',
    essentialsDesc: 'For small teams just getting started',
    professional: 'Professional',
    professionalDesc: 'For growing teams needing more automation',
    enterprisePlan: 'Enterprise',
    enterpriseDesc: 'For large organizations with complex needs',
    mostPopular: 'Most Popular',
    perUserMonth: 'per user/month',
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'Can I try before I buy?',
    faq1A: 'Yes! All plans include a 14-day free trial. No credit card required.',
    faq2Q: 'Can I change plans later?',
    faq2A: 'Absolutely. You can upgrade, downgrade, or cancel anytime from your account settings.',
    faq3Q: 'What payment methods do you accept?',
    faq3A: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
    faq4Q: 'Is there a discount for annual billing?',
    faq4A: 'Yes, save up to 20% when you pay annually instead of monthly.',
    customSolutionTitle: 'Need a custom solution?',
    customSolutionDesc: 'Contact our sales team to discuss enterprise pricing and custom solutions.',
    contactSalesBtn: 'Contact Sales',

    // ProductPage
    productsTitle: 'Cloud Products',
    productsDesc: 'Everything you need to connect with customers, automate processes, and grow your business.',
    salesCloud: 'Sales Cloud',
    crmPlatform: 'CRM Platform',
    salesCloudDesc: 'Drive revenue growth with intelligent sales automation and real-time forecasting.',
    serviceCloud: 'Service Cloud',
    customerServiceLabel: 'Customer Service',
    serviceCloudDesc: 'Deliver exceptional support experiences with AI-powered service solutions.',
    marketingCloud: 'Marketing Cloud',
    digitalMarketingLabel: 'Digital Marketing',
    marketingCloudDesc: 'Create personalized customer journeys across every channel and touchpoint.',
    commerceCloud: 'Commerce Cloud',
    eCommerceLabel: 'E-Commerce',
    commerceCloudDesc: 'Build seamless shopping experiences that convert browsers into buyers.',
    startSellingSmarter: 'Start Selling Smarter',
    transformService: 'Transform Your Service',
    startMarketingSmarter: 'Start Marketing Smarter',
    launchStore: 'Launch Your Store',
    unlockData: 'Unlock Your Data',
    buildPlatform: 'Build Your Platform',
    watchDemoLabel: 'Watch Demo',
    keyFeatures: 'Key Features',
    readyToGetStarted: 'Ready to get started?',
    joinThousands: 'Join thousands of companies using',
    startFreeTrialBtn: 'Start Free Trial',
    productNotFound: 'Product Not Found',
    viewAllProducts: 'View all products',
    dataCloud: 'Data Cloud',
    platformCloud: 'Platform Cloud',
    dataPlatform: 'Data Platform',
    adminAutomation: 'Admin & Automation',

    // SolutionsPage
    solutionsTitle: 'Solutions for Every Business',
    solutionsDesc: "Whether you're a startup or enterprise, we have the right solution for your unique needs.",
    smallBusiness: 'Small Business',
    growFaster: 'Grow faster',
    smallBizDesc: 'HYSYS GLOBAL SOLUTIONS LIMITED helps small businesses build stronger relationships with customers and prospects. Get started quickly with easy-to-use tools designed for growing teams.',
    enterprise: 'Enterprise',
    scaleOperations: 'Scale operations',
    enterpriseSolutionDesc: "The world's most customizable and secure CRM. Enterprise organizations trust HYSYS GLOBAL SOLUTIONS LIMITED to manage millions of customers and complex global operations.",
    startups: 'Startups',
    launchStrong: 'Launch strong',
    startupsDesc: 'Get your startup off the ground with a platform that grows with you. HYSYS GLOBAL SOLUTIONS LIMITED helps startups build customer relationships from day one.',
    nonprofits: 'Nonprofits',
    amplifyImpact: 'Amplify impact',
    nonprofitsDesc: 'Purpose-built for nonprofits, HYSYS GLOBAL SOLUTIONS LIMITED helps organizations manage donors, volunteers, and programs efficiently. Special pricing available for eligible organizations.',
    getStarted: 'Get Started',
    solutionNotFound: 'Solution Not Found',
    viewAllSolutions: 'View all solutions',
    keyFeaturesTitle: 'Key Features',
    benefitsTitle: 'Benefits',

    // IndustriesPage
    industriesTitle: 'Industry Solutions',
    industriesDesc: 'Purpose-built solutions for every industry, designed with your unique challenges in mind.',
    healthcare: 'Healthcare',
    patientEngagement: 'Patient engagement',
    healthcareDesc: 'Transform patient experiences with a unified platform. HYSYS GLOBAL SOLUTIONS LIMITED for Healthcare helps providers deliver personalized care while streamlining operations and ensuring compliance.',
    education: 'Education',
    studentSuccess: 'Student success',
    educationDesc: 'Empower students and educators with a connected campus. HYSYS GLOBAL SOLUTIONS LIMITED for Education helps institutions manage student relationships from recruitment to graduation.',
    financialServices: 'Financial Services',
    clientRelationships: 'Client relationships',
    financialDesc: 'Build trust and grow your book of business. HYSYS GLOBAL SOLUTIONS LIMITED for Financial Services helps advisors deliver personalized experiences while managing compliance.',
    retail: 'Retail',
    customerExperience: 'Customer experience',
    retailDesc: 'Create memorable shopping experiences across channels. HYSYS GLOBAL SOLUTIONS LIMITED for Retail helps you understand customers and deliver personalized experiences at every touchpoint.',
    getIndustrySolution: 'Get Industry Solution',
    industryNotFound: 'Industry Not Found',
    viewAllIndustries: 'View all industries',

    // LearningPage
    learningTitle: 'Learning & Resources',
    learningDesc: 'Build skills, get certified, and connect with experts to master our platform.',
    trailhead: 'Trailhead',
    freeLearningPaths: 'Free learning paths',
    trailheadDesc: 'Learn in-demand skills with fun, interactive modules. Trailhead provides guided learning paths for every role and skill level.',
    certifications: 'Certifications',
    getCertified: 'Get certified',
    certDesc: 'Validate your expertise with industry-recognized certifications. HYSYS GLOBAL SOLUTIONS LIMITED certifications demonstrate your skills and advance your career.',
    webinars: 'Webinars',
    liveSessions: 'Live sessions',
    webinarsDesc: 'Join live sessions with product experts and industry leaders. Learn best practices, see demos, and get your questions answered.',
    documentation: 'Documentation',
    technicalDocs: 'Technical docs',
    docsDesc: 'Comprehensive technical documentation for developers and admins. Find guides, API references, and best practices.',
    popularLearningPaths: 'Popular Learning Paths',
    modules: 'modules',
    hours: 'hours',
    startTrail: 'Start Trail',
    exploreLabel: 'Explore',
    learningNotFound: 'Resource Not Found',
    viewAllResources: 'View all resources',
    whatYoullExperience: "What You'll Experience",

    // CustomerStoriesPage
    customerStoriesTitle: 'Customer Success Stories',
    customerStoriesDesc: 'See how companies worldwide are transforming their businesses with HYSYS GLOBAL SOLUTIONS LIMITED.',
    techcorp: 'TechCorp',
    technology: 'Technology',
    techcorpQuote: 'HYSYS GLOBAL SOLUTIONS LIMITED transformed our sales process. We increased pipeline by 150% in just 6 months.',
    techcorpChallenge: 'TechCorp needed a way to unify their disconnected sales tools and provide visibility into their growing pipeline.',
    techcorpSolution: 'They implemented Sales Cloud with custom automations that streamlined their unique B2B sales process.',
    globalRetail: 'GlobalRetail',
    retailIndustry: 'Retail',
    globalRetailQuote: 'With Marketing Cloud, we now deliver personalized experiences to millions of customers across every channel.',
    globalRetailChallenge: 'GlobalRetail struggled to create consistent, personalized experiences across their 50+ retail locations and digital channels.',
    globalRetailSolution: 'Marketing Cloud unified their customer data and enabled real-time personalization across all touchpoints.',
    healthFirst: 'HealthFirst',
    healthcareIndustry: 'Healthcare',
    healthFirstQuote: 'Patient satisfaction scores jumped significantly after implementing Service Cloud. Our team is more efficient than ever.',
    healthFirstChallenge: 'HealthFirst needed to improve patient communication while ensuring HIPAA compliance across all interactions.',
    healthFirstSolution: 'Service Cloud with Health Cloud provided secure, coordinated care across the entire patient journey.',
    financeTech: 'FinanceTech',
    financialIndustry: 'Financial Services',
    financeTechQuote: 'Our advisors now have complete client visibility, enabling more meaningful conversations and faster decisions.',
    financeTechChallenge: 'FinanceTech struggled with fragmented client data across multiple systems, limiting advisor effectiveness.',
    financeTechSolution: 'Financial Services Cloud unified their data and provided AI-powered insights for better client engagement.',
    readFullStory: 'Read full story',
    shareYourStory: 'Share Your Story',
    shareYourStoryDesc: 'Join hundreds of companies sharing their HYSYS GLOBAL SOLUTIONS LIMITED success stories.',
    contactUsBtn: 'Contact Us',
    backToAllStories: 'Back to all stories',
    theChallenge: 'The Challenge',
    theSolution: 'The Solution',
    storyNotFound: 'Story Not Found',
    viewAllStories: 'View all stories',

    // Legal pages
    privacyTitle: 'Privacy Statement',
    lastUpdated: 'Last updated: June 2026',
    cookiesTitle: 'Cookie Statement',
    termsTitle: 'Terms of Service',

    // GetStartedSection
    getStartedBadge: 'Get started today',
    getStartedTitle1: "There's nothing to install,",
    getStartedTitle2: 'no credit card required',
    getStartedTitle3: 'free for 30 days',
    tryForFree: 'Try for free',
    noCommitment: 'No commitment. Cancel anytime.',

    // FAQSection
    faqBadge: 'FAQ',
    faqSectionTitle: 'Frequently Asked Questions',
    faqIntro1: 'HYSYS GLOBAL SOLUTIONS LIMITED is the #1 CRM (customer relationship management) platform. We bring companies and customers together by providing a unified set of applications – powered by agentic AI and data – that help every department, including sales, service, marketing, commerce, and IT, work as one.',
    faqIntro2: 'Our cloud-based agentic solutions help you find more leads, close more deals, and provide better service to your customers, all on a single, integrated agentic platform. Below are answers to common questions about our platform and how it can transform your business.',
    faqQ1: 'What is HYSYS Global Solutions and what do we do?',
    faqA1: 'HYSYS Global Solutions Limited is a leading provider of CRM and business automation solutions. We help organizations across industries streamline their sales, service, marketing, and operations through our unified platform powered by agentic AI and data analytics. Our mission is to bring companies and customers together by providing intelligent, scalable solutions that drive growth and enhance customer experiences.',
    faqQ2: 'What industries does HYSYS Global Solutions serve?',
    faqA2: 'We serve a diverse range of industries including financial services, healthcare, manufacturing, retail, telecommunications, professional services, and the public sector. Our platform is highly customizable to meet the unique regulatory, operational, and customer engagement requirements of each industry vertical.',
    faqQ3: 'How does HYSYS Global Solutions implement agentic AI in its platform?',
    faqA3: 'Our agentic AI capabilities enable autonomous decision-making and action-taking based on your business goals. This includes intelligent lead scoring, automated workflow orchestration, predictive analytics for customer behavior, smart routing for service cases, and personalized marketing journey optimization - all without requiring manual intervention for routine decisions.',
    faqQ4: 'Can HYSYS Global Solutions integrate with our existing systems?',
    faqA4: 'Yes, our platform offers extensive integration capabilities through pre-built connectors, RESTful APIs, and middleware support. We integrate seamlessly with popular ERP systems (SAP, Oracle, Microsoft Dynamics), marketing automation tools, communication platforms, and custom legacy systems to ensure a unified data ecosystem.',
    faqQ5: 'What deployment options does HYSYS Global Solutions offer?',
    faqA5: 'We offer flexible deployment options including public cloud (multi-region), private cloud, and hybrid deployments. Our platform is cloud-agnostic and can run on AWS, Azure, Google Cloud, or on-premises infrastructure, giving you full control over data residency, compliance, and performance requirements.',
    faqQ6: 'What kind of support and training does HYSYS Global Solutions provide?',
    faqA6: 'We provide comprehensive support including 24/7 technical support for enterprise customers, dedicated customer success managers, implementation services, customized training programs, certification courses, and an extensive knowledge base. Our professional services team ensures smooth onboarding and ongoing optimization of your CRM investment.',

    // HomePage additional keys
    homeSectionBadge: 'AI-Powered CRM Platform',
    platformIntroBadge: 'The Future of CRM',
    platformIntroTitle: 'HYSYS is the platform for the Agentic Enterprise',
    platformIntroDesc: 'Our AI-powered CRM platform helps businesses of all sizes connect with customers, automate processes, and drive growth. With intelligent automation and real-time insights, you can transform your customer experience and scale your operations efficiently.',
    exploreAllProducts: 'Explore all products',
    demoExperience: 'Demo Experience',
    whatYoullSee: "What you'll see",
    intelligentPipeline: 'Intelligent pipeline management',
    automatedServiceWorkflows: 'Automated service workflows',
    personalizedMarketingJourneys: 'Personalized marketing journeys',
    realTimeCustomerAnalytics: 'Real-time customer analytics',
    closeDemoModal: 'Close demo modal',
      explore: 'Explore',
  },

  es: {
    heroTag: 'Plataforma CRM con IA',
    heroTitleLine1: 'Unifica la Experiencia',
    heroTitleLine2: 'del Cliente',
    heroDescription: 'La plataforma CRM líder mundial que ayuda a empresas de todos los tamaños a conectar con clientes, optimizar operaciones e impulsar el crecimiento.',
    startFreeTrial: 'Iniciar prueba gratuita',
    watchDemo: 'Ver demostración',
    trustedBy: 'Con la confianza de líderes del sector',
    companiesTrustUs: 'Empresas que confían en nosotros',
    uptimeSLA: 'SLA de disponibilidad',
    activeUsers: 'Usuarios activos',
    countries: 'Países',
    completeSuiteTitle: 'Suite completa de productos en la nube',
    completeSuiteDesc: 'Todo lo que necesitas para conectar con clientes, automatizar procesos y hacer crecer tu negocio.',
    readyTitle: '¿Listo para transformar tu negocio?',
    readyDesc: 'Inicia tu prueba gratuita hoy. No se requiere tarjeta de crédito.',
    contactSales: 'Contactar ventas',
    learnMore: 'Más información',
    noCreditCard: 'No se requiere tarjeta de crédito.',
    products: 'Productos',
    solutions: 'Soluciones',
    more: 'Más',
    contact: 'Contacto',
    signUp: 'Registrarse',
    searchPlaceholder: 'Pregunta a Hysys AI',
    languageLabel: 'Idioma',
    navigationTitle: 'Navegación',
    exploreServices: 'Explora productos y servicios de HYSYS',
    demoTitle: 'Mira HYSYS en acción',
    demoDescription: 'Ve una demostración concisa del producto para entender cómo nuestra plataforma CRM acelera las ventas, el servicio y el marketing.',
    demoStartTrial: 'Inicia tu prueba gratuita',

    // AboutPage
    aboutTitle: 'Acerca de HYSYS GLOBAL SOLUTIONS LIMITED',
    aboutDesc: 'Creemos que los negocios son la mejor plataforma para el cambio y estamos comprometidos a ayudar a las empresas a conectarse con los clientes de una manera completamente nueva.',
    ourMission: 'Nuestra Misión',
    ourValues: 'Nuestros Valores',
    leadershipTeam: 'Equipo Directivo',
    ourJourney: 'Nuestra Trayectoria',
    joinOurTeam: 'Únete a Nuestro Equipo',

    // ContactPage
    contactTitle: 'Contáctenos',
    contactDesc: 'Estamos aquí para ayudar. Comuníquese y le responderemos lo antes posible.',
    getInTouch: 'Póngase en Contacto',
    sendUsMessage: 'Envíenos un mensaje',
    sendMessageBtn: 'Enviar Mensaje',

    // PricingPage
    pricingTitle: 'Precios Simples y Transparentes',
    pricingDesc: 'Elija el plan que se adapte a su negocio. Todos los planes incluyen una prueba gratuita de 14 días.',
    essentials: 'Esenciales',
    professional: 'Profesional',
    enterprisePlan: 'Empresa',
    mostPopular: 'Más Popular',
    faqTitle: 'Preguntas Frecuentes',

    // ProductPage
    productsTitle: 'Productos en la Nube',
    salesCloud: 'Sales Cloud',
    serviceCloud: 'Service Cloud',
    marketingCloud: 'Marketing Cloud',
    commerceCloud: 'Commerce Cloud',
    keyFeatures: 'Características Clave',

    // SolutionsPage
    solutionsTitle: 'Soluciones para Cada Negocio',
    smallBusiness: 'Pequeña Empresa',
    enterprise: 'Empresa',
    startups: 'Startups',
    nonprofits: 'Organizaciones Sin Fines de Lucro',

    // IndustriesPage
    industriesTitle: 'Soluciones por Industria',
    healthcare: 'Salud',
    education: 'Educación',
    financialServices: 'Servicios Financieros',
    retail: 'Minorista',

    // LearningPage
    learningTitle: 'Aprendizaje y Recursos',
    certifications: 'Certificaciones',
    webinars: 'Seminarios Web',
    documentation: 'Documentación',
    popularLearningPaths: 'Rutas de Aprendizaje Populares',

    // CustomerStoriesPage
    customerStoriesTitle: 'Historias de Éxito de Clientes',
    shareYourStory: 'Comparta Su Historia',
    readFullStory: 'Leer Historia Completa',

    // Legal pages
    privacyTitle: 'Declaración de Privacidad',
    cookiesTitle: 'Declaración de Cookies',
    termsTitle: 'Términos del Servicio',
    lastUpdated: 'Última actualización: junio 2026',

    // GetStartedSection
    getStartedBadge: 'Comience hoy',
    tryForFree: 'Pruebe Gratis',
    noCommitment: 'Sin compromiso. Cancele en cualquier momento.',

    // FAQSection
    faqBadge: 'Preguntas Frecuentes',
    faqSectionTitle: 'Preguntas Frecuentes',

    // HomePage additional keys
    platformIntroBadge: 'El Futuro del CRM',
    exploreAllProducts: 'Explorar todos los productos',
    demoExperience: 'Experiencia de Demostración',
  },

  fr: {
    heroTag: 'Plateforme CRM propulsée par l\'IA',
    heroTitleLine1: 'Unifiez l\'Expérience',
    heroTitleLine2: 'Client',
    heroDescription: 'La plateforme CRM leader mondial qui aide les entreprises de toutes tailles à se connecter avec les clients, rationaliser les opérations et stimuler la croissance.',
    startFreeTrial: 'Démarrer l\'essai gratuit',
    watchDemo: 'Voir la démo',
    trustedBy: 'Approuvé par les leaders du secteur',
    companiesTrustUs: 'Entreprises qui nous font confiance',
    uptimeSLA: 'SLA de disponibilité',
    activeUsers: 'Utilisateurs actifs',
    countries: 'Pays',
    completeSuiteTitle: 'Suite complète de produits cloud',
    completeSuiteDesc: 'Tout ce dont vous avez besoin pour vous connecter avec les clients, automatiser les processus et développer votre entreprise.',
    readyTitle: 'Prêt à transformer votre entreprise ?',
    readyDesc: 'Commencez votre essai gratuit aujourd\'hui. Aucune carte de crédit requise.',
    contactSales: 'Contacter les ventes',
    learnMore: 'En savoir plus',
    noCreditCard: 'Aucune carte de crédit requise.',
    products: 'Produits',
    solutions: 'Solutions',
    more: 'Plus',
    contact: 'Contact',
    signUp: 'S\'inscrire',
    searchPlaceholder: 'Demandez à Hysys AI',
    languageLabel: 'Langue',
    navigationTitle: 'Navigation',
    exploreServices: 'Explorez les produits et services HYSYS',
    demoTitle: 'Voir HYSYS en action',
    demoDescription: 'Regardez une démonstration concise pour comprendre comment notre plateforme CRM accélère les ventes, le service et le marketing.',
    demoStartTrial: 'Commencer votre essai gratuit',

    // AboutPage
    aboutTitle: 'À propos de HYSYS GLOBAL SOLUTIONS LIMITED',
    aboutDesc: "Nous croyons que les entreprises sont le meilleur moteur de changement et nous nous engageons à aider les entreprises à se connecter avec les clients d'une manière entièrement nouvelle.",
    ourMission: 'Notre Mission',
    ourValues: 'Nos Valeurs',
    leadershipTeam: 'Équipe de Direction',
    ourJourney: 'Notre Parcours',
    joinOurTeam: 'Rejoignez Notre Équipe',

    // ContactPage
    contactTitle: 'Contactez-Nous',
    contactDesc: "Nous sommes là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.",
    getInTouch: 'Prenez Contact',
    sendUsMessage: 'Envoyez-nous un message',
    sendMessageBtn: 'Envoyer le Message',

    // PricingPage
    pricingTitle: 'Tarification Simple et Transparente',
    pricingDesc: 'Choisissez le plan qui convient à votre entreprise. Tous les plans incluent un essai gratuit de 14 jours.',
    essentials: 'Essentiels',
    professional: 'Professionnel',
    enterprisePlan: 'Entreprise',
    mostPopular: 'Le Plus Populaire',
    faqTitle: 'Questions Fréquentes',

    // ProductPage
    productsTitle: 'Produits Cloud',
    salesCloud: 'Sales Cloud',
    serviceCloud: 'Service Cloud',
    marketingCloud: 'Marketing Cloud',
    commerceCloud: 'Commerce Cloud',
    keyFeatures: 'Fonctionnalités Clés',

    // SolutionsPage
    solutionsTitle: 'Solutions pour Chaque Entreprise',
    smallBusiness: 'Petite Entreprise',
    enterprise: 'Grande Entreprise',
    startups: 'Startups',
    nonprofits: 'Organismes à But Non Lucratif',

    // IndustriesPage
    industriesTitle: 'Solutions par Secteur',
    healthcare: 'Santé',
    education: 'Éducation',
    financialServices: 'Services Financiers',
    retail: 'Commerce de Détail',

    // LearningPage
    learningTitle: 'Apprentissage et Ressources',
    certifications: 'Certifications',
    webinars: 'Webinaires',
    documentation: 'Documentation',
    popularLearningPaths: "Parcours d'Apprentissage Populaires",

    // CustomerStoriesPage
    customerStoriesTitle: 'Histoires de Réussite Clients',
    shareYourStory: 'Partagez Votre Histoire',
    readFullStory: "Lire l'Histoire Complète",

    // Legal pages
    privacyTitle: 'Déclaration de Confidentialité',
    cookiesTitle: 'Déclaration sur les Cookies',
    termsTitle: "Conditions d'Utilisation",
    lastUpdated: 'Dernière mise à jour : juin 2026',

    // GetStartedSection
    getStartedBadge: 'Commencez aujourd\'hui',
    tryForFree: 'Essayez Gratuitement',
    noCommitment: 'Sans engagement. Annulez à tout moment.',

    // FAQSection
    faqBadge: 'FAQ',
    faqSectionTitle: 'Questions Fréquentes',

    // HomePage additional keys
    platformIntroBadge: 'L\'Avenir du CRM',
    exploreAllProducts: 'Explorer tous les produits',
    demoExperience: 'Expérience de Démonstration',
  },

  de: {
    heroTag: 'KI-gestützte CRM-Plattform',
    heroTitleLine1: 'Vereinheitlichen Sie Ihr',
    heroTitleLine2: 'Kundenerlebnis',
    heroDescription: 'Die weltweit führende CRM-Plattform, die Unternehmen jeder Größe hilft, mit Kunden in Kontakt zu treten, Abläufe zu optimieren und Wachstum zu fördern.',
    startFreeTrial: 'Kostenlose Testversion starten',
    watchDemo: 'Demo ansehen',
    trustedBy: 'Vertraut von Branchenführern',
    companiesTrustUs: 'Unternehmen vertrauen uns',
    uptimeSLA: 'Verfügbarkeits-SLA',
    activeUsers: 'Aktive Nutzer',
    countries: 'Länder',
    completeSuiteTitle: 'Vollständige Suite von Cloud-Produkten',
    completeSuiteDesc: 'Alles, was Sie brauchen, um mit Kunden in Kontakt zu treten, Prozesse zu automatisieren und Ihr Unternehmen auszubauen.',
    readyTitle: 'Bereit, Ihr Unternehmen zu transformieren?',
    readyDesc: 'Starten Sie heute Ihre kostenlose Testversion. Keine Kreditkarte erforderlich.',
    contactSales: 'Vertrieb kontaktieren',
    learnMore: 'Mehr erfahren',
    noCreditCard: 'Keine Kreditkarte erforderlich.',
    products: 'Produkte',
    solutions: 'Lösungen',
    more: 'Mehr',
    contact: 'Kontakt',
    signUp: 'Registrieren',
    searchPlaceholder: 'Fragen Sie Hysys AI',
    languageLabel: 'Sprache',
    navigationTitle: 'Navigation',
    exploreServices: 'HYSYS-Produkte und -Dienste erkunden',
    demoTitle: 'HYSYS in Aktion sehen',
    demoDescription: 'Sehen Sie sich eine prägnante Produktdemonstration an, um zu verstehen, wie unsere CRM-Plattform Vertrieb, Service und Marketing beschleunigt.',
    demoStartTrial: 'Kostenlose Testversion starten',

    // AboutPage
    aboutTitle: 'Über HYSYS GLOBAL SOLUTIONS LIMITED',
    aboutDesc: 'Wir glauben, dass Unternehmen die beste Plattform für Veränderungen sind, und wir helfen Unternehmen dabei, auf völlig neue Weise mit Kunden in Kontakt zu treten.',
    ourMission: 'Unsere Mission',
    ourValues: 'Unsere Werte',
    leadershipTeam: 'Führungsteam',
    ourJourney: 'Unsere Reise',
    joinOurTeam: 'Werden Sie Teil unseres Teams',

    // ContactPage
    contactTitle: 'Kontaktieren Sie uns',
    contactDesc: 'Wir sind hier, um zu helfen. Kontaktieren Sie uns und wir melden uns so schnell wie möglich bei Ihnen.',
    getInTouch: 'Nehmen Sie Kontakt auf',
    sendUsMessage: 'Senden Sie uns eine Nachricht',
    sendMessageBtn: 'Nachricht senden',

    // PricingPage
    pricingTitle: 'Einfache und transparente Preise',
    pricingDesc: 'Wählen Sie den Plan, der zu Ihrem Unternehmen passt. Alle Pläne beinhalten eine 14-tägige kostenlose Testversion.',
    essentials: 'Grundlagen',
    professional: 'Professionell',
    enterprisePlan: 'Unternehmen',
    mostPopular: 'Am Beliebtesten',
    faqTitle: 'Häufig gestellte Fragen',

    // ProductPage
    productsTitle: 'Cloud-Produkte',
    salesCloud: 'Sales Cloud',
    serviceCloud: 'Service Cloud',
    marketingCloud: 'Marketing Cloud',
    commerceCloud: 'Commerce Cloud',
    keyFeatures: 'Hauptfunktionen',

    // SolutionsPage
    solutionsTitle: 'Lösungen für jedes Unternehmen',
    smallBusiness: 'Kleinunternehmen',
    enterprise: 'Großunternehmen',
    startups: 'Startups',
    nonprofits: 'Gemeinnützige Organisationen',

    // IndustriesPage
    industriesTitle: 'Branchenlösungen',
    healthcare: 'Gesundheitswesen',
    education: 'Bildung',
    financialServices: 'Finanzdienstleistungen',
    retail: 'Einzelhandel',

    // LearningPage
    learningTitle: 'Lernen & Ressourcen',
    certifications: 'Zertifizierungen',
    webinars: 'Webinare',
    documentation: 'Dokumentation',
    popularLearningPaths: 'Beliebte Lernpfade',

    // CustomerStoriesPage
    customerStoriesTitle: 'Kunden-erfolgsgeschichten',
    shareYourStory: 'Teilen Sie Ihre Geschichte',
    readFullStory: 'Vollständige Geschichte lesen',

    // Legal pages
    privacyTitle: 'Datenschutz-erklärung',
    cookiesTitle: 'Cookie-Erklärung',
    termsTitle: 'Nutzungs-bedingungen',
    lastUpdated: 'Zuletzt aktualisiert: Juni 2026',

    // GetStartedSection
    getStartedBadge: 'Jetzt starten',
    tryForFree: 'Kostenlos testen',
    noCommitment: 'Keine Verpflichtung. Jederzeit kündbar.',

    // FAQSection
    faqBadge: 'FAQ',
    faqSectionTitle: 'Häufig gestellte Fragen',

    // HomePage additional keys
    platformIntroBadge: 'Die Zukunft des CRM',
    exploreAllProducts: 'Alle Produkte entdecken',
    demoExperience: 'Demo-Erfahrung',
  },

  zh: {
    heroTag: 'AI驱动的CRM平台',
    heroTitleLine1: '统一您的客户',
    heroTitleLine2: '体验',
    heroDescription: '全球领先的CRM平台，帮助各种规模的企业与客户建立联系、简化运营并推动增长。',
    startFreeTrial: '开始免费试用',
    watchDemo: '观看演示',
    trustedBy: '受行业领导者信赖',
    companiesTrustUs: '信任我们的公司',
    uptimeSLA: '正常运行时间SLA',
    activeUsers: '活跃用户',
    countries: '国家',
    completeSuiteTitle: '完整的云产品套件',
    completeSuiteDesc: '连接客户、自动化流程和发展业务所需的一切。',
    readyTitle: '准备好转型您的业务了吗？',
    readyDesc: '立即开始免费试用。无需信用卡。',
    contactSales: '联系销售',
    learnMore: '了解更多',
    noCreditCard: '无需信用卡。',
    products: '产品',
    solutions: '解决方案',
    more: '更多',
    contact: '联系我们',
    signUp: '注册',
    searchPlaceholder: '向Hysys AI提问',
    languageLabel: '语言',
    navigationTitle: '导航',
    exploreServices: '探索HYSYS产品和服务',
    demoTitle: '观看HYSYS实际操作',
    demoDescription: '观看简洁的产品演示，了解我们的CRM平台如何加速销售、服务和营销团队的工作。',
    demoStartTrial: '开始免费试用',

    // AboutPage
    aboutTitle: '关于 HYSYS GLOBAL SOLUTIONS LIMITED',
    aboutDesc: '我们相信企业是推动变革的最佳平台，致力于帮助公司以全新的方式与客户建立联系。',
    ourMission: '我们的使命',
    ourValues: '我们的价值观',
    leadershipTeam: '领导团队',
    ourJourney: '我们的历程',
    joinOurTeam: '加入我们的团队',

    // ContactPage
    contactTitle: '联系我们',
    contactDesc: '我们随时提供帮助。请与我们联系，我们会尽快回复您。',
    getInTouch: '取得联系',
    sendUsMessage: '给我们发送消息',
    sendMessageBtn: '发送消息',

    // PricingPage
    pricingTitle: '简单透明的定价',
    pricingDesc: '选择适合您业务的方案。所有方案均包含14天免费试用。',
    essentials: '基础版',
    professional: '专业版',
    enterprisePlan: '企业版',
    mostPopular: '最受欢迎',
    faqTitle: '常见问题',

    // ProductPage
    productsTitle: '云产品',
    salesCloud: 'Sales Cloud',
    serviceCloud: 'Service Cloud',
    marketingCloud: 'Marketing Cloud',
    commerceCloud: 'Commerce Cloud',
    keyFeatures: '主要功能',

    // SolutionsPage
    solutionsTitle: '针对每种业务的解决方案',
    smallBusiness: '小型企业',
    enterprise: '大型企业',
    startups: '初创公司',
    nonprofits: '非营利组织',

    // IndustriesPage
    industriesTitle: '行业解决方案',
    healthcare: '医疗保健',
    education: '教育',
    financialServices: '金融服务',
    retail: '零售',

    // LearningPage
    learningTitle: '学习与资源',
    certifications: '认证',
    webinars: '网络研讨会',
    documentation: '文档',
    popularLearningPaths: '热门学习路径',

    // CustomerStoriesPage
    customerStoriesTitle: '客户成功案例',
    shareYourStory: '分享您的故事',
    readFullStory: '阅读完整故事',

    // Legal pages
    privacyTitle: '隐私声明',
    cookiesTitle: 'Cookie 声明',
    termsTitle: '服务条款',
    lastUpdated: '最后更新：2026年6月',

    // GetStartedSection
    getStartedBadge: '立即开始',
    tryForFree: '免费试用',
    noCommitment: '无承诺。随时取消。',

    // FAQSection
    faqBadge: '常见问题',
    faqSectionTitle: '常见问题',

    // HomePage additional keys
    platformIntroBadge: 'CRM的未来',
    exploreAllProducts: '探索所有产品',
    demoExperience: '演示体验',
  },

  ar: {
    heroTag: 'منصة CRM مدعومة بالذكاء الاصطناعي',
    heroTitleLine1: 'وحّد تجربة',
    heroTitleLine2: 'عملائك',
    heroDescription: 'المنصة الرائدة عالمياً في إدارة علاقات العملاء التي تساعد الشركات من جميع الأحجام على التواصل مع العملاء وتبسيط العمليات وتحقيق النمو.',
    startFreeTrial: 'ابدأ التجربة المجانية',
    watchDemo: 'شاهد العرض التوضيحي',
    trustedBy: 'موثوق به من قِبل رواد الصناعة',
    companiesTrustUs: 'شركة تثق بنا',
    uptimeSLA: 'اتفاقية مستوى الخدمة للتشغيل',
    activeUsers: 'مستخدم نشط',
    countries: 'دولة',
    completeSuiteTitle: 'مجموعة كاملة من منتجات السحابة',
    completeSuiteDesc: 'كل ما تحتاجه للتواصل مع العملاء وأتمتة العمليات وتنمية أعمالك.',
    readyTitle: 'هل أنت مستعد لتحويل عملك؟',
    readyDesc: 'ابدأ تجربتك المجانية اليوم. لا بطاقة ائتمان مطلوبة.',
    contactSales: 'تواصل مع المبيعات',
    learnMore: 'اعرف المزيد',
    noCreditCard: 'لا بطاقة ائتمان مطلوبة.',
    products: 'المنتجات',
    solutions: 'الحلول',
    more: 'المزيد',
    contact: 'اتصل بنا',
    signUp: 'إنشاء حساب',
    searchPlaceholder: 'اسأل Hysys AI أي شيء',
    languageLabel: 'اللغة',
    navigationTitle: 'التنقل',
    exploreServices: 'استكشف منتجات وخدمات HYSYS',
    demoTitle: 'شاهد HYSYS في العمل',
    demoDescription: 'شاهد عرضاً توضيحياً موجزاً للمنتج لفهم كيف تسرّع منصة CRM لدينا المبيعات والخدمة والتسويق.',
    demoStartTrial: 'ابدأ تجربتك المجانية',

    // AboutPage
    aboutTitle: 'حول HYSYS GLOBAL SOLUTIONS LIMITED',
    aboutDesc: 'نعتقد أن الأعمال هي أفضل منصة للتغيير ونحن ملتزمون بمساعدة الشركات على التواصل مع العملاء بطريقة جديدة كلياً.',
    ourMission: 'مهمتنا',
    ourValues: 'قيمنا',
    leadershipTeam: 'فريق القيادة',
    ourJourney: 'رحلتنا',
    joinOurTeam: 'انضم إلى فريقنا',

    // ContactPage
    contactTitle: 'اتصل بنا',
    contactDesc: 'نحن هنا للمساعدة. تواصل معنا وسنرد عليك في أقرب وقت ممكن.',
    getInTouch: 'تواصل معنا',
    sendUsMessage: 'أرسل لنا رسالة',
    sendMessageBtn: 'إرسال الرسالة',

    // PricingPage
    pricingTitle: 'أسعار بسيطة وشفافة',
    pricingDesc: 'اختر الخطة التي تناسب عملك. جميع الخطط تتضمن نسخة تجريبية مجانية لمدة 14 يوماً.',
    essentials: 'الأساسيات',
    professional: 'احترافي',
    enterprisePlan: 'مؤسسة',
    mostPopular: 'الأكثر شهرة',
    faqTitle: 'الأسئلة الشائعة',

    // ProductPage
    productsTitle: 'المنتجات السحابية',
    salesCloud: 'Sales Cloud',
    serviceCloud: 'Service Cloud',
    marketingCloud: 'Marketing Cloud',
    commerceCloud: 'Commerce Cloud',
    keyFeatures: 'الميزات الرئيسية',

    // SolutionsPage
    solutionsTitle: 'حلول لكل الأعمال',
    smallBusiness: 'الأعمال الصغيرة',
    enterprise: 'المؤسسات',
    startups: 'الشركات الناشئة',
    nonprofits: 'المنظمات غير الربحية',

    // IndustriesPage
    industriesTitle: 'حلول قطاعية',
    healthcare: 'الرعاية الصحية',
    education: 'التعليم',
    financialServices: 'الخدمات المالية',
    retail: 'التجزئة',

    // LearningPage
    learningTitle: 'التعلم والموارد',
    certifications: 'الشهادات',
    webinars: 'الندوات عبر الإنترنت',
    documentation: 'التوثيق',
    popularLearningPaths: 'مسارات التعلم الشائعة',

    // CustomerStoriesPage
    customerStoriesTitle: 'قصص نجاح العملاء',
    shareYourStory: 'شارك قصتك',
    readFullStory: 'اقرأ القصة كاملة',

    // Legal pages
    privacyTitle: 'بيان الخصوصية',
    cookiesTitle: 'بيان ملفات تعريف الارتباط',
    termsTitle: 'شروط الخدمة',
    lastUpdated: 'آخر تحديث: يونيو 2026',

    // GetStartedSection
    getStartedBadge: 'ابدأ اليوم',
    tryForFree: 'جرب مجاناً',
    noCommitment: 'لا التزام. يمكن الإلغاء في أي وقت.',

    // FAQSection
    faqBadge: 'الأسئلة الشائعة',
    faqSectionTitle: 'الأسئلة الشائعة',

    // HomePage additional keys
    platformIntroBadge: 'مستقبل CRM',
    exploreAllProducts: 'استكشف جميع المنتجات',
    demoExperience: 'تجربة العرض التوضيحي',
  },

  pt: {
    heroTag: 'Plataforma CRM com IA',
    heroTitleLine1: 'Unifique a Experiência',
    heroTitleLine2: 'do Cliente',
    heroDescription: 'A plataforma CRM líder mundial que ajuda empresas de todos os tamanhos a se conectar com clientes, simplificar operações e impulsionar o crescimento.',
    startFreeTrial: 'Iniciar avaliação gratuita',
    watchDemo: 'Ver demonstração',
    trustedBy: 'Confiado por líderes do setor',
    companiesTrustUs: 'Empresas que confiam em nós',
    uptimeSLA: 'SLA de disponibilidade',
    activeUsers: 'Usuários ativos',
    countries: 'Países',
    completeSuiteTitle: 'Suite completa de produtos em nuvem',
    completeSuiteDesc: 'Tudo que você precisa para se conectar com clientes, automatizar processos e expandir seu negócio.',
    readyTitle: 'Pronto para transformar seu negócio?',
    readyDesc: 'Inicie sua avaliação gratuita hoje. Não é necessário cartão de crédito.',
    contactSales: 'Falar com vendas',
    learnMore: 'Saiba mais',
    noCreditCard: 'Não é necessário cartão de crédito.',
    products: 'Produtos',
    solutions: 'Soluções',
    more: 'Mais',
    contact: 'Contato',
    signUp: 'Cadastrar-se',
    searchPlaceholder: 'Pergunte ao Hysys AI',
    languageLabel: 'Idioma',
    navigationTitle: 'Navegação',
    exploreServices: 'Explore produtos e serviços da HYSYS',
    demoTitle: 'Veja o HYSYS em ação',
    demoDescription: 'Assista a uma demonstração concisa do produto para entender como nossa plataforma CRM acelera vendas, serviço e marketing.',
    demoStartTrial: 'Iniciar avaliação gratuita',

    // AboutPage
    aboutTitle: 'Sobre a HYSYS GLOBAL SOLUTIONS LIMITED',
    aboutDesc: 'Acreditamos que os negócios são a melhor plataforma para mudanças e estamos comprometidos em ajudar empresas a se conectarem com clientes de uma forma totalmente nova.',
    ourMission: 'Nossa Missão',
    ourValues: 'Nossos Valores',
    leadershipTeam: 'Equipe de Liderança',
    ourJourney: 'Nossa Jornada',
    joinOurTeam: 'Junte-se à Nossa Equipe',

    // ContactPage
    contactTitle: 'Fale Conosco',
    contactDesc: 'Estamos aqui para ajudar. Entre em contato e retornaremos o mais breve possível.',
    getInTouch: 'Entre em Contato',
    sendUsMessage: 'Envie-nos uma mensagem',
    sendMessageBtn: 'Enviar Mensagem',

    // PricingPage
    pricingTitle: 'Preços Simples e Transparentes',
    pricingDesc: 'Escolha o plano que se adapta ao seu negócio. Todos os planos incluem um teste gratuito de 14 dias.',
    essentials: 'Essenciais',
    professional: 'Profissional',
    enterprisePlan: 'Empresarial',
    mostPopular: 'Mais Popular',
    faqTitle: 'Perguntas Frequentes',

    // ProductPage
    productsTitle: 'Produtos em Nuvem',
    salesCloud: 'Sales Cloud',
    serviceCloud: 'Service Cloud',
    marketingCloud: 'Marketing Cloud',
    commerceCloud: 'Commerce Cloud',
    keyFeatures: 'Principais Recursos',

    // SolutionsPage
    solutionsTitle: 'Soluções para Cada Negócio',
    smallBusiness: 'Pequena Empresa',
    enterprise: 'Empresa',
    startups: 'Startups',
    nonprofits: 'Organizações Sem Fins Lucrativos',

    // IndustriesPage
    industriesTitle: 'Soluções por Setor',
    healthcare: 'Saúde',
    education: 'Educação',
    financialServices: 'Serviços Financeiros',
    retail: 'Varejo',

    // LearningPage
    learningTitle: 'Aprendizado e Recursos',
    certifications: 'Certificações',
    webinars: 'Webinars',
    documentation: 'Documentação',
    popularLearningPaths: 'Caminhos de Aprendizado Populares',

    // CustomerStoriesPage
    customerStoriesTitle: 'Histórias de Sucesso de Clientes',
    shareYourStory: 'Compartilhe Sua História',
    readFullStory: 'Ler História Completa',

    // Legal pages
    privacyTitle: 'Declaração de Privacidade',
    cookiesTitle: 'Declaração de Cookies',
    termsTitle: 'Termos de Serviço',
    lastUpdated: 'Última atualização: junho de 2026',

    // GetStartedSection
    getStartedBadge: 'Comece hoje',
    tryForFree: 'Experimente Grátis',
    noCommitment: 'Sem compromisso. Cancele quando quiser.',

    // FAQSection
    faqBadge: 'FAQ',
    faqSectionTitle: 'Perguntas Frequentes',

    // HomePage additional keys
    platformIntroBadge: 'O Futuro do CRM',
    exploreAllProducts: 'Explorar todos os produtos',
    demoExperience: 'Experiência de Demonstração',
  },

  ja: {
    heroTag: 'AI搭載CRMプラットフォーム',
    heroTitleLine1: '顧客体験を',
    heroTitleLine2: '統一する',
    heroDescription: '世界をリードするCRMプラットフォームで、あらゆる規模の企業が顧客とつながり、業務を効率化し、成長を促進できます。',
    startFreeTrial: '無料トライアルを開始',
    watchDemo: 'デモを見る',
    trustedBy: '業界リーダーから信頼されています',
    companiesTrustUs: '信頼企業数',
    uptimeSLA: '稼働率SLA',
    activeUsers: 'アクティブユーザー',
    countries: '対応国数',
    completeSuiteTitle: 'クラウド製品の完全スイート',
    completeSuiteDesc: '顧客とつながり、プロセスを自動化し、ビジネスを成長させるために必要なすべて。',
    readyTitle: 'ビジネスを変革する準備はできていますか？',
    readyDesc: '今日から無料トライアルを始めましょう。クレジットカード不要。',
    contactSales: '営業に問い合わせ',
    learnMore: '詳細を見る',
    noCreditCard: 'クレジットカード不要。',
    products: '製品',
    solutions: 'ソリューション',
    more: 'その他',
    contact: 'お問い合わせ',
    signUp: '登録する',
    searchPlaceholder: 'Hysys AIに質問する',
    languageLabel: '言語',
    navigationTitle: 'ナビゲーション',
    exploreServices: 'HYSYSの製品とサービスを探索',
    demoTitle: 'HYSYSの実際の動作を見る',
    demoDescription: '簡潔な製品デモをご覧ください。当社のCRMプラットフォームが営業、サービス、マーケティングをどのように加速するかをご理解いただけます。',
    demoStartTrial: '無料トライアルを開始する',

    // AboutPage
    aboutTitle: 'HYSYS GLOBAL SOLUTIONS LIMITED について',
    aboutDesc: '私たちは、ビジネスこそが変革の最大のプラットフォームであると信じ、企業がまったく新しい方法で顧客とつながることを支援することに取り組んでいます。',
    ourMission: '私たちの使命',
    ourValues: '私たちの価値観',
    leadershipTeam: 'リーダーシップチーム',
    ourJourney: '私たちの歩み',
    joinOurTeam: 'チームに参加する',

    // ContactPage
    contactTitle: 'お問い合わせ',
    contactDesc: 'いつでもお手伝いいたします。ご連絡いただければ、できるだけ早くご返答いたします。',
    getInTouch: 'お問い合わせ',
    sendUsMessage: 'メッセージを送る',
    sendMessageBtn: 'メッセージを送信',

    // PricingPage
    pricingTitle: 'シンプルで透明な料金',
    pricingDesc: 'ビジネスに合ったプランをお選びください。すべてのプランに14日間の無料トライアルが含まれています。',
    essentials: 'エッセンシャル',
    professional: 'プロフェッショナル',
    enterprisePlan: 'エンタープライズ',
    mostPopular: '最も人気',
    faqTitle: 'よくある質問',

    // ProductPage
    productsTitle: 'クラウド製品',
    salesCloud: 'Sales Cloud',
    serviceCloud: 'Service Cloud',
    marketingCloud: 'Marketing Cloud',
    commerceCloud: 'Commerce Cloud',
    keyFeatures: '主要機能',

    // SolutionsPage
    solutionsTitle: 'あらゆるビジネスに対応するソリューション',
    smallBusiness: '中小企業',
    enterprise: '大企業',
    startups: 'スタートアップ',
    nonprofits: '非営利団体',

    // IndustriesPage
    industriesTitle: '業界ソリューション',
    healthcare: 'ヘルスケア',
    education: '教育',
    financialServices: '金融サービス',
    retail: '小売',

    // LearningPage
    learningTitle: '学習とリソース',
    certifications: '認定資格',
    webinars: 'ウェビナー',
    documentation: 'ドキュメント',
    popularLearningPaths: '人気の学習パス',

    // CustomerStoriesPage
    customerStoriesTitle: 'お客様の成功事例',
    shareYourStory: 'あなたのストーリーを共有',
    readFullStory: '全文を読む',

    // Legal pages
    privacyTitle: 'プライバシーステートメント',
    cookiesTitle: 'クッキーステートメント',
    termsTitle: '利用規約',
    lastUpdated: '最終更新日：2026年6月',

    // GetStartedSection
    getStartedBadge: '今すぐ始める',
    tryForFree: '無料で試す',
    noCommitment: '契約不要。いつでもキャンセル可能。',

    // FAQSection
    faqBadge: 'よくある質問',
    faqSectionTitle: 'よくある質問',

    // HomePage additional keys
    platformIntroBadge: 'CRMの未来',
    exploreAllProducts: 'すべての製品を見る',
    demoExperience: 'デモ体験',
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
    readyTitle: 'Tayari Kubadilisha Biashara Yako?',
    readyDesc: 'Anza jaribio lako la bure leo. Hakuna kadi ya mkopo inayohitajika.',
    contactSales: 'Wasiliana na Mauzo',
    learnMore: 'Jifunze Zaidi',
    noCreditCard: 'Hakuna kadi ya mkopo inayohitajika.',
    products: 'Bidhaa',
    solutions: 'Suluhisho',
    more: 'Zaidi',
    contact: 'Wasiliana',
    signUp: 'Jisajili',
    searchPlaceholder: 'Uliza Hysys AI chochote',
    languageLabel: 'Lugha',
    navigationTitle: 'Uvinjari',
    exploreServices: 'Gundua bidhaa na huduma za HYSYS',
    demoTitle: 'Tazama HYSYS ikifanya kazi',
    demoDescription: 'Tazama demo fupi ya bidhaa kuelewa jinsi jukwaa letu la CRM linavyoboost mauzo, huduma, na uuzaji kwa timu.',
    demoStartTrial: 'Anza jaribio lako la bure',

    // AboutPage
    aboutTitle: 'Kuhusu HYSYS GLOBAL SOLUTIONS LIMITED',
    aboutDesc: 'Tunaamini biashara ndio jukwaa bora zaidi la mabadiliko na tumejitolea kusaidia kampuni kuungana na wateja kwa njia mpya kabisa.',
    ourMission: 'Dhamira Yetu',
    ourValues: 'Maadili Yetu',
    leadershipTeam: 'Timu ya Uongozi',
    ourJourney: 'Safari Yetu',
    joinOurTeam: 'Jiunge na Timu Yetu',

    // ContactPage
    contactTitle: 'Wasiliana Nasi',
    contactDesc: 'Tupo hapa kusaidia. Wasiliana nasi na tutakujibu haraka iwezekanavyo.',
    getInTouch: 'Wasiliana',
    sendUsMessage: 'Tutumie Ujumbe',
    sendMessageBtn: 'Tuma Ujumbe',

    // PricingPage
    pricingTitle: 'Bei Rahisi na wazi',
    pricingDesc: 'Chagua mpango unaofaa biashara yako. Mipango yote inajumuisha jaribio la bure la siku 14.',
    essentials: 'Muhimu',
    professional: 'Mtaalamu',
    enterprisePlan: 'Biashara Kubwa',
    mostPopular: 'Inayopendwa Zaidi',
    faqTitle: 'Maswali Yanayoulizwa Mara kwa Mara',

    // ProductPage
    productsTitle: 'Bidhaa za Wingu',
    salesCloud: 'Sales Cloud',
    serviceCloud: 'Service Cloud',
    marketingCloud: 'Marketing Cloud',
    commerceCloud: 'Commerce Cloud',
    keyFeatures: 'Vipengele Muhimu',

    // SolutionsPage
    solutionsTitle: 'Suluhisho kwa Kila Biashara',
    smallBusiness: 'Biashara Ndogo',
    enterprise: 'Biashara Kubwa',
    startups: 'Startups',
    nonprofits: 'Mashirika Yasiyo ya Faida',

    // IndustriesPage
    industriesTitle: 'Suluhisho za Sekta',
    healthcare: 'Afya',
    education: 'Elimu',
    financialServices: 'Huduma za Kifedha',
    retail: 'Rejareja',

    // LearningPage
    learningTitle: 'Kujifunza na Rasilimali',
    certifications: 'Vyeti',
    webinars: 'Wavuti',
    documentation: 'Nyaraka',
    popularLearningPaths: 'Njia Maarufu za Kujifunza',

    // CustomerStoriesPage
    customerStoriesTitle: 'Hadithi za Mafanikio ya Wateja',
    shareYourStory: 'Shiriki Hadithi Yako',
    readFullStory: 'Soma Hadithi Kamili',

    // Legal pages
    privacyTitle: 'Taarifa ya Faragha',
    cookiesTitle: 'Taarifa ya Vidakuzi',
    termsTitle: 'Sheria na Masharti',
    lastUpdated: 'Ilisasishwa mwisho: Juni 2026',

    // GetStartedSection
    getStartedBadge: 'Anza leo',
    tryForFree: 'Jaribu Bure',
    noCommitment: 'Hakuna dhamana. Ghairi wakati wowote.',

    // FAQSection
    faqBadge: 'Maswali Yanayoulizwa Mara kwa Mara',
    faqSectionTitle: 'Maswali Yanayoulizwa Mara kwa Mara',

    // HomePage additional keys
    platformIntroBadge: 'Mustakabali wa CRM',
    exploreAllProducts: 'Gundua bidhaa zote',
    demoExperience: 'Uzoefu wa Onyesho',
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