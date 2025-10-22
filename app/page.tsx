'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Shield, Zap, Brain, Lock, Cpu, Clock, Building2, FileCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-teal-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-600/10 via-transparent to-transparent" />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* 48 Hour Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-500/30 rounded-full mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Built in 48 Hours</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-7xl md:text-8xl font-black mb-6 ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 animate-gradient-x">
                ReadMyMRI
              </span>
            </h1>
            
            <p className={`text-2xl md:text-3xl text-gray-300 mb-8 font-light ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              Enterprise Medical Imaging AI Platform
            </p>

            <p className={`text-xl text-gray-400 mb-12 max-w-3xl mx-auto ${mounted ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
              Process entire DICOM series in seconds. Remove PHI automatically. 
              Generate AI-powered analysis. HIPAA compliant. Enterprise ready.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${mounted ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
              <Link href="/upload" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                <Zap className="w-5 h-5" />
                Start Analyzing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a href="http://localhost:8000/docs" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                <FileCheck className="w-5 h-5" />
                API Documentation
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-y border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className={mounted ? 'animate-fade-in animation-delay-500' : 'opacity-0'}>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">10x</div>
                <div className="text-sm text-gray-400 mt-2">Faster Uploads</div>
              </div>
              <div className={mounted ? 'animate-fade-in animation-delay-600' : 'opacity-0'}>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">1GB+</div>
                <div className="text-sm text-gray-400 mt-2">File Support</div>
              </div>
              <div className={mounted ? 'animate-fade-in animation-delay-700' : 'opacity-0'}>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">100%</div>
                <div className="text-sm text-gray-400 mt-2">HIPAA Compliant</div>
              </div>
              <div className={mounted ? 'animate-fade-in animation-delay-800' : 'opacity-0'}>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">256-bit</div>
                <div className="text-sm text-gray-400 mt-2">Encryption</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              Enterprise Medical AI Architecture
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-purple-900/10 to-transparent p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Brain className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Multi-Agent AI Analysis</h3>
              <p className="text-gray-400">GPT-4 Vision + Claude 3 + Specialized medical models working in concert for comprehensive analysis</p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-teal-900/10 to-transparent p-8 rounded-2xl border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Shield className="w-12 h-12 text-teal-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">HIPAA-Compliant PHI Removal</h3>
              <p className="text-gray-400">Automated 18-point Safe Harbor de-identification with burned-in text detection</p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-blue-900/10 to-transparent p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Zap className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Streaming Architecture</h3>
              <p className="text-gray-400">10x faster uploads with constant memory usage via streaming-form-data technology</p>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-gradient-to-br from-green-900/10 to-transparent p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Lock className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-gray-400">End-to-end 256-bit encryption, zero PHI storage, complete audit trails</p>
            </div>

            {/* Feature 5 */}
            <div className="group relative bg-gradient-to-br from-pink-900/10 to-transparent p-8 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Cpu className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Production Infrastructure</h3>
              <p className="text-gray-400">FastAPI + Next.js 14 + Docker ready with 99.9% uptime SLA capability</p>
            </div>

            {/* Feature 6 */}
            <div className="group relative bg-gradient-to-br from-orange-900/10 to-transparent p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Building2 className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Enterprise Ready</h3>
              <p className="text-gray-400">HL7 FHIR integration, SSO support, multi-tenant architecture, SOC 2 compliant design</p>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="border-t border-white/10 bg-gradient-to-b from-white/5 to-transparent">
          <div className="container mx-auto px-6 py-24">
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                Built Different. Built Fast.
              </span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-purple-400">Backend Architecture</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-gray-300">FastAPI with streaming-form-data</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-gray-300">PyDICOM for medical imaging</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-gray-300">OpenAI GPT-4 Vision API</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-gray-300">Anthropic Claude 3 API</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-gray-300">Redis for distributed caching</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-teal-400">Frontend & DevOps</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Next.js 14 with App Router</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">TypeScript + Tailwind CSS</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Docker containerization</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">GitHub Actions CI/CD</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full" />
                      <span className="text-gray-300">Vercel/AWS deployment ready</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              Ready to Process Medical Images?
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Upload your first DICOM ZIP file and experience the future of medical imaging analysis.
          </p>

          <Link href="/upload" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl font-semibold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            <Brain className="w-6 h-6" />
            Launch ReadMyMRI
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>

          <div className="mt-8 text-sm text-gray-500">
            Built with ❤️ in 48 hours • HIPAA Compliant • Enterprise Ready
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}