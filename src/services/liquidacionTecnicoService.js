import axios from 'axios';

export default {
    cuadre(params) {
        return axios.get('/api/liquidaciones-tecnicos/cuadre', { params });
    },
    list(params = {}) {
        return axios.get('/api/liquidaciones-tecnicos', { params });
    },
    calculate(payload) {
        return axios.post('/api/liquidaciones-tecnicos/calcular', payload);
    },
    createClientPayment(payload) {
        return axios.post('/api/liquidaciones-tecnicos/pagos-cliente', payload);
    },
    createLaborPayment(payload) {
        return axios.post('/api/liquidaciones-tecnicos/pagos-mano-obra', payload);
    }
};
