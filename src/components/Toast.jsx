import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold border backdrop-blur-md transition-all ${
        isSuccess
          ? 'bg-teal-900/90 text-teal-100 border-teal-500/30 shadow-teal-950/30'
          : isError
          ? 'bg-red-900/90 text-red-100 border-red-500/30 shadow-red-950/30'
          : 'bg-slate-900/90 text-slate-100 border-slate-700 shadow-slate-950/40'
      }`}>
        {isSuccess ? (
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
