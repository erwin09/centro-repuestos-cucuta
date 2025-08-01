import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import { useStoreApp } from '../store/store';
import LoginView from '../views/auth/LoginView.vue';
import AboutView from '../views/AboutView.vue';
import UsuarioView from '../views/UsuarioView.vue';
import RepuestosView from '../views/RepuestosView.vue';
import RegistroUsuarioView from '../views/RegistroUSuario.vue';
import ejercico from '../views/ejercico.vue';
import RegistroRepuesto from '../views/RegistroRepuesto.vue';
import MantenimientosView from '../views/MantenimientoView.vue';
import ServiciosView from '../views/ServiciosView.vue';
import NotificacionesView from '../views/NotificacionesView.vue';
import CitasClienteView from '../views/CitasClienteView.vue';
import HomeClientView from '../views/HomeClientView.vue';
import ServiciosClienteView from '../views/ServiciosClienteView.vue';
import RepuestosClienteView from '../views/RepuestosClienteView.vue';
import MantenimientosClienteView from '../views/MantenimientosClienteView.vue';
import CitasView from '../views/CitasView.vue';



const routes = [
  { path: '/', component: HomeView, name: 'home', meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/about', name: 'about', component: AboutView, meta: {requiresAuth: true} },
  { path: '/usuarios', name: 'usuarios', component: UsuarioView, meta: {requiresAuth: true} },
  { path: '/repuestos', name: 'productos', component: RepuestosView, meta: {requiresAuth: true} },
  { path: '/ejercicio', name: 'ejercicio', component: ejercico },
  { path: '/registroUsuario', name: 'registroUsuiario', component: RegistroUsuarioView, meta: {requiresAuth: true} },
  { path: '/registroRepuesto', name: 'registroRepuesto', component: RegistroRepuesto, meta: {requiresAuth: true} },
  { path: '/mantenimientos', name: 'mantenimientos', component: MantenimientosView, meta: {requiresAuth: true} },
  { path: '/servicios', name: 'servicios', component: ServiciosView, meta: {requiresAuth: true} },
  { path: '/notificaciones', name: 'notificaciones', component: NotificacionesView, meta: {requiresAuth: true} },
  { path: '/citasCliente', name: 'citasCliente', component: CitasClienteView, meta: {requiresAuth: true} },
  { path: '/HomeClient', name: 'homeCliente', component: HomeClientView, meta: {requiresAuth: true} },
  { path: '/serviciosCliente', name: 'serviciosCliente', component: ServiciosClienteView, meta: {requiresAuth: true} },
  { path: '/repuestosCliente', name: 'repuestosCliente', component: RepuestosClienteView, meta: {requiresAuth: true} },
  { path: '/mantenimientosCliente', name: 'mantenimientoCliente', component: MantenimientosClienteView, meta: {requiresAuth: true} },
  { path: '/citas', name: 'citas', component: CitasView, meta: {requiresAuth: true} },
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
