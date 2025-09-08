<template>
  <div class="container">
    <div class="card" style="max-width: 400px; margin: 100px auto;">
      <h2 style="text-align: center; margin-bottom: 20px;">Login</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input 
            v-model="email" 
            type="email" 
            class="form-input" 
            placeholder="Enter your email"
            required
          >
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="form-input" 
            placeholder="Enter your password"
            required
          >
        </div>
        
        <div v-if="error" class="error">{{ error }}</div>
        
        <button 
          type="submit" 
          class="btn btn-primary" 
          style="width: 100%;"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      
      <div style="margin-top: 20px; text-align: center;">
        <p>Demo Credentials:</p>
        <p><strong>Manager:</strong> manager@example.com / password</p>
        <p><strong>Employee:</strong> employee@example.com / password</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  },
  
  methods: {
    async handleLogin() {
      this.error = ''
      this.loading = true
      
      try {
        await this.$auth.login(this.email, this.password)
        this.$router.push('/')
      } catch (err) {
        this.error = 'Invalid email or password'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>