export default function ({ app, $axios, store }) {
  // Request interceptor to add auth token
  $axios.onRequest((config) => {
    const token = app.$auth?.getToken()
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  })
  
  // Response interceptor to handle auth errors
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    
    if (code === 401) {
      // Unauthorized - redirect to login
      app.$auth.logout()
    }
    
    return Promise.reject(error)
  })
}