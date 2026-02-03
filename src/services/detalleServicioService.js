import axios from "axios";

export default {
   getDetalleServicio(id) {
    return axios.get(`/api/detalleservicio/${id}`)
  },
}