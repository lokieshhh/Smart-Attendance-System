import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, X, ShieldCheck, Printer, RefreshCw, QrCode, CheckCircle2, AlertTriangle } from 'lucide-react';

export const StudentIdCardModal = ({ isOpen, onClose }) => {
  const { currentUser, getStudentStats } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const stats = getStudentStats(currentUser?.id || 'stu_01');
  const isEligible = stats.overall >= 75;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Digital Student ID Card</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Canvas */}
        <div className="p-5 flex flex-col items-center space-y-4">
          
          {/* THE ID CARD */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full aspect-[1/1.55] rounded-3xl p-5 shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden select-none border-2 border-slate-800 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(145deg, #093430 0%, #0d5952 50%, #042421 100%)',
              color: 'white'
            }}
          >
            {/* Top College Header */}
            <div>
              <div className="flex items-center gap-2.5 border-b border-teal-500/30 pb-2">
                <div className="w-8 h-8 rounded-full bg-white text-teal-900 flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                  MIT
                </div>
                <div>
                  <h4 className="font-extrabold text-[11px] tracking-tight text-white uppercase leading-tight">
                    Metropolitan Institute
                  </h4>
                  <p className="text-[8px] text-teal-300 font-medium tracking-wider">
                    Autonomous Engineering Campus
                  </p>
                </div>
              </div>

              {!isFlipped ? (
                /* FRONT VIEW */
                <div className="mt-4 flex flex-col items-center text-center space-y-2">
                  <div className="relative">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80'}
                      alt={currentUser?.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-400/80 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-teal-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      ACTIVE
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-white">{currentUser?.name || 'Aarav Patil'}</h3>
                    <p className="text-[10px] text-teal-300 font-mono">PRN: {currentUser?.prn || '2024CS0148'}</p>
                  </div>

                  {/* Student Details Grid */}
                  <div className="w-full bg-slate-900/60 rounded-xl p-2.5 border border-teal-500/20 text-left text-[10px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-teal-300/80">Class & Div:</span>
                      <span className="font-bold text-white">{currentUser?.className || 'SE-A'} • Roll {currentUser?.rollNo || '01'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-300/80">Department:</span>
                      <span className="font-medium text-white">Computer Eng.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-300/80">Blood Group:</span>
                      <span className="font-bold text-white">{currentUser?.bloodGroup || 'B+'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-300/80">Valid Thru:</span>
                      <span className="font-mono text-white">{currentUser?.validThru || '2027'}</span>
                    </div>
                  </div>

                  {/* Dynamic Exam Clearance Status Pill */}
                  <div className={`w-full py-1.5 px-2 rounded-xl text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${
                    isEligible
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                      : 'bg-red-500/20 text-red-300 border border-red-400/40'
                  }`}>
                    {isEligible ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Exam Clearance: Active ({stats.overall}%)</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        <span>Exam Clearance: On Hold ({stats.overall}%)</span>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* BACK VIEW */
                <div className="mt-4 text-center space-y-3">
                  <p className="text-[9px] text-teal-200">
                    This card is institutional property and must be displayed on campus during all lecture hours and semester examinations.
                  </p>

                  <div className="bg-white p-3 rounded-2xl inline-block shadow-md">
                    <div className="w-24 h-24 bg-slate-900 rounded-lg p-2 flex flex-col justify-between items-center text-white font-mono text-[8px]">
                      <span>VERIFIED ID</span>
                      <span className="text-[10px] font-bold text-teal-400">{currentUser?.rollNo || '01'}</span>
                      <span>SCAN PORTAL</span>
                    </div>
                  </div>

                  <div className="text-[9px] text-teal-300 text-left space-y-0.5 bg-slate-900/60 p-2.5 rounded-xl border border-teal-500/20">
                    <p><b>Parent Phone:</b> {currentUser?.parentPhone || '+91 98220 54321'}</p>
                    <p><b>Campus:</b> Sector-4, Technology Park, Pune</p>
                    <p><b>Security Line:</b> +91 020 2548 9900</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Barcode */}
            <div className="pt-2 border-t border-teal-500/30 flex items-center justify-between text-[8px] text-teal-300 font-mono">
              <span>||||| |||| ||||| ||||</span>
              <span>Tap to {isFlipped ? 'view front' : 'flip back'}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Flip Card
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-2 px-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
