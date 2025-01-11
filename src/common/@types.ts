export type MealOrderStatus = 'pending' | 'served' | 'completed';

export interface MealRecord {
  mealId: string;
  title: string;
  description: string;
  pricePerUnit: number;
  unit: number;
  isAvailable: boolean;
}

export interface MealOrderRecord {
  orderId: string;
  orders: string[]; // mealId
  status?: MealOrderStatus;
}

export interface TransactionRecord {
  transactionId: string;
  orderId: string;
  totalAmount: number;
  isPaid: boolean;
}

export interface LogRecord {
  logId: string;
  logName: string;
  opType: string;
  data: unknown;
  timestamp: number;
}
