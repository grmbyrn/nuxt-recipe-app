import type { Recipe as CanonicalRecipe } from './recipe';

export type Recipe = CanonicalRecipe;

export interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

// export enum Difficulty {
//     Easy = "Easy",
//     Medium = "Medium",
// }
