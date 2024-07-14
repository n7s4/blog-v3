import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const userStore = defineStore('user', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'isDark',
        storage: localStorage,
      }
    ]
  },
  state: () => {
    return {
      isDark: isDark.value
    }
  },
  getters: {
    getIsDark: function(): boolean {
      return this.isDark
    }
  },
  actions: {
    setToggleDark() {
      toggleDark()
      this.isDark = isDark.value
    }
  },
})
export default userStore