import { createStore } from 'tinybase';

import { DbTables } from './constants';

export const db = createStore()
  .setTable(DbTables.meal, {})
  .setTable(DbTables.person, {})
  .setTable(DbTables.mealOrder, {})
  .setTable(DbTables.transactions, {});
