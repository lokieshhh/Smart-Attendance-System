import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  QrCode, 
  X, 
  Camera, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Layers,
  Check,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QRModal = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    qrSession, 
    startQRSession, 
    refreshQRCode, 
    closeQRSession, 
    studentScanQR,
    classes,
    subjects
  } = useApp();

  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  // Faculty session setup state
  const [selectedSub, setSelectedSub] = useState(subjects[0]?.id || 'sub_maths');
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || 'class_se_a');

  // Student scanner state
  const [manualCode, setManualCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [geofenceVerified, setGeofenceVerified] = useState(true);

  // Faculty countdown timer
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let timer;
    if (qrSession.active) {
      timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((qrSession.expiresAt - Date.now()) / 1000));
        setTimeLeft(remaining);
        if (remaining === 0) {
          refreshQRCode();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [qrSession.active, qrSession.expiresAt]);

  if (!isOpen) return null;

  // Student trigger scan action
  const handleScanAction = (codeToUse) => {
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setScanning(false);
      const code = codeToUse || manualCode || qrSession.sessionCode || 'MIT-1001';
      const result = studentScanQR(code);
      setScanResult(result);

      if (result.success) {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0d9488', '#10b981', '#14b8a6']
          });
        } catch (e) { /* ignore */ }
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">
                {isFaculty ? 'Classroom Dynamic QR Attendance' : 'Scan Classroom Attendance QR'}
              </h3>
              <p className="text-[10px] text-teal-400">
                {isFaculty ? 'Anti-proxy timed token generator' : 'Verify campus presence & record status'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
          
          {/* ========================================================================= */}
          {/* 1. FACULTY SESSION GENERATOR */}
          {/* ========================================================================= */}
          {isFaculty ? (
            qrSession.active ? (
              /* Active Faculty QR Display with Countdown */
              <div className="space-y-4 text-center">
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-between text-left">
                  <div>
                    <span className="font-bold text-teal-900 text-xs block">{qrSession.subjectName} ({qrSession.className})</span>
                    <span className="text-[11px] text-teal-700">{qrSession.room} • Fall 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-teal-200 text-teal-800 font-bold">
                    <Clock className="w-3.5 h-3.5 text-teal-600 animate-spin" />
                    <span>{timeLeft}s</span>
                  </div>
                </div>

                {/* Dynamic SVG QR Code Simulation with live session code */}
                <div className="relative inline-block bg-white p-4 rounded-3xl border-2 border-teal-600 shadow-md">
                  <div className="w-48 h-48 bg-slate-950 rounded-2xl p-3 flex flex-col items-center justify-between relative overflow-hidden">
                    {/* Simulated QR matrix corners */}
                    <div className="w-full flex justify-between">
                      <div className="w-10 h-10 border-4 border-white rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-teal-400 rounded-xs" />
                      </div>
                      <div className="w-10 h-10 border-4 border-white rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-teal-400 rounded-xs" />
                      </div>
                    </div>

                    {/* Center Code Badge */}
                    <div className="bg-teal-600 text-white font-mono font-bold text-sm px-3 py-1.5 rounded-xl shadow-lg border border-teal-400 z-10 animate-pulse">
                      {qrSession.sessionCode}
                    </div>

                    <div className="w-full flex justify-between items-end">
                      <div className="w-10 h-10 border-4 border-white rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-teal-400 rounded-xs" />
                      </div>
                      <div className="text-[9px] text-teal-300 font-mono">
                        SCAN ON PORTAL
                      </div>
                    </div>

                    {/* Animated scanning bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 shadow-[0_0_8px_#2dd4bf] animate-[bounce_3s_infinite]" />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={refreshQRCode}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh Token Now
                  </button>
                  <span className="text-[11px] text-slate-400">Tokens expire every 60s</span>
                </div>

                {/* Live student check-in list */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-teal-600" />
                      Live Student Check-ins ({qrSession.checkedInStudents.length})
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  {qrSession.checkedInStudents.length > 0 ? (
                    <div className="space-y-1.5 max-h-28 overflow-y-auto">
                      {qrSession.checkedInStudents.map((s, idx) => (
                        <div key={idx} className="p-1.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-800">{s.name} (Roll {s.rollNo})</span>
                          <span className="text-[10px] text-emerald-700 font-medium">✓ {s.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 text-center py-3">
                      Waiting for students to scan the live QR code...
                    </p>
                  )}
                </div>

                {/* Close Session Button */}
                <button
                  onClick={closeQRSession}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Close Session & Commit Attendance
                </button>
              </div>
            ) : (
              /* Setup New Session */
              <div className="space-y-3">
                <p className="text-slate-600 leading-relaxed">
                  Project a live QR code onto your classroom screen. Students can scan it directly from their portal to mark their presence automatically.
                </p>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Select Subject</label>
                  <select
                    value={selectedSub}
                    onChange={(e) => setSelectedSub(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-1 focus:ring-teal-500"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name} - {s.fullName} ({s.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Select Class / Batch</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-1 focus:ring-teal-500"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name} - {c.department} ({c.room})</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Security & Proxy Protection Active:
                  </p>
                  <p>QR tokens cycle every 60 seconds. Screenshots shared outside the classroom will expire automatically.</p>
                </div>

                <button
                  onClick={() => startQRSession(selectedSub, selectedClass)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <QrCode className="w-4 h-4 text-teal-400" />
                  START LIVE ATTENDANCE SESSION
                </button>
              </div>
            )
          ) : (
            /* ========================================================================= */
            /* 2. STUDENT CAMERA SCANNER VIEW */
            /* ========================================================================= */
            <div className="space-y-4 text-center">
              {/* Geofence Status Badge */}
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] text-left">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block">Campus Geofence: Active</span>
                    <span className="text-[10px] text-emerald-700">Metropolitan Institute Grounds (Verified)</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-200/60 px-2 py-0.5 rounded-full">
                  In Bounds
                </span>
              </div>

              {/* Viewfinder Canvas Simulation */}
              <div className="w-full h-52 bg-slate-950 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border-2 border-slate-700 p-4">
                {/* Crosshairs & Scanning Line */}
                <div className="w-36 h-36 border-2 border-teal-400/80 rounded-2xl relative flex items-center justify-center">
                  <div className="w-3 h-3 border-t-2 border-l-2 border-teal-400 absolute -top-1 -left-1" />
                  <div className="w-3 h-3 border-t-2 border-r-2 border-teal-400 absolute -top-1 -right-1" />
                  <div className="w-3 h-3 border-b-2 border-l-2 border-teal-400 absolute -bottom-1 -left-1" />
                  <div className="w-3 h-3 border-b-2 border-r-2 border-teal-400 absolute -bottom-1 -right-1" />

                  {scanning ? (
                    <div className="text-teal-300 font-mono text-[11px] animate-pulse">
                      Analyzing Token...
                    </div>
                  ) : (
                    <Camera className="w-8 h-8 text-teal-400/50" />
                  )}

                  {/* Laser bar animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-[bounce_2s_infinite]" />
                </div>

                <span className="text-[10px] text-slate-400 mt-2">
                  Align camera with the projector screen QR code
                </span>
              </div>

              {/* Scan Results message */}
              {scanResult && (
                <div className={`p-3 rounded-xl border text-xs font-semibold ${
                  scanResult.success 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}>
                  {scanResult.success ? '✅ Attendance Verified & Recorded for Today!' : `❌ ${scanResult.message}`}
                </div>
              )}

              {/* Active Session Token Quick-fill helper */}
              {qrSession.active && (
                <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-xl text-left flex items-center justify-between">
                  <div>
                    <span className="font-bold text-teal-900 block text-xs">Live Lecture Detected:</span>
                    <span className="text-[10px] text-teal-700">{qrSession.subjectName} ({qrSession.room})</span>
                  </div>
                  <button
                    onClick={() => handleScanAction(qrSession.sessionCode)}
                    disabled={scanning}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-xs shadow-xs"
                  >
                    1-Click Auto Scan
                  </button>
                </div>
              )}

              {/* Manual Code Input Option */}
              <div className="pt-1">
                <span className="text-[10px] text-slate-400 block mb-1">Or enter teacher's on-screen token:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                    placeholder="e.g. MIT-4820"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-xl uppercase font-mono text-xs focus:ring-1 focus:ring-teal-500"
                  />
                  <button
                    onClick={() => handleScanAction(manualCode)}
                    disabled={scanning}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
                  >
                    {scanning ? 'Scanning...' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
