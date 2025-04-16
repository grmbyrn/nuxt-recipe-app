import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, fetchUser } = useAuth()

  // Only run on client
  if (process.server) return

  // Wait for Supabase to restore session on refresh
  await fetchUser()

  // Allow access to public pages
  if (['/login', '/sign-up'].includes(to.path)) return

  // Redirect to login if no user after session is restored
  if (!user.value) {
    return navigateTo('/login')
  }
})
