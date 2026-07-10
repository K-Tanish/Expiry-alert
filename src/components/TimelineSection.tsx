import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Info, Calendar } from 'lucide-react';
import { ExpiryTimelineEvent, RecordStatus, RecordItem } from '../types';

interface TimelineSectionProps {
  timelineEvents: ExpiryTimelineEvent[];
  allRecords: RecordItem[];
  onViewRecordByName: (name: string) => void;
}

export default function TimelineSection({ timelineEvents, allRecords, onViewRecordByName }: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDayId, setHoveredDayId] = useState<string | null>(null);

  // Generate dynamic, continuous day list around Today (2026-07-09) to optimize view density
  const daysList = useMemo(() => {
    // Focus the interactive day-by-day continuous timeline on the highly relevant operational period:
    // June 1st, 2026 to September 25th, 2026. This contains 4 major events (June 7, July 9, July 25, Sep 16).
    const minDate = new Date('2026-06-01');
    const maxDate = new Date('2026-09-25');

    const list = [];
    const current = new Date(minDate);
    const todayStr = '2026-07-09'; // static system baseline date

    while (current <= maxDate) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const dayVal = String(current.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dayVal}`;

      // Check if there is a matching timeline event on this day
      const event = timelineEvents.find((e) => e.date === dateStr);
      const isFirstOfMonth = current.getDate() === 1;

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const label = `${monthNames[current.getMonth()]} ${current.getDate()}`;

      list.push({
        id: `day-${dateStr}`,
        dateStr,
        isToday: dateStr === todayStr,
        isFirstOfMonth,
        monthLabel: monthNames[current.getMonth()].toUpperCase(),
        label,
        event,
      });

      current.setDate(current.getDate() + 1);
    }

    return list;
  }, [timelineEvents]);

  // Smooth scroll left or right by chunk
  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Scroll viewport to center on Today's date indicator
  const scrollToToday = () => {
    const todayEl = document.getElementById('timeline-today');
    if (todayEl) {
      todayEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  // Auto-scroll to center on Today upon mount or initial database load
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToToday();
    }, 400);
    return () => clearTimeout(timer);
  }, [daysList]);

  const getStatusStyle = (status: RecordStatus) => {
    switch (status) {
      case RecordStatus.Expired:
        return 'bg-rose-500 ring-4 ring-rose-100 text-white shadow-sm shadow-rose-200';
      case RecordStatus.ExpiringSoon:
        return 'bg-amber-500 ring-4 ring-amber-100 text-white shadow-sm shadow-amber-200';
      default:
        return 'bg-slate-400 ring-4 ring-slate-100 text-white shadow-sm shadow-slate-200';
    }
  };

  const handleDayClick = (day: typeof daysList[0]) => {
    if (day.event?.recordName) {
      onViewRecordByName(day.event.recordName);
    } else if (day.isToday) {
      alert("Today's Check: Compliance engine healthy. Focus on high-risk expiring permits.");
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40 select-none">
      
      {/* Widget Header Area */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800">Continuous Expiry Timeline</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Every day visualized. Highlighting critical compliance and contract milestones.
          </p>
        </div>

        {/* Scroll Coordinates Control Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollToToday}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all duration-150 cursor-pointer shadow-sm shadow-emerald-100/20"
          >
            <Calendar size={13} />
            Jump to Today
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <button
            onClick={() => handleScroll('left')}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-150 cursor-pointer"
            title="Scroll Left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-150 cursor-pointer"
            title="Scroll Right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Continuous Axis Display */}
      <div className="relative bg-slate-50/30 rounded-2xl border border-slate-100/50 py-10 my-2 overflow-hidden">
        
        {/* Unified Horizontal Background Track Line (centered) */}
        <div className="absolute top-[92px] left-0 right-0 h-[2px] bg-slate-200/80 z-0" />

        {/* Horizontally Scrolling Day Row */}
        <div
          ref={containerRef}
          className="overflow-x-auto scrollbar-none flex items-start pl-12 pr-12 relative z-10 scroll-smooth"
        >
          <div className="flex items-start min-w-max">
            {daysList.map((day) => {
              const isSpecial = day.isToday || day.event;
              const hasChecked = day.event && day.dateStr < '2026-07-09' && day.event.status === RecordStatus.UpToDate;
              const isHovered = hoveredDayId === day.id;

              return (
                <div
                  key={day.id}
                  id={day.isToday ? 'timeline-today' : undefined}
                  onMouseEnter={() => setHoveredDayId(day.id)}
                  onMouseLeave={() => setHoveredDayId(null)}
                  onClick={() => handleDayClick(day)}
                  className={`flex flex-col items-center shrink-0 relative transition-all duration-200 cursor-pointer ${
                    isSpecial ? 'w-24 mx-1.5' : 'w-[5px] mx-[0.5px] hover:scale-y-110'
                  }`}
                >
                  {/* TOP ZONE: Date Labels & Months */}
                  <div className="h-8 flex items-center justify-center text-center">
                    {isSpecial ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ring-1 tracking-tight ${
                        day.isToday
                          ? 'text-orange-800 bg-orange-50 ring-orange-200'
                          : 'text-slate-600 bg-slate-100/80 ring-slate-200'
                      }`}>
                        {day.label}
                      </span>
                    ) : day.isFirstOfMonth ? (
                      <span className="text-[9px] font-black text-slate-400 tracking-wider">
                        {day.monthLabel}
                      </span>
                    ) : null}
                  </div>

                  {/* MIDDLE ZONE: Prominent Shapes vs Ticks */}
                  <div className="h-10 flex items-center justify-center relative">
                    {isSpecial ? (
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm z-10 ${
                        day.isToday
                          ? 'bg-orange-500 ring-4 ring-orange-100 text-white shadow-orange-200'
                          : getStatusStyle(day.event?.status || RecordStatus.UpToDate)
                      }`}>
                        {day.isToday ? (
                          <span className="text-[8px] font-black tracking-tight">Today</span>
                        ) : hasChecked ? (
                          <Check size={13} className="text-white" />
                        ) : (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                    ) : (
                      /* Regular gray tick marks */
                      <div className={`w-[2px] rounded-full transition-all duration-150 ${
                        day.isFirstOfMonth 
                          ? 'h-5 bg-slate-400/80' 
                          : 'h-3.5 bg-slate-300 hover:bg-slate-500'
                      }`} />
                    )}
                  </div>

                  {/* BOTTOM ZONE: Record names & descriptions */}
                  <div className="h-10 text-center flex items-start justify-center mt-2 px-1 max-w-[100px]">
                    {isSpecial && (
                      <p className="text-[9px] font-bold text-slate-400 hover:text-slate-700 truncate leading-tight">
                        {day.event?.recordName || (day.isToday ? 'Operating Review' : 'Compliance Check')}
                      </p>
                    )}
                  </div>

                  {/* CUSTOM INTELLIGENT TOOLTIPS */}
                  {isHovered && (
                    <div className="absolute top-14 bg-slate-900/95 text-white rounded-xl p-3 shadow-xl z-50 text-left w-52 pointer-events-none animate-in fade-in slide-in-from-top-2 duration-150">
                      {isSpecial ? (
                        <div className="flex items-start gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full mt-0.5 shrink-0 ${
                            day.isToday ? 'bg-orange-500' :
                            day.event?.status === RecordStatus.Expired ? 'bg-rose-500' :
                            day.event?.status === RecordStatus.ExpiringSoon ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                          <div>
                            <p className="text-[10px] font-bold leading-tight">
                              {day.event?.recordName || (day.isToday ? "Today's Status" : "Active Event")}
                            </p>
                            <p className="text-[9px] text-slate-300 mt-1 leading-normal">
                              {day.isToday
                                ? "Current compliance index: 96%"
                                : `Target expiry: ${day.dateStr}`}
                            </p>
                            {day.event?.recordName && (
                              <p className="text-[8px] text-orange-400 font-bold mt-1.5 flex items-center gap-1">
                                <Info size={9} /> Click to view registry file
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[10px] font-bold leading-tight">{day.label}, 2026</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">No critical renewals scheduled</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Compliance Legend */}
      <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-rose-500 rounded-full" />
          <span>Expired</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-amber-500 rounded-full" />
          <span>Expiring Soon</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-slate-400 rounded-full" />
          <span>Up to Date</span>
        </div>
        <div className="h-3 w-px bg-slate-200 mx-1" />
        <div className="flex items-center gap-1.5">
          <div className="w-[2px] h-3.5 bg-slate-300 rounded-full" />
          <span>Timeline Day Indicator</span>
        </div>
      </div>
    </div>
  );
}
