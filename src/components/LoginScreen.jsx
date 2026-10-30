import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  KeyRound, 
  Sparkles,
  GraduationCap,
  Briefcase,
  UserPlus,
  LogIn,
  AlertCircle,
  Building,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginScreen = () => {
  const { 
    loginStudent, 
    loginStudentById, 
    loginFaculty, 
    loginFacultyById, 
    loginAdmin,
    registerStudent,
    registerFaculty,
    students,
    faculty,
    classes
  } = useApp();

  // Active portal tab: 'student' | 'faculty' | 'admin'
  const [activePortal, setActivePortal] = useState('student');

  // Sub-tab inside portal: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');

  // Login form fields
  const [identifier, setIdentifier] = useState('aarav.patil@college.edu');
  const [password, setPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');

  // Register Student form fields
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    classId: 'class_se_a',
    email: '',
    password: ''
  });

  // Register Faculty form fields
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    staffId: '',
    department: 'Computer Engineering',
    email: '',
    password: ''
  });

  const [regError, setRegError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Switch portal handler
  const handlePortalSwitch = (portal) => {
    setActivePortal(portal);
    setAuthMode('login');
    setLoginError('');
    setRegError('');
    if (portal === 'student') {
      setIdentifier('aarav.patil@college.edu');
    } else if (portal === 'faculty') {
      setIdentifier('FAC-101');
    } else {
      setIdentifier('admin@college.edu');
    }
  };

  // Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (activePortal === 'student') {
      const res = loginStudent(identifier, password);
      if (!res.success) {
        setLoginError(res.error || 'Invalid student credentials.');
      }
    } else if (activePortal === 'faculty') {
      const res = loginFaculty(identifier, password);
      if (!res.success) {
        setLoginError(res.error || 'Invalid faculty credentials.');
      }
    } else if (activePortal === 'admin') {
      loginAdmin();
    }
  };

  // Student registration submission
  const handleStudentRegister = (e) => {
    e.preventDefault();
    setRegError('');

    if (!newStudent.name || !newStudent.rollNo || !newStudent.email) {
      setRegError('Please fill in all required fields.');
      return;
    }

    const res = registerStudent(newStudent);
    if (!res.success) {
      setRegError(res.error || 'Registration failed.');
    } else {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#0d9488', '#14b8a6', '#0f766e']
        });
      } catch (err) { /* ignore */ }
    }
  };

  // Faculty registration submission
  const handleFacultyRegister = (e) => {
    e.preventDefault();
    setRegError('');

    if (!newFaculty.name || !newFaculty.staffId || !newFaculty.email) {
      setRegError('Please fill in all required fields.');
      return;
    }

    const res = registerFaculty(newFaculty);
    if (!res.success) {
      setRegError(res.error || 'Faculty registration failed.');
    } else {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#0d9488', '#14b8a6', '#0f766e']
        });
      } catch (err) { /* ignore */ }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[580px] p-4 sm:p-6 max-w-md mx-auto w-full text-center">
      
      {/* Brand Icon & Heading matching Mockup Screen 1 */}
      <div className="w-16 h-16 rounded-full border-2 border-teal-500/30 flex items-center justify-center mb-3 bg-teal-50/60 shadow-inner">
        <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
          <CheckCircle2 className="w-7 h-7 stroke-[2.3]" />
        </div>
      </div>

      <h1 className="text-xl font-bold text-slate-800 tracking-tight">Smart Attendance</h1>
      <p className="text-xs text-slate-500 mt-0.5 mb-4">College Digital Attendance & Academic Tracking</p>

      {/* DISTINCT PORTAL SWITCHER: Student Portal vs Faculty Portal vs Admin */}
      <div className="w-full bg-slate-100 p-1 rounded-2xl border border-slate-200 mb-4 grid grid-cols-3 gap-1 text-xs select-none">
        <button
          type="button"
          onClick={() => handlePortalSwitch('student')}
          className={`py-2 px-1 rounded-xl font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            activePortal === 'student'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>Student</span>
        </button>

        <button
          type="button"
          onClick={() => handlePortalSwitch('faculty')}
          className={`py-2 px-1 rounded-xl font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            activePortal === 'faculty'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Briefcase className="w-4 h-4 shrink-0" />
          <span>Faculty</span>
        </button>

        <button
          type="button"
          onClick={() => handlePortalSwitch('admin')}
          className={`py-2 px-1 rounded-xl font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            activePortal === 'admin'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Admin</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. STUDENT PORTAL */}
      {/* ========================================================================= */}
      {activePortal === 'student' && (
        <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs text-left">
          {/* Sub-tab: Sign In vs Create Student ID */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              Student Portal
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setRegError(''); }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  authMode === 'login' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setLoginError(''); }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  authMode === 'register' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Create ID
              </button>
            </div>
          </div>

          {/* Mode A: Sign In as Student */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {loginError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Student Roll No or College Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 01 or aarav.patil@college.edu"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <LogIn className="w-4 h-4" />
                LOGIN AS STUDENT
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] text-teal-700 hover:underline"
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-[11px] font-semibold text-teal-700 hover:underline"
                >
                  Create new ID →
                </button>
              </div>

              {/* Multiple Demo Student Accounts for quick evaluation */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Select Demo Student Account:
                </p>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {students.slice(0, 5).map(s => {
                    const isAarav = s.rollNo === '01';
                    const isRohan = s.rollNo === '03';
                    const isIsha = s.rollNo === '02';

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => loginStudentById(s.id)}
                        className="w-full p-2 rounded-xl bg-slate-50 hover:bg-teal-50/80 border border-slate-200 hover:border-teal-300 transition-colors flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-semibold text-slate-800 block group-hover:text-teal-900 leading-tight">
                              {s.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Roll: {s.rollNo} • Class SE-A
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isAarav 
                            ? 'bg-amber-100 text-amber-800' 
                            : isRohan 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isAarav ? '82% (Alert)' : isRohan ? '68% (Defaulter)' : '94% (High)'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          ) : (
            /* Mode B: Register / Create New Student ID */
            <form onSubmit={handleStudentRegister} className="space-y-2.5">
              <p className="text-[11px] text-slate-500">
                Enroll a new student to test digital attendance, custom reports, and alerts.
              </p>

              {regError && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                  {regError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Roll No</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11"
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Select Class</label>
                <select
                  value={newStudent.classId}
                  onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.department}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Student Email ID</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul.s@college.edu"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                CREATE STUDENT ID & LOGIN
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="w-full text-center text-[11px] text-slate-500 hover:underline pt-1"
              >
                Already have an ID? Back to Login
              </button>
            </form>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FACULTY PORTAL (SEPARATE FROM STUDENT LOGIN) */}
      {/* ========================================================================= */}
      {activePortal === 'faculty' && (
        <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs text-left">
          {/* Sub-tab: Sign In vs Register New Faculty */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              Faculty Portal
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setRegError(''); }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  authMode === 'login' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Faculty Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setLoginError(''); }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  authMode === 'register' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-500'
                }`}
              >
                New Staff ID
              </button>
            </div>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 text-[11px]">
                🔒 <b>Teacher Authentication:</b> Logging in as faculty unlocks attendance marking, date modification, and student leave approvals.
              </div>

              {loginError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Staff ID or Faculty Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. FAC-101 or rk.sharma@college.edu"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <Briefcase className="w-4 h-4" />
                LOGIN AS FACULTY (UNLOCK MARKING)
              </button>

              {/* Multiple Demo Faculty Accounts */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Select Demo Faculty Member:
                </p>
                <div className="space-y-1.5">
                  {faculty.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => loginFacultyById(f.id)}
                      className="w-full p-2 rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={f.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                          alt={f.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <span className="text-xs font-semibold text-slate-800 block group-hover:text-emerald-900 leading-tight">
                            {f.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {f.staffId} • {f.department}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700" />
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            /* Mode B: Register New Faculty */
            <form onSubmit={handleFacultyRegister} className="space-y-2.5">
              <p className="text-[11px] text-slate-500">
                Register a new professor or lecturer to mark digital attendance and review leaves.
              </p>

              {regError && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                  {regError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Faculty Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Anita Desai"
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Staff ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FAC-105"
                    value={newFaculty.staffId}
                    onChange={(e) => setNewFaculty({ ...newFaculty, staffId: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Department</label>
                <select
                  value={newFaculty.department}
                  onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Applied Sciences">Applied Sciences</option>
                  <option value="Humanities & English">Humanities & English</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Email ID</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. anita.desai@college.edu"
                  value={newFaculty.email}
                  onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newFaculty.password}
                  onChange={(e) => setNewFaculty({ ...newFaculty, password: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                REGISTER FACULTY & UNLOCK ACCESS
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="w-full text-center text-[11px] text-slate-500 hover:underline pt-1"
              >
                Back to Faculty Sign In
              </button>
            </form>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ADMIN PORTAL */}
      {/* ========================================================================= */}
      {activePortal === 'admin' && (
        <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-left space-y-3">
          <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
            <Building className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Dean & Administration Portal</h3>
              <p className="text-[10px] text-slate-400">Institutional control, classes, users & college broadcasts</p>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-indigo-900 text-xs space-y-1">
            <p className="font-semibold">Administrator Privileges:</p>
            <ul className="list-disc list-inside text-[11px] text-indigo-800 space-y-0.5">
              <li>Manage students, teachers, classes & subjects</li>
              <li>College-wide defaulters list & PDF audit generator</li>
              <li>Broadcast official notices to all student feeds</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={loginAdmin}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            ENTER AS PRINCIPAL / ADMIN
          </button>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl text-left border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Reset Password</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your registered student or staff email to receive a password reset link.
            </p>

            {resetSent ? (
              <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs">
                ✅ Password reset link generated! For demo purposes, any password works.
              </div>
            ) : (
              <div className="mt-3">
                <input
                  type="email"
                  defaultValue={identifier}
                  placeholder="Enter email"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setResetSent(false);
                }}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              {!resetSent && (
                <button
                  type="button"
                  onClick={() => setResetSent(true)}
                  className="px-3.5 py-1.5 text-xs bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
