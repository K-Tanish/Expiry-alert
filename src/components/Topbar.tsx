import { Search, Mail, Bell, ChevronDown } from 'lucide-react';
import { RecordItem } from '../types';

interface TopbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Topbar({ currentView, setCurrentView }: TopbarProps) {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-[#f0f4f4]">
      {/* Left: Logo and Nav */}
      <div className="flex items-center gap-12">
        <div className="flex items-center">
          {/* Logo half-moon */}
          <div className="w-10 h-10 rounded-full flex overflow-hidden mr-3">
            <div className="w-1/2 h-full bg-[#f0f4f4] border-r border-[#0f766e]"></div>
            <div className="w-1/2 h-full bg-[#0f766e]"></div>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`text-sm font-semibold transition-all relative ${
              currentView === 'dashboard' ? 'text-teal-700' : 'text-slate-500 hover:text-teal-700'
            }`}
          >
            Overview
            {currentView === 'dashboard' && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-teal-700 rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setCurrentView('analytics')}
            className={`text-sm font-semibold transition-all relative ${
              currentView === 'analytics' ? 'text-teal-700' : 'text-slate-500 hover:text-teal-700'
            }`}
          >
            Reports
            {currentView === 'analytics' && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-teal-700 rounded-full" />
            )}
          </button>
        </nav>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search Records" 
            className="w-full pl-6 pr-10 py-2.5 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 shadow-sm"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Right: Actions and Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-500">
          <button className="relative hover:text-teal-700 transition-colors">
            <Mail size={20} />
          </button>
          <button className="relative hover:text-teal-700 transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full ring-2 ring-[#f0f4f4]"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800 leading-tight">Thomas Gepsan</p>
            <p className="text-[11px] text-slate-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
