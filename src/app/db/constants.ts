export const DbTables = {
  transactions: 'transactions',
  mealOrder: 'mealOrder',
  person: 'person',
  meal: 'meal',
};

export const DbOp = {
  //* Person Ops
  SAVE_PERSON: `${DbTables.person}.save`,
  GET_PERSON: `${DbTables.person}.get`,

  //* Meal Ops
  SAVE_MEAL: `${DbTables.meal}.save`,
  GET_MEAL: `${DbTables.meal}.get`,
  UPDATE_MEAL: `${DbTables.meal}.update`,

  //* MealOrder Ops

  //* Transactions Ops
} as const;
