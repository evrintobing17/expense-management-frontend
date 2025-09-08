export const useAuth = () => {
  const user = useState('user', () => null);
  const token = useState('token', () => null);
  
  const login = async (email, password) => {
    try {
      const api = useApi();
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });
      
      user.value = response.user;
      token.value = response.token;
      
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigateTo('/login');
  };
  
  const getToken = () => {
    return token.value || localStorage.getItem('token');
  };
  
  const getUser = () => {
    return user.value || JSON.parse(localStorage.getItem('user') || 'null');
  };
  
  const isAuthenticated = () => {
    return !!getToken();
  };
  
  const isManager = () => {
    const currentUser = getUser();
    return currentUser?.role === 'manager';
  };
  
  if (process.client) {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser);
      token.value = savedToken;
    }
  }
  
  return {
    user: readonly(user),
    login,
    logout,
    getToken,
    getUser,
    isAuthenticated,
    isManager,
  };
};