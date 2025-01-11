// Types
export type MealOrderStatus = 'pending' | 'served' | 'completed';
export type DatabaseTableType =
  | 'meals'
  | 'meal_orders'
  | 'transactions'
  | 'logs';
export type DatabaseTablesRecord = Record<
  Uppercase<DatabaseTableType>,
  DatabaseTableType
>;

// Interfaces
export interface DatabaseOp {
  message: [tableName: string, opName: string];
  data: never;
}

export interface LogsTableOp {
  log(data: LogRecord): void;
  query(start: number, end: number): LogRecord[];
  getAll(): LogRecord[];
}
export interface LogRecord {
  logId: string;
  logName: string;
  opType: string;
  data: unknown;
  timestamp: number;
}

export interface MealsTableOp {
  save(data: MealRecord): [void, Error | undefined];
  getAll(): [MealRecord[], Error | undefined];
  get(mealId: string): [MealRecord, Error | undefined];
  update(
    mealId: string,
    data: Omit<MealRecord, 'mealId'>
  ): [void, Error | undefined];
}
export interface MealRecord {
  mealId: string;
  title: string;
  description: string;
  pricePerUnit: number;
  unit: number;
  isAvailable: boolean;
}

export interface MealOrdersTableOp {
  save(data: MealOrderRecord): [void, Error | undefined];
  getAll(): [MealOrderRecord[], Error | undefined];
  get(orderId: string): [MealOrderRecord, Error | undefined];
  update(
    orderId: string,
    data: Omit<MealOrderRecord, 'orderId'>
  ): [void, Error | undefined];
  updateStatus(
    orderId: string,
    status: MealOrderStatus
  ): [void, Error | undefined];
}
export interface MealOrderRecord {
  orderId: string;
  orders: string[]; // mealId
  status?: MealOrderStatus;
}

export interface TransactionsTableOp {
  save(data: TransactionRecord): [void, Error | undefined];
  getAll(): [TransactionRecord[], Error | undefined];
  updateIsPaid(orderId: string): [void, Error | undefined];
}
export interface TransactionRecord {
  transactionId: string;
  orderId: string;
  totalAmount: number;
  isPaid: boolean;
}

// Constants
export const DatabaseTables: DatabaseTablesRecord = {
  LOGS: 'logs',
  MEALS: 'meals',
  MEAL_ORDERS: 'meal_orders',
  TRANSACTIONS: 'transactions',
};
