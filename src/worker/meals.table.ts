import { MealRecord } from '../common';

export class MealsTable {
  ops() {
    //
  }

  saveMeal(data: MealRecord) {
    //
  }

  getAllMeal() {
    //
  }

  getMeal(mealId: string) {
    //]
  }

  updateMeal(updates: { mealId: string; data: Omit<MealRecord, 'mealId'> }) {
    //
  }
}
