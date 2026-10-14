import React from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Banner: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-700 text-white text-xs sm:text-sm py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded font-semibold tracking-wider text-[11px] uppercase shrink-0">
            Prototype Demo
          </span>
          <p className="font-medium text-amber-50">
            <span className="font-semibold">AgriCool Early-Stage MVP:</span> Validation demo with sample data. IoT sensors, real payments & GPS are simulated for presentation.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('book')}
            className="text-xs bg-white text-emerald-800 hover:bg-emerald-50 px-2.5 py-1 rounded font-semibold transition-colors flex items-center gap-1 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Try 2-Min Demo Flow
          </button>
        </div>
      </div>
    </div>
  );
};
