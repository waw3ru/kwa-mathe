import { createStore } from 'tinybase';

import { DatabaseOp, DatabaseTables } from '../utils.worker';

export class Database {
  readonly #tables = DatabaseTables;

  constructor() {
    this.#create();
  }

  connect({ message, data }: DatabaseOp) {
    const [tableName, tableOp] = message;
    switch (tableName) {
      case DatabaseTables.LOGS:
        return;
      case DatabaseTables.MEALS:
        return;
      case DatabaseTables.MEAL_ORDERS:
        return;
      case DatabaseTables.TRANSACTIONS:
        return;
    }
  }

  #create() {
    const db = createStore();
    db.setTable(this.#tables.LOGS, {});
    db.setTable(this.#tables.MEALS, {});
    db.setTable(this.#tables.MEAL_ORDERS, {});
    db.setTable(this.#tables.TRANSACTIONS, {});
  }
}
