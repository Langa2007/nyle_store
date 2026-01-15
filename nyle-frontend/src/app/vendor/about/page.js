"use client";

import { 
  Store, 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Globe,
  Shield,
  Heart,
  Zap,
  BarChart,
  Clock,
  DollarSign,
  Package,
  Truck,
  Smartphone,
  Building2,
  Star,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VendorAboutPage() {
  const [activeSection, setActiveSection] = useState("mission");

  const milestones = [
    { year: "2020", title: "Platform Launch", description: "Started with 50 pioneering vendors" },
    { year: "2021", title: "First 1000 Vendors", description: "Reached milestone of 1000 active sellers" },
    { year: "2022", title: "Mobile App Launch", description: "Released vendor mobile application" },
    { year: "2023", title: "Regional Expansion", description: "Expanded to East African market" },
    { year: "2024", title: "Premium Features", description: "Launched advanced vendor tools" }
  ];

  const teamMembers = [
    { name: "James Kariuki", role: "Vendor Success Lead", department: "Support" },
    { name: "Fatima Ali", role: "Account Manager", department: "Partnerships" },
    { name: "David Ochieng", role: "Technical Support", department: "Engineering" },
    { name: "Sarah Mwangi", role: "Business Development", department: "Growth" },
    { name: "Peter Kamau", role: "Security Specialist", department: "Security" },
    { name: "Lydia Njeri", role: "Training Coordinator", department: "Education" }
  ];

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: "Vendor Success", description: "Your growth is our priority" },
    { icon: <Shield className="w-6 h-6" />, title: "Trust & Security", description: "Protecting your business data" },
    { icon: <Zap className="w-6 h-6" />, title: "Innovation", description: "Continuous platform improvements" },
    { icon: <Users className="w-6 h-6" />, title: "Community", description: "Building seller networks" },
    { icon: <BarChart className="w-6 h-6" />, title: "Transparency", description: "Clear fees and policies" },
    { icon: <Globe className="w-6 h-6" />, title: "Inclusion", description: "Accessible to all businesses" }
  ];

  const stats = [
    { value: "15,000+", label: "Active Vendors", icon: <Store className="w-5 h-5" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <Star className="w-5 h-5" /> },
    { value: "Ksh 2.5B+", label: "Vendor Sales", icon: <DollarSign className="w-5 h-5" /> },
    { value: "24h", label: "Support Response", icon: <Clock className="w-5 h-5" /> }
  ];

  const benefits = [
    { icon: "📱", title: "Mobile Management", description: "Manage your store on the go" },
    { icon: "📊", title: "Advanced Analytics", description: "Real-time sales insights" },
    { icon: "🚚", title: "Logistics Support", description: "Integrated shipping solutions" },
    { icon: "💳", title: "Secure Payments", description: "Multiple payment options" },
    { icon: "🎓", title: "Free Training", description: "Seller education programs" },
    { icon: "⭐", title: "Premium Features", description: "Growth tools for success" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Building2 className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-2">About Nyle Vendor</h1>
                <p className="text-xl text-blue-200">Empowering Kenyan Businesses Since 2020</p>
              </div>
            </div>
            
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              We're on a mission to democratize e-commerce in Kenya by providing entrepreneurs 
              and businesses with the tools they need to succeed in the digital marketplace.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                href="/vendor/signup" 
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Rocket className="inline w-5 h-5 mr-2" />
                Join Our Community
              </Link>
              <Link 
                href="/vendor/success-stories" 
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition"
              >
                View Success Stories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveSection("mission")}
              className={`px-6 py-3 rounded-xl font-medium transition ${activeSection === "mission" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveSection("values")}
              className={`px-6 py-3 rounded-xl font-medium transition ${activeSection === "values" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Our Values
            </button>
            <button
              onClick={() => setActiveSection("team")}
              className={`px-6 py-3 rounded-xl font-medium transition ${activeSection === "team" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Our Team
            </button>
            <button
              onClick={() => setActiveSection("benefits")}
              className={`px-6 py-3 rounded-xl font-medium transition ${activeSection === "benefits" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Vendor Benefits
            </button>
            <button
              onClick={() => setActiveSection("milestones")}
              className={`px-6 py 3 rounded-xl font-medium transition ${activeSection === "milestones" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Milestones
            </button>
          </div>

          {/* Content Sections */}
          {activeSection === "mission" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission & Vision</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Mission</h3>
                      <p className="text-gray-700 leading-relaxed">
                        To empower every Kenyan entrepreneur and business with accessible, powerful, 
                        and affordable e-commerce tools that enable them to reach customers nationwide 
                        and build sustainable digital businesses.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What We Do</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Provide intuitive e-commerce platform for vendors</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Offer training and resources for digital growth</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Create secure payment and logistics solutions</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Build supportive vendor community networks</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Vision</h3>
                      <p className="text-gray-700 leading-relaxed">
                        To become East Africa's leading digital marketplace where any business, 
                        regardless of size or location, can thrive in the digital economy, 
                        contributing to economic growth and technological advancement in the region.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Our Impact</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="font-medium">Economic Growth</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Helping vendors achieve an average 300% sales growth within first year
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="w-5 h-5 text-purple-600" />
                          <span className="font-medium">Digital Inclusion</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Enabling businesses from rural areas to access national markets
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "values" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Core Values</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="group bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform">
                        <div className="text-blue-600">{value.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "team" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Vendor Success Team</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-blue-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{member.department}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Need Personalized Assistance?</h3>
                      <p className="text-blue-100">
                        Our dedicated vendor success team is here to help you grow your business.
                      </p>
                    </div>
                    <a 
                      href="/vendor/support" 
                      className="px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition flex items-center gap-2"
                    >
                      Contact Your Account Manager
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "benefits" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Nyle Vendor?</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="group p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition">
                      <div className="text-3xl mb-3">{benefit.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                {/* Comparison */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Comparison</h3>
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-700 mb-1">0%</div>
                      <div className="text-sm text-gray-600">Setup Fee</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700 mb-1">8%</div>
                      <div className="text-sm text-gray-600">Commission (Lowest)</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700 mb-1">∞</div>
                      <div className="text-sm text-gray-600">Product Listings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700 mb-1">24/7</div>
                      <div className="text-sm text-gray-600">Support Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "milestones" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Journey</h2>
                
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform md:-translate-x-1/2"></div>
                  
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-12' : 'md:pl-1/2 md:pr-12'}`}>
                      <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white transform md:-translate-x-1/2 -translate-x-3"></div>
                      
                      <div className="ml-12 md:ml-0">
                        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="font-bold text-blue-700">{milestone.year}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow With Us?</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
            Join thousands of successful vendors who trust Nyle for their business growth
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/vendor/signup" 
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Rocket className="inline mr-3 h-6 w-6" />
              Start Your Journey
            </Link>
            <Link 
              href="/vendor/contact" 
              className="px-10 py-4 bg-white/20 backdrop-blur-lg text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all"
            >
              Schedule a Meeting
            </Link>
          </div>
          
          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-blue-300" />
                <div>
                  <div className="text-sm text-blue-300">Call Us</div>
                  <div className="font-medium">+254 704 521408</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 text-blue-300" />
                <div>
                  <div className="text-sm text-blue-300">Email</div>
                  <div className="font-medium">vendors@nyle.co.ke</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-5 h-5 text-blue-300" />
                <div>
                  <div className="text-sm text-blue-300">Location</div>
                  <div className="font-medium">Nairobi, Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}