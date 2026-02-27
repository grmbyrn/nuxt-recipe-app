
import type { User } from '@supabase/supabase-js'

let listenerInitialized = false

export const useAuth = () => {
  const supabase = useSupabase()
  const user = useState<User | null>('user', () => null)
  const accessToken = useState<string | null>('accessToken', () => null);

  const fetchUser = async () => {
    if (process.server) return

    const { data, error } = await supabase.auth.getSession()
    if (error) {
      user.value = null
      accessToken.value = null
      throw new Error(error.message)
    }

    user.value = data.session?.user ?? null
    accessToken.value = data.session?.access_token ?? null
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw new Error(error.message)

    // If email confirmations are disabled, Supabase returns a session immediately.
    // If confirmations are enabled, `data.session` will be null and the user must verify email first.
    user.value = data.user ?? null
    accessToken.value = data.session?.access_token ?? null
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw new Error(error.message)

    user.value = data.user ?? null
    accessToken.value = data.session?.access_token ?? null
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    user.value = null
    accessToken.value = null
  };

  if (process.client && !listenerInitialized) {
    listenerInitialized = true
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
      accessToken.value = session?.access_token ?? null
    })
  }

  return {
    user,
    fetchUser,
    signUp,
    login,
    logout
  };
};
