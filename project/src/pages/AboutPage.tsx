import { Link } from 'react-router-dom';
import { Users, Award, Globe, Heart, ArrowRight } from 'lucide-react';

const leadership = [
  { name: 'Alex Johnson', role: 'CEO', bio: 'Former VP at leading tech companies with 20+ years experience.' },
  { name: 'Maria Chen', role: 'CTO', bio: 'Pioneered cloud infrastructure at major providers.' },
  { name: 'David Park', role: 'CFO', bio: 'Finance leader with deep SaaS expertise.' },
  { name: 'Sarah Williams', role: 'CMO', bio: 'Brand builder with global marketing experience.' },
];

const values = [
  { icon: Users, title: 'Customer Success', description: 'Our customers\' success is our success. Everything we do is focused on helping them thrive.' },
  { icon: Globe, title: 'Trust & Security', description: 'We earn and maintain trust through transparency, security, and ethical practices.' },
  { icon: Heart, title: 'Equality', description: 'We believe in equality for all and are committed to building a more inclusive world.' },
  { icon: Award, title: 'Innovation', description: 'We continuously push boundaries to deliver cutting-edge solutions.' },
];

const milestones = [
  { year: '2010', event: 'HYSYS GLOBAL SOLUTIONS LIMITED founded' },
  { year: '2014', event: 'Reached 1 million users' },
  { year: '2018', event: 'Launched AI Platform' },
  { year: '2022', event: '100,000+ customers worldwide' },
  { year: '2026', event: 'Continued global expansion' },
];

export function AboutPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About HYSYS GLOBAL SOLUTIONS LIMITED</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">We believe business is the greatest platform for change and are committed to helping companies connect with customers in a whole new way.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                HYSYS GLOBAL SOLUTIONS LIMITED is dedicated to empowering businesses of all sizes to connect with their customers in meaningful ways. We believe that when companies have the right tools, they can transform industries and improve lives.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Founded on the principle that customer relationships are the heart of every successful business, we've grown to become the world's leading CRM platform, serving over 150,000 companies globally.
              </p>
              <Link to="/signup" className="inline-flex items-center gap-2 text-[#0b5394] font-semibold hover:underline">
                Join our journey <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0b5394] to-[#00a3e0] rounded-2xl p-8 text-white">
                <div className="text-5xl font-bold mb-2">150K+</div>
                <div className="text-white/80 mb-8">Companies trust HYSYS GLOBAL SOLUTIONS LIMITED</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4"><div className="text-2xl font-bold">40M+</div><div className="text-sm text-white/80">Users</div></div>
                  <div className="bg-white/10 rounded-lg p-4"><div className="text-2xl font-bold">60+</div><div className="text-sm text-white/80">Countries</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, idx) => (
              <div key={idx} className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-gray-900">{leader.name}</h3>
                <p className="text-[#0b5394] font-medium text-sm mb-2">{leader.role}</p>
                <p className="text-gray-600 text-sm">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#0b5394]" />
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-6 pl-4">
                  <div className="w-3 h-3 rounded-full bg-[#0b5394] -ml-1.5 mt-1.5 z-10" />
                  <div>
                    <div className="text-sm font-semibold text-[#0b5394]">{milestone.year}</div>
                    <div className="font-medium text-gray-900">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#032d60] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg text-white/80 mb-8">We're always looking for talented people who share our passion for helping businesses succeed.</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-xl font-semibold hover:bg-gray-50 transition-all">
            View Open Positions <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

