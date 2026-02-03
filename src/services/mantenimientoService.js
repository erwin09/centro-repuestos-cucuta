import axios from 'axios';

export default {

    getMantenimientos() {
        return axios.get('/api/mantenimientos');
    },
    getNuevoIdMantenimiento() {
        return axios.get('/api/mantenimientos/nuevo-id');
    },
    postMantenimientos(playload) {
        return axios.post('/api/mantenimientos/create', playload);
    },
    getmantenimientosById(id) {
        return axios.get(`/api/mantenimientos/${id}`);
    },
    getMantenimientosByPlaca(placa) { 
        return axios.get(`/api/mantenimientos/placa/${placa}`);
    },
    updateMantenimientos(id, playload) {
        return axios.put(`/api/mantenimientos/${id}`, playload);
    }
    
}