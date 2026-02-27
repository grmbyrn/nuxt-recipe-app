export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabase()
  nuxtApp.provide('supabase', supabase)
})
