import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import router from "./router";
import App from './App.vue'
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_URL;
axios.defaults.baseURL = BASE_URL;

const pinia = createPinia();

// mantener estado persistente en localstorage
pinia.use(({ store }) => {
  store.$router = markRaw(router);
  const serializer = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  };

  const fromStorage = serializer.deserialize(
    window.localStorage.getItem("piniaState")
  );

  if (fromStorage) store.$patch(fromStorage);

  store.$subscribe(
    (mutation, state) => {
      window.localStorage.setItem(
        "state",
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
