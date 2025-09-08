export default function ({ app, redirect, error }) {
  // Only run on client side
  if (process.client) {
    if (!app.$auth.isAuthenticated()) {
      return redirect('/login')
    }
    
    // You can also add token validation/refresh logic here if needed
    const token = app.$auth.getToken()
    if (token) {
      // Set axios header in middleware too for good measure
      app.$axios.setToken(token, 'Bearer')
    }
  }
}