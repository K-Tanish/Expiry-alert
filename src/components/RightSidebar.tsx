import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { RecordItem } from '../types';
import { CURRENT_DATE_STR } from '../data/seedData';

interface RightSidebarProps {
  records: RecordItem[];
}

export default function RightSidebar({ records }: RightSidebarProps) {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(CURRENT_DATE_STR));
  const [selectedDate, setSelectedDate] = useState(new Date(CURRENT_DATE_STR));

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: (Date | null)[] = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(year, month, i));
  }

  const getLocalYMD = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const selectedDateStr = getLocalYMD(selectedDate);
  const todayStr = CURRENT_DATE_STR;

  // Filter records that either EXPIRE on selectedDate OR have a REMINDER on selectedDate
  const dailyRecords = useMemo(() => {
    return records.filter(r => {
      if (r.expiryDate === selectedDateStr) return true;
      
      const expDate = new Date(r.expiryDate);
      expDate.setDate(expDate.getDate() - r.alertDays);
      if (getLocalYMD(expDate) === selectedDateStr) return true;
      
      return false;
    });
  }, [records, selectedDateStr]);

  const getDayDotStyle = (date: Date) => {
    const dStr = getLocalYMD(date);
    if (dStr === selectedDateStr) return 'bg-teal-700 text-white shadow-md scale-110 ring-2 ring-teal-700 ring-offset-1';
    if (dStr === todayStr) return 'bg-teal-50 text-teal-800 font-bold';
    return 'text-slate-700 hover:bg-slate-100';
  };

  const getIndicator = (date: Date) => {
    const dStr = getLocalYMD(date);
    
    const expiresToday = records.some(r => r.expiryDate === dStr);
    const reminderToday = records.some(r => {
      const expDate = new Date(r.expiryDate);
      expDate.setDate(expDate.getDate() - r.alertDays);
      return getLocalYMD(expDate) === dStr;
    });
    
    // Red dot strictly means a contract EXPIRES on this exact date
    if (expiresToday) {
      return <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full"></div>;
    }
    
    // Yellow dot means it's a REMINDER date for an upcoming expiration
    if (reminderToday) {
      return <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>;
    }

    return null;
  };

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

  return (
    <aside className="w-80 bg-white flex flex-col h-full border-l border-slate-100 overflow-y-auto pb-8 select-none">
      {/* Calendar Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium text-slate-800">
            {monthNames[month]}, {currentMonthDate.getFullYear()}
          </h3>
          <div className="flex gap-2 text-slate-400">
            <button onClick={handlePrevMonth} className="hover:text-slate-600 p-1"><ChevronLeft size={18} /></button>
            <button onClick={handleNextMonth} className="hover:text-slate-600 p-1"><ChevronRight size={18} /></button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400 mb-2">
          {daysOfWeek.map(d => <div key={d}>{d}</div>)}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-sm font-medium">
          {calendarDays.map((day, idx) => (
            <div key={idx} className="flex justify-center relative">
              {day ? (
                <button 
                  onClick={() => setSelectedDate(day)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${getDayDotStyle(day)}`}
                >
                  {day.getDate()}
                  {getIndicator(day)}
                </button>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center text-slate-300">
                  {new Date(year, month, 0).getDate() - firstDayOfMonth + idx + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="h-px bg-slate-100 w-full mb-6"></div>

        {/* Selected Date Title */}
        <div className="mb-4">
           <h4 className="text-sm font-bold text-slate-800">{monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}</h4>
           <p className="text-[10px] text-slate-400 mt-0.5">{dailyRecords.length} action(s) scheduled</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Time axis */}
          <div className="space-y-8 text-[11px] font-medium text-slate-400 mb-6">
            <div>08:00</div>
            <div>09:00</div>
            <div>10:00</div>
            <div>11:00</div>
            <div>12:00</div>
            <div>13:00</div>
            <div>14:00</div>
            <div>15:00</div>
          </div>

          {/* Background horizontal lines per slot */}
          <div className="absolute top-2 left-10 right-0 bottom-0 flex flex-col justify-between pointer-events-none z-0">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="border-b border-dashed border-slate-100 h-8 mt-4 w-full"></div>
             ))}
          </div>

          {/* Timeline Event Cards */}
          <div className="absolute top-6 left-12 right-0 space-y-4 z-10">
            {dailyRecords.length === 0 ? (
              <div className="text-xs text-slate-400 italic bg-white/80 py-2">No pending decisions or expiry alerts.</div>
            ) : (
              dailyRecords.map((record, index) => {
                const timeSlot = timeSlots[index % timeSlots.length];
                const isExpiryDay = record.expiryDate === selectedDateStr;
                
                let bgColor = 'bg-yellow-50/80 border-yellow-300';
                let iconBg = 'bg-yellow-400 text-slate-800';
                let textColor = 'text-yellow-700';
                let subTextColor = 'text-yellow-600/80';
                let icon = <Clock size={14} />;
                let alertType = `Reminder: Expires in ${record.alertDays} Days`;
                
                if (isExpiryDay) {
                  bgColor = 'bg-rose-50/80 border-rose-200';
                  iconBg = 'bg-rose-500 text-white';
                  textColor = 'text-rose-700';
                  subTextColor = 'text-rose-500/80';
                  icon = <AlertCircle size={14} />;
                  alertType = 'Contract Expiration Day';
                }
                
                return (
                  <div key={record.id} className={`${bgColor} border rounded-xl p-3 flex flex-col gap-2 shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold ${textColor} truncate`}>{record.name}</p>
                        <p className={`text-[9px] ${subTextColor} mt-0.5 font-medium uppercase tracking-wider`}>{timeSlot} — {alertType}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
