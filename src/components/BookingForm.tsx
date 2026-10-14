import React, { useState } from 'react';
import {
  Package,
  MapPin,
  Calendar,
  Truck,
  CheckCircle2,
  Calculator,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  ThermometerSnowflake,
  User as UserIcon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { LocationHub, ProduceType, Booking } from '../types';

export const BookingForm: React.FC = () => {
  const { 
    createBooking, 
    setCurrentView, 
    currentUser, 
    setActiveBookingId,
    showToast 
  } = useApp();

  // Form state
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Sirisha');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98480 23456');
  const [location, setLocation] = useState<LocationHub>(currentUser?.location || 'Bhimavaram');
  const [customLocation, setCustomLocation] = useState('');
  const [produce, setProduce] = useState<ProduceType>('Tomato');
  const [customProduce, setCustomProduce] = useState('');
  const [crates, setCrates] = useState<number>(8);
  const [durationDays, setDurationDays] = useState<number>(3);
  const [pickupRequired, setPickupRequired] = useState<boolean>(true);
  const [deliveryRequired, setDeliveryRequired] = useState<boolean>(false);
  const [pickupAddress, setPickupAddress] = useState('Farm Gate, Undi Road, Bhimavaram Rural');
  const [deliveryAddress, setDeliveryAddress] = useState('Rythu Bazaar Stall #12, Market Road');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Price calculations
  const crateRate = 500; // Prototype rate: ₹500 per crate-day
  const storageTotal = crates * durationDays * crateRate;
  
  // Optional logistics demo add-on fees
  const pickupFee = pickupRequired ? 0 : 0; // Keeping base formula exact: Crates × Days × ₹500 as in prompt spec
  const deliveryFee = deliveryRequired ? 0 : 0;
  const grandTotal = storageTotal;

  // Preset quick fill for Demo Pitch
  const handleLoadDemoPreset = () => {
    setCustomerName('Sirisha');
    setPhone('+91 98480 23456');
    setLocation('Bhimavaram');
    setProduce('Tomato');
    setCrates(8);
    setDurationDays(3);
    setPickupRequired(true);
    setDeliveryRequired(false);
    setPickupAddress('Farm Gate, Undi Road, Bhimavaram Rural');
    showToast('Loaded demo parameters: 8 Crates Tomatoes, Bhimavaram, 3 Days = ₹12,000', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (crates <= 0 || durationDays <= 0) {
      showToast('Please specify valid crates and duration', 'warning');
      return;
    }

    const newBooking = createBooking({
      customerName,
      phone,
      location,
      produce,
      customProduce: produce === 'Other' ? customProduce : undefined,
      crates,
      durationDays,
      pickupRequired,
      deliveryRequired,
      pickupAddress: pickupRequired ? pickupAddress : undefined,
      deliveryAddress: deliveryRequired ? deliveryAddress : undefined,
      crateRate,
      logisticsFee: pickupFee + deliveryFee,
      totalAmount: grandTotal,
      notes: `Prototype reservation for ${crates} crates of ${produce} at ${location} hub.`,
    });

    setConfirmedBooking(newBooking);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            <span>Functional Prototype</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reserve Cold Storage by the Crate
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Configure your storage needs below. Live price calculates automatically at the standard prototype rate of ₹500 per crate-day.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={handleLoadDemoPreset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-white border border-emerald-300 hover:bg-emerald-50 px-3 py-1.5 rounded-full shadow-2xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Load Pitch Preset: Sirisha (8 Crates • 3 Days • ₹12,000)</span>
            </button>
          </div>
        </div>

        {/* Confirmation Screen View */}
        {confirmedBooking ? (
          <div className="agri-card bg-white p-6 sm:p-10 border-2 border-emerald-500 shadow-xl rounded-3xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-3 mb-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="prototype-tag text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                Demo Booking Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Booking ID: <span className="text-emerald-700">{confirmedBooking.id}</span>
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Cold storage bay allocated successfully in <strong className="text-slate-900">{confirmedBooking.storageUnit} ({confirmedBooking.location})</strong>.
              </p>
            </div>

            {/* Booking Details Breakdown Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Customer</div>
                  <div className="font-bold text-slate-800">{confirmedBooking.customerName}</div>
                  <div className="text-xs text-slate-500">{confirmedBooking.phone}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">Location Hub</div>
                  <div className="font-bold text-slate-800">{confirmedBooking.location}</div>
                  <div className="text-xs text-emerald-700 font-semibold">{confirmedBooking.storageUnit}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">Produce</div>
                  <div className="font-bold text-slate-800">
                    {confirmedBooking.produce === 'Other' ? confirmedBooking.customProduce : confirmedBooking.produce}
                  </div>
                  <div className="text-xs text-slate-500">Horticultural Grade A</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">Quantity</div>
                  <div className="font-bold text-slate-800 text-base">{confirmedBooking.crates} Crates</div>
                  <div className="text-xs text-slate-500">~{confirmedBooking.crates * 22} kg approx</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">Duration</div>
                  <div className="font-bold text-slate-800 text-base">{confirmedBooking.durationDays} Days</div>
                  <div className="text-xs text-slate-500">Flexible extension available</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">Estimated Amount</div>
                  <div className="font-extrabold text-emerald-700 text-lg">
                    ₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-amber-700 font-medium">Prototype pricing</div>
                </div>
              </div>

              {/* Status and Logistics */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-semibold mb-1">Storage Status</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-emerald-800">{confirmedBooking.status}</span>
                    <span className="text-slate-500 font-mono">({confirmedBooking.temperature}°C / {confirmedBooking.humidity}% RH)</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-semibold mb-1">Pickup / Delivery Status</div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">
                      {confirmedBooking.pickupRequired ? 'Driver Dispatched (Ramesh Babu)' : 'Self-Drop at Hub'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prototype Disclaimer */}
            <div className="mt-6 text-center text-xs text-slate-500 italic max-w-md mx-auto">
              * Note: In this demonstration prototype, no real payment is deducted and simulated telemetry is generated.
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setActiveBookingId(confirmedBooking.id);
                  setCurrentView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>View in Storage Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveBookingId(confirmedBooking.id);
                  setCurrentView('tracking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Track Pickup & Delivery</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto text-slate-600 hover:text-slate-900 font-medium px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Book Another Crate</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Booking Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Form Input */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Farmer / Customer Info */}
                <div className="border-b border-slate-100 pb-5">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-emerald-600" />
                    Customer Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Sirisha"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98480 23456"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Storage Location Hub
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(['Bhimavaram', 'Vijayawada', 'Guntur', 'Hyderabad', 'Other'] as LocationHub[]).map((loc) => (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => setLocation(loc)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between ${
                          location === loc
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>{loc}</span>
                        {location === loc && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {location === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify your village / market yard (e.g. Tenali, Eluru)"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      className="mt-3 w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  )}
                </div>

                {/* Produce Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <ThermometerSnowflake className="w-4 h-4 text-emerald-600" />
                    Produce Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(['Tomato', 'Mango', 'Banana', 'Leafy vegetables', 'Other'] as ProduceType[]).map((prod) => (
                      <button
                        type="button"
                        key={prod}
                        onClick={() => setProduce(prod)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between ${
                          produce === prod
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>{prod}</span>
                        {produce === prod && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {produce === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify produce (e.g. Guava, Capsicum, Green Chillies)"
                      value={customProduce}
                      onChange={(e) => setCustomProduce(e.target.value)}
                      className="mt-3 w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  )}
                </div>

                {/* Number of Crates & Storage Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
                  
                  {/* Crates Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-emerald-600" />
                        Number of Crates
                      </label>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {crates} crates
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCrates(Math.max(1, crates - 1))}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-lg shadow-2xs"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={crates}
                        onChange={(e) => setCrates(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center py-2 font-bold text-lg rounded-xl border border-slate-300 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setCrates(crates + 1)}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-lg shadow-2xs"
                      >
                        +
                      </button>
                    </div>

                    {/* Presets */}
                    <div className="flex gap-1.5 mt-2.5">
                      {[5, 8, 10, 15, 20].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setCrates(preset)}
                          className={`text-xs px-2 py-1 rounded-md font-semibold transition-colors ${
                            crates === preset
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Days Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        Storage Duration (Days)
                      </label>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {durationDays} days
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-lg shadow-2xs"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={durationDays}
                        onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center py-2 font-bold text-lg rounded-xl border border-slate-300 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setDurationDays(durationDays + 1)}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-lg shadow-2xs"
                      >
                        +
                      </button>
                    </div>

                    {/* Presets */}
                    <div className="flex gap-1.5 mt-2.5">
                      {[1, 2, 3, 5, 7].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setDurationDays(preset)}
                          className={`text-xs px-2 py-1 rounded-md font-semibold transition-colors ${
                            durationDays === preset
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {preset}d
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Logistics Toggles */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Optional Local Logistics (Doorstep E-Cargo)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pickup Toggle */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-emerald-600" />
                          Pickup Required?
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => setPickupRequired(true)}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                              pickupRequired
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setPickupRequired(false)}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                              !pickupRequired
                                ? 'bg-slate-800 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                      {pickupRequired && (
                        <input
                          type="text"
                          value={pickupAddress}
                          onChange={(e) => setPickupAddress(e.target.value)}
                          placeholder="Enter farm gate / mandi stall address"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none"
                        />
                      )}
                    </div>

                    {/* Delivery Toggle */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-emerald-600" />
                          Delivery Required?
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => setDeliveryRequired(true)}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                              deliveryRequired
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryRequired(false)}
                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                              !deliveryRequired
                                ? 'bg-slate-800 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                      {deliveryRequired && (
                        <input
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Enter destination stall / buyer yard"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-700/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-base"
                >
                  <span>Confirm Booking (Demo)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

              </form>
            </div>

            {/* Right 5 Columns: Dynamic Live Price Card */}
            <div className="lg:col-span-5 space-y-5 sticky top-24">
              
              <div className="agri-card bg-white p-6 sm:p-7 border border-slate-200 shadow-md rounded-3xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-extrabold text-slate-900 text-lg">Live Price Summary</h3>
                  </div>
                  <span className="prototype-tag text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Prototype Pricing
                  </span>
                </div>

                {/* Calculation Formula */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-3">
                  <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                    Calculation Breakdown
                  </div>
                  <div className="text-sm font-mono text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span>Crates:</span>
                      <strong className="text-slate-900">{crates} crates</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <strong className="text-slate-900">{durationDays} days</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Rate:</span>
                      <strong className="text-slate-900">₹{crateRate} / crate-day</strong>
                    </div>
                  </div>

                  {/* Formula visual */}
                  <div className="pt-2 border-t border-emerald-200/60 text-xs text-slate-600">
                    <div className="font-mono bg-white p-2.5 rounded-xl border border-emerald-200 text-center text-emerald-900 font-bold">
                      {crates} crates × {durationDays} days × ₹{crateRate} = ₹{storageTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Total Display */}
                <div className="pt-2 flex items-baseline justify-between border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Total Estimated Amount</span>
                    <div className="text-3xl font-black text-slate-900 tracking-tight">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right text-xs text-emerald-700 font-bold">
                    Pay only for actual usage
                  </div>
                </div>

                {/* Included Checklist */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Modular solar cold storage (4°C controlled)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>24/7 temperature & humidity telemetry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free extension or early retrieval anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Zero lock-in or seasonal minimum guarantee</span>
                  </div>
                </div>

                {/* Mandatory Prototype Labeling */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Prototype pricing:</strong> Rate is provided for evaluation and startup validation. Real payments are not initiated in this demo.
                  </span>
                </div>

              </div>

              {/* Sample pitch prompt cue */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl text-xs space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Presentation Tip</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Demonstrate the live calculation updating dynamically as you adjust crates or days. Then click &ldquo;Confirm Booking&rdquo; to immediately generate an AgriCool booking ticket.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
