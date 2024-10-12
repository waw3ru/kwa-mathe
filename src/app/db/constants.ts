export const DbTables = {
  transactions: 'transactions',
  mealOrder: 'mealOrder',
  person: 'person',
  meal: 'meal',
};

export const DbOp = {
  //* Person Ops
  QUERY_PERSON: `${DbTables.person}.query`,
  SAVE_PERSON: `${DbTables.person}.save`,
  GET_PERSON: `${DbTables.person}.get`,

  //* Meal Ops
  QUERY_MEAL: `${DbTables.meal}.query`,
  SAVE_MEAL: `${DbTables.meal}.save`,
  UPDATE_MEAL: `${DbTables.meal}.update`,

  //* MealOrder Ops
  SAVE_MEAL_ORDER: `${DbTables.mealOrder}.save`,
  GET_MEAL_ORDER: `${DbTables.mealOrder}.get`,
} as const;
