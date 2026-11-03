// Enhanced Mock Data for Smart Attendance System
// Production-grade college management data with Timetable, Defaulter Tracking & Student Profiles

export const INITIAL_CLASSES = [
  { id: 'class_se_a', name: 'SE-A', department: 'Computer Engineering', semester: 'Semester 3', division: 'A', totalStudents: 64, room: 'Room CS-302' },
  { id: 'class_se_b', name: 'SE-B', department: 'Computer Engineering', semester: 'Semester 3', division: 'B', totalStudents: 62, room: 'Room CS-304' },
  { id: 'class_te_a', name: 'TE-A', department: 'Information Technology', semester: 'Semester 5', division: 'A', totalStudents: 60, room: 'Room IT-201' },
  { id: 'class_be_a', name: 'BE-A', department: 'Computer Engineering', semester: 'Semester 7', division: 'A', totalStudents: 58, room: 'Room CS-401' }
];

export const INITIAL_SUBJECTS = [
  { id: 'sub_maths', name: 'Maths', fullName: 'Applied Mathematics-III', code: 'MTH-301', classId: 'class_se_a', totalSessions: 20, facultyName: 'Dr. R. K. Sharma' },
  { id: 'sub_physics', name: 'Physics', fullName: 'Engineering Physics', code: 'PHY-302', classId: 'class_se_a', totalSessions: 20, facultyName: 'Dr. R. K. Sharma' },
  { id: 'sub_chem', name: 'Chemistry', fullName: 'Applied Chemistry', code: 'CHM-303', classId: 'class_se_a', totalSessions: 20, facultyName: 'Prof. Sunita Deshmukh' },
  { id: 'sub_eng', name: 'English', fullName: 'Professional Communication', code: 'ENG-304', classId: 'class_se_a', totalSessions: 25, facultyName: 'Prof. John Smith' }
];

export const INITIAL_STUDENTS = [
  { 
    id: 'stu_01', 
    rollNo: '01', 
    prn: '2024CS0148',
    name: 'Aarav Patil', 
    classId: 'class_se_a', 
    email: 'aarav.patil@college.edu', 
    phone: '+91 98201 12345', 
    parentName: 'Sanjay Patil',
    parentPhone: '+91 98220 54321',
    bloodGroup: 'B+',
    validThru: '2027',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'stu_02', 
    rollNo: '02', 
    prn: '2024CS0149',
    name: 'Isha Kulkarni', 
    classId: 'class_se_a', 
    email: 'isha.kulkarni@college.edu', 
    phone: '+91 98201 23456', 
    parentName: 'Ramesh Kulkarni',
    parentPhone: '+91 98220 65432',
    bloodGroup: 'O+',
    validThru: '2027',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'stu_03', 
    rollNo: '03', 
    prn: '2024CS0150',
    name: 'Rohan Desai', 
    classId: 'class_se_a', 
    email: 'rohan.desai@college.edu', 
    phone: '+91 98201 34567', 
    parentName: 'Vinod Desai',
    parentPhone: '+91 98220 76543',
    bloodGroup: 'A+',
    validThru: '2027',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'stu_04', 
    rollNo: '04', 
    prn: '2024CS0151',
    name: 'Sneha Joshi', 
    classId: 'class_se_a', 
    email: 'sneha.joshi@college.edu', 
    phone: '+91 98201 45678', 
    parentName: 'Prakash Joshi',
    parentPhone: '+91 98220 87654',
    bloodGroup: 'AB+',
    validThru: '2027',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'stu_05', 
    rollNo: '05', 
    prn: '2024CS0152',
    name: 'Kunal More', 
    classId: 'class_se_a', 
    email: 'kunal.more@college.edu', 
    phone: '+91 98201 56789', 
    parentName: 'Mahesh More',
    parentPhone: '+91 98220 98765',
    bloodGroup: 'O-',
    validThru: '2027',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'stu_06', 
    rollNo: '06', 
    prn: '2024CS0153',
    name: 'Priya Sharma', 
    classId: 'class_se_a', 
    email: 'priya.sharma@college.edu', 
    phone: '+91 98201 67890', 
    parentName: 'Anil Sharma',
    parentPhone: '+91 98220 12399',
    bloodGroup: 'B-',
    validThru: '2027',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'stu_07', 
    rollNo: '07', 
    prn: '2024CS0154',
    name: 'Vikram Rao', 
    classId: 'class_se_a', 
    email: 'vikram.rao@college.edu', 
    phone: '+91 98201 78901', 
    parentName: 'Kishore Rao',
    parentPhone: '+91 98220 23411',
    bloodGroup: 'A-',
    validThru: '2027',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80' 
  },
  { 
    id: 'stu_08', 
    rollNo: '08', 
    prn: '2024CS0155',
    name: 'Ananya Gupta', 
    classId: 'class_se_a', 
    email: 'ananya.gupta@college.edu', 
    phone: '+91 98201 89012', 
    parentName: 'Rajeev Gupta',
    parentPhone: '+91 98220 34522',
    bloodGroup: 'AB-',
    validThru: '2027',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' 
  }
];

export const INITIAL_FACULTY = [
  { id: 'fac_01', staffId: 'FAC-101', name: 'Dr. R. K. Sharma', department: 'Computer Engineering', email: 'rk.sharma@college.edu', designation: 'Associate Professor', assignedSubjects: ['sub_maths', 'sub_physics'] },
  { id: 'fac_02', staffId: 'FAC-102', name: 'Prof. Sunita Deshmukh', department: 'Applied Sciences', email: 'sunita.deshmukh@college.edu', designation: 'Assistant Professor', assignedSubjects: ['sub_chem'] },
  { id: 'fac_03', staffId: 'FAC-103', name: 'Prof. John Smith', department: 'Humanities & English', email: 'john.smith@college.edu', designation: 'Lecturer', assignedSubjects: ['sub_eng'] }
];

// Today's Live Academic Timetable
export const INITIAL_TIMETABLE = [
  { period: 1, time: '09:00 AM - 10:00 AM', subject: 'Maths', code: 'MTH-301', room: 'Room CS-302', faculty: 'Dr. R. K. Sharma', status: 'Completed', markedToday: true },
  { period: 2, time: '10:00 AM - 11:00 AM', subject: 'Physics', code: 'PHY-302', room: 'Room CS-302', faculty: 'Dr. R. K. Sharma', status: 'Live Now', markedToday: false },
  { period: 3, time: '11:15 AM - 12:15 PM', subject: 'Chemistry', code: 'CHM-303', room: 'Lab Chem-104', faculty: 'Prof. Sunita Deshmukh', status: 'Upcoming', markedToday: false },
  { period: 4, time: '01:00 PM - 02:00 PM', subject: 'English', code: 'ENG-304', room: 'Room CS-302', faculty: 'Prof. John Smith', status: 'Upcoming', markedToday: false },
  { period: 5, time: '02:00 PM - 04:00 PM', subject: 'Computing Lab', code: 'CS-305', room: 'Lab Computer-2', faculty: 'Dr. R. K. Sharma', status: 'Upcoming', markedToday: false }
];

// Generates historical attendance matrix matching Aarav's exact numbers:
// Maths: 18/20 (90%)
// Physics: 15/20 (78% or 75%)
// Chemistry: 14/20 (70% - ALERT below 75%)
// English: 22/25 (88%)
// Overall: (18+15+14+22)/(20+20+20+25) = 69/85 = 81.2% ~ 82%
export const generateInitialAttendanceRecords = () => {
  const records = {};

  const getDateStr = (offsetDays) => {
    const d = new Date(2026, 9, 22); // Oct 22, 2026
    d.setDate(d.getDate() - offsetDays);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // 1. Maths (20 sessions)
  for (let i = 0; i < 20; i++) {
    const dateStr = getDateStr(i);
    const key = `class_se_a_sub_maths_${dateStr}`;
    records[key] = {
      classId: 'class_se_a',
      subjectId: 'sub_maths',
      date: dateStr,
      markedBy: 'fac_01',
      statuses: {
        stu_01: (i === 5 || i === 12) ? 'A' : 'P', // Aarav: 18 P, 2 A
        stu_02: 'P',
        stu_03: (i % 3 === 0) ? 'A' : 'P', // Rohan absent
        stu_04: 'P',
        stu_05: (i % 2 === 0) ? 'A' : 'P',
        stu_06: 'P',
        stu_07: 'P',
        stu_08: 'P'
      }
    };
  }

  // 2. Physics (20 sessions)
  for (let i = 0; i < 20; i++) {
    const dateStr = getDateStr(i);
    const key = `class_se_a_sub_physics_${dateStr}`;
    records[key] = {
      classId: 'class_se_a',
      subjectId: 'sub_physics',
      date: dateStr,
      markedBy: 'fac_01',
      statuses: {
        stu_01: [2, 7, 11, 16, 18].includes(i) ? 'A' : 'P', // Aarav: 15 P, 5 A
        stu_02: 'P',
        stu_03: (i % 2 === 0) ? 'A' : 'P',
        stu_04: 'P',
        stu_05: (i % 3 === 0) ? 'A' : 'P',
        stu_06: 'P',
        stu_07: 'P',
        stu_08: 'P'
      }
    };
  }

  // 3. Chemistry (20 sessions)
  for (let i = 0; i < 20; i++) {
    const dateStr = getDateStr(i);
    const key = `class_se_a_sub_chem_${dateStr}`;
    records[key] = {
      classId: 'class_se_a',
      subjectId: 'sub_chem',
      date: dateStr,
      markedBy: 'fac_02',
      statuses: {
        stu_01: [0, 3, 6, 9, 13, 17].includes(i) ? 'A' : 'P', // Aarav: 14 P, 6 A (70% Defaulter)
        stu_02: 'P',
        stu_03: (i % 4 === 0) ? 'A' : 'P',
        stu_04: 'P',
        stu_05: (i % 2 === 0) ? 'A' : 'P',
        stu_06: 'P',
        stu_07: 'P',
        stu_08: 'P'
      }
    };
  }

  // 4. English (25 sessions)
  for (let i = 0; i < 25; i++) {
    const dateStr = getDateStr(i);
    const key = `class_se_a_sub_eng_${dateStr}`;
    records[key] = {
      classId: 'class_se_a',
      subjectId: 'sub_eng',
      date: dateStr,
      markedBy: 'fac_03',
      statuses: {
        stu_01: [4, 10, 19].includes(i) ? 'A' : 'P', // Aarav: 22 P, 3 A (88%)
        stu_02: 'P',
        stu_03: 'P',
        stu_04: 'P',
        stu_05: (i % 3 === 0) ? 'A' : 'P',
        stu_06: 'P',
        stu_07: 'P',
        stu_08: 'P'
      }
    };
  }

  return records;
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'critical',
    title: 'Low attendance: Chemistry 70%',
    time: 'Today, 9:10 AM',
    timestamp: '2026-10-22T09:10:00Z',
    category: 'alert',
    message: 'Your Chemistry attendance is currently at 70%, which is below the university threshold (75%). You need to attend the next 3 consecutive lectures to become eligible for semester examinations.',
    read: false,
    studentId: 'stu_01'
  },
  {
    id: 'notif_2',
    type: 'success',
    title: 'Leave request approved',
    time: 'Yesterday',
    timestamp: '2026-10-21T14:30:00Z',
    category: 'leave',
    message: 'Your medical leave application for 18 Oct - 19 Oct has been reviewed and approved by Prof. Sunita Deshmukh.',
    read: false,
    studentId: 'stu_01'
  },
  {
    id: 'notif_3',
    type: 'info',
    title: 'Attendance marked: Physics',
    time: '20 Oct',
    timestamp: '2026-10-20T11:00:00Z',
    category: 'attendance',
    message: 'Dr. R. K. Sharma submitted attendance for SE-A Physics (20 Oct). Marked: Present.',
    read: true,
    studentId: 'stu_01'
  },
  {
    id: 'notif_4',
    type: 'info',
    title: 'Monthly report ready',
    time: '18 Oct',
    timestamp: '2026-10-18T16:00:00Z',
    category: 'report',
    message: 'The official attendance audit report for October 2026 is now compiled. Click Reports to export your transcript.',
    read: true,
    studentId: 'stu_01'
  }
];

export const INITIAL_LEAVE_REQUESTS = [
  {
    id: 'leave_01',
    studentId: 'stu_01',
    studentName: 'Aarav Patil',
    rollNo: '01',
    classId: 'class_se_a',
    className: 'SE-A',
    leaveType: 'Medical Leave',
    fromDate: '2026-10-18',
    toDate: '2026-10-19',
    totalDays: 2,
    reason: 'Suffering from viral flu and high fever. Doctor advised 2 days of bed rest. Medical certificate submitted to college clinic.',
    appliedOn: '2026-10-17',
    status: 'Approved',
    reviewedBy: 'Prof. Sunita Deshmukh',
    reviewDate: '2026-10-21',
    remarks: 'Medical certificate verified. 2 days approved.'
  },
  {
    id: 'leave_02',
    studentId: 'stu_01',
    studentName: 'Aarav Patil',
    rollNo: '01',
    classId: 'class_se_a',
    className: 'SE-A',
    leaveType: 'Academic / Hackathon',
    fromDate: '2026-11-02',
    toDate: '2026-11-04',
    totalDays: 3,
    reason: 'Selected for National Smart India Hackathon Grand Finale at IIT Delhi. Representing college team "CodeCrafters".',
    appliedOn: '2026-10-22',
    status: 'Pending',
    reviewedBy: null,
    reviewDate: null,
    remarks: null
  },
  {
    id: 'leave_03',
    studentId: 'stu_03',
    studentName: 'Rohan Desai',
    rollNo: '03',
    classId: 'class_se_a',
    className: 'SE-A',
    leaveType: 'Personal / Family',
    fromDate: '2026-10-22',
    toDate: '2026-10-23',
    totalDays: 2,
    reason: 'Attending elder sister’s wedding in hometown Pune.',
    appliedOn: '2026-10-20',
    status: 'Pending',
    reviewedBy: null,
    reviewDate: null,
    remarks: null
  },
  {
    id: 'leave_04',
    studentId: 'stu_04',
    studentName: 'Sneha Joshi',
    rollNo: '04',
    classId: 'class_se_a',
    className: 'SE-A',
    leaveType: 'Sports Duty Leave',
    fromDate: '2026-10-15',
    toDate: '2026-10-16',
    totalDays: 2,
    reason: 'Inter-University Badminton Championship zonal trials.',
    appliedOn: '2026-10-14',
    status: 'Approved',
    reviewedBy: 'Dr. R. K. Sharma',
    reviewDate: '2026-10-15',
    remarks: 'Sports committee authorization accepted.'
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann_01',
    title: 'Mandatory 75% Attendance Notice for Semester-End Exams',
    date: '2026-10-20',
    postedBy: 'Dean of Academics',
    priority: 'High',
    content: 'All students are hereby informed that the university strictly mandates a minimum of 75% attendance in each subject to be eligible for the upcoming Term-End Examination. Students falling below 75% will be placed in the defaulter list by October 31st.'
  },
  {
    id: 'ann_02',
    title: 'Remedial Classes for Low Attendance Students',
    date: '2026-10-18',
    postedBy: 'HOD Computer Engineering',
    priority: 'Medium',
    content: 'Special doubt-clearing and remedial lectures will be conducted on Saturdays for Chemistry and Physics to assist students in covering lost attendance.'
  }
];

export const INITIAL_ADMIN_STATS = {
  totalUsers: 1240,
  totalClasses: 48,
  avgAttendance: 81,
  totalAlerts: 37
};
