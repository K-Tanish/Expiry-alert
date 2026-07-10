import { Search, Mail, Bell, Settings, Users, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Topbar() {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-[#f0f4f4] select-none">
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
          <NavLink 
            to="/"
            end
            className={({ isActive }) => 
              `text-sm font-semibold transition-all relative ${
                isActive ? 'text-teal-700' : 'text-slate-500 hover:text-teal-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                Overview
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-teal-700 rounded-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink 
            to="/records"
            className={({ isActive }) => 
              `text-sm font-semibold transition-all relative ${
                isActive ? 'text-teal-700' : 'text-slate-500 hover:text-teal-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                Registry
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-teal-700 rounded-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink 
            to="/analytics"
            className={({ isActive }) => 
              `text-sm font-semibold transition-all relative ${
                isActive ? 'text-teal-700' : 'text-slate-500 hover:text-teal-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                Reports
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-teal-700 rounded-full" />
                )}
              </>
            )}
          </NavLink>
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
          <NavLink to="/team" className={({ isActive }) => `relative transition-colors ${isActive ? 'text-teal-700' : 'hover:text-teal-700'}`} title="Team">
            <Users size={18} />
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `relative transition-colors ${isActive ? 'text-teal-700' : 'hover:text-teal-700'}`} title="Settings">
            <Settings size={18} />
          </NavLink>
          <NavLink to="/help" className={({ isActive }) => `relative transition-colors ${isActive ? 'text-teal-700' : 'hover:text-teal-700'}`} title="Help">
            <HelpCircle size={18} />
          </NavLink>
          
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          
          <button className="relative hover:text-teal-700 transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full ring-2 ring-[#f0f4f4]"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-2">
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
