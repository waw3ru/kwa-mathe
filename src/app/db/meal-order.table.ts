import { createQueries } from 'tinybase';

import {
  AddMealOrderCellType,
  EmployeeType,
  LogType,
  MealOrderCellType,
  MealOrderType,
  MealType,
  OrderStatusType,
} from '../../@types';
import { AlreadyExistsError, NotFoundError, OpError } from '../../errors';
import { DbTables } from './constants';
import { db } from './db';
import { mealQueries } from './meal.table';
import { personDbOps } from './person.table';

export const mealOrderQueries = createQueries(db);

export const _dataParser = (query: string) => {
  const data: MealOrderType[] = [];

  mealOrderQueries.forEachResultRow(query, (tableId) => {
    const cell = mealQueries.getResultRow(query, tableId);

    if (Object.keys(cell).length === 0) return;

    const servedBy = personDbOps.get(cell['servedBy'] as string);
    const result = {
      tableId,
      status: cell['status'],
      servedBy,
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
  checkIfExists: (tableId: string) => {
    const data = db.getRow(DbTables.mealOrder, tableId);

    return Object.keys(data).length !== 0;
  },
  create: (data: AddMealOrderCellType) => {
    if (mealOrderDbOps.checkIfExists(data.tableId)) {
      throw new AlreadyExistsError(`Meal Order already exists`, {
        refCode: data.tableId,
        order: data.order,
      });
    }

    const cell = {
      status: 'pending',
      orderLog: JSON.stringify([]) as never,
      order: JSON.stringify(data.order ?? []) as never,
    } satisfies MealOrderCellType;

    db.setRow(DbTables.meal, data.tableId, cell);

    return true;
  },
  get: (tableId: string) => {
    const data = db.getRow(DbTables.mealOrder, tableId);

    if (Object.keys(data).length === 0) {
      throw new NotFoundError(
        `Meal Order with table ID: ${tableId} does not exist}`
      );
    }

    const customer = personDbOps.get(data['customer'] as string);

    let served!: EmployeeType;
    if ((data['status'] as OrderStatusType) !== 'pending') {
      served = personDbOps.get(data['servedBy'] as string);
    }

    let prepared!: EmployeeType;
    if (
      (data['status'] as OrderStatusType) !== 'pending' ||
      (data['status'] as OrderStatusType) !== 'taken'
    ) {
      prepared = personDbOps.get(data['preparedBy'] as string);
    }

    return {
      tableId,
      status: data['status'],
      preparedBy: prepared,
      servedBy: served,
      customer,
      order: JSON.parse(data['order'] as string) as MealType[],
      orderLog: JSON.parse(
        data['order'] as string
      ) as LogType<OrderStatusType>[],
    } as MealOrderType;
  },
  updateOrder: ({
    tableId,
    order = [],
  }: {
    tableId: string;
    order: MealType[];
  }) => {
    if (!mealOrderDbOps.checkIfExists(tableId)) {
      throw new NotFoundError(
        `Meal Order with table ID: ${tableId} does not exist`
      );
    }

    const { status } = mealOrderDbOps.get(tableId);

    if (status !== 'pending') {
      throw new OpError(
        `Not allowed to add update meals on order while status is ${status.toUpperCase()}`,
        'UpdateOrderMeals'
      );
    }

    db.setCell(
      DbTables.mealOrder,
      tableId,
      'order',
      JSON.stringify(order ?? [])
    );

    return { added: true };
  },
  updateStatus: (data: { tableId: string; employeeId: string }) => {
    if (!mealOrderDbOps.checkIfExists(data.tableId)) {
      throw new NotFoundError(
        `Meal Order with table ID: ${data.tableId} does not exist`
      );
    }

    // Ensure employee exists
    personDbOps.get(data.employeeId);

    const { orderLog } = mealOrderDbOps.get(data.tableId);

    /**
     * First log
     */
    if (!orderLog.length) {
      db.setCell(DbTables.mealOrder, data.tableId, 'servedBy', data.employeeId);

      db.setCell(
        DbTables.mealOrder,
        data.tableId,
        'orderLog',
        JSON.stringify([
          {
            status: 'taken',
            timestamp: Date.now(),
          },
        ])
      );

      return { logged: true };
    }

    const lastLog = orderLog[orderLog.length - 1];

    switch (lastLog.status) {
      case 'taken': {
        orderLog.push({
          status: 'preparing',
          timestamp: Date.now(),
        });

        db.setCell(
          DbTables.mealOrder,
          data.tableId,
          'preparedBy',
          data.employeeId
        );

        db.setCell(
          DbTables.mealOrder,
          data.tableId,
          'orderLog',
          JSON.stringify(orderLog)
        );

        return { logged: true };
      }

      case 'preparing': {
        orderLog.push({
          status: 'served',
          timestamp: Date.now(),
        });

        db.setCell(
          DbTables.mealOrder,
          data.tableId,
          'orderLog',
          JSON.stringify(orderLog)
        );

        return { logged: true };
      }

      case 'served': {
        orderLog.push({
          status: 'completed',
          timestamp: Date.now(),
        });

        db.setCell(
          DbTables.mealOrder,
          data.tableId,
          'orderLog',
          JSON.stringify(orderLog)
        );

        return { logged: true };
      }

      default:
        return { logged: false };
    }
  },
  fetchStatus: (tableId: string) => {
    const order = mealOrderDbOps.get(tableId);
    const lastLog = order.orderLog[order.orderLog.length - 1];

    return {
      tableId: order.tableId,
      status: lastLog,
      isCustomerServed: lastLog.status === 'taken',
      hasOrderBeenTaken: lastLog.status === 'preparing',
      hasOrderBeenPrepared: lastLog.status === 'served',
      awaitingPayment: lastLog.status === 'completed',
    };
  },
};
