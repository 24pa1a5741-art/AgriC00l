import React, { useState } from 'react';
import {
  Sun,
  Snowflake,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ViewType } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    logout, 
    setAuthModalOpen 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: ViewType; icon?: React.ReactNode }[] = [
    { label: 'Home', view: 'landing' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Pricing', view: 'pricing' },
    { label: 'Book Storage', view: 'book' },
    { label: 'Track Booking', view: 'tracking' },
    { label: 'About', view: 'about' },
  ];

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <div className="relative">
                <Snowflake className="w-6 h-6 text-emerald-100" />
                <Sun className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Agri<span className="text-emerald-600">Cool</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  Solar
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-tight hidden sm:block">
                Keep it fresh. Sell it better.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-3.5 py-2 rounded-lg transition-all ${
                  currentView === item.view
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Storage Dashboard quick access */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'text-emerald-700 bg-emerald-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
              <span>Dashboard</span>
            </button>

            {/* Admin ops view */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium border border-slate-200 transition-all ml-1 ${
                currentView === 'admin'
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-300'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
              title="Hub Operations View"
            >
              Hub Ops
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200/80">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-2 text-left hover:opacity-85"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      {currentUser.role} • {currentUser.location}
                    </div>
                  </div>
                </button>
                <button
                  onClick={logout}
                  title="Log out"
                  className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <UserIcon className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('book')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>Book Storage</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('book')}
              className="bg-emerald-600 text-white text-xs font-semibold px-3 py-2 rounded-lg sm:hidden"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {currentUser && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl mb-3 border border-emerald-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-xs text-emerald-700 font-medium">{currentUser.role} • {currentUser.location}</div>
                </div>
              </div>
              <button 
                onClick={logout} 
                className="text-xs text-red-600 bg-white px-2 py-1 rounded border border-red-200"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  currentView === item.view
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                currentView === 'dashboard'
                  ? 'text-emerald-700 bg-emerald-50 font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                <span>Storage Dashboard</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                currentView === 'admin'
                  ? 'text-emerald-700 bg-emerald-50 font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cold Hub Operations (Admin)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {!currentUser && (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50"
              >
                Sign In / Demo Login
              </button>
            )}
            <button
              onClick={() => handleNavClick('book')}
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-center shadow-md shadow-emerald-600/30"
            >
              Book Storage (₹500 / crate-day)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
