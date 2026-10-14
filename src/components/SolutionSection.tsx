import React from 'react';
import {
  MapPin,
  Package,
  ThermometerSnowflake,
  Truck,
  ArrowRight,
  Sun,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SolutionSection: React.FC = () => {
  const { setCurrentView } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Select location',
      desc: 'Pick your nearest decentralized solar cold hub in Bhimavaram, Vijayawada, Guntur, or Hyderabad.',
      icon: MapPin,
    },
    {
      num: '02',
      title: 'Choose crates & duration',
      desc: 'Reserve exactly the capacity you need—from 5 crates to 50 crates, for 1 day to 14 days.',
      icon: Package,
    },
    {
      num: '03',
      title: 'Store your produce',
      desc: 'Produce is placed in clean, modular solar cold rooms maintained at optimal temperature (3°C - 5°C).',
      icon: ThermometerSnowflake,
    },
    {
      num: '04',
      title: 'Pick up or request delivery',
      desc: 'Retrieve your crates anytime or request electric cargo van delivery directly to your buyer or market stall.',
      icon: Truck,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>The AgriCool Solution</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cold storage, made accessible.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            AgriCool provides modular solar-powered cold storage close to where produce is collected and sold. Customers can reserve storage by crate and pay according to actual usage.
          </p>
        </div>

        {/* 4-Step Process Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="agri-card p-6 bg-white border border-slate-200 hover:border-emerald-400 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-emerald-600/30 font-mono">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Feature banner with interior image & Try Demo CTA */}
        <div className="mt-14 bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-bold uppercase tracking-wide border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Decentralized Micro-Hub Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Near the farm gate. Powered by the sun.
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                By deploying localized 100-crate solar pods right at market collection yards and village transit points, farmers avoid costly 40km transport trips and can hold harvested produce until prices recover.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setCurrentView('book');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Try the Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentView('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl border border-white/20 transition-all"
                >
                  Detailed 6-Step Guide
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl">
                <img
                  src="/images/interior.jpg"
                  alt="Inside AgriCool modular cold room with crates of tomatoes and IoT temperature monitor"
                  className="w-full h-56 sm:h-64 object-cover"
                />
                <div className="bg-slate-950/90 px-4 py-2.5 text-xs text-emerald-200 flex items-center justify-between">
                  <span>Inside AgriCool Pod: 4.0°C | 78% RH</span>
                  <span className="text-[11px] text-amber-300 font-mono">Solar Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
