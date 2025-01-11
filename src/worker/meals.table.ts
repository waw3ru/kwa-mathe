import { MealRecord, MealsTableOp } from '../utils.worker';

export class MealsTable implements MealsTableOp {
  save(data: MealRecord): [void, Error | undefined] {
    throw new Error('Method not implemented.');
  }

  getAll(): [MealRecord[], Error | undefined] {
    throw new Error('Method not implemented.');
  }

  get(mealId: string): [MealRecord, Error | undefined] {
    throw new Error('Method not implemented.');
  }

  update(
    mealId: string,
    data: Omit<MealRecord, 'mealId'>
  ): [void, Error | undefined] {
    throw new Error('Method not implemented.');
  }
}
