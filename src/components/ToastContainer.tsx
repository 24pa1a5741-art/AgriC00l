import React from 'react';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-slate-900 text-white border-slate-700';
        let icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;

        if (toast.type === 'info') {
          bgColor = 'bg-blue-950 text-blue-100 border-blue-800';
          icon = <Info className="w-4 h-4 text-blue-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-950 text-amber-100 border-amber-800';
          icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
        } else if (toast.type === 'error') {
          bgColor = 'bg-red-950 text-red-100 border-red-800';
          icon = <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />;
        } else {
          bgColor = 'bg-emerald-950 text-emerald-100 border-emerald-800';
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md text-xs transition-all animate-in slide-in-from-right duration-200 ${bgColor}`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 font-medium leading-relaxed">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
