<template>
  <a-card title="Agendar Cita" style="max-width: 500px; margin: auto">
    <a-form layout="vertical" @submit.prevent="crearCita">
      <a-form-item label="Numero de documento">
        <a-input v-model="form.Num_doc" @blur="cargarVehiculos"/>
      </a-form-item>

      <a-form-item label="Vehículo">
        <a-select v-model="form.ID_vehiculo" placeholder="Selecciona tu vehículo">
          <a-select-option v-for="vehiculo in vehiculos" :key="vehiculo.placa" :value="vehiculo.placa">
            {{ vehiculo.placa }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Fecha">
        <a-date-picker v-model="form.fecha" />
      </a-form-item>

      <a-button type="primary" html-type="submit">Agendar</a-button>
    </a-form>
  </a-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

const form = ref({
  Id_cita: '',
  Num_doc: '',
  fecha: null,
  ID_vehiculo: ''
});

const vehiculos = ref([]);

const cargarVehiculos = async (Num_doc) => {
  const { data } = await axios.get(`/api/vehiculos/usuario/${Num_doc}`);
  vehiculos.value = data;
};

onMounted(() => {
  form.value.Id_cita = generarCodigo();
});

const generarCodigo = () => {
  const numero = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `CIT-${numero}`;
};

const crearCita = async () => {
  try {
    const payload = {
      ...form.value,
      fecha: dayjs(form.value.fecha).format('YYYY-MM-DD')
    };

    await axios.post('/api/citas', payload);
    message.success('Cita agendada correctamente');
  } catch (error) {
    message.error('Error al agendar la cita');
  }
};
</script>