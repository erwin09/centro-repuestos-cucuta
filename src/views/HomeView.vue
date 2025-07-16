<template>
  <div>
    <h1 style="text-align: center;">Estadísticas de servicios</h1>

    <!-- Tabla -->
    <a-table :columns="columns" :data-source="estadisticas" rowKey="id" />

    <a-row :gutter="16" style="margin-top: 2rem;">
      <!-- Gráfico de pastel -->
      <a-col :span="12">
        <div style="max-width: 400px; margin: auto;">
          <PieChart v-if="pieData && pieData.datasets.length" :data="pieData" :options="pieOptions" />
        </div>
      </a-col>

      <!-- Gráfico de barras -->
      <a-col :span="12">
        <div style="max-width: 600px; margin: auto;">
          <BarChart v-if="barData && barData.datasets.length" :data="barData" :options="barOptions" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { Pie, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Registrar componentes
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)
const PieChart = Pie
const BarChart = Bar

const formatearFecha = fecha => {
  return new Intl.DateTimeFormat('es-CO').format(new Date(fecha))
}

// 📊 Columnas de la tabla
const columns = [
  { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', customRender: ({ text }) => formatearFecha(text) },
  { title: 'Servicio', dataIndex: 'servicio', key: 'servicio' },
  { title: 'Técnico', dataIndex: 'tecnico', key: 'tecnico' },
  { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
  { title: 'Total', dataIndex: 'total', key: 'total' }
]

// 📥 Datos
const estadisticas = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/detalleservicio/estadisticas')
    console.log("Respuesta completa:", res.data)

    if (Array.isArray(res.data.result)) {
      estadisticas.value = res.data.result
    } else {
      console.warn('La respuesta no es un arreglo:', res.data)
    }

  } catch (error) {
    console.error('Error al cargar estadísticas:', error)
  }
})

// 🎯 Gráfico de pastel: ingresos por servicio
const pieData = computed(() => {
  const resumen = {}

  estadisticas.value.forEach(item => {
    if (!resumen[item.servicio]) resumen[item.servicio] = 0
    resumen[item.servicio] += item.cantidad
  })

  return {
    labels: Object.keys(resumen),
    datasets: [{
      label: 'Cantidad del servicio',
      data: Object.values(resumen),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  }
})

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

// 📊 Gráfico de barras: porcentaje por técnico
const barData = computed(() => {
  const resumen = {}
  let totalGeneral = 0

  estadisticas.value.forEach(item => {
    if (!resumen[item.tecnico]) resumen[item.tecnico] = 0
    const total = Number(item.total)
    resumen[item.tecnico] += total
    totalGeneral += total
  })

  const tecnicos = Object.keys(resumen)
  const totales = Object.values(resumen)
  const porcentajes = totales.map(v => ((v / totalGeneral) * 100).toFixed(1))

  return {
    labels: tecnicos,
    datasets: [{
      label: 'Porcentaje de ganancias',
      data: porcentajes,
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
      barThickness: 40
    }]
  }
})

const barOptions = computed(() => {
  const resumen = {}
  let totalGeneral = 0

  estadisticas.value.forEach(item => {
    if (!resumen[item.tecnico]) resumen[item.tecnico] = 0
    const total = Number(item.total)
    resumen[item.tecnico] += total
    totalGeneral += total
  })

  const resumenValores = Object.entries(resumen)

  return {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Porcentaje de ganancias por técnico'
      },
      tooltip: {
        callbacks: {
          label: function (ctx) {
            const index = ctx.dataIndex
            const tecnico = ctx.label
            const valorTotal = resumenValores.find(([t]) => t === tecnico)?.[1] || 0
            return `${tecnico}: ${ctx.raw}% - $${valorTotal.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: val => `${val}%`
        },
        max: 100
      }
    }
  }
})
</script>