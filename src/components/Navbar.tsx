import React, { useState } from 'react';
import {
  Sun,
  Snowflake,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  Bell,
  Activity,
  Truck,
  ShoppingBag,
  TrendingUp,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ViewType } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    logout, 
    setAuthModalOpen,
    setProfileModalOpen,
    notifications,
    markNotificationRead,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const navItems: { label: string; view: ViewType; icon?: React.ReactNode }[] = [
    { label: 'Home', view: 'landing' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Chamber IoT', view: 'monitoring', icon: <Activity className="w-3.5 h-3.5 text-emerald-500" /> },
    { label: 'Fleet Track', view: 'tracking', icon: <Truck className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Produce Board', view: 'marketplace', icon: <ShoppingBag className="w-3.5 h-3.5 text-sky-500" /> },
    { label: 'ROI Calculator', view: 'pricing', icon: <TrendingUp className="w-3.5 h-3.5 text-purple-500" /> },
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
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <div className="relative">
                <Snowflake className="w-6 h-6 text-emerald-100" />
                <Sun className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
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
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentView === item.view
                    ? 'text-emerald-800 bg-emerald-50 font-black'
                    : 'hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'text-emerald-800 bg-emerald-50 font-black'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Storage Cockpit</span>
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Notification Bell Menu */}
            <div className="relative">
              <button
                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors relative"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover */}
              {notifMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                    <span className="text-xs font-bold text-slate-800">Telemetry & Activity Alerts</span>
                    <span className="text-[10px] text-slate-400">{notifications.length} alerts</span>
                  </div>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                          n.read ? 'bg-slate-50 text-slate-500' : 'bg-emerald-50 text-slate-800 font-semibold border border-emerald-100'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                          <span>{n.title}</span>
                          <span>{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] leading-tight text-slate-600">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill / Login Trigger */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setProfileModalOpen(true)}
                  className="flex items-center gap-2 text-left hover:opacity-85"
                  title="View Digital Pass & Credentials"
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-300"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold uppercase">
                      {currentUser.role}
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
                className="text-xs font-bold text-slate-700 hover:text-emerald-700 px-3 py-2 bg-slate-100 hover:bg-emerald-50 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                <span>Credentials Login</span>
              </button>
            )}

            {/* Book Storage Primary CTA */}
            <button
              onClick={() => handleNavClick('book')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
            >
              <span>Book Storage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('book')}
              className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg sm:hidden shadow-xs"
            >
              Book
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
          {currentUser ? (
            <div 
              onClick={() => {
                setProfileModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl mb-3 border border-emerald-100 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-emerald-300"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-xs text-emerald-700 font-semibold">{currentUser.role} • {currentUser.location}</div>
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-bold">Pass &gt;</span>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 mb-2 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-4 h-4 text-emerald-600" />
              <span>Sign In with Credentials</span>
            </button>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                  currentView === item.view
                    ? 'text-emerald-700 bg-emerald-50 font-black'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                currentView === 'dashboard'
                  ? 'text-emerald-700 bg-emerald-50 font-black'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Storage Cockpit</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                currentView === 'admin'
                  ? 'text-purple-700 bg-purple-50 font-black'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Regional Command (Admin)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('book')}
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-center shadow-md shadow-emerald-600/30 text-xs"
            >
              Book Storage (₹500 / crate-day)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
