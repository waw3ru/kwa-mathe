import {
  MealOrderRecord,
  MealOrdersTableOp,
  MealOrderStatus,
} from '../utils.worker';

export class MealOrdersTable implements MealOrdersTableOp {
  save(data: MealOrderRecord): [void, Error | undefined] {
    throw new Error('Method not implemented.');
  }

  getAll(): [MealOrderRecord[], Error | undefined] {
    throw new Error('Method not implemented.');
  }

  get(orderId: string): [MealOrderRecord, Error | undefined] {
    throw new Error('Method not implemented.');
  }

  update(
    orderId: string,
    data: Omit<MealOrderRecord, 'orderId'>
  ): [void, Error | undefined] {
    throw new Error('Method not implemented.');
  }

  updateStatus(
    orderId: string,
    status: MealOrderStatus
  ): [void, Error | undefined] {
    throw new Error('Method not implemented.');
  }
}
