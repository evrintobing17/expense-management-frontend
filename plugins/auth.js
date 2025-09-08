export default function ({ app, store, redirect }, inject) {
  const auth = {
    user: null,
    token: null,
    
    init() {
      if (process.client) {
        const savedUser = localStorage.getItem('user')
        const savedToken = localStorage.getItem('token')
        
        if (savedUser && savedToken) {
          this.user = JSON.parse(savedUser)
          this.token = savedToken
        }
      }
    },
    
    async login(email, password) {
      try {
        const response = await app.$axios.post('/api/auth/login', {
          email,
          password,
        })
        
        this.user = response.data.user
        this.token = response.data.token
        
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('token', response.data.token)
        }
        
        return response.data
      } catch (error) {
        throw new Error('Login failed')
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      if (process.client) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
      window.location.href = '/login'
    },
    
    getToken() {
      return this.token || (process.client ? localStorage.getItem('token') : null)
    },
    
    getUser() {
      return this.user || (process.client ? JSON.parse(localStorage.getItem('user') || 'null') : null)
    },
    
    isAuthenticated() {
      return !!this.getToken()
    },
    
    isManager() {
      const user = this.getUser()
      return user && user.role === 'manager'
    }
  }
  
  auth.init()
  inject('auth', auth)
}