import type { Queries, Store } from 'tinybase';
import { createQueries } from 'tinybase';

import { DbTables } from './constants';

class MealOrderTable {
  static readonly id = DbTables.mealOrder;

  readonly #query: Queries;

  constructor(private readonly store: Store) {
    this.#query = createQueries(this.store);
  }
}

export const initMealOrderTable = (store: Store) => new MealOrderTable(store);
