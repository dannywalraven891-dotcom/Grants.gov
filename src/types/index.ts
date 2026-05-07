export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  depositVerified: boolean;
  createdAt: string;
  language: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  cryptoType: 'BTC' | 'ETH' | 'USDT';
  address: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  screenshotUrl?: string;
  createdAt: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface CryptoAddress {
  type: 'BTC' | 'ETH' | 'USDT';
  address: string;
  name: string;
}
