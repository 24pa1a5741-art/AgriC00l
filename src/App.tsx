import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Banner } from './components/Banner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { HowItWorks } from './components/HowItWorks';
import { BookingForm } from './components/BookingForm';
import { IotChamberMonitoring } from './components/IotChamberMonitoring';
import { FleetTracker } from './components/FleetTracker';
import { RoiCalculator } from './components/RoiCalculator';
import { MarketplaceView } from './components/MarketplaceView';
import { DashboardView } from './components/DashboardView';
import { AdminView } from './components/AdminView';
import { AboutFaqSection } from './components/AboutFaqSection';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { ReceiptModal } from './components/ReceiptModal';
import { RoleSwitchBar } from './components/RoleSwitchBar';
import { ToastContainer } from './components/ToastContainer';
import {
  Phone,
  Mail,
  Snowflake,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentView, setCurrentView, setAuthModalOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white pb-20">
      {/* Top Banner */}
      <Banner />

      {/* Main Navbar */}
      <Navbar />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <Hero />
            <ProblemSection />
            <SolutionSection />
            <HowItWorks />
            <RoiCalculator />
          </>
        )}

        {currentView === 'how-it-works' && (
          <div className="pt-6">
            <HowItWorks />
            <SolutionSection />
          </div>
        )}

        {currentView === 'book' && <BookingForm />}

        {currentView === 'monitoring' && <IotChamberMonitoring />}

        {currentView === 'tracking' && <FleetTracker />}

        {currentView === 'marketplace' && <MarketplaceView />}

        {currentView === 'pricing' && <RoiCalculator />}

        {currentView === 'dashboard' && <DashboardView />}

        {currentView === 'admin' && <AdminView />}

        {(currentView === 'about' || currentView === 'faq' || currentView === 'contact') && (
          <AboutFaqSection />
        )}
      </main>

      {/* Supreme Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold">
                  <Snowflake className="w-5 h-5 text-emerald-100" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">
                  Agri<span className="text-emerald-400">Cool</span>
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                  Solar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Decentralized, solar-powered modular cold storage and first-mile electric logistics. Empowering smallholder farmers to store by the crate at ₹500/crate-day and avoid distress selling.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Validation MVP • Andhra Pradesh & Telangana</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => setCurrentView('book')} className="hover:text-emerald-400 transition-colors">
                    Book Cold Storage
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('monitoring')} className="hover:text-emerald-400 transition-colors">
                    Chamber IoT Telemetry
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('tracking')} className="hover:text-emerald-400 transition-colors">
                    Fleet & Delivery Tracking
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('marketplace')} className="hover:text-emerald-400 transition-colors">
                    Produce Board
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('pricing')} className="hover:text-emerald-400 transition-colors">
                    ROI Profit Calculator
                  </button>
                </li>
              </ul>
            </div>

            {/* Regional Hubs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Regional Hubs</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Bhimavaram (Unit A • Undi Road)</li>
                <li>Vijayawada (Unit B • Gollapudi)</li>
                <li>Guntur (Unit C • Mirchi Yard)</li>
                <li>Hyderabad (Unit D • Transit Hub)</li>
                <li>
                  <button onClick={() => setCurrentView('contact')} className="text-emerald-400 hover:underline">
                    Hub Directory & Contacts &rarr;
                  </button>
                </li>
              </ul>
            </div>

            {/* Helpline & Credentials */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Helpline & Auth</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-white">+91 98480 23456</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>support@agricool.in</span>
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Demo Credentials</span>
                </button>
              </div>
            </div>

          </div>

          {/* Sub footer */}
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} AgriCool Agritech Pvt Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('faq')} className="hover:text-slate-400 transition-colors">
                FAQs
              </button>
              <button onClick={() => setCurrentView('about')} className="hover:text-slate-400 transition-colors">
                About Mission
              </button>
              <button onClick={() => setCurrentView('admin')} className="hover:text-slate-400 transition-colors">
                Operator View
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Global Modals & Evaluator Bars */}
      <AuthModal />
      <ProfileModal />
      <ReceiptModal />
      <RoleSwitchBar />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
