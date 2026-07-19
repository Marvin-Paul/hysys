-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 017: Seed structured content into site_content table
-- Inserts arrays/objects as JSONB for sections that were not seeded in 016
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('homepage', 'product_cards', '[
    {"titleKey":"salesCloud","subtitleKey":"crmPlatform","descriptionKey":"salesCloudDesc","color":"from-blue-500 to-blue-700","bgColor":"bg-blue-50","link":"/products/sales-cloud","gradient":"from-blue-400 to-cyan-400","iconName":"Users"},
    {"titleKey":"serviceCloud","subtitleKey":"customerService","descriptionKey":"serviceCloudDesc","color":"from-cyan-500 to-teal-600","bgColor":"bg-cyan-50","link":"/products/service-cloud","gradient":"from-cyan-400 to-teal-400","iconName":"BarChart3"},
    {"titleKey":"marketingCloud","subtitleKey":"digitalMarketing","descriptionKey":"marketingCloudDesc","color":"from-green-500 to-emerald-600","bgColor":"bg-green-50","link":"/products/marketing-cloud","gradient":"from-green-400 to-emerald-400","iconName":"Zap"},
    {"titleKey":"commerceCloud","subtitleKey":"eCommerce","descriptionKey":"commerceCloudDesc","color":"from-orange-500 to-red-500","bgColor":"bg-orange-50","link":"/products/commerce-cloud","gradient":"from-orange-400 to-red-400","iconName":"Shield"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('homepage', 'features', '[
    {"titleKey":"lightningFast","descriptionKey":"lightningFastDesc","iconName":"Zap"},
    {"titleKey":"enterpriseSecurity","descriptionKey":"enterpriseSecurityDesc","iconName":"Shield"},
    {"titleKey":"globalScale","descriptionKey":"globalScaleDesc","iconName":"Globe"},
    {"titleKey":"awardWinning","descriptionKey":"awardWinningDesc","iconName":"Award"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('homepage', 'trusted_brands', '["Spotify","Toyota","Adobe","IBM","Amazon Web Services","Cisco","Spotify","Toyota","Adobe","IBM","Amazon Web Services","Cisco"]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('homepage', 'stats', '[
    {"value":"150K+","labelKey":"companiesTrustUs"},
    {"value":"99.9%","labelKey":"uptimeSLA"},
    {"value":"40M+","labelKey":"activeUsers"},
    {"value":"60+","labelKey":"countries"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('about', 'leadership_team', '[
    {"name":"Alex Johnson","role":"CEO","bio":"Former VP at leading tech companies with 20+ years experience."},
    {"name":"Maria Chen","role":"CTO","bio":"Pioneered cloud infrastructure at major providers."},
    {"name":"David Park","role":"CFO","bio":"Finance leader with deep SaaS expertise."},
    {"name":"Sarah Williams","role":"CMO","bio":"Brand builder with global marketing experience."}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('about', 'milestones', '[
    {"year":"2010","eventKey":"milestone2010"},
    {"year":"2014","eventKey":"milestone2014"},
    {"year":"2018","eventKey":"milestone2018"},
    {"year":"2022","eventKey":"milestone2022"},
    {"year":"2026","eventKey":"milestone2026"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('about', 'values', '[
    {"titleKey":"valueCustomerSuccess","descriptionKey":"valueCustomerSuccessDesc","iconName":"Users"},
    {"titleKey":"valueTrustSecurity","descriptionKey":"valueTrustSecurityDesc","iconName":"Globe"},
    {"titleKey":"valueEquality","descriptionKey":"valueEqualityDesc","iconName":"Heart"},
    {"titleKey":"valueInnovation","descriptionKey":"valueInnovationDesc","iconName":"Award"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('products', 'products_list', '[
    {"id":"sales-cloud","titleKey":"salesCloud","subtitleKey":"crmPlatform","descriptionKey":"productsSalesCloudDesc","features":["Lead & Opportunity Management","Sales Forecasting & Analytics","Workflow Automation","Mobile CRM Access","Contact & Account Management","Email Integration"],"ctaKey":"startSellingSmarter","color":"from-blue-500 to-blue-700","iconName":"Users"},
    {"id":"service-cloud","titleKey":"serviceCloud","subtitleKey":"customerServiceLabel","descriptionKey":"productsServiceCloudDesc","features":["Omnichannel Support","Case Management","Knowledge Base","AI-Powered Chatbots","Service Analytics","Field Service Management"],"ctaKey":"transformService","color":"from-cyan-500 to-teal-600","iconName":"BarChart3"},
    {"id":"marketing-cloud","titleKey":"marketingCloud","subtitleKey":"digitalMarketingLabel","descriptionKey":"productsMarketingCloudDesc","features":["Email Marketing","Journey Builder","Social Media Marketing","Advertising Studio","Data Studio","Content Management"],"ctaKey":"startMarketingSmarter","color":"from-green-500 to-emerald-600","iconName":"Zap"},
    {"id":"commerce-cloud","titleKey":"commerceCloud","subtitleKey":"eCommerceLabel","descriptionKey":"productsCommerceCloudDesc","features":["B2C Commerce","B2B Commerce","Order Management","AI-Powered Search","Headless Commerce","Marketplace Integration"],"ctaKey":"launchStore","color":"from-orange-500 to-red-500","iconName":"ShoppingCart"},
    {"id":"data-cloud","titleKey":"dataCloud","subtitleKey":"dataPlatform","descriptionKey":"productsDataCloudDesc","features":["Real-Time Data Activation","Customer 360 Profiles","Data Harmonization","AI-Powered Insights","Privacy & Compliance","Data Streams"],"ctaKey":"unlockData","color":"from-indigo-500 to-purple-600","iconName":"Cloud"},
    {"id":"platform-cloud","titleKey":"platformCloud","subtitleKey":"adminAutomation","descriptionKey":"productsPlatformCloudDesc","features":["Custom Objects & Layouts","Flow Automation","Roles & Permission Sets","Integration Hub","Audit Trail","Data Quality Rules"],"ctaKey":"buildPlatform","color":"from-slate-600 to-cyan-600","iconName":"Shield"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('solutions', 'solutions_list', '[
    {"id":"small-business","titleKey":"smallBusiness","subtitleKey":"growFaster","descriptionKey":"smallBizDesc","features":["Contact & Lead Management","Email Templates & Tracking","Mobile App Access","Reports & Dashboards","Task & Activity Management","Basic Automation"],"benefits":["Close deals faster","Build lasting relationships","Scale operations easily","Affordable pricing"],"iconName":"Building2"},
    {"id":"enterprise","titleKey":"enterprise","subtitleKey":"scaleOperations","descriptionKey":"enterpriseSolutionDesc","features":["Advanced Security & Compliance","Custom Development","API Access","Advanced Analytics","Multi-org Management","Dedicated Support"],"benefits":["Unlimited customization","Enterprise-grade security","Global scalability","24/7 premium support"],"iconName":"TrendingUp"},
    {"id":"startups","titleKey":"startups","subtitleKey":"launchStrong","descriptionKey":"startupsDesc","features":["Startup Pricing Programs","Fast Implementation","Scalable Infrastructure","Investor Reporting","Growth Analytics","Integration Ecosystem"],"benefits":["Launch quickly","Scale without limits","Attract investors","Build from day one"],"iconName":"Sparkles"},
    {"id":"nonprofits","titleKey":"nonprofits","subtitleKey":"amplifyImpact","descriptionKey":"nonprofitsDesc","features":["Donor Management","Volunteer Coordination","Program Tracking","Grant Management","Impact Measurement","Special Nonprofit Pricing"],"benefits":["Increase donations","Engage volunteers","Track impact","Special discounts"],"iconName":"Heart"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('industries', 'industries_list', '[
    {"id":"healthcare","titleKey":"healthcare","subtitleKey":"patientEngagement","descriptionKey":"healthcareDesc","features":["Patient 360 View","Appointment Management","Care Coordination","HIPAA Compliance","Telemedicine Integration","Patient Portal"],"stats":[{"label":"Healthcare providers","value":"10K+"},{"label":"Patient satisfaction increase","value":"32%"}],"iconName":"Heart"},
    {"id":"education","titleKey":"education","subtitleKey":"studentSuccess","descriptionKey":"educationDesc","features":["Student Recruitment","Admissions Management","Student Success Tracking","Alumni Relations","Faculty Collaboration","Financial Aid"],"stats":[{"label":"Universities","value":"5,000+"},{"label":"Students reached","value":"50M+"}],"iconName":"GraduationCap"},
    {"id":"financial-services","titleKey":"financialServices","subtitleKey":"clientRelationships","descriptionKey":"financialDesc","features":["Client 360 View","Wealth Management","Loan Origination","Compliance & Security","Lead Generation","Portfolio Analytics"],"stats":[{"label":"Financial institutions","value":"8,000+"},{"label":"Assets managed","value":"$10T+"}],"iconName":"Landmark"},
    {"id":"retail","titleKey":"retail","subtitleKey":"customerExperience","descriptionKey":"retailDesc","features":["Unified Commerce","Customer Loyalty","Inventory Management","Personalization","Omnichannel Support","Demand Forecasting"],"stats":[{"label":"Retailers","value":"25K+"},{"label":"Increase in repeat customers","value":"45%"}],"iconName":"ShoppingCart"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('pricing', 'pricing_plans', '[
    {"nameKey":"essentials","price":25,"periodKey":"perUserMonth","descriptionKey":"essentialsDesc","featureKeys":["contactLeadMgmt","opportunityTracking","mobileApp","emailIntegration","reportsDashboards","fiveCustomObjects"],"ctaKey":"startFreeTrial","popular":false},
    {"nameKey":"professional","price":75,"periodKey":"perUserMonth","descriptionKey":"professionalDesc","featureKeys":["everythingInEssentials","workflowAutomation","salesForecasting","customReports","twentyFiveCustomObjects","apiAccess","collaborationTools"],"ctaKey":"startFreeTrial","popular":true},
    {"nameKey":"enterprise","price":150,"periodKey":"perUserMonth","descriptionKey":"enterpriseDesc","featureKeys":["everythingInProfessional","advancedSecurity","unlimitedCustomization","enterpriseAnalytics","unlimitedCustomObjects","prioritySupport","advancedIntegrations"],"ctaKey":"contactSales","popular":false}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('pricing', 'faqs', '[
    {"questionKey":"faq1Q","answerKey":"faq1A"},
    {"questionKey":"faq2Q","answerKey":"faq2A"},
    {"questionKey":"faq3Q","answerKey":"faq3A"},
    {"questionKey":"faq4Q","answerKey":"faq4A"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('learning', 'learning_items', '[
    {"id":"trailhead","titleKey":"trailhead","subtitleKey":"freeLearningPaths","descriptionKey":"trailheadDesc","features":["Interactive Modules","Hands-on Projects","Skill Assessments","Gamified Learning","Community Support","Career Paths"],"iconName":"BookOpen"},
    {"id":"certifications","titleKey":"certifications","subtitleKey":"getCertified","descriptionKey":"certDesc","features":["Administrator Certification","Developer Certification","Architect Certification","Consultant Certifications","Practice Exams","Study Groups"],"iconName":"Award"},
    {"id":"webinars","titleKey":"webinars","subtitleKey":"liveSessions","descriptionKey":"webinarsDesc","features":["Product Demos","Customer Success Stories","Industry Insights","Roadmap Previews","Q&A Sessions","On-Demand Library"],"iconName":"PlayCircle"},
    {"id":"documentation","titleKey":"documentation","subtitleKey":"technicalDocs","descriptionKey":"docsDesc","features":["API Reference","Developer Guides","Admin Guides","Release Notes","Implementation Guides","Troubleshooting"],"iconName":"FileText"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('learning', 'trails', '[
    {"name":"Admin Beginner","modules":12,"hours":8,"level":"Beginner"},
    {"name":"Developer Basics","modules":15,"hours":12,"level":"Beginner"},
    {"name":"Data Architecture","modules":8,"hours":6,"level":"Intermediate"},
    {"name":"AI & Machine Learning","modules":10,"hours":10,"level":"Advanced"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('stories', 'customer_stories', '[
    {"id":"techcorp","nameKey":"techcorp","industryKey":"technology","logo":"TC","quoteKey":"techcorpQuote","results":[{"label":"Pipeline increase","value":"150%"},{"label":"Sales cycle","value":"-40%"},{"label":"User adoption","value":"95%"}],"challengeKey":"techcorpChallenge","solutionKey":"techcorpSolution"},
    {"id":"globalretail","nameKey":"globalRetail","industryKey":"retailIndustry","logo":"GR","quoteKey":"globalRetailQuote","results":[{"label":"Email open rate","value":"+65%"},{"label":"Customer retention","value":"+32%"},{"label":"Revenue per user","value":"+28%"}],"challengeKey":"globalRetailChallenge","solutionKey":"globalRetailSolution"},
    {"id":"healthfirst","nameKey":"healthFirst","industryKey":"healthcareIndustry","logo":"HF","quoteKey":"healthFirstQuote","results":[{"label":"Patient satisfaction","value":"+45%"},{"label":"Response time","value":"-60%"},{"label":"Agent productivity","value":"+70%"}],"challengeKey":"healthFirstChallenge","solutionKey":"healthFirstSolution"},
    {"id":"financetech","nameKey":"financeTech","industryKey":"financialIndustry","logo":"FT","quoteKey":"financeTechQuote","results":[{"label":"AUM growth","value":"+80%"},{"label":"Client retention","value":"+25%"},{"label":"Advisor efficiency","value":"+50%"}],"challengeKey":"financeTechChallenge","solutionKey":"financeTechSolution"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;
