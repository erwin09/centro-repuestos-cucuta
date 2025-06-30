import { defineStore } from 'pinia'

export const useStoreApp = defineStore('storeApp', {
  state: () => ({
    isAuth: false,
    rol: '',
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    login(rol) {
      this.isAuth = true
      this.rol = rol
    },
    logout() {
      this.isAuth = false
      this.rol = ''
    }
  },
})