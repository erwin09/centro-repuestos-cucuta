import axios from 'axios';

export default {
    getVehiculosByCliente(Num_doc) {
        return axios.get(`/api/vehiculos/usuario/${Num_doc}`);
    }
}