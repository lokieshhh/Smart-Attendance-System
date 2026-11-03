# 🎓 Smart Attendance System Pro

An enterprise-ready, responsive **Smart Attendance Management System** for modern colleges and universities. Faithfully implements the 6 UI screen mockups with production-grade additions: dynamic QR attendance, an interactive Bunk Calculator / Target Planner, digital Student Campus IDs, today's live lecture timetable, parent defaulter SMS notices, and automated examination hall tickets.

Ready for instant deployment on **Vercel**, **GitHub Pages**, or **Netlify**.

---

## ✨ Production-Grade Features

### 1. 📱 Dynamic Classroom QR Code Attendance
- **Faculty Portal**: Project live, time-expiring (60s) QR attendance codes with anti-proxy cycling and a real-time check-in ticker.
- **Student Portal**: In-app QR scanner simulation with campus geofence check and audio/visual confirmation.

### 2. 🧮 "Bunk Calculator" & Attendance Forecaster ("BunkSafe")
- **"What-If" Live Simulator**: Move sliders to see how your % increases if you attend the next X classes, or how much it drops if you miss Y classes.
- **Goal Target Advice**: Calculates exactly how many consecutive classes you need to escape defaulter status (&ge; 75%) or how many safe bunks you have left.

### 3. 🪪 Digital Campus ID Card
- Two-sided flip ID card with student photo, PRN, branch, blood group, barcode, and digital verification QR.
- Dynamic **Semester Exam Clearance Badge**: Automatically displays whether the student is cleared for exams or on hold.

### 4. 📅 Today's Live Lecture Timetable
- Live schedule showing Periods 1 to 5 with subject code, room, timing, and real-time status badges (`Live Now`, `Attended`, `Upcoming`).
- Direct 1-click QR launch for faculty during active periods.

### 5. ⚠️ Parent Alert & Defaulter Desk (Admin & Faculty)
- Detects all students with attendance &lt; 75% in any subject.
- One-click formatted SMS / WhatsApp notice dispatcher to registered parent mobile numbers with delivery timestamps.

### 6. 📄 Official Examination Hall Ticket / Admit Card
- Printable term-end admit card with college seal, candidate photo, PRN, seat number, and approved courses.
- Automatically watermarks "PROVISIONAL DEFAULTER" if overall attendance is below 75%.

### 7. 📊 30-Day Attendance Heatmap (GitHub-Style)
- Color-coded monthly calendar (Green = 100%, Amber = partial, Red = absent) with streak tracking.

### 8. 🌙 Dark Mode & Global Toast System
- Smooth dark mode toggle and non-intrusive floating toast notifications for all system events.

---

## 🚀 How to Run Locally

```bash
cd smart-attendance-system
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 🌐 Deployment

### Push to GitHub:
```powershell
git push
```

### Deploy to Vercel:
```powershell
npx vercel --prod
```
