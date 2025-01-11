export type DatabaseTables = 'meals' | 'meal_orders' | 'transactions' | 'logs';
export type DatabaseTablesRecord = Record<
  Uppercase<DatabaseTables>,
  DatabaseTables
>;

export interface DatabaseOpType {
  message: [tableName: string, opName: string];
  data: never;
}

export const DatabaseTables: DatabaseTablesRecord = {
  LOGS: 'logs',
  MEALS: 'meals',
  MEAL_ORDERS: 'meal_orders',
  TRANSACTIONS: 'transactions',
};
