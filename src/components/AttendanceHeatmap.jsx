import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Flame, Award, Info } from 'lucide-react';

export const AttendanceHeatmap = () => {
  const { currentUser, attendanceRecords } = useApp();
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate 31 days of October with realistic attendance patterns for the active student
  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const isWeekend = (day % 7 === 4 || day % 7 === 5); // Simulated weekends

    // Check sessions on this day
    let attended = 0;
    let total = 0;

    if (!isWeekend) {
      total = 4; // 4 lectures a day
      // Days 1-5, 8-12, 14, 18, 20, 22
      if ([1, 2, 6, 7, 8, 9, 13, 14, 15, 16, 20, 21, 22].includes(day)) {
        attended = 4; // 100%
      } else if ([3, 10, 17].includes(day)) {
        attended = 3; // 75%
      } else if ([5, 12, 19].includes(day)) {
        attended = 1; // 25% (Absent most classes)
      } else {
        attended = 4;
      }
    }

    const pct = total > 0 ? (attended / total) * 100 : 0;

    return {
      day,
      date: `2026-10-${String(day).padStart(2, '0')}`,
      isWeekend,
      attended,
      total,
      pct
    };
  });

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-teal-600" />
          October Attendance Heatmap
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
          <span>6-Day Streak</span>
        </div>
      </div>

      {/* Heatmap Grid (7 columns x 5 weeks) */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-7 gap-1.5 text-center text-[9px] font-bold text-slate-400 uppercase">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {daysInMonth.map((d) => {
            let bgClass = 'bg-slate-100 text-slate-400';

            if (!d.isWeekend) {
              if (d.pct === 100) bgClass = 'bg-teal-600 text-white font-bold hover:bg-teal-700';
              else if (d.pct >= 75) bgClass = 'bg-teal-400 text-white font-semibold hover:bg-teal-500';
              else if (d.pct >= 50) bgClass = 'bg-amber-400 text-white font-semibold hover:bg-amber-500';
              else bgClass = 'bg-red-500 text-white font-bold hover:bg-red-600';
            }

            return (
              <div
                key={d.day}
                onMouseEnter={() => setHoveredDay(d)}
                onMouseLeave={() => setHoveredDay(null)}
                onClick={() => setHoveredDay(d)}
                className={`aspect-square rounded-lg flex items-center justify-center text-[10px] cursor-pointer transition-all transform hover:scale-110 shadow-3xs ${bgClass}`}
              >
                {d.day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover Detail Card */}
      {hoveredDay ? (
        <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-center justify-between">
          <span className="font-semibold">{hoveredDay.date}:</span>
          {hoveredDay.isWeekend ? (
            <span className="text-slate-400">Campus Weekend / Holiday</span>
          ) : (
            <span className="font-bold text-teal-800">
              {hoveredDay.attended}/{hoveredDay.total} Lectures ({Math.round(hoveredDay.pct)}%)
            </span>
          )}
        </div>
      ) : (
        /* Legend */
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 border border-slate-300" /> Holiday
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-red-500" /> Absent (&lt;50%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-400" /> Partial (75%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-teal-600" /> Full (100%)
          </span>
        </div>
      )}
    </div>
  );
};
