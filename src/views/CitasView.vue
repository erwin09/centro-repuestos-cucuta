<template>
  <a-card title="Gestión de Citas">
    <a-input
      v-model:value="busquedaDoc"
      placeholder="Buscar por número de documento"
      style="margin-bottom: 1rem; width: 300px"
    />

    <table class="tabla-citas">
      <thead>
        <tr>
          <th>Código Cita</th>
          <th>Placa</th>
          <th>Vehículo</th>
          <th>Servicio</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cita in citasFiltradas" :key="cita.Id_cita">
          <td>{{ cita.codigo }}</td>
          <td>{{ cita.placa }}</td>
          <td>{{ cita.marca }}</td>
          <td>{{ cita.nombre }}</td>
          <td>{{ formatearFecha(cita.fecha) }}</td>
          <td>
            <template v-if="cita.editando">
              <select v-model="cita.estado">
                <option value="cumplida">Cumplida</option>
                <option value="incumplida">Incumplida</option>
                <option value="cancelado">Cancelada</option>
                <option value="pendiente">pendiente</option>
              </select>
            </template>
            <template v-else>
              {{ cita.estado }}
            </template>
          </td>
          <td>
            <template v-if="cita.editando">
              <button class="btn guardar" @click="guardarEstado(cita)">Guardar</button>
              <button class="btn cancelar" @click="cancelarCambio(cita)">Cancelar</button>
            </template>
            <template v-else>
              <button class="btn editar" @click="cita.editando = true">Editar</button>
            </template>
          </td>
        </tr>
        <tr v-if="citasFiltradas.length === 0">
          <td colspan="6">No se encontraron citas con ese número de documento.</td>
        </tr>
      </tbody>
    </table>
  </a-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

const citas = ref([])
const busquedaDoc = ref('')

// Formato fecha
const formatearFecha = (fecha) => {
  return dayjs(fecha).format('DD/MM/YYYY hh:mm A')
}

// Cargar todas las citas (modo administrador)
const cargarTodasLasCitas = async () => {
  try {
    const res = await axios.get('/api/citas')
    citas.value = res.data.result.map(cita => ({
      ...cita,
      editando: false,
      estado_original: cita.estado
    }))
  } catch (err) {
    console.error("Error cargando citas:", err)
    message.error('No se pudieron cargar las citas')
  }
}

// Guardar nuevo estado
const guardarEstado = async (cita) => {
  try {
    await axios.put(`/api/citas/${cita.codigo}`, { estado: cita.estado })
    cita.editando = false
    cita.estado_original = cita.estado
    message.success('Estado actualizado correctamente')
  } catch (err) {
    console.error(err)
    message.error('No se pudo actualizar el estado')
  }
}

// Cancelar edición
const cancelarCambio = (cita) => {
  cita.estado = cita.estado_original
  cita.editando = false
}

// Filtro por número de documento
const citasFiltradas = computed(() =>
  citas.value.filter(c =>
    (c.Num_doc || '').toString().toLowerCase().includes(busquedaDoc.value.toLowerCase())
  )
)

onMounted(() => {
  cargarTodasLasCitas()
})
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

.btn.editar {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.btn.editar:hover {
  background-color: #c62828;
}

.btn.guardar {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 6px;
}

.btn.guardar:hover {
  background-color: #c62828;
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