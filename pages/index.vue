<template>
  <div>
    <div class="navbar">
      <div class="navbar-content">
        <h1>Expense Management System</h1>
        <div class="user-info">
          <span>Hello, {{ $auth.getUser()?.name }}</span>
          <button @click="$auth.logout()" class="btn btn-secondary">Logout</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div v-if="$auth.isManager()" class="card">
        <h2>Manager Dashboard</h2>
        <div style="margin-top: 20px;">
          <nuxt-link to="/expenses/pending" class="btn btn-primary">
            View Pending Approvals
          </nuxt-link>
        </div>
      </div>
      
      <div class="card">
        <h2>My Expenses</h2>
        <div style="margin-top: 20px;">
          <nuxt-link to="/expenses" class="btn btn-primary">
            View My Expenses
          </nuxt-link>
          <nuxt-link to="/expenses/new" class="btn btn-success">
            Submit New Expense
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  
  mounted() {
    if (!this.$auth.isAuthenticated()) {
      this.$router.push('/login')
    }
  }
}
</script>