import { createStore } from 'tinybase';

import type { MealCategoryType, MealCellType, OpType } from '../../@types';
import { DbOp, DbTables } from './constants';
import { initMealTable } from './meal.table';
import { initPersonTable } from './person.table';

const db = createStore()
  .setTable(DbTables.person, {})
  .setTable(DbTables.meal, {});

const personTable = initPersonTable(db);
const mealTable = initMealTable(db);

interface DbOpType {
  message: OpType;
  data: never;
}

export const ops = ({ message, ...op }: DbOpType) => {
  switch (message) {
    case DbOp.QUERY_PERSON: {
      return personTable.queryPersonByType(op.data);
    }

    case DbOp.GET_PERSON: {
      return personTable.get(op.data);
    }

    case DbOp.SAVE_PERSON: {
      return personTable.save(op.data);
    }

    case DbOp.QUERY_MEAL: {
      return mealTable.queryMealByCategory(op.data as MealCategoryType);
    }

    case DbOp.UPDATE_MEAL: {
      const { mealRef, updates } = op.data as {
        mealRef: string;
        updates: MealCellType;
      };
      return mealTable.update(mealRef, updates);
    }

    case DbOp.SAVE_MEAL: {
      return mealTable.save(op.data);
    }

    default:
      return;
  }
};
