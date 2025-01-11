import { TransactionRecord, TransactionsTableOp } from '../utils.worker';

export class TransactionsTable implements TransactionsTableOp {
  save(data: TransactionRecord): [void, Error | undefined] {
    throw new Error('Method not implemented.');
  }

  getAll(): [TransactionRecord[], Error | undefined] {
    throw new Error('Method not implemented.');
  }

  updateIsPaid(orderId: string): [void, Error | undefined] {
    throw new Error('Method not implemented.');
  }
}
