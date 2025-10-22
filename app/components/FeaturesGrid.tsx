// Save as components/FeaturesGrid.tsx
import { 
  Zap, Shield, Brain, FileArchive, 
  Clock, Users, Lock, Activity,
  CheckCircle, Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: FileArchive,
    title: "ZIP-Native Processing",
    description: "Upload entire MRI series as one ZIP file",
    stats: "100+ files → 1 ZIP",
    gradient: "from-teal-400 to-cyan-500",
    delay: 0,
  },
  {
    icon: Clock,
    title: "15-Second Analysis",
    description: "Fastest medical AI processing available",
    stats: "50x faster",
    gradient: "from-purple-400 to-pink-500",
    delay: 100,
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Automated PHI removal with audit trails",
    stats: "100% compliant",
    gradient: "from-green-400 to-emerald-500",
    delay: 200,
  },
  {
    icon: Brain,
    title: "Multi-Model AI",
    description: "3 AI models working in consensus",
    stats: "$500M+ IP value",
    gradient: "from-blue-400 to-indigo-500",
    delay: 300,
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade security at every step",
    stats: "256-bit AES",
    gradient: "from-orange-400 to-red-500",
    delay: 400,
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Track processing status live",
    stats: "Zero downtime",
    gradient: "from-pink-400 to-purple-500",
    delay: 500,
  },
];

export default function FeaturesGrid() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Revolutionary Features</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              Why ReadMyMRI Changes Everything
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built from the ground up to solve the biggest pain points in medical imaging
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                relative group transform transition-all duration-700
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              {/* Card glow effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-r ${feature.gradient} 
                opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500
              `} />
              
              {/* Card content */}
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 h-full hover:border-gray-700 transition-all duration-300 hover:-translate-y-2">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`
                    absolute inset-0 bg-gradient-to-r ${feature.gradient} 
                    blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500
                  `} />
                  <div className={`
                    relative w-16 h-16 bg-gradient-to-r ${feature.gradient} 
                    rounded-2xl flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-purple-500 transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <span className={`
                    text-sm font-semibold text-transparent bg-clip-text 
                    bg-gradient-to-r ${feature.gradient}
                  `}>
                    {feature.stats}
                  </span>
                  <CheckCircle className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            See all features in action with our live demo
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10 flex items-center">
              Experience the Revolution
              <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
