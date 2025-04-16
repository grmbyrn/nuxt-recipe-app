import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()
  await fetchUser()  // Ensure the session is loaded before checking if the user is authenticated

  // Allow access to public pages
  if (['/login', '/sign-up'].includes(to.path)) return

  // Redirect to login if not authenticated
  if (!user.value) {
    return navigateTo('/login')
  }
})
