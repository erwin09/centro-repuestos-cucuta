<template>
  <a-row :gutter="16">
    <!-- Formulario -->
    <a-col :span="12">
      <a-card title="Agendar Cita" style="max-width: 500px; margin: auto">
        <a-form layout="vertical" @submit.prevent="crearCita">

          <a-form-item label="Vehículo">
            <a-select v-model:value="form.ID_vehiculo" placeholder="Selecciona tu vehículo">
              <a-select-option v-for="vehiculo in vehiculos" :key="vehiculo.placa" :value="vehiculo.placa">
                {{ vehiculo.placa }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Diagnostico" name="servicio">
            <a-input v-model:value="form.nombre" placeholder="Escribe su inconveniente" />
          </a-form-item>

          <a-form-item label="Fecha">
            <a-date-picker v-model:value="form.fecha" show-time format="YYYY-MM-DD HH:mm"
              placeholder="Selecciona fecha y hora" style="width: 100%" />
          </a-form-item>

          <a-button type="primary" html-type="submit">Agendar</a-button>
        </a-form>
      </a-card>
    </a-col>

    <a-col :span="12">
      <a-card title="Tus Citas">
        <table class="tabla-citas">
          <thead>
            <tr>
              <th>Codigo cita</th>
              <th>Placa</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cita in citas" :key="cita.Id_cita">
              <td>{{ cita.codigo }}</td>

              <td>{{ cita.placa }}</td>

              <td>{{ cita.nombre }}</td>

              <td>{{ formatearFecha(cita.fecha) }}</td>

              <td>{{ cita.estado }}</td>

              <td>
                <template v-if="cita.estado !== 'cancelado' && cita.estado !== 'cumplida' && cita.estado !== 'incumplida'">
                  <button class="btn cancelar" @click="cancelarEdicion(cita)">Cancelar</button>
                </template>
              </td>
            </tr>

          </tbody>
        </table>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useStoreApp } from '../store/store'
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

const storeApp = useStoreApp()
const citas = ref([])

const form = ref({
  Id_cita: '',
  Num_doc: storeApp.Num_doc,
  nombre: null,
  fecha: null,
  ID_vehiculo: null,
  estado: 'pendiente'
});

const clientes = ref({
  nombre_usuario: '',
  telefono: '',
});

const vehiculos = ref([]);

const cargarDatosCliente = async (Num_doc) => {
  try {
    if (!Num_doc) return;
    const { data } = await axios.get(`/api/clientes/${Num_doc}`)
    if (data.length > 0) {
      clientes.value.nombre_usuario = data[0].nombre_usuario;
      clientes.value.telefono = data[0].telefono;
      console.log("Nombre:", clientes.value.nombre_usuario);
      console.log("Teléfono:", clientes.value.telefono);
    } else {
      console.warn("Cliente no encontrado");
    }

  } catch (err) {
    console.error("Error cargando clientes:".err)
  }
}

const cargarVehiculos = async (Num_doc) => {
  try {
    if (!Num_doc) return;
    const response = await axios.get(`/api/vehiculos/usuario/${Num_doc}`);
    vehiculos.value = response.data;
  } catch (err) {
    console.error("Error cargando vehículos:", err);
  }
};

const cargarCitasCliente = async (Num_doc) => {
  const [serRes] = await Promise.all([
    axios.get(`/api/citas/usuario/${Num_doc}`),
  ])
  citas.value = serRes.data.result.map(n => ({
    ...n,
    editando: false
  }))
};

const formatearFecha = (fecha) => {
  return dayjs(fecha).format('DD/MM/YYYY hh:mm A')
}

const cancelarEdicion = async (cita) => {
  try {
    await axios.put(`/api/citas/${cita.codigo}`, {
      estado: 'cancelado'
    });

    cita.estado = 'cancelado';
    cita.editando = false;

    message.success('Cita cancelada');
  } catch (error) {
    console.error('Error al cancelar la cita:', error);
    message.error('No se pudo cancelar la cita');
  }
};


onMounted(() => {
  form.value.Id_cita = generarCodigo();
  form.value.Num_doc = storeApp.Num_doc
  cargarVehiculos(storeApp.Num_doc)
  cargarDatosCliente(storeApp.Num_doc)
  cargarCitasCliente(storeApp.Num_doc)
  generarCodigo()
});

const generarCodigo = async () => {
  try {
    const res = await axios.get('/api/citas/nuevoId')
    form.value.Id_cita = res.data.nuevoId
    console.log("data id cita", res.data.nuevoId);

    console.log("nuevo id", form.value.Id_cita);

  } catch (error) {
    console.error(error)
    message.error('No se pudo generar el ID de mantenimiento')
  }
};

const crearCita = async () => {

  if (dayjs(form.value.fecha).isBefore(dayjs())) {
    return message.error('No puedes agendar una cita en una fecha y hora que ya han pasado');
  }
  try {
    const payload = {
      ...form.value,
      nombre_usuario: clientes.value.nombre_usuario,
      telefono: clientes.value.telefono,
      fecha: dayjs(form.value.fecha).format('YYYY-MM-DD HH:mm:ss'),
    };

    await axios.post('/api/citas', payload);
    message.success('Cita agendada correctamente');
    limpiarFormulario()
  } catch (error) {
    message.error('Error al agendar la cita');
  }
};

const limpiarFormulario = async () => {
  form.value.ID_vehiculo = ''
  form.value.Id_cita = ''
  form.value.nombre = ''
  form.value.fecha = null

  await generarCodigo()
}

</script>
<style scoped>
.tabla-citas {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.tabla-citas th,
.tabla-citas td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.tabla-citas th {
  background-color: #ff0000;
  color: white;
}

.btn.cancelar {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.btn.cancelar:hover {
  background-color: #c62828;
}
</style>