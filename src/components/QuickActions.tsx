import { Plus, Upload, Calendar, Download, ChevronRight, Check } from 'lucide-react';
import { RecordItem } from '../types';

interface QuickActionsProps {
  onAddRecord: () => void;
  onBulkUpload: () => void;
  onShowRenewals: () => void;
  onExportReport: () => void;
  onViewCalendar: () => void;
}

export default function QuickActions({
  onAddRecord,
  onBulkUpload,
  onShowRenewals,
  onExportReport,
  onViewCalendar,
}: QuickActionsProps) {
  return (
    <div id="quick-actions-sidebar" className="w-full lg:w-80 flex flex-col gap-6 select-none">
      {/* Bento-style Quick Actions container */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40">
        <h3 className="text-base font-bold text-slate-800 mb-5">Quick Actions</h3>

        <div className="space-y-4">
          {/* Add Record */}
          <button
            onClick={onAddRecord}
            className="w-full flex items-center gap-4 p-3 hover:bg-orange-50/50 rounded-xl border border-transparent hover:border-orange-100 transition-all duration-150 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-150">
              <Plus size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-orange-900 transition-colors duration-150">Add New Record</p>
              <p className="text-[11px] text-slate-400">Create a new record</p>
            </div>
          </button>

          {/* Bulk Upload */}
          <button
            onClick={onBulkUpload}
            className="w-full flex items-center gap-4 p-3 hover:bg-indigo-50/50 rounded-xl border border-transparent hover:border-indigo-100 transition-all duration-150 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-150">
              <Upload size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-900 transition-colors duration-150">Bulk Upload</p>
              <p className="text-[11px] text-slate-400">Upload multiple records</p>
            </div>
          </button>

          {/* Upcoming Renewals */}
          <button
            onClick={onShowRenewals}
            className="w-full flex items-center gap-4 p-3 hover:bg-amber-50/50 rounded-xl border border-transparent hover:border-amber-100 transition-all duration-150 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-150">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-amber-900 transition-colors duration-150">Upcoming Renewals</p>
              <p className="text-[11px] text-slate-400">View upcoming expiries</p>
            </div>
          </button>

          {/* Export Report */}
          <button
            onClick={onExportReport}
            className="w-full flex items-center gap-4 p-3 hover:bg-purple-50/50 rounded-xl border border-transparent hover:border-purple-100 transition-all duration-150 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-150">
              <Download size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-purple-900 transition-colors duration-150">Export Report</p>
              <p className="text-[11px] text-slate-400">Download summary</p>
            </div>
          </button>
        </div>
      </div>

      {/* View Calendar Strip */}
      <button
        onClick={onViewCalendar}
        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/40 hover:-translate-y-0.5 hover:border-orange-200 transition-all duration-200 cursor-pointer flex items-center justify-between w-full group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors duration-150">
            <Calendar size={18} />
          </div>
          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors duration-150">
            View Calendar
          </span>
        </div>
        <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all duration-150" />
      </button>
    </div>
  );
}
