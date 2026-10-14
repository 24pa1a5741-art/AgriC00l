import React from 'react';
import {
  MapPin,
  Package,
  Calendar,
  Calculator,
  CheckCircle,
  Truck,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { setCurrentView } = useApp();

  const steps = [
    {
      step: 'Step 1',
      title: 'Choose your location',
      subtitle: 'Decentralized Cold Hub Selection',
      desc: 'Select from established micro-hubs in Bhimavaram, Vijayawada, Guntur, Hyderabad, or request a collection point near your village.',
      icon: MapPin,
      badge: 'Local Hubs',
      color: 'emerald',
    },
    {
      step: 'Step 2',
      title: 'Select number of crates',
      subtitle: 'Flexible Capacity',
      desc: 'Enter the exact crate count you wish to store. Standard crates hold 20–25 kg of tomatoes, bananas, greens, or mangoes.',
      icon: Package,
      badge: 'Pay Per Crate',
      color: 'amber',
    },
    {
      step: 'Step 3',
      title: 'Choose storage duration',
      subtitle: 'Daily Granularity',
      desc: 'Decide how many days to store—whether 1 night to bridge market days, 3 days to bypass a price crash, or up to 2 weeks.',
      icon: Calendar,
      badge: 'No Lock-ins',
      color: 'sky',
    },
    {
      step: 'Step 4',
      title: 'Review estimated price',
      subtitle: 'Transparent Calculation',
      desc: 'Live formula: Crates × Days × ₹500/crate-day. Add optional doorstep electric cargo pickup/delivery if required.',
      icon: Calculator,
      badge: '₹500 / crate-day',
      color: 'emerald',
    },
    {
      step: 'Step 5',
      title: 'Confirm booking',
      subtitle: 'Instant Reservation',
      desc: 'Receive your unique Booking ID (e.g. AC-1024), assigned cold room unit, and digital storage receipt immediately.',
      icon: CheckCircle,
      badge: 'Instant ID',
      color: 'amber',
    },
    {
      step: 'Step 6',
      title: 'Track storage and pickup/delivery',
      subtitle: 'Live Sensor & Logistics Visibility',
      desc: 'Monitor cold room temperature & humidity from your phone, and follow our electric delivery vehicle in real time.',
      icon: Truck,
      badge: 'Live Tracking',
      color: 'sky',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Simple 6-Step Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How AgriCool Works
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From field harvest to market sale, AgriCool makes cold chain logistics as simple as booking a cab. Built for small farmers and vegetable vendors.
          </p>
        </div>

        {/* 6 Steps Grid with connecting lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="agri-card p-6 sm:p-7 bg-white border border-slate-200 hover:border-emerald-400 relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono">
                      {item.step}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-600 mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Part of the 2-min demo</span>
                  <span className="font-mono font-bold text-slate-700">0{index + 1} / 06</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Try Demo Box */}
        <div className="mt-14 p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Ready to test the booking flow?
            </h4>
            <p className="text-sm text-slate-600">
              Try our prototype booking calculator with sample Andhra Pradesh locations and live price estimation.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('book');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 transform hover:-translate-y-0.5"
          >
            <span>Launch Booking Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
