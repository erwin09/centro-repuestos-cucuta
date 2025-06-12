import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import router from "./router";
import App from './App.vue'
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_URL;
axios.defaults.baseURL = BASE_URL;

const pinia = createPinia();

const app = createApp(App);
//app.use(interceptor);
app.use(pinia);
app.use(router);

app.mount("#app");
