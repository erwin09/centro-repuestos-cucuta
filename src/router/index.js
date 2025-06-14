import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import { useStoreApp } from '../store/store';
import LoginView from '../views/auth/LoginView.vue';
import AboutView from '../views/AboutView.vue';



const routes = [
  { path: '/', component: HomeView, name: 'home', meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/about', name: 'about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  try {
    const store = useStoreApp();

    const isAuth = store.isAuth;

    if (to.meta.requiresAuth && !isAuth) {
      if (to.fullPath !== "/login") return "/login";
      return; // Ya está en /login, no redirigir otra vez
    }

    if (to.fullPath === "/" && !isAuth) return "/login";

    if (to.fullPath === "/login" && isAuth) return "/";

    // No redirección: dejar continuar
    return;
  } catch (error) {
    console.log("Error ", error);
    return;
  }
});


export default router;
