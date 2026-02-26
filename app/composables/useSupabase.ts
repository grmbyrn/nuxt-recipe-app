
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

let supabaseClient: ReturnType<typeof createClient> | null = null;

export const useSupabase = () => {
  if (!supabaseClient) {
    const config = useRuntimeConfig()
    const supabaseUrl = config.public.supabaseUrl
    const supabaseKey = config.public.supabaseKey
    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }
  return supabaseClient;
}
