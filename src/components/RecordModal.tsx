import { useState, useEffect, FormEvent } from 'react';
import { X, Calendar, User, FileText, IndianRupee, DollarSign, Bell, Shield, Info, Edit2, RotateCcw, Trash2, Check } from 'lucide-react';
import { RecordItem, RecordCategory, RecordStatus } from '../types';
import { SEED_TEAM } from '../data/seedData';

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: RecordItem | null; // null means 'add' mode
  mode: 'add' | 'edit' | 'view';
  onSave: (record: Partial<RecordItem>) => void;
  onDelete?: (id: string) => void;
  onRenew?: (id: string) => void;
}

export default function RecordModal({
  isOpen,
  onClose,
  record,
  mode: initialMode,
  onSave,
  onDelete,
  onRenew,
}: RecordModalProps) {
  const [mode, setMode] = useState<'add' | 'edit' | 'view'>(initialMode);
  
  // Form States
  const [name, setName] = useState('');
  const [category, setCategory] = useState<RecordCategory>(RecordCategory.Licenses);
  const [expiryDate, setExpiryDate] = useState('');
  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState<number>(0);
  const [alertDays, setAlertDays] = useState<number>(30);
  const [documentNumber, setDocumentNumber] = useState('');
  const [notes, setNotes] = useState('');

  // Update states when record or mode changes
  useEffect(() => {
    setMode(initialMode);
    if (record) {
      setName(record.name);
      setCategory(record.category);
      setExpiryDate(record.expiryDate);
      setOwner(record.owner);
      setDescription(record.description || '');
      setCost(record.cost || 0);
      setAlertDays(record.alertDays || 30);
      setDocumentNumber(record.documentNumber || '');
      setNotes(record.notes || '');
    } else {
      // Clear for Add mode
      setName('');
      setCategory(RecordCategory.Licenses);
      setExpiryDate('2026-08-01');
      setOwner(SEED_TEAM[0].name);
      setDescription('');
      setCost(0);
      setAlertDays(30);
      setDocumentNumber(`DOC-${Math.floor(100000 + Math.random() * 900000)}`);
      setNotes('');
    }
  }, [record, initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a record name");
    if (!expiryDate) return alert("Please specify an expiry date");

    const savedData: Partial<RecordItem> = {
      name,
      category,
      expiryDate,
      owner,
      description,
      cost: Number(cost),
      alertDays: Number(alertDays),
      documentNumber,
      notes,
    };

    if (record) {
      savedData.id = record.id;
    }

    onSave(savedData);
    onClose();
  };

  const handleRenewClick = () => {
    if (record && onRenew) {
      onRenew(record.id);
      onClose();
    }
  };

  const handleDeleteClick = () => {
    if (record && onDelete) {
      if (confirm(`Are you sure you want to delete "${record.name}"? This action cannot be undone.`)) {
        onDelete(record.id);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-800">
            {mode === 'add' && 'Create Record'}
            {mode === 'edit' && 'Edit Record'}
            {mode === 'view' && 'Record Intelligence Details'}
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* View Mode */}
        {mode === 'view' && record && (
          <div className="p-6 space-y-6">
            {/* Title & Status */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  record.category === RecordCategory.Licenses ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' :
                  record.category === RecordCategory.Contracts ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' :
                  record.category === RecordCategory.Insurance ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200' :
                  record.category === RecordCategory.Compliance ? 'bg-purple-50 text-purple-700 ring-1 ring-purple-200' :
                  'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                }`}>
                  {record.category}
                </span>
                <h4 className="text-xl font-bold text-slate-800 mt-2 tracking-tight">{record.name}</h4>
                <p className="text-xs text-slate-400 mt-1">ID: {record.documentNumber || 'N/A'}</p>
              </div>

              {/* Status Badge */}
              <div>
                {record.status === RecordStatus.Expired ? (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 inline-block">
                    Expired
                  </span>
                ) : record.status === RecordStatus.ExpiringSoon ? (
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 inline-block">
                    Expiring Soon
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 inline-block">
                    Up to Date
                  </span>
                )}
              </div>
            </div>

            {/* Core Stats Block */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Expiry Date</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={14} className="text-slate-400" />
                  <span className="text-sm font-semibold text-slate-700">{record.expiryDate}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Estimated Cost</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <IndianRupee size={14} className="text-slate-400" />
                  <span className="text-sm font-semibold text-slate-700">₹{record.cost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</p>
              <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-100 p-3 rounded-lg">
                {record.description || 'No description provided.'}
              </p>
            </div>

            {/* Metadata Rows */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs pt-2">
              <div className="flex items-center gap-2.5">
                <User size={15} className="text-slate-400" />
                <div>
                  <p className="text-[9px] font-medium text-slate-400 uppercase">Owner</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{record.owner}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Bell size={15} className="text-slate-400" />
                <div>
                  <p className="text-[9px] font-medium text-slate-400 uppercase">Alert Boundary</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{record.alertDays} Days Prior</p>
                </div>
              </div>
            </div>

            {/* Notes Section if any */}
            {record.notes && (
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Operational Notes</p>
                <p className="text-xs italic text-slate-500 bg-slate-50/50 p-2.5 border-l-2 border-emerald-500 rounded-r-lg">
                  "{record.notes}"
                </p>
              </div>
            )}

            {/* Danger Zone/Audit history mock */}
            <div className="flex items-center gap-2 border-t border-slate-50 pt-4 text-[10px] font-semibold text-slate-400">
              <Shield size={12} className="text-emerald-600" />
              <span>Cryptographically secured audit trial available.</span>
            </div>

            {/* View Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-5 gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode('edit')}
                  className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-xs font-bold rounded-lg transition-all"
                >
                  <Edit2 size={13} />
                  Edit
                </button>
                {onDelete && (
                  <button
                    onClick={handleDeleteClick}
                    className="flex items-center gap-1.5 px-3 py-2 border border-rose-100 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-lg transition-all"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                )}
              </div>

              {onRenew && (record.status === RecordStatus.Expired || record.status === RecordStatus.ExpiringSoon) && (
                <button
                  onClick={handleRenewClick}
                  className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm shadow-slate-200 transition-all cursor-pointer"
                >
                  <RotateCcw size={13} className="animate-spin-slow" />
                  Mark as Renewed
                </button>
              )}
            </div>
          </div>
        )}

        {/* Edit/Add Forms */}
        {(mode === 'add' || mode === 'edit') && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Record Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Record Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Factory License - Unit 3"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 transition-all"
              />
            </div>

            {/* Category & Document Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as RecordCategory)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 bg-white transition-all"
                >
                  {Object.values(RecordCategory).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Document ID
                </label>
                <input
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  placeholder="LIC-99823"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 transition-all"
                />
              </div>
            </div>

            {/* Expiry Date & Owner */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Owner
                </label>
                <select
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 bg-white transition-all"
                >
                  {SEED_TEAM.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cost & Alert Threshold */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Annual Cost (₹)
                </label>
                <input
                  type="number"
                  value={cost || ''}
                  onChange={(e) => setCost(Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Alert Boundary
                </label>
                <select
                  value={alertDays}
                  onChange={(e) => setAlertDays(Number(e.target.value))}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 bg-white transition-all"
                >
                  <option value={15}>15 Days Prior</option>
                  <option value={30}>30 Days Prior</option>
                  <option value={45}>45 Days Prior</option>
                  <option value={60}>60 Days Prior</option>
                  <option value={90}>90 Days Prior</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly summarize what this record covers..."
                rows={2}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 transition-all resize-none"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Internal Renewal Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Waiting on physical inspection reports."
                rows={2}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm text-slate-700 transition-all resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end border-t border-slate-100 pt-5 gap-3">
              <button
                type="button"
                onClick={() => mode === 'edit' ? setMode('view') : onClose()}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm shadow-slate-200 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Check size={14} />
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
