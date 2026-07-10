import { useState } from 'react';
import { BarChart, PieChart, TrendingUp, IndianRupee, DollarSign, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { RecordItem, RecordCategory, RecordStatus } from '../types';

interface AnalyticsViewProps {
  records: RecordItem[];
}

export default function AnalyticsView({ records }: AnalyticsViewProps) {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Math metrics
  const filteredRecords = filterCategory === 'All' 
    ? records 
    : records.filter(r => r.category === filterCategory);

  const totalCost = filteredRecords.reduce((sum, r) => sum + r.cost, 0);
  const averageCost = filteredRecords.length ? Math.round(totalCost / filteredRecords.length) : 0;
  
  const expiredCount = filteredRecords.filter(r => r.status === RecordStatus.Expired).length;
  const soonCount = filteredRecords.filter(r => r.status === RecordStatus.ExpiringSoon).length;
  const activeCount = filteredRecords.filter(r => r.status === RecordStatus.UpToDate).length;

  // Group costs by category
  const categoryStats = Object.values(RecordCategory).map((cat) => {
    const catRecs = records.filter(r => r.category === cat);
    const cost = catRecs.reduce((sum, r) => sum + r.cost, 0);
    const count = catRecs.length;
    return { name: cat, cost, count };
  });

  // Timeline stats: Expiries over next 6 months (simulated from our generated lists)
  // July 2026 to Dec 2026
  const monthlyCounts = [
    { month: 'Jul', count: records.filter(r => r.expiryDate >= '2026-07-01' && r.expiryDate <= '2026-07-31').length, cost: records.filter(r => r.expiryDate >= '2026-07-01' && r.expiryDate <= '2026-07-31').reduce((s, r) => s + r.cost, 0) },
    { month: 'Aug', count: records.filter(r => r.expiryDate >= '2026-08-01' && r.expiryDate <= '2026-08-31').length, cost: records.filter(r => r.expiryDate >= '2026-08-01' && r.expiryDate <= '2026-08-31').reduce((s, r) => s + r.cost, 0) },
    { month: 'Sep', count: records.filter(r => r.expiryDate >= '2026-09-01' && r.expiryDate <= '2026-09-31').length, cost: records.filter(r => r.expiryDate >= '2026-09-01' && r.expiryDate <= '2026-09-31').reduce((s, r) => s + r.cost, 0) },
    { month: 'Oct', count: records.filter(r => r.expiryDate >= '2026-10-01' && r.expiryDate <= '2026-10-31').length, cost: records.filter(r => r.expiryDate >= '2026-10-01' && r.expiryDate <= '2026-10-31').reduce((s, r) => s + r.cost, 0) },
    { month: 'Nov', count: records.filter(r => r.expiryDate >= '2026-11-01' && r.expiryDate <= '2026-11-31').length, cost: records.filter(r => r.expiryDate >= '2026-11-01' && r.expiryDate <= '2026-11-31').reduce((s, r) => s + r.cost, 0) },
    { month: 'Dec', count: records.filter(r => r.expiryDate >= '2026-12-01' && r.expiryDate <= '2026-12-31').length, cost: records.filter(r => r.expiryDate >= '2026-12-01' && r.expiryDate <= '2026-12-31').reduce((s, r) => s + r.cost, 0) },
  ];

  const maxMonthCount = Math.max(...monthlyCounts.map(m => m.count), 1);
  const maxCategoryCost = Math.max(...categoryStats.map(c => c.cost), 1);

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Record Intelligence Analytics</h2>
          <p className="text-sm text-slate-500 mt-1">Audit operational overhead, compliance costs, and expiring deadlines across the firm.</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scope:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
          >
            <option value="All">All Categories</option>
            {Object.values(RecordCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/40 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0">
            <IndianRupee size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Valuation</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">₹{totalCost.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/40 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Contract Cost</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">₹{averageCost.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/40 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Calendar size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Records Rate</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">
              {filteredRecords.length ? Math.round((activeCount / filteredRecords.length) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline Chart */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-6">
            <BarChart size={18} className="text-orange-700" />
            2026 Monthly Expiry Pipeline
          </h3>

          <div className="h-64 flex items-end justify-between gap-4 pt-4 px-2">
            {monthlyCounts.map((monthData) => {
              const heightPercent = (monthData.count / maxMonthCount) * 80; // keep max at 80% to fit labels
              return (
                <div key={monthData.month} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group cursor-pointer">
                  {/* Tooltip value */}
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-150 transform translate-y-1 group-hover:translate-y-0">
                    {monthData.count} recs
                  </span>
                  
                  {/* Bar */}
                  <div 
                    style={{ height: `${heightPercent || 5}%` }} 
                    className="w-full bg-emerald-600/10 hover:bg-emerald-600 rounded-t-lg transition-all duration-200 relative"
                  >
                    {/* Hover highlights */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100" />
                  </div>

                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                    {monthData.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Share & Cost Distribution */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-6">
            <PieChart size={18} className="text-indigo-700" />
            Category Cost Distribution
          </h3>

          <div className="space-y-4">
            {categoryStats.map((stat) => {
              const percent = Math.round((stat.cost / (totalCost || 1)) * 100);
              const barWidth = (stat.cost / maxCategoryCost) * 100;
              return (
                <div key={stat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span className="text-slate-700 font-bold">{stat.name}</span>
                    <span>₹{stat.cost.toLocaleString('en-IN')} ({percent}%)</span>
                  </div>
                  <div className="h-2.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${barWidth || 5}%` }} 
                      className={`h-full rounded-full transition-all duration-500 ${
                        stat.name === RecordCategory.Licenses ? 'bg-emerald-600' :
                        stat.name === RecordCategory.Contracts ? 'bg-indigo-600' :
                        stat.name === RecordCategory.Insurance ? 'bg-sky-600' :
                        stat.name === RecordCategory.Compliance ? 'bg-purple-600' :
                        'bg-amber-600'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Breakdown Panel */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
          <AlertCircle size={18} className="text-rose-700" />
          Operating Risk Compliance Rate
        </h3>

        <div className="grid grid-cols-3 gap-6 text-center divide-x divide-slate-100 pt-2">
          <div>
            <span className="text-3xl font-black text-rose-600">{expiredCount}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Expired (High Risk)</p>
          </div>
          <div>
            <span className="text-3xl font-black text-amber-500">{soonCount}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Expiring Soon (Moderate)</p>
          </div>
          <div>
            <span className="text-3xl font-black text-emerald-600">{activeCount}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Up to Date (Secure)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
