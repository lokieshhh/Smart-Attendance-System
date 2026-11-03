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
  INITIAL_TIMETABLE,
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
  TIMETABLE: 'smart_attend_timetable',
  PARENT_NOTICES: 'smart_attend_parent_notices',
  VIEW_MODE: 'smart_attend_view_mode',
  DARK_MODE: 'smart_attend_dark_mode'
};

export const AppProvider = ({ children }) => {
  // 1. Current logged in user (starts null so user sees the login portal first)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try { 
        return JSON.parse(saved); 
      } catch (e) { /* ignore */ }
    }
    return null;
  });

  // 2. Active Tab & Display View Mode
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'attend', 'reports', 'alerts', 'leave', 'admin'
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || 'mobile'; // 'mobile' | 'desktop'
  });

  // 3. Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // 4. Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // 5. Database States
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

  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [parentNotices, setParentNotices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PARENT_NOTICES);
    return saved ? JSON.parse(saved) : [
      {
        id: 'pnotif_01',
        studentId: 'stu_01',
        studentName: 'Aarav Patil',
        parentName: 'Sanjay Patil',
        parentPhone: '+91 98220 54321',
        subject: 'Applied Chemistry',
        percentage: 70,
        sentAt: '2026-10-22 09:15 AM',
        status: 'Delivered (WhatsApp & SMS)',
        message: 'Dear Parent, your ward Aarav Patil has an attendance of 70% in Applied Chemistry (below 75% university requirement). Please meet HOD before 31st Oct.'
      }
    ];
  });

  // 6. Active Live QR Code Session (Dynamic Classroom Attendance)
  const [qrSession, setQrSession] = useState({
    active: false,
    sessionCode: '',
    subjectId: 'sub_maths',
    subjectName: 'Maths',
    classId: 'class_se_a',
    className: 'SE-A',
    room: 'Room CS-302',
    expiresAt: null,
    checkedInStudents: [] // array of student objects
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
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PARENT_NOTICES, JSON.stringify(parentNotices));
  }, [parentNotices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode);
  }, [viewMode]);

  // --- AUTHENTICATION & LOGIN LOGIC ---

  const loginStudent = (identifier) => {
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
    showToast(`Welcome back, ${student.name}!`, 'info');
    return { success: true, user: userSession };
  };

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
    showToast(`Logged in as ${student.name} (Roll ${student.rollNo})`, 'success');
  };

  const loginFaculty = (identifier) => {
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
    setActiveTab('attend');
    showToast(`Faculty portal active: ${teacher.name}`, 'info');
    return { success: true, user: userSession };
  };

  const loginFacultyById = (facultyId) => {
    const teacher = faculty.find(f => f.id === facultyId) || faculty[0];
    const userSession = {
      ...teacher,
      role: 'faculty',
      avatar: teacher.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    };
    setCurrentUser(userSession);
    setActiveTab('attend');
    showToast(`Logged in as ${teacher.name}`, 'success');
  };

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
    showToast('Administrator session activated', 'info');
    return { success: true, user: userSession };
  };

  const login = (role, customEmail) => {
    if (role === 'student') loginStudent(customEmail || 'aarav.patil@college.edu');
    else if (role === 'faculty') loginFaculty(customEmail || 'FAC-101');
    else if (role === 'admin') loginAdmin();
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
    setActiveTab('home');
    showToast('Signed out successfully', 'info');
  };

  const switchUserRole = (targetRole) => {
    login(targetRole);
  };

  // --- CREATE LOGIN ID / REGISTRATION ---

  const registerStudent = ({ name, rollNo, classId, email, password }) => {
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
      prn: `2024CS0${Math.floor(100 + Math.random() * 899)}`,
      name: name.trim(),
      classId: assignedClass.id,
      email: cleanEmail,
      phone: '+91 98000 00000',
      parentName: 'Parent of ' + name.trim(),
      parentPhone: '+91 98220 00000',
      bloodGroup: 'B+',
      validThru: '2027',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`
    };

    const updatedRecords = { ...attendanceRecords };
    Object.keys(updatedRecords).forEach(sessionKey => {
      const session = updatedRecords[sessionKey];
      if (session.classId === assignedClass.id) {
        session.statuses[newId] = Math.random() > 0.15 ? 'P' : 'A';
      }
    });

    setAttendanceRecords(updatedRecords);
    setStudents(prev => [...prev, newStudent]);

    const sessionUser = {
      ...newStudent,
      role: 'student',
      className: assignedClass.name,
      department: assignedClass.department
    };
    setCurrentUser(sessionUser);
    setActiveTab('home');
    showToast(`Account created for ${newStudent.name}!`, 'success');

    return { success: true, user: sessionUser };
  };

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

    const sessionUser = {
      ...newFaculty,
      role: 'faculty'
    };
    setCurrentUser(sessionUser);
    setActiveTab('attend');
    showToast(`Faculty registered: ${newFaculty.name}`, 'success');

    return { success: true, user: sessionUser };
  };

  // --- ATTENDANCE FUNCTIONS ---

  const getAttendanceForSession = (classId, subjectId, dateStr) => {
    const key = `${classId}_${subjectId}_${dateStr}`;
    if (attendanceRecords[key]) {
      return attendanceRecords[key].statuses;
    }
    const classStudents = students.filter(s => s.classId === classId);
    const defaults = {};
    classStudents.forEach(s => {
      defaults[s.id] = 'P';
    });
    return defaults;
  };

  const markAttendance = (classId, subjectId, dateStr, statuses, markedById = currentUser?.id) => {
    if (currentUser?.role !== 'faculty' && currentUser?.role !== 'admin') {
      showToast('Access Denied: Only faculty can mark attendance.', 'error');
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
    showToast('Attendance updated and percentages recalculated!', 'success');

    // Trigger low attendance alert if student drops < 75%
    const targetSubject = subjects.find(s => s.id === subjectId);
    const subjectName = targetSubject ? targetSubject.name : 'Subject';

    students.forEach(student => {
      if (student.classId === classId) {
        let attended = 0;
        let total = 0;
        Object.values(newRecords).forEach(session => {
          if (session.classId === classId && session.subjectId === subjectId && session.statuses[student.id]) {
            total++;
            if (session.statuses[student.id] === 'P') attended++;
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

  // --- DYNAMIC QR CODE ATTENDANCE SYSTEM ---

  const startQRSession = (subjectId, classId, room) => {
    const sub = subjects.find(s => s.id === subjectId) || subjects[0];
    const cls = classes.find(c => c.id === classId) || classes[0];
    const code = 'MIT-' + Math.floor(1000 + Math.random() * 9000);

    setQrSession({
      active: true,
      sessionCode: code,
      subjectId: sub.id,
      subjectName: sub.name,
      classId: cls.id,
      className: cls.name,
      room: room || cls.room,
      expiresAt: Date.now() + 60000, // 60 seconds validity
      checkedInStudents: []
    });

    showToast(`Live QR Session started for ${sub.name}!`, 'info');
  };

  const refreshQRCode = () => {
    if (!qrSession.active) return;
    const newCode = 'MIT-' + Math.floor(1000 + Math.random() * 9000);
    setQrSession(prev => ({
      ...prev,
      sessionCode: newCode,
      expiresAt: Date.now() + 60000
    }));
    showToast('QR Code refreshed with new secure token!', 'info');
  };

  const closeQRSession = () => {
    if (!qrSession.active) return;

    // Commit attendance for checked in students
    const todayStr = new Date().toISOString().split('T')[0];
    const key = `${qrSession.classId}_${qrSession.subjectId}_${todayStr}`;
    const statuses = getAttendanceForSession(qrSession.classId, qrSession.subjectId, todayStr);

    // Mark checked in students Present, others absent if not marked
    qrSession.checkedInStudents.forEach(stu => {
      statuses[stu.id] = 'P';
    });

    markAttendance(qrSession.classId, qrSession.subjectId, todayStr, statuses);
    showToast(`QR session closed. ${qrSession.checkedInStudents.length} students recorded!`, 'success');

    setQrSession({
      active: false,
      sessionCode: '',
      subjectId: 'sub_maths',
      subjectName: 'Maths',
      classId: 'class_se_a',
      className: 'SE-A',
      room: 'Room CS-302',
      expiresAt: null,
      checkedInStudents: []
    });
  };

  const studentScanQR = (submittedCode) => {
    if (!currentUser || currentUser.role !== 'student') {
      showToast('Only students can scan classroom QR codes.', 'error');
      return { success: false, message: 'Invalid role' };
    }

    if (!qrSession.active) {
      showToast('No active classroom attendance session found.', 'error');
      return { success: false, message: 'Session inactive' };
    }

    if (qrSession.sessionCode !== submittedCode.trim().toUpperCase()) {
      showToast('Invalid or expired QR token! Ask faculty for the live code.', 'error');
      return { success: false, message: 'Invalid code' };
    }

    // Check if already scanned
    if (qrSession.checkedInStudents.some(s => s.id === currentUser.id)) {
      showToast('You have already checked into this lecture!', 'info');
      return { success: true, message: 'Already marked' };
    }

    // Add student to live checked in list
    setQrSession(prev => ({
      ...prev,
      checkedInStudents: [
        { id: currentUser.id, name: currentUser.name, rollNo: currentUser.rollNo, timestamp: new Date().toLocaleTimeString() },
        ...prev.checkedInStudents
      ]
    }));

    // Instantly mark Present for today
    const todayStr = new Date().toISOString().split('T')[0];
    const key = `${qrSession.classId}_${qrSession.subjectId}_${todayStr}`;
    const statuses = { ...getAttendanceForSession(qrSession.classId, qrSession.subjectId, todayStr), [currentUser.id]: 'P' };

    const newRecords = {
      ...attendanceRecords,
      [key]: {
        classId: qrSession.classId,
        subjectId: qrSession.subjectId,
        date: todayStr,
        markedBy: 'Live-QR-Scan',
        updatedAt: new Date().toISOString(),
        statuses
      }
    };
    setAttendanceRecords(newRecords);

    showToast(`Verified! You are marked PRESENT for ${qrSession.subjectName}.`, 'success');
    return { success: true, message: 'Attendance recorded' };
  };

  // --- PARENT ALERT & DEFAULTER DISPATCHER ---

  const sendParentNotice = (studentId, subjectName, percentage, customNote = '') => {
    const student = students.find(s => s.id === studentId);
    if (!student) return false;

    const noticeObj = {
      id: 'pnotif_' + Date.now(),
      studentId: student.id,
      studentName: student.name,
      parentName: student.parentName || 'Parent / Guardian',
      parentPhone: student.parentPhone || '+91 98220 00000',
      subject: subjectName,
      percentage: percentage,
      sentAt: new Date().toLocaleString(),
      status: 'Delivered (WhatsApp & SMS)',
      message: customNote || `Official Alert from MIT: Attendance of ${student.name} in ${subjectName} is ${percentage}% (below 75%). Please meet HOD before semester cutoff.`
    };

    setParentNotices(prev => [noticeObj, ...prev]);

    // Push notification to student's notification bell
    const studentAlert = {
      id: 'notif_parent_' + Date.now(),
      type: 'critical',
      title: `Parent Alert Dispatched: ${subjectName} (${percentage}%)`,
      time: 'Just now',
      timestamp: new Date().toISOString(),
      category: 'alert',
      message: `An official low-attendance warning was dispatched to your guardian (${student.parentPhone}) for falling below 75% in ${subjectName}.`,
      read: false,
      studentId: student.id
    };
    setNotifications(prev => [studentAlert, ...prev]);

    showToast(`Notice dispatched to parent: ${student.parentPhone}`, 'success');
    return true;
  };

  // --- STUDENT PROFILE EDITING ---

  const updateStudentProfile = (studentId, updatedFields) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, ...updatedFields };
      }
      return s;
    }));

    if (currentUser?.id === studentId) {
      setCurrentUser(prev => ({ ...prev, ...updatedFields }));
    }

    showToast('Profile information saved!', 'success');
  };

  // --- BULK ROSTER IMPORTER ---

  const bulkImportStudents = (classId, studentRows) => {
    const newStudents = studentRows.map((row, idx) => ({
      id: 'stu_' + (Date.now() + idx),
      rollNo: String(row.rollNo || (students.length + idx + 1)).padStart(2, '0'),
      prn: `2024CS0${Math.floor(100 + Math.random() * 899)}`,
      name: row.name || 'New Student',
      classId: classId || 'class_se_a',
      email: row.email || `student_${Date.now() + idx}@college.edu`,
      phone: row.phone || '+91 98200 00000',
      parentName: 'Guardian',
      parentPhone: '+91 98220 00000',
      bloodGroup: 'O+',
      validThru: '2027',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(row.name || 'Student')}`
    }));

    setStudents(prev => [...prev, ...newStudents]);
    showToast(`Successfully enrolled ${newStudents.length} students from roster!`, 'success');
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

        // Bunk allowance calculation:
        // (attended) / (total + x) >= 0.75 => x <= (attended / 0.75) - total
        let safeBunksAvailable = 0;
        if (percentage >= 75) {
          safeBunksAvailable = Math.max(0, Math.floor((effectiveAttended / 0.75) - effectiveTotal));
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
          safeBunksAvailable,
          facultyName: sub.facultyName
        };
      });

      const overallPercentage = grandTotal > 0 ? Math.round((grandAttended / grandTotal) * 100) : 0;
      const lowSubjects = subjectStats.filter(s => s.isLow);

      let overallSafeBunks = 0;
      let overallClassesToRecover = 0;
      if (overallPercentage >= 75) {
        overallSafeBunks = Math.max(0, Math.floor((grandAttended / 0.75) - grandTotal));
      } else {
        overallClassesToRecover = Math.ceil(Math.max(0, (0.75 * grandTotal - grandAttended) / 0.25));
        if (overallClassesToRecover === 0) overallClassesToRecover = 1;
      }

      return {
        overall: overallPercentage,
        totalAttended: grandAttended,
        totalSessions: grandTotal,
        overallSafeBunks,
        overallClassesToRecover,
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
    showToast('Leave application submitted for faculty review!', 'success');

    return true;
  };

  const reviewLeaveRequest = (leaveId, newStatus, remarks = '') => {
    if (currentUser?.role !== 'faculty' && currentUser?.role !== 'admin') {
      showToast('Access Denied: Only faculty can review leaves.', 'error');
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

    showToast(`Leave request ${newStatus.toLowerCase()}!`, newStatus === 'Approved' ? 'success' : 'info');
  };

  // Administration CRUD functions
  const addStudent = (newStudent) => {
    const id = 'stu_' + Date.now();
    const created = { 
      id, 
      prn: `2024CS0${Math.floor(100 + Math.random() * 899)}`,
      parentName: 'Guardian',
      parentPhone: '+91 98220 00000',
      bloodGroup: 'B+',
      validThru: '2027',
      ...newStudent 
    };
    setStudents(prev => [...prev, created]);
    showToast(`Student ${created.name} added!`, 'success');
    return created;
  };

  const deleteStudent = (studentId) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    showToast('Student deleted from registry.', 'info');
  };

  const addClass = (newClass) => {
    const id = 'class_' + Date.now();
    const created = { id, ...newClass };
    setClasses(prev => [...prev, created]);
    showToast(`Class ${created.name} added!`, 'success');
    return created;
  };

  const addSubject = (newSubject) => {
    const id = 'sub_' + Date.now();
    const created = { id, ...newSubject };
    setSubjects(prev => [...prev, created]);
    showToast(`Subject ${created.name} added!`, 'success');
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
    showToast('Campus circular broadcasted!', 'success');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
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
    setTimetable(INITIAL_TIMETABLE);
    setParentNotices([]);
    setCurrentUser(null);
    setActiveTab('home');
    showToast('All data reset to factory demo values.', 'info');
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
        darkMode,
        toggleDarkMode,
        toast,
        showToast,
        classes,
        subjects,
        students,
        faculty,
        timetable,
        attendanceRecords,
        getAttendanceForSession,
        markAttendance,
        getStudentStats,
        qrSession,
        startQRSession,
        refreshQRCode,
        closeQRSession,
        studentScanQR,
        parentNotices,
        sendParentNotice,
        updateStudentProfile,
        bulkImportStudents,
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
