import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, CheckCircle2, PlayCircle, BookOpen, QrCode } from 'lucide-react';

export const TimetableWidget = ({ onLaunchQR }) => {
  const { timetable, currentUser, startQRSession } = useApp();

  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-teal-600" />
          Today's Lecture Schedule
        </h3>
        <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
          Thursday, 22 Oct
        </span>
      </div>

      <div className="space-y-2">
        {timetable.map((slot) => {
          const isLive = slot.status === 'Live Now';
          const isCompleted = slot.status === 'Completed';

          return (
            <div
              key={slot.period}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                isLive
                  ? 'bg-teal-50/90 border-teal-300 shadow-2xs ring-1 ring-teal-400/30'
                  : isCompleted
                  ? 'bg-slate-50/70 border-slate-200 opacity-90'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Left: Timing & Period */}
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isLive
                    ? 'bg-teal-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  P{slot.period}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-800">{slot.subject}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({slot.code})</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    <span>{slot.time}</span>
                    <span>•</span>
                    <span className="text-teal-700 font-medium">{slot.room}</span>
                  </div>
                </div>
              </div>

              {/* Right: Status Pill & Action */}
              <div className="flex items-center gap-2">
                {isLive ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-600 text-white flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    LIVE NOW
                  </span>
                ) : isCompleted ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    ATTENDED
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-slate-100 text-slate-500">
                    UPCOMING
                  </span>
                )}

                {/* Quick Faculty Action */}
                {isFaculty && isLive && onLaunchQR && (
                  <button
                    onClick={onLaunchQR}
                    className="p-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition-colors"
                    title="Launch Live QR for this Lecture"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
