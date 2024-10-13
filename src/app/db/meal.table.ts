import { createQueries } from 'tinybase';

import { AddNewMealType, MealCellType, MealType } from '../../@types';
import { AlreadyExistsError, NotFoundError } from '../../errors';
import { DbTables } from './constants';
import { db } from './db';

export const mealQueries = createQueries(db);

export const _dataParser = (query: string) => {
  const data: MealType[] = [];

  mealQueries.forEachResultRow(query, (mealRef) => {
    const cell = mealQueries.getResultRow(query, mealRef);

    if (Object.keys(cell).length === 0) return;

    data.push({
      mealRef,
      ...cell,
    } as MealType);
  });

  return data;
};

export const mealDbOps = {
  checkIfExists: (mealRef: string) => {
    const data = db.getRow(DbTables.meal, mealRef);

    return Object.keys(data).length !== 0;
  },
  update: (mealRef: string, update: Partial<MealCellType>) => {
    if (mealDbOps.checkIfExists(mealRef)) {
      throw new NotFoundError('Meal not found');
    }

    if ('isAvailable' in update) {
      db.setCell(DbTables.meal, mealRef, 'isAvailable', update.isAvailable!);
    }
    if ('price' in update) {
      db.setCell(DbTables.meal, mealRef, 'price', update.price!);
    }
    if ('type' in update) {
      db.setCell(DbTables.meal, mealRef, 'type', update.type!);
    }
    if ('name' in update) {
      db.setCell(DbTables.meal, mealRef, 'name', update.name!);
    }

    return true;
  },
  save: (data: AddNewMealType) => {
    if (mealDbOps.checkIfExists(data.mealRef)) {
      throw new AlreadyExistsError(`Meal already exists`, {
        mealRef: data.mealRef,
      });
    }

    const cell = {
      isAvailable: true,
      name: data.name,
      price: data.price,
      type: data.type,
    } satisfies MealCellType;

    db.setRow(DbTables.meal, data.mealRef, cell);

    return true;
  },
  get: (mealRef: string) => {
    const data = db.getRow(DbTables.meal, mealRef);

    if (Object.keys(data).length === 0) {
      throw new NotFoundError(`Meal with meal-ref: ${mealRef} does not exist}`);
    }

    return {
      mealRef,
      ...data,
    } as MealType;
  },
};
