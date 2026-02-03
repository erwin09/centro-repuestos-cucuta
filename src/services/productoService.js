import axios from "axios";

export default {
    getProductosTable() {
        return axios.get('/api/productos/tabla')
    }
}