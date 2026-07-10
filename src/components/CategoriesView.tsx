import { Folder, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';
import { RecordItem, RecordCategory, RecordStatus } from '../types';

interface CategoriesViewProps {
  records: RecordItem[];
  onSelectCategory: (category: RecordCategory) => void;
}

export default function CategoriesView({ records, onSelectCategory }: CategoriesViewProps) {
  
  const categoriesList = Object.values(RecordCategory).map((cat) => {
    const catRecords = records.filter(r => r.category === cat);
    const count = catRecords.length;
    const totalCost = catRecords.reduce((sum, r) => sum + r.cost, 0);
    
    // Calculate active rate
    const activeCount = catRecords.filter(r => r.status === RecordStatus.UpToDate).length;
    const activeRate = count ? Math.round((activeCount / count) * 100) : 100;

    let colorClasses = '';
    let iconBg = '';
    
    switch (cat) {
      case RecordCategory.Licenses:
        colorClasses = 'border-orange-100 hover:border-orange-300 shadow-orange-50/20';
        iconBg = 'bg-orange-50 text-orange-700';
        break;
      case RecordCategory.Contracts:
        colorClasses = 'border-indigo-100 hover:border-indigo-300 shadow-indigo-50/20';
        iconBg = 'bg-indigo-50 text-indigo-700';
        break;
      case RecordCategory.Insurance:
        colorClasses = 'border-sky-100 hover:border-sky-300 shadow-sky-50/20';
        iconBg = 'bg-sky-50 text-sky-700';
        break;
      case RecordCategory.Compliance:
        colorClasses = 'border-purple-100 hover:border-purple-300 shadow-purple-50/20';
        iconBg = 'bg-purple-50 text-purple-700';
        break;
      default:
        colorClasses = 'border-amber-100 hover:border-amber-300 shadow-amber-50/20';
        iconBg = 'bg-amber-50 text-amber-700';
    }

    return {
      name: cat,
      count,
      totalCost,
      activeRate,
      colorClasses,
      iconBg
    };
  });

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Record Folders</h2>
        <p className="text-sm text-slate-500 mt-1">Manage compliance partitions and view real-time operations indexes across directory cabinets.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesList.map((cat) => (
          <div
            key={cat.name}
            onClick={() => onSelectCategory(cat.name as RecordCategory)}
            className={`bg-white border rounded-2xl p-6 shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group relative hover:-translate-y-0.5 ${cat.colorClasses}`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${cat.iconBg}`}>
                <Folder size={22} className="stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-orange-700 flex items-center gap-1 transition-colors">
                Open Directory
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            {/* Middle info */}
            <div className="my-6">
              <h3 className="text-lg font-bold text-slate-800">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Database size={12} />
                <span>{cat.count} total records cataloged</span>
              </p>
            </div>

            {/* Progress indicators / metrics */}
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Estimated Budget</span>
                <span className="font-bold text-slate-700">${cat.totalCost.toLocaleString()} /yr</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Compliance Index</span>
                  <span className={cat.activeRate === 100 ? 'text-orange-600' : cat.activeRate < 70 ? 'text-amber-600' : 'text-slate-600'}>
                    {cat.activeRate}% Active
                  </span>
                </div>
                <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    style={{ width: `${cat.activeRate}%` }} 
                    className={`h-full rounded-full ${
                      cat.activeRate === 100 ? 'bg-orange-600' :
                      cat.activeRate < 70 ? 'bg-amber-500' : 'bg-orange-500/80'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Audit Cabinets Summary Box */}
        <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
            <Layers size={22} />
          </div>
          <h4 className="text-sm font-bold text-slate-700">Add Folder Segment</h4>
          <p className="text-xs text-slate-400 mt-1.5 max-w-[200px] leading-relaxed">Need a custom category? You can provision additional secure partitions in the Settings tab.</p>
        </div>
      </div>
    </div>
  );
}
