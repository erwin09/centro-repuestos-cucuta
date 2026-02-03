import axios from "axios";

export default {
    getClientes() {
        return axios.get('/api/clientes');
    }
}