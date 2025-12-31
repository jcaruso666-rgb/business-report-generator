import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BusinessData {
  businessName: string;
  industry: string;
  websiteUrl: string;
  targetLocation: string;
  businessDescription: string;
}

interface Competitor {
  name: string;
  website: string;
  description: string;
  strength: string;
}

interface SEOKeyword {
  keyword: string;
  volume: string;
  difficulty: string;
  trend: "up" | "down" | "stable";
}

interface ReportData {
  overview: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  competitors: Competitor[];
  marketTrends: { trend: string; percentage: string; direction: "up" | "down" }[];
  seoKeywords: SEOKeyword[];
  actionPlan: string[];
}

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Food & Beverage",
  "Professional Services",
  "Education",
  "Entertainment",
  "Construction",
  "Transportation",
  "Other",
];

function Index() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [formData, setFormData] = useState<BusinessData>({
    businessName: "",
    industry: "",
    websiteUrl: "",
    targetLocation: "",
    businessDescription: "",
  });

  const updateFormData = (field: keyof BusinessData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.businessName.trim().length > 0;
      case 2:
        return formData.industry.length > 0;
      case 3:
        return formData.targetLocation.trim().length > 0;
      case 4:
        return formData.businessDescription.trim().length > 10;
      default:
        return true;
    }
  };

  const generateReport = async () => {
    setIsLoading(true);
    
    // Simulate API call with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const generatedReport: ReportData = {
      overview: `${formData.businessName} is a ${formData.industry.toLowerCase()} business based in ${formData.targetLocation}. ${formData.businessDescription} The company operates in a competitive market with significant growth potential. Based on current market analysis, there are multiple avenues for expansion and optimization, particularly in digital presence and customer acquisition strategies.`,
      
      strengths: [
        `Strong local presence in ${formData.targetLocation}`,
        "Clear value proposition in the market",
        "Opportunity to leverage digital marketing",
        `Expertise in ${formData.industry} sector`,
        "Potential for customer loyalty programs",
      ],
      
      weaknesses: [
        formData.websiteUrl ? "Website may need SEO optimization" : "No current web presence - missing digital opportunities",
        "Limited online visibility compared to competitors",
        "Need for stronger social media engagement",
        "Customer acquisition cost may be high without digital channels",
      ],
      
      opportunities: [
        "Develop a professional website to capture online traffic",
        "Implement SEO strategy to rank for local searches",
        "Create content marketing to establish thought leadership",
        "Leverage Google Business Profile for local visibility",
        "Build email marketing funnel for customer retention",
        "Partner with complementary businesses in the area",
      ],
      
      competitors: generateCompetitors(formData.industry, formData.targetLocation),
      
      marketTrends: [
        { trend: "Digital-first customer journeys", percentage: "73%", direction: "up" },
        { trend: `${formData.industry} online search growth`, percentage: "45%", direction: "up" },
        { trend: "Mobile commerce adoption", percentage: "62%", direction: "up" },
        { trend: "Local SEO importance", percentage: "88%", direction: "up" },
        { trend: "Traditional advertising effectiveness", percentage: "23%", direction: "down" },
      ],
      
      seoKeywords: generateKeywords(formData.industry, formData.targetLocation, formData.businessName),
      
      actionPlan: [
        "Build a professional, mobile-responsive website optimized for conversions",
        "Claim and optimize Google Business Profile with photos and reviews",
        `Implement local SEO targeting "${formData.industry.toLowerCase()} in ${formData.targetLocation}" keywords`,
        "Create valuable content (blog posts, guides) to attract organic traffic",
        "Set up email capture and nurture sequences for leads",
        "Establish social media presence on 2-3 key platforms",
        "Implement analytics to track website performance and conversions",
        "Launch targeted Google Ads campaign for high-intent keywords",
        "Develop customer review strategy to build social proof",
        "Create referral program to leverage existing customer base",
      ],
    };

    setReport(generatedReport);
    setIsLoading(false);
    setStep(5);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const resetForm = () => {
    setStep(1);
    setReport(null);
    setFormData({
      businessName: "",
      industry: "",
      websiteUrl: "",
      targetLocation: "",
      businessDescription: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0e1a]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-indigo-400">Enigma</span> Business Report Generator
            </h1>
          </div>
          {report && (
            <Button
              onClick={handleExportPDF}
              className="bg-indigo-600 hover:bg-indigo-500 text-white print:hidden"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export to PDF
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Form Steps */}
        {step < 5 && !isLoading && (
          <div className="max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    s === step
                      ? "w-12 bg-gradient-to-r from-indigo-500 to-purple-500"
                      : s < step
                      ? "w-8 bg-indigo-500"
                      : "w-8 bg-white/10"
                  }`}
                />
              ))}
            </div>

            <Card className="bg-white/[0.03] border-white/10 backdrop-blur-sm p-8 rounded-2xl animate-fade-in">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">What's your business name?</h2>
                    <p className="text-white/50">Let's start with the basics</p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70">Business Name</Label>
                    <Input
                      value={formData.businessName}
                      onChange={(e) => updateFormData("businessName", e.target.value)}
                      placeholder="e.g., Acme Solutions"
                      className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-lg"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">What industry are you in?</h2>
                    <p className="text-white/50">This helps us tailor our analysis</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {INDUSTRIES.map((industry) => (
                      <button
                        key={industry}
                        onClick={() => updateFormData("industry", industry)}
                        className={`p-4 rounded-xl border transition-all text-sm font-medium ${
                          formData.industry === industry
                            ? "bg-indigo-500/20 border-indigo-500 text-indigo-300"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Where do you operate?</h2>
                    <p className="text-white/50">Your target market location</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-white/70">Target Location</Label>
                      <Input
                        value={formData.targetLocation}
                        onChange={(e) => updateFormData("targetLocation", e.target.value)}
                        placeholder="e.g., New York, NY"
                        className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/70">Website URL (Optional)</Label>
                      <Input
                        value={formData.websiteUrl}
                        onChange={(e) => updateFormData("websiteUrl", e.target.value)}
                        placeholder="https://yourbusiness.com"
                        className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Describe your business</h2>
                    <p className="text-white/50">Tell us what you do and who you serve</p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70">Business Description</Label>
                    <Textarea
                      value={formData.businessDescription}
                      onChange={(e) => updateFormData("businessDescription", e.target.value)}
                      placeholder="We provide high-quality plumbing services to residential and commercial customers..."
                      className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                {step > 1 ? (
                  <Button
                    variant="ghost"
                    onClick={() => setStep(step - 1)}
                    className="text-white/50 hover:text-white hover:bg-white/5"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30"
                  >
                    Continue
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    onClick={generateReport}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-30 px-8"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Generate Report
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold mt-8 mb-2">Analyzing your business...</h3>
            <p className="text-white/50 text-center max-w-md">
              We're researching competitors, market trends, and SEO opportunities for {formData.businessName}
            </p>
          </div>
        )}

        {/* Report Display */}
        {report && step === 5 && (
          <div className="space-y-8 animate-fade-in report-content">
            {/* Report Header */}
            <div className="text-center mb-12 print:mb-8">
              <h2 className="text-4xl font-bold mb-4 print:text-black">
                Business Analysis Report
              </h2>
              <p className="text-xl text-indigo-400 print:text-indigo-600 font-medium">{formData.businessName}</p>
              <p className="text-white/50 print:text-gray-500 mt-2">{formData.industry} • {formData.targetLocation}</p>
            </div>

            {/* Overview */}
            <Card className="bg-white/[0.03] border-white/10 p-8 rounded-2xl print:bg-white print:border-gray-200 print:shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center print:bg-indigo-100">
                  <svg className="w-5 h-5 text-indigo-400 print:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold print:text-black">Business Overview</h3>
              </div>
              <p className="text-white/70 print:text-gray-600 leading-relaxed">{report.overview}</p>
            </Card>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/[0.03] border-white/10 p-8 rounded-2xl print:bg-white print:border-gray-200 print:shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center print:bg-emerald-100">
                    <svg className="w-5 h-5 text-emerald-400 print:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold print:text-black">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {report.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0 print:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/70 print:text-gray-600">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="bg-white/[0.03] border-white/10 p-8 rounded-2xl print:bg-white print:border-gray-200 print:shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center print:bg-amber-100">
                    <svg className="w-5 h-5 text-amber-400 print:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold print:text-black">Areas for Improvement</h3>
                </div>
                <ul className="space-y-3">
                  {report.weaknesses.map((weakness, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-400 mt-0.5 shrink-0 print:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                      </svg>
                      <span className="text-white/70 print:text-gray-600">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Revenue Opportunities */}
            <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 p-8 rounded-2xl print:bg-indigo-50 print:border-indigo-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center print:bg-indigo-100">
                  <svg className="w-5 h-5 text-indigo-400 print:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold print:text-black">Revenue Generation Opportunities</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {report.opportunities.map((opp, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-4 border border-white/5 print:bg-white print:border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 print:bg-indigo-100">
                        <span className="text-indigo-400 font-bold text-sm print:text-indigo-600">{i + 1}</span>
                      </div>
                      <span className="text-white/80 print:text-gray-700">{opp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Competitors */}
            <Card className="bg-white/[0.03] border-white/10 p-8 rounded-2xl print:bg-white print:border-gray-200 print:shadow-sm print:break-before-page">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center print:bg-rose-100">
                  <svg className="w-5 h-5 text-rose-400 print:text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold print:text-black">Competitor Analysis</h3>
              </div>
              <div className="space-y-4">
                {report.competitors.map((comp, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-5 border border-white/5 print:bg-gray-50 print:border-gray-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white print:text-black mb-1">{comp.name}</h4>
                        <p className="text-indigo-400 text-sm mb-2 print:text-indigo-600">{comp.website}</p>
                        <p className="text-white/60 text-sm print:text-gray-600">{comp.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full print:bg-emerald-100 print:text-emerald-600">
                          {comp.strength}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Market Trends */}
            <Card className="bg-white/[0.03] border-white/10 p-8 rounded-2xl print:bg-white print:border-gray-200 print:shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center print:bg-cyan-100">
                  <svg className="w-5 h-5 text-cyan-400 print:text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold print:text-black">Market Trends</h3>
              </div>
              <div className="space-y-4">
                {report.marketTrends.map((trend, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-white/70 print:text-gray-600 flex-1">{trend.trend}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden print:bg-gray-200">
                        <div
                          className={`h-full rounded-full ${
                            trend.direction === "up" ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                          style={{ width: trend.percentage }}
                        />
                      </div>
                      <div className="flex items-center gap-1 w-16 justify-end">
                        {trend.direction === "up" ? (
                          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                        <span className={trend.direction === "up" ? "text-emerald-400 print:text-emerald-600" : "text-rose-400 print:text-rose-600"}>
                          {trend.percentage}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* SEO Keywords */}
            <Card className="bg-white/[0.03] border-white/10 p-8 rounded-2xl print:bg-white print:border-gray-200 print:shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center print:bg-violet-100">
                  <svg className="w-5 h-5 text-violet-400 print:text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold print:text-black">SEO Keywords & Search Trends</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 print:border-gray-200">
                      <th className="text-left py-3 px-4 text-white/50 font-medium text-sm print:text-gray-500">Keyword</th>
                      <th className="text-left py-3 px-4 text-white/50 font-medium text-sm print:text-gray-500">Monthly Volume</th>
                      <th className="text-left py-3 px-4 text-white/50 font-medium text-sm print:text-gray-500">Difficulty</th>
                      <th className="text-left py-3 px-4 text-white/50 font-medium text-sm print:text-gray-500">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.seoKeywords.map((kw, i) => (
                      <tr key={i} className="border-b border-white/5 print:border-gray-100">
                        <td className="py-3 px-4 text-white print:text-black font-medium">{kw.keyword}</td>
                        <td className="py-3 px-4 text-white/70 print:text-gray-600">{kw.volume}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              kw.difficulty === "Low"
                                ? "bg-emerald-500/20 text-emerald-400 print:bg-emerald-100 print:text-emerald-600"
                                : kw.difficulty === "Medium"
                                ? "bg-amber-500/20 text-amber-400 print:bg-amber-100 print:text-amber-600"
                                : "bg-rose-500/20 text-rose-400 print:bg-rose-100 print:text-rose-600"
                            }`}
                          >
                            {kw.difficulty}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {kw.trend === "up" ? (
                            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          ) : kw.trend === "down" ? (
                            <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                            </svg>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Action Plan */}
            <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20 p-8 rounded-2xl print:bg-emerald-50 print:border-emerald-200 print:break-before-page">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center print:bg-emerald-100">
                  <svg className="w-5 h-5 text-emerald-400 print:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold print:text-black">Action Plan</h3>
              </div>
              <div className="space-y-4">
                {report.actionPlan.map((action, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white/5 rounded-xl p-4 border border-white/5 print:bg-white print:border-gray-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-white/80 print:text-gray-700 pt-1">{action}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Generate New Report Button */}
            <div className="text-center pt-8 print:hidden">
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generate New Report
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20 print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-semibold">Enigma Business Report Generator</span>
            </div>
            <p className="text-white/40 text-sm">
              Powered by AI-driven market analysis • © 2024
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
          .print\\:text-black {
            color: black !important;
          }
          .print\\:break-before-page {
            break-before: page;
          }
        }
      `}</style>
    </div>
  );
}

function generateCompetitors(industry: string, location: string): Competitor[] {
  const competitors: Competitor[] = [
    {
      name: `${industry} Solutions Pro`,
      website: `www.${industry.toLowerCase().replace(/\s+/g, "")}solutionspro.com`,
      description: `Established ${industry.toLowerCase()} provider serving ${location} and surrounding areas. Known for reliable service and competitive pricing.`,
      strength: "Strong Reviews",
    },
    {
      name: `Premier ${industry} Group`,
      website: `www.premier${industry.toLowerCase().replace(/\s+/g, "")}.com`,
      description: `Full-service ${industry.toLowerCase()} company with comprehensive offerings. Heavy investment in digital marketing and SEO.`,
      strength: "Great SEO",
    },
    {
      name: `${location.split(",")[0]} ${industry} Experts`,
      website: `www.${location.split(",")[0].toLowerCase().replace(/\s+/g, "")}${industry.toLowerCase().replace(/\s+/g, "")}.com`,
      description: `Local ${industry.toLowerCase()} business with strong community ties. Active social media presence and customer engagement.`,
      strength: "Local Trust",
    },
    {
      name: `Elite ${industry} Services`,
      website: `www.elite${industry.toLowerCase().replace(/\s+/g, "")}services.com`,
      description: `Premium ${industry.toLowerCase()} provider targeting high-end clients. Emphasizes quality and professional service.`,
      strength: "Premium Brand",
    },
  ];
  return competitors;
}

function generateKeywords(industry: string, location: string, businessName: string): SEOKeyword[] {
  const cityName = location.split(",")[0].toLowerCase();
  const industryLower = industry.toLowerCase();
  
  return [
    { keyword: `${industryLower} ${cityName}`, volume: "2,400/mo", difficulty: "Medium", trend: "up" },
    { keyword: `best ${industryLower} near me`, volume: "5,100/mo", difficulty: "High", trend: "up" },
    { keyword: `${industryLower} services ${cityName}`, volume: "1,200/mo", difficulty: "Low", trend: "up" },
    { keyword: `affordable ${industryLower}`, volume: "3,600/mo", difficulty: "Medium", trend: "stable" },
    { keyword: `${industryLower} company reviews`, volume: "890/mo", difficulty: "Low", trend: "up" },
    { keyword: `local ${industryLower} experts`, volume: "720/mo", difficulty: "Low", trend: "up" },
    { keyword: `${industryLower} consultation`, volume: "1,800/mo", difficulty: "Medium", trend: "stable" },
    { keyword: `top rated ${industryLower} ${cityName}`, volume: "480/mo", difficulty: "Medium", trend: "up" },
  ];
}

export default Index;
