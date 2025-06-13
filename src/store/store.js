import { defineStore } from 'pinia'

export const useStoreApp = defineStore('storeApp', {
  state: () => {
    return { 
      isAuth: false,
      count: 0
     }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})