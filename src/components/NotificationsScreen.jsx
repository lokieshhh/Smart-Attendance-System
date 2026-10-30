import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  CheckCheck, 
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const NotificationsScreen = () => {
  const { 
    notifications, 
    markAllNotificationsAsRead, 
    setActiveTab, 
    currentUser 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'alerts', 'leave'

  // Filter notifications for current user (or general notices)
  const userNotifications = useMemo(() => {
    return notifications.filter(n => !n.studentId || n.studentId === (currentUser?.id || 'stu_01'));
  }, [notifications, currentUser]);

  const filteredList = useMemo(() => {
    if (activeFilter === 'alerts') {
      return userNotifications.filter(n => n.type === 'critical' || n.category === 'alert');
    }
    if (activeFilter === 'leave') {
      return userNotifications.filter(n => n.category === 'leave');
    }
    return userNotifications;
  }, [userNotifications, activeFilter]);

  return (
    <div className="space-y-3.5 max-w-xl mx-auto p-4 sm:p-5">
      {/* Screen Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-teal-600" />
          Screen 5: Notifications
        </h2>
        <span className="text-[11px] text-slate-500">
          {userNotifications.filter(n => !n.read).length} Unread Alerts
        </span>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-full font-medium transition-all ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Updates
        </button>
        <button
          onClick={() => setActiveFilter('alerts')}
          className={`px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1 ${
            activeFilter === 'alerts'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-red-600 hover:bg-red-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
          Low Attendance Alerts
        </button>
        <button
          onClick={() => setActiveFilter('leave')}
          className={`px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1 ${
            activeFilter === 'leave'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-teal-700 hover:bg-teal-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
          Leave Approvals
        </button>
      </div>

      {/* Notification Cards List (Matching Screen 5 Mockup) */}
      <div className="space-y-2.5">
        {filteredList.map((notif) => {
          const isCritical = notif.type === 'critical';
          const isSuccess = notif.type === 'success';

          return (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl transition-all relative ${
                isCritical
                  ? 'bg-red-50/70 border-2 border-red-300/80 shadow-2xs' // Highlighted red border matching mockup item 1
                  : 'bg-white border border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Dot indicator matching mockup */}
                <div className="pt-1">
                  {isCritical ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-red-100 flex items-center justify-center animate-pulse" />
                  ) : isSuccess ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-teal-600 ring-4 ring-teal-100 flex items-center justify-center" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-400 ring-4 ring-slate-100 flex items-center justify-center" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-xs font-bold leading-tight ${
                      isCritical ? 'text-red-700' : 'text-slate-800'
                    }`}>
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0" />
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100/60 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {notif.time}
                    </span>

                    {/* Quick navigation if relevant */}
                    {isCritical && (
                      <button
                        onClick={() => setActiveTab('home')}
                        className="text-red-600 font-semibold hover:underline flex items-center gap-0.5"
                      >
                        View Subject
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                    {isSuccess && (
                      <button
                        onClick={() => setActiveTab('leave')}
                        className="text-teal-700 font-semibold hover:underline flex items-center gap-0.5"
                      >
                        View Status
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
            <p className="text-xs font-bold text-slate-700">All caught up!</p>
            <p className="text-[11px] text-slate-400">No unread notifications in this category.</p>
          </div>
        )}
      </div>

      {/* Mark all as read button matching mockup */}
      <button
        type="button"
        onClick={markAllNotificationsAsRead}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 mt-2"
      >
        <CheckCheck className="w-4 h-4 text-teal-400" />
        Mark all as read
      </button>
    </div>
  );
};
