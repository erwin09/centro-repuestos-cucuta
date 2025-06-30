import { defineStore } from 'pinia'

export const useStoreApp = defineStore('storeApp', {
  state: () => {
    return {
      isAuth: false,
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    login() {
      this.isAuth = true
    },
  },
})