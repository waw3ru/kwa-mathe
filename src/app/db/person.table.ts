import type { Queries, Store } from 'tinybase';
import { createQueries } from 'tinybase';

import {
  CustomerCellType,
  CustomerType,
  EmployeeCellType,
  EmployeeType,
  PersonType,
} from '../../@types';
import { NotFoundError } from '../../errors';

class PersonTable {
  static readonly id = 'person';

  readonly #query: Queries;

  constructor(private readonly store: Store) {
    this.#query = createQueries(this.store);
  }

  save = (data: CustomerType | EmployeeType) => {
    if (this.checkIfExists(data.contact)) return false;

    if (data.type === 'employee') {
      const cell = {
        employeeId: data.employeeId,
        name: data.name,
        personType: data.type,
      } satisfies EmployeeCellType;

      this.store.setRow(PersonTable.id, data.contact, cell);

      return true;
    }

    const cell = {
      name: data.name,
      personType: data.type,
    } satisfies CustomerCellType;

    this.store.setRow(PersonTable.id, data.contact, cell);

    return true;
  };

  checkIfExists = (contact: string) => {
    const data = this.store.getRow(PersonTable.id, contact);

    return Object.keys(data).length !== 0;
  };

  get = (contact: string) => {
    const data = this.store.getRow(PersonTable.id, contact);

    if (Object.keys(data).length !== 0) {
      throw new NotFoundError(`Person with ID: ${contact} does not exist}`);
    }

    return {
      contact,
      ...data,
    } as EmployeeType;
  };

  queryPersonByType = (type: 'customer' | 'employee') => {
    this.#query.setQueryDefinition(
      'queryPersonByType',
      PersonTable.id,
      ({ select, where }) => {
        if (type === 'employee') {
          select('employeeId');
        }
        select('name');
        where('personType', type);
      }
    );

    return this.#parseQuery('queryPersonByType');
  };

  #parseQuery = (query: string) => {
    const data: PersonType[] = [];

    this.#query.forEachResultRow(query, (contact) => {
      const cell = this.#query.getResultRow(query, contact);

      if (Object.keys(cell).length === 0) return;

      data.push({
        contact,
        ...cell,
      } as PersonType);
    });

    return data;
  };
}

export const initPersonTable = (store: Store) => new PersonTable(store);
