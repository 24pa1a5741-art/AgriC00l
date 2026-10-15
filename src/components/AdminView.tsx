import React from 'react';
import {
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminView: React.FC = () => {
  const { storageUnits, notifications, showToast } = useApp();

  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              <span>Platform Systems Command</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              AgriCool Regional Cold Operations
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Centralized telemetry, solar microgrid balance, customer reconciliation, and chamber uptime monitoring across Andhra Pradesh & Telangana.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              ● All 4 Hubs In Normal Range
            </span>
          </div>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Pilot Bookings</span>
            <div className="text-3xl font-black text-white mt-1">344</div>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-1">+18 today across 4 hubs</span>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Pilot Revenue</span>
            <div className="text-3xl font-black text-emerald-400 mt-1">₹4.8L</div>
            <span className="text-[11px] text-slate-400 font-semibold block mt-1">Direct pay-per-crate billings</span>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Capacity Utilization</span>
            <div className="text-3xl font-black text-white mt-1">68.4%</div>
            <span className="text-[11px] text-amber-400 font-semibold block mt-1">335 / 520 crates occupied</span>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Solar Clean Energy</span>
            <div className="text-3xl font-black text-amber-300 mt-1">40.9 kW</div>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-1">14.8 Tons CO2 Offset</span>
          </div>
        </div>

        {/* Hub Micro-Vault Status Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Decentralized Cold Hub Grid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {storageUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-base font-bold text-white">{unit.name}</strong>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    unit.status === 'Normal' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {unit.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{unit.hub} Hub • {unit.solarStatus}</div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-slate-900/60 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Temperature</span>
                    <strong className="text-emerald-400">{unit.temperature}°C</strong>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Humidity</span>
                    <strong className="text-cyan-400">{unit.humidity}%</strong>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Solar Power</span>
                    <strong className="text-amber-400">{unit.solarPowerKw} kW</strong>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Occupied</span>
                    <strong className="text-white">{unit.occupiedCrates}/{unit.capacityCrates}</strong>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Calibrated IoT telemetry for ${unit.name}`, 'info')}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-xs font-semibold rounded-xl text-slate-200 transition-colors"
                >
                  Calibrate Sensors
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity & Notifications Log */}
        <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <h3 className="font-bold text-white text-base">Live Activity & Telemetry Alerts</h3>
            <span className="text-xs text-slate-400">{notifications.length} events logged today</span>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white block font-bold">{n.title}</strong>
                    <p className="text-slate-400 mt-0.5">{n.description}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">{n.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
