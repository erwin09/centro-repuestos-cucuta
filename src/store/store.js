import { defineStore } from 'pinia'

export const useStoreApp = defineStore('storeApp', {
  state: () => ({
    isAuth: false,
    rol: '',
    Num_doc: '',
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    login(rol, Num_doc) {
      this.isAuth = true
      this.rol = rol
      this.Num_doc = Num_doc
    },
    logout() {
      this.isAuth = false
      this.rol = ''
      this.Num_doc = ''
    }
  },
})