import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, X, FileSpreadsheet, Check, Download, AlertCircle } from 'lucide-react';

export const BulkImportModal = ({ isOpen, onClose }) => {
  const { classes, bulkImportStudents } = useApp();
  const [selectedClass, setSelectedClass] = useState('class_se_a');
  const [importedCount, setImportedCount] = useState(0);

  if (!isOpen) return null;

  const sampleRoster = [
    { name: 'Aditya Kulkarni', rollNo: '09', email: 'aditya.k@college.edu', phone: '+91 98201 99001' },
    { name: 'Tanvi Shinde', rollNo: '10', email: 'tanvi.s@college.edu', phone: '+91 98201 99002' },
    { name: 'Siddharth Nair', rollNo: '11', email: 'siddharth.n@college.edu', phone: '+91 98201 99003' },
    { name: 'Pooja Hegde', rollNo: '12', email: 'pooja.h@college.edu', phone: '+91 98201 99004' },
    { name: 'Varun Verma', rollNo: '13', email: 'varun.v@college.edu', phone: '+91 98201 99005' }
  ];

  const handleSimulateImport = () => {
    bulkImportStudents(selectedClass, sampleRoster);
    setImportedCount(sampleRoster.length);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Bulk Student Enrollment</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Quickly enroll entire class divisions from official college Excel / CSV rosters.
          </p>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name} - {c.department}</option>
              ))}
            </select>
          </div>

          {/* Upload Drag & Drop Box */}
          <div 
            onClick={handleSimulateImport}
            className="border-2 border-dashed border-teal-400/80 bg-teal-50/50 hover:bg-teal-50 rounded-2xl p-6 text-center cursor-pointer transition-colors space-y-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-teal-900 block text-xs">Drop CSV Roster Here</span>
              <span className="text-[10px] text-slate-400">or click to import 5 sample students</span>
            </div>
          </div>

          {importedCount > 0 && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 font-semibold text-center animate-in fade-in">
              ✓ Successfully enrolled {importedCount} new students!
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Supported: .csv, .xlsx</span>
            <span className="text-teal-700 font-semibold cursor-pointer hover:underline">
              Download Template
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
