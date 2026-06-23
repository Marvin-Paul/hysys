import { Link, useParams } from 'react-router-dom';
import { BookOpen, Award, PlayCircle, FileText, ArrowRight, Clock, Star, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const learningData: Record<string, { icon: LucideIcon; title: string; subtitle: string; description: string; features: string[] }> = {
  'trailhead': { icon: BookOpen, title: 'Trailhead', subtitle: 'Free learning paths', description: 'Learn in-demand skills with fun, interactive modules. Trailhead provides guided learning paths for every role and skill level.', features: ['Interactive Modules', 'Hands-on Projects', 'Skill Assessments', 'Gamified Learning', 'Community Support', 'Career Paths'] },
  'certifications': { icon: Award, title: 'Certifications', subtitle: 'Get certified', description: 'Validate your expertise with industry-recognized certifications. CloudForce certifications demonstrate your skills and advance your career.', features: ['Administrator Certification', 'Developer Certification', 'Architect Certification', 'Consultant Certifications', 'Practice Exams', 'Study Groups'] },
  'webinars': { icon: PlayCircle, title: 'Webinars', subtitle: 'Live sessions', description: 'Join live sessions with product experts and industry leaders. Learn best practices, see demos, and get your questions answered.', features: ['Product Demos', 'Customer Success Stories', 'Industry Insights', 'Roadmap Previews', 'Q&A Sessions', 'On-Demand Library'] },
  'documentation': { icon: FileText, title: 'Documentation', subtitle: 'Technical docs', description: 'Comprehensive technical documentation for developers and admins. Find guides, API references, and best practices.', features: ['API Reference', 'Developer Guides', 'Admin Guides', 'Release Notes', 'Implementation Guides', 'Troubleshooting'] }
};

const trails = [
  { name: 'Admin Beginner', modules: 12, hours: 8, level: 'Beginner' },
  { name: 'Developer Basics', modules: 15, hours: 12, level: 'Beginner' },
  { name: 'Data Architecture', modules: 8, hours: 6, level: 'Intermediate' },
  { name: 'AI & Machine Learning', modules: 10, hours: 10, level: 'Advanced' },
];

export function LearningPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Learning & Resources</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Build skills, get certified, and connect with experts to master our platform.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(learningData).map(([key, item]) => (
              <Link key={key} to={`/learning/${key}`} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.subtitle}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5394]">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Learning Paths</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trails.map((trail, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">{trail.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {trail.modules} modules</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {trail.hours} hours</div>
                  <div className="flex items-center gap-2"><Star className="w-4 h-4" /> {trail.level}</div>
                </div>
                <button className="mt-4 w-full py-2 bg-[#0b5394] text-white rounded-lg text-sm font-medium hover:bg-[#032d60] transition-colors">
                  Start Trail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function LearningDetailPage() {
  const { learningId } = useParams<{ learningId: string }>();
  const item = learningData[learningId || ''];

  if (!item) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resource Not Found</h1>
          <Link to="/learning" className="text-[#0b5394] hover:underline">View all resources</Link>
        </div>
      </div>
    );
  }

  const Icon = item.icon;

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-2">{item.subtitle}</div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">{item.title}</h1>
              <p className="text-xl text-white/80 mb-8">{item.description}</p>
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-xl font-semibold hover:bg-gray-50 transition-all hover:shadow-xl">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                <Icon className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What You'll Experience</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {item.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <CheckCircle className="w-6 h-6 text-[#0b5394] flex-shrink-0" />
                <span className="font-medium text-gray-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


