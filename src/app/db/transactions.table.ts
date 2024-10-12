import { createQueries } from 'tinybase';

import { db } from './db';

export const transactionrQueries = createQueries(db);

export const _dataParser = (query: string) => {};

export const transactionOps = {
  save: () => {},
  get: () => {},
};
