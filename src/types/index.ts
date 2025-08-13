// AccountType for account type grids
export interface AccountType {
  id: string;
  name: string;
  markUp: string;
  commission: string;
  swap: string;
  ib: string;
  minDeposit: string;
}

// User type
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  balance: number;
  verified: boolean;
  twoFactorEnabled: boolean;
}

// Account type for user accounts
export interface Account {
  id: string;
  userId: string | number;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  leverage: string;
  status: string;
}

// Transaction type
export interface Transaction {
  id: string;
  userId: string | number;
  type: string;
  amount: number;
  currency: string;
  method?: string;
  status: string;
  date: string;
  fromAccount?: string;
  toAccount?: string;
}

// KYC Document type
export interface KycDocument {
  id: string;
  userId: string | number;
  documentType: string;
  status: string;
  uploadDate: string;
}

// IB Request type
export interface IBRequest {
  id: string;
  userId: string | number;
  companyName: string;
  contactPerson: string;
  status: string;
  submissionDate: string;
  email?: string;
  phone?: string;
  address?: string;
  experience?: string;
}

// Dashboard stats type
export interface DashboardStats {
  totalBalance: number;
  totalProfit: number;
  totalTrades: number;
  activeAccounts: number;
  monthlyGrowth: number;
}

// Position type
export interface Position {
  srNo: number;
  orderId: string;
  account: string;
  type: string;
  openPrice: number;
  symbol: string;
  volume: number;
  id: string;
}


//ib form data type
export interface IBFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
}

export interface AccountCreationFormData {
  accountType: string;
  currency: string;
  leverage: string;
  initialDeposit?: number;
}