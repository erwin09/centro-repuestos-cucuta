import axios from 'axios';

export default {
    list() {
        return axios.get('/api/tecnicos');
    },
    get(id) {
        return axios.get(`/api/tecnicos/${id}`);
    },
    create(payload) {
        return axios.post('/api/tecnicos', payload);
    },
    update(id, payload) {
        return axios.put(`/api/tecnicos/${id}`, payload);
    },
    remove(id) {
        return axios.delete(`/api/tecnicos/${id}`);
    },
    assignments(id) {
        return axios.get(`/api/tecnicos/${id}/asignaciones`);
    },
    assign(payload) {
        return axios.post('/api/tecnicos/asignaciones', payload);
    },
    updateAssignment(id, payload) {
        return axios.put(`/api/tecnicos/asignaciones/${id}`, payload);
    }
};
