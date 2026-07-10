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
        className="bg-slate-200 rounded-3xl overflow-hidden shadow-sm relative h-48 group cursor-pointer lg:col-span-1"
      >
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" 
          alt="Architecture"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
        className="lg:col-span-2 bg-rose-800 rounded-3xl p-6 overflow-hidden relative shadow-sm h-48 flex items-center justify-between text-white group cursor-pointer hover:bg-rose-900 transition-colors"
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-1">Action Required</h2>
          <p className="text-rose-200 text-xs mb-4">Review top priority records</p>
          <div className="inline-flex items-center gap-4 bg-rose-900/50 rounded-full px-4 py-1.5 border border-rose-700/50">
            <span className="text-xs font-bold tracking-widest text-rose-100">REVIEW ALL</span>
            <span className="text-[9px] text-rose-300">CLICK HERE</span>
          </div>
        </div>
        {/* Decorative graphic */}
        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 flex items-end justify-end pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-white" preserveAspectRatio="xMaxYMax slice">
            <circle cx="150" cy="150" r="100" />
            <circle cx="150" cy="150" r="70" fill="#881337" />
          </svg>
        </div>
      </div>
      
      {/* 6. Alert Status Gauge Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 h-48 flex items-center justify-between p-6 lg:col-span-2 overflow-hidden">
        
        {/* Legend on Left */}
        <div className="flex flex-col gap-4 justify-center pl-4 w-1/3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-emerald-900 shadow-sm"></div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Expiring</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm"></div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Renewed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border border-slate-300 shadow-sm" style={{ background: 'repeating-linear-gradient(45deg, #cbd5e1, #cbd5e1 1.5px, transparent 1.5px, transparent 4px)' }}></div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Expired</span>
          </div>
        </div>

        {/* SVG on Right */}
        <div className="w-2/3 h-full relative flex items-center justify-center">
          <svg viewBox="0 0 200 130" className="w-full h-[120%] overflow-visible mt-6">
            <defs>
              <pattern id="stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#cbd5e1" strokeWidth="2" />
              </pattern>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="-2" dy="2" stdDeviation="2" floodOpacity="0.15" />
              </filter>
            </defs>
            
            {(() => {
              const nonRenewed = expiringCount + expiredCount;
              const total = nonRenewed > 0 ? nonRenewed / 0.7 : 100;
              const renewed = total * 0.3;
              
              const c = Math.PI * 80;
              const l1 = (renewed / total) * c; // Light Green (Middle)
              const l2 = (expiringCount / total) * c; // Dark Green (Left)
              const l3 = (expiredCount / total) * c; // Striped (Right)
              
              return (
                <>
                  {/* Striped (Right) */}
                  <path 
                    d="M 20 110 A 80 80 0 0 1 180 110" 
                    fill="none" 
                    stroke="url(#stripes)" 
                    strokeWidth="24" 
                    strokeLinecap="round" 
                    strokeDasharray={`${l3} ${c}`}
                    strokeDashoffset={-(l2 + l1)}
                  />
                  
                  {/* Light Green (Middle) */}
                  <path 
                    d="M 20 110 A 80 80 0 0 1 180 110" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="24" 
                    strokeLinecap="round" 
                    strokeDasharray={`${l1} ${c}`}
                    strokeDashoffset={-l2}
                  />
                  
                  {/* Dark Green (Left) */}
                  <path 
                    d="M 20 110 A 80 80 0 0 1 180 110" 
                    fill="none" 
                    stroke="#064e3b" 
                    strokeWidth="24" 
                    strokeLinecap="round" 
                    strokeDasharray={`${l2} ${c}`}
                    strokeDashoffset={0}
                    filter="url(#shadow)"
                  />
                </>
              );
            })()}
          </svg>
          <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            {(() => {
              const nonRenewed = expiringCount + expiredCount;
              const total = nonRenewed > 0 ? nonRenewed / 0.7 : 100;
              const expiringPct = Math.round((expiringCount / total) * 100);
              return (
                <>
                  <span className="text-4xl font-black text-slate-800 tracking-tight leading-none mb-1">{expiringPct}%</span>
                  <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">Expiring</span>
                </>
              );
            })()}
          </div>
        </div>
      </div>
      
    </div>
  );
}
