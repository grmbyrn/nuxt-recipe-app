import { useSupabase } from './useSupabase'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const supabase = useSupabase()
  const user = useState<User | null>('user', () => null)
  const accessToken = useState<string | null>('accessToken', () => null)

  const fetchUser = async () => {
    const { data: sessionData, error } = await supabase.auth.getSession()
  
    if (error) {
      console.error('Error fetching session:', error)
      user.value = null
      accessToken.value = null
      return
    }
  
    const session = sessionData?.session
    if (session && session.user) {
      user.value = session.user
      accessToken.value = session.access_token
    } else {
      user.value = null
      accessToken.value = null
    }
  }

  // On app load, we should immediately check the session.
  const loadUserOnStartup = () => {
    fetchUser() // Get session when app initializes
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    await fetchUser()
  }

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    await fetchUser()
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    accessToken.value = null
  }

  // Listen for auth state changes to update the user state on page reload
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      user.value = session.user
      accessToken.value = session.access_token
    } else {
      user.value = null
      accessToken.value = null
    }
  })

  // Load the user session on startup
  loadUserOnStartup()

  return {
    user,
    fetchUser,
    signUp,
    login,
    logout
  }
}
