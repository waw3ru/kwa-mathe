import { createQueries } from 'tinybase';

import {
  CustomerCellType,
  CustomerType,
  EmployeeCellType,
  EmployeeType,
} from '../../@types';
import { AlreadyExistsError, NotFoundError } from '../../errors';
import { DbTables } from './constants';
import { db } from './db';

export const personQueries = createQueries(db);

export const _dataParser = (query: string) => {
  const data: (EmployeeType | CustomerType)[] = [];

  personQueries.forEachResultRow(query, (contact) => {
    const cell = personQueries.getResultRow(query, contact);

    if (Object.keys(cell).length === 0) return;

    data.push({
      contact,
      ...cell,
    } as EmployeeType | CustomerType);
  });

  return data;
};

export const personDbOps = {
  checkIfExists: (contact: string) => {
    const data = db.getRow(DbTables.person, contact);

    return Object.keys(data).length !== 0;
  },
  save: () => (data: CustomerType | EmployeeType) => {
    if (personDbOps.checkIfExists(data.contact)) {
      throw new AlreadyExistsError(`Person already exists`, {
        contact: data.contact,
        name: data.name,
      });
    }

    if (data.type === 'employee') {
      const cell = {
        employeeId: data.employeeId,
        name: data.name,
        personType: data.type,
      } satisfies EmployeeCellType;

      db.setRow(DbTables.person, data.contact, cell);
    } else {
      const cell = {
        name: data.name,
        personType: data.type,
      } satisfies CustomerCellType;

      db.setRow(DbTables.person, data.contact, cell);
    }

    return true;
  },
  get: (contact: string) => {
    const data = db.getRow(DbTables.person, contact);

    if (Object.keys(data).length === 0) {
      throw new NotFoundError(`Person with ID: ${contact} does not exist}`);
    }

    return {
      contact,
      ...data,
    } as EmployeeType | CustomerType;
  },
};
