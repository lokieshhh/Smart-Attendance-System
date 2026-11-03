import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './components/LoginScreen';
import { StudentDashboard } from './components/StudentDashboard';
import { MarkAttendanceScreen } from './components/MarkAttendanceScreen';
import { AttendanceReportScreen } from './components/AttendanceReportScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { AdminPanelScreen } from './components/AdminPanelScreen';
import { LeaveManagementScreen } from './components/LeaveManagementScreen';
import { Toast } from './components/Toast';
import { 
  Smartphone, 
  Monitor, 
  Home, 
  CalendarCheck, 
  BarChart3, 
  Bell, 
  FileText, 
  ShieldAlert, 
  User, 
  GraduationCap,
  Sparkles,
  ExternalLink,
  RotateCcw,
  LogIn,
  Lock,
  Briefcase
} from 'lucide-react';

export default function App() {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    viewMode, 
    setViewMode, 
    switchUserRole,
    loginFaculty,
    loginStudent,
    loginAdmin,
    logout,
    unreadAlertCount,
    resetAllData
  } = useApp();

  // Helper to render the active screen content
  const renderScreenContent = () => {
    if (!currentUser) {
      return <LoginScreen />;
    }

    switch (activeTab) {
      case 'home':
        if (currentUser.role === 'admin') return <AdminPanelScreen />;
        if (currentUser.role === 'faculty') return <MarkAttendanceScreen />;
        return <StudentDashboard />;
      case 'attend':
        return <MarkAttendanceScreen />;
      case 'reports':
        return <AttendanceReportScreen />;
      case 'leave':
        return <LeaveManagementScreen />;
      case 'alerts':
        return <NotificationsScreen />;
      case 'admin':
        return <AdminPanelScreen />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Universal App Bar */}
      <Header />

      {/* Floating System Toast Alerts */}
      <Toast />

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 lg:p-8">
        
        {/* Quick Mockup Screen Jump Bar (Matches Figure 1: 6 Screens + Shortcuts) */}
        <div className="w-full max-w-4xl mb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 pl-2 text-slate-500 dark:text-slate-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">Inspect Mockup Screens:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {/* Screen 1: Login */}
            <button
              onClick={() => { logout(); }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                !currentUser 
                  ? 'bg-slate-900 dark:bg-teal-600 text-white font-bold' 
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
              }`}
            >
              1. Login / Portals
            </button>

            {/* Screen 2: Student Dashboard */}
            <button
              onClick={() => {
                if (!currentUser || currentUser.role !== 'student') {
                  loginStudent('aarav.patil@college.edu');
                } else {
                  setActiveTab('home');
                }
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                currentUser?.role === 'student' && activeTab === 'home'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
              }`}
            >
              2. Student Dashboard
            </button>

            {/* Screen 3: Mark Attendance (Faculty Protected) */}
            <button
              onClick={() => {
                setActiveTab('attend');
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'attend' 
                  ? 'bg-teal-600 text-white font-bold' 
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>3. Mark Attendance</span>
              {currentUser?.role !== 'faculty' && currentUser?.role !== 'admin' && (
                <Lock className="w-3 h-3 text-amber-500" />
              )}
            </button>

            {/* Screen 4: Attendance Report */}
            <button
              onClick={() => {
                if (!currentUser) loginStudent('aarav.patil@college.edu');
                setActiveTab('reports');
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'reports' ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
              }`}
            >
              4. Attendance Report
            </button>

            {/* Screen 5: Notifications */}
            <button
              onClick={() => {
                if (!currentUser) loginStudent('aarav.patil@college.edu');
                setActiveTab('alerts');
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'alerts' ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
              }`}
            >
              5. Notifications
            </button>

            {/* Screen 6: Admin Panel */}
            <button
              onClick={() => {
                loginAdmin();
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'admin' ? 'bg-slate-900 dark:bg-teal-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
              }`}
            >
              6. Admin Panel
            </button>

            {/* Leave Management */}
            <button
              onClick={() => {
                if (!currentUser) loginStudent('aarav.patil@college.edu');
                setActiveTab('leave');
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'leave' ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
              }`}
            >
              Leave Mgmt
            </button>
          </div>
        </div>

        {/* View Mode 1: Mobile Phone Mockup Frame (Directly matching user image) */}
        {viewMode === 'mobile' ? (
          <div className="w-full max-w-[390px] min-h-[750px] bg-slate-900 rounded-[44px] p-3 shadow-2xl mobile-frame-shadow transition-all relative flex flex-col my-auto border-4 border-slate-800">
            {/* Top Phone Speaker / Dynamic Island */}
            <div className="w-28 h-5 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900/90 mr-2" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>

            {/* Phone Screen Canvas */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden flex flex-col relative border border-slate-200 dark:border-slate-800">
              
              {/* Screen Header Bar */}
              <div className="bg-slate-900 text-white px-4 py-2 text-center text-xs font-semibold select-none flex items-center justify-between">
                <span>
                  {!currentUser && 'Screen 1: Login / Portals'}
                  {currentUser && activeTab === 'home' && currentUser.role === 'student' && 'Screen 2: Student Dashboard'}
                  {currentUser && activeTab === 'attend' && 'Screen 3: Mark Attendance'}
                  {currentUser && activeTab === 'reports' && 'Screen 4: Attendance Report'}
                  {currentUser && activeTab === 'alerts' && 'Screen 5: Notifications'}
                  {currentUser && activeTab === 'admin' && 'Screen 6: Admin Panel'}
                  {currentUser && activeTab === 'leave' && 'Leave Management'}
                </span>
                {currentUser && (
                  <span className="text-[10px] text-teal-400 font-bold uppercase">
                    {currentUser.role}
                  </span>
                )}
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {renderScreenContent()}
              </div>

              {/* Screen Bottom Navigation */}
              {currentUser && <BottomNav />}
            </div>

            {/* Bottom Home Indicator */}
            <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
          </div>
        ) : (
          /* View Mode 2: Full Responsive Desktop / Tablet Portal */
          <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 bg-slate-900 text-white p-5 flex flex-col justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    SA
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Smart Attendance</h3>
                    <p className="text-[10px] text-teal-400">Campus Digital Portal</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-medium">
                  {currentUser ? (
                    <>
                      <button
                        onClick={() => setActiveTab('home')}
                        className={`w-full p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                          activeTab === 'home' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        Dashboard
                      </button>

                      <button
                        onClick={() => setActiveTab('attend')}
                        className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-colors ${
                          activeTab === 'attend' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <CalendarCheck className="w-4 h-4" />
                          Mark Attendance
                        </span>
                        {currentUser.role !== 'faculty' && currentUser.role !== 'admin' && (
                          <Lock className="w-3.5 h-3.5 text-amber-400" title="Faculty Only" />
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab('reports')}
                        className={`w-full p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                          activeTab === 'reports' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <BarChart3 className="w-4 h-4" />
                        Attendance Reports
                      </button>

                      <button
                        onClick={() => setActiveTab('leave')}
                        className={`w-full p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                          activeTab === 'leave' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        Leave Management
                      </button>

                      <button
                        onClick={() => setActiveTab('alerts')}
                        className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-colors ${
                          activeTab === 'alerts' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Bell className="w-4 h-4" />
                          Alerts & Notices
                        </span>
                        {unreadAlertCount > 0 && (
                          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                            {unreadAlertCount}
                          </span>
                        )}
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => setActiveTab('admin')}
                          className={`w-full p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                            activeTab === 'admin' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          <ShieldAlert className="w-4 h-4" />
                          Admin Panel
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-slate-300 text-xs space-y-2">
                      <p className="font-semibold text-white">Select a Portal to Sign In:</p>
                      <button
                        onClick={() => logout()}
                        className="w-full py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700"
                      >
                        Open Portal Logins
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {currentUser && (
                <div className="pt-4 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5 mb-2">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <span className="font-bold text-white block truncate">{currentUser.name}</span>
                      <span className="text-[10px] text-teal-400 uppercase font-semibold">{currentUser.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Class: {currentUser.className || 'SE-A'}</span>
                </div>
              )}
            </aside>

            {/* Desktop Main Content Area */}
            <div className="flex-1 bg-slate-50/50 dark:bg-slate-950/50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
              <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-2 sm:p-4">
                {renderScreenContent()}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-3 px-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <p className="flex items-center justify-center gap-2">
          <span>Smart Attendance System Pro • Built for Netlify & Vercel</span>
          <span>•</span>
          <button 
            onClick={() => {
              if (window.confirm('Reset all demo data back to default?')) {
                resetAllData();
              }
            }} 
            className="text-teal-700 dark:text-teal-400 hover:underline font-semibold"
          >
            Reset Demo Data
          </button>
        </p>
      </footer>
    </div>
  );
}
