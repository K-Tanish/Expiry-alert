import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Mail, X, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { RecordItem } from '../types';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  expiringRecords: RecordItem[];
  onViewRecord: (record: RecordItem) => void;
}

export default function Header({ searchTerm, setSearchTerm, expiringRecords, onViewRecord }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-8 sticky top-0 z-30 select-none">
      {/* Search Input */}
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search records..."
          className="w-full pl-11 pr-14 py-2.5 bg-slate-50/50 hover:bg-slate-50 text-slate-700 placeholder-slate-400 text-sm border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all duration-150"
        />
        <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
          <span className="text-[10px] font-semibold text-slate-400 border border-slate-200 bg-white px-1.5 py-0.5 rounded-md shadow-sm">
            ⌘ K
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Messages */}
        <button 
          onClick={() => alert("Simulation: No unread messages in your mailbox.")}
          className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all duration-150"
        >
          <Mail size={20} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all duration-150 relative ${
              showNotifications ? 'bg-slate-50' : ''
            }`}
          >
            <Bell size={20} />
            {expiringRecords.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-50">
              <div className="p-4 bg-slate-50/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  {expiringRecords.length} Alerts
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {expiringRecords.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    No urgent alerts. Everything is up to date!
                  </div>
                ) : (
                  expiringRecords.slice(0, 5).map((rec) => (
                    <div 
                      key={rec.id} 
                      onClick={() => {
                        onViewRecord(rec);
                        setShowNotifications(false);
                      }}
                      className="p-3.5 hover:bg-slate-50 transition-colors duration-150 cursor-pointer flex gap-3 text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <AlertTriangle size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {rec.name}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {rec.category} • Expires {rec.expiryDate}
                        </p>
                      </div>
                      <div className="self-center text-slate-400">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  ))
                )}
              </div>
              {expiringRecords.length > 5 && (
                <div className="p-3 bg-slate-50/40 text-center">
                  <button 
                    onClick={() => {
                      alert("Detailed lists of expiring records are available on the Records panel!");
                      setShowNotifications(false);
                    }}
                    className="text-[11px] font-bold text-orange-700 hover:text-orange-800 hover:underline"
                  >
                    View All {expiringRecords.length} Alerts
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-slate-100" />

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-xs font-semibold text-slate-800">Rahul Sharma</p>
            <p className="text-[10px] text-slate-400">rahul.sharma@acme.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm ring-2 ring-orange-50 shrink-0 select-none">
            RS
          </div>
        </div>
      </div>
    </header>
  );
}
