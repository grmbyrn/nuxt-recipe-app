import { ref } from 'vue';
import { useSupabase } from '~/composables/useSupabase';
import type { Recipe } from '../../types/recipe';

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
    getAllRecipes,
  };
}
