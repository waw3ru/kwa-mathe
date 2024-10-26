import { createQueries } from 'tinybase';

import { EmployeeCellType, EmployeeType } from '../../@types';
import { AlreadyExistsError, NotFoundError } from '../../errors';
import { DbTables } from './constants';
import { db } from './db';

export const personQueries = createQueries(db);

export const _dataParser = (query: string) => {
  const data: EmployeeType[] = [];

  personQueries.forEachResultRow(query, (employeeId) => {
    const cell = personQueries.getResultRow(query, employeeId);

    if (Object.keys(cell).length === 0) return;

    data.push({
      name: cell['name'],
      employeeId,
      employeeType: cell['employeeType'],
    } as EmployeeType);
  });

  return data;
};

export const personDbOps = {
  checkIfExists: (contact: string) => {
    const data = db.getRow(DbTables.person, contact);

    return Object.keys(data).length !== 0;
  },
  save: () => (data: EmployeeType) => {
    if (personDbOps.checkIfExists(data.employeeId)) {
      throw new AlreadyExistsError(`Person already exists`, {
        name: data.name,
      });
    }

    const cell = {
      name: data.name,
      employeeType: data.employeeType,
    } satisfies EmployeeCellType;

    db.setRow(DbTables.person, data.employeeId, cell);

    return true;
  },
  get: (employeeId: string) => {
    const data = db.getRow(DbTables.person, employeeId);

    if (Object.keys(data).length === 0) {
      throw new NotFoundError(`Person with ID: ${employeeId} does not exist}`);
    }

    return {
      employeeId,
      ...data,
    } as EmployeeType;
  },
};
