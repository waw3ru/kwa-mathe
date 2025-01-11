import {
  LogRecord,
  MealOrderRecord,
  MealRecord,
  TransactionRecord,
} from './@types';
import {
  ADD_MEAL_ORDER,
  CREATE_LOG_ENTRY,
  CREATE_TRANSACTION,
  GET_ALL_LOG_ENTRIES,
  GET_ALL_MEAL_ORDERS,
  GET_ALL_MEALS,
  GET_ALL_TRANSACTION,
  GET_MEAL,
  GET_MEAL_ORDER,
  GET_TRANSACTION,
  QUERY_LOG_ENTRIES,
  SAVE_MEAL,
  UPDATE_MEAL,
  UPDATE_MEAL_ORDER,
  UPDATE_MEAL_ORDER_STATUS,
  UPDATE_TRANSACTION_PAYMENT,
} from './utils';

interface DatabaseOp {
  readonly message: string;
  data?: unknown;
}

export class SaveMealAction implements DatabaseOp {
  readonly message = SAVE_MEAL;
  constructor(public data: MealRecord) {}
}
export class GetAllMealsAction implements DatabaseOp {
  readonly message = GET_ALL_MEALS;
}
export class GetMealAction implements DatabaseOp {
  readonly message = GET_MEAL;
  /**
   * @param data - mealId
   */
  constructor(public data: string) {}
}
export class UpdateMealAction implements DatabaseOp {
  readonly message = UPDATE_MEAL;
  constructor(public data: Omit<MealRecord, 'mealId'>) {}
}

// Meal Orders Actions
export class AddMealOrderAction implements DatabaseOp {
  readonly message = ADD_MEAL_ORDER;
}
export class GetAllMealOrdersAction implements DatabaseOp {
  readonly message = GET_ALL_MEAL_ORDERS;
}
export class GetMealOrderAction implements DatabaseOp {
  readonly message = GET_MEAL_ORDER;
  /**
   * @param data - orderId
   */
  constructor(public data: string) {}
}
export class UpdateMealOrderAction implements DatabaseOp {
  readonly message = UPDATE_MEAL_ORDER;
  constructor(
    public data: { mealId: string; data: Omit<MealRecord, 'mealId'> }
  ) {}
}
export class UpdateMealOrderStatusAction implements DatabaseOp {
  readonly message = UPDATE_MEAL_ORDER_STATUS;
  constructor(public data: Pick<MealOrderRecord, 'orderId' | 'status'>) {}
}

// Transactions Actions
export class SaveTransactionAction implements DatabaseOp {
  readonly message = CREATE_TRANSACTION;
  constructor(public data: TransactionRecord) {}
}
export class GetAllTransactionsAction implements DatabaseOp {
  readonly message = GET_ALL_TRANSACTION;
}
export class GetTransactionAction implements DatabaseOp {
  readonly message = GET_TRANSACTION;
  /**
   * @param data - transactionId
   */
  constructor(public data: string) {}
}
export class UpdateTransactionPaymentAction implements DatabaseOp {
  readonly message = UPDATE_TRANSACTION_PAYMENT;
  constructor(public data: { orderId: string; isPaid: boolean }) {}
}

// Logs Ops
export class CreateLogEntryAction implements DatabaseOp {
  readonly message = CREATE_LOG_ENTRY;
  constructor(public data: LogRecord) {}
}
export class QueryLogEntriesAction implements DatabaseOp {
  readonly message = QUERY_LOG_ENTRIES;
  constructor(public data: { start: number; end: number }) {}
}
export class GetLogEntriesAction implements DatabaseOp {
  readonly message = GET_ALL_LOG_ENTRIES;
}
