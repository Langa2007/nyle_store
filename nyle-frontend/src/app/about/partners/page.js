// app/about/partner/page.js
import AboutInfoLayout from "@/components/about/AboutInfoLayout";
import { HandshakeIcon, Truck, CreditCard, Building, Globe, Shield, Users, Award, Zap, TrendingUp } from "lucide-react";

export default function PartnersPage() {
  // Partner categories - easily expandable
  const partnerCategories = [
    {
      id: "logistics",
      title: "Logistics & Delivery",
      description: "Nationwide and cross-border shipping partners",
      icon: <Truck />,
      color: "from-blue-500 to-cyan-500",
      partners: [
        { name: "SpeedPost Kenya", type: "Express Delivery", since: "2021" },
        { name: "Africa Logistics", type: "Cross-border", since: "2022" },
        { name: "Urban Delivery", type: "Last-mile", since: "2023" },
        { name: "Cargo Connect", type: "Bulk Shipping", since: "2022" },
      ]
    },
    {
      id: "payments",
      title: "Fintech & Payments",
      description: "Secure payment processing and financial services",
      icon: <CreditCard />,
      color: "from-purple-500 to-pink-500",
      partners: [
        { name: "M-Pesa", type: "Mobile Money", since: "2020" },
        { name: "Stripe Africa", type: "Card Processing", since: "2022" },
        { name: "Flutterwave", type: "Payment Gateway", since: "2021" },
        { name: "KCB Bank", type: "Banking Partner", since: "2023" },
      ]
    },
    {
      id: "technology",
      title: "Technology",
      description: "Cloud, security, and infrastructure partners",
      icon: <Zap />,
      color: "from-green-500 to-emerald-500",
      partners: [
        { name: "AWS Africa", type: "Cloud Infrastructure", since: "2021" },
        { name: "Twilio", type: "Communications", since: "2022" },
        { name: "Cloudflare", type: "Security & CDN", since: "2023" },
        { name: "Vercel", type: "Frontend Platform", since: "2023" },
      ]
    },
    {
      id: "enterprise",
      title: "Enterprise Solutions",
      description: "B2B and large-scale commerce partners",
      icon: <Building />,
      color: "from-orange-500 to-amber-500",
      partners: [
        { name: "Safaricom", type: "Telecommunications", since: "2022" },
        { name: "KPMG Africa", type: "Consulting", since: "2023" },
        { name: "Microsoft 4Afrika", type: "Tech Solutions", since: "2021" },
        { name: "Google Africa", type: "Digital Growth", since: "2023" },
      ]
    },
  ];

  // Partnership benefits - scalable array
  const partnershipBenefits = [
    { 
      icon: <Globe />, 
      title: "Extended Reach", 
      description: "Access to 50K+ active users across Africa",
      stat: "3x Growth"
    },
    { 
      icon: <Shield />, 
      title: "Enhanced Trust", 
      description: "Built-in verification and security features",
      stat: "99.9% Uptime"
    },
    { 
      icon: <TrendingUp />, 
      title: "Shared Growth", 
      description: "Revenue sharing and co-marketing opportunities",
      stat: "40% YoY"
    },
    { 
      icon: <Users />, 
      title: "Community Support", 
      description: "Dedicated partner success team",
      stat: "24/7 Support"
    },
  ];

  // Partnership levels - scalable for future tiers
  const partnershipLevels = [
    {
      level: "Platinum",
      description: "Strategic ecosystem partners",
      requirements: ["$1M+ Annual Revenue", "5+ Countries", "24/7 Support"],
      benefits: ["Revenue Sharing", "Co-branded Marketing", "API Priority Access", "Dedicated Manager"],
      color: "from-blue-600 to-cyan-600"
    },
    {
      level: "Gold",
      description: "Key integration partners",
      requirements: ["$500K+ Annual Revenue", "2+ Countries", "Business Hours Support"],
      benefits: ["Integration Support", "Joint Webinars", "Standard API Access", "Quarterly Reviews"],
      color: "from-purple-500 to-pink-500"
    },
    {
      level: "Silver",
      description: "Verified service partners",
      requirements: ["$100K+ Annual Revenue", "Local Operations", "Email Support"],
      benefits: ["Partner Directory", "Marketing Materials", "Basic API Access", "Monthly Updates"],
      color: "from-green-500 to-emerald-500"
    },
  ];

  // Success stories - easily add more
  const successStories = [
    {
      partner: "SpeedPost Kenya",
      metric: "300% increase in parcel volume",
      quote: "Partnering with Nyle transformed our last-mile delivery network.",
      author: "Jane M., CEO"
    },
    {
      partner: "Flutterwave",
      metric: "2M+ transactions processed monthly",
      quote: "Nyle's platform integration expanded our reach across East Africa.",
      author: "David K., Head of Partnerships"
    },
  ];

  return (
    <AboutInfoLayout
      title="Our Partners"
      subtitle="Together, we're building the backbone of African trade."
    >
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <HandshakeIcon className="text-white" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Building Africa's Commerce Ecosystem</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  We collaborate with logistics firms, fintech innovators, technology providers,
                  and local suppliers to make eCommerce accessible, fast, and transparent for everyone.
                </p>
                <p>
                  Our partnerships create a robust ecosystem where every player — from delivery
                  networks to payment processors — works together to empower African businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Benefits */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Why Partner With Nyle?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnershipBenefits.map((benefit, index) => (
            <div key={index} className="group bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all p-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="text-blue-600">{benefit.icon}</div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 text-lg">{benefit.title}</h4>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {benefit.stat}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Categories */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Our Partner Network</h3>
        <div className="space-y-8">
          {partnerCategories.map((category, index) => (
            <div key={category.id} className="bg-white rounded-2xl border border-blue-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6 border-b border-blue-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                    <div className="text-white">{category.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">{category.title}</h4>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {category.partners.length} Partners
                  </span>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-blue-50/50 to-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.partners.map((partner, partnerIndex) => (
                    <div key={partnerIndex} className="bg-white rounded-xl p-4 border border-blue-100 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="font-bold text-gray-900">{partner.name}</h5>
                          <p className="text-sm text-gray-600">{partner.type}</p>
                        </div>
                        <Award className="text-amber-500" size={20} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Partner since</span>
                        <span className="font-medium text-blue-600">{partner.since}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Levels */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Partnership Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnershipLevels.map((tier, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl border border-blue-100 hover:shadow-2xl transition-all">
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-5`}></div>
              <div className="relative p-8">
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${tier.color} mb-4`}>
                    <Award className="text-white" size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">{tier.level}</h4>
                  <p className="text-gray-600 mt-2">{tier.description}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-gray-900 mb-3">Requirements</h5>
                    <ul className="space-y-2">
                      {tier.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-900 mb-3">Benefits</h5>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="text-green-500" size={16} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={`/partner/apply?tier=${tier.level.toLowerCase()}`}
                  className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r ${tier.color} hover:shadow-xl transition-all hover:scale-105`}
                >
                  Apply for {tier.level}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Partner Success Stories</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="font-bold text-gray-900 text-lg">{story.partner}</h4>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {story.metric}
                    </span>
                  </div>
                  <blockquote className="text-gray-700 italic border-l-4 border-blue-400 pl-4 py-2 mb-4">
                    "{story.quote}"
                  </blockquote>
                  <div className="text-sm text-gray-600">
                    — {story.author}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl overflow-hidden">
        <div className="p-10 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Join Our Growing Partner Ecosystem</h3>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Whether you're a logistics provider, payment processor, technology company,
              or enterprise solution — there's a place for you in Africa's commerce revolution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/partner/apply"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
              >
                <HandshakeIcon size={20} />
                Become a Partner
              </a>
              <a
                href="/partner/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
              >
                Contact Partnership Team
              </a>
            </div>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-blue-200">Active Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-blue-200">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-blue-200">Satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold">3 Years</div>
                <div className="text-sm text-blue-200">Average Partnership</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              question: "How long does the partner onboarding process take?",
              answer: "Typically 2-4 weeks depending on integration complexity. Platinum partners receive expedited onboarding."
            },
            {
              question: "Is there a cost to become a partner?",
              answer: "There are no upfront fees. Revenue sharing begins after reaching minimum transaction thresholds."
            },
            {
              question: "What support is provided to partners?",
              answer: "All partners receive technical documentation, API access, and dedicated support based on their tier."
            },
            {
              question: "Can partners access Nyle's user data?",
              answer: "Partners only receive anonymized, aggregated data as per our privacy policy and partnership agreements."
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-blue-100 p-6 hover:border-blue-300 transition-colors">
              <h4 className="font-bold text-gray-900 mb-3">{faq.question}</h4>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </AboutInfoLayout>
  );
}

// Helper component for check marks
function CheckCircle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}