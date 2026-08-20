import { createApp, markRaw } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import router from "./router";
import App from './App.vue'
import axios from 'axios';
import { useStoreApp } from './store/store';
const BASE_URL = import.meta.env.VITE_APP_API_URL;
axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
  const storedState = window.localStorage.getItem('storeApp');
  const token = storedState ? JSON.parse(storedState).token : null;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const store = useStoreApp();
      store.logout();
      window.localStorage.removeItem('storeApp');
      if (window.location.pathname !== '/login') window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const pinia = createPinia();

// mantener estado persistente en localstorage
pinia.use(({ store }) => {
  store.$router = markRaw(router);
  const serializer = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  };

  const fromStorage = serializer.deserialize(
    window.localStorage.getItem("storeApp")
  );

  if (fromStorage) store.$patch(fromStorage);

  store.$subscribe(
    (mutation, state) => {
      window.localStorage.setItem(
        "storeApp",
        serializer.serialize(
          state.hasOwnProperty("storeApp") ? state.storeApp : state
        )
      );
    },
    {
      detached: true,
    }
  );
});

const app = createApp(App);
//app.use(interceptor);
app.use(pinia);
app.use(router);

app.mount("#app");
