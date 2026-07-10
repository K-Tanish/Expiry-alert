import { ArrowUpRight, ArrowRight, User, Send, Mail } from 'lucide-react';
import { RecordStatus } from '../types';

interface KPISectionProps {
  totalCount: number;
  expiringCount: number;
  expiredCount: number;
  activeCount: number;
  activeFilter: RecordStatus | null;
  onFilterChange: (status: RecordStatus | null) => void;
  onActionRequiredClick?: () => void;
  onSimulatorClick?: () => void;
}

export default function KPISection({
  totalCount,
  expiringCount,
  expiredCount,
  activeCount,
  activeFilter,
  onFilterChange,
  onActionRequiredClick,
  onSimulatorClick,
}: KPISectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none mb-8">
      
      {/* 1. White Chart Card (Active Records) */}
      <div 
        onClick={() => onFilterChange(RecordStatus.UpToDate)}
        className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow h-48 border border-slate-100/50"
      >
        <div>
          <p className="text-xs font-bold text-slate-400">Total Active</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{activeCount}</p>
        </div>
        {/* SVG line chart mock */}
        <div className="w-full h-12 mt-4">
          <svg viewBox="0 0 100 30" className="w-full h-full preserve-aspect-ratio-none stroke-teal-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M0 25 Q 10 20, 20 22 T 40 15 T 60 10 T 80 5 T 100 0" />
          </svg>
        </div>
      </div>

      {/* 2. Solid Yellow Card (Expiring Soon) */}
      <div 
        onClick={() => onFilterChange(RecordStatus.ExpiringSoon)}
        className="bg-yellow-400 rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-shadow h-48"
      >
        <p className="text-sm font-bold text-yellow-900/80 mb-2">Expiring Soon</p>
        <p className="text-5xl font-black text-slate-900 tracking-tight">{expiringCount}</p>
      </div>

      {/* 3. Image Card */}
      <div 
        onClick={() => {
          if (onActionRequiredClick) onActionRequiredClick();
        }}
        className="bg-slate-200 rounded-3xl overflow-hidden shadow-sm relative h-48 group cursor-pointer lg:col-span-1 lg:row-span-2"
      >
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" 
          alt="Architecture"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* 4. Top Right Floating Card & Expired */}
      <div className="flex flex-col gap-4 h-48">
        <div 
          onClick={() => onFilterChange(null)}
          className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center justify-between z-10 relative cursor-pointer hover:bg-slate-50 transition-colors"
        >
           <div>
             <p className="text-[10px] font-bold text-slate-400">Total Records</p>
             <p className="text-lg font-black text-slate-800">{totalCount}</p>
           </div>
           <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
        </div>

        <div 
          onClick={() => {
            if (onSimulatorClick) onSimulatorClick();
          }}
          className="bg-indigo-600 rounded-3xl p-4 shadow-sm flex flex-col justify-between flex-1 cursor-pointer hover:bg-indigo-700 transition-colors relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 text-indigo-500/20 opacity-50 transform translate-x-2 -translate-y-2">
            <Send size={60} />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-indigo-100 leading-tight">Send Alerts</p>
            <p className="text-[10px] text-indigo-200 mt-0.5 leading-tight">Notify managers</p>
          </div>
          <div className="flex items-center justify-between relative z-10 mt-1">
             <div className="w-7 h-7 rounded-full bg-indigo-500/50 flex items-center justify-center text-white">
               <Mail size={12} />
             </div>
             <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-indigo-900 shadow-sm transform group-hover:translate-x-1 transition-transform">
               <ArrowRight size={12} />
             </div>
          </div>
        </div>
      </div>

      {/* 5. Wide Bottom Card (Replaces the "20% OFF" card) */}
      <div 
        onClick={() => {
          if (onActionRequiredClick) onActionRequiredClick();
        }}
        className="lg:col-span-2 bg-teal-700 rounded-3xl p-6 overflow-hidden relative shadow-sm h-40 flex items-center justify-between text-white group cursor-pointer hover:bg-teal-800 transition-colors"
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-1">Action Required</h2>
          <p className="text-teal-200 text-xs mb-4">Review top priority records</p>
          <div className="inline-flex items-center gap-4 bg-teal-800/50 rounded-full px-4 py-1.5 border border-teal-600/50">
            <span className="text-xs font-bold tracking-widest text-teal-100">REVIEW ALL</span>
            <span className="text-[9px] text-teal-300">CLICK HERE</span>
          </div>
        </div>
        {/* Decorative graphic */}
        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 flex items-end justify-end pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-white" preserveAspectRatio="xMaxYMax slice">
            <circle cx="150" cy="150" r="100" />
            <circle cx="150" cy="150" r="70" fill="#0f766e" />
          </svg>
        </div>
      </div>
      
    </div>
  );
}
