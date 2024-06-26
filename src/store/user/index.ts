import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  // state
  let fistName = ref<string>('like')
  let lastName = ref<string>('ns')
  
  // getters
  const fullName = computed(() => {
    return `${fistName.value}-${lastName.value}`
  })

  //action
  const changeFirstName = (newName: string) => {
    fistName.value = newName
  }
  return {fistName, lastName, fullName, changeFirstName}
})
export const useCounterStore = defineStore('counter', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'count',
        storage: localStorage,
      }
    ],
  },
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {

  },
  actions: {
    addCount() {
      this.count++
    }
  }
})