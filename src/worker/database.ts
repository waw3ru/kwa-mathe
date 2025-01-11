import { createStore, Store } from 'tinybase';

import { DatabaseTablesRecord, WorkerOp } from './@types';

const DatabaseTables: DatabaseTablesRecord = Object.freeze({
  LOGS: 'logs',
  MEALS: 'meals',
  MEAL_ORDERS: 'meal_orders',
  TRANSACTIONS: 'transactions',
});

export class Database {
  static db: Store;

  readonly #tables = DatabaseTables;

  constructor() {
    this.#create();
  }

  connect({ message, data }: WorkerOp) {
    const [tableName, tableOp] = message;
    switch (tableName) {
      case DatabaseTables.MEALS:
        return;
      case DatabaseTables.MEAL_ORDERS:
        return;
      case DatabaseTables.TRANSACTIONS:
        return;
    }
  }

  #create() {
    Database.db = createStore();
    Database.db.setTable(this.#tables.LOGS, {});
    Database.db.setTable(this.#tables.MEALS, {});
    Database.db.setTable(this.#tables.MEAL_ORDERS, {});
    Database.db.setTable(this.#tables.TRANSACTIONS, {});
  }
}
