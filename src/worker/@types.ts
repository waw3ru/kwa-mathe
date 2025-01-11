export type DatabaseTableType =
  | 'meals'
  | 'meal_orders'
  | 'transactions'
  | 'logs';
export type DatabaseTablesRecord = Record<
  Uppercase<DatabaseTableType>,
  DatabaseTableType
>;

export interface WorkerOp {
  message: [tableName: string, opName: string];
  data: never;
}

export type WorkerOpResponse = [data: unknown, error: Error | undefined];
