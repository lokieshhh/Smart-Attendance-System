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
  Info
} from 'lucide-react';

export const StudentDashboard = () => {
  const { currentUser, getStudentStats, setActiveTab } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Compute stats for current student (or fallback to student 1)
  const stats = getStudentStats(currentUser?.id || 'stu_01');

  // Helper color for progress bar
  const getProgressColor = (percentage) => {
    if (percentage >= 85) return 'bg-teal-600'; // Teal (good)
    if (percentage >= 75) return 'bg-amber-500'; // Amber (warning)
    return 'bg-red-500'; // Red (critical)
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 sm:p-5">
      {/* Student Greeting matching Mockup */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 leading-tight">
            Hello, {currentUser?.name?.split(' ')[0] || 'Student'}
          </h2>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <span className="font-semibold text-teal-700">Class: {currentUser?.className || 'SE-A'}</span>
            <span>•</span>
            <span>Roll No: {currentUser?.rollNo || '01'}</span>
          </p>
        </div>
        <button
          onClick={() => setActiveTab('leave')}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors flex items-center gap-1"
        >
          <FileText className="w-3.5 h-3.5" />
          Apply Leave
        </button>
      </div>

      {/* Hero Card: Overall Attendance (Matching Screen 2 Mockup) */}
      <div className="bg-teal-50/70 border-2 border-teal-200/80 rounded-2xl p-6 text-center shadow-xs relative overflow-hidden">
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
          <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-600 bg-white/70 py-1.5 px-3 rounded-full border border-teal-100 w-fit mx-auto">
            <span>Attended: <b>{stats.totalAttended}</b></span>
            <span>•</span>
            <span>Total: <b>{stats.totalSessions}</b> classes</span>
            <span>•</span>
            <span className={`font-bold ${stats.overall >= 75 ? 'text-teal-700' : 'text-red-600'}`}>
              {stats.overall >= 75 ? 'Safe Standing' : 'Debarred Risk'}
            </span>
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
                        <span className="text-slate-400 block">Standing:</span>
                        <span className={`font-bold ${sub.isLow ? 'text-red-600' : 'text-emerald-700'}`}>
                          {sub.isLow ? 'Defaulter (<75%)' : 'Eligible for Exams'}
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
            className="cursor-pointer bg-red-50/80 border border-red-300 rounded-xl p-3.5 flex items-center justify-between text-red-700 text-xs font-semibold shadow-xs hover:bg-red-100/70 transition-colors"
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
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-emerald-800 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Great job! All your subjects are currently above the 75% attendance criteria.</span>
        </div>
      )}

      {/* Quick Action Navigation links */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={() => setActiveTab('reports')}
          className="p-3 bg-white rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all text-left flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold text-slate-800 block">Monthly Report</span>
            <span className="text-[10px] text-slate-500">Download PDF & CSV</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-teal-600" />
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className="p-3 bg-white rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all text-left flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold text-slate-800 block">Alerts & Notices</span>
            <span className="text-[10px] text-slate-500">View official warnings</span>
          </div>
          <ChevronRight className="w-4 h-4 text-teal-600" />
        </button>
      </div>
    </div>
  );
};
