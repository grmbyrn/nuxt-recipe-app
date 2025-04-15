import { useSupabase } from './useSupabase'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const supabase = useSupabase()
  const user = useState<User | null>('user', () => null)

  const fetchUser = async () => {
    // Use supabase.auth.getUser() to get the authenticated user
    const { data, error } = await supabase.auth.getUser()

    const { data: sessionData } = await supabase.auth.getSession()

    if (error) {
        user.value = null
        return
    }
    
    user.value = data.user
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
  }

  return {
    user,
    fetchUser,
    signUp,
    login,
    logout
  }
}
