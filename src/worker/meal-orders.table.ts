import { MealOrderRecord, MealRecord } from '../common';

export class MealOrdersTable {
  ops() {
    //
  }

  addMealOrder(order: MealOrderRecord) {
    //
  }

  getAllMealOrders(): void {
    //
  }

  getMealOrder(): void {
    //
  }

  updateMealOrder(data: {
    orderId: string;
    data: Omit<MealRecord, 'orderId' | 'status'>;
  }) {
    //
  }

  updateMealOrderStatus(data: Pick<MealOrderRecord, 'orderId' | 'status'>) {
    //
  }
}
