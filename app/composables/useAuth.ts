
// Stubbed auth composable for migration
export const useAuth = () => {
  const user = useState<any | null>('user', () => null);
  const accessToken = useState<string | null>('accessToken', () => null);

  const fetchUser = async () => {
    if (process.client) {
      // Optionally implement session restore from localStorage
      const token = localStorage.getItem('jwt');
      if (token) {
        accessToken.value = token;
        // Optionally decode token for user info
        user.value = {};
      } else {
        user.value = null;
        accessToken.value = null;
      }
    }
  };

  const signUp = async (email: string, password: string) => {
    const res = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Sign up failed');
    // Optionally auto-login after signup
    if (process.client) {
      await login(email, password);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    const data = await res.json();
    if (process.client) {
      accessToken.value = data.token;
      localStorage.setItem('jwt', data.token);
      user.value = { email };
    }
  };

  const logout = async () => {
    if (process.client) {
      user.value = null;
      accessToken.value = null;
      localStorage.removeItem('jwt');
    }
  };

  if (process.client) {
    fetchUser();
  }

  return {
    user,
    fetchUser,
    signUp,
    login,
    logout
  };
};
