import { useState, FormEvent } from 'react';
import { UserPlus, Shield, Mail, CheckCircle2, XCircle, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { TeamMember } from '../types';

interface TeamViewProps {
  team: TeamMember[];
  onAddMember: (member: Omit<TeamMember, 'id' | 'recordsOwned'>) => void;
  onToggleStatus: (id: string) => void;
}

export default function TeamView({ team, onAddMember, onToggleStatus }: TeamViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Invite states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Compliance Specialist');

  const filteredTeam = team.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return alert("Please fill in all fields");
    
    onAddMember({
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', // default avatar
      status: 'Active'
    });

    // Reset
    setName('');
    setEmail('');
    setRole('Compliance Specialist');
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Team Collaborators</h2>
          <p className="text-sm text-slate-500 mt-1">Assign records, manage notification ownerships, and allocate compliance review pipelines.</p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all self-start"
        >
          <UserPlus size={16} />
          Invite Teammate
        </button>
      </div>

      {/* Search and Filters bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search team members..."
          className="w-full pl-10 pr-4 py-2 bg-white text-slate-700 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
        />
      </div>

      {/* Roster Grid */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/40 overflow-hidden divide-y divide-slate-100">
        {filteredTeam.map((member) => (
          <div key={member.id} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left Info */}
            <div className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-slate-100 ring-4 ring-slate-50"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800">{member.name}</h3>
                  {member.role.toLowerCase().includes('director') && (
                    <span className="text-[9px] font-bold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Shield size={9} /> Owner
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{member.role}</p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Mail size={12} />
                  {member.email}
                </p>
              </div>
            </div>

            {/* Right details */}
            <div className="flex items-center gap-8 self-end sm:self-center">
              {/* Ownership metric */}
              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-slate-700">{member.recordsOwned}</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Documents Owned</p>
              </div>

              {/* Status control */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleStatus(member.id)}
                  className="flex items-center gap-1.5"
                >
                  {member.status === 'Active' ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 size={16} />
                      <span className="text-xs font-semibold">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-slate-400">
                      <XCircle size={16} />
                      <span className="text-xs font-semibold">Inactive</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800">Invite New Collaborator</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XCircle size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 text-sm text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john.doe@acme.com"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 text-sm text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Corporate Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 text-sm text-slate-700 bg-white"
                >
                  <option value="Compliance Specialist">Compliance Specialist</option>
                  <option value="Legal Associate">Legal Associate</option>
                  <option value="Facility Safety Inspector">Facility Safety Inspector</option>
                  <option value="Executive Officer">Executive Officer</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50 mt-5">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm shadow-emerald-100 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Send Invitation Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
