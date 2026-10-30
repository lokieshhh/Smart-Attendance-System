# 🎓 Smart Attendance System

An advanced, responsive **Smart Attendance System** designed for modern colleges and universities. Faithfully implements the 6 UI screen mockups with digital marking, automatic percentage calculations, early low-attendance alerts (<75%), leave management with faculty approvals, and an administrative control panel.

Designed to be deployed in 1-click on **Netlify** or **Vercel** (`dist/` static SPA).

---

## 📱 The 6 Mockup Screens Implemented

1. **Screen 1: Login**
   - Brand circular badge with emerald checkmark.
   - User ID / Email, Password input fields.
   - Role selector radio buttons: `Student`, `Faculty`, `Admin`.
   - 1-click instant demo logins for quick evaluation.
   - Forgot password modal.

2. **Screen 2: Student Dashboard**
   - "Hello, Student" greeting with class & roll number.
   - **82% Overall Attendance** hero card with pale teal styling.
   - Subject-wise progress cards with real-time percentages:
     - Maths: 90% (Teal)
     - Physics: 78% (Amber)
     - Chemistry: 70% (Red - critical)
     - English: 88% (Teal)
   - **Early Warning Banner**: `⚠️ Chemistry below 75%` displaying the exact number of consecutive lectures needed to restore 75% compliance!

3. **Screen 3: Mark Attendance (Faculty Portal)**
   - Header with Class, Subject, and Date selector: `Class: SE-A | Maths | 22 Oct`.
   - **Date History Editor**: Choose any date (past, present, future) to mark or edit student attendance.
   - Real-time student search bar (`Search student...`).
   - Student roster with quick `[ P ]` (Green) and `[ A ]` (Red) toggle buttons.
   - Bulk actions: "Mark All Present" & "Mark All Absent".
   - Live summary stats: `Present: 3 | Absent: 2` (dynamic rate recalculation).
   - "SUBMIT ATTENDANCE" with instant recalculation of all student percentages!

4. **Screen 4: Attendance Report & Analytics**
   - Filters: Month (`Oct`, `Nov`, etc.) and Subject (`All`, `Maths`, `Physics`, etc.).
   - Monthly attendance trend bar chart (%) matching the mockup.
   - Breakdown Table: Subject, Attended/Total lectures (e.g. Maths 18/20, Physics 15/20, Chemistry 14/20).
   - One-click **Export PDF** (printable official college transcript) and **Export CSV** download.

5. **Screen 5: Notifications & Early Alerts**
   - Critical low attendance warning: `Low attendance: Chemistry 70% | Today, 9:10 AM` with highlighted red border and badge.
   - Leave approval notices: `Leave request approved | Yesterday`.
   - Attendance submission notices: `Attendance marked: Physics | 20 Oct`.
   - Monthly report notification: `Monthly report ready | 18 Oct`.
   - "Mark all as read" button.

6. **Screen 6: Admin Panel**
   - 4 Top KPI Metric Cards:
     - `1,240` Users
     - `48` Classes
     - `81%` Avg. Attendance
     - `37` Alerts (<75%)
   - Four interactive administration modules:
     - **Manage Users**: Add, search, view, and delete students & faculty.
     - **Manage Classes & Subjects**: Add classes and assign subjects to faculty.
     - **Generate Reports**: Inspect college-wide defaulters list (<75%) and export notices.
     - **Send Notice**: Broadcast college-wide circulars with priority tags.

7. **Bonus Requested Feature: Leave Management System**
   - Student view: Submit leave requests with Date range, Leave Type (Medical, Academic, Sports, Personal), and Reason.
   - Faculty view: Review pending leave applications with 1-click `[ Approve ]` or `[ Reject ]` and add remarks.
   - Generates notifications for students upon approval/rejection.

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
This produces an optimized, standalone static site in the `dist/` directory.

---

## 🌐 How to Deploy to Netlify

### Option A: Netlify Drop (Zero Configuration - Instant!)
1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder into the browser window.
4. Your website is live in seconds with a custom HTTPS URL!

### Option B: Netlify via GitHub
1. Push this folder to a GitHub repository.
2. In Netlify dashboard, click **"Add new site"** > **"Import an existing project"**.
3. Select your GitHub repository.
4. Netlify will automatically detect settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**. (The included `netlify.toml` and `public/_redirects` ensure page routing works cleanly).

---

## 🔺 How to Deploy to Vercel

### Option A: Vercel Dashboard (GitHub)
1. Push this project to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel automatically detects Vite and sets:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **"Deploy"**. (The included `vercel.json` ensures full SPA routing).

### Option B: Vercel CLI
```bash
npx vercel
```
Follow the prompts (accept defaults). For production:
```bash
npx vercel --prod
```

---

## 🛠 Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Persistence**: LocalStorage with automatic reactivity & initial seed data
- **Delights**: Canvas Confetti, Print PDF view, CSV file generation
