import React, { useState, useEffect } from 'react';
import { UploadCloud, X, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { RecordItem, RecordCategory, RecordStatus } from '../types';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (records: RecordItem[]) => void;
}

export default function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDragActive(false);
      setIsUploading(false);
      setProgress(0);
      setUploadComplete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateUpload = (recordsToImport: RecordItem[]) => {
    setIsUploading(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20) + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setUploadComplete(true);
        
        // Push the actual parsed records after delay
        setTimeout(() => {
          onImport(recordsToImport);
          onClose();
        }, 1500);
      }
      setProgress(currentProgress);
    }, 400);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      const parsedRecords: RecordItem[] = [];
      // Skip header line
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim());
        if (cols.length >= 6) {
          const expDate = new Date(cols[4]);
          const today = new Date();
          let status = RecordStatus.UpToDate;
          const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays < 0) status = RecordStatus.Expired;
          else if (diffDays <= 30) status = RecordStatus.ExpiringSoon;

          parsedRecords.push({
            id: `import-${Date.now()}-${i}`,
            documentNumber: cols[0],
            name: cols[1],
            category: (Object.values(RecordCategory) as string[]).includes(cols[2]) ? (cols[2] as RecordCategory) : RecordCategory.Contracts,
            owner: cols[3],
            expiryDate: cols[4],
            cost: parseFloat(cols[5]) || 0,
            description: cols[6] || 'Imported legacy record',
            status: status,
            alertDays: 30,
            reminderSent: false,
            isNewlyImported: true
          });
        }
      }
      simulateUpload(parsedRecords);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Import from Excel/CSV</h2>
            <p className="text-sm text-slate-500 mt-1">Bulk upload your legacy records.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {!isUploading && !uploadComplete ? (
            <div 
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all ${
                dragActive ? 'border-teal-500 bg-teal-50/50' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mb-4">
                <UploadCloud size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Drag and drop your file here</h3>
              <p className="text-sm text-slate-500 mb-6 text-center">
                Supported formats: .xlsx, .xls, .csv <br/> Maximum file size: 10MB
              </p>
              
              <label className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold rounded-xl cursor-pointer transition-colors shadow-sm">
                Browse Files
                <input type="file" className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleChange} />
              </label>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center">
              {uploadComplete ? (
                <>
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Import Successful!</h3>
                  <p className="text-slate-500 text-sm">Processing records and updating database...</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <FileSpreadsheet size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Parsing Document...</h3>
                  
                  <div className="w-full max-w-xs bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
                    <div 
                      className="bg-teal-600 h-3 rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs font-bold text-teal-700">{progress}% Complete</p>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
           <span>Need a template? <a href="#" className="text-teal-700 font-bold hover:underline">Download sample Excel file</a></span>
        </div>
      </div>
    </div>
  );
}
