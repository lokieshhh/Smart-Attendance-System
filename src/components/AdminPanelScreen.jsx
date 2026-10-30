import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  UserPlus, 
  BookPlus, 
  Send, 
  FileSpreadsheet, 
  ShieldCheck, 
  Trash2, 
  Search, 
  Plus, 
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const AdminPanelScreen = () => {
  const { 
    adminStats, 
    students, 
    faculty, 
    classes, 
    subjects, 
    addStudent, 
    deleteStudent, 
    addClass, 
    addSubject, 
    addAnnouncement,
    getStudentStats 
  } = useApp();

  // Active sub-modal or view: 'none', 'users', 'classes', 'reports', 'notice'
  const [activeModal, setActiveModal] = useState('none');
  const [userSearch, setUserSearch] = useState('');

  // Form states
  const [newStudentForm, setNewStudentForm] = useState({ name: '', rollNo: '', email: '', classId: 'class_se_a' });
  const [showAddStudent, setShowAddStudent] = useState(false);

  const [newClassForm, setNewClassForm] = useState({ name: '', department: 'Computer Engineering', totalStudents: 60, room: 'Room CS-101' });
  const [showAddClass, setShowAddClass] = useState(false);

  const [newSubjectForm, setNewSubjectForm] = useState({ name: '', fullName: '', code: '', classId: 'class_se_a', facultyName: 'Dr. R. K. Sharma', totalSessions: 20 });
  const [showAddSubject, setShowAddSubject] = useState(false);

  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', priority: 'High' });
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // List of all students below 75% across the college
  const defaulterStudents = students.filter(student => {
    const s = getStudentStats(student.id);
    return s.overall < 75 || s.lowSubjects.length > 0;
  });

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.rollNo) return;
    addStudent({
      ...newStudentForm,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newStudentForm.name}`
    });
    setNewStudentForm({ name: '', rollNo: '', email: '', classId: 'class_se_a' });
    setShowAddStudent(false);
  };

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClassForm.name) return;
    addClass(newClassForm);
    setNewClassForm({ name: '', department: 'Computer Engineering', totalStudents: 60, room: 'Room CS-101' });
    setShowAddClass(false);
  };

  const handleCreateSubject = (e) => {
    e.preventDefault();
    if (!newSubjectForm.name || !newSubjectForm.code) return;
    addSubject(newSubjectForm);
    setNewSubjectForm({ name: '', fullName: '', code: '', classId: 'class_se_a', facultyName: 'Dr. R. K. Sharma', totalSessions: 20 });
    setShowAddSubject(false);
  };

  const handleSendNotice = (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;
    addAnnouncement(noticeForm);
    setNoticeSuccess(true);
    setTimeout(() => {
      setNoticeSuccess(false);
      setNoticeForm({ title: '', content: '', priority: 'High' });
      setActiveModal('none');
    }, 1500);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 sm:p-5">
      {/* Screen Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Screen 6: Admin Panel
        </h2>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          College Administration
        </span>
      </div>

      {/* 4 Stat Metric Cards (Matching Screen 6 Mockup 2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Users */}
        <div 
          onClick={() => setActiveModal('users')}
          className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 text-center cursor-pointer hover:bg-teal-100/60 transition-all shadow-2xs group"
        >
          <span className="text-2xl sm:text-3xl font-extrabold text-teal-800 block group-hover:scale-105 transition-transform">
            {adminStats.totalUsers.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-teal-900/70 mt-1 block">
            Users
          </span>
        </div>

        {/* Card 2: Classes */}
        <div 
          onClick={() => setActiveModal('classes')}
          className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 text-center cursor-pointer hover:bg-teal-100/60 transition-all shadow-2xs group"
        >
          <span className="text-2xl sm:text-3xl font-extrabold text-teal-800 block group-hover:scale-105 transition-transform">
            {adminStats.totalClasses}
          </span>
          <span className="text-xs font-semibold text-teal-900/70 mt-1 block">
            Classes
          </span>
        </div>

        {/* Card 3: Avg. Att. */}
        <div 
          onClick={() => setActiveModal('reports')}
          className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 text-center cursor-pointer hover:bg-teal-100/60 transition-all shadow-2xs group"
        >
          <span className="text-2xl sm:text-3xl font-extrabold text-teal-800 block group-hover:scale-105 transition-transform">
            {adminStats.avgAttendance}%
          </span>
          <span className="text-xs font-semibold text-teal-900/70 mt-1 block">
            Avg. Att.
          </span>
        </div>

        {/* Card 4: Alerts */}
        <div 
          onClick={() => setActiveModal('reports')}
          className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 text-center cursor-pointer hover:bg-teal-100/60 transition-all shadow-2xs group"
        >
          <span className="text-2xl sm:text-3xl font-extrabold text-red-600 block group-hover:scale-105 transition-transform">
            {adminStats.totalAlerts}
          </span>
          <span className="text-xs font-semibold text-teal-900/70 mt-1 block">
            Alerts (<span className="text-red-600 font-bold">&lt;75%</span>)
          </span>
        </div>
      </div>

      {/* 4 Main Action Buttons matching Screen 6 Mockup */}
      <div className="space-y-2.5 pt-1">
        {/* Manage Users Button */}
        <button
          type="button"
          onClick={() => setActiveModal('users')}
          className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-400" />
            Manage Users
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Manage Classes & Subjects Button */}
        <button
          type="button"
          onClick={() => setActiveModal('classes')}
          className="w-full py-3.5 px-4 bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-300" />
            Manage Classes & Subjects
          </span>
          <ChevronRight className="w-4 h-4 text-teal-200" />
        </button>

        {/* Generate Reports Button */}
        <button
          type="button"
          onClick={() => setActiveModal('reports')}
          className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            Generate Reports
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Send Notice Button */}
        <button
          type="button"
          onClick={() => setActiveModal('notice')}
          className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4 text-white" />
            Send Notice
          </span>
          <ChevronRight className="w-4 h-4 text-teal-200" />
        </button>
      </div>

      {/* MODAL 1: Manage Users */}
      {activeModal === 'users' && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-600" />
                  Manage Students & Faculty
                </h3>
                <p className="text-[10px] text-slate-400">{students.length} Students, {faculty.length} Faculty Members</p>
              </div>
              <button 
                onClick={() => { setActiveModal('none'); setShowAddStudent(false); }}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {/* Search & Add New Toggle */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Filter by name..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  onClick={() => setShowAddStudent(!showAddStudent)}
                  className="px-2.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>

              {/* Add Student Form */}
              {showAddStudent && (
                <form onSubmit={handleCreateStudent} className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2 text-xs">
                  <h4 className="font-bold text-teal-900 text-xs">Enroll New Student</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={newStudentForm.name}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                      className="px-2.5 py-1.5 rounded-lg border border-teal-200 bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Roll No (e.g. 11)"
                      required
                      value={newStudentForm.rollNo}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, rollNo: e.target.value })}
                      className="px-2.5 py-1.5 rounded-lg border border-teal-200 bg-white"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={newStudentForm.email}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-teal-200 bg-white"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddStudent(false)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-teal-600 text-white font-semibold rounded"
                    >
                      Save Student
                    </button>
                  </div>
                </form>
              )}

              {/* Student list */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {students
                  .filter(s => s.name.toLowerCase().includes(userSearch.toLowerCase()))
                  .map(s => (
                    <div key={s.id} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-bold w-6">{s.rollNo}</span>
                        <div>
                          <span className="font-semibold text-slate-800 block">{s.name}</span>
                          <span className="text-[10px] text-slate-400">{s.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                        title="Delete student"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Manage Classes & Subjects */}
      {activeModal === 'classes' && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-teal-600" />
                  Classes & Subjects Catalog
                </h3>
                <p className="text-[10px] text-slate-400">{classes.length} Classes, {subjects.length} Subjects</p>
              </div>
              <button 
                onClick={() => { setActiveModal('none'); setShowAddClass(false); setShowAddSubject(false); }}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
              {/* Classes Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Enrolled Classes</h4>
                  <button
                    onClick={() => setShowAddClass(!showAddClass)}
                    className="text-teal-700 hover:underline font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <Plus className="w-3 h-3" /> Add Class
                  </button>
                </div>

                {showAddClass && (
                  <form onSubmit={handleCreateClass} className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2 mb-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Class Name (e.g. TE-B)"
                        required
                        value={newClassForm.name}
                        onChange={(e) => setNewClassForm({ ...newClassForm, name: e.target.value })}
                        className="px-2.5 py-1.5 rounded-lg border border-teal-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Room (e.g. CS-204)"
                        value={newClassForm.room}
                        onChange={(e) => setNewClassForm({ ...newClassForm, room: e.target.value })}
                        className="px-2.5 py-1.5 rounded-lg border border-teal-200 bg-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowAddClass(false)} className="px-2 text-slate-500">Cancel</button>
                      <button type="submit" className="px-3 py-1 bg-teal-600 text-white rounded font-medium">Save Class</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {classes.map(c => (
                    <div key={c.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800 block text-xs">{c.name}</span>
                      <span className="text-[10px] text-slate-500 block">{c.department}</span>
                      <span className="text-[10px] text-teal-700 font-medium block mt-1">{c.room}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subjects Section */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Subject Allocations</h4>
                  <button
                    onClick={() => setShowAddSubject(!showAddSubject)}
                    className="text-teal-700 hover:underline font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <Plus className="w-3 h-3" /> Add Subject
                  </button>
                </div>

                {showAddSubject && (
                  <form onSubmit={handleCreateSubject} className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2 mb-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Subject Name (e.g. AI/ML)"
                        required
                        value={newSubjectForm.name}
                        onChange={(e) => setNewSubjectForm({ ...newSubjectForm, name: e.target.value })}
                        className="px-2.5 py-1.5 rounded-lg border border-teal-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Code (e.g. AIM-305)"
                        required
                        value={newSubjectForm.code}
                        onChange={(e) => setNewSubjectForm({ ...newSubjectForm, code: e.target.value })}
                        className="px-2.5 py-1.5 rounded-lg border border-teal-200 bg-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowAddSubject(false)} className="px-2 text-slate-500">Cancel</button>
                      <button type="submit" className="px-3 py-1 bg-teal-600 text-white rounded font-medium">Save Subject</button>
                    </div>
                  </form>
                )}

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {subjects.map(sub => (
                    <div key={sub.id} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <span className="font-semibold text-slate-800 block">{sub.name}</span>
                        <span className="text-[10px] text-slate-400">{sub.fullName} • {sub.code}</span>
                      </div>
                      <span className="text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-medium">
                        {sub.facultyName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Generate Reports & Defaulter Audit */}
      {activeModal === 'reports' && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-teal-600" />
                  College Attendance Audit & Defaulters
                </h3>
                <p className="text-[10px] text-slate-400">Audit threshold: minimum 75% attendance</p>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-red-800 block">Critical Defaulters List</span>
                  <span className="text-[10px] text-red-600">{defaulterStudents.length} Students below 75% threshold</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-xs"
                >
                  Print Notice
                </button>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {defaulterStudents.map(student => {
                  const s = getStudentStats(student.id);
                  return (
                    <div key={student.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <span className="font-bold text-slate-800">{student.name} (Roll {student.rollNo})</span>
                        <span className="text-[10px] text-red-600 block">
                          Low subjects: {s.lowSubjects.map(sub => `${sub.name} (${sub.percentage}%)`).join(', ') || 'Overall ' + s.overall + '%'}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-red-600 font-mono">
                        {s.overall}% Overall
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Send Notice */}
      {activeModal === 'notice' && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 p-4 sm:p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Send className="w-4 h-4 text-teal-600" />
                Broadcast College Notice
              </h3>
              <button onClick={() => setActiveModal('none')} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {noticeSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Notice broadcasted successfully to all student & faculty feeds!</span>
              </div>
            ) : (
              <form onSubmit={handleSendNotice} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Notice Title</label>
                  <input
                    type="text"
                    required
                    value={noticeForm.title}
                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    placeholder="e.g. Internal Exam Attendance Cutoff"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Priority Level</label>
                  <select
                    value={noticeForm.priority}
                    onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                  >
                    <option value="High">High (Immediate Alert Banner)</option>
                    <option value="Medium">Medium (General Circular)</option>
                    <option value="Low">Low (Informational)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Notice Content</label>
                  <textarea
                    rows={4}
                    required
                    value={noticeForm.content}
                    onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                    placeholder="Write your announcement details here..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal('none')}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs"
                  >
                    Broadcast Notice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
