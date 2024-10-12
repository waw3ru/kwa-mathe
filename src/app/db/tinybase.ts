import { createStore } from 'tinybase';

import type { OpType } from '../../@types';
import { DbOp } from './messages';
import { initPersonTable } from './person.table';

const db = createStore();
const personTable = initPersonTable(db);

interface DbOpType {
  message: OpType;
  data: never;
}

export const personDbOps = ({ message, ...op }: DbOpType) => {
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

    default:
      return;
  }
};
