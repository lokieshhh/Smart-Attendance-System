import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Check, 
  X, 
  Send,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LeaveManagementScreen = () => {
  const { 
    currentUser, 
    leaveRequests, 
    submitLeaveRequest, 
    reviewLeaveRequest 
  } = useApp();

  const isStudent = currentUser?.role === 'student';
  const isFacultyOrAdmin = currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  // Apply Form State (Student)
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Medical Leave');
  const [fromDate, setFromDate] = useState('2026-10-25');
  const [toDate, setToDate] = useState('2026-10-26');
  const [reason, setReason] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  // Filter tab for faculty
  const [statusFilter, setStatusFilter] = useState('Pending'); // 'Pending', 'Approved', 'All'

  // Remarks state for approvals
  const [reviewerRemarks, setReviewerRemarks] = useState({});

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    submitLeaveRequest({
      leaveType,
      fromDate,
      toDate,
      reason
    });

    setApplySuccess(true);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#0d9488', '#14b8a6']
      });
    } catch (err) { /* ignore */ }

    setTimeout(() => {
      setApplySuccess(false);
      setShowApplyModal(false);
      setReason('');
    }, 1200);
  };

  const handleReview = (leaveId, newStatus) => {
    const remark = reviewerRemarks[leaveId] || (newStatus === 'Approved' ? 'Approved by faculty' : 'Declined as per policy');
    reviewLeaveRequest(leaveId, newStatus, remark);
    setReviewerRemarks(prev => {
      const copy = { ...prev };
      delete copy[leaveId];
      return copy;
    });
  };

  // Filter leaves based on user role
  const displayLeaves = isStudent
    ? leaveRequests.filter(l => l.studentId === currentUser?.id)
    : leaveRequests.filter(l => statusFilter === 'All' ? true : l.status === statusFilter);

  const pendingCount = leaveRequests.filter(l => l.status === 'Pending').length;

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-teal-600" />
            Leave Management
          </h2>
          <p className="text-[11px] text-slate-500">
            {isStudent 
              ? 'Request excused absences for medical, academic, or personal reasons' 
              : `Review & approve student absence applications (${pendingCount} pending)`}
          </p>
        </div>

        {isStudent && (
          <button
            onClick={() => setShowApplyModal(true)}
            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Apply Leave
          </button>
        )}
      </div>

      {/* Faculty Filter Tabs */}
      {isFacultyOrAdmin && (
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setStatusFilter('Pending')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-center transition-all ${
              statusFilter === 'Pending'
                ? 'bg-white text-teal-800 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending Requests ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter('Approved')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-center transition-all ${
              statusFilter === 'Approved'
                ? 'bg-white text-teal-800 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setStatusFilter('All')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-center transition-all ${
              statusFilter === 'All'
                ? 'bg-white text-teal-800 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All History
          </button>
        </div>
      )}

      {/* Leave Cards List */}
      <div className="space-y-3">
        {displayLeaves.map((leave) => {
          const isPending = leave.status === 'Pending';
          const isApproved = leave.status === 'Approved';

          return (
            <div
              key={leave.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3"
            >
              {/* Top Row: Type & Status Badge */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-800 block">
                    {leave.leaveType}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Applied on: {leave.appliedOn}
                  </span>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isPending
                      ? 'bg-amber-100 text-amber-800'
                      : isApproved
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {leave.status}
                </span>
              </div>

              {/* Student info (visible to faculty/admin) */}
              {!isStudent && (
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">Student:</span>
                  <span className="text-slate-800 font-medium">{leave.studentName}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">Roll: {leave.rollNo}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-teal-700 font-semibold">{leave.className}</span>
                </div>
              )}

              {/* Date details */}
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100">
                <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-semibold text-teal-900">
                  {leave.fromDate} to {leave.toDate}
                </span>
                <span className="text-teal-700 font-medium text-[11px]">
                  ({leave.totalDays} day{leave.totalDays > 1 ? 's' : ''})
                </span>
              </div>

              {/* Reason */}
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-700 block mb-0.5">Reason:</span>
                {leave.reason}
              </p>

              {/* Faculty Review Section (If reviewed) */}
              {leave.reviewedBy && (
                <div className="text-[11px] p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
                  <span className="font-semibold text-slate-700">Reviewed by:</span> {leave.reviewedBy} on {leave.reviewDate}
                  {leave.remarks && (
                    <p className="italic text-slate-500 mt-0.5">"{leave.remarks}"</p>
                  )}
                </div>
              )}

              {/* Faculty Action Buttons: Approve / Reject (Only for Pending requests) */}
              {isFacultyOrAdmin && isPending && (
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <input
                    type="text"
                    placeholder="Add optional faculty remark..."
                    value={reviewerRemarks[leave.id] || ''}
                    onChange={(e) => setReviewerRemarks({ ...reviewerRemarks, [leave.id]: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleReview(leave.id, 'Rejected')}
                      className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReview(leave.id, 'Approved')}
                      className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {displayLeaves.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
            <p className="text-xs font-bold text-slate-700">No leave requests found</p>
            <p className="text-[11px] text-slate-400">
              {isStudent ? 'You have not submitted any leave applications yet.' : 'All leave applications are resolved.'}
            </p>
          </div>
        )}
      </div>

      {/* Student Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 text-left animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-600" />
                Submit Leave Application
              </h3>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Leave request submitted! Faculty will review it shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Leave Type</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                  >
                    <option value="Medical Leave">Medical Leave (Doctor Certificate)</option>
                    <option value="Academic / Hackathon">Academic Event / Hackathon Duty</option>
                    <option value="Sports Duty Leave">Sports Duty / Inter-College</option>
                    <option value="Personal / Family">Personal / Family Emergency</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">From Date</label>
                    <input
                      type="date"
                      required
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">To Date</label>
                    <input
                      type="date"
                      required
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Reason Description</label>
                  <textarea
                    rows={3}
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly state the reason for absence..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs"
                  >
                    Submit Request
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
