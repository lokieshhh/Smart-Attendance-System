import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, CalendarCheck, BarChart3, Bell, FileText, ShieldAlert } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab, currentUser, unreadAlertCount } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'attend', label: 'Attend.', icon: CalendarCheck },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'leave', label: 'Leave', icon: FileText },
    { 
      id: 'alerts', 
      label: 'Alerts', 
      icon: Bell, 
      badge: unreadAlertCount > 0 ? unreadAlertCount : null 
    },
  ];

  // If user is admin, add Admin tab
  if (currentUser?.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin', icon: ShieldAlert });
  }

  return (
    <nav className="border-t border-slate-200 bg-white/95 backdrop-blur-sm px-2 py-1.5 flex items-center justify-around select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-normal'}`}>
              {item.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
