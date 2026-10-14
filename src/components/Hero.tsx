import React from 'react';
import {
  Sun,
  Truck,
  Package,
  Thermometer,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-white via-emerald-50/30 to-slate-50">
      {/* Decorative background sun & grid glow */}
      <div className="absolute top-0 right-1/4 -translate-y-12 translate-x-12 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 -translate-x-12 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag & Regional Presence */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Decentralized Cold Hubs in Andhra Pradesh & Telangana</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bhimavaram • Vijayawada • Guntur • Hyderabad</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-emerald-700 font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                Affordable Solar Cold Storage & Local Delivery
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Your harvest deserves <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800">
                  more time.
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Affordable solar-powered cold storage for farmers and small produce vendors. 
              <strong className="text-slate-800 font-semibold"> Pay only for the crates and days you use.</strong>
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero capital expenditure or lock-in</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Solar-powered off-grid reliability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Local doorstep pickup & market delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Avoid forced distress selling at mandis</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => {
                  setCurrentView('book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-700/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
              >
                <span>Book Storage</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setCurrentView('how-it-works');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-6 py-3.5 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2"
              >
                <span>How It Works</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4 px-2 py-2 flex items-center justify-center gap-1"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Demo Dashboard (Sirisha)</span>
              </button>
            </div>

            {/* Fast Rate Callout */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-500">
              <span className="font-bold text-slate-900 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                ₹500 / crate-day
              </span>
              <span>• Prototype pricing for demonstration & validation</span>
            </div>

          </div>

          {/* Right Column: Visual Container with Decentralized Modular Unit */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              
              {/* Actual Generated Image of Modular Solar Cold Room & Pickup */}
              <img
                src="/images/hero-unit.jpg"
                alt="AgriCool modular solar-powered micro cold storage unit with produce crates and pickup van"
                className="w-full h-[380px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-102"
              />

              {/* Overlay Gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

              {/* Top pill badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <div className="bg-emerald-950/80 backdrop-blur-md text-emerald-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Modular Solar Cold Pod</span>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md text-sky-300 text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg border border-sky-500/30 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-sky-400" />
                  <span>4.0°C Active</span>
                </div>
              </div>

              {/* Bottom Info Card inside Visual */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg text-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      <Truck className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Bhimavaram Farm Hub</div>
                      <div className="text-[11px] text-slate-500">Pickups dispatched via Electric Cargo</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Decentralized
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Not an industrial warehouse</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-5 -left-4 bg-white p-3 rounded-xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">100% Crate-Wise Accounting</div>
                <div className="text-[11px] text-slate-500">Pay only for crates & days stored</div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Trust/Value Cards below the hero */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Pay Per Crate */}
            <div className="agri-card p-5 bg-white border border-slate-200 hover:border-emerald-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Pay Per Crate</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No expensive long-term contracts. Rent space for 5 or 50 crates with flexible daily pricing.
              </p>
            </div>

            {/* Card 2: Solar Powered */}
            <div className="agri-card p-5 bg-white border border-slate-200 hover:border-amber-300">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Solar Powered</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Lower dependence on conventional electricity. Clean rooftop solar with thermal battery backup.
              </p>
            </div>

            {/* Card 3: Local Pickup */}
            <div className="agri-card p-5 bg-white border border-slate-200 hover:border-emerald-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Local Pickup</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Request convenient pickup and delivery directly from your farm gate or mandi stall.
              </p>
            </div>

            {/* Card 4: Temperature Monitored */}
            <div className="agri-card p-5 bg-white border border-slate-200 hover:border-sky-300">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <Thermometer className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Temperature Monitored</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Keep storage conditions visible 24/7 with digital sensors and planned IoT threshold alerts.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
