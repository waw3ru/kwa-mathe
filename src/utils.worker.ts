export type MealOrderStatus = 'pending' | 'served' | 'completed';
export type DatabaseTables = 'meals' | 'meal_orders' | 'transactions' | 'logs';
export type DatabaseTablesRecord = Record<
  Uppercase<DatabaseTables>,
  DatabaseTables
>;

export interface DatabaseOp {
  message: [tableName: string, opName: string];
  data: never;
}

export interface LogRecord {
  logId: string;
  logName: string;
  opType: string;
  data: unknown;
  timestamp: number;
}

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

export const DatabaseTables: DatabaseTablesRecord = {
  LOGS: 'logs',
  MEALS: 'meals',
  MEAL_ORDERS: 'meal_orders',
  TRANSACTIONS: 'transactions',
};
