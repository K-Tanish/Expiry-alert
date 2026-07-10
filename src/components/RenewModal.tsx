import { useState, useEffect } from 'react';
import { X, CalendarClock, ArrowRight } from 'lucide-react';
import { RecordItem } from '../types';

interface RenewModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: RecordItem | null;
  onRenew: (recordId: string, newExpiryDate: string) => void;
}

export default function RenewModal({ isOpen, onClose, record, onRenew }: RenewModalProps) {
  const [customDate, setCustomDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCustomDate('');
    }
  }, [isOpen]);

  if (!isOpen || !record) return null;

  const handleQuickRenew = (months: number) => {
    // Calculate new date based on today or the old expiry date depending on business logic.
    // Usually, you renew from TODAY if it's already expired, or from the expiry date if it's not expired yet.
    const baseDate = new Date(); // Let's renew from today for simplicity and safety
    baseDate.setMonth(baseDate.getMonth() + months);
    
    const newDateStr = baseDate.toISOString().split('T')[0];
    onRenew(record.id, newDateStr);
    onClose();
  };

  const handleCustomRenew = () => {
    if (customDate) {
      onRenew(record.id, customDate);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <CalendarClock size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Renew Record</h2>
              <p className="text-sm text-slate-500 mt-0.5 truncate max-w-[250px]">{record.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3">Quick Renewal Options</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleQuickRenew(1)}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 transition-all text-sm font-bold text-slate-600 group"
              >
                1 Month
                <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-600 transition-colors" />
              </button>
              <button 
                onClick={() => handleQuickRenew(6)}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 transition-all text-sm font-bold text-slate-600 group"
              >
                6 Months
                <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-600 transition-colors" />
              </button>
              <button 
                onClick={() => handleQuickRenew(12)}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 transition-all text-sm font-bold text-slate-600 group"
              >
                1 Year
                <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-600 transition-colors" />
              </button>
              <button 
                onClick={() => handleQuickRenew(36)}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 transition-all text-sm font-bold text-slate-600 group"
              >
                3 Years
                <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-600 transition-colors" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-slate-400 font-bold uppercase tracking-wider">Or</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3">Custom Expiry Date</h3>
            <div className="flex gap-3">
              <input 
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="flex-1 border border-slate-200 bg-slate-50 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
              />
              <button 
                onClick={handleCustomRenew}
                disabled={!customDate}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
