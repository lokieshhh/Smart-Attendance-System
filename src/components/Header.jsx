import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Bell, 
  LogOut, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles,
  RotateCcw,
  Briefcase,
  ArrowRightLeft
} from 'lucide-react';

export const Header = () => {
  const { 
    currentUser, 
    logout, 
    viewMode, 
    setViewMode, 
    switchUserRole, 
    activeTab, 
    setActiveTab, 
    unreadAlertCount,
    resetAllData 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/25 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-bold text-slate-800 text-lg leading-tight flex items-center gap-1.5">
              Smart Attendance
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-teal-100 text-teal-800 rounded-full">Pro</span>
            </span>
            <p className="text-[11px] text-slate-500 hidden sm:block">Digital Attendance Marking & Early Alerts</p>
          </div>
        </div>

        {/* Current Active Portal Status / Quick Portal Switcher */}
        {currentUser ? (
          <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
            <span className="text-[11px] text-slate-400 font-semibold px-1">Active Portal:</span>
            {currentUser.role === 'student' ? (
              <span className="bg-teal-600 text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5" />
                Student Portal ({currentUser.name?.split(' ')[0]})
              </span>
            ) : currentUser.role === 'faculty' ? (
              <span className="bg-emerald-700 text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 shadow-2xs">
                <Briefcase className="w-3.5 h-3.5" />
                Faculty Portal ({currentUser.name?.split(' ')[0]})
              </span>
            ) : (
              <span className="bg-slate-900 text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Admin Portal
              </span>
            )}

            {/* Switch Account button */}
            <button
              onClick={logout}
              className="text-[11px] text-slate-600 hover:text-teal-700 hover:bg-slate-200/70 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
              title="Switch between Student & Faculty portals"
            >
              <ArrowRightLeft className="w-3 h-3" />
              Switch Portal
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Please sign in to access attendance:</span>
            <button
              onClick={() => setActiveTab('home')}
              className="px-3 py-1 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700"
            >
              Portal Login
            </button>
          </div>
        )}

        {/* Right Tools: View Mode Toggle, Alerts, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Mode Toggle: Phone Frame vs Desktop */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('mobile')}
              title="Mobile Mockup View (Matches 6-screen image)"
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === 'mobile'
                  ? 'bg-white text-teal-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px]">Mockup View</span>
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              title="Desktop Web Portal View"
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === 'desktop'
                  ? 'bg-white text-teal-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px]">Desktop Portal</span>
            </button>
          </div>

          {/* Notifications Button */}
          {currentUser && (
            <button
              onClick={() => setActiveTab('alerts')}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="Notifications & Early Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadAlertCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadAlertCount}
                </span>
              )}
            </button>
          )}

          {/* Reset Demo Data */}
          <button
            onClick={() => {
              if (window.confirm('Reset all demo data back to default?')) {
                resetAllData();
              }
            }}
            title="Reset Demo Data"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden sm:block"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Current User Badge & Logout */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/20"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[110px]">{currentUser.name}</p>
                  <p className="text-[10px] text-teal-700 font-semibold uppercase">{currentUser.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Log out"
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('home')}
              className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
