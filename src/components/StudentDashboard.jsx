import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  AlertTriangle, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Info,
  QrCode,
  Calculator,
  CreditCard,
  FileCheck
} from 'lucide-react';
import { QRModal } from './QRModal';
import { BunkCalculatorModal } from './BunkCalculatorModal';
import { StudentIdCardModal } from './StudentIdCardModal';
import { HallTicketModal } from './HallTicketModal';
import { TimetableWidget } from './TimetableWidget';
import { AttendanceHeatmap } from './AttendanceHeatmap';

export const StudentDashboard = () => {
  const { currentUser, getStudentStats, setActiveTab } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Modals state
  const [showQRModal, setShowQRModal] = useState(false);
  const [showBunkCalc, setShowBunkCalc] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [showHallTicket, setShowHallTicket] = useState(false);

  // Compute stats for current student (or fallback to student 1)
  const stats = getStudentStats(currentUser?.id || 'stu_01');

  // Helper color for progress bar
  const getProgressColor = (percentage) => {
    if (percentage >= 85) return 'bg-teal-600';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 sm:p-5">
      
      {/* Student Greeting & Quick Leave Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 leading-tight">
            Hello, {currentUser?.name?.split(' ')[0] || 'Student'}
          </h2>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <span className="font-semibold text-teal-700">Class: {currentUser?.className || 'SE-A'}</span>
            <span>•</span>
            <span>Roll: {currentUser?.rollNo || '01'}</span>
            <span>•</span>
            <span className="font-mono text-slate-400">PRN: {currentUser?.prn || '2024CS0148'}</span>
          </p>
        </div>
        <button
          onClick={() => setActiveTab('leave')}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors flex items-center gap-1 shadow-2xs"
        >
          <FileText className="w-3.5 h-3.5" />
          Apply Leave
        </button>
      </div>

      {/* QUICK POWER-TOOLS BAR (SaaS Final Product Feature) */}
      <div className="grid grid-cols-4 gap-2 text-center select-none">
        <button
          onClick={() => setShowQRModal(true)}
          className="p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all flex flex-col items-center justify-center gap-1 group"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <QrCode className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 block leading-tight">Scan QR</span>
        </button>

        <button
          onClick={() => setShowBunkCalc(true)}
          className="p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all flex flex-col items-center justify-center gap-1 group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 block leading-tight">Bunk Calc</span>
        </button>

        <button
          onClick={() => setShowIdCard(true)}
          className="p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all flex flex-col items-center justify-center gap-1 group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CreditCard className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 block leading-tight">Campus ID</span>
        </button>

        <button
          onClick={() => setShowHallTicket(true)}
          className="p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all flex flex-col items-center justify-center gap-1 group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileCheck className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 block leading-tight">Hall Ticket</span>
        </button>
      </div>

      {/* Hero Card: Overall Attendance (Matching Screen 2 Mockup) */}
      <div className="bg-teal-50/70 border-2 border-teal-200/80 rounded-3xl p-6 text-center shadow-xs relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-200/30 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-5xl font-extrabold text-teal-700 tracking-tight">
              {stats.overall}%
            </span>
          </div>
          <p className="text-xs font-medium text-teal-900/80 mt-1 uppercase tracking-wider">
            Overall attendance
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-600 bg-white/80 py-1.5 px-3 rounded-full border border-teal-100 w-fit mx-auto shadow-3xs">
            <span>Attended: <b>{stats.totalAttended}</b></span>
            <span>•</span>
            <span>Total: <b>{stats.totalSessions}</b> classes</span>
            <span>•</span>
            <span className={`font-bold ${stats.overall >= 75 ? 'text-teal-700' : 'text-red-600'}`}>
              {stats.overall >= 75 ? 'Safe Standing' : 'Debarred Risk'}
            </span>
          </div>

          {/* Quick Safe Bunks advice */}
          <div className="mt-3 text-[10px] text-teal-800 font-medium">
            {stats.overall >= 75 ? (
              <span>✨ You can safely bunk <b>{stats.overallSafeBunks} more classes</b> without dropping below 75%.</span>
            ) : (
              <span className="text-red-600 font-bold">⚠️ You must attend <b>{stats.overallClassesToRecover} consecutive classes</b> to escape defaulter status!</span>
            )}
          </div>
        </div>
      </div>

      {/* Subject-wise Attendance Breakdown (Matching Screen 2 Mockup) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-teal-600" />
            Subject Records
          </h3>
          <span className="text-[11px] text-slate-400">Min. req: 75%</span>
        </div>

        <div className="space-y-4">
          {stats.subjects.map((sub) => {
            const barColor = getProgressColor(sub.percentage);
            const isCritical = sub.percentage < 75;

            return (
              <div 
                key={sub.id} 
                onClick={() => setSelectedSubject(selectedSubject?.id === sub.id ? null : sub)}
                className="group cursor-pointer select-none"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{sub.name}</span>
                    <span className="text-[10px] text-slate-400">({sub.attended}/{sub.total})</span>
                  </div>
                  <span className={`font-bold text-xs ${isCritical ? 'text-red-600' : 'text-slate-700'}`}>
                    {sub.percentage}%
                  </span>
                </div>

                {/* Progress bar matching mockup style */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                    style={{ width: `${Math.min(100, Math.max(5, sub.percentage))}%` }}
                  />
                </div>

                {/* Expanded Details when tapped */}
                {selectedSubject?.id === sub.id && (
                  <div className="mt-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">Faculty:</span>
                        <span className="font-medium text-slate-700">{sub.facultyName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Course Code:</span>
                        <span className="font-mono text-slate-700">{sub.code}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Classes Missed:</span>
                        <span className="font-medium text-red-600">{sub.total - sub.attended} classes</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Safe Bunk Buffer:</span>
                        <span className={`font-bold ${sub.isLow ? 'text-red-600' : 'text-emerald-700'}`}>
                          {sub.isLow ? `Need +${sub.classesToRecover} classes` : `${sub.safeBunksAvailable} can be missed`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Early Alert Banner for < 75% (Matching Screen 2 Mockup: "⚠ Chemistry below 75%") */}
      {stats.lowSubjects.length > 0 ? (
        stats.lowSubjects.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setActiveTab('alerts')}
            className="cursor-pointer bg-red-50/80 border border-red-300 rounded-2xl p-3.5 flex items-center justify-between text-red-700 text-xs font-semibold shadow-2xs hover:bg-red-100/70 transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>⚠ {sub.name} below 75% ({sub.percentage}%)</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-red-600 font-normal">
              <span>Need {sub.classesToRecover} class{sub.classesToRecover > 1 ? 'es' : ''} to recover</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2 text-emerald-800 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Great job! All your subjects are currently above the 75% attendance criteria.</span>
        </div>
      )}

      {/* TODAY'S LECTURE TIMETABLE WIDGET */}
      <TimetableWidget onLaunchQR={() => setShowQRModal(true)} />

      {/* 30-DAY ATTENDANCE HEATMAP */}
      <AttendanceHeatmap />

      {/* Navigation shortcuts */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={() => setActiveTab('reports')}
          className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all text-left flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold text-slate-800 block">Monthly Report</span>
            <span className="text-[10px] text-slate-500">Download PDF & CSV</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-teal-600" />
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className="p-3 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all text-left flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold text-slate-800 block">Alerts & Notices</span>
            <span className="text-[10px] text-slate-500">View official warnings</span>
          </div>
          <ChevronRight className="w-4 h-4 text-teal-600" />
        </button>
      </div>

      {/* MODALS */}
      <QRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
      <BunkCalculatorModal isOpen={showBunkCalc} onClose={() => setShowBunkCalc(false)} />
      <StudentIdCardModal isOpen={showIdCard} onClose={() => setShowIdCard(false)} />
      <HallTicketModal isOpen={showHallTicket} onClose={() => setShowHallTicket(false)} />
    </div>
  );
};
