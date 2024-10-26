/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GenericError } from '../../errors';
import { mealDbOps } from './meal.table';
import { personDbOps } from './person.table';

interface DbOpType {
  message: `${string}.${string}`;
  data: never;
}

export const ops = ({ message, data }: DbOpType) => {
  const [table, op] = message.split('.') as [
    'person' | 'meal' | 'mealOrder' | 'transactions',
    string,
  ];

  switch (table) {
    case 'person': {
      // @ts-expect-error
      return personDbOps[op].call(personDbOps, data);
    }

    case 'meal': {
      // @ts-expect-error
      return mealDbOps[op].call(mealDbOps, data);
    }

    default: {
      throw new GenericError('Table does not exists');
    }
  }
};
