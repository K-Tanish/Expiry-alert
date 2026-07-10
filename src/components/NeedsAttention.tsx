import { Edit2, ArrowUpRight } from 'lucide-react';
import { RecordItem, RecordStatus } from '../types';

interface NeedsAttentionProps {
  records: RecordItem[];
  onViewRecord: (record: RecordItem) => void;
  onViewAll: () => void;
  onRenewRecord?: (record: RecordItem) => void;
}

export default function NeedsAttention({ records, onViewRecord, onViewAll, onRenewRecord }: NeedsAttentionProps) {
  
  return (
    <div className="select-none" id="action-required-section">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-xl font-medium text-slate-800">Action Required - Top Priority</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {records.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-slate-500 text-sm font-medium">
            Nothing needs attention right now
          </div>
        ) : (
          records.slice(0, 4).map((record) => (
            <div
              key={record.id}
              onClick={() => onViewRecord(record)}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-800">{record.name}</h4>
                  <p className="text-xs font-medium text-slate-400 mt-1">
                    <span className="font-semibold text-slate-500">Expires:</span> {record.expiryDate}
                  </p>
                </div>
                </div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                    {record.category}
                  </span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                    Action
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onRenewRecord) onRenewRecord(record);
                    }}
                    className="h-8 px-3 rounded-xl border border-teal-200 text-teal-700 flex items-center justify-center hover:bg-teal-50 text-xs font-bold"
                  >
                    Renew
                  </button>
                  <button className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center hover:bg-teal-800">
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
