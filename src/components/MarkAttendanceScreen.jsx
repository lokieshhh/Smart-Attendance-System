import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Calendar, 
  Users, 
  Check, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  Clock,
  ArrowRight,
  BookOpen,
  Lock,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MarkAttendanceScreen = () => {
  const { 
    classes, 
    subjects, 
    students, 
    currentUser, 
    getAttendanceForSession, 
    markAttendance,
    setActiveTab,
    loginFaculty,
    logout
  } = useApp();

  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  // Filters & Selected Session
  const [selectedClassId, setSelectedClassId] = useState('class_se_a');
  const [selectedSubjectId, setSelectedSubjectId] = useState('sub_maths');
  const [selectedDate, setSelectedDate] = useState('2026-10-22'); // Default to 22 Oct as in mockup
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for interactive editing of statuses
  const [statusMap, setStatusMap] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter subjects for the selected class
  const classSubjects = useMemo(() => {
    return subjects.filter(s => s.classId === selectedClassId);
  }, [subjects, selectedClassId]);

  // Load existing or default attendance whenever class, subject, or date changes
  useEffect(() => {
    if (isFaculty) {
      const existingStatuses = getAttendanceForSession(selectedClassId, selectedSubjectId, selectedDate);
      setStatusMap(existingStatuses || {});
      setSaveSuccess(false);
    }
  }, [selectedClassId, selectedSubjectId, selectedDate, getAttendanceForSession, isFaculty]);

  // Filter students belonging to this class + search query
  const filteredStudents = useMemo(() => {
    return students
      .filter(s => s.classId === selectedClassId)
      .filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.includes(searchQuery)
      )
      .sort((a, b) => parseInt(a.rollNo, 10) - parseInt(b.rollNo, 10));
  }, [students, selectedClassId, searchQuery]);

  // Toggle single student status between 'P' and 'A'
  const toggleStatus = (studentId, status) => {
    if (!isFaculty) return;
    setStatusMap(prev => ({
      ...prev,
      [studentId]: status
    }));
    setSaveSuccess(false);
  };

  // Bulk actions
  const markAll = (status) => {
    if (!isFaculty) return;
    const updated = { ...statusMap };
    filteredStudents.forEach(s => {
      updated[s.id] = status;
    });
    setStatusMap(updated);
    setSaveSuccess(false);
  };

  // Count present & absent for filtered students
  const counts = useMemo(() => {
    let present = 0;
    let absent = 0;
    filteredStudents.forEach(s => {
      const st = statusMap[s.id] || 'P';
      if (st === 'P') present++;
      else absent++;
    });
    return { present, absent, total: filteredStudents.length };
  }, [filteredStudents, statusMap]);

  // Save / Submit attendance handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFaculty) {
      alert('Access Denied: Only faculty can mark attendance.');
      return;
    }

    markAttendance(selectedClassId, selectedSubjectId, selectedDate, statusMap);
    setSaveSuccess(true);
    
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0d9488', '#10b981', '#14b8a6']
      });
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const selectedClass = classes.find(c => c.id === selectedClassId);
  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  // =========================================================================
  // IF NOT LOGGED IN AS FACULTY: RENDER ACCESS RESTRICTION SCREEN (Requirement 2)
  // =========================================================================
  if (!isFaculty) {
    return (
      <div className="space-y-4 max-w-xl mx-auto p-4 sm:p-5 text-center">
        <div className="bg-white rounded-2xl border-2 border-amber-200 p-6 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800">
              Faculty Authentication Required
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Attendance marking and historical date modification is restricted to verified faculty members.
            </p>
          </div>

          {currentUser ? (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto text-left">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Current Account:</span>
              <p className="font-bold text-slate-800">{currentUser.name}</p>
              <p className="text-[11px] text-teal-700 font-medium">Role: Student (Roll No: {currentUser.rollNo || '01'}, Class: {currentUser.className || 'SE-A'})</p>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto">
              You are currently not logged in.
            </div>
          )}

          <div className="space-y-2 max-w-sm mx-auto pt-1">
            <button
              onClick={() => {
                loginFaculty('FAC-101');
              }}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              Sign In as Faculty (Dr. Sharma)
            </button>

            <button
              onClick={() => setActiveTab('home')}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
            >
              Back to Student Dashboard
            </button>
          </div>
        </div>

        {/* Read-only Student explanation */}
        <p className="text-[11px] text-slate-400">
          Tip: Students can inspect subject percentage breakdowns and monthly attendance trends in the <b>Reports</b> tab.
        </p>
      </div>
    );
  }

  // =========================================================================
  // FACULTY IS LOGGED IN: FULLY ENABLED ATTENDANCE MARKING (Matching Mockup Screen 3)
  // =========================================================================
  return (
    <div className="space-y-3.5 max-w-xl mx-auto p-4 sm:p-5">
      {/* Header bar matching Mockup: Class: SE-A | Maths | 22 Oct */}
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
          <span className="font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Screen 3: Mark Attendance
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800">
            ✓ Faculty: {currentUser?.name}
          </span>
        </div>

        {/* Dynamic Class, Subject & Date Selectors */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          {/* Class Selector */}
          <div>
            <label className="block text-[10px] text-slate-400 font-semibold mb-1">Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-400 text-xs font-semibold"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div>
            <label className="block text-[10px] text-slate-400 font-semibold mb-1">Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-400 text-xs font-semibold"
            >
              {classSubjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Date Selector (Allows editing past or future dates!) */}
          <div>
            <label className="block text-[10px] text-slate-400 font-semibold mb-1">Session Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-400 text-xs font-semibold"
            />
          </div>
        </div>

        {/* Selected Summary Pill */}
        <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] text-slate-300">
          <span className="font-semibold text-teal-300">
            {selectedClass?.name || 'SE-A'} • {selectedSubject?.name || 'Maths'} • {new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
          </span>
          <span className="text-[10px] text-slate-400">Edit / Review Any Date</span>
        </div>
      </div>

      {/* Search student bar (matching mockup "Search student...") */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search student..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all shadow-2xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
      </div>

      {/* Quick Bulk Action Helpers */}
      <div className="flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => markAll('P')}
            className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors"
          >
            Mark All Present
          </button>
          <button
            type="button"
            onClick={() => markAll('A')}
            className="text-[11px] font-semibold text-red-600 hover:text-red-800 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
          >
            Mark All Absent
          </button>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {filteredStudents.length} Students
        </span>
      </div>

      {/* Student List with [P] [A] Toggles (Matching Screen 3 Mockup) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {filteredStudents.map((student) => {
          const currentStatus = statusMap[student.id] || 'P';
          const isPresent = currentStatus === 'P';

          return (
            <div
              key={student.id}
              className="p-3 sm:px-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors"
            >
              {/* Roll No & Student Name */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-400 w-6">
                  {student.rollNo}
                </span>
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 hidden sm:block"
                />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">
                    {student.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block sm:hidden">
                    Roll {student.rollNo}
                  </span>
                </div>
              </div>

              {/* [ P ] and [ A ] Buttons matching mockup screen exactly */}
              <div className="flex items-center gap-2">
                {/* [ P ] Button: Green filled when active */}
                <button
                  type="button"
                  onClick={() => toggleStatus(student.id, 'P')}
                  className={`w-9 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                    isPresent
                      ? 'bg-teal-600 text-white shadow-xs shadow-teal-600/30 ring-2 ring-teal-600/20'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200/70 hover:text-slate-600'
                  }`}
                >
                  P
                </button>

                {/* [ A ] Button: Red filled when active */}
                <button
                  type="button"
                  onClick={() => toggleStatus(student.id, 'A')}
                  className={`w-9 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                    !isPresent
                      ? 'bg-red-500 text-white shadow-xs shadow-red-500/30 ring-2 ring-red-500/20'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200/70 hover:text-slate-600'
                  }`}
                >
                  A
                </button>
              </div>
            </div>
          );
        })}

        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400">
            No students found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Summary Stats matching Mockup: "Present: 3  Absent: 2" */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs">
        <div className="flex items-center gap-3 font-semibold">
          <span className="text-emerald-700">Present: {counts.present}</span>
          <span className="text-slate-300">•</span>
          <span className="text-red-600">Absent: {counts.absent}</span>
        </div>
        <span className="text-slate-500 text-[11px]">
          Rate: {counts.total > 0 ? Math.round((counts.present / counts.total) * 100) : 0}%
        </span>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Attendance successfully saved & student percentages recalculated!</span>
        </div>
      )}

      {/* SUBMIT ATTENDANCE Button matching mockup */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-3 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md shadow-teal-600/25 transition-all flex items-center justify-center gap-2"
      >
        SUBMIT ATTENDANCE
      </button>
    </div>
  );
};
