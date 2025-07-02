// Enums
export enum InvoiceStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export enum TransactionType {
  TOPUP = "TOPUP",
  WITHDRAWAL = "WITHDRAWAL",
  TRANSFER = "TRANSFER",
}

// Models
export type User = {
  id?: string | null;
  email: string;
  password?: string; // Consider if you truly need to expose password in the frontend type, often omitted for security
  fullName: string;
  phone?: string | null;
  isVerified: boolean;
  otp?: string | null;
  otpExpiry?: Date | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  wallets?: Wallet[];
  invoices?: Invoice[];
  transactions?: Transaction[];
};

export type Wallet = {
  id: string;
  walletNumber: string;
  createdAt: Date;
  userId: string;
  user?: User;
  transactions?: Transaction[];
  invoices?: Invoice[];
};

export type Invoice = {
  id: string;
  reference: string;
  amount: number;
  description?: string | null;
  status: InvoiceStatus;
  recipient: string;
  createdAt: Date;
  settledAt?: Date | null;
  paymentLink: string;
  userId: string;
  user?: User;
  walletId: string;
  wallet?: Wallet;
};

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  reference: string;
  description?: string | null;
  phoneNumber?: string | null;
  telco?: string | null;
  createdAt: Date;
  walletId: string;
  wallet?: Wallet;
  userId: string;
  user?: User;
  recipientWalletId?: string | null;
  invoiceId?: string | null;
};