import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Video } from 'lucide-react';
import { RecordItem, RecordStatus } from '../types';
import { CURRENT_DATE_STR } from '../data/seedData';

interface RightSidebarProps {
  records: RecordItem[];
}

export default function RightSidebar({ records }: RightSidebarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(CURRENT_DATE_STR));

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: (Date | null)[] = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(year, month, i));
  }

  const getDayDot = (dayNum: number) => {
    // Mock logic based on screenshot: teal for selected/today, yellow for other dates, rose/red dots underneath
    if (dayNum === 10 || dayNum === 12) return 'bg-teal-700 text-white shadow-md';
    if (dayNum === 20 || dayNum === 21) return 'bg-yellow-400 text-slate-800 shadow-md';
    return 'text-slate-700 hover:bg-slate-100';
  };

  const getIndicator = (dayNum: number) => {
    if (dayNum === 6 || dayNum === 22 || dayNum === 25) return <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full"></div>;
    if (dayNum === 16) return <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>;
    return null;
  };

  return (
    <aside className="w-80 bg-white flex flex-col h-full border-l border-slate-100 overflow-y-auto pb-8">
      {/* Calendar Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium text-slate-800">
            {monthNames[month]}, {currentDate.getDate()} <span className="text-slate-500 font-normal">Tuesday</span>
          </h3>
          <div className="flex gap-2 text-slate-400">
            <button className="hover:text-slate-600"><ChevronLeft size={18} /></button>
            <button className="hover:text-slate-600"><ChevronRight size={18} /></button>
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
                <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${getDayDot(day.getDate())}`}>
                  {day.getDate()}
                  {getIndicator(day.getDate())}
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Time axis */}
          <div className="space-y-8 text-[11px] font-medium text-slate-400 mb-6">
            <div>08:00</div>
            <div>08:30</div>
            <div>09:00</div>
            <div>09:30</div>
            <div>10:00</div>
            <div>10:30</div>
            <div>11:00</div>
            <div>11:30</div>
          </div>

          {/* Background horizontal lines per slot (mocking) */}
          <div className="absolute top-2 left-10 right-0 bottom-0 flex flex-col justify-between pointer-events-none z-0">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="border-b border-dashed border-slate-200 h-8 mt-4 w-full"></div>
             ))}
          </div>

          {/* Timeline Event Cards */}
          <div className="absolute top-10 left-12 right-0 space-y-6 z-10">
            {/* Event 1 */}
            <div className="bg-teal-50/50 border border-teal-200 rounded-xl p-3 flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0">
                <Video size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-teal-800">Award Show Discussion</p>
                <p className="text-[10px] text-teal-600/80 mt-0.5">09:00 AM — 10:00 AM</p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-white border border-yellow-300 rounded-xl p-3 flex items-center gap-3 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer relative -ml-16">
              {/* Timeline indicator line for this specific event */}
              <div className="absolute top-1/2 -left-12 w-12 h-px bg-yellow-400"></div>
              <div className="absolute top-1/2 -left-12 w-2 h-2 rounded-full bg-yellow-400 -translate-y-1/2"></div>
              
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center shrink-0">
                <Clock size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-yellow-600">New Branding work Ave</p>
                <p className="text-[10px] text-yellow-600/80 mt-0.5">11:00 AM — 12:30 PM</p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-3 flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer mt-12">
              <div className="w-8 h-8 rounded-full bg-rose-400 text-white flex items-center justify-center shrink-0">
                <Video size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-500">Development Discussion</p>
                <p className="text-[10px] text-rose-400 mt-0.5">12:00 PM — 03:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
