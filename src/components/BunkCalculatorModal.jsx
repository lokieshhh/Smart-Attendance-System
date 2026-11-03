import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, X, Sparkles, AlertTriangle, CheckCircle2, TrendingUp, Info, ArrowRight } from 'lucide-react';

export const BunkCalculatorModal = ({ isOpen, onClose }) => {
  const { currentUser, getStudentStats } = useApp();

  const stats = getStudentStats(currentUser?.id || 'stu_01');

  // Selected subject: 'overall' or subject id
  const [targetScope, setTargetScope] = useState('overall');

  // "What-If" simulation sliders
  const [extraAttended, setExtraAttended] = useState(0);
  const [extraBunked, setExtraBunked] = useState(0);

  // Goal target % (e.g. 75% or 80%)
  const [targetGoal, setTargetGoal] = useState(75);

  if (!isOpen) return null;

  // Active base numbers
  let baseAttended = stats.totalAttended;
  let baseTotal = stats.totalSessions;
  let currentPct = stats.overall;
  let scopeTitle = 'Overall Attendance';

  if (targetScope !== 'overall') {
    const sub = stats.subjects.find(s => s.id === targetScope);
    if (sub) {
      baseAttended = sub.attended;
      baseTotal = sub.total;
      currentPct = sub.percentage;
      scopeTitle = sub.name;
    }
  }

  // Simulated results
  const simulatedAttended = baseAttended + extraAttended;
  const simulatedTotal = baseTotal + extraAttended + extraBunked;
  const simulatedPct = simulatedTotal > 0 ? Math.round((simulatedAttended / simulatedTotal) * 100) : 0;
  const pctDiff = simulatedPct - currentPct;

  // Goal calculation:
  // (baseAttended + X) / (baseTotal + X) >= targetGoal / 100
  // X >= (targetGoal/100 * baseTotal - baseAttended) / (1 - targetGoal/100)
  const goalFraction = targetGoal / 100;
  let lecturesNeededForGoal = 0;
  let canBunkCount = 0;

  if (currentPct < targetGoal) {
    lecturesNeededForGoal = Math.ceil(Math.max(0, (goalFraction * baseTotal - baseAttended) / (1 - goalFraction)));
    if (lecturesNeededForGoal === 0) lecturesNeededForGoal = 1;
  } else {
    // How many can I bunk and stay >= targetGoal?
    // baseAttended / (baseTotal + Y) >= goalFraction => Y <= (baseAttended / goalFraction) - baseTotal
    canBunkCount = Math.max(0, Math.floor((baseAttended / goalFraction) - baseTotal));
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Bunk Calculator & Target Planner</h3>
              <p className="text-[10px] text-teal-400">Accurately predict attendance changes & safety limits</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Scope Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Select Subject to Simulate:
            </label>
            <select
              value={targetScope}
              onChange={(e) => {
                setTargetScope(e.target.value);
                setExtraAttended(0);
                setExtraBunked(0);
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-1 focus:ring-teal-500"
            >
              <option value="overall">Overall Attendance ({stats.overall}%)</option>
              {stats.subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}: {s.percentage}% ({s.attended}/{s.total}) {s.percentage < 75 ? '⚠️ DEF' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Current vs Simulated Comparison Display */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-teal-50/60 border border-teal-200 rounded-2xl text-center">
            <div className="border-r border-teal-200/80 pr-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Status</span>
              <span className={`text-3xl font-extrabold mt-1 block ${currentPct < 75 ? 'text-red-600' : 'text-teal-700'}`}>
                {currentPct}%
              </span>
              <span className="text-[10px] text-slate-500">
                {baseAttended}/{baseTotal} classes
              </span>
            </div>

            <div className="pl-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Predicted Result</span>
              <div className="inline-flex items-baseline gap-1 mt-1">
                <span className={`text-3xl font-extrabold ${simulatedPct < 75 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {simulatedPct}%
                </span>
                {pctDiff !== 0 && (
                  <span className={`text-xs font-bold ${pctDiff > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {pctDiff > 0 ? `+${pctDiff}%` : `${pctDiff}%`}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {simulatedAttended}/{simulatedTotal} classes
              </span>
            </div>
          </div>

          {/* Quick Simulation Adjusters */}
          <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              1. "What-If" Live Adjuster
            </span>

            {/* If I attend next X classes */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600 font-medium">If I attend next lectures:</span>
                <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                  +{extraAttended} classes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={extraAttended}
                onChange={(e) => setExtraAttended(parseInt(e.target.value, 10))}
                className="w-full accent-teal-600"
              />
            </div>

            {/* If I bunk next Y classes */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600 font-medium">If I bunk / miss next lectures:</span>
                <span className="font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-md">
                  -{extraBunked} classes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={extraBunked}
                onChange={(e) => setExtraBunked(parseInt(e.target.value, 10))}
                className="w-full accent-red-500"
              />
            </div>
          </div>

          {/* Target Goal Advice Card */}
          <div className="p-4 rounded-2xl border bg-white space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                2. Target Goal Advice
              </span>

              {/* Goal Selector */}
              <div className="flex items-center gap-1 text-[10px] font-bold">
                {[75, 80, 85].map(g => (
                  <button
                    key={g}
                    onClick={() => setTargetGoal(g)}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      targetGoal === g ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {g}%
                  </button>
                ))}
              </div>
            </div>

            {currentPct < targetGoal ? (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Defaulter Warning:</span>
                  <p className="text-[11px] mt-0.5 leading-relaxed">
                    You currently have {currentPct}%. You must attend the next <b>{lecturesNeededForGoal} consecutive lectures</b> without missing any to hit your target goal of {targetGoal}%.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Safe Standing:</span>
                  <p className="text-[11px] mt-0.5 leading-relaxed">
                    You are currently above {targetGoal}%. You can safely miss up to <b>{canBunkCount} lectures</b> and still maintain eligibility!
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
