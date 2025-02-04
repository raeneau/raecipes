import { z } from 'zod';

/**
 * Meal type enum matching database constraints
 */
export const MealType = {
  Snack: 'snack',
  Meal: 'meal',
  SideDish: 'side dish',
  Appetizer: 'appetizer',
  Dessert: 'dessert',
} as const;

/**
 * Ingredient category enum matching database constraints
 */
export const IngredientCategory = {
  Meat: 'meat',
  Dairy: 'dairy',
  Produce: 'produce',
  Pantry: 'pantry',
} as const;

/**
 * Measurement unit enum
 */
export const MeasurementUnit = {
  Teaspoon: 'teaspoon',
  Tablespoon: 'tablespoon',
  Cup: 'cup',
  Ounce: 'ounce',
  Pound: 'pound',
  Gram: 'gram',
  Kilogram: 'kilogram',
  Milliliter: 'milliliter',
  Liter: 'liter',
  Piece: 'piece',
  Pinch: 'pinch',
  ToTaste: 'to taste',
} as const;

/**
 * Ingredient schema validation
 */
export const IngredientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Ingredient name is required'),
  category: z.nativeEnum(IngredientCategory),
});

/**
 * Recipe ingredient schema validation with ingredient details
 */
export const RecipeIngredientSchema = z.object({
  id: z.string().uuid().optional(),
  ingredient_id: z.string().uuid(),
  name: z.string(),  // From the joined ingredient
  category: z.nativeEnum(IngredientCategory),  // From the joined ingredient
  amount: z.number().positive().optional(),
  measurement: z.string().optional(),
  is_optional: z.boolean().default(false),
});

/**
 * Recipe schema validation matching database schema
 */
export const RecipeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Recipe name is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  ingredients: z.array(RecipeIngredientSchema).default([]),
});

export type MealType = typeof MealType[keyof typeof MealType];
export type IngredientCategory = typeof IngredientCategory[keyof typeof IngredientCategory];
export type MeasurementUnit = typeof MeasurementUnit[keyof typeof MeasurementUnit];
export type Ingredient = z.infer<typeof IngredientSchema>;
export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;

export type CreateRecipeDTO = Omit<Recipe, 'id'>;
export type UpdateRecipeDTO = Partial<CreateRecipeDTO>;
export type CreateIngredientDTO = Omit<Ingredient, 'id'>; 