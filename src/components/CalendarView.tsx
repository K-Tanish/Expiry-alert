import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { RecordItem, RecordStatus } from '../types';

interface CalendarViewProps {
  records: RecordItem[];
  onViewRecord: (record: RecordItem) => void;
}

export default function CalendarView({ records, onViewRecord }: CalendarViewProps) {
  // Use July 2026 as the default focused calendar month (as CURRENT_DATE is July 9, 2026)
  const [currentDate, setCurrentDate] = useState(new Date('2026-07-09'));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Navigation helpers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Calendar math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create dates grid
  const calendarDays: (Date | null)[] = [];
  
  // Padding for previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(year, month, i));
  }

  // Get records expiring on a specific date (YYYY-MM-DD)
  const getExpirationsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return records.filter((rec) => rec.expiryDate === dateStr);
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Renewal Calendar</h2>
          <p className="text-sm text-slate-500 mt-1">Track regulatory deadlines, filings, and contract review dates on an interactive grid.</p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-3 bg-white border border-slate-200/80 p-1.5 rounded-xl shadow-sm self-start">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-bold text-slate-800 min-w-[120px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Grid Calendar (Left) */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40">
          {/* Days labels */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-2">{day}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              if (!day) {
                return (
                  <div 
                    key={`empty-${idx}`} 
                    className="aspect-square bg-slate-50/50 rounded-xl border border-dashed border-slate-100" 
                  />
                );
              }

              const expirations = getExpirationsForDate(day);
              const isToday = day.toISOString().split('T')[0] === '2026-07-09';
              
              return (
                <div
                  key={`day-${day.getDate()}`}
                  className={`aspect-square p-2 border rounded-xl flex flex-col justify-between transition-all relative ${
                    isToday 
                      ? 'border-emerald-500 bg-orange-50/20 shadow-sm shadow-emerald-100' 
                      : 'border-slate-100 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <span className={`text-xs font-bold ${
                    isToday ? 'text-orange-700 font-extrabold' : 'text-slate-600'
                  }`}>
                    {day.getDate()}
                  </span>

                  {/* Expiration Dots/Badges */}
                  <div className="space-y-1">
                    {expirations.slice(0, 2).map((exp) => (
                      <div
                        key={exp.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewRecord(exp);
                        }}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate cursor-pointer transition-transform hover:scale-[1.03] ${
                          exp.status === RecordStatus.Expired ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                          exp.status === RecordStatus.ExpiringSoon ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-slate-50 text-slate-600 border border-slate-100'
                        }`}
                        title={exp.name}
                      >
                        {exp.name}
                      </div>
                    ))}
                    {expirations.length > 2 && (
                      <div className="text-[8px] text-center font-bold text-slate-400 bg-slate-50 rounded-md py-0.5">
                        +{expirations.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar deadliness agenda (Right) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
              <CalendarIcon size={18} className="text-orange-700" />
              Month Deadlines
            </h3>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {records
                .filter((rec) => {
                  const recDate = new Date(rec.expiryDate);
                  return recDate.getFullYear() === year && recDate.getMonth() === month;
                })
                .sort((a,b) => a.expiryDate.localeCompare(b.expiryDate))
                .slice(0, 6)
                .map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => onViewRecord(rec)}
                    className="p-3 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-slate-100/60 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(rec.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        rec.status === RecordStatus.Expired ? 'bg-rose-50 text-rose-600' :
                        rec.status === RecordStatus.ExpiringSoon ? 'bg-amber-50 text-amber-600' : 'bg-orange-50 text-emerald-600'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-1.5 group-hover:text-orange-700 truncate transition-colors">
                      {rec.name}
                    </p>
                  </div>
                ))}
              {records.filter((rec) => {
                const recDate = new Date(rec.expiryDate);
                return recDate.getFullYear() === year && recDate.getMonth() === month;
              }).length === 0 && (
                <div className="text-center text-slate-400 py-12 text-xs">
                  No deadlines this month!
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-50 pt-4 mt-4 text-[10px] text-slate-400 flex items-start gap-1.5 leading-normal">
            <Clock size={12} className="text-orange-700 shrink-0 mt-0.5" />
            <span>Reminders are automatically sent 30, 15, and 3 days before any calendar date.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
