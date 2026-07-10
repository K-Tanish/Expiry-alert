import { useState, useEffect, useMemo } from 'react';
import { RecordStatus, RecordCategory, RecordItem, TeamMember, ExpiryTimelineEvent } from './types';
import { generateAllRecords, SEED_TEAM, INITIAL_TIMELINE_EVENTS, CURRENT_DATE_STR } from './data/seedData';

import { ChevronDown } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Import Modular Components
import Topbar from './components/Topbar';
import RightSidebar from './components/RightSidebar';
import KPISection from './components/KPISection';
import NeedsAttention from './components/NeedsAttention';
import RecordModal from './components/RecordModal';
import RenewModal from './components/RenewModal';
import AlertSimulatorModal from './components/AlertSimulatorModal';

// Import View Panels
import RecordsView from './components/RecordsView';
import CategoriesView from './components/CategoriesView';
import CalendarView from './components/CalendarView';
import AnalyticsView from './components/AnalyticsView';
import TeamView from './components/TeamView';
import SettingsView from './components/SettingsView';
import HelpView from './components/HelpView';

const EXPIRING_SOON_THRESHOLD_DAYS = 30;

// Helper to determine status based on target date
export function calculateRecordStatus(expiryDateStr: string): RecordStatus {
  const today = new Date(CURRENT_DATE_STR);
  const expiry = new Date(expiryDateStr);
  
  if (expiry < today) {
    return RecordStatus.Expired;
  }
  
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= EXPIRING_SOON_THRESHOLD_DAYS) {
    return RecordStatus.ExpiringSoon;
  }
  
  return RecordStatus.UpToDate;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Persistence Key States
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<ExpiryTimelineEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtering states
  const [activeKPIFilter, setActiveKPIFilter] = useState<RecordStatus | null>(null);

  // Selected state for category filter route
  const [categoryRouteFilter, setCategoryRouteFilter] = useState<RecordCategory | null>(null);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('view');

  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [recordToRenew, setRecordToRenew] = useState<RecordItem | null>(null);

  const [isAlertSimulatorOpen, setIsAlertSimulatorOpen] = useState(false);

  // Load from local storage or fallback to seed
  useEffect(() => {
    const cachedRecords = localStorage.getItem('expirix_db_v3');
    const cachedTeam = localStorage.getItem('expirix_team');
    const cachedEvents = localStorage.getItem('expirix_timeline');

    if (cachedRecords) {
      setRecords(JSON.parse(cachedRecords));
    } else {
      const generated = generateAllRecords();
      setRecords(generated);
      localStorage.setItem('expirix_db_v3', JSON.stringify(generated));
    }

    if (cachedTeam) {
      setTeam(JSON.parse(cachedTeam));
    } else {
      setTeam(SEED_TEAM);
      localStorage.setItem('expirix_team', JSON.stringify(SEED_TEAM));
    }

    if (cachedEvents) {
      setTimelineEvents(JSON.parse(cachedEvents));
    } else {
      setTimelineEvents(INITIAL_TIMELINE_EVENTS);
      localStorage.setItem('expirix_timeline', JSON.stringify(INITIAL_TIMELINE_EVENTS));
    }
  }, []);

  // Save to local storage whenever records change
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem('expirix_db_v3', JSON.stringify(records));
    }
  }, [records]);

  // Sync to local storage
  const syncRecords = (newRecords: RecordItem[]) => {
    setRecords(newRecords);
  };

  const syncTeam = (newTeam: TeamMember[]) => {
    setTeam(newTeam);
    localStorage.setItem('expirix_team', JSON.stringify(newTeam));
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = records.length;
    const expired = records.filter(r => r.status === RecordStatus.Expired).length;
    const soon = records.filter(r => r.status === RecordStatus.ExpiringSoon).length;
    const active = records.filter(r => r.status === RecordStatus.UpToDate).length;
    return { total, expired, soon, active };
  }, [records]);

  // List of urgent items for Header Notification Hub
  const expiringRecords = useMemo(() => {
    return records.filter(r => r.status === RecordStatus.Expired || r.status === RecordStatus.ExpiringSoon);
  }, [records]);

  // Handle viewing / inspecting specific record
  const handleViewRecord = (record: RecordItem) => {
    setSelectedRecord(record);
    setModalMode('view');
    setIsModalOpen(true);
  };

  // Find record by exact title (from Timeline clicks)
  const handleViewRecordByName = (name: string) => {
    const found = records.find(r => r.name.toLowerCase() === name.toLowerCase());
    if (found) {
      handleViewRecord(found);
    } else {
      // Gracefully auto-generate a matching record on the fly from the timeline definition
      const matchingEvent = timelineEvents.find(e => e.recordName?.toLowerCase() === name.toLowerCase());
      const targetDate = matchingEvent?.date || CURRENT_DATE_STR;
      const status = matchingEvent ? matchingEvent.status : calculateRecordStatus(targetDate);
      
      const newRec: RecordItem = {
        id: `rec-timeline-${Date.now()}`,
        name: name,
        category: RecordCategory.Compliance,
        expiryDate: targetDate,
        status: status,
        owner: 'Rahul Sharma',
        description: `Auto-cataloged from Expiry Timeline tracking for "${name}".`,
        cost: 2500,
        alertDays: 30,
        documentNumber: `TL-${Math.floor(1000 + Math.random() * 9000)}`,
        reminderSent: false,
        notes: 'Synchronized with live interactive compliance timeline visual board.'
      };

      const updated = [newRec, ...records];
      syncRecords(updated);
      setSelectedRecord(newRec);
      setModalMode('view');
      setIsModalOpen(true);
    }
  };

  // Create or edit save actions
  const handleSaveRecord = (partialData: Partial<RecordItem>) => {
    let updatedRecords: RecordItem[] = [];
    
    if (partialData.id) {
      // Edit record
      updatedRecords = records.map((r) => {
        if (r.id === partialData.id) {
          const merged = { ...r, ...partialData } as RecordItem;
          merged.status = calculateRecordStatus(merged.expiryDate);
          return merged;
        }
        return r;
      });
      alert(`Document "${partialData.name}" has been updated securely.`);
    } else {
      // Add record
      const newRec: RecordItem = {
        id: `rec-${Date.now()}`,
        name: partialData.name || 'Untitled Document',
        category: partialData.category || RecordCategory.Licenses,
        expiryDate: partialData.expiryDate || CURRENT_DATE_STR,
        status: calculateRecordStatus(partialData.expiryDate || CURRENT_DATE_STR),
        owner: partialData.owner || 'Rahul Sharma',
        description: partialData.description || '',
        cost: Number(partialData.cost) || 0,
        alertDays: Number(partialData.alertDays) || 30,
        documentNumber: partialData.documentNumber || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        reminderSent: false,
        notes: partialData.notes || '',
      };
      updatedRecords = [newRec, ...records];
      alert(`Document "${newRec.name}" is now cataloged in Expirix.`);
    }

    syncRecords(updatedRecords);
  };

  // Renew Record action
  const handleOpenRenew = (record: RecordItem) => {
    setRecordToRenew(record);
    setIsRenewModalOpen(true);
  };

  const handleRenewRecord = (id: string, newExpiryDate: string) => {
    const updated = records.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          expiryDate: newExpiryDate,
          status: calculateRecordStatus(newExpiryDate),
          reminderSent: false
        };
      }
      return rec;
    });
    syncRecords(updated);
    alert('Document renewed successfully.');
    setIsRenewModalOpen(false);
  };

  // Delete Record action
  const handleDeleteRecord = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    syncRecords(updated);
    alert("Record deleted from active database registry.");
  };

  // Invite Team Collaborator Action
  const handleAddTeamMember = (newMember: Omit<TeamMember, 'id' | 'recordsOwned'>) => {
    const member: TeamMember = {
      ...newMember,
      id: `team-${Date.now()}`,
      recordsOwned: 0
    };
    const updated = [...team, member];
    syncTeam(updated);
    alert(`Teammate invite sent to ${newMember.email} successfully.`);
  };

  // Toggle Team Collaborator status (Active/Inactive)
  const handleToggleTeamStatus = (id: string) => {
    const updated = team.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'Active' ? 'Inactive' as const : 'Active' as const };
      }
      return t;
    });
    syncTeam(updated);
  };

  // Import mock CSV data handler
  const handleImportData = () => {
    const count = 15;
    const additionalRecords: RecordItem[] = [];
    
    const names = [
      'Chemical Logistics Permit',
      'HVAC Pressure Certificate',
      'Groundwater Consent Document',
      'Office Lease - Phase 2',
      'General Liability cover policy',
      'GDPR compliance compliance record',
      'Annual Tax Audit Cert',
      'Server Security License'
    ];

    const categories = [RecordCategory.Licenses, RecordCategory.Compliance, RecordCategory.Insurance, RecordCategory.Contracts, RecordCategory.Inspections];

    for (let i = 0; i < count; i++) {
      const name = `${names[i % names.length]} #${Math.floor(Math.random()*100 + 1)}`;
      const cat = categories[i % categories.length];
      // scatter dates
      const daysOffset = Math.floor(Math.random() * 200 - 10); // some past, some future
      const d = new Date(CURRENT_DATE_STR);
      d.setDate(d.getDate() + daysOffset);
      const expiryStr = d.toISOString().split('T')[0];

      additionalRecords.push({
        id: `import-${Date.now()}-${i}`,
        name,
        category: cat,
        expiryDate: expiryStr,
        status: calculateRecordStatus(expiryStr),
        owner: team[i % team.length]?.name || 'Rahul Sharma',
        description: 'Imported via corporate bulk CSV importer utility.',
        cost: Math.floor(Math.random() * 12000 + 500),
        alertDays: 30,
        documentNumber: `IMP-${Math.floor(100000 + Math.random() * 900000)}`,
        reminderSent: false,
      });
    }

    const merged = [...additionalRecords, ...records];
    syncRecords(merged);
    alert(`Bulk Importer: Successfully ingested and synchronized ${count} document records.`);
  };

  // Reset to original specification counts (Total: 326)
  const handleResetSimulationDB = () => {
    if (confirm("Reset Expirix back to the exact specification mockup? This re-seeds 326 records (11 expired, 28 expiring, 287 active).")) {
      const generated = generateAllRecords();
      syncRecords(generated);
      syncTeam(SEED_TEAM);
      setTimelineEvents(INITIAL_TIMELINE_EVENTS);
      localStorage.setItem('expirix_timeline', JSON.stringify(INITIAL_TIMELINE_EVENTS));
      alert("Expirix database reset to 326 records. Mockup conformity restored.");
    }
  };

  // Wipe database
  const handleClearDatabase = () => {
    if (confirm("WARNING: Wipe all documents in Expirix? This creates a completely empty state for diagnostics testing.")) {
      syncRecords([]);
      syncTeam([]);
      setTimelineEvents([]);
      alert("All records cleared successfully.");
    }
  };

  // Open Add Record Modal
  const handleOpenAddRecord = () => {
    setSelectedRecord(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  // Route helper for Category Folder clicks
  const handleCategorySelectRoute = (category: RecordCategory) => {
    setCategoryRouteFilter(category);
    navigate('/records');
  };

  // Needs Attention subset (filtered by selected KPI card if active)
  const filteredNeedsAttentionRecords = useMemo(() => {
    let list = records.filter(r => r.status === RecordStatus.Expired || r.status === RecordStatus.ExpiringSoon || r.status === RecordStatus.UpToDate);
    
    if (activeKPIFilter) {
      list = list.filter(r => r.status === activeKPIFilter);
    } else {
      // By default, show Expired and Expiring Soon at the top
      list = list.filter(r => r.status === RecordStatus.Expired || r.status === RecordStatus.ExpiringSoon);
    }

    return list.slice(0, 6); // show top critical
  }, [records, activeKPIFilter]);

  return (
    <div className="flex flex-col h-screen bg-[#f0f4f4] text-slate-600 font-sans antialiased overflow-hidden">
      
      {/* Top Header Navigation */}
      <Topbar />

      {/* Main Workspace Frame */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Dynamic Inner Workspace Panel */}
        <main className="flex-1 overflow-y-auto p-8 focus:outline-none">
<Routes>
          
          {/* 1. DASHBOARD VIEW */}
          <Route path="/" element={<>
            <div className="space-y-8 max-w-5xl mx-auto">
              
              {/* Top Row Title / Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none mb-6">
                <div>
                  <h2 id="dashboard-title" className="text-3xl font-normal text-slate-800 tracking-tight">Main Dashboard</h2>
                  
                  {/* Mock Tabs */}
                  <div className="flex gap-6 mt-6">
                    <button className="text-teal-700 font-bold border-b-2 border-teal-700 pb-1 text-sm">Compliance</button>
                    <button className="text-slate-500 font-semibold hover:text-slate-800 pb-1 text-sm">Contracts</button>
                    <button className="text-slate-500 font-semibold hover:text-slate-800 pb-1 text-sm">Licenses</button>
                    <button className="text-slate-500 font-semibold hover:text-slate-800 pb-1 text-sm">Insurance</button>
                  </div>
                </div>

              </div>

              {/* KPI metrics row */}
              <KPISection 
                totalCount={stats.total}
                expiringCount={stats.soon}
                expiredCount={stats.expired}
                activeCount={stats.active}
                activeFilter={activeKPIFilter}
                onFilterChange={(status) => {
                  setActiveKPIFilter(status);
                  navigate('/records');
                }}
                onActionRequiredClick={() => {
                  setActiveKPIFilter(RecordStatus.ExpiringSoon);
                  navigate('/records');
                }}
                onSimulatorClick={() => setIsAlertSimulatorOpen(true)}
              />

              {/* Needs Attention List table */}
              <NeedsAttention 
                records={filteredNeedsAttentionRecords}
                onViewRecord={handleViewRecord}
                onViewAll={() => navigate('/records')}
                onRenewRecord={handleOpenRenew}
              />

            </div>
          </>} />

          {/* 2. RECORDS TABLE REGISTRY */}
          <Route path="/records" element={<>
            <div className="max-w-7xl mx-auto">
              <RecordsView 
                records={records}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onViewRecord={handleViewRecord}
                onAddRecord={handleOpenAddRecord}
                onDeleteRecord={handleDeleteRecord}
                onEditRecord={(rec) => {
                  setSelectedRecord(rec);
                  setModalMode('edit');
                  setIsModalOpen(true);
                }}
                initialCategoryFilter={categoryRouteFilter}
                initialStatusFilter={activeKPIFilter}
                onImportRecords={(newRecords) => {
                  setRecords(prev => [...newRecords, ...prev]);
                }}
                onRenewRecord={handleOpenRenew}
              />
            </div>
          </>} />

          {/* 3. CATEGORIES FOLDER BOARD */}
          <Route path="/categories" element={<>
            <div className="max-w-7xl mx-auto">
              <CategoriesView 
                records={records}
                onSelectCategory={handleCategorySelectRoute}
              />
            </div>
          </>} />

          {/* 4. INTERACTIVE DEADLINES CALENDAR */}
          <Route path="/calendar" element={<>
            <div className="max-w-7xl mx-auto">
              <CalendarView 
                records={records}
                onViewRecord={handleViewRecord}
              />
            </div>
          </>} />

          {/* 5. METRICS ANALYTICS PANEL */}
          <Route path="/analytics" element={<>
            <div className="max-w-7xl mx-auto">
              <AnalyticsView records={records} />
            </div>
          </>} />

          {/* 6. TEAM MANAGEMENT TAB REMOVED */}

          {/* 7. SYSTEM SETTINGS PANEL */}
          <Route path="/settings" element={<>
            <div className="max-w-7xl mx-auto">
              <SettingsView 
                onResetData={handleResetSimulationDB}
                onClearData={handleClearDatabase}
                recordsCount={records.length}
              />
            </div>
          </>} />

          {/* 8. KNOWLEDGE HELP GUIDE */}
          <Route path="/help" element={<>
            <div className="max-w-7xl mx-auto">
              <HelpView />
            </div>
          </>} />
        </Routes>
</main>
        
        {/* Right Sidebar Timeline Panel */}
        {location.pathname === '/' && (
          <RightSidebar records={records} />
        )}
      </div>
      {/* Shared Global Record Form & Detail Drawer Modal */}
      <RecordModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
        mode={modalMode}
        onSave={handleSaveRecord}
        onDelete={handleDeleteRecord}
        onRenew={(id) => {
          const rec = records.find(r => r.id === id);
          if (rec) handleOpenRenew(rec);
        }}
      />

      <RenewModal 
        isOpen={isRenewModalOpen}
        onClose={() => setIsRenewModalOpen(false)}
        record={recordToRenew}
        onRenew={handleRenewRecord}
      />

      <AlertSimulatorModal 
        isOpen={isAlertSimulatorOpen}
        onClose={() => setIsAlertSimulatorOpen(false)}
        records={records}
      />

    </div>
  );
}
