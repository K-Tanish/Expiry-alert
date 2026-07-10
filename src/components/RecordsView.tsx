import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Download, Plus, AlertCircle, Trash2, Edit2, Eye } from 'lucide-react';
import { RecordItem, RecordCategory, RecordStatus } from '../types';

interface RecordsViewProps {
  records: RecordItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onViewRecord: (record: RecordItem) => void;
  onAddRecord: () => void;
  onDeleteRecord: (id: string) => void;
  onEditRecord: (record: RecordItem) => void;
  initialCategoryFilter?: RecordCategory | null;
  initialStatusFilter?: RecordStatus | null;
}

type SortField = 'name' | 'expiryDate' | 'cost';
type SortOrder = 'asc' | 'desc';

export default function RecordsView({
  records,
  searchTerm,
  setSearchTerm,
  onViewRecord,
  onAddRecord,
  onDeleteRecord,
  onEditRecord,
  initialCategoryFilter = null,
  initialStatusFilter = null,
}: RecordsViewProps) {
  // Filters State
  const [statusFilter, setStatusFilter] = useState<RecordStatus | null>(initialStatusFilter);
  const [categoryFilter, setCategoryFilter] = useState<RecordCategory | null>(initialCategoryFilter);

  // Sync with props when redirected from Dashboard or Categories folder board
  useEffect(() => {
    setStatusFilter(initialStatusFilter);
  }, [initialStatusFilter]);

  useEffect(() => {
    setCategoryFilter(initialCategoryFilter);
  }, [initialCategoryFilter]);

  // Sorting State
  const [sortField, setSortField] = useState<SortField>('expiryDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Processed and filtered records
  const filteredAndSortedRecords = useMemo(() => {
    let result = [...records];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.documentNumber && r.documentNumber.toLowerCase().includes(q)) ||
          r.owner.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter) {
      result = result.filter((r) => r.status === statusFilter);
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter((r) => r.category === categoryFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' 
          ? valA - valB 
          : valB - valA;
      }
      return 0;
    });

    return result;
  }, [records, searchTerm, statusFilter, categoryFilter, sortField, sortOrder]);

  // Paginated chunk
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedRecords.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedRecords, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedRecords.length / itemsPerPage) || 1;

  // Status Badge Helper
  const getStatusStyle = (status: RecordStatus) => {
    switch (status) {
      case RecordStatus.Expired:
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case RecordStatus.ExpiringSoon:
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-orange-50 text-orange-700 border-emerald-100';
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setStatusFilter(null);
    setCategoryFilter(null);
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Record Registry</h2>
          <p className="text-sm text-slate-500 mt-1">Audit, edit, filter, and track all compliance documents and leases.</p>
        </div>

        <div className="flex items-center gap-3 self-start">
          <button
            onClick={() => {
              // Trigger CSV compiled download
              const headers = 'ID,Name,Category,Expiry Date,Status,Owner,Cost,Notes\n';
              const rows = records.map(r => `"${r.documentNumber||''}","${r.name}","${r.category}","${r.expiryDate}","${r.status}","${r.owner}",${r.cost},"${r.notes||''}"`).join('\n');
              const blob = new Blob([headers + rows], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'Expirix_Record_Registry_Backup.csv';
              a.click();
            }}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all bg-white"
          >
            <Download size={14} />
            Export CSV
          </button>
          
          <button
            onClick={onAddRecord}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Plus size={14} />
            Add Record
          </button>
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setStatusFilter(null); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                statusFilter === null 
                  ? 'bg-emerald-800 border-emerald-800 text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              All States
            </button>
            <button
              onClick={() => { setStatusFilter(RecordStatus.Expired); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                statusFilter === RecordStatus.Expired 
                  ? 'bg-rose-600 border-rose-600 text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-rose-600'
              }`}
            >
              Expired
            </button>
            <button
              onClick={() => { setStatusFilter(RecordStatus.ExpiringSoon); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                statusFilter === RecordStatus.ExpiringSoon 
                  ? 'bg-amber-500 border-amber-500 text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-amber-600'
              }`}
            >
              Expiring Soon
            </button>
            <button
              onClick={() => { setStatusFilter(RecordStatus.UpToDate); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                statusFilter === RecordStatus.UpToDate 
                  ? 'bg-emerald-600 border-emerald-600 text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-emerald-600'
              }`}
            >
              Active
            </button>
          </div>

          {/* Category Dropdown Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category:</span>
            <select
              value={categoryFilter || ''}
              onChange={(e) => {
                setCategoryFilter(e.target.value ? e.target.value as RecordCategory : null);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
            >
              <option value="">All Categories</option>
              {Object.values(RecordCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear filters badge if active */}
        {(statusFilter || categoryFilter || searchTerm) && (
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500 font-semibold">
              Found <strong className="text-slate-800">{filteredAndSortedRecords.length}</strong> matching records
            </span>
            <button
              onClick={resetFilters}
              className="text-rose-600 font-bold hover:underline"
            >
              Clear Active Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="p-4 pl-6 cursor-pointer hover:text-slate-700 transition-colors" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1.5">
                    Record Details
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-4">Category</th>
                <th className="p-4 cursor-pointer hover:text-slate-700 transition-colors" onClick={() => handleSort('expiryDate')}>
                  <div className="flex items-center gap-1.5">
                    Expiry Date
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-4">Owner</th>
                <th className="p-4 cursor-pointer hover:text-slate-700 transition-colors" onClick={() => handleSort('cost')}>
                  <div className="flex items-center gap-1.5">
                    Annual Cost
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-4">Compliance Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <AlertCircle size={32} className="mx-auto mb-2 text-slate-300" />
                    No records matched your search parameters.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Record Name / Doc ID */}
                    <td className="p-4 pl-6 max-w-[200px]">
                      <p className="font-bold text-slate-800 truncate" title={rec.name}>{rec.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{rec.documentNumber || 'No Doc ID'}</p>
                    </td>

                    {/* Category Capsule */}
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.category === RecordCategory.Licenses ? 'bg-orange-50 text-orange-700' :
                        rec.category === RecordCategory.Contracts ? 'bg-indigo-50 text-indigo-700' :
                        rec.category === RecordCategory.Insurance ? 'bg-sky-50 text-sky-700' :
                        rec.category === RecordCategory.Compliance ? 'bg-purple-50 text-purple-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {rec.category}
                      </span>
                    </td>

                    {/* Expiry Date */}
                    <td className="p-4 text-slate-600 font-medium">
                      {rec.expiryDate}
                    </td>

                    {/* Owner Name */}
                    <td className="p-4 text-slate-500 font-medium">
                      {rec.owner}
                    </td>

                    {/* Cost */}
                    <td className="p-4 text-slate-700">
                      ₹{rec.cost.toLocaleString('en-IN')}
                    </td>

                    {/* Compliance Status badge */}
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-full ${getStatusStyle(rec.status)}`}>
                        {rec.status}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewRecord(rec)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
                          title="Inspect Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => onEditRecord(rec)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
                          title="Edit Document"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${rec.name}"?`)) {
                              onDeleteRecord(rec.id);
                            }
                          }}
                          className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginated Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/20">
          <span className="text-[11px] text-slate-400 font-semibold">
            Showing <strong className="text-slate-600">{filteredAndSortedRecords.length ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{' '}
            <strong className="text-slate-600">
              {Math.min(currentPage * itemsPerPage, filteredAndSortedRecords.length)}
            </strong>{' '}
            of <strong className="text-slate-600">{filteredAndSortedRecords.length}</strong> records
          </span>

          {/* Page controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === 1
                  ? 'border-slate-100 text-slate-300 bg-slate-50/30 cursor-not-allowed'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'
              }`}
            >
              <ChevronLeft size={14} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                    currentPage === page
                      ? 'bg-emerald-800 border-emerald-800 text-white'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all ${
                currentPage === totalPages
                  ? 'border-slate-100 text-slate-300 bg-slate-50/30 cursor-not-allowed'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
