import axios from "axios";

export default {
    getNotificaciones() {
        return axios.get('/api/notificaciones');
    }
}