import React from 'react';
import {
  Truck,
  Printer,
  Activity,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    bookings,
    setActiveBookingId,
    requestPickup,
    requestDelivery,
    setReceiptModalBooking,
    setCurrentView,
  } = useApp();

  const userBookings = bookings.filter((b) => {
    if (!currentUser) return true;
    if (currentUser.role === 'Admin' || currentUser.role === 'Operator') return true;
    return b.customerName.toLowerCase().includes(currentUser.name.split(' ')[0].toLowerCase()) || b.id === 'AC-1024';
  });

  const totalCratesStored = userBookings.reduce((sum, b) => sum + (b.status !== 'Completed' ? b.crates : 0), 0);

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Identity Welcome Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'}
              alt={currentUser?.name || 'User'}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider bg-white/20 text-emerald-100 px-2.5 py-0.5 rounded-full">
                  {currentUser?.role || 'Farmer'} Account
                </span>
                <span className="text-xs text-emerald-200">● {currentUser?.location} Cluster</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {currentUser?.name || 'Sirisha Kakarla'}’s Storage Cockpit
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5">
                {currentUser?.farmOrBusinessName || 'Godavari Bio-Green Farms'} • Wallet Balance: ₹{(currentUser?.walletBalance || 24500).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('book')}
              className="px-5 py-3 bg-white text-emerald-900 hover:bg-emerald-50 font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>Book New Crates</span>
            </button>
            <button
              onClick={() => setCurrentView('monitoring')}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Activity className="w-4 h-4 text-amber-300" />
              <span>Chamber IoT</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Stored Crates</span>
            <div className="text-3xl font-black text-slate-900 mt-1">{totalCratesStored} <span className="text-sm font-bold text-slate-400">crates</span></div>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">~{totalCratesStored * 22} kg produce protected</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Est. Spoilage Loss Avoided</span>
            <div className="text-3xl font-black text-emerald-700 mt-1">₹34,200</div>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Calculated vs distress rate</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avg. Storage Condition</span>
            <div className="text-3xl font-black text-slate-900 mt-1">4.0°C</div>
            <span className="text-[11px] text-cyan-600 font-semibold block mt-1">79% RH (Optimal Freshness)</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
            <div className="text-3xl font-black text-slate-900 mt-1">{userBookings.length}</div>
            <span className="text-[11px] text-slate-500 font-semibold block mt-1">Lifetime pay-per-use</span>
          </div>
        </div>

        {/* Consignment Bookings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Consignments & Cold Vaults</h2>
              <p className="text-xs text-slate-500">Real-time status, temperature logs, and warehouse deposit receipts</p>
            </div>
          </div>

          <div className="space-y-4">
            {userBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black text-base border border-emerald-200">
                      {b.produce === 'Tomato' ? '🍅' : b.produce === 'Banana' ? '🍌' : b.produce === 'Chili' ? '🌶️' : '🥬'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-base font-bold text-slate-900">{b.id}</strong>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {b.status}
                        </span>
                        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                          {b.batchCode}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {b.crates} Crates of {b.produce} • {b.storageUnit} ({b.location} Hub)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReceiptModalBooking(b)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Receipt (WDR)</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveBookingId(b.id);
                        setCurrentView('tracking');
                      }}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Logistics</span>
                    </button>
                  </div>
                </div>

                {/* Metrics pill strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">Chamber Temperature</span>
                    <strong className="text-slate-900 text-sm">{b.temperature}°C</strong>
                    <span className="text-[10px] text-emerald-600 block">±0.2° automated chill</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">Humidity Level</span>
                    <strong className="text-slate-900 text-sm">{b.humidity}%</strong>
                    <span className="text-[10px] text-cyan-600 block">Ultrasonic misting</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">Duration & Rate</span>
                    <strong className="text-slate-900 text-sm">{b.durationDays} Days</strong>
                    <span className="text-[10px] text-slate-500 block">₹{b.totalAmount.toLocaleString('en-IN')} total</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">Estimated Shelf Life</span>
                    <strong className="text-emerald-700 text-sm">+{b.shelfLifeRemainingDays || 12} Days Safe</strong>
                    <span className="text-[10px] text-slate-500 block">Quality certified</span>
                  </div>
                </div>

                {/* Logistics Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-slate-500 italic max-w-xl">
                    "{b.notes}"
                  </p>

                  <div className="flex items-center gap-2">
                    {b.pickupRequired && (
                      <button
                        onClick={() => requestPickup(b.id)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                      >
                        Request EV Pickup
                      </button>
                    )}
                    <button
                      onClick={() => requestDelivery(b.id)}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Dispatch to Market
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
