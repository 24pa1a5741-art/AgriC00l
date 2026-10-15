import React, { useState } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { MarketplaceProduce } from '../types';

export const MarketplaceView: React.FC = () => {
  const { marketplaceItems, placeMarketplaceBid } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedItemForBid, setSelectedItemForBid] = useState<MarketplaceProduce | null>(null);
  const [bidPrice, setBidPrice] = useState<number>(30);
  const [bidCrates, setBidCrates] = useState<number>(4);

  const filteredItems = selectedFilter === 'All'
    ? marketplaceItems
    : marketplaceItems.filter((item) => item.produce.toLowerCase() === selectedFilter.toLowerCase());

  const handleOpenBid = (item: MarketplaceProduce) => {
    setSelectedItemForBid(item);
    setBidPrice(item.askingPricePerKg);
    setBidCrates(Math.min(item.cratesAvailable, 4));
  };

  const handleConfirmBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForBid) return;
    placeMarketplaceBid(selectedItemForBid.id, bidPrice, bidCrates);
    setSelectedItemForBid(null);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Farm-to-Buyer Exchange</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Verified Cold-Stored Produce Board
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Buy directly from farmers with pre-cooled verification seals. Bypassing unchilled mandi transit saves 20% spoilage for wholesalers and secures 30% higher margins for growers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
              ⚡ Verified Chill Guarantee Active
            </span>
          </div>
        </div>

        {/* Commodity Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Tomato', 'Banana', 'Chili', 'Leafy vegetables'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Produce Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col group"
            >
              {/* Image & Chill Stamp */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.produce}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-300" />
                    <span>{item.grade}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-xl">
                  <span className="flex items-center gap-1 text-[11px] font-medium">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>Chilled {item.coldStoredHours} hrs</span>
                  </span>
                  <span className="font-bold text-emerald-300 text-[11px]">
                    {item.coolingTemp}°C Held
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{item.hub} Hub</span>
                    </span>
                    <span>~{item.estWeightKg} kg Total</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.variety}
                  </h3>

                  <div className="text-xs text-slate-500 mt-0.5">
                    Farmer: <strong className="text-slate-800">{item.sellerName}</strong>
                  </div>
                </div>

                {/* Pricing row */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Asking Price</span>
                    <div className="text-base font-black text-emerald-800">
                      ₹{item.askingPricePerKg} <span className="text-xs font-normal text-slate-500">/ kg</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Mandi Reference:</span>
                    <span className="line-through text-slate-400">₹{item.marketBenchmarkPricePerKg}/kg</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handleOpenBid(item)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Place Direct Purchase Bid</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for Bidding */}
        {selectedItemForBid && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-emerald-700">Direct Purchase Order</span>
                  <h3 className="text-xl font-bold text-slate-900">{selectedItemForBid.variety}</h3>
                  <p className="text-xs text-slate-500">{selectedItemForBid.hub} Cold Hub • Depositor: {selectedItemForBid.sellerName}</p>
                </div>
                <button
                  onClick={() => setSelectedItemForBid(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmBid} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Bid Price (₹ per kg)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={bidPrice}
                    onChange={(e) => setBidPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-base font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Seller asking price: ₹{selectedItemForBid.askingPricePerKg}/kg
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Number of Crates (Max {selectedItemForBid.cratesAvailable})
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={selectedItemForBid.cratesAvailable}
                    value={bidCrates}
                    onChange={(e) => setBidCrates(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-base font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Net Weight:</span>
                    <strong className="text-slate-900">{bidCrates * 22} kg</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Bid Amount:</span>
                    <strong className="text-emerald-800 text-sm">₹{(bidCrates * 22 * bidPrice).toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-emerald-700/20"
                >
                  Send Purchase Offer to Farmer
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
