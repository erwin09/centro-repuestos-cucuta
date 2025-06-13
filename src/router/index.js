import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import { useStoreApp } from '../store/store';
import LoginView from '../views/auth/LoginView.vue';

const routes = [
  { path: '/', component: HomeView, requiresAuth: true },
  { path: '/login', component: LoginView },
  // { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  try {
    const store = useStoreApp();
    if (to.meta.requiresAuth && !store.isAuth) return "/login";

    if (to.fullPath == "/") return store.isAuth ? "/" : "/login";

    if (to.fullPath == "/login" && store.isAuth) return "/";

    const token = localStorage.getItem("token");

  } catch (error) {
    console.log("Error ", error);
  }
});

export default router;
