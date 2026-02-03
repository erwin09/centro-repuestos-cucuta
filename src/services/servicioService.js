import axios from "axios";

export default {
    getServicios() { 
        return axios.get('/api/servicios');
}
}