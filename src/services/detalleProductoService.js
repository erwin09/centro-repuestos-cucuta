import axios from 'axios';

export default {
      getDetalleProducto(id) {
    return axios.get(`/api/detalleproducto/${id}`)
  },
}
