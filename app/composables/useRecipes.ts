import type { PostgrestError } from '@supabase/supabase-js'
import type { Database } from '~/types/supabase'

type RecipeRow = Database['public']['Tables']['recipes']['Row']
type RecipeInsert = Database['public']['Tables']['recipes']['Insert']
type RecipeUpdate = Database['public']['Tables']['recipes']['Update']

export const useRecipes = () => {
  const supabase = useSupabase()

  const getAllRecipes = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('id', { ascending: true })

    return { data: (data ?? []) as RecipeRow[], error }
  }

  const getMyRecipes = async (userId: string) => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('userId', userId)
      .order('id', { ascending: true })

    return { data: (data ?? []) as RecipeRow[], error }
  }

  const getRecipeById = async (id: number) => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single()

    return { data: data as RecipeRow | null, error }
  }

  const createRecipe = async (payload: RecipeInsert) => {
    const { data, error } = await supabase
      .from('recipes')
      .insert([payload])
      .select('*')
      .single()

    return { data: data as RecipeRow | null, error }
  }

  const updateRecipe = async (id: number, payload: RecipeUpdate & { userId?: string }) => {
    const { data, error } = await supabase
      .from('recipes')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single()

    return { data: data as RecipeRow | null, error }
  }

  const deleteRecipe = async (id: number) => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)

    return { error }
  }

  return {
    getAllRecipes,
    getMyRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
  }
}

