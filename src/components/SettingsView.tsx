import { useState } from 'react';
import { Settings, Bell, Mail, Smartphone, RefreshCw, Trash2, ShieldCheck, Clock } from 'lucide-react';

interface SettingsViewProps {
  onResetData: () => void;
  onClearData: () => void;
  recordsCount: number;
}

export default function SettingsView({ onResetData, onClearData, recordsCount }: SettingsViewProps) {
  const [warningThreshold, setWarningThreshold] = useState(30);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [autoEscalate, setAutoEscalate] = useState(true);

  const handleSaveSettings = () => {
    alert("Configuration parameters updated in local browser registry successfully!");
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">System Configuration</h2>
        <p className="text-sm text-slate-500 mt-1">Configure automated compliance scanners, review intervals, and administrative controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Settings Panel */}
        <div className="md:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40 space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
            <Bell size={16} className="text-orange-700" />
            Alert Protocols
          </h3>

          {/* Threshold config */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-600">Standard Renewal Buffer</label>
            <p className="text-xs text-slate-400">Specify how many days before a document expires to classify it as 'Expiring Soon' and send alerts.</p>
            <select
              value={warningThreshold}
              onChange={(e) => setWarningThreshold(Number(e.target.value))}
              className="w-full sm:w-64 px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 text-sm text-slate-700 bg-white"
            >
              <option value={15}>15 Days prior to deadline</option>
              <option value={30}>30 Days prior to deadline (Default)</option>
              <option value={45}>45 Days prior to deadline</option>
              <option value={60}>60 Days prior to deadline</option>
              <option value={90}>90 Days prior to deadline</option>
            </select>
          </div>

          <div className="h-px bg-slate-50" />

          {/* Notification Channels */}
          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-600">Notification Delivery Channels</label>
            
            <div className="flex items-start justify-between p-3 hover:bg-slate-50 rounded-xl transition-all">
              <div className="flex gap-3">
                <Mail size={18} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Automated Corporate Email Dispatch</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Send a daily renewal summary report to responsible record owners.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-start justify-between p-3 hover:bg-slate-50 rounded-xl transition-all">
              <div className="flex gap-3">
                <Smartphone size={18} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-700">SMS Direct Delivery Notifications</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Push real-time text alerts to safety officers for emergency and fire certificates.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-start justify-between p-3 hover:bg-slate-50 rounded-xl transition-all">
              <div className="flex gap-3">
                <Settings size={18} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Auto-Escalation Protocols</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Automatically re-route unclaimed expired alerts to directors after 3 days.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoEscalate}
                onChange={(e) => setAutoEscalate(e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Save Configuration
            </button>
          </div>
        </div>

        {/* Diagnostics & Operations Panel */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Clock size={16} className="text-slate-500" />
              Diagnostics
            </h3>

            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-slate-600">Simulated Registry State</p>
                <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Cataloged Count</span>
                  <span className="font-extrabold text-slate-800">{recordsCount} records</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600">Database Administration</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">Reloading the simulation database will restore the exact counts displayed in the specification mockup (326 total records).</p>
                
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={onResetData}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all"
                  >
                    <RefreshCw size={13} />
                    Reset Simulation DB
                  </button>

                  <button
                    onClick={onClearData}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-rose-100 hover:bg-rose-50 text-rose-600 text-xs font-bold rounded-lg transition-all"
                  >
                    <Trash2 size={13} />
                    Wipe Database
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-50 pt-4 mt-6 text-[10px] text-slate-400 flex items-start gap-1.5 leading-normal">
            <ShieldCheck size={12} className="text-orange-700 shrink-0 mt-0.5" />
            <span>Expirix encryption node: 256-bit AES. Active timezone: UTC-7 (Local).</span>
          </div>
        </div>
      </div>
    </div>
  );
}
