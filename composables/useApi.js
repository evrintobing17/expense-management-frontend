export const useApi = () => {
  const apiBase = useRuntimeConfig().public.apiBase;
  const auth = useAuth();
  
  const request = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    const token = auth.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    try {
      const response = await $fetch(`${apiBase}${url}`, {
        ...options,
        headers,
      });
      
      return response;
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
        navigateTo('/login');
      }
      throw error;
    }
  };
  
  return {
    get: (url) => request(url),
    post: (url, data) => request(url, { method: 'POST', body: data }),
    put: (url, data) => request(url, { method: 'PUT', body: data }),
    delete: (url) => request(url, { method: 'DELETE' }),
  };
};