export default {
  server: {
    host: '0.0.0.0'
  },
  mode: 'universal',
  css: ['@/assets/css/main.css'],
  plugins: [
    '@/plugins/auth.js',
    '@/plugins/axios.js'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:8080'
  },
  router: {
    middleware: 'auth'
  },
  build: {
    extend(config, ctx) {
    }
  }
}