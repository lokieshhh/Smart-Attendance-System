import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, X, AlertTriangle, CheckCircle2, MessageSquare, Phone, Clock, ShieldAlert } from 'lucide-react';

export const ParentAlertModal = ({ isOpen, onClose }) => {
  const { students, getStudentStats, parentNotices, sendParentNotice } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  if (!isOpen) return null;

  // Filter students who are below 75% in at least one subject or overall
  const defaulters = students.filter(student => {
    const s = getStudentStats(student.id);
    return s.overall < 75 || s.lowSubjects.length > 0;
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    const student = students.find(s => s.id === selectedStudentId);
    const sStats = getStudentStats(selectedStudentId);
    const subName = selectedSubject || sStats.lowSubjects[0]?.name || 'Overall Coursework';
    const pct = sStats.lowSubjects.find(sub => sub.name === subName)?.percentage || sStats.overall;

    sendParentNotice(selectedStudentId, subName, pct, customMessage);
    setDispatchSuccess(true);
    setTimeout(() => {
      setDispatchSuccess(false);
      setCustomMessage('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Parent Alert & Defaulter Desk</h3>
              <p className="text-[10px] text-red-300">Official SMS & WhatsApp notification dispatcher</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Summary Banner */}
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="font-bold text-red-900 block">Critical Defaulters Identified:</span>
              <span className="text-[11px] text-red-700">{defaulters.length} students currently below mandatory 75%</span>
            </div>
            <span className="text-xs font-mono font-bold bg-red-200/80 text-red-800 px-2 py-1 rounded-lg">
              Action Required
            </span>
          </div>

          {/* Defaulter Selector Form */}
          <form onSubmit={handleSend} className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Dispatch Parent Warning Notice
            </h4>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Select Defaulter Student</label>
              <select
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value);
                  const st = students.find(s => s.id === e.target.value);
                  if (st) {
                    const stStats = getStudentStats(st.id);
                    const sub = stStats.lowSubjects[0]?.name || 'Chemistry';
                    setSelectedSubject(sub);
                    setCustomMessage(`Dear ${st.parentName || 'Parent'}, your ward ${st.name} (Roll ${st.rollNo}) has an attendance of ${stStats.lowSubjects[0]?.percentage || stStats.overall}% in ${sub}, which is below the mandatory 75%. Please contact the HOD immediately.`);
                  }
                }}
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium focus:ring-1 focus:ring-teal-500"
              >
                <option value="">-- Choose student below 75% --</option>
                {defaulters.map(student => {
                  const s = getStudentStats(student.id);
                  return (
                    <option key={student.id} value={student.id}>
                      {student.name} (Roll {student.rollNo}) • {s.lowSubjects.map(sub => `${sub.name}: ${sub.percentage}%`).join(', ') || `Overall: ${s.overall}%`}
                    </option>
                  );
                })}
              </select>
            </div>

            {selectedStudentId && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Parent / Guardian</label>
                    <input
                      type="text"
                      disabled
                      value={students.find(s => s.id === selectedStudentId)?.parentName || 'Parent'}
                      className="w-full p-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Registered Phone</label>
                    <input
                      type="text"
                      disabled
                      value={students.find(s => s.id === selectedStudentId)?.parentPhone || '+91 98220 00000'}
                      className="w-full p-2 bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">SMS / WhatsApp Template Message</label>
                  <textarea
                    rows={3}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Instant Alert (SMS & WhatsApp)
                </button>
              </>
            )}

            {dispatchSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Notice dispatched and logged successfully!</span>
              </div>
            )}
          </form>

          {/* Dispatched Notices Log */}
          <div>
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              Recent Dispatch Log ({parentNotices.length})
            </h4>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {parentNotices.map((n) => (
                <div key={n.id} className="p-3 bg-white border border-slate-200 rounded-2xl text-[11px] space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{n.studentName} &rarr; {n.parentPhone}</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                      {n.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[10px] leading-relaxed">"{n.message}"</p>
                  <span className="text-[9px] text-slate-400 block pt-0.5">{n.sentAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
