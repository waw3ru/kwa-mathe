import { createStore } from 'tinybase';

import { DbProcedureMessages, DbProcedureMessageType } from './messages';
import { initPersonTable } from './person.table';

const db = createStore();
const personTable = initPersonTable(db);

interface DbOpType {
  message: DbProcedureMessageType;
  data: never;
}

export const personDbOps = ({ message, ...op }: DbOpType) => {
  switch (message) {
    case DbProcedureMessages.GET_CUSTOMERS: {
      return personTable.queryPersonByType('customer');
    }

    case DbProcedureMessages.GET_EMPLOYEES: {
      return personTable.queryPersonByType('employee');
    }

    case DbProcedureMessages.SAVE_PERSON: {
      return personTable.save(op.data);
    }

    default:
      return;
  }
};
