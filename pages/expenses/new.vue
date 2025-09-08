<template>
  <div>
    <div class="navbar">
      <div class="navbar-content">
        <h1>Submit New Expense</h1>
        <div class="user-info">
          <span>{{ user?.name }}</span>
          <NuxtLink to="/expenses" class="btn btn-secondary">Back to Expenses</NuxtLink>
          <NuxtLink to="/" class="btn btn-secondary">Dashboard</NuxtLink>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="card">
        <h2>New Expense Form</h2>
        
        <form @submit.prevent="submitExpense">
          <div class="form-group">
            <label for="amount_idr">Amount (IDR)</label>
            <input
              id="amount_idr"
              v-model.number="form.amount_idr"
              type="number"
              min="0"
              step="1000"
              required
              class="form-control"
              placeholder="Enter amount in IDR"
            >
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              required
              class="form-control"
              rows="3"
              placeholder="Enter expense description"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="receipt_url">Receipt URL (Optional)</label>
            <input
              id="receipt_url"
              v-model="form.receipt_url"
              type="text"
              class="form-control"
              placeholder="Enter receipt URL (optional)"
            >
          </div>
          
          <button type="submit" :disabled="loading" class="btn btn-primary">
            {{ loading ? 'Submitting...' : 'Submit Expense' }}
          </button>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <div v-if="success" class="success-message">
            Expense submitted successfully!
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  middleware: 'auth',
  
  data() {
    return {
      form: {
        amount_idr: null,
        description: '',
        receipt_url: ''
      },
      loading: false,
      error: '',
      success: false
    }
  },
  
  mounted() {
    this.user = this.$auth.getUser()
  },
  
  methods: {
    async submitExpense() {
      this.loading = true
      this.error = ''
      this.success = false
      
      try {
        // Prepare the JSON data
        const jsonData = {
          amount_idr: this.form.amount_idr,
          description: this.form.description,
          receipt_url: this.form.receipt_url || null
        }
        
        // Send the request using axios with JSON content type
        const response = await this.$axios.post('/api/expenses', jsonData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        this.success = true
        
        // Reset form
        this.form.amount_idr = null
        this.form.description = ''
        this.form.receipt_url = ''
        
        // Redirect to expenses list after 2 seconds
        setTimeout(() => {
          this.$router.push('/expenses')
        }, 2000)
        
      } catch (err) {
        if (err.response && err.response.data) {
          this.error = err.response.data.message || 'Failed to submit expense'
        } else {
          this.error = 'Failed to submit expense. Please try again.'
        }
        console.error('Error submitting expense:', err)
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      // This would call your useAuth composable
      console.log('Logout clicked')
      // this.$auth.logout()
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
}
</style>