// app/about/know-nyle/page.js
import AboutInfoLayout from "@/components/about/AboutInfoLayout";
import { Target, Globe, Shield, Zap, Users, TrendingUp, Compass, Heart, Award, BarChart } from "lucide-react";

export default function KnowNylePage() {
  const milestones = [
    { year: "2020", title: "Founded", description: "Launched with a vision to transform African commerce" },
    { year: "2021", title: "First 1,000 Users", description: "Reached our first major milestone" },
    { year: "2022", title: "Series A Funding", description: "Secured $5M to expand operations" },
    { year: "2023", title: "National Launch", description: "Expanded to all Kenyan counties" },
    { year: "2024", title: "50K+ Users", description: "Become Kenya's fastest-growing marketplace" },
  ];

  const coreValues = [
    {
      icon: <Shield />,
      title: "Trust First",
      description: "Every transaction is backed by our guarantee",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Globe />,
      title: "Access for All",
      description: "Democratizing eCommerce across Africa",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap />,
      title: "Innovation",
      description: "Building tomorrow's commerce tools today",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users />,
      title: "Community",
      description: "Growing together, winning together",
      color: "from-orange-500 to-amber-500"
    },
  ];

  const impactStats = [
    { value: "50K+", label: "Businesses Empowered", icon: <Users /> },
    { value: "Ksh 2B+", label: "Trade Facilitated", icon: <TrendingUp /> },
    { value: "100+", label: "Cities Reached", icon: <Globe /> },
    { value: "98%", label: "Satisfaction Rate", icon: <Heart /> },
  ];

  const teamLeaders = [
    { name: "Sarah M.", role: "CEO & Founder", expertise: "Tech Entrepreneurship" },
    { name: "James K.", role: "CTO", expertise: "Platform Architecture" },
    { name: "Amina W.", role: "Head of Growth", expertise: "Market Expansion" },
    { name: "David L.", role: "Head of Trust", expertise: "Security & Compliance" },
  ];

  return (
    <AboutInfoLayout
      title="Know Nyle"
      subtitle="The future of African eCommerce — bold, trusted, and built for all."
    >
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Compass className="text-white" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision for Africa's Digital Economy</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Nyle is more than an online marketplace — it's a movement to empower
                  businesses, connect dreamers, and unlock digital trade across Africa.
                </p>
                <p>
                  From small startups to large suppliers, we provide a platform that
                  levels the playing field — giving everyone access to the same digital
                  tools, exposure, and opportunity.
                </p>
                <p>
                  Our mission is simple: build trust, expand access, and redefine what it
                  means to do business online in Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <BarChart className="text-blue-600" />
          Our Impact in Numbers
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((stat, index) => (
            <div key={index} className="group bg-white rounded-xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="text-blue-600">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Our Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50"></div>
              <div className="relative">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{value.icon}</div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To democratize eCommerce in Africa by building a trusted, accessible platform that empowers every business — from micro-entrepreneurs to established enterprises — to thrive in the digital economy.
          </p>
          <div className="mt-6 pt-6 border-t border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Zap size={16} />
              <span className="font-medium">Driving Digital Inclusion</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Compass className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To become Africa's most trusted commerce ecosystem — where every transaction builds prosperity, every connection creates opportunity, and technology serves as the great equalizer for businesses across the continent.
          </p>
          <div className="mt-6 pt-6 border-t border-purple-200">
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <Globe size={16} />
              <span className="font-medium">Building Africa's Digital Future</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Award className="text-blue-600" />
          Our Journey
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 transform -translate-x-1/2"></div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-6 transform -translate-x-1/2 md:translate-x-0 md:relative md:left-auto md:top-auto md:transform-none z-10">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className={`bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h4>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                {/* Spacer for even items */}
                <div className="hidden md:block md:w-2/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Leadership Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamLeaders.map((leader, index) => (
            <div key={index} className="group bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="text-blue-600" size={24} />
                </div>
                <h4 className="text-center font-bold text-gray-900 text-lg mb-1">{leader.name}</h4>
                <p className="text-center text-blue-600 font-medium mb-2">{leader.role}</p>
                <p className="text-center text-sm text-gray-600">{leader.expertise}</p>
                <div className="mt-4 pt-4 border-t border-blue-100 text-center">
                  <a href="#" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    View Profile
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Goals */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Where We're Going</h3>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            By 2025, we aim to expand to 5 new African countries, empower 500,000 businesses, 
            and become the continent's most trusted platform for digital commerce — 
            all while maintaining our commitment to accessibility and innovation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm text-blue-200">New Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">500K+</div>
              <div className="text-sm text-blue-200">Businesses Empowered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">#1</div>
              <div className="text-sm text-blue-200">Most Trusted Platform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Thought */}
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700 italic">
          "We're not just building a company — we're building a legacy of empowerment for Africa's digital future."
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <span>The Nyle Team</span>
        </div>
      </div>
    </AboutInfoLayout>
  );
}