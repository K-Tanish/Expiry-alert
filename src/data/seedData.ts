import { RecordItem, RecordCategory, RecordStatus, TeamMember, ExpiryTimelineEvent, ActivityLog } from '../types';

export const CURRENT_DATE_STR = '2026-07-09';

export const SEED_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@acme.com',
    role: 'Compliance Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    status: 'Active',
    recordsOwned: 124,
  },
  {
    id: 'team-2',
    name: 'Priya Patel',
    email: 'priya.patel@acme.com',
    role: 'Legal Counsel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    status: 'Active',
    recordsOwned: 98,
  },
  {
    id: 'team-3',
    name: 'Amit Verma',
    email: 'amit.verma@acme.com',
    role: 'Operations Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    status: 'Active',
    recordsOwned: 62,
  },
  {
    id: 'team-4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@acme.com',
    role: 'Safety Officer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    status: 'Active',
    recordsOwned: 42,
  },
];

// Key records shown in the screenshot or important ones
const DETAILED_RECORDS: RecordItem[] = [
  {
    id: 'rec-1',
    name: 'Factory License - Unit 3',
    category: RecordCategory.Licenses,
    expiryDate: '2025-05-28', // Long expired (matches screenshot date!)
    status: RecordStatus.Expired,
    owner: 'Rahul Sharma',
    description: 'Annual regulatory license for manufacturing operations at Unit 3 industrial facility.',
    cost: 4500,
    alertDays: 30,
    documentNumber: 'LIC-2024-8893',
    reminderSent: true,
    notes: 'Awaiting renewal fee clearance from accounting.',
  },
  {
    id: 'rec-2',
    name: 'Vendor Contract - ABC Pvt. Ltd.',
    category: RecordCategory.Contracts,
    expiryDate: '2026-07-12', // 3 days from July 9, 2026
    status: RecordStatus.ExpiringSoon,
    owner: 'Priya Patel',
    description: 'SLA and raw material supply contract with ABC Services Private Limited.',
    cost: 18500,
    alertDays: 30,
    documentNumber: 'CON-ABC-9921',
    reminderSent: true,
    notes: 'Renegotiation in progress. Draft sent to Legal.',
  },
  {
    id: 'rec-3',
    name: 'Insurance Policy - Plant',
    category: RecordCategory.Insurance,
    expiryDate: '2026-07-16', // 7 days from July 9, 2026
    status: RecordStatus.ExpiringSoon,
    owner: 'Rahul Sharma',
    description: 'Comprehensive industrial property and assets insurance cover for Plant A.',
    cost: 32000,
    alertDays: 45,
    documentNumber: 'INS-PLNT-552',
    reminderSent: true,
    notes: 'Premium quotes being audited across different insurance carriers.',
  },
  {
    id: 'rec-4',
    name: 'Fire Safety Certificate',
    category: RecordCategory.Compliance,
    expiryDate: '2026-07-23', // 14 days from July 9, 2026
    status: RecordStatus.ExpiringSoon,
    owner: 'Sneha Reddy',
    description: 'Fire safety and evacuation equipment certification from municipal authorities.',
    cost: 1200,
    alertDays: 30,
    documentNumber: 'CMP-FIRE-772',
    reminderSent: true,
    notes: 'Physical audit completed on July 5. Certification pending issuance.',
  },
  {
    id: 'rec-5',
    name: 'Machine Inspection - Boiler #7',
    category: RecordCategory.Inspections,
    expiryDate: '2026-07-29', // 20 days from July 9, 2026
    status: RecordStatus.ExpiringSoon,
    owner: 'Amit Verma',
    description: 'Mandatory boiler pressure and safety valve mechanical inspection.',
    cost: 2800,
    alertDays: 30,
    documentNumber: 'INS-BOI-7719',
    reminderSent: false,
    notes: 'Technician scheduled for visit next Tuesday.',
  },
  {
    id: 'rec-6',
    name: 'Waste Clearance Permit',
    category: RecordCategory.Licenses,
    expiryDate: '2026-01-20',
    status: RecordStatus.Expired,
    owner: 'Sneha Reddy',
    description: 'Permit for hazardous and standard waste clearance and disposal.',
    cost: 1500,
    alertDays: 30,
    documentNumber: 'LIC-WST-402',
    reminderSent: true,
    notes: 'Awaiting municipal inspection verification.'
  },
  {
    id: 'rec-7',
    name: 'Logistics SLA',
    category: RecordCategory.Contracts,
    expiryDate: '2026-02-14',
    status: RecordStatus.Expired,
    owner: 'Amit Verma',
    description: 'Service level agreement for corporate outbound logistics and dispatch.',
    cost: 8500,
    alertDays: 30,
    documentNumber: 'CON-LOG-881',
    reminderSent: true,
    notes: 'Contract under renegotiation.'
  },
  {
    id: 'rec-8',
    name: 'Health & Safety Audit',
    category: RecordCategory.Compliance,
    expiryDate: '2026-03-08',
    status: RecordStatus.Expired,
    owner: 'Sneha Reddy',
    description: 'Annual corporate health and safety operational audit compliance certification.',
    cost: 3000,
    alertDays: 30,
    documentNumber: 'CMP-HS-109',
    reminderSent: true,
    notes: 'Audit scheduled for next month.'
  },
  {
    id: 'rec-9',
    name: 'Warehouse Lease',
    category: RecordCategory.Contracts,
    expiryDate: '2026-07-25', // Expiring soon relative to July 9, 2026
    status: RecordStatus.ExpiringSoon,
    owner: 'Priya Patel',
    description: 'Lease agreement for primary distribution warehouse facility.',
    cost: 45000,
    alertDays: 45,
    documentNumber: 'CON-WHS-202',
    reminderSent: true,
    notes: 'Lease extension options are being reviewed.'
  },
  {
    id: 'rec-10',
    name: 'Pest Control Certification',
    category: RecordCategory.Compliance,
    expiryDate: '2026-06-07',
    status: RecordStatus.Expired,
    owner: 'Amit Verma',
    description: 'Quarterly biosecurity and pest control compliance certificate.',
    cost: 800,
    alertDays: 15,
    documentNumber: 'CMP-PST-773',
    reminderSent: true,
    notes: 'Treatment scheduled for next week.'
  },
  {
    id: 'rec-11',
    name: 'Boiler Machinery License',
    category: RecordCategory.Licenses,
    expiryDate: '2026-09-16',
    status: RecordStatus.UpToDate,
    owner: 'Amit Verma',
    description: 'Regulatory license for high-pressure industrial boiler machinery.',
    cost: 1200,
    alertDays: 30,
    documentNumber: 'LIC-BLR-004',
    reminderSent: false,
    notes: 'Fully active compliance status.'
  }
];

// Helper to generate realistic dates
function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// Generate rest of the records to hit exact counts:
// Total: 326
// Expired: 11 (we need 9 more)
// Expiring Soon: 28 (we need 24 more)
// Up to Date: 287 (we need 283 more)
export function generateAllRecords(): RecordItem[] {
  const records = [...DETAILED_RECORDS];
  
  // 1. Generate 9 more Expired records (dates before 2026-07-09)
  const expiredNames = [
    { name: 'Environmental Consent to Operate', cat: RecordCategory.Licenses, cost: 3500 },
    { name: 'Office Rent Agreement - Wing B', cat: RecordCategory.Contracts, cost: 12000 },
    { name: 'Vehicle Insurance - Delivery Van A', cat: RecordCategory.Insurance, cost: 850 },
    { name: 'Elevator Safety Certificate', cat: RecordCategory.Compliance, cost: 600 },
    { name: 'Calibration Report - Scale Room 2', cat: RecordCategory.Inspections, cost: 400 },
    { name: 'Waste Disposal License', cat: RecordCategory.Licenses, cost: 1500 },
    { name: 'Software License - ERP Core', cat: RecordCategory.Contracts, cost: 25000 },
    { name: 'Group Health Insurance Policy', cat: RecordCategory.Insurance, cost: 45000 },
    { name: 'Annual Safety Audit Filing', cat: RecordCategory.Compliance, cost: 2000 }
  ];

  for (let i = 0; i < 9; i++) {
    const item = expiredNames[i];
    const daysAgo = 10 + i * 15; // scattered past dates
    records.push({
      id: `gen-exp-${i}`,
      name: item.name,
      category: item.cat,
      expiryDate: addDays(CURRENT_DATE_STR, -daysAgo),
      status: RecordStatus.Expired,
      owner: SEED_TEAM[i % SEED_TEAM.length].name,
      description: `Historical audit of ${item.name}. Regular renewal required.`,
      cost: item.cost,
      alertDays: 30,
      documentNumber: `${item.cat.substring(0,3).toUpperCase()}-EXP-2026-${100 + i}`,
      reminderSent: true
    });
  }

  // 2. Generate 24 more Expiring Soon records (dates in next 1-30 days)
  const expiringSoonNames = [
    { name: 'Trade License - City Office', cat: RecordCategory.Licenses, cost: 1800, days: 5 },
    { name: 'Consulting Contract - TechCorp', cat: RecordCategory.Contracts, cost: 15000, days: 9 },
    { name: 'Marine Cargo Insurance Policy', cat: RecordCategory.Insurance, cost: 8400, days: 11 },
    { name: 'Labor Welfare Compliance Filing', cat: RecordCategory.Compliance, cost: 1100, days: 12 },
    { name: 'Structural Safety Audit', cat: RecordCategory.Inspections, cost: 4200, days: 15 },
    { name: 'Hazardous Waste Permit', cat: RecordCategory.Licenses, cost: 3000, days: 18 },
    { name: 'Catering Vendor Agreement', cat: RecordCategory.Contracts, cost: 5000, days: 22 },
    { name: 'D&O Liability Insurance', cat: RecordCategory.Insurance, cost: 19500, days: 24 },
    { name: 'Data Privacy Impact Assessment', cat: RecordCategory.Compliance, cost: 7500, days: 26 },
    { name: 'Warehouse Fire Alarm Inspection', cat: RecordCategory.Inspections, cost: 1200, days: 28 },
    { name: 'Water Discharge Consent', cat: RecordCategory.Licenses, cost: 2200, days: 29 },
    { name: 'Logistics SLA Contract', cat: RecordCategory.Contracts, cost: 9800, days: 8 },
  ];

  for (let i = 0; i < 24; i++) {
    const preset = expiringSoonNames[i % expiringSoonNames.length];
    // Spread evenly across 1 to 30 days
    const daysAhead = 1 + (i % 30);
    records.push({
      id: `gen-soon-${i}`,
      name: i >= expiringSoonNames.length ? `${preset.name} (Sec ${Math.ceil(i/10)})` : preset.name,
      category: preset.cat,
      expiryDate: addDays(CURRENT_DATE_STR, daysAhead),
      status: RecordStatus.ExpiringSoon,
      owner: SEED_TEAM[(i + 1) % SEED_TEAM.length].name,
      description: `Renewal pipeline for ${preset.name}. Requires approval.`,
      cost: preset.cost + (i * 250),
      alertDays: 30,
      documentNumber: `${preset.cat.substring(0,3).toUpperCase()}-SOON-2026-${200 + i}`,
      reminderSent: Math.random() > 0.3
    });
  }

  // 3. Generate 283 more Active/Up to Date records (dates >30 days)
  const activeBase = [
    { name: 'Customs Broker License', cat: RecordCategory.Licenses, cost: 5500 },
    { name: 'Office Lease - Tower B', cat: RecordCategory.Contracts, cost: 135000 },
    { name: 'Cyber Security Cyber-Risk Policy', cat: RecordCategory.Insurance, cost: 24000 },
    { name: 'ISO 27001 Certification', cat: RecordCategory.Compliance, cost: 14000 },
    { name: 'Electrical System Earthing Test', cat: RecordCategory.Inspections, cost: 1500 },
    { name: 'Aviation License - Heliport', cat: RecordCategory.Licenses, cost: 10000 },
    { name: 'Facility Management Agreement', cat: RecordCategory.Contracts, cost: 42000 },
    { name: 'Commercial Vehicle fleet insurance', cat: RecordCategory.Insurance, cost: 38000 },
    { name: 'Internal Financial Controls Audit', cat: RecordCategory.Compliance, cost: 11000 },
    { name: 'HVAC Air Quality Audit', cat: RecordCategory.Inspections, cost: 1900 },
  ];

  for (let i = 0; i < 283; i++) {
    const base = activeBase[i % activeBase.length];
    // Spread between 31 and 365 days ahead
    const daysAhead = 31 + Math.floor((i * 334) / 283);
    records.push({
      id: `gen-act-${i}`,
      name: `${base.name} - Ref ${i + 1000}`,
      category: base.cat,
      expiryDate: addDays(CURRENT_DATE_STR, daysAhead),
      status: RecordStatus.UpToDate,
      owner: SEED_TEAM[i % SEED_TEAM.length].name,
      description: `Fully active and registered record: ${base.name}. Managed securely.`,
      cost: base.cost + (i * 50),
      alertDays: 30,
      documentNumber: `${base.cat.substring(0,3).toUpperCase()}-ACT-2026-${3000 + i}`,
      reminderSent: false
    });
  }

  return records;
}

// Activity logs
export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    action: 'Renewed Record',
    recordName: 'Commercial Property Lease - Sector 4',
    user: 'Rahul Sharma',
    timestamp: '2 hours ago',
    type: 'update'
  },
  {
    id: 'log-2',
    action: 'Created Record',
    recordName: 'Machine Inspection - Boiler #7',
    user: 'Amit Verma',
    timestamp: '4 hours ago',
    type: 'create'
  },
  {
    id: 'log-3',
    action: 'Triggered Alert (Expiring Soon)',
    recordName: 'Vendor Contract - ABC Pvt. Ltd.',
    user: 'System Bot',
    timestamp: '1 day ago',
    type: 'alert'
  },
  {
    id: 'log-4',
    action: 'Updated Document Upload',
    recordName: 'Fire Safety Certificate',
    user: 'Sneha Reddy',
    timestamp: '1 day ago',
    type: 'update'
  },
  {
    id: 'log-5',
    action: 'Deleted Draft Record',
    recordName: 'Temporary Event Clearance License',
    user: 'Rahul Sharma',
    timestamp: '2 days ago',
    type: 'delete'
  }
];

// Seed timeline data for Expiry Timeline
// Jan 20, Feb 14, Mar 8, Today, Apr 30, Jun 7, Sep 16
export const INITIAL_TIMELINE_EVENTS: ExpiryTimelineEvent[] = [
  { id: 't-1', date: '2026-01-20', label: 'Jan 20', recordName: 'Waste Clearance Permit', status: RecordStatus.Expired },
  { id: 't-2', date: '2026-02-14', label: 'Feb 14', recordName: 'Logistics SLA', status: RecordStatus.Expired },
  { id: 't-3', date: '2026-03-08', label: 'Mar 8', recordName: 'Health & Safety Audit', status: RecordStatus.Expired },
  { id: 't-4', date: '2026-07-09', label: 'Today', isToday: true, status: RecordStatus.UpToDate },
  { id: 't-5', date: '2026-07-25', label: 'Jul 25', recordName: 'Warehouse Lease', status: RecordStatus.ExpiringSoon },
  { id: 't-6', date: '2026-06-07', label: 'Jun 7', recordName: 'Pest Control Certification', status: RecordStatus.Expired },
  { id: 't-7', date: '2026-09-16', label: 'Sep 16', recordName: 'Boiler Machinery License', status: RecordStatus.UpToDate }
];
