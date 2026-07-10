import { useState, useEffect, useMemo } from 'react';
import { X, Send, AlertCircle, CalendarClock, ShieldAlert, ArrowRight, Loader2, CheckSquare, Square, Check } from 'lucide-react';
import { RecordItem } from '../types';

interface AlertSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: RecordItem[];
}

export default function AlertSimulatorModal({ isOpen, onClose, records }: AlertSimulatorModalProps) {
  const [step, setStep] = useState<'idle' | 'sending' | 'delivered'>('idle');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter records expiring in <= 10 days
  const criticalRecords = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return records.filter(r => {
      const expDate = new Date(r.expiryDate);
      const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 10;
    }).sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
  }, [records]);

  useEffect(() => {
    if (isOpen) {
      setStep('idle');
      setSelectedIds(new Set()); // Reset selection when opened
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const selectAll = () => {
    setSelectedIds(new Set(criticalRecords.map(r => r.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleSimulate = () => {
    if (selectedIds.size === 0) return;
    setStep('sending');
    setTimeout(() => {
      setStep('delivered');
    }, 1500);
  };

  // Get the selected records to render their mock emails
  const selectedRecordsList = criticalRecords.filter(r => selectedIds.has(r.id));

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Send size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Alert Dispatcher</h2>
              <p className="text-sm text-slate-500 mt-0.5">Send notifications for critical records</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 flex-1 overflow-y-auto bg-slate-100">
          
          {step === 'idle' && (
            <div className="flex flex-col h-full">
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Records Expiring in &le; 10 Days</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={selectAll}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Select All
                  </button>
                  {selectedIds.size > 0 && (
                    <button 
                      onClick={deselectAll}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Deselect All
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 max-h-[40vh]">
                {criticalRecords.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm font-medium">
                    No records are expiring in the next 10 days. Great job!
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {criticalRecords.map((rec) => {
                      const isSelected = selectedIds.has(rec.id);
                      return (
                        <div 
                          key={rec.id}
                          onClick={() => toggleSelection(rec.id)}
                          className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? 'bg-indigo-50/30' : ''}`}
                        >
                          <button className="text-slate-400 focus:outline-none">
                            {isSelected ? (
                              <CheckSquare size={20} className="text-indigo-600" />
                            ) : (
                              <Square size={20} className="text-slate-300" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-800 truncate">{rec.name}</p>
                            <p className="text-xs text-slate-500 truncate">Owner: <span className="font-medium text-slate-700">{rec.owner}</span></p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md inline-block">
                              Expires: {rec.expiryDate}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-auto">
                <button 
                  onClick={handleSimulate}
                  disabled={selectedIds.size === 0}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <Send size={20} /> 
                  {selectedIds.size > 0 ? `Dispatch Alerts (${selectedIds.size})` : 'Select records to dispatch'}
                </button>
              </div>
            </div>
          )}

          {step === 'sending' && (
            <div className="text-center py-20 flex flex-col items-center">
              <Loader2 size={48} className="text-indigo-500 animate-spin mb-6" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Connecting to SMTP...</h3>
              <p className="text-slate-500">Dispatching {selectedIds.size} secure alert payload(s)...</p>
            </div>
          )}

          {step === 'delivered' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Successfully Dispatched {selectedIds.size} Alert(s)
                </span>
                <p className="text-sm text-slate-500">Below is a log of the alerts that were dispatched.</p>
              </div>
              
              {/* Email Mockups List */}
              <div className="space-y-6">
                {selectedRecordsList.map((mockRecord, index) => {
                  const docName = mockRecord.name;
                  const docOwner = mockRecord.owner;
                  const expiryDate = mockRecord.expiryDate;
                  
                  return (
                    <div key={`${mockRecord.id}-${index}`} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 mx-auto max-w-lg">
                      {/* Email Client Header */}
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        </div>
                        <div className="text-xs font-medium text-slate-400 flex-1 text-center font-mono">
                          Inbox - {docOwner}
                        </div>
                      </div>

                      {/* Email Metadata */}
                      <div className="p-5 border-b border-slate-100 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0">
                          <ShieldAlert size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-slate-800">Action Required: Document Expiring</h4>
                          <p className="text-xs text-slate-500 mt-1">From: <span className="text-slate-700 font-medium">Expirix Automated System &lt;no-reply@expirix.com&gt;</span></p>
                          <p className="text-xs text-slate-500 mt-0.5">To: <span className="text-indigo-600 font-medium">{docOwner}</span></p>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          Just now
                        </div>
                      </div>

                      {/* Email Body */}
                      <div className="p-6 text-sm text-slate-700 leading-relaxed">
                        <p className="mb-4 font-medium">Hi {docOwner},</p>
                        
                        <p className="mb-6">
                          This is an automated alert from your Expirix dashboard. The following critical document is approaching its expiration date and requires your immediate attention to prevent operational delays.
                        </p>
                        
                        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-6">
                          <div className="flex items-center gap-2 text-rose-800 font-bold mb-2">
                            <AlertCircle size={16} />
                            {docName}
                          </div>
                          <div className="flex items-center gap-2 text-rose-700 text-xs font-medium">
                            <CalendarClock size={14} />
                            Expires on: <span className="font-bold underline">{expiryDate}</span>
                          </div>
                        </div>

                        <p className="mb-6">
                          Please initiate the renewal process immediately. Once renewed, click the button below to log into the system and push the expiry date forward.
                        </p>

                        <div className="text-center">
                          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md hover:shadow-xl transition-shadow flex items-center justify-center gap-2 mx-auto">
                            Renew in Expirix <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Email Footer */}
                      <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 font-medium">
                        This is a secure, automated notification. Please do not reply.
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
