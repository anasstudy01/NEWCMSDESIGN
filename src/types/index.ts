// User related types
export interface User {
  id: number;
  email: string;
  password?: string; // Optional for security reasons
  name: string;
  balance: number;
  verified: boolean;
  twoFactorEnabled: boolean;
}

// Account related types
export interface Account {
  id: number;
  userId: number;
  accountNumber: string;
  accountType: 'Live' | 'Demo';
  balance: number;
  currency: string;
  leverage: string;
  status: 'Active' | 'Inactive' | 'Suspended';
}

// Transaction related types
export interface Transaction {
  id: number;
  userId: number;
  type: 'Deposit' | 'Withdrawal' | 'Transfer';
  amount: number;
  currency: string;
  method: string;
  status: 'Completed' | 'Processing' | 'Failed' | 'Pending';
  date: string;
}

// KYC related types
export interface KYCDocument {
  id: number;
  userId: number;
  documentType: 'passport' | 'driving_license' | 'national_id';
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: string;
}

// IB Request types
export interface IBRequest {
  id: number;
  userId: number;
  companyName: string;
  contactPerson: string;
  status: 'Under Review' | 'Approved' | 'Rejected';
  submissionDate: string;
}

// Dashboard statistics
export interface DashboardStats {
  totalBalance: number;
  totalProfit: number;
  totalTrades: number;
  activeAccounts: number;
  monthlyGrowth: number;
}

// Form data types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface DepositFormData {
  amount: number;
  method: 'bank' | 'usdt' | 'crypto';
  currency: string;
}

export interface TransferFormData {
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
}

export interface AccountCreationFormData {
  accountType: 'Live' | 'Demo';
  currency: string;
  leverage: string;
  initialDeposit?: number;
}

export interface KYCFormData {
  documentType: 'passport' | 'driving_license' | 'national_id';
  documentNumber: string;
  expiryDate: string;
  file: File | null;
}

export interface IBFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
}
