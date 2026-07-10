export enum RecordStatus {
  Expired = 'Expired',
  ExpiringSoon = 'Expiring Soon',
  UpToDate = 'Up to Date',
}

export enum RecordCategory {
  Licenses = 'Licenses',
  Contracts = 'Contracts',
  Insurance = 'Insurance',
  Compliance = 'Compliance',
  Inspections = 'Inspections',
}

export interface RecordItem {
  id: string;
  name: string;
  category: RecordCategory;
  expiryDate: string; // YYYY-MM-DD
  status: RecordStatus;
  owner: string; // Owner email or name
  description: string;
  cost: number;
  alertDays: number;
  documentNumber?: string;
  reminderSent: boolean;
  notes?: string;
  isNewlyImported?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'Active' | 'Inactive';
  recordsOwned: number;
}

export interface ExpiryTimelineEvent {
  id: string;
  date: string; // YYYY-MM-DD
  label: string; // e.g., "Jan 20", "Feb 14", "Today"
  recordName?: string;
  status: RecordStatus;
  isToday?: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  recordName: string;
  user: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'alert';
}
