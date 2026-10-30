import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_NOTIFICATIONS,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ADMIN_STATS,
  generateInitialAttendanceRecords
} from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEYS = {
  CURRENT_USER: 'smart_attend_user',
  CLASSES: 'smart_attend_classes',
  SUBJECTS: 'smart_attend_subjects',
  STUDENTS: 'smart_attend_students',
  FACULTY: 'smart_attend_faculty',
  ATTENDANCE: 'smart_attend_records',
  NOTIFICATIONS: 'smart_attend_notifications',
  LEAVES: 'smart_attend_leaves',
  ANNOUNCEMENTS: 'smart_attend_announcements',
  VIEW_MODE: 'smart_attend_view_mode'
};

export const AppProvider = ({ children }) => {
  // 1. Current logged in user (starts null so user sees the login page first)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try { 
        return JSON.parse(saved); 
      } catch (e) { 
        /* ignore */ 
      }
    }
    return null; // Prompt for login
  });

  // 2. Active Tab & Display View Mode
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'attend', 'reports', 'alerts', 'leave', 'admin'
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || 'mobile'; // 'mobile' | 'desktop'
  });

  // 3. Database States
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLASSES);
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FACULTY);
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return saved ? JSON.parse(saved) : generateInitialAttendanceRecords();
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [leaveRequests, setLeaveRequests] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEAVES);
    return saved ? JSON.parse(saved) : INITIAL_LEAVE_REQUESTS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // Sync state changes with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode);
  }, [viewMode]);

  // --- AUTHENTICATION & LOGIN LOGIC ---

  // Student Login by email or Roll Number
  const loginStudent = (identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const student = students.find(s => 
      s.email.toLowerCase() === cleanId || 
      s.rollNo.toLowerCase() === cleanId || 
      s.name.toLowerCase().includes(cleanId)
    );

    if (!student) {
      return { success: false, error: 'Student not found with this Email or Roll Number.' };
    }

    const assignedClass = classes.find(c => c.id === student.classId);
    const userSession = {
      ...student,
      role: 'student',
      className: assignedClass?.name || 'SE-A',
      department: assignedClass?.department || 'Computer Engineering'
    };

    setCurrentUser(userSession);
    setActiveTab('home');
    return { success: true, user: userSession };
  };

  // 1-Click Login as a specific Student (For testing different attendance profiles!)
  const loginStudentById = (studentId) => {
    const student = students.find(s => s.id === studentId) || students[0];
    const assignedClass = classes.find(c => c.id === student.classId);
    const userSession = {
      ...student,
      role: 'student',
      className: assignedClass?.name || 'SE-A',
      department: assignedClass?.department || 'Computer Engineering'
    };
    setCurrentUser(userSession);
    setActiveTab('home');
  };

  // Faculty Login by email or Staff ID
  const loginFaculty = (identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const teacher = faculty.find(f => 
      f.email.toLowerCase() === cleanId || 
      f.staffId.toLowerCase() === cleanId ||
      f.name.toLowerCase().includes(cleanId)
    );

    if (!teacher) {
      return { success: false, error: 'Faculty not found with this Staff ID or Email.' };
    }

    const userSession = {
      ...teacher,
      role: 'faculty',
      avatar: teacher.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    };

    setCurrentUser(userSession);
    setActiveTab('attend'); // Direct faculty straight to Mark Attendance
    return { success: true, user: userSession };
  };

  // 1-Click Login as a specific Faculty
  const loginFacultyById = (facultyId) => {
    const teacher = faculty.find(f => f.id === facultyId) || faculty[0];
    const userSession = {
      ...teacher,
      role: 'faculty',
      avatar: teacher.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    };
    setCurrentUser(userSession);
    setActiveTab('attend');
  };

  // Admin Login
  const loginAdmin = () => {
    const userSession = {
      id: 'adm_01',
      name: 'Dr. V. K. Mehta (Dean / Principal)',
      email: 'admin@college.edu',
      role: 'admin',
      designation: 'Institutional Head & Controller of Exams',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
    };
    setCurrentUser(userSession);
    setActiveTab('admin');
    return { success: true, user: userSession };
  };

  // Unified legacy login helper for compatibility
  const login = (role, customEmail) => {
    if (role === 'student') {
      loginStudent(customEmail || 'aarav.patil@college.edu');
    } else if (role === 'faculty') {
      loginFaculty(customEmail || 'rk.sharma@college.edu');
    } else if (role === 'admin') {
      loginAdmin();
    }
  };

  // Logout clears session
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
    setActiveTab('home');
  };

  // Quick switch role
  const switchUserRole = (targetRole) => {
    login(targetRole);
  };

  // --- CREATE LOGIN ID / REGISTRATION ---

  // Register a new Student ID
  const registerStudent = ({ name, rollNo, classId, email, password }) => {
    // Check if roll number or email is already taken in this class
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanRoll = (rollNo || '').trim();

    if (students.some(s => s.classId === classId && s.rollNo === cleanRoll)) {
      return { success: false, error: `Roll number ${cleanRoll} already exists in this class.` };
    }
    if (students.some(s => s.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: `Email ${cleanEmail} is already registered.` };
    }

    const newId = 'stu_' + Date.now();
    const assignedClass = classes.find(c => c.id === classId) || classes[0];

    const newStudent = {
      id: newId,
      rollNo: cleanRoll,
      name: name.trim(),
      classId: assignedClass.id,
      email: cleanEmail,
      phone: '+91 98000 00000',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`
    };

    // Populate initial attendance sessions for this student so their dashboard is fully functional
    const updatedRecords = { ...attendanceRecords };
    Object.keys(updatedRecords).forEach(sessionKey => {
      const session = updatedRecords[sessionKey];
      if (session.classId === assignedClass.id) {
        // Assign 85% attendance by default
        session.statuses[newId] = Math.random() > 0.15 ? 'P' : 'A';
      }
    });

    setAttendanceRecords(updatedRecords);
    setStudents(prev => [...prev, newStudent]);

    // Automatically log in the new student
    const sessionUser = {
      ...newStudent,
      role: 'student',
      className: assignedClass.name,
      department: assignedClass.department
    };
    setCurrentUser(sessionUser);
    setActiveTab('home');

    return { success: true, user: sessionUser };
  };

  // Register a new Faculty Member
  const registerFaculty = ({ name, staffId, department, email, password, assignedSubjects }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanStaffId = (staffId || '').trim().toUpperCase();

    if (faculty.some(f => f.staffId === cleanStaffId)) {
      return { success: false, error: `Staff ID ${cleanStaffId} is already registered.` };
    }

    const newId = 'fac_' + Date.now();
    const newFaculty = {
      id: newId,
      staffId: cleanStaffId,
      name: name.trim(),
      department: department || 'Computer Engineering',
      email: cleanEmail,
      designation: 'Assistant Professor',
      assignedSubjects: assignedSubjects || ['sub_maths'],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`
    };

    setFaculty(prev => [...prev, newFaculty]);

    // Automatically log in the new faculty
    const sessionUser = {
      ...newFaculty,
      role: 'faculty'
    };
    setCurrentUser(sessionUser);
    setActiveTab('attend');

    return { success: true, user: sessionUser };
  };

  // --- ATTENDANCE FUNCTIONS ---

  // Helper: Get or query attendance for a given class, subject, and date
  const getAttendanceForSession = (classId, subjectId, dateStr) => {
    const key = `${classId}_${subjectId}_${dateStr}`;
    if (attendanceRecords[key]) {
      return attendanceRecords[key].statuses;
    }
    // Return empty or default Present for all students in class
    const classStudents = students.filter(s => s.classId === classId);
    const defaults = {};
    classStudents.forEach(s => {
      defaults[s.id] = 'P';
    });
    return defaults;
  };

  // Mark / Edit attendance for any date (STRICTLY RESTRICTED TO FACULTY / ADMIN)
  const markAttendance = (classId, subjectId, dateStr, statuses, markedById = currentUser?.id) => {
    // SECURITY CHECK: Only faculty or admin can mark or edit attendance
    if (currentUser?.role !== 'faculty' && currentUser?.role !== 'admin') {
      alert('Access Denied: Only authorized faculty members can mark or edit attendance.');
      return false;
    }

    const key = `${classId}_${subjectId}_${dateStr}`;
    const newRecords = {
      ...attendanceRecords,
      [key]: {
        classId,
        subjectId,
        date: dateStr,
        markedBy: markedById,
        updatedAt: new Date().toISOString(),
        statuses: { ...statuses }
      }
    };
    setAttendanceRecords(newRecords);

    // Check if any student falls below 75% for this subject and trigger alert
    const targetSubject = subjects.find(s => s.id === subjectId);
    const subjectName = targetSubject ? targetSubject.name : 'Subject';

    students.forEach(student => {
      if (student.classId === classId) {
        let attended = 0;
        let total = 0;
        Object.values(newRecords).forEach(session => {
          if (session.classId === classId && session.subjectId === subjectId && session.statuses[student.id]) {
            total++;
            if (session.statuses[student.id] === 'P') {
              attended++;
            }
          }
        });

        if (total > 0) {
          const pct = Math.round((attended / total) * 100);
          if (pct < 75) {
            const existingAlert = notifications.find(n => n.studentId === student.id && n.title.includes(subjectName) && !n.read);
            if (!existingAlert) {
              const newAlert = {
                id: 'alert_' + Date.now() + '_' + student.id,
                type: 'critical',
                title: `Low attendance: ${subjectName} ${pct}%`,
                time: 'Just now',
                timestamp: new Date().toISOString(),
                category: 'alert',
                message: `Your ${subjectName} attendance dropped to ${pct}%. Please meet faculty immediately.`,
                read: false,
                studentId: student.id
              };
              setNotifications(prev => [newAlert, ...prev]);
            }
          }
        }
      }
    });

    return true;
  };

  // Compute student subject-level stats
  const getStudentStats = useMemo(() => {
    return (studentId) => {
      const student = students.find(s => s.id === studentId);
      if (!student) return { overall: 80, subjects: [], totalAttended: 0, totalSessions: 0 };

      const studentSubjects = subjects.filter(s => s.classId === student.classId);
      let grandAttended = 0;
      let grandTotal = 0;

      const subjectStats = studentSubjects.map(sub => {
        let attended = 0;
        let total = 0;

        Object.values(attendanceRecords).forEach(session => {
          if (session.classId === student.classId && session.subjectId === sub.id) {
            const status = session.statuses[studentId];
            if (status) {
              total++;
              if (status === 'P') attended++;
            }
          }
        });

        const effectiveTotal = total > 0 ? total : sub.totalSessions;
        const effectiveAttended = total > 0 ? attended : Math.round(sub.totalSessions * 0.85);
        const percentage = Math.round((effectiveAttended / effectiveTotal) * 100);

        grandAttended += effectiveAttended;
        grandTotal += effectiveTotal;

        let classesToRecover = 0;
        if (percentage < 75) {
          classesToRecover = Math.ceil(Math.max(0, (0.75 * effectiveTotal - effectiveAttended) / 0.25));
          if (classesToRecover === 0) classesToRecover = 1;
        }

        return {
          id: sub.id,
          name: sub.name,
          fullName: sub.fullName,
          code: sub.code,
          attended: effectiveAttended,
          total: effectiveTotal,
          percentage,
          isLow: percentage < 75,
          classesToRecover,
          facultyName: sub.facultyName
        };
      });

      const overallPercentage = grandTotal > 0 ? Math.round((grandAttended / grandTotal) * 100) : 0;
      const lowSubjects = subjectStats.filter(s => s.isLow);

      return {
        overall: overallPercentage,
        totalAttended: grandAttended,
        totalSessions: grandTotal,
        subjects: subjectStats,
        lowSubjects
      };
    };
  }, [students, subjects, attendanceRecords]);

  // Leave Management Functions
  const submitLeaveRequest = ({ leaveType, fromDate, toDate, reason }) => {
    if (!currentUser) return false;

    const d1 = new Date(fromDate);
    const d2 = new Date(toDate);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newLeave = {
      id: 'leave_' + Date.now(),
      studentId: currentUser.id,
      studentName: currentUser.name,
      rollNo: currentUser.rollNo || '01',
      classId: currentUser.classId || 'class_se_a',
      className: currentUser.className || 'SE-A',
      leaveType,
      fromDate,
      toDate,
      totalDays: diffDays || 1,
      reason,
      appliedOn: new Date().toISOString().split('T')[0],
      status: 'Pending',
      reviewedBy: null,
      reviewDate: null,
      remarks: null
    };

    setLeaveRequests(prev => [newLeave, ...prev]);

    const alertMsg = {
      id: 'notif_' + Date.now(),
      type: 'info',
      title: `Leave request submitted: ${leaveType}`,
      time: 'Just now',
      timestamp: new Date().toISOString(),
      category: 'leave',
      message: `Your leave request for ${fromDate} to ${toDate} (${diffDays} days) has been sent to faculty for approval.`,
      read: false,
      studentId: currentUser.id
    };
    setNotifications(prev => [alertMsg, ...prev]);

    return true;
  };

  const reviewLeaveRequest = (leaveId, newStatus, remarks = '') => {
    // Only faculty and admin can review leaves
    if (currentUser?.role !== 'faculty' && currentUser?.role !== 'admin') {
      alert('Access Denied: Only faculty can approve or reject leaves.');
      return;
    }

    setLeaveRequests(prev => prev.map(req => {
      if (req.id === leaveId) {
        const updated = {
          ...req,
          status: newStatus,
          reviewedBy: currentUser?.name || 'Faculty Member',
          reviewDate: new Date().toISOString().split('T')[0],
          remarks: remarks || (newStatus === 'Approved' ? 'Approved by faculty' : 'Declined as per attendance policy')
        };

        const notif = {
          id: 'notif_leave_' + Date.now(),
          type: newStatus === 'Approved' ? 'success' : 'critical',
          title: `Leave request ${newStatus.toLowerCase()}`,
          time: 'Just now',
          timestamp: new Date().toISOString(),
          category: 'leave',
          message: `Your leave application for ${req.fromDate} to ${req.toDate} was ${newStatus.toLowerCase()} by ${currentUser?.name || 'Faculty'}.${remarks ? ` Note: "${remarks}"` : ''}`,
          read: false,
          studentId: req.studentId
        };
        setNotifications(nPrev => [notif, ...nPrev]);

        return updated;
      }
      return req;
    }));
  };

  // Administration CRUD functions
  const addStudent = (newStudent) => {
    const id = 'stu_' + Date.now();
    const created = { id, ...newStudent };
    setStudents(prev => [...prev, created]);
    return created;
  };

  const deleteStudent = (studentId) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const addClass = (newClass) => {
    const id = 'class_' + Date.now();
    const created = { id, ...newClass };
    setClasses(prev => [...prev, created]);
    return created;
  };

  const addSubject = (newSubject) => {
    const id = 'sub_' + Date.now();
    const created = { id, ...newSubject };
    setSubjects(prev => [...prev, created]);
    return created;
  };

  const addAnnouncement = ({ title, content, priority }) => {
    const newAnn = {
      id: 'ann_' + Date.now(),
      title,
      content,
      priority: priority || 'High',
      date: new Date().toISOString().split('T')[0],
      postedBy: currentUser?.name || 'College Administration'
    };
    setAnnouncements(prev => [newAnn, ...prev]);

    const broadcastNotif = {
      id: 'notif_ann_' + Date.now(),
      type: priority === 'High' ? 'critical' : 'info',
      title: `Notice: ${title}`,
      time: 'Just now',
      timestamp: new Date().toISOString(),
      category: 'notice',
      message: content,
      read: false
    };
    setNotifications(prev => [broadcastNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadAlertCount = useMemo(() => {
    return notifications.filter(n => !n.read && (!currentUser || n.studentId === currentUser.id || !n.studentId)).length;
  }, [notifications, currentUser]);

  const resetAllData = () => {
    localStorage.clear();
    setClasses(INITIAL_CLASSES);
    setSubjects(INITIAL_SUBJECTS);
    setStudents(INITIAL_STUDENTS);
    setFaculty(INITIAL_FACULTY);
    setAttendanceRecords(generateInitialAttendanceRecords());
    setNotifications(INITIAL_NOTIFICATIONS);
    setLeaveRequests(INITIAL_LEAVE_REQUESTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setCurrentUser(null);
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        loginStudent,
        loginStudentById,
        loginFaculty,
        loginFacultyById,
        loginAdmin,
        logout,
        switchUserRole,
        registerStudent,
        registerFaculty,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        classes,
        subjects,
        students,
        faculty,
        attendanceRecords,
        getAttendanceForSession,
        markAttendance,
        getStudentStats,
        leaveRequests,
        submitLeaveRequest,
        reviewLeaveRequest,
        notifications,
        markAllNotificationsAsRead,
        unreadAlertCount,
        announcements,
        addAnnouncement,
        addStudent,
        deleteStudent,
        addClass,
        addSubject,
        resetAllData,
        adminStats: INITIAL_ADMIN_STATS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
