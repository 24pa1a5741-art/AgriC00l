import React, { useState } from 'react';
import {
  Thermometer,
  Droplets,
  Sun,
  BatteryCharging,
  CheckCircle2,
  RotateCcw,
  Activity,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { StorageUnit } from '../types';

export const IotChamberMonitoring: React.FC = () => {
  const { storageUnits, updateStorageUnit, currentUser, showToast } = useApp();
  const [selectedUnitId, setSelectedUnitId] = useState<string>(storageUnits[0]?.id || 'unit-a');

  const selectedUnit = storageUnits.find((u) => u.id === selectedUnitId) || storageUnits[0];

  const handleAdjustTemp = (delta: number) => {
    if (!selectedUnit) return;
    const newTemp = Math.round((selectedUnit.temperature + delta) * 10) / 10;
    updateStorageUnit(selectedUnit.id, {
      temperature: newTemp,
      targetTemp: newTemp,
    });
  };

  const handleToggleCooling = (status: StorageUnit['coolingStatus']) => {
    if (!selectedUnit) return;
    updateStorageUnit(selectedUnit.id, { coolingStatus: status });
  };

  const handleToggleDoor = () => {
    if (!selectedUnit) return;
    const nextDoor = selectedUnit.doorSensor === 'Closed' ? 'Open' : 'Closed';
    updateStorageUnit(selectedUnit.id, { doorSensor: nextDoor });
    if (nextDoor === 'Open') {
      showToast(`Warning: Chamber ${selectedUnit.name} door opened. Chilled air seal broken!`, 'warning');
    } else {
      showToast(`Chamber ${selectedUnit.name} door sealed airtight.`, 'success');
    }
  };

  const isOperatorOrAdmin = currentUser?.role === 'Operator' || currentUser?.role === 'Admin';

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-Time IoT Chamber Telemetry</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Solar Cold Rooms & Micro-Vaults
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              24/7 automated climate monitoring across decentralised agricultural hubs. Sensors track pulp temperature, relative humidity, ethylene gas, and solar power.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Live Sensor Sync (10s)</span>
            </span>
          </div>
        </div>

        {/* Hub Selector Pills */}
        <div className="flex flex-wrap gap-2.5">
          {storageUnits.map((unit) => {
            const isSelected = unit.id === selectedUnitId;
            return (
              <button
                key={unit.id}
                onClick={() => setSelectedUnitId(unit.id)}
                className={`px-4 py-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-700 text-white shadow-lg shadow-emerald-700/25 ring-2 ring-emerald-600/30'
                    : 'border-slate-200 bg-white hover:border-emerald-300 text-slate-700 hover:bg-emerald-50/40 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-bold uppercase tracking-wider opacity-80">
                    {unit.hub} Hub
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {unit.temperature}°C
                  </span>
                </div>
                <div className="text-sm font-extrabold mt-1">{unit.name}</div>
                <div className="text-[11px] opacity-75 mt-0.5">
                  Occupancy: {unit.occupiedCrates} / {unit.capacityCrates} crates ({Math.round((unit.occupiedCrates / unit.capacityCrates) * 100)}%)
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Chamber Panel */}
        {selectedUnit && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Live Gauges & Controls */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Primary Gauge Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Temperature Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chamber Temp</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Thermometer className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {selectedUnit.temperature}°C
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span>Target: {selectedUnit.targetTemp}°C</span>
                    <span className="text-emerald-700 font-bold">Stable ±0.2°</span>
                  </div>
                </div>

                {/* Humidity Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relative Humidity</span>
                    <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                      <Droplets className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {selectedUnit.humidity}%
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span>Misting: Active</span>
                    <span className="text-cyan-700 font-bold">Anti-wilt</span>
                  </div>
                </div>

                {/* Solar Generation Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Solar Array</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Sun className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {selectedUnit.solarPowerKw} <span className="text-base font-bold text-slate-500">kW</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span>Roof: Monocrystalline</span>
                    <span className="text-amber-600 font-bold">100% Green</span>
                  </div>
                </div>

                {/* Battery Bank Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">LiFePO4 Reserve</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <BatteryCharging className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {selectedUnit.batteryReserveKwh} <span className="text-base font-bold text-slate-500">kWh</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span>Autonomy: 36 hrs</span>
                    <span className="text-emerald-700 font-bold">Backup Safe</span>
                  </div>
                </div>

              </div>

              {/* 24-Hour Temperature Curve Sparkline */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">24-Hour Continuous Temperature Audit (°C)</h3>
                    <p className="text-xs text-slate-500">No thermal breaches detected over previous holding cycle</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    Complies with FSSAI Cold Chain Norms
                  </span>
                </div>

                {/* Visual SVG Sparkline */}
                <div className="h-32 w-full pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="500" y2="50" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />

                    {/* Area fill */}
                    <path
                      d="M 0,55 Q 70,52 140,50 T 280,48 T 420,53 T 500,50 L 500,100 L 0,100 Z"
                      fill="url(#tempGradient)"
                    />
                    {/* Trend line */}
                    <path
                      d="M 0,55 Q 70,52 140,50 T 280,48 T 420,53 T 500,50"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />
                    {/* Points */}
                    <circle cx="140" cy="50" r="4" fill="#059669" className="animate-ping" />
                    <circle cx="140" cy="50" r="3" fill="#ffffff" stroke="#059669" strokeWidth="2" />
                    <circle cx="280" cy="48" r="3" fill="#ffffff" stroke="#059669" strokeWidth="2" />
                    <circle cx="420" cy="53" r="3" fill="#ffffff" stroke="#059669" strokeWidth="2" />
                    <circle cx="500" cy="50" r="4" fill="#059669" />
                  </svg>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3 mt-2">
                  <span>00:00 (Midnight)</span>
                  <span>06:00 (Dawn)</span>
                  <span>12:00 (Peak Sun)</span>
                  <span>18:00 (Sunset)</span>
                  <span>Current (Active Now)</span>
                </div>
              </div>

              {/* Gas & Environment Sensors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Ethylene Gas Filter</span>
                  <div className="text-xl font-bold text-slate-800 mt-1">{selectedUnit.ethylenePpm} ppm</div>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">● Ripening Inhibited</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Air Seal Sensor</span>
                  <div className="text-xl font-bold text-slate-800 mt-1">{selectedUnit.doorSensor}</div>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">Magnetic Gasket</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Cooling Mode</span>
                  <div className="text-xl font-bold text-emerald-700 mt-1">{selectedUnit.coolingStatus}</div>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">Inverter Compressor</span>
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Interactive Chamber Controls */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">IoT Chamber Controls</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {isOperatorOrAdmin ? 'Operator Access' : 'Demo Control'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust target cooling thresholds or simulate chamber operations.
                </p>
              </div>

              {/* Setpoint temperature slider / nudge */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Target Setpoint (°C)</span>
                  <span className="font-black text-emerald-700 text-sm">{selectedUnit.targetTemp}°C</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjustTemp(-0.5)}
                    className="flex-1 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl text-xs border border-slate-200 transition-colors"
                  >
                    -0.5°C
                  </button>
                  <button
                    onClick={() => handleAdjustTemp(0.5)}
                    className="flex-1 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl text-xs border border-slate-200 transition-colors"
                  >
                    +0.5°C
                  </button>
                  <button
                    onClick={() => updateStorageUnit(selectedUnit.id, { temperature: 4.0, targetTemp: 4.0 })}
                    className="p-2 bg-white hover:bg-slate-100 text-slate-600 rounded-xl text-xs border border-slate-200"
                    title="Reset to 4.0°C"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cooling Cycle Modes */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Compressor Cycle Mode
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(['Optimal', 'Chilling', 'Defrosting', 'Standby'] as StorageUnit['coolingStatus'][]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleToggleCooling(mode)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        selectedUnit.coolingStatus === mode
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-2xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Door Sensor Toggle Simulation */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Magnetic Chamber Door</span>
                    <span className="text-slate-500 text-[11px]">Currently: {selectedUnit.doorSensor}</span>
                  </div>
                  <button
                    onClick={handleToggleDoor}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                      selectedUnit.doorSensor === 'Open'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    {selectedUnit.doorSensor === 'Open' ? 'Seal Door' : 'Open Door'}
                  </button>
                </div>
              </div>

              {/* Facility Information */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 text-xs space-y-1.5 text-slate-700">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Solar Hybrid Inverter Operational</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Automatically balances direct solar DC coupling during daylight hours and seamlessly switches to modular LiFePO4 batteries during night periods.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
