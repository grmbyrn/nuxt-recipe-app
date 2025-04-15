// types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: number;
          name: string;
          ingredients: Json[];
          instructions: Json[];
          prepTimeMinutes: number;
          cookTimeMinutes: number;
          servings: number;
          difficulty: string;
          cuisine: string;
          caloriesPerServing: number;
          tags: Json[];
          userId: number;
          image: string;
          rating: number;
          reviewCount: number;
          mealType: Json[];
        };
        Insert: {
          id?: number;
          name: string;
          ingredients: Json[];
          instructions: Json[];
          prepTimeMinutes: number;
          cookTimeMinutes: number;
          servings: number;
          difficulty: string;
          cuisine: string;
          caloriesPerServing: number;
          tags: Json[];
          userId: number;
          image: string;
          rating: number;
          reviewCount: number;
          mealType: Json[];
        };
        Update: {
          id?: number;
          name?: string;
          ingredients?: Json[];
          instructions?: Json[];
          prepTimeMinutes?: number;
          cookTimeMinutes?: number;
          servings?: number;
          difficulty?: string;
          cuisine?: string;
          caloriesPerServing?: number;
          tags?: Json[];
          userId?: number;
          image?: string;
          rating?: number;
          reviewCount?: number;
          mealType?: Json[];
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}