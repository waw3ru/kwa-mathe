import { createQueries } from 'tinybase';

import {
  AddMealOrderCellType,
  LogType,
  MealOrderCellType,
  MealOrderType,
  MealType,
  OrderStatusType,
} from '../../@types';
import { AlreadyExistsError, NotFoundError } from '../../errors';
import { DbTables } from './constants';
import { db } from './db';
import { mealQueries } from './meal.table';
import { personDbOps } from './person.table';

export const mealOrderQueries = createQueries(db);

export const _dataParser = (query: string) => {
  const data: MealOrderType[] = [];

  mealOrderQueries.forEachResultRow(query, (refCode) => {
    const cell = mealQueries.getResultRow(query, refCode);

    if (Object.keys(cell).length === 0) return;

    const customer = personDbOps.get(cell['customer'] as string);
    const servedBy = personDbOps.get(cell['servedBy'] as string);
    const result = {
      refCode,
      status: cell['status'],
      servedBy,
      customer,
      order: JSON.parse(cell['order'] as string) as MealType[],
      orderLog: JSON.parse(
        cell['order'] as string
      ) as LogType<OrderStatusType>[],
    } as MealOrderType;

    data.push(result);
  });

  return data;
};

export const mealOrderDbOps = {
  checkIfExists: (refCode: string) => {
    const data = db.getRow(DbTables.mealOrder, refCode);

    return Object.keys(data).length !== 0;
  },
  save: (data: AddMealOrderCellType) => {
    if (mealOrderDbOps.checkIfExists(data.refCode)) {
      throw new AlreadyExistsError(`Meal Order already exists`, {
        refCode: data.refCode,
        order: data.order,
      });
    }

    const cell = {
      status: 'started',
      orderLog: JSON.stringify([]) as never,
      servedBy: data.servedBy.contact as never,
      customer: data.customer.contact as never,
      order: JSON.stringify(data.order ?? []) as never,
    } satisfies MealOrderCellType;

    db.setRow(DbTables.meal, data.refCode, cell);

    return true;
  },
  get: (refCode: string) => {
    const data = db.getRow(DbTables.mealOrder, refCode);

    if (Object.keys(data).length === 0) {
      throw new NotFoundError(
        `Meal Order with ref-code: ${refCode} does not exist}`
      );
    }

    const customer = personDbOps.get(data['customer'] as string);
    const servedBy = personDbOps.get(data['servedBy'] as string);

    return {
      refCode,
      status: data['status'],
      servedBy,
      customer,
      order: JSON.parse(data['order'] as string) as MealType[],
      orderLog: JSON.parse(
        data['order'] as string
      ) as LogType<OrderStatusType>[],
    } as MealOrderType;
  },
  _addMealToOrder: () => {
    //
  },
  _removeMealFromOrder: () => {
    //
  },
  _logStatusUpdate: () => {
    //
  },
  _getLastOrderStatus: () => {
    //
  },
};
