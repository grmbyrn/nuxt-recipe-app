import { ref } from 'vue';
import { useSupabase } from '~/composables/useSupabase';
import type { Recipe } from '../../types/recipe';
import type { Database } from '../../types/supabase';

export function useRecipes() {
  const recipes = ref<Recipe[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function fetchRecipes(limit = 6) {
    loading.value = true;
    error.value = null;
    const supabase = useSupabase();
    const { data, error: fetchError } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (fetchError) {
      error.value = fetchError.message;
      recipes.value = [];
    } else {
      recipes.value = (data ?? []) as Recipe[];
    }
    loading.value = false;
  }

  async function getRecipeById(id: number) {
    const supabase = useSupabase();
    const { data, error: fetchError } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
    return { data: data as Recipe | null, error: fetchError };
  }

  async function getMyRecipes(userId: string) {
    const supabase = useSupabase();
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('userId', userId)
      .order('id', { ascending: true });
    return { data: (data ?? []) as Recipe[], error };
  }

  async function deleteRecipe(id: number) {
    const supabase = useSupabase();
    const { error } = await supabase.from('recipes').delete().eq('id', id);
    return { error };
  }

  async function updateRecipe(
    id: number,
    payload: Partial<Recipe> | Partial<Database['public']['Tables']['recipes']['Update']>
  ) {
    loading.value = true;
    error.value = null;
    const supabase = useSupabase();
    const fromTable: any = supabase.from('recipes') as any;
    // Remove any explicit null values since DB Update types expect `undefined` for omitted fields,
    // and `null` is not assignable for numeric fields. Omitting nulls keeps existing DB values.
    const sanitizedPayload: Record<string, unknown> = Object.fromEntries(
      Object.entries(payload as Record<string, unknown>).filter(
        ([, v]) => v !== null && v !== undefined
      )
    );
    const { data, error: updateError } = await fromTable
      .update(sanitizedPayload as any)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      error.value = updateError.message;
      loading.value = false;
      return { data: null as Recipe | null, error: updateError };
    }

    const updated = data as Recipe | null;
    if (updated) {
      const updatedRecipe: Recipe = updated as Recipe;
      const idx = recipes.value.findIndex((r) => r.id === updatedRecipe.id);
      if (idx !== -1) {
        Object.assign(recipes.value[idx] as any, updatedRecipe as any);
      } else {
        recipes.value.unshift(updatedRecipe as any);
      }
    }

    loading.value = false;
    return { data: updated, error: null };
  }

  async function getAllRecipes() {
    const supabase = useSupabase();
    const { data, error: fetchError } = await supabase
      .from('recipes')
      .select('*')
      .order('id', { ascending: true });
    return { data: (data ?? []) as Recipe[], error: fetchError };
  }

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    getRecipeById,
    getMyRecipes,
    deleteRecipe,
    updateRecipe,
    getAllRecipes,
  };
}
