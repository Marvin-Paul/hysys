import { Link, useParams } from 'react-router-dom';
import { Users, BarChart3, Shield, Zap, Cloud, ShoppingCart, ArrowRight, CheckCircle, Play } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const productData: Record<string, { icon: LucideIcon; title: string; subtitle: string; description: string; features: string[]; cta: string; color: string }> = {
  'sales-cloud': { icon: Users, title: 'Sales Cloud', subtitle: 'CRM Platform', description: 'Drive revenue growth with the world\'s #1 CRM. Sales Cloud helps your team close more deals, accelerate productivity, and build lasting customer relationships with AI-powered insights.', features: ['Lead & Opportunity Management', 'Sales Forecasting & Analytics', 'Workflow Automation', 'Mobile CRM Access', 'Contact & Account Management', 'Email Integration'], cta: 'Start Selling Smarter', color: 'from-blue-500 to-blue-700' },
  'service-cloud': { icon: BarChart3, title: 'Service Cloud', subtitle: 'Customer Service', description: 'Deliver exceptional customer service with a unified platform. Service Cloud connects your support team across channels and empowers them with AI-powered recommendations.', features: ['Omnichannel Support', 'Case Management', 'Knowledge Base', 'AI-Powered Chatbots', 'Service Analytics', 'Field Service Management'], cta: 'Transform Your Service', color: 'from-cyan-500 to-teal-600' },
  'marketing-cloud': { icon: Zap, title: 'Marketing Cloud', subtitle: 'Digital Marketing', description: 'Create personalized customer journeys across every channel. Marketing Cloud helps you connect with customers in new ways, delivering the right message every time.', features: ['Email Marketing', 'Journey Builder', 'Social Media Marketing', 'Advertising Studio', 'Data Studio', 'Content Management'], cta: 'Start Marketing Smarter', color: 'from-green-500 to-emerald-600' },
  'commerce-cloud': { icon: ShoppingCart, title: 'Commerce Cloud', subtitle: 'E-Commerce', description: 'Build seamless shopping experiences across digital and physical channels. Commerce Cloud helps you convert browsers into buyers with AI-powered personalization.', features: ['B2C Commerce', 'B2B Commerce', 'Order Management', 'AI-Powered Search', 'Headless Commerce', 'Marketplace Integration'], cta: 'Launch Your Store', color: 'from-orange-500 to-red-500' },
  'data-cloud': { icon: Cloud, title: 'Data Cloud', subtitle: 'Data Platform', description: 'Unify your customer data across all sources. Data Cloud provides real-time insights and enables hyper-personalized experiences with a complete view of every customer.', features: ['Real-Time Data Activation', 'Customer 360 Profiles', 'Data Harmonization', 'AI-Powered Insights', 'Privacy & Compliance', 'Data Streams'], cta: 'Unlock Your Data', color: 'from-indigo-500 to-purple-600' },
  'platform-cloud': { icon: Shield, title: 'Platform Cloud', subtitle: 'Admin & Automation', description: 'Configure custom objects, secure access, automate workflows, connect external systems, and govern CRM data from one administration layer.', features: ['Custom Objects & Layouts', 'Flow Automation', 'Roles & Permission Sets', 'Integration Hub', 'Audit Trail', 'Data Quality Rules'], cta: 'Build Your Platform', color: 'from-slate-600 to-cyan-600' }
};

export function ProductsPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Cloud Products</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Everything you need to connect with customers, automate processes, and grow your business.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(productData).map(([key, product]) => (
              <Link key={key} to={`/products/${key}`} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{product.subtitle}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5394]">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = productData[productId || ''];

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-[#0b5394] hover:underline">View all products</Link>
        </div>
      </div>
    );
  }

  const Icon = product.icon;

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-2">{product.subtitle}</div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">{product.title}</h1>
              <p className="text-xl text-white/80 mb-8">{product.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-xl font-semibold hover:bg-gray-50 transition-all hover:shadow-xl">
                  {product.cta} <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/30">
                  <Play className="w-5 h-5" /> Watch Demo
                </button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className={`w-64 h-64 rounded-3xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-2xl`}>
                <Icon className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-6 h-6 rounded-full bg-[#0b5394] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of companies using {product.title}.</p>
          <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0b5394] text-white rounded-xl font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}



