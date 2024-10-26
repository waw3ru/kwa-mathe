import type { DbOp } from './app/db/constants';

export type JSONArrayString = `[${string}]`;
export type DbMessageType = typeof DbOp;
export type OpType = DbMessageType[keyof DbMessageType];
export type MealCategoryType = 'food' | 'beverage' | 'soft-drink';
export type OrderStatusType =
  | 'pending'
  | 'taken'
  | 'preparing'
  | 'served'
  | 'completed';
export type PaymentMethodType = 'cash' | 'm-pesa' | 'm-banking';
export type TransactionStatusType =
  | 'initiated'
  | 'pending'
  | 'failed'
  | 'completed';

export interface LogType<T> {
  timestamp: number;
  status: T;
}

export interface PaymentType {
  mode: 'percentage' | 'cash';
  amount: number;
}

export interface EmployeeType {
  employeeId: string;
  name: string;
  employeeType: 'cook' | 'server';
}

export interface MealType {
  mealRef: string;
  name: string;
  type: MealCategoryType;
  price: number;
  isAvailable: boolean;
}

export interface MealOrderType {
  tableId: string;
  order: MealType[];
  servedBy?: EmployeeType;
  preparedBy?: EmployeeType;
  status: OrderStatusType;
  orderLog: LogType<OrderStatusType>[];
}

export interface TransactionType {
  refCode: string;
  order: MealOrderType;
  tip: PaymentType | undefined;
  discount: PaymentType | undefined;
  status: TransactionStatusType;
  paymentMethod: PaymentMethodType;
  paidBy: string; // phone no. OR email address
  transactionLog: LogType<TransactionStatusType>[];
  get totalAmount(): number;
}

export interface EmployeeCellType {
  name: string;
  employeeType: 'cook' | 'server';
}

export type MealCellType = Omit<MealType, 'mealRef'>;

export type AddNewMealType = Omit<MealType, 'isAvailable'>;

export type MealOrderCellType = Omit<MealOrderType, 'tableId'> & {
  servedBy?: string;
  preparedBy?: string;
  order: JSONArrayString;
  orderLog: JSONArrayString;
};

export type AddMealOrderCellType = Omit<MealOrderType, 'status' | 'orderLog'>;
