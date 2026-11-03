import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, X, Printer, ShieldAlert, CheckCircle2, AlertTriangle, Building } from 'lucide-react';

export const HallTicketModal = ({ isOpen, onClose }) => {
  const { currentUser, getStudentStats } = useApp();

  if (!isOpen) return null;

  const stats = getStudentStats(currentUser?.id || 'stu_01');
  const isEligible = stats.overall >= 75;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Semester Examination Hall Ticket</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Hall Ticket Canvas */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Eligibility Alert Banner */}
          {!isEligible && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-2xl text-red-800 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Admit Card On Hold (Defaulter Notice)</span>
                <p className="text-[11px] mt-0.5 text-red-700 leading-relaxed">
                  Your overall attendance is currently {stats.overall}% (minimum 75% required). An official undertaking signed by your guardian and HOD is mandatory before entering the examination hall.
                </p>
              </div>
            </div>
          )}

          {/* Formatted College Certificate Sheet */}
          <div className="border-2 border-slate-300 rounded-2xl p-5 bg-white relative space-y-4 shadow-sm">
            
            {/* Watermark for Defaulter */}
            {!isEligible && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10 rotate-[-30deg]">
                <span className="text-5xl font-extrabold text-red-600 tracking-widest border-4 border-red-600 p-4">
                  PROVISIONAL DEFAULTER
                </span>
              </div>
            )}

            {/* University Letterhead */}
            <div className="text-center border-b pb-3 border-slate-200">
              <div className="flex items-center justify-center gap-2">
                <Building className="w-5 h-5 text-teal-700" />
                <h2 className="font-extrabold text-sm text-slate-900 uppercase">
                  Metropolitan Institute of Technology
                </h2>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">Affiliated to State Technical University • Autonomous Institution</p>
              <h3 className="text-xs font-bold text-teal-800 mt-1 uppercase tracking-wider bg-teal-50 py-1 rounded-md inline-block px-3">
                Term-End Examination Admit Card • Winter 2026
              </h3>
            </div>

            {/* Student Bio Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px]">
              <div className="col-span-2 space-y-1">
                <p><span className="text-slate-400">Student Name:</span> <b>{currentUser?.name || 'Aarav Patil'}</b></p>
                <p><span className="text-slate-400">Roll No:</span> <b>{currentUser?.rollNo || '01'}</b> | <span className="text-slate-400">PRN:</span> <b className="font-mono">{currentUser?.prn || '2024CS0148'}</b></p>
                <p><span className="text-slate-400">Program:</span> B.Tech Computer Engineering (SE-A)</p>
                <p><span className="text-slate-400">Overall Attendance:</span> <b className={isEligible ? 'text-teal-700' : 'text-red-600'}>{stats.overall}%</b></p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80'}
                  alt="Candidate"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-300"
                />
                <span className="text-[9px] font-mono text-slate-400 mt-1">SEAT: 84920</span>
              </div>
            </div>

            {/* Scheduled Courses Table */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Approved Subject Timetable
              </span>
              <table className="w-full text-[11px] border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-1.5 border border-slate-200 text-left">Code</th>
                    <th className="p-1.5 border border-slate-200 text-left">Course Title</th>
                    <th className="p-1.5 border border-slate-200 text-center">Attd %</th>
                    <th className="p-1.5 border border-slate-200 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.subjects.map(s => (
                    <tr key={s.id} className="border-b border-slate-100">
                      <td className="p-1.5 border border-slate-200 font-mono">{s.code}</td>
                      <td className="p-1.5 border border-slate-200 font-medium">{s.name}</td>
                      <td className="p-1.5 border border-slate-200 text-center font-bold">{s.percentage}%</td>
                      <td className="p-1.5 border border-slate-200 text-center font-bold">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                          s.percentage >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                        }`}>
                          {s.percentage >= 75 ? 'CLEARED' : 'DEFAULTER'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Authorization Seals */}
            <div className="flex items-end justify-between pt-6 border-t border-slate-200 text-[10px]">
              <div>
                <div className="w-20 border-b border-black mb-1" />
                <span className="text-slate-500">Candidate Signature</span>
              </div>
              <div className="text-center">
                <div className="w-20 border-b border-black mb-1" />
                <span className="font-bold text-slate-800">Controller of Exams</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-teal-400" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
