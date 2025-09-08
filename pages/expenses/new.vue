<template>
  <div>
    <div class="navbar">
      <div class="navbar-content">
        <h1>Submit New Expense</h1>
        <div class="user-info">
          <NuxtLink to="/expenses" class="btn btn-secondary">Back to Expenses</NuxtLink>
          <button @click="auth.logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label">Amount (IDR)</label>
            <div class="currency-input">
              <span class="currency-prefix">Rp</span>
              <input 
                v-model="form.amount" 
                type="number" 
                class="form-input" 
                placeholder="Enter amount"
                min="10000"
                max="50000000"
                required
                style="padding-left: 40px;"
              >
            </div>
            <div v-if="form.amount >= 1000000" style="color: #856404; margin-top: 5px; font-size: 14px;">
              ⚠️ This expense requires manager approval (≥ Rp 1.000.000)
            </div>
            <div v-else-if="form.amount > 0" style="color: #28a745; margin-top: 5px; font-size: 14px;">
              ✓ This expense will be auto-approved
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea 
              v-model="form.description" 
              class="form-textarea" 
              placeholder="Enter expense description..."
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Receipt URL (Optional)</label>
            <input 
              v-model="form.receipt_url" 
              type="url" 
              class="form-input" 
              placeholder="https://example.com/receipt.jpg"
            >
          </div>
          
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="success" class="success">{{ success }}</div>
          
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="loading"
          >
            {{ loading ? 'Submitting...' : 'Submit Expense' }}
          </button>
          
          <NuxtLink to="/expenses" class="btn btn-secondary">Cancel</NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  amount: '',
  description: '',
  receipt_url: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const api = useApi()
const auth = useAuth()

if (!auth.isAuthenticated()) {
  navigateTo('/login')
}

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  loading.value = true
  
  try {
    const response = await api.post('/api/expenses', {
      amount_idr: parseInt(form.value.amount),
      description: form.value.description,
      receipt_url: form.value.receipt_url || undefined
    })
    
    success.value = 'Expense submitted successfully!'
    form.value = { amount: '', description: '', receipt_url: '' }
    
    setTimeout(() => {
      navigateTo('/expenses')
    }, 2000)
    
  } catch (err) {
    error.value = 'Failed to submit expense. Please try again.'
    console.error('Error submitting expense:', err)
  } finally {
    loading.value = false
  }
}
</script>