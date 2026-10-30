import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Filter, 
  Printer, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Share2
} from 'lucide-react';

export const AttendanceReportScreen = () => {
  const { currentUser, subjects, getStudentStats, classes } = useApp();
  
  const [selectedMonth, setSelectedMonth] = useState('Oct');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Stats for the active student
  const stats = getStudentStats(currentUser?.id || 'stu_01');

  // Filtered subject list based on dropdown
  const filteredSubjects = useMemo(() => {
    if (selectedSubjectFilter === 'All') {
      return stats.subjects;
    }
    return stats.subjects.filter(s => s.name === selectedSubjectFilter);
  }, [stats.subjects, selectedSubjectFilter]);

  // Mock bar chart trend data matching mockup visual
  // The mockup Screen 4 shows a bar chart with 5 vertical bars:
  // Teal, Teal, Amber, Teal, Teal
  const monthlyTrendData = [
    { label: 'W1', fullLabel: 'Week 1 (Oct 1 - Oct 7)', pct: 88, color: 'bg-teal-600' },
    { label: 'W2', fullLabel: 'Week 2 (Oct 8 - Oct 14)', pct: 92, color: 'bg-teal-600' },
    { label: 'W3', fullLabel: 'Week 3 (Oct 15 - Oct 21)', pct: 74, color: 'bg-amber-500' }, // Amber dip
    { label: 'W4', fullLabel: 'Week 4 (Oct 22 - Oct 28)', pct: 86, color: 'bg-teal-600' },
    { label: 'Overall', fullLabel: 'Cumulative Average', pct: stats.overall, color: 'bg-teal-700' },
  ];

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ['Roll No', 'Student Name', 'Class', 'Subject', 'Code', 'Attended Lectures', 'Total Lectures', 'Attendance %', 'Status'];
    const rows = filteredSubjects.map(sub => [
      currentUser?.rollNo || '01',
      currentUser?.name || 'Aarav Patil',
      currentUser?.className || 'SE-A',
      sub.name,
      sub.code,
      sub.attended,
      sub.total,
      `${sub.percentage}%`,
      sub.percentage >= 75 ? 'Safe / Eligible' : 'DEFAULTER (<75%)'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Attendance_Report_${selectedMonth}_${currentUser?.name || 'Student'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF / Print Handler
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 sm:p-5">
      {/* Title & Screen Demarcation */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-teal-600" />
          Screen 4: Attendance Report
        </h2>
        <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
          Semester 3
        </span>
      </div>

      {/* Filter Row matching Mockup: Month: Oct | Subject: All */}
      <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Subject
          </label>
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="All">All Subjects</option>
            {subjects.filter(s => s.classId === (currentUser?.classId || 'class_se_a')).map(s => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Monthly Attendance Trend (%) Bar Chart (Faithfully matching mockup Screen 4) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-4">
        {/* Trend Bar Chart Container */}
        <div className="h-44 flex items-end justify-center gap-4 sm:gap-6 pt-6 pb-2 px-4 border-b border-slate-100">
          {monthlyTrendData.map((bar, idx) => {
            const barHeight = Math.max(15, (bar.pct / 100) * 120);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center group relative max-w-[48px]">
                {/* Floating percentage label on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded font-bold whitespace-nowrap z-20 pointer-events-none">
                  {bar.pct}%
                </div>

                {/* Percentage text above bar */}
                <span className="text-[10px] font-bold text-slate-500 mb-1">
                  {bar.pct}%
                </span>

                {/* Bar element matching mockup */}
                <div
                  className={`w-full rounded-t-md transition-all duration-500 hover:brightness-110 ${bar.color}`}
                  style={{ height: `${barHeight}px` }}
                />

                {/* Label below bar */}
                <span className="text-[11px] font-bold text-slate-600 mt-2">
                  {bar.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Subtitle matching Mockup: "Monthly attendance trend (%)" */}
        <p className="text-xs font-medium text-slate-500">
          Monthly attendance trend (%)
        </p>
      </div>

      {/* Breakdown Table matching Mockup: Maths 18/20, Physics 15/20, Chemistry 14/20 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Subject</span>
          <span>Lectures Attended</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {filteredSubjects.map((sub) => {
            const isCritical = sub.percentage < 75;

            return (
              <div key={sub.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                <div>
                  <span className="font-semibold text-slate-800 block">{sub.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{sub.code}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700 text-xs font-mono">
                    {sub.attended}/{sub.total}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isCritical
                        ? 'bg-red-100 text-red-700'
                        : sub.percentage >= 85
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {sub.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Action Buttons matching Mockup: [Export PDF] [Export CSV] */}
      <div className="grid grid-cols-2 gap-3 pt-1 no-print">
        <button
          type="button"
          onClick={handleExportPDF}
          className="py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4 text-teal-400" />
          Export PDF
        </button>

        <button
          type="button"
          onClick={handleExportCSV}
          className="py-3 px-4 bg-teal-800 hover:bg-teal-900 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4 text-teal-300" />
          Export CSV
        </button>
      </div>

      {/* Printable Report View (Visible only during window.print()) */}
      <div className="hidden print-only p-8 text-black bg-white">
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-xl font-bold uppercase tracking-wider">Metropolitan Institute of Technology</h1>
          <p className="text-sm text-gray-600">Department of Computer Science & Engineering</p>
          <h2 className="text-base font-bold mt-2">OFFICIAL ATTENDANCE AUDIT TRANSCRIPT - OCTOBER 2026</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs mb-6 p-3 bg-gray-50 border border-gray-300">
          <div>
            <p><b>Student Name:</b> {currentUser?.name || 'Aarav Patil'}</p>
            <p><b>Roll Number:</b> {currentUser?.rollNo || '01'}</p>
            <p><b>Class / Division:</b> {currentUser?.className || 'SE-A'}</p>
          </div>
          <div>
            <p><b>Academic Term:</b> Fall 2026</p>
            <p><b>Cumulative Overall:</b> {stats.overall}%</p>
            <p><b>Status:</b> {stats.overall >= 75 ? 'Satisfactory Standing' : 'Defaulter Notice'}</p>
          </div>
        </div>

        <table className="w-full text-xs border-collapse border border-gray-400 mb-6">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-400">
              <th className="p-2 border border-gray-400 text-left">Subject Code</th>
              <th className="p-2 border border-gray-400 text-left">Subject Name</th>
              <th className="p-2 border border-gray-400 text-center">Attended / Total</th>
              <th className="p-2 border border-gray-400 text-center">Percentage</th>
              <th className="p-2 border border-gray-400 text-center">Exam Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {stats.subjects.map(s => (
              <tr key={s.id} className="border-b border-gray-300">
                <td className="p-2 border border-gray-300 font-mono">{s.code}</td>
                <td className="p-2 border border-gray-300 font-semibold">{s.name}</td>
                <td className="p-2 border border-gray-300 text-center">{s.attended} / {s.total}</td>
                <td className="p-2 border border-gray-300 text-center font-bold">{s.percentage}%</td>
                <td className="p-2 border border-gray-300 text-center font-semibold">
                  {s.percentage >= 75 ? 'ELIGIBLE' : 'DEFAULTER'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-end mt-16 pt-8 border-t border-gray-300 text-xs">
          <div>
            <p>Generated on: {new Date().toLocaleDateString()}</p>
            <p className="text-gray-500 text-[10px]">Smart Attendance Portal Verified System Document</p>
          </div>
          <div className="text-center">
            <div className="w-36 border-b border-black mb-1" />
            <p className="font-bold">Head of Department / Dean</p>
          </div>
        </div>
      </div>
    </div>
  );
};
