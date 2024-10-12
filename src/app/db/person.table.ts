import { createQueries, Queries, Store } from 'tinybase';

import {
  CustomerCellType,
  CustomerType,
  EmployeeCellType,
  EmployeeType,
  PersonType,
} from '../../@types';

/**
 * @schema {
 *  rowName: phone-number of the person
 *  cells: person details i.e. Name, personType
 * }
 */
class PersonTable {
  static readonly id = 'person';

  readonly #query: Queries;

  constructor(private readonly store: Store) {
    this.#query = createQueries(this.store);
  }

  /**
   * @returns - true means was saved, false means already exists
   */
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
