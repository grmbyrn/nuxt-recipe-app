
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

let supabaseClient: ReturnType<typeof createClient> | null = null;

export const useSupabase = () => {
  if (!supabaseClient) {
    const config = useRuntimeConfig()
    const supabaseUrl = config.public.supabaseUrl
    const supabaseKey = config.public.supabaseKey
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_KEY in a .env file (see README).'
      )
    }
    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }
  return supabaseClient;
}
