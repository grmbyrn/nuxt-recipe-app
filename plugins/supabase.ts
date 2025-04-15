// plugins/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '~~/types/supabase'

// Declare that the injected `$supabase` is of type `SupabaseClient<Database>`
export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()

  const supabase = createClient<Database>(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  nuxtApp.provide('supabase', supabase)
})
