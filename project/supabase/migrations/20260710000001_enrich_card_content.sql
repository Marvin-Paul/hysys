-- Enrich CMS card content with images and missing industry entries
UPDATE public.site_content
SET content_value = '[
  {"titleKey":"salesCloud","subtitleKey":"crmPlatform","descriptionKey":"salesCloudDesc","color":"from-blue-500 to-blue-700","bgColor":"bg-blue-50","link":"/products/sales-cloud","gradient":"from-blue-400 to-cyan-400","iconName":"Users","image":"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"},
  {"titleKey":"serviceCloud","subtitleKey":"customerService","descriptionKey":"serviceCloudDesc","color":"from-cyan-500 to-teal-600","bgColor":"bg-cyan-50","link":"/products/service-cloud","gradient":"from-cyan-400 to-teal-400","iconName":"BarChart3","image":"https://images.unsplash.com/photo-1556745753-b2902792b2fc?auto=format&fit=crop&w=800&q=80"},
  {"titleKey":"marketingCloud","subtitleKey":"digitalMarketing","descriptionKey":"marketingCloudDesc","color":"from-green-500 to-emerald-600","bgColor":"bg-green-50","link":"/products/marketing-cloud","gradient":"from-green-400 to-emerald-400","iconName":"Zap","image":"https://images.unsplash.com/photo-1533750349088-c74787156e0c?auto=format&fit=crop&w=800&q=80"},
  {"titleKey":"commerceCloud","subtitleKey":"eCommerce","descriptionKey":"commerceCloudDesc","color":"from-orange-500 to-red-500","bgColor":"bg-orange-50","link":"/products/commerce-cloud","gradient":"from-orange-400 to-red-400","iconName":"Shield","image":"https://images.unsplash.com/photo-1557821552-171051766702?auto=format&fit=crop&w=800&q=80"}
]'::jsonb
WHERE section = 'homepage' AND content_key = 'product_cards';

UPDATE public.site_content
SET content_value = '[
  {"id":"techcorp","nameKey":"techcorp","industryKey":"technology","logo":"TC","quoteKey":"techcorpQuote","thumbnail":"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80","title":"VP of Sales","company":"TechCorp","results":[{"label":"Pipeline increase","value":"150%"},{"label":"Sales cycle","value":"-40%"},{"label":"User adoption","value":"95%"}],"challengeKey":"techcorpChallenge","solutionKey":"techcorpSolution"},
  {"id":"globalretail","nameKey":"globalRetail","industryKey":"retailIndustry","logo":"GR","quoteKey":"globalRetailQuote","thumbnail":"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80","title":"Chief Marketing Officer","company":"GlobalRetail","results":[{"label":"Email open rate","value":"+65%"},{"label":"Customer retention","value":"+32%"},{"label":"Revenue per user","value":"+28%"}],"challengeKey":"globalRetailChallenge","solutionKey":"globalRetailSolution"},
  {"id":"healthfirst","nameKey":"healthFirst","industryKey":"healthcareIndustry","logo":"HF","quoteKey":"healthFirstQuote","thumbnail":"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80","title":"Director of Patient Experience","company":"HealthFirst","results":[{"label":"Patient satisfaction","value":"+45%"},{"label":"Response time","value":"-60%"},{"label":"Agent productivity","value":"+70%"}],"challengeKey":"healthFirstChallenge","solutionKey":"healthFirstSolution"},
  {"id":"financetech","nameKey":"financeTech","industryKey":"financialIndustry","logo":"FT","quoteKey":"financeTechQuote","thumbnail":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80","title":"Head of Wealth Advisory","company":"FinanceTech","results":[{"label":"AUM growth","value":"+80%"},{"label":"Client retention","value":"+25%"},{"label":"Advisor efficiency","value":"+50%"}],"challengeKey":"financeTechChallenge","solutionKey":"financeTechSolution"}
]'::jsonb
WHERE section = 'stories' AND content_key = 'customer_stories';

UPDATE public.site_content
SET content_value = '[
  {"name":"Alex Johnson","role":"CEO & Co-Founder","bio":"Former VP at leading tech companies with 20+ years experience building enterprise platforms.","image":"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"},
  {"name":"Maria Chen","role":"Chief Technology Officer","bio":"Pioneered cloud infrastructure at major providers. Leads Marmidon engineering vision.","image":"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"},
  {"name":"David Park","role":"Chief Financial Officer","bio":"Finance leader with deep SaaS expertise and a track record of scaling companies globally.","image":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"},
  {"name":"Sarah Williams","role":"Chief Marketing Officer","bio":"Brand builder with global marketing experience across Africa and Europe.","image":"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"}
]'::jsonb
WHERE section = 'about' AND content_key = 'leadership_team';
