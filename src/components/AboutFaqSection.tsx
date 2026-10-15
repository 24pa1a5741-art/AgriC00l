import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Phone,
  MapPin,
  Leaf,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutFaqSection: React.FC = () => {
  const { setCurrentView } = useApp();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is AgriCool and how does it prevent crop distress sales?',
      a: 'AgriCool provides decentralized, solar-powered modular cold rooms placed right at regional farm collection hubs (such as Bhimavaram, Vijayawada, Guntur, and Hyderabad). Instead of dumping freshly harvested produce during an afternoon price crash, farmers can store their crates for ₹500/crate-day until mandi demand rebounds, boosting realization by 30% to 50%.',
    },
    {
      q: 'How does the ₹500 pay-per-crate pricing work?',
      a: 'There are zero long-term lease lock-ins or minimum ton contracts. If you bring 8 crates of tomatoes for 3 days, you pay exactly 8 × 3 × ₹500 = ₹12,000. You pay only for the crates and days you use.',
    },
    {
      q: 'Which produce types can be stored?',
      a: 'Our micro-vaults support country tomatoes, Robusta/Yelakki bananas, Banganapalli mangoes, green chillies, leafy greens (palak, methi, coriander), and seasonal vegetables. Each vault maintains produce-specific temperature setpoints (3°C to 13°C) and controlled humidity to inhibit ethylene breakdown.',
    },
    {
      q: 'How does the first-mile and last-mile electric delivery work?',
      a: 'AgriCool operates a fleet of refrigerated electric cargo three-wheelers and mini-vans (e.g. Piaggio Ape E-Cargo and Euler Motors EV). Farmers can toggle "Request EV Pickup" from farm gates, and wholesalers can request refrigerated delivery directly to their retail stalls.',
    },
    {
      q: 'Are the storage rooms 100% solar powered?',
      a: 'Yes. Each decentralized hub features a high-efficiency rooftop monocrystalline solar array coupled with modular LiFePO4 battery banks. The system provides 36+ hours of autonomous cooling, insulating farmers from local rural power outages.',
    },
    {
      q: 'How can buyers purchase produce stored in AgriCool hubs?',
      a: 'Through the AgriCool Produce Board! Registered wholesalers and aggregators can view real-time cold-stored produce batches, check their chill timestamps and quality grades, and place direct purchase bids with verified deposit receipts.',
    },
  ];

  const hubs = [
    {
      city: 'Bhimavaram Hub (Unit A)',
      area: 'Undi Road, West Godavari District',
      capacity: '120 Crates • Solar Micro-Vault',
      phone: '+91 98480 23456',
      contactPerson: 'Sirisha Kakarla (Cluster Lead)',
    },
    {
      city: 'Vijayawada Hub (Unit B)',
      area: 'Gollapudi Wholesale Market Bypass',
      capacity: '140 Crates • Dual-Temp Bay',
      phone: '+91 94401 54321',
      contactPerson: 'Venkata Rao Boddu (Facility Manager)',
    },
    {
      city: 'Guntur Hub (Unit C)',
      area: 'Brodipet / Mirchi Yard Terminal',
      capacity: '100 Crates • Misting Chamber',
      phone: '+91 99890 12890',
      contactPerson: 'Lakshmi Devi (Operations)',
    },
    {
      city: 'Hyderabad Hub (Unit D)',
      area: 'Kothapet / Shamshabad Transit Corridor',
      capacity: '160 Crates • Deep Chill Hub',
      phone: '+91 97000 88221',
      contactPerson: 'Dr. Kiran Varma (Technical Director)',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* About Mission Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Decentralized Cold Chain Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Protecting Harvests. Empowering Growers.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            In India, nearly 16% of fruits and vegetables perish post-harvest due to lack of immediate cold access. AgriCool builds modular, solar-powered cold chambers right where harvests happen, transforming perishable risk into bargaining power.
          </p>
        </div>

        {/* Regional Hubs Directory */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">Regional Cold Storage Hubs</h2>
            <p className="text-xs text-slate-500 mt-1">Visit or call your nearest decentralized solar chamber</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hubs.map((hub) => (
              <div
                key={hub.city}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:border-emerald-300 transition-all shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    AC
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{hub.city}</h3>
                    <span className="text-[10px] text-emerald-700 font-semibold">{hub.capacity}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-1">
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{hub.area}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-700">{hub.phone}</span>
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 border-t border-slate-200/80 pt-2">
                  Contact: <strong className="text-slate-800">{hub.contactPerson}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-gradient-to-r from-emerald-700 to-green-700 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black">Ready to preserve your harvest value?</h3>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto">
            Try our 2-minute booking prototype. Pay only for the crates and days you use.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('book')}
              className="px-7 py-3.5 bg-white text-emerald-900 font-bold rounded-xl text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-colors"
            >
              Book Storage Now (₹500 / crate-day)
            </button>
            <button
              onClick={() => setCurrentView('pricing')}
              className="px-6 py-3.5 bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm border border-emerald-400/30 transition-colors"
            >
              Calculate Net Savings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
