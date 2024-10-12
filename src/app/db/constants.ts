export const DbTables = {
  person: 'person',
  meal: 'meal',
};

export const DbOp = {
  QUERY_PERSON: `${DbTables.person}.query`,
  SAVE_PERSON: `${DbTables.person}.save`,
  GET_PERSON: `${DbTables.person}.get`,
  QUERY_MEAL: `${DbTables.meal}.query`,
  SAVE_MEAL: `${DbTables.meal}.save`,
  UPDATE_MEAL: `${DbTables.meal}.update`,
} as const;
