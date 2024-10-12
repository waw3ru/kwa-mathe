import { createQueries } from 'tinybase';

import { db } from './db';

export const mealOrderQueries = createQueries(db);

export const _dataParser = (query: string) => {};

export const mealOrderOps = {
  save: () => {},
  get: () => {},
};
