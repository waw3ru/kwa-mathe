/**
 * Contains all the typings used in the whole application
 */

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
  id: number;
  name: string;
  contact: string;
}

export interface MealType {
  id: number;
  name: string;
  type: MealCategoryType;
  price: number;
}

export interface MealOrderType {
  id: number;
  refCode: string;
  order: MealType[];
  customer: PersonType;
  servedBy: PersonType;
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
  totalAmount: number;
  tip: PaymentType | undefined;
  discount: PaymentType | undefined;
  status: TransactionStatusType;
  paymentMethod: PaymentMethodType;
  transactionLog: {
    timestamp: number;
    status: TransactionStatusType;
  }[];
}
