// app/about/careers/page.js
import AboutInfoLayout from "@/components/about/AboutInfoLayout";
import { Briefcase, Globe, Rocket, Lightbulb, Users, Award, Zap, TrendingUp, Calendar, Heart } from "lucide-react";

export default function CareersPage() {
  const openRoles = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / Nairobi",
      type: "Full-time",
      experience: "3+ years",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Nairobi Hub",
      type: "Full-time",
      experience: "2+ years",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Logistics Manager",
      department: "Operations",
      location: "Mombasa",
      type: "Full-time",
      experience: "4+ years",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Business Development Lead",
      department: "Growth",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / Nairobi",
      type: "Full-time",
      experience: "3+ years",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "Nairobi Hub",
      type: "Full-time",
      experience: "2+ years",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const benefits = [
    { icon: <Globe />, title: "Remote-First", description: "Work from anywhere in Kenya" },
    { icon: <Rocket />, title: "Growth Opportunities", description: "Clear career progression paths" },
    { icon: <Award />, title: "Competitive Salary", description: "Above-market compensation packages" },
    { icon: <Heart />, title: "Health & Wellness", description: "Comprehensive medical coverage" },
    { icon: <Calendar />, title: "Flexible Hours", description: "Balance work and life your way" },
    { icon: <TrendingUp />, title: "Equity Options", description: "Own a piece of what you build" },
  ];

  const values = [
    { title: "Customer Obsession", description: "We start with the customer and work backward" },
    { title: "Innovation", description: "We embrace new ideas and calculated risks" },
    { title: "Ownership", description: "We act on behalf of the entire company" },
    { title: "Inclusion", description: "We celebrate diverse perspectives" },
  ];

  return (
    <AboutInfoLayout
      title="Careers at Nyle"
      subtitle="Join a team shaping the next generation of commerce in Africa."
    >
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-100 rounded-full blur-2xl opacity-50"></div>
        
        <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Briefcase className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Build Africa's Commerce Future</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At Nyle, we don't just build products — we build possibilities. We're engineers, designers, and visionaries solving real problems with global impact, right here in Africa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Zap className="text-blue-600" />
          Our Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl p-5 border border-blue-100 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Award className="text-blue-600" />
          Why Join Nyle?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="group bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="text-blue-600">{benefit.icon}</div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Roles Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <Briefcase className="text-blue-600" />
              Open Roles
            </h3>
            <p className="text-gray-600 text-sm mt-1">Join our growing team of innovators</p>
          </div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {openRoles.length} positions
          </span>
        </div>

        <div className="space-y-4">
          {openRoles.map((role, index) => (
            <div key={index} className="group bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center flex-shrink-0`}>
                        <Briefcase className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">
                          {role.title}
                        </h4>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            <Users size={14} />
                            {role.department}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            <Globe size={14} />
                            {role.location}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            📅 {role.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-3">
                    <span className="text-sm text-gray-600">Experience: {role.experience}</span>
                    <a
                      href={`/careers/apply/${role.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105 group/btn"
                    >
                      Apply Now
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Culture Section */}
      <div className="mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="text-white" size={28} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Culture</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We believe in building a workplace where everyone can thrive. Our culture is built on trust, transparency, and the freedom to do your best work.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-700">50+</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-700">12</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-700">4.8</div>
              <div className="text-sm text-gray-600">Team Rating</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-700">95%</div>
              <div className="text-sm text-gray-600">Retention</div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Application Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Apply", description: "Submit your application" },
            { step: "2", title: "Screen", description: "Initial interview with HR" },
            { step: "3", title: "Technical", description: "Skills assessment" },
            { step: "4", title: "Offer", description: "Welcome to Nyle!" },
          ].map((item, index) => (
            <div key={index} className="relative">
              {index < 3 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-blue-200 -translate-x-1/2"></div>
              )}
              <div className="bg-white rounded-xl p-6 border border-blue-100 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Shape Africa's Future?</h3>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join us in building the next generation of commerce platforms that empower businesses across Africa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/careers/apply"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
          >
            View All Open Roles
            <Rocket className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/careers/internships"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
          >
            Explore Internships
          </a>
        </div>
        <p className="text-sm text-blue-200 mt-6">
          Questions? Email us at <a href="mailto:careers@nyle.com" className="underline hover:text-white">careers@nyle.com</a>
        </p>
      </div>
    </AboutInfoLayout>
  );
}