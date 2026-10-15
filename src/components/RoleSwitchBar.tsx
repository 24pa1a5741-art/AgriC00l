import React from 'react';
import { KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RoleSwitchBar: React.FC = () => {
  const { currentUser, switchDemoRole, setAuthModalOpen } = useApp();

  return (
    <aside 
      aria-label="Role Switcher Banner"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl transition-all"
    >
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 shadow-2xl text-white">
        <div className="flex items-center justify-between gap-2">
          
          {/* Active persona preview */}
          <div className="flex items-center gap-2 pl-1.5 sm:pl-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Live Persona
              </span>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                {currentUser?.name || 'Guest'} 
                <span className="text-[10px] text-emerald-300 font-normal">
                  ({currentUser?.role || 'Visitor'})
                </span>
              </span>
            </div>
          </div>

          {/* Quick role switch buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
            <button
              onClick={() => switchDemoRole('farmer')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'Farmer'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <span>🌱</span>
              <span className="hidden md:inline">Farmer</span>
              <span className="md:hidden">Farmer</span>
            </button>

            <button
              onClick={() => switchDemoRole('operator')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'Operator'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <span>🏢</span>
              <span className="hidden md:inline">Hub Operator</span>
              <span className="md:hidden">Operator</span>
            </button>

            <button
              onClick={() => switchDemoRole('buyer')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'Vendor'
                  ? 'bg-sky-400 text-slate-950 font-bold shadow-md shadow-sky-400/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <span>🛒</span>
              <span className="hidden md:inline">Wholesale Buyer</span>
              <span className="md:hidden">Buyer</span>
            </button>

            <button
              onClick={() => switchDemoRole('admin')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentUser?.role === 'Admin'
                  ? 'bg-purple-400 text-slate-950 font-bold shadow-md shadow-purple-400/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <span>⚡</span>
              <span className="hidden md:inline">SuperAdmin</span>
              <span className="md:hidden">Admin</span>
            </button>
          </div>

          {/* Credentials trigger */}
          <div className="shrink-0 flex items-center gap-1">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-2.5 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 hover:text-white border border-emerald-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              title="Credentials Vault"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden lg:inline">Credentials</span>
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
