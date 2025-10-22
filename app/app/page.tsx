'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, Shield, Zap, Upload, CheckCircle, 
  Activity, FileStack, Timer, Users, 
  ArrowRight, Play, Sparkles 
} from 'lucide-react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-teal-900/20" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo/Brand */}
            <div className="mb-8 inline-flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 blur-2xl opacity-50 animate-pulse" />
                <Brain className="relative w-20 h-20 text-white" />
              </div>
            </div>

            {/* Main heading with gradient */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 animate-gradient">
                ReadMyMRI
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              World&apos;s First ZIP-Native Medical AI
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10 flex items-center">
                  <Play className="mr-2 w-5 h-5" />
                  Try Live Demo
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                Watch 2-Minute Demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-green-400">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">15-Second Analysis</span>
              </div>
            </div>
          </div>
        </section>

        {/* Revolutionary ZIP Processing Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                  Revolutionary
                </span>
                <br />
                ZIP-Based DICOM
                <br />
                Processing
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Upload entire MRI series in <span className="text-teal-400 font-semibold">one ZIP file</span>.
                <br />
                Get comprehensive AI analysis with <span className="text-purple-400 font-semibold">automated HIPAA compliance</span> in seconds.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Zap, label: "50x", sublabel: "Faster Workflow", color: "from-yellow-400 to-orange-500" },
                { icon: Shield, label: "100%", sublabel: "HIPAA Compliant", color: "from-green-400 to-emerald-500" },
                { icon: Brain, label: "AI Models", sublabel: "$500M+ IP Value", color: "from-purple-400 to-pink-500" },
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
                  <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:border-white/30 transition-all duration-300">
                    <feature.icon className={`w-12 h-12 mx-auto mb-4 text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`} />
                    <div className={`text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                      {feature.label}
                    </div>
                    <div className="text-gray-400">{feature.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload demo area */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-600/20 blur-3xl" />
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                <h3 className="text-2xl font-bold mb-6">Upload Complete MRI Series in One ZIP</h3>
                <p className="text-gray-400 mb-8">
                  No more uploading 100+ individual DICOM files.<br />
                  Our revolutionary processor handles entire series automatically.
                </p>
                
                {/* Feature checkmarks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    "ZIP Series Processing",
                    "Auto PHI Removal", 
                    "Multi-Model AI"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Demo buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    <Upload className="mr-2 w-5 h-5" />
                    Try Revolutionary ZIP Demo
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-6 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                    <Play className="inline mr-2 w-5 h-5" />
                    Watch 2-Minute Demo Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Timer, value: "15 Second", label: "Processing" },
                { icon: Shield, value: "Automated HIPAA", label: "Compliance" },
                { icon: Activity, value: "AI-powered PHI", label: "removal with complete audit trails" },
                { icon: Users, value: "Multi-Model", label: "Consensus" },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-gray-600 group-hover:text-teal-400 transition-colors" />
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to See the Revolution?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience the world&apos;s first ZIP-native medical AI platform.<br />
            Upload your own DICOM ZIP files and see the future of medical imaging.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
            <Activity className="w-5 h-5" />
            <span>Experience the Revolution</span>
            <ArrowRight className="w-5 h-5" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No signup required</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Supports 500MB ZIP files</span>
            </div>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              ReadMyMRI
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10 text-center text-gray-500">
          <p>© 2025 ReadMyMRI. Revolutionizing medical imaging with ZIP-native AI processing.</p>
        </footer>
      </div>
    </main>
  );
}
