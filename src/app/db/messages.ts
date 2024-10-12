export type DbProcedureMessageType = Lowercase<
  keyof typeof DbProcedureMessages
>;
export const DbProcedureMessages = {
  SAVE_PERSON: 'save_person',
  GET_CUSTOMERS: 'get_customers',
  GET_EMPLOYEES: 'get_employees',
};
