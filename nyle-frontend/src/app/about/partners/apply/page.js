// app/partner/apply/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AboutInfoLayout from "@/components/about/AboutInfoLayout";
import {
  HandshakeIcon, Building, User, Mail, Phone, Globe,
  MapPin, Briefcase, FileText, CheckCircle, AlertCircle,
  Upload, Users, DollarSign, Package, Truck, CreditCard,
  Zap, Shield, Award, Clock, MessageSquare, Link as LinkIcon,
  X, Plus, ChevronRight
} from "lucide-react";
import countriesList from 'all-countries-list';

// Countries data
const countries = Object.values(countriesList).map(country => ({
  name: country.name,
  code: country.code,
  dialCode: country.dialCode,
  emoji: country.emoji
})).sort((a, b) => a.name.localeCompare(b.name));

// Partner types/categories
const partnerTypes = [
  {
    id: "logistics",
    name: "Logistics & Delivery",
    icon: <Truck />,
    description: "Nationwide or cross-border shipping, last-mile delivery, warehousing",
    requirements: ["Fleet size >10 vehicles", "Tracking system", "Insurance coverage"]
  },
  {
    id: "fintech",
    name: "Fintech & Payments",
    icon: <CreditCard />,
    description: "Payment processing, mobile money, banking services, lending",
    requirements: ["Licensed financial institution", "PCI compliance", "API integration ready"]
  },
  {
    id: "technology",
    name: "Technology Provider",
    icon: <Zap />,
    description: "SaaS, cloud services, security, analytics, communication",
    requirements: ["Working product", "API documentation", "Support team"]
  },
  {
    id: "enterprise",
    name: "Enterprise Solutions",
    icon: <Building />,
    description: "B2B suppliers, distributors, manufacturers, consultants",
    requirements: ["Established business", "Quality certifications", "Supply chain capacity"]
  },
  {
    id: "marketing",
    name: "Marketing & Growth",
    icon: <Users />,
    description: "Digital marketing, advertising, social media, content creation",
    requirements: ["Track record", "Client portfolio", "Analytics capabilities"]
  },
  {
    id: "other",
    name: "Other / Strategic",
    icon: <HandshakeIcon />,
    description: "Other strategic partnerships and collaborations",
    requirements: ["Proposal required", "Business case", "Value proposition"]
  }
];

// Partnership tiers
const partnershipTiers = [
  {
    level: "Platinum",
    color: "from-blue-600 to-cyan-600",
    benefits: ["Revenue Sharing", "Co-branded Marketing", "API Priority Access", "Dedicated Manager"]
  },
  {
    level: "Gold",
    color: "from-purple-500 to-pink-500",
    benefits: ["Integration Support", "Joint Webinars", "Standard API Access", "Quarterly Reviews"]
  },
  {
    level: "Silver",
    color: "from-green-500 to-emerald-500",
    benefits: ["Partner Directory", "Marketing Materials", "Basic API Access", "Monthly Updates"]
  }
];

// Business sizes
const businessSizes = [
  "Solo Entrepreneur",
  "2-10 Employees",
  "11-50 Employees",
  "51-200 Employees",
  "201-500 Employees",
  "500+ Employees"
];

// Years in operation
const yearsOptions = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "10+ years"
];

import { Suspense } from "react";

function PartnerApplyForm() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedTier = searchParams.get('tier');

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    partnerType: "",
    partnershipTier: preselectedTier || "",
    organizationName: "",
    registrationNumber: "",
    yearEstablished: "",
    businessSize: "",
    website: "",
    linkedin: "",

    // Contact Information
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    alternativePhone: "",
    country: "",
    city: "",
    address: "",

    // Business Details
    description: "",
    services: [],
    targetMarkets: [],
    keyClients: "",
    annualRevenue: "",
    countriesOfOperation: [],

    // Partnership Details
    partnershipGoals: "",
    expectedVolume: "",
    integrationTimeline: "",
    additionalInfo: "",

    // Agreements
    agreeTerms: false,
    agreeDataProcessing: false,
    agreeContact: false
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [serviceInput, setServiceInput] = useState("");
  const [marketInput, setMarketInput] = useState("");
  const [countryOperationInput, setCountryOperationInput] = useState("");
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Update phone when country changes
  useEffect(() => {
    if (selectedCountry) {
      setFormData(prev => ({
        ...prev,
        phone: selectedCountry.dialCode
      }));
    }
  }, [selectedCountry]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    const country = countries.find(c => c.name === countryName);
    setSelectedCountry(country);
    setFormData(prev => ({
      ...prev,
      country: countryName
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (selectedCountry) {
      const dialCode = selectedCountry.dialCode;
      if (!value.startsWith(dialCode)) {
        value = dialCode;
      } else {
        const numberPart = value.slice(dialCode.length).replace(/[^0-9]/g, '');
        value = dialCode + numberPart;
      }
    }

    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const addService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()]
      }));
      setServiceInput("");
    }
  };

  const removeService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const addMarket = () => {
    if (marketInput.trim() && !formData.targetMarkets.includes(marketInput.trim())) {
      setFormData(prev => ({
        ...prev,
        targetMarkets: [...prev.targetMarkets, marketInput.trim()]
      }));
      setMarketInput("");
    }
  };

  const removeMarket = (market) => {
    setFormData(prev => ({
      ...prev,
      targetMarkets: prev.targetMarkets.filter(m => m !== market)
    }));
  };

  const addCountryOperation = () => {
    if (countryOperationInput.trim() && !formData.countriesOfOperation.includes(countryOperationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        countriesOfOperation: [...prev.countriesOfOperation, countryOperationInput.trim()]
      }));
      setCountryOperationInput("");
    }
  };

  const removeCountryOperation = (country) => {
    setFormData(prev => ({
      ...prev,
      countriesOfOperation: prev.countriesOfOperation.filter(c => c !== country)
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    // Simulate upload (in production, upload to server/cloud storage)
    setTimeout(() => {
      const newDocuments = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      }));
      setDocuments(prev => [...prev, ...newDocuments]);
      setUploading(false);
    }, 1000);
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.partnerType) newErrors.partnerType = "Select your partner type";
      if (!formData.organizationName) newErrors.organizationName = "Organization name is required";
      if (!formData.registrationNumber) newErrors.registrationNumber = "Registration number is required";
      if (!formData.yearEstablished) newErrors.yearEstablished = "Year established is required";
      if (!formData.businessSize) newErrors.businessSize = "Business size is required";
    }

    if (step === 2) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.city) newErrors.city = "City is required";
    }

    if (step === 3) {
      if (!formData.description) newErrors.description = "Business description is required";
      if (formData.services.length === 0) newErrors.services = "At least one service is required";
      if (formData.targetMarkets.length === 0) newErrors.targetMarkets = "At least one target market is required";
    }

    if (step === 4) {
      if (!formData.partnershipGoals) newErrors.partnershipGoals = "Partnership goals are required";
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
      if (!formData.agreeDataProcessing) newErrors.agreeDataProcessing = "You must agree to data processing";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, send to your API
      // const response = await fetch('/api/partner/apply', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSubmitSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      setErrors({ submit: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <AboutInfoLayout
        title="Application Received"
        subtitle="Thank you for your interest in partnering with Nyle"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-xl mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-white" size={48} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              We've received your partnership application!
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              Your application reference number: <span className="font-mono font-bold text-blue-600">NYLE-PART-{Date.now().toString().slice(-8)}</span>
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <Clock className="text-blue-600 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">What happens next?</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">1</div>
                  <p className="text-gray-700"><span className="font-semibold">Review Period:</span> Our partnerships team will review your application within 3-5 business days.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">2</div>
                  <p className="text-gray-700"><span className="font-semibold">Initial Contact:</span> We'll reach out to schedule an introductory call to discuss your partnership goals.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">3</div>
                  <p className="text-gray-700"><span className="font-semibold">Due Diligence:</span> We'll verify your information and conduct a background check.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">4</div>
                  <p className="text-gray-700"><span className="font-semibold">Onboarding:</span> Once approved, we'll begin the technical and operational integration process.</p>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/partner')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
              >
                Back to Partners Page
              </button>

              <p className="text-gray-600 text-sm">
                You'll receive a confirmation email at <span className="font-semibold">{formData.email}</span>
              </p>
            </div>
          </div>
        </div>
      </AboutInfoLayout>
    );
  }

  return (
    <AboutInfoLayout
      title="Apply to Become a Partner"
      subtitle="Join us in building Africa's commerce ecosystem"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step < currentStep
                  ? 'bg-green-500 text-white'
                  : step === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {step < currentStep ? <CheckCircle size={20} /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className={currentStep === 1 ? 'text-blue-600' : 'text-gray-500'}>Basic Info</span>
          <span className={currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}>Contact</span>
          <span className={currentStep === 3 ? 'text-blue-600' : 'text-gray-500'}>Business Details</span>
          <span className={currentStep === 4 ? 'text-blue-600' : 'text-gray-500'}>Partnership</span>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-blue-100 shadow-xl overflow-hidden">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="text-blue-600" />
              Basic Information
            </h3>

            <div className="space-y-6">
              {/* Partner Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Partner Category *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partnerTypes.map((type) => (
                    <label
                      key={type.id}
                      className={`relative border rounded-xl p-4 cursor-pointer transition-all ${formData.partnerType === type.id
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                    >
                      <input
                        type="radio"
                        name="partnerType"
                        value={type.id}
                        checked={formData.partnerType === type.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${formData.partnerType === type.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                          }`}>
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{type.name}</div>
                          <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        </div>
                      </div>
                      {formData.partnerType === type.id && (
                        <CheckCircle className="absolute top-4 right-4 text-blue-600" size={20} />
                      )}
                    </label>
                  ))}
                </div>
                {errors.partnerType && (
                  <p className="mt-2 text-sm text-red-600">{errors.partnerType}</p>
                )}
              </div>

              {/* Partnership Tier */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Desired Partnership Tier *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {partnershipTiers.map((tier) => (
                    <label
                      key={tier.level}
                      className={`relative border rounded-xl p-4 cursor-pointer transition-all ${formData.partnershipTier === tier.level.toLowerCase()
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                    >
                      <input
                        type="radio"
                        name="partnershipTier"
                        value={tier.level.toLowerCase()}
                        checked={formData.partnershipTier === tier.level.toLowerCase()}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${tier.color} text-white mb-2`}>
                          {tier.level}
                        </div>
                        <ul className="text-xs text-left text-gray-600 space-y-1 mb-2">
                          {tier.benefits.slice(0, 2).map((benefit, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <CheckCircle size={12} className="text-green-500" />
                              {benefit}
                            </li>
                          ))}
                          <li className="text-blue-600 text-xs">+ more benefits</li>
                        </ul>
                      </div>
                      {formData.partnershipTier === tier.level.toLowerCase() && (
                        <CheckCircle className="absolute top-2 right-2 text-blue-600" size={16} />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Organization Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization/Legal Name *
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="e.g., Nyle Corporation Ltd"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.organizationName ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.organizationName && (
                    <p className="mt-1 text-sm text-red-600">{errors.organizationName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g., BRN-2024-001234"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.registrationNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year Established *
                  </label>
                  <select
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.yearEstablished ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select years in operation</option>
                    {yearsOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.yearEstablished && (
                    <p className="mt-1 text-sm text-red-600">{errors.yearEstablished}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Size *
                  </label>
                  <select
                    name="businessSize"
                    value={formData.businessSize}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.businessSize ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select business size</option>
                    {businessSizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {errors.businessSize && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessSize}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.yourcompany.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">in/</span>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="company-name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="text-blue-600" />
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g., John Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g., Partnerships Manager"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.jobTitle && (
                    <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    {selectedCountry && (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                        <span className="text-xl mr-1">{selectedCountry.emoji}</span>
                        <span className="text-gray-600 text-sm">{selectedCountry.dialCode}</span>
                      </div>
                    )}
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      disabled={!selectedCountry}
                      placeholder={!selectedCountry ? "Select country first" : "Enter number"}
                      className={`w-full pl-24 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alternative Phone
                  </label>
                  <input
                    type="tel"
                    name="alternativePhone"
                    value={formData.alternativePhone}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, i) => (
                      <option key={i} value={country.name}>
                        {country.emoji} {country.name} ({country.dialCode})
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Nairobi"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, P.O. Box, etc."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Business Details */}
        {currentStep === 3 && (
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="text-blue-600" />
              Business Details
            </h3>

            <div className="space-y-6">
              {/* Business Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your business, what you do, your mission, and unique value proposition..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Services/Products */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Services / Products *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                    placeholder="e.g., Last-mile delivery, Payment processing"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        className="hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.services && (
                  <p className="mt-2 text-sm text-red-600">{errors.services}</p>
                )}
              </div>

              {/* Target Markets */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Markets *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={marketInput}
                    onChange={(e) => setMarketInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMarket())}
                    placeholder="e.g., Retail, E-commerce, Healthcare"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <button
                    type="button"
                    onClick={addMarket}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.targetMarkets.map((market, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                    >
                      {market}
                      <button
                        type="button"
                        onClick={() => removeMarket(market)}
                        className="hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.targetMarkets && (
                  <p className="mt-2 text-sm text-red-600">{errors.targetMarkets}</p>
                )}
              </div>

              {/* Key Clients */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Clients / Reference
                </label>
                <textarea
                  name="keyClients"
                  value={formData.keyClients}
                  onChange={handleChange}
                  rows="3"
                  placeholder="List some of your major clients or reference projects (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Annual Revenue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Revenue (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="annualRevenue"
                      value={formData.annualRevenue}
                      onChange={handleChange}
                      placeholder="e.g., $1M - $5M"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Countries of Operation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Countries of Operation
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={countryOperationInput}
                      onChange={(e) => setCountryOperationInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCountryOperation())}
                      placeholder="e.g., Kenya, Uganda, Tanzania"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <button
                      type="button"
                      onClick={addCountryOperation}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.countriesOfOperation.map((country, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                      >
                        {country}
                        <button
                          type="button"
                          onClick={() => removeCountryOperation(country)}
                          className="hover:text-red-600"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Supporting Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex flex-col items-center"
                  >
                    <Upload className="text-gray-400 mb-2" size={32} />
                    <span className="text-sm font-medium text-blue-600">Click to upload</span>
                    <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
                    <span className="text-xs text-gray-400 mt-2">PDF, DOC, JPG up to 10MB</span>
                  </label>
                </div>

                {uploading && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Uploading...
                  </div>
                )}

                {documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-700">{doc.name}</span>
                          <span className="text-xs text-gray-400">
                            ({(doc.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Partnership Details */}
        {currentStep === 4 && (
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HandshakeIcon className="text-blue-600" />
              Partnership Details
            </h3>

            <div className="space-y-6">
              {/* Partnership Goals */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Why do you want to partner with Nyle? *
                </label>
                <textarea
                  name="partnershipGoals"
                  value={formData.partnershipGoals}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your goals, what you hope to achieve, and how you see the partnership working..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.partnershipGoals ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.partnershipGoals && (
                  <p className="mt-1 text-sm text-red-600">{errors.partnershipGoals}</p>
                )}
              </div>

              {/* Expected Volume */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Transaction Volume
                </label>
                <select
                  name="expectedVolume"
                  value={formData.expectedVolume}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select expected volume</option>
                  <option value="low">Less than 1,000 transactions/month</option>
                  <option value="medium">1,000 - 10,000 transactions/month</option>
                  <option value="high">10,000 - 50,000 transactions/month</option>
                  <option value="very-high">50,000+ transactions/month</option>
                </select>
              </div>

              {/* Integration Timeline */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Integration / Go-live Timeline
                </label>
                <select
                  name="integrationTimeline"
                  value={formData.integrationTimeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (within 1 month)</option>
                  <option value="short">Short-term (1-3 months)</option>
                  <option value="medium">Medium-term (3-6 months)</option>
                  <option value="long">Long-term (6+ months)</option>
                </select>
              </div>

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Anything else you'd like us to know?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Agreements */}
              <div className="space-y-4 bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900">Terms & Agreements</h4>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the <a href="/partner/terms" className="text-blue-600 hover:underline">Partner Terms & Conditions</a> and confirm that all information provided is accurate.
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeDataProcessing"
                    checked={formData.agreeDataProcessing}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    I consent to Nyle processing my business information for partnership evaluation and communication purposes.
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeContact"
                    checked={formData.agreeContact}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to be contacted by Nyle's partnerships team via email, phone, or other channels.
                  </span>
                </label>

                {errors.agreeTerms && (
                  <p className="text-sm text-red-600">{errors.agreeTerms}</p>
                )}
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Application Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Partner Type:</span>
                    <p className="font-medium">{partnerTypes.find(t => t.id === formData.partnerType)?.name || 'Not selected'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tier:</span>
                    <p className="font-medium capitalize">{formData.partnershipTier || 'Not selected'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Organization:</span>
                    <p className="font-medium">{formData.organizationName || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Contact:</span>
                    <p className="font-medium">{formData.fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Services:</span>
                    <p className="font-medium">{formData.services.length} listed</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Documents:</span>
                    <p className="font-medium">{documents.length} uploaded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="border-t border-gray-200 p-8 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Previous Step
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              Next Step
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <HandshakeIcon size={20} />
                  Submit Application
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Help Section */}
      <div className="mt-8 bg-white rounded-2xl border border-blue-100 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <MessageSquare className="text-blue-600" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Need help with your application?</h4>
            <p className="text-gray-600 mb-3">
              Our partnerships team is here to assist you. Contact us for any questions about the application process.
            </p>
            <div className="flex gap-4">
              <a href="mailto:partners@nyle.co.ke" className="text-blue-600 hover:underline font-medium">
                partners@nyle.co.ke
              </a>
              <span className="text-gray-300">|</span>
              <a href="tel:+254700000000" className="text-blue-600 hover:underline font-medium">
                +254 700 000 000
              </a>
            </div>
          </div>
        </div>
      </div>
    </AboutInfoLayout>
  );
}

export default function PartnerApplyPage() {
  return (
    <Suspense fallback={
      <AboutInfoLayout
        title="Apply to Become a Partner"
        subtitle="Loading application form..."
      >
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AboutInfoLayout>
    }>
      <PartnerApplyForm />
    </Suspense>
  );
}
