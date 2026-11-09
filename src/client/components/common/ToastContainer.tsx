import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 xl:bottom-6 right-4 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        let Icon = Info;
        let colorClass = 'border-blue-500/30 text-blue-400 bg-[#0f1422]/95';

        if (toast.type === 'success') {
          Icon = CheckCircle;
          colorClass = 'border-emerald-500/30 text-emerald-400 bg-[#0c1c14]/95';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClass = 'border-amber-500/30 text-amber-400 bg-[#1f190e]/95';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClass = 'border-red-500/30 text-red-400 bg-[#220f13]/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${colorClass}`}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium text-gray-100">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
