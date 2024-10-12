import type { Queries, Store } from 'tinybase';
import { createQueries } from 'tinybase';

import { DbTables } from './constants';

class TransactionsTable {
  static readonly id = DbTables.transactions;

  readonly #query: Queries;

  constructor(private readonly store: Store) {
    this.#query = createQueries(this.store);
  }
}

export const initTransactionsTable = (store: Store) =>
  new TransactionsTable(store);
