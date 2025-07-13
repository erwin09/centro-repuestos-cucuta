<template>
  <Carrousel></Carrousel>

  <div>
    <h1 style="text-align: center;">Estadisticas servicios</h1>
  </div>

  <div>
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'fecha'">
          <span>
            <CalendarOutlined />
            Fecha
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'fecha'">
          <a>
            {{ record.fecha }}
          </a>
        </template>
        <template v-else-if="column.key === 'tecnico'">
          <span>
            <a-tag v-for="tag in record.tecnico" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>

      </template>
    </a-table>
  </div>


</template>

<script lang="ts" setup>
import Carrousel from '../components/public/Carrousel.vue';

import { DownOutlined, CalendarOutlined } from '@ant-design/icons-vue';
const columns = [
  {
    name: 'fecha',
    dataIndex: 'fecha',
    key: 'fecha',
  },
  {
    title: 'Cantidad',
    dataIndex: 'cantidad',
    key: 'cantidad',
  },
  {
    title: 'Servicio',
    dataIndex: 'servicio',
    key: 'servicio',
  },
  {
    title: 'Tecnico',
    key: 'tecnico',
    dataIndex: 'tecnico',
  },
  {
    title: 'Precio',
    key: 'precio',
    dataIndex: 'precio',
  },
];

const data = [
  {
    key: '1',
    fecha: '12-06-2025',
    cantidad: 2,
    servicio: 'Cambio de pastillas',
    tecnico: ['Fabian julio'],
    precio: 32000,
  },
  {
    key: '2',
    fecha: '12-06-2025',
    cantidad: 1,
    servicio: 'Revisión de liquidos',
    tecnico: ['Yeison illera'],
    precio: 15000,
  },
  {
    key: '3',
    fecha: '12-06-2025',
    cantidad: 1,
    servicio: 'Cambio correa de distribución',
    tecnico: ['Yeison illera', 'Fabian julio'],
    precio: 100000,
  },
];
</script>

<style></style>
