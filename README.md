# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# 📦 Proyecto Vite + Vue 3

Este proyecto es una base inicial para comenzar a desarrollar una aplicación frontend utilizando [Vite](https://vitejs.dev/) y [Vue 3](https://vuejs.org/).

## 🚀 Tecnologías

- [Vite](https://vitejs.dev/) – Empaquetador rápido para desarrollo moderno.
- [Vue 3](https://vuejs.org/) – Framework progresivo para construir interfaces de usuario.
- [Pinia](https://pinia.vuejs.org/) (opcional) – Manejo de estado global.
- [Vue Router](https://router.vuejs.org/) – Navegación entre páginas.
- [Tailwind CSS](https://tailwindcss.com/) (opcional) – Framework de utilidades CSS.

## 📁 Estructura del proyecto
<pre>
src/
├── assets/ # Imágenes y archivos estáticos
├── components/ # Componentes reutilizables
├── views/ # Vistas o páginas principales
├── router/ # Configuración de rutas
├── store/ # Estado global (si usas Pinia)
├── App.vue # Componente raíz
└── main.js # Punto de entrada principal
``` </pre>

# 🔧 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: 18.x o superior)
- npm (viene con Node.js)

## 📦 Instalación del proyecto

# Instala las dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en modo producción
npm run build


# ✅ Ruta básica
Crea una vista en src/views/HomeView.vue:

<template>
  <div>
    <h2>Bienvenido a la página de inicio</h2>
  </div>
</template>

Y configura tu router en src/router/index.js:
<pre> ```
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

``` </pre>

### 📦 Autoimportación de componentes con `unplugin-vue-components`

Se utiliza la librería `unplugin-vue-components` para autoimportar componentes automáticamente en los archivos `.vue`, evitando tener que escribir manualmente los `import` y registros de cada componente.

Esto hace que el código sea más limpio y fácil de mantener, especialmente al usar bibliotecas como Ant Design Vue.

```vue
<!-- Podemos usar directamente el componente sin importarlo -->
<template>
  <a-button type="primary">Aceptar</a-button>
</template>
