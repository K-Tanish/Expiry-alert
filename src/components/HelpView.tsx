import { HelpCircle, BookOpen, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function HelpView() {
  const faqs = [
    {
      q: "How does the Expirix predictive alert work?",
      a: "Expirix parses your document's expiry date and triggers reminders according to your standard warning thresholds (e.g., 30 days before). If a document is not renewed, its state shifts to 'Expired' on the exact target date and flags high risk in your operational reports."
    },
    {
      q: "Can I assign multi-user ownerships?",
      a: "Yes. In the Team tab, you can register and activate collaborators. When creating or editing a record, choose a team member from the Owner list. They will receive automated notifications on their dashboard."
    },
    {
      q: "How do I renew an expired record?",
      a: "Simply click on any expired record in your 'Needs Attention' or 'Records' dashboard to open the Record Intelligence Details panel, then click the 'Mark as Renewed' button. This automatically increases the expiry date by one year and restores its active compliance status."
    },
    {
      q: "Is data synchronized in real-time?",
      a: "Expirix uses persistent browser-side storage. Any record added, edited, or marked as renewed updates the operational counters and charts instantly across all tabs."
    }
  ];

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Help & Knowledge Base</h2>
        <p className="text-sm text-slate-500 mt-1">Access user guides, compliance documentation, and technical support FAQs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* FAQs */}
        <div className="md:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40 space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-orange-700" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-4 divide-y divide-slate-50">
            {faqs.map((faq, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                <h4 className="text-xs font-bold text-slate-700">{faq.q}</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/40">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-indigo-700" />
              Pro Tips
            </h3>

            <ul className="space-y-3 text-xs text-slate-500 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Clicking on the KPI cards on the main dashboard instantly filters your record view!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>You can download a full backup spreadsheet of all records by exporting reports in the Settings panel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Use the search bar with <strong>⌘ K</strong> to quickly filter rows on any active list.</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50/50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-3">
            <MessageSquare size={18} className="text-orange-700 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-emerald-900">Need direct engineering assistance?</h4>
              <p className="text-[11px] text-orange-700/80 mt-1 leading-normal">Our corporate support agents are online. Submit a trouble ticket to support@expirix.com.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
