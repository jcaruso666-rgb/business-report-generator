import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
  businessName: string;
  inferredIndustry: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  competitors: Competitor[];
  marketTrends: { trend: string; percentage: string; direction: "up" | "down" }[];
  seoKeywords: SEOKeyword[];
  actionPlan: string[];
}

// Infer industry from business name
const inferIndustry = (businessName: string): string => {
  const name = businessName.toLowerCase();
  
  const industryMap: Record<string, string[]> = {
    "Technology": ["tech", "software", "app", "digital", "it ", "cyber", "cloud", "ai ", "data", "web", "dev"],
    "Healthcare": ["health", "medical", "clinic", "dental", "care", "wellness", "therapy", "pharma", "doctor", "hospital"],
    "Finance": ["bank", "finance", "invest", "capital", "wealth", "insurance", "credit", "loan", "fund", "accounting"],
    "Retail": ["shop", "store", "retail", "boutique", "mart", "outlet", "fashion", "clothing", "apparel"],
    "Food & Beverage": ["restaurant", "cafe", "coffee", "food", "grill", "pizza", "bakery", "bar", "catering", "kitchen"],
    "Real Estate": ["real estate", "property", "homes", "realty", "housing", "rent", "apartment", "estate"],
    "Professional Services": ["consulting", "legal", "law", "attorney", "accountant", "advisor", "agency", "marketing"],
    "Construction": ["construction", "build", "contractor", "plumbing", "electric", "roofing", "hvac", "repair"],
    "Education": ["school", "academy", "learning", "tutor", "education", "training", "institute", "college"],
    "Fitness": ["gym", "fitness", "yoga", "crossfit", "workout", "training", "sport", "athletic"],
    "Beauty": ["salon", "spa", "beauty", "hair", "nail", "skin", "cosmetic", "barber"],
    "Automotive": ["auto", "car", "motor", "vehicle", "tire", "mechanic", "repair", "dealership"],
  };

  for (const [industry, keywords] of Object.entries(industryMap)) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return industry;
    }
  }
  
  return "Professional Services";
};

const generateReport = (businessName: string): ReportData => {
  const industry = inferIndustry(businessName);
  const location = "your local area";

  return {
    businessName,
    inferredIndustry: industry,
    overview: `${businessName} operates in the ${industry.toLowerCase()} sector with significant market potential. Based on industry analysis, businesses in this sector are experiencing increased demand for digital transformation and online presence. The company has strong opportunities to capture market share through strategic positioning, enhanced digital marketing, and customer-centric service delivery.`,
    
    strengths: [
      `Established brand identity as "${businessName}"`,
      `Operating in growing ${industry} market`,
      "Opportunity to define unique value proposition",
      "Flexibility to adapt to market trends",
      "Potential for strong customer relationships",
    ],
    
    weaknesses: [
      "Limited or no current web presence detected",
      "Need for stronger online visibility and SEO",
      "Customer acquisition cost may be high without digital channels",
      "Missing opportunities from organic search traffic",
      "Competitors may have established digital presence",
    ],
    
    opportunities: [
      "Develop a professional, conversion-optimized website",
      "Implement comprehensive SEO strategy for local and industry keywords",
      "Create content marketing to establish thought leadership",
      "Leverage Google Business Profile for local visibility",
      "Build email marketing funnel for customer retention",
      "Establish strong social media presence",
    ],
    
    competitors: [
      {
        name: `${industry} Solutions Pro`,
        website: `www.${industry.toLowerCase().replace(/\s+/g, "")}solutionspro.com`,
        description: `Established ${industry.toLowerCase()} provider with comprehensive service offerings. Known for reliable service and competitive pricing.`,
        strength: "Strong Reviews",
      },
      {
        name: `Premier ${industry} Group`,
        website: `www.premier${industry.toLowerCase().replace(/\s+/g, "")}.com`,
        description: `Full-service ${industry.toLowerCase()} company with heavy investment in digital marketing and SEO presence.`,
        strength: "Great SEO",
      },
      {
        name: `Elite ${industry} Services`,
        website: `www.elite${industry.toLowerCase().replace(/\s+/g, "")}services.com`,
        description: `Premium ${industry.toLowerCase()} provider targeting high-end clients with emphasis on quality.`,
        strength: "Premium Brand",
      },
      {
        name: `Local ${industry} Experts`,
        website: `www.local${industry.toLowerCase().replace(/\s+/g, "")}experts.com`,
        description: `Community-focused ${industry.toLowerCase()} business with strong local ties and engagement.`,
        strength: "Local Trust",
      },
    ],
    
    marketTrends: [
      { trend: "Digital-first customer journeys", percentage: "73%", direction: "up" },
      { trend: `${industry} online search growth`, percentage: "45%", direction: "up" },
      { trend: "Mobile commerce adoption", percentage: "62%", direction: "up" },
      { trend: "Local SEO importance", percentage: "88%", direction: "up" },
      { trend: "Traditional advertising effectiveness", percentage: "23%", direction: "down" },
    ],
    
    seoKeywords: [
      { keyword: `${industry.toLowerCase()} near me`, volume: "5,100/mo", difficulty: "High", trend: "up" },
      { keyword: `best ${industry.toLowerCase()} services`, volume: "2,400/mo", difficulty: "Medium", trend: "up" },
      { keyword: `${industry.toLowerCase()} company`, volume: "1,800/mo", difficulty: "Medium", trend: "up" },
      { keyword: `affordable ${industry.toLowerCase()}`, volume: "3,600/mo", difficulty: "Medium", trend: "stable" },
      { keyword: `${industry.toLowerCase()} reviews`, volume: "890/mo", difficulty: "Low", trend: "up" },
      { keyword: `local ${industry.toLowerCase()}`, volume: "720/mo", difficulty: "Low", trend: "up" },
      { keyword: `${industry.toLowerCase()} consultation`, volume: "1,200/mo", difficulty: "Low", trend: "up" },
      { keyword: `top rated ${industry.toLowerCase()}`, volume: "480/mo", difficulty: "Medium", trend: "up" },
    ],
    
    actionPlan: [
      "Build a professional, mobile-responsive website optimized for conversions",
      "Claim and optimize Google Business Profile with photos, hours, and service details",
      `Implement SEO targeting "${industry.toLowerCase()}" and related keywords`,
      "Create valuable content (blog posts, guides, FAQs) to attract organic traffic",
      "Set up email capture with lead magnets for prospect nurturing",
      "Establish presence on 2-3 key social media platforms for your audience",
      "Implement Google Analytics to track performance and user behavior",
      "Launch targeted Google Ads campaign for high-intent keywords",
      "Develop a customer review strategy to build social proof",
      "Create a referral program to leverage satisfied customers",
    ],
  };
};

function Index() {
  const [businessName, setBusinessName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);

  const handleGenerate = async () => {
    if (!businessName.trim()) return;
    
    setIsLoading(true);
    
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const generatedReport = generateReport(businessName.trim());
    setReport(generatedReport);
    setIsLoading(false);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleReset = () => {
    setReport(null);
    setBusinessName("");
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0e1a]/80 border-b border-white/5 print:bg-white print:border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center print:bg-indigo-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight print:text-black">
              <span className="text-indigo-400 print:text-indigo-600">Enigma</span> Business Report Generator
            </h1>
          </div>
          {report && (
            <div className="flex items-center gap-3 print:hidden">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                New Report
              </Button>
              <Button
                onClick={handleExportPDF}
                className="bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export to PDF
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Landing / Input Section */}
        {!report && !isLoading && (
          <div className="max-w-xl mx-auto text-center animate-fade-in">
            <div className="mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">
                <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Generate Your Business Report
              </h2>
              <p className="text-lg text-white/50">
                Enter your business name and get a comprehensive analysis with competitors, market trends, SEO keywords, and actionable growth strategies.
              </p>
            </div>

            <Card className="bg-white/[0.03] border-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="space-y-6">
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="Enter your business name..."
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-lg text-center"
                />
                <Button
                  onClick={handleGenerate}
                  disabled={!businessName.trim()}
                  className="w-full h-14 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Report
                </Button>
              </div>
            </Card>

            <p className="mt-8 text-sm text-white/30">
              Our AI analyzes your business name to provide industry-specific insights
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-xl mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">
              <svg className="w-10 h-10 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Analyzing Your Business</h2>
            <p className="text-white/50">Gathering market intelligence, competitor data, and SEO insights...</p>
            <div className="mt-8 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Report Display */}
        {report && !isLoading && (
          <div className="space-y-8 animate-fade-in">
            {/* Report Header */}
            <div className="text-center mb-12 print:mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 print:text-black">
                Business Report: {report.businessName}
              </h2>
              <p className="text-indigo-400 print:text-indigo-600">
                Industry: {report.inferredIndustry}
              </p>
            </div>

            {/* Business Overview */}
            <Card className="bg-white/[0.03] border-white/10 p-6 rounded-2xl print:bg-gray-50 print:border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center print:bg-indigo-100">
                  <svg className="w-5 h-5 text-indigo-400 print:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">Business Overview</h3>
              </div>
              <p className="text-white/70 leading-relaxed print:text-gray-700">{report.overview}</p>
            </Card>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/[0.03] border-white/10 p-6 rounded-2xl print:bg-gray-50 print:border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center print:bg-emerald-100">
                    <svg className="w-5 h-5 text-emerald-400 print:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white print:text-black">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {report.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 print:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/70 print:text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="bg-white/[0.03] border-white/10 p-6 rounded-2xl print:bg-gray-50 print:border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center print:bg-amber-100">
                    <svg className="w-5 h-5 text-amber-400 print:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white print:text-black">Weaknesses</h3>
                </div>
                <ul className="space-y-3">
                  {report.weaknesses.map((weakness, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0 print:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                      </svg>
                      <span className="text-white/70 print:text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Revenue Opportunities */}
            <Card className="bg-white/[0.03] border-white/10 p-6 rounded-2xl print:bg-gray-50 print:border-gray-200 print:break-before-page">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center print:bg-blue-100">
                  <svg className="w-5 h-5 text-blue-400 print:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">Revenue Generation Opportunities</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {report.opportunities.map((opportunity, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5 print:bg-white print:border-gray-200">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 print:bg-blue-100">
                      <span className="text-sm font-bold text-blue-400 print:text-blue-600">{i + 1}</span>
                    </div>
                    <span className="text-white/70 print:text-gray-700">{opportunity}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Competitors */}
            <Card className="bg-white/[0.03] border-white/10 p-6 rounded-2xl print:bg-gray-50 print:border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center print:bg-purple-100">
                  <svg className="w-5 h-5 text-purple-400 print:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">Competitor Analysis</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {report.competitors.map((competitor, i) => (
                  <div key={i} className="p-4 bg-white/[0.02] rounded-xl border border-white/5 print:bg-white print:border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white print:text-black">{competitor.name}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 print:bg-purple-100 print:text-purple-700">
                        {competitor.strength}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-400/70 mb-2 print:text-indigo-600">{competitor.website}</p>
                    <p className="text-sm text-white/50 print:text-gray-600">{competitor.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Market Trends */}
            <Card className="bg-white/[0.03] border-white/10 p-6 rounded-2xl print:bg-gray-50 print:border-gray-200 print:break-before-page">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center print:bg-cyan-100">
                  <svg className="w-5 h-5 text-cyan-400 print:text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">Market Trends</h3>
              </div>
              <div className="space-y-4">
                {report.marketTrends.map((trend, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 print:bg-white print:border-gray-200">
                    <span className="text-white/70 print:text-gray-700">{trend.trend}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${trend.direction === "up" ? "text-emerald-400 print:text-emerald-600" : "text-red-400 print:text-red-600"}`}>
                        {trend.percentage}
                      </span>
                      <svg className={`w-4 h-4 ${trend.direction === "up" ? "text-emerald-400 print:text-emerald-600" : "text-red-400 print:text-red-600 rotate-180"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* SEO Keywords */}
            <Card className="bg-white/[0.03] border-white/10 p-6 rounded-2xl print:bg-gray-50 print:border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center print:bg-orange-100">
                  <svg className="w-5 h-5 text-orange-400 print:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">SEO Keywords & Search Trends</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 print:border-gray-200">
                      <th className="text-left py-3 px-4 text-white/50 font-medium print:text-gray-600">Keyword</th>
                      <th className="text-left py-3 px-4 text-white/50 font-medium print:text-gray-600">Volume</th>
                      <th className="text-left py-3 px-4 text-white/50 font-medium print:text-gray-600">Difficulty</th>
                      <th className="text-left py-3 px-4 text-white/50 font-medium print:text-gray-600">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.seoKeywords.map((keyword, i) => (
                      <tr key={i} className="border-b border-white/5 print:border-gray-100">
                        <td className="py-3 px-4 text-white/80 print:text-gray-800">{keyword.keyword}</td>
                        <td className="py-3 px-4 text-white/60 print:text-gray-600">{keyword.volume}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            keyword.difficulty === "Low" ? "bg-emerald-500/20 text-emerald-300 print:bg-emerald-100 print:text-emerald-700" :
                            keyword.difficulty === "Medium" ? "bg-amber-500/20 text-amber-300 print:bg-amber-100 print:text-amber-700" :
                            "bg-red-500/20 text-red-300 print:bg-red-100 print:text-red-700"
                          }`}>
                            {keyword.difficulty}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <svg className={`w-4 h-4 ${
                            keyword.trend === "up" ? "text-emerald-400 print:text-emerald-600" :
                            keyword.trend === "down" ? "text-red-400 print:text-red-600 rotate-180" :
                            "text-white/40 print:text-gray-400"
                          }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {keyword.trend === "stable" ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            )}
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Action Plan */}
            <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 p-6 rounded-2xl print:bg-gray-50 print:border-gray-200 print:break-before-page">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center print:bg-indigo-100">
                  <svg className="w-5 h-5 text-indigo-400 print:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">Action Plan</h3>
              </div>
              <div className="space-y-3">
                {report.actionPlan.map((action, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5 print:bg-white print:border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 print:bg-indigo-600">
                      <span className="text-sm font-bold text-white">{i + 1}</span>
                    </div>
                    <span className="text-white/80 pt-1 print:text-gray-800">{action}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16 py-8 print:hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white/30 text-sm">
            Enigma Business Report Generator • AI-Powered Market Intelligence
          </p>
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
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
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

export default Index;
