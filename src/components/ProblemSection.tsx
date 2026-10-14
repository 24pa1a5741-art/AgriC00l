import React from 'react';
import { AlertTriangle, TrendingDown, Warehouse, Flame } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Post-Harvest Bottleneck</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Good produce shouldn't go to waste.
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Small farmers and vendors often have to sell produce quickly because affordable cold storage is unavailable nearby. When sales are delayed, fruits and vegetables lose quality, forcing them to accept lower prices or face spoilage.
          </p>
        </div>

        {/* Visual Flow: Harvest -> No Storage -> Quality Drops -> Lower Price / Waste */}
        <div className="mt-12 mb-14 max-w-4xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 text-center sm:text-left">
              The Current Reality for Small Farmers:
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              
              {/* Step 1 */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-2xs">
                <div className="text-2xl mb-1">🍅</div>
                <div className="text-sm font-bold text-slate-900">1. Harvest</div>
                <div className="text-xs text-slate-500 mt-1">Freshly picked peak produce</div>
              </div>

              {/* Arrow */}
              <div className="flex sm:hidden justify-center text-slate-400">↓</div>

              {/* Step 2 */}
              <div className="bg-red-50/70 p-4 rounded-xl border border-red-200 text-center shadow-2xs">
                <div className="text-2xl mb-1">🚫</div>
                <div className="text-sm font-bold text-red-900">2. No Storage</div>
                <div className="text-xs text-red-700 mt-1">No nearby cold rooms available</div>
              </div>

              {/* Arrow */}
              <div className="flex sm:hidden justify-center text-slate-400">↓</div>

              {/* Step 3 */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-center shadow-2xs">
                <div className="text-2xl mb-1">📉</div>
                <div className="text-sm font-bold text-amber-900">3. Quality Drops</div>
                <div className="text-xs text-amber-800 mt-1">Heat causes rapid softening & rot</div>
              </div>

              {/* Arrow */}
              <div className="flex sm:hidden justify-center text-slate-400">↓</div>

              {/* Step 4 */}
              <div className="bg-red-100 p-4 rounded-xl border border-red-300 text-center shadow-2xs">
                <div className="text-2xl mb-1">💸</div>
                <div className="text-sm font-bold text-red-950">4. Lower Price / Waste</div>
                <div className="text-xs text-red-800 mt-1">Distress sales or total loss</div>
              </div>

            </div>
          </div>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Limited Storage */}
          <div className="agri-card p-6 bg-white border border-slate-200 hover:border-red-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <Warehouse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Limited Storage</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Existing commercial cold rooms are typically situated 30–60 km away in large industrial zones. They require high minimum volume commitments (hundreds of tons) and rigid seasonal contracts that small farmers cannot afford.
            </p>
          </div>

          {/* Card 2: Forced Low-Price Selling */}
          <div className="agri-card p-6 bg-white border border-slate-200 hover:border-amber-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Forced Low-Price Selling</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              When harvest arrives at local mandis at the same time, oversupply causes market prices to drop sharply. Without a way to safely hold produce for 2–4 days, farmers are forced to liquidate at distress prices to middle-men.
            </p>
          </div>

          {/* Card 3: Produce Spoilage */}
          <div className="agri-card p-6 bg-white border border-slate-200 hover:border-red-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Produce Spoilage</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Under high ambient temperatures (often 32°C–38°C in coastal Andhra and Telangana), fresh tomatoes, bananas, and greens deteriorate within 48 to 72 hours, resulting in devastating loss of weight, quality, and hard-earned income.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
