import { createStore } from 'tinybase';

import { DatabaseOpType, DatabaseTables } from './utils';

export class Database {
  readonly #tables = DatabaseTables;

  constructor() {
    this.#create();
  }

  connect({ message, data }: DatabaseOpType) {
    // pass all the ops here!
  }

  #create() {
    const db = createStore();
    db.setTable(this.#tables.LOGS, {});
    db.setTable(this.#tables.MEALS, {});
    db.setTable(this.#tables.MEAL_ORDERS, {});
    db.setTable(this.#tables.TRANSACTIONS, {});
  }
}
