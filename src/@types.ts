import type { DbOp } from './app/db/constants';

type DbMessageType = typeof DbOp;
export type OpType = DbMessageType[keyof DbMessageType];
export type MealCategoryType = 'food' | 'beverage' | 'soft-drink';
export type OrderStatusType = 'started' | 'ongoing' | 'completed';
export type PaymentMethodType = 'cash' | 'm-pesa' | 'm-banking';
export type TransactionStatusType =
  | 'initiated'
  | 'pending'
  | 'failed'
  | 'completed';

export interface PaymentType {
  mode: 'percentage' | 'cash';
  amount: number;
}

export interface PersonType {
  name: string;
  contact: string;
}

export interface CustomerType extends PersonType {
  type: 'customer';
}

export interface EmployeeType extends PersonType {
  type: 'employee';
  employeeId: string;
}

export interface MealType {
  mealRef: string;
  name: string;
  type: MealCategoryType;
  price: number;
  isAvailable: boolean;
}

export interface MealOrderType {
  id: number;
  refCode: string;
  order: MealType[];
  customer: CustomerType;
  servedBy: EmployeeType;
  currentStatus: OrderStatusType;
  orderLog: {
    timestamp: number;
    status: OrderStatusType;
  }[];
}

export interface TransactionType {
  id: number;
  refCode: string;
  order: MealOrderType;
  tip: PaymentType | undefined;
  discount: PaymentType | undefined;
  status: TransactionStatusType;
  paymentMethod: PaymentMethodType;
  paidBy: CustomerType;
  transactionLog: {
    timestamp: number;
    status: TransactionStatusType;
  }[];
  get totalAmount(): number;
}

export interface PersonCellType {
  personType: 'customer' | 'employee';
  name: string;
}

export type CustomerCellType = PersonCellType & {
  personType: 'customer';
};

export type EmployeeCellType = PersonCellType & {
  personType: 'employee';
  employeeId: string;
};

export type MealCellType = Omit<MealType, 'mealRef'>;
