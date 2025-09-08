export const useApi = () => {
  const { $axios } = useNuxtApp()
  
  return {
    async get(url) {
      try {
        const response = await $axios.get(url)
        return response.data
      } catch (error) {
        console.error('API GET error:', error)
        throw error
      }
    },
    
    async post(url, data) {
      try {
        const response = await $axios.post(url, data)
        return response.data
      } catch (error) {
        console.error('API POST error:', error)
        throw error
      }
    },
    
    async put(url, data) {
      try {
        const response = await $axios.put(url, data)
        return response.data
      } catch (error) {
        console.error('API PUT error:', error)
        throw error
      }
    },
    
    async delete(url) {
      try {
        const response = await $axios.delete(url)
        return response.data
      } catch (error) {
        console.error('API DELETE error:', error)
        throw error
      }
    }
  }
}