import React from 'react';
import {
  Truck,
  Phone,
  BatteryCharging,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FleetTracker: React.FC = () => {
  const { bookings, trackingData, activeBookingId, setActiveBookingId, showToast } = useApp();

  const activeBooking = bookings.find((b) => b.id === activeBookingId) || bookings[0];
  const tracking = activeBooking ? trackingData[activeBooking.id] : undefined;

  const handleCallDriver = (phone?: string, name?: string) => {
    showToast(`Connecting direct line to driver ${name || 'Ramesh'} (${phone || '+91 94402 77119'})...`, 'info');
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Decentralized First & Last Mile</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Electric Cold-Cargo Fleet & Live Tracking
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Solar-charged electric cargo vans equipped with temperature-controlled insulated chambers. Seamless farm-gate pickup to cold hub inwarding.
            </p>
          </div>

          {/* Booking selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Track Consignment:</span>
            <select
              value={activeBookingId}
              onChange={(e) => setActiveBookingId(e.target.value)}
              className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            >
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} — {b.produce} ({b.crates} Crates, {b.location})
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeBooking && tracking ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Live Route Map Simulation & Vehicle Telemetry */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Visual Logistics Map Graphic */}
              <div className="relative bg-slate-900 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl border border-slate-800">
                {/* Background radar grid */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                      Live Telemetry • GPS Active
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Booking: {activeBooking.id}
                  </span>
                </div>

                {/* Simulated Road Route Map */}
                <div className="relative z-10 py-6 sm:py-10">
                  <div className="relative flex items-center justify-between">
                    
                    {/* Road line */}
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 w-3/4 animate-pulse" />
                    </div>

                    {/* Point 1: Farm Gate */}
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-600/40 border-2 border-emerald-400">
                        🌱
                      </div>
                      <span className="text-xs font-bold mt-2 text-white">Farm Gate</span>
                      <span className="text-[10px] text-slate-400">Bhimavaram Rural</span>
                    </div>

                    {/* Point 2: EV Cargo Van (Live position) */}
                    <div className="relative z-10 text-center flex flex-col items-center animate-bounce">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xl shadow-amber-500/50 border-2 border-white">
                        <Truck className="w-7 h-7 text-slate-950" />
                      </div>
                      <span className="text-xs font-black text-amber-300 mt-2">EV Cargo #4022</span>
                      <span className="text-[10px] font-semibold text-emerald-300">Temp: 4.1°C</span>
                    </div>

                    {/* Point 3: Cold Hub Vault */}
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 text-emerald-400 flex items-center justify-center font-bold shadow-lg border-2 border-slate-700">
                        ❄️
                      </div>
                      <span className="text-xs font-bold mt-2 text-white">Cold Hub #01</span>
                      <span className="text-[10px] text-slate-400">Solar Micro-Vault</span>
                    </div>

                    {/* Point 4: Urban Terminal / Market */}
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 text-sky-400 flex items-center justify-center font-bold shadow-lg border-2 border-slate-700">
                        🛒
                      </div>
                      <span className="text-xs font-bold mt-2 text-white">Rythu Bazaar</span>
                      <span className="text-[10px] text-slate-400">Wholesale Stalls</span>
                    </div>

                  </div>
                </div>

                {/* Live Van Metrics Footer */}
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800 pt-5 mt-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Vehicle Reg</span>
                    <strong className="text-white font-mono">{tracking.vehicleNumber || 'AP 37 TB 4022'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Chamber Temp</span>
                    <strong className="text-emerald-400">4.1°C (Active Chill)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">EV Battery</span>
                    <strong className="text-white flex items-center gap-1">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                      {tracking.batteryPercent || 88}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Arrival</span>
                    <strong className="text-amber-300">
                      {tracking.etaMinutes ? `${tracking.etaMinutes} mins` : 'Arrived at Hub'}
                    </strong>
                  </div>
                </div>

              </div>

              {/* Driver Contact & Consignment Details */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 text-xl font-black">
                    👨‍✈️
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Designated EV Logistics Pilot</span>
                    <h4 className="text-base font-bold text-slate-900">{tracking.driverName || 'Ramesh Babu'}</h4>
                    <p className="text-xs text-slate-500">{tracking.vehicleType || 'Piaggio E-Cargo Van (Refrigerated)'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleCallDriver(tracking.driverPhone, tracking.driverName)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Driver</span>
                  </button>
                  <button
                    onClick={() => showToast(`SMS dispatch alert resent to ${tracking.driverPhone}`, 'info')}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Send Directions
                  </button>
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Step-by-Step Chain of Custody Timeline */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Chain of Custody & Audit Log</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    FSSAI Sealed
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Immutable milestone logs for produce pickup, inwarding, and staging.
                </p>
              </div>

              {/* Inwarding Milestones */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Pickup & Inward Timeline
                </span>

                <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {tracking.pickupTimeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 pl-1 text-xs">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.status === 'completed'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : step.status === 'current'
                          ? 'bg-amber-500 text-slate-900 ring-4 ring-amber-100 font-bold'
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {step.status === 'completed' ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className={`font-bold ${
                            step.status === 'current' ? 'text-amber-800' : 'text-slate-900'
                          }`}>
                            {step.title}
                          </strong>
                          {step.timestamp && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              {step.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 mt-0.5 leading-relaxed">{step.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery / Outward Staging */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Outward Delivery Staging
                </span>

                <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {tracking.deliveryTimeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 pl-1 text-xs">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : step.status === 'current'
                          ? 'bg-amber-500 text-slate-900 ring-4 ring-amber-100 font-bold'
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {step.status === 'completed' ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900 font-bold">{step.title}</strong>
                          {step.timestamp && (
                            <span className="text-[10px] text-slate-400">{step.timestamp}</span>
                          )}
                        </div>
                        <p className="text-slate-500 mt-0.5 leading-relaxed">{step.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500">
            No tracking data found for this booking.
          </div>
        )}

      </div>
    </section>
  );
};
