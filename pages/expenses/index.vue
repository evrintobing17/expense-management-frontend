<template>
  <div>
    <div class="navbar">
      <div class="navbar-content">
        <h1>My Expenses</h1>
        <div class="user-info">
          <span>{{ user?.name }}</span>
          <NuxtLink to="/expenses/new" class="btn btn-success">New Expense</NuxtLink>
          <NuxtLink to="/" class="btn btn-secondary">Dashboard</NuxtLink>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="card">
        <h2>Expense History</h2>
        
        <div v-if="loading" class="loading">Loading expenses...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else-if="expenses.length === 0" class="loading">No expenses found.</div>
        
        <div v-else>
          <div v-for="expense in expenses" :key="expense.id" class="expense-item">
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <div style="flex: 1;">
                <h3>{{ formatIDR(expense.amount_idr) }}</h3>
                <p>{{ expense.description }}</p>
                <p><small>Submitted: {{ formatDate(expense.submitted_at) }}</small></p>
                <p v-if="expense.receipt_url" style="margin-top: 5px;">
                  <a :href="expense.receipt_url" target="_blank" style="color: #007bff; text-decoration: none;">
                    📎 View Receipt
                  </a>
                </p>
              </div>
              <div style="text-align: right;">
                <span :class="`status status-${expense.status}`">
                  {{ formatStatus(expense.status) }}
                </span>
                <div v-if="expense.requires_approval" style="margin-top: 5px; font-size: 12px; color: #666;">
                  Requires approval
                </div>
                <div v-if="expense.auto_approved" style="margin-top: 5px; font-size: 12px; color: #666;">
                  Auto-approved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Use middleware for Nuxt 2
  middleware: 'auth',
  
  data() {
    return {
      expenses: [],
      loading: true,
      error: '',
      user: null
    }
  },
  
  mounted() {
    this.user = this.$auth.getUser()
    this.fetchExpenses()
  },
  
  methods: {
    async fetchExpenses() {
    try {
      // Make sure token is set before making the request
      const token = this.$auth.getToken()
      if (token) {
        this.$axios.setToken(token, 'Bearer')
      }
      
      const response = await this.$axios.get('/api/expenses')
      this.expenses = response.data
    } catch (err) {
      if (err.response && err.response.status === 401) {
        this.error = 'Session expired. Please login again.'
        this.$auth.logout()
      } else {
        this.error = 'Failed to fetch expenses'
        console.error('Error fetching expenses:', err)
      }
    } finally {
      this.loading = false
    }
  },
    
    formatIDR(amount) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount)
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    formatStatus(status) {
      const statusMap = {
        'pending': 'Pending',
        'awaiting_approval': 'Awaiting Approval',
        'approved': 'Approved',
        'rejected': 'Rejected',
        'auto_approved': 'Auto Approved',
        'processing': 'Processing',
        'completed': 'Completed',
        'failed': 'Failed'
      }
      return statusMap[status] || status
    },
    
    logout() {
      this.$auth.logout()
    }
  }
}
</script>