import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Package,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ProduceType } from '../types';

interface ProducePreset {
  name: ProduceType;
  emoji: string;
  kgPerCrate: number;
  distressPricePerKg: number;
  peakPricePerKg: number;
  optimalHoldingDays: number;
}

const PRODUCE_PRESETS: Record<string, ProducePreset> = {
  Tomato: {
    name: 'Tomato',
    emoji: '🍅',
    kgPerCrate: 22,
    distressPricePerKg: 12,
    peakPricePerKg: 32,
    optimalHoldingDays: 3,
  },
  Mango: {
    name: 'Mango',
    emoji: '🥭',
    kgPerCrate: 20,
    distressPricePerKg: 35,
    peakPricePerKg: 75,
    optimalHoldingDays: 5,
  },
  Banana: {
    name: 'Banana',
    emoji: '🍌',
    kgPerCrate: 24,
    distressPricePerKg: 14,
    peakPricePerKg: 28,
    optimalHoldingDays: 4,
  },
  'Leafy vegetables': {
    name: 'Leafy vegetables',
    emoji: '🥬',
    kgPerCrate: 15,
    distressPricePerKg: 15,
    peakPricePerKg: 42,
    optimalHoldingDays: 2,
  },
  Chili: {
    name: 'Chili',
    emoji: '🌶️',
    kgPerCrate: 18,
    distressPricePerKg: 28,
    peakPricePerKg: 65,
    optimalHoldingDays: 5,
  },
};

export const RoiCalculator: React.FC = () => {
  const { setCurrentView, showToast } = useApp();

  const [selectedProduce, setSelectedProduce] = useState<string>('Tomato');
  const [crates, setCrates] = useState<number>(8);
  const [days, setDays] = useState<number>(3);

  const preset = PRODUCE_PRESETS[selectedProduce] || PRODUCE_PRESETS.Tomato;

  // Real financial comparison math
  const calculations = useMemo(() => {
    const totalKg = crates * preset.kgPerCrate;
    const storageCost = crates * days * 500; // Prototype formula: ₹500 / crate-day
    const distressRevenue = totalKg * preset.distressPricePerKg;
    const delayedRevenue = totalKg * preset.peakPricePerKg;
    const grossPriceGain = delayedRevenue - distressRevenue;
    const netFarmerProfit = grossPriceGain - storageCost;
    const roiMultiplier = distressRevenue > 0 ? (netFarmerProfit / distressRevenue) * 100 : 0;

    return {
      totalKg,
      storageCost,
      distressRevenue,
      delayedRevenue,
      grossPriceGain,
      netFarmerProfit,
      roiMultiplier: Math.round(roiMultiplier),
    };
  }, [crates, days, preset]);

  const handleBookWithCalculation = () => {
    showToast(`Loaded ${crates} crates of ${selectedProduce} (${days} days) into booking studio`, 'info');
    setCurrentView('book');
  };

  return (
    <section className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Anti-Distress Selling Economics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Harvest Profit Surge
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            See exactly how much more you earn by holding produce in solar cold storage until wholesale prices rebound, instead of forced selling at the farm gate.
          </p>
        </div>

        {/* Main interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 6 Cols: Interactive Sliders & Presets */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            
            {/* Commodity Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                1. Select Commodity / Harvest Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(PRODUCE_PRESETS).map((key) => {
                  const p = PRODUCE_PRESETS[key];
                  const isSelected = selectedProduce === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedProduce(key);
                        setDays(p.optimalHoldingDays);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-xs text-slate-900 font-bold'
                          : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                      }`}
                    >
                      <div className="text-xl mb-1">{p.emoji}</div>
                      <div className="text-xs font-bold">{p.name}</div>
                      <div className="text-[10px] text-slate-400">~{p.kgPerCrate} kg/crate</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Crates Slider */}
            <div className="space-y-2 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span>Harvest Volume (Crates)</span>
                </span>
                <span className="text-base font-black text-slate-900 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl">
                  {crates} Crates ({calculations.totalKg} kg)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={crates}
                onChange={(e) => setCrates(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                <span>1 Crate (20 kg)</span>
                <span>25 Crates</span>
                <span>50 Crates (1 Ton)</span>
              </div>
            </div>

            {/* Storage Duration Slider */}
            <div className="space-y-2 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Holding Duration (Days)</span>
                </span>
                <span className="text-base font-black text-slate-900 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl">
                  {days} Days (@ ₹500/crate-day)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={14}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                <span>1 Day (Overnight)</span>
                <span>7 Days (Weekly Peak)</span>
                <span>14 Days (Max)</span>
              </div>
            </div>

            {/* Transparent Rate Card Notice */}
            <div className="text-xs text-slate-500 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Standard AgriCool Prototype Rate: Flat <strong>₹500 per crate per day</strong>. No contracts or exit fees.</span>
            </div>

          </div>

          {/* Right 6 Cols: Financial Breakdown & Return on Investment */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Economic Outcome
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  Distress Selling vs. AgriCool Cold Hold
                </h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full">
                +{calculations.roiMultiplier}% ROI
              </span>
            </div>

            {/* Comparative Breakdown Columns */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Option A: Distress selling */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <span className="text-[10px] uppercase font-bold text-red-400 block">
                  Scenario A: Forced Distress Sale
                </span>
                <div className="text-2xl font-black text-slate-200">
                  ₹{calculations.distressRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sold immediately at mandi glut rate of ₹{preset.distressPricePerKg}/kg to avoid rotting.
                </p>
              </div>

              {/* Option B: AgriCool delayed sale */}
              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-500/40 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                  Scenario B: AgriCool Delayed Sale
                </span>
                <div className="text-2xl font-black text-emerald-300">
                  ₹{calculations.delayedRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-emerald-100/75 leading-relaxed">
                  Sold at rebound wholesale price of ₹{preset.peakPricePerKg}/kg after {days} days of chilling.
                </p>
              </div>

            </div>

            {/* Calculations math strip */}
            <div className="space-y-2 text-xs border-y border-slate-800 py-4">
              <div className="flex justify-between text-slate-300">
                <span>Gross Market Value Increase:</span>
                <span className="font-bold text-white">+₹{calculations.grossPriceGain.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Less: AgriCool Storage Fee ({crates} crates × {days} days × ₹500):</span>
                <span className="font-bold text-red-300">-₹{calculations.storageCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Net Gain Big Hero Metric */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-5 rounded-2xl shadow-lg shadow-emerald-700/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold text-emerald-100 block">
                  Net Farmer Profit Surge
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-0.5">
                  ₹{calculations.netFarmerProfit > 0 ? `+${calculations.netFarmerProfit.toLocaleString('en-IN')}` : '₹0'}
                </div>
                <span className="text-[11px] text-emerald-100 mt-1 block">
                  Net cash gain into your pocket after deducting all cold storage fees!
                </span>
              </div>
              <div className="text-3xl">💰</div>
            </div>

            {/* Call to action */}
            <button
              onClick={handleBookWithCalculation}
              className="w-full py-4 bg-white hover:bg-emerald-50 text-emerald-950 font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm group"
            >
              <span>Reserve {crates} Crates Now in Bhimavaram / Nearby Hub</span>
              <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
