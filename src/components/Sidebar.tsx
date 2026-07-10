import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  recordsCount: number;
}

export default function Sidebar({ currentView, setCurrentView, recordsCount }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'records', label: 'Records', icon: FileText, badge: recordsCount },
    { id: 'categories', label: 'Categories', icon: FolderOpen },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
  ];

  const generalItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <aside 
      id="expirix-sidebar" 
      className={`${
        isCollapsed ? 'w-[76px]' : 'w-64'
      } bg-white border-r border-slate-100 flex flex-col h-full shrink-0 select-none transition-all duration-300`}
    >
      {/* Brand Logo & Collapse Toggle */}
      <div className={`p-4 border-b border-slate-50 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3 h-[73px]`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-orange-250 shrink-0">
            <ShieldCheck size={24} className="stroke-[2.5]" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in duration-300 truncate">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">
                Expirix
              </h1>
              <p className="text-[10px] font-medium text-slate-400 tracking-wider uppercase mt-1">
                Record Intelligence
              </p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
            title="Collapse Sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Main Menu Navigation */}
      <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-4'} py-6 space-y-7`}>
        <div>
          {isCollapsed ? (
            <div className="h-px bg-slate-100 mx-2 mb-4" />
          ) : (
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3 truncate">
              Menu
            </p>
          )}
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center' : 'justify-between'
                    } px-3 py-2.5 rounded-xl transition-all duration-150 text-left group relative ${
                      isActive 
                        ? 'bg-orange-50 text-orange-800 font-semibold' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon 
                        size={18} 
                        className={`transition-colors duration-150 shrink-0 ${
                          isActive ? 'text-orange-700' : 'text-slate-400 group-hover:text-slate-600'
                        }`} 
                      />
                      {!isCollapsed && <span className="text-sm truncate">{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge !== undefined && (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-orange-200 text-orange-900' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isCollapsed && item.badge !== undefined && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* General Options */}
        <div>
          {isCollapsed ? (
            <div className="h-px bg-slate-100 mx-2 mb-4" />
          ) : (
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3 truncate">
              General
            </p>
          )}
          <ul className="space-y-1">
            {generalItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center' : 'justify-start'
                    } px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                      isActive 
                        ? 'bg-orange-50 text-orange-800 font-semibold' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon size={18} className={`shrink-0 ${isActive ? 'text-orange-700' : 'text-slate-400'}`} />
                    {!isCollapsed && <span className="text-sm truncate ml-3">{item.label}</span>}
                  </button>
                </li>
              );
            })}
            
            {/* Simulated Logout Button */}
            <li>
              <button
                onClick={() => {
                  alert("Simulation: Logged out successfully!");
                }}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center' : 'justify-start'
                } px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all duration-150 text-left mt-4`}
                title={isCollapsed ? "Logout" : undefined}
              >
                <LogOut size={18} className="shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium ml-3">Logout</span>}
              </button>
            </li>
          </ul>
        </div>

        {/* Expand Trigger for Collapsed view */}
        {isCollapsed && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-800 border border-slate-100 transition-all duration-150 cursor-pointer"
              title="Expand Sidebar"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Profile Footer */}
      <div className={`p-4 border-t border-slate-50 bg-slate-50/50 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3`}>
        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-black text-xs ring-2 ring-orange-50 shrink-0">
          RS
        </div>
        {!isCollapsed && (
          <div className="min-w-0 animate-in fade-in duration-300">
            <p className="text-xs font-semibold text-slate-800 truncate">Rahul Sharma</p>
            <p className="text-[10px] text-slate-400 truncate">rahul.sharma@acme.com</p>
          </div>
        )}
      </div>
    </aside>
  );
}
