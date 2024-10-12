import type { Queries, Store } from 'tinybase';
import { createQueries } from 'tinybase';

import { MealCategoryType, MealCellType, MealType } from '../../@types';
import { AlreadyExistsError, NotFoundError } from '../../errors';
import { DbTables } from './constants';

class MealTable {
  static readonly id = DbTables.meal;

  readonly #query: Queries;

  constructor(private readonly store: Store) {
    this.#query = createQueries(this.store);
  }

  save = (data: Omit<MealType, 'isAvailable'>) => {
    if (this.#checkIfExists(data.mealRef)) {
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

    this.store.setRow(MealTable.id, data.mealRef, cell);
    return true;
  };

  update = (mealRef: string, update: Partial<MealCellType>) => {
    if (this.#checkIfExists(mealRef)) {
      throw new NotFoundError('Meal not found');
    }

    if ('isAvailable' in update) {
      this.store.setCell(
        MealTable.id,
        mealRef,
        'isAvailable',
        update.isAvailable!
      );
    }
    if ('price' in update) {
      this.store.setCell(MealTable.id, mealRef, 'price', update.price!);
    }
    if ('type' in update) {
      this.store.setCell(MealTable.id, mealRef, 'type', update.type!);
    }
    if ('name' in update) {
      this.store.setCell(MealTable.id, mealRef, 'name', update.name!);
    }
  };

  queryMealByCategory = (type: MealCategoryType) => {
    const queryName = 'queryMealByCategory';

    this.#query.setQueryDefinition(
      queryName,
      MealTable.id,
      ({ select, where }) => {
        select('name');
        select('price');
        select('isAvailable');
        where('type', type);
      }
    );

    return this.#parseQuery(queryName);
  };

  #checkIfExists = (mealRef: string) => {
    const data = this.store.getRow(MealTable.id, mealRef);

    return Object.keys(data).length !== 0;
  };

  #parseQuery = (query: string) => {
    const data: MealType[] = [];

    this.#query.forEachResultRow(query, (mealRef) => {
      const cell = this.#query.getResultRow(query, mealRef);

      if (Object.keys(cell).length === 0) return;

      data.push({
        mealRef,
        ...cell,
      } as MealType);
    });

    return data;
  };
}

export const initMealTable = (store: Store) => new MealTable(store);
