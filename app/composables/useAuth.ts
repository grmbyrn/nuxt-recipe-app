
// Stubbed auth composable for migration
export const useAuth = () => {
  const user = useState<any | null>('user', () => null);
  const accessToken = useState<string | null>('accessToken', () => null);

  const fetchUser = async () => {
    // TODO: Implement real auth logic
    user.value = null;
    accessToken.value = null;
  };

  const signUp = async (email: string, password: string) => {
    // TODO: Implement real sign up logic
    user.value = { email };
    accessToken.value = 'dummy-token';
  };

  const login = async (email: string, password: string) => {
    // TODO: Implement real login logic
    user.value = { email };
    accessToken.value = 'dummy-token';
  };

  const logout = async () => {
    user.value = null;
    accessToken.value = null;
  };

  // Load the user session on startup
  fetchUser();

  return {
    user,
    fetchUser,
    signUp,
    login,
    logout
  };
};
