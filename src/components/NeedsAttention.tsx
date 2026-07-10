import { Edit2, ArrowUpRight } from 'lucide-react';
import { RecordItem, RecordStatus } from '../types';

interface NeedsAttentionProps {
  records: RecordItem[];
  onViewRecord: (record: RecordItem) => void;
  onViewAll: () => void;
}

export default function NeedsAttention({ records, onViewRecord, onViewAll }: NeedsAttentionProps) {
  
  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-xl font-medium text-slate-800">Active Records</h3>
        <button
          onClick={onViewAll}
          className="text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors flex items-center gap-1"
        >
          Check All <ArrowUpRight size={16} />
        </button>
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
                  <p className="text-xs font-medium text-slate-400 mt-1">{record.expiryDate}</p>
                </div>
                {/* Mock toggle switch */}
                <div className="w-10 h-5 bg-teal-100 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-teal-500 rounded-full"></div>
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
                  <div className="flex -space-x-2">
                     <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-slate-200">
                       <img src="https://i.pravatar.cc/150?img=12" alt="Avatar" className="w-full h-full object-cover" />
                     </div>
                     <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-slate-200">
                       <img src="https://i.pravatar.cc/150?img=15" alt="Avatar" className="w-full h-full object-cover" />
                     </div>
                     <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-400 text-white text-[9px] font-bold flex items-center justify-center">
                       +3
                     </div>
                  </div>
                  
                  <button className="w-8 h-8 rounded-full border border-teal-200 text-teal-700 flex items-center justify-center ml-2 hover:bg-teal-50">
                    <Edit2 size={12} />
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
