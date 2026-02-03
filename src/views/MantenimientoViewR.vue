<template>
  <div class="container">
    <h2>Crear Mantenimiento</h2>
    <a-form layout="vertical" @submit.prevent="registrarMantenimiento" :model="form" ref="formRef">
      <!-- Cliente -->
      <a-form-item label="Cliente" name="Num_doc">
        <a-select show-search v-model:value="form.Num_doc"
          :options="clientes.map(c => ({ label: `${c.nombre_usuario} (${c.Num_doc})`, value: c.Num_doc }))"
          placeholder="Buscar cliente por cédula o nombre" @change="cargarVehiculosCliente"
          :filter-option="(input, option) => option.label.toLowerCase().includes(input.toLowerCase())" />
      </a-form-item>
      <!-- Vehículo -->
      <a-form-item label="Vehículo (placa)" name="placa">
        <a-select v-model:value="form.placa"
          :options="vehiculos.map(v => ({ label: `${v.placa} - ${v.marca}`, value: v.placa }))"
          placeholder="Seleccione vehículo" />
      </a-form-item>
      <!-- Orden de trabajo -->
      <a-form-item label="Orden de Trabajo" name="Id_mantenimientos">
        <a-input v-model:value="form.Id_mantenimientos" readonly />
      </a-form-item>
      <a-form-item label="Fecha mantenimiento" name="fecha">
        <a-date-picker v-model:value="form.fecha" style="width: 100%" />
      </a-form-item>
      <a-form-item label="Observaciones">
        <a-textarea v-model:value="form.observaciones" :rows="3" />
      </a-form-item>
      <!--Modal de servicios-->
      <a-button type="dashed" @click="visibleModalSer = true" style="margin-bottom: 1rem">
        Agregar Servicio
      </a-button>
      <TablaEditable :columns="columnsServicios" :data="form.servicios" rowKey="ID_servicio" />
      <ServiceModal :visible="visibleModalSer" :servicio="nuevoServicio"
        :serviciosOptions="servicios.map(s => ({ label: s.nombre, value: s.Id_servicios }))"
        @ok="agregarServicio" @update:visible="v => visibleModalSer = v" />
      <!-- Modal de Repuestos -->
      <a-button type="dashed" @click="visibleModal = true" style="margin-bottom: 1rem">
        Agregar Repuestos
      </a-button>
      <TablaEditable :columns="columnsRepuestos" :data="form.productos" rowKey="ID_producto" />
      <RepuestoModal :visible="visibleModal" :repuesto="nuevoRepuesto"
        :productosOptions="productos.map(p => ({ label: `${p.nombre} - ${p.nombre_marca}`, value: p.Id_producto }))"
        @ok="agregarRepuesto" @update:visible="v => visibleModal = v" />
      <!-- Notificaciones -->
      <a-form-item label="Tipos de notificación" name="notificaciones">
        <a-select mode="multiple" v-model:value="form.notificaciones"
          :options="notificaciones.map(n => ({ label: `${n.nombre} - ${n.tiempo_dias} meses`, value: n.Id_notificacion }))"
          placeholder="Selecciona uno o varios tipos de notificación" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Registrar Mantenimiento</a-button>
      </a-form-item>
    </a-form>
    <hr />
    <h3>Listado de Mantenimientos</h3>
    <a-modal v-model:open="visibleModalRepuestos" title="Detalle de Repuestos" :footer="null" :width="800">
      <a-table :columns="columnsModalRepuestos" :data-source="repuestosDetalle" row-key="ID_producto"
        :pagination="false" bordered />
    </a-modal>
    <a-modal v-model:open="visibleModalServicios" title="Detalle de servicios" :footer="null" :width="800">
      <a-table :columns="columnsModalServicios" :data-source="serviciosDetalle" row-key="ID_producto"
        :pagination="false" bordered />
    </a-modal>
    <a-input v-model:value="busquedaPlaca" placeholder="Buscar por placa" style="margin-bottom: 1rem" />
    <a-table :columns="columns" :data-source="mantenimientosFiltrados" row-key="Id_mantenimiento" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, h } from 'vue'
import { useMantenimiento } from '../composables/useMantenimiento'
import ServiceModal from '../components/ServiceModal.vue'
import RepuestoModal from '../components/RepuestoModal.vue'
import TablaEditable from '../components/TablaEditable.vue'
import mantenimientoService from '../services/mantenimientoService.js'
import { message } from 'ant-design-vue'

const {
  form, formRef, clientes, vehiculos, servicios, productos, notificaciones, mantenimientos,
  visibleModal, visibleModalSer, busquedaPlaca, visibleModalRepuestos, repuestosDetalle,
  visibleModalServicios, serviciosDetalle,
  cargarId, cargarDatos, cargarVehiculosCliente, verRepuestos, verServicios, resetearFormulario,
  mantenimientosFiltrados
} = useMantenimiento()

const nuevoServicio = reactive({
  id: null,
  tecnico: '',
  precio: 0
})
const nuevoRepuesto = reactive({
  id: null,
  cantidad: 1,
  precio: 0
})

const columnsServicios = [
  { title: 'Servicio', dataIndex: 'nombre' },
  { title: 'Tecnico', dataIndex: 'tecnico' },
  { title: 'Precio', dataIndex: 'precio' },
  {
    title: 'Acciones',
    customRender: ({ record }) => h('a', { onClick: () => eliminarServicio(record.ID_servicio) }, 'Eliminar')
  }
]
const columnsRepuestos = [
  { title: 'Repuesto', dataIndex: 'nombre' },
  { title: 'Cantidad', dataIndex: 'cantidad' },
  { title: 'Precio', dataIndex: 'precio' },
  {
    title: 'Acciones',
    customRender: ({ record }) => h('a', { onClick: () => eliminarRepuesto(record.ID_producto) }, 'Eliminar')
  }
]
const columns = [
  { title: 'Placa', dataIndex: 'placa' },
  { title: 'Cliente', dataIndex: 'nombre_usuario' },
  {
    title: 'Fecha',
    dataIndex: 'fecha',
    customRender: ({ text }) => {
      if (!text) return ''
      return new Date(text).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
  },
  { title: 'Observaciones', dataIndex: 'descripcion' },
  {
    title: 'Repuestos',
    dataIndex: 'repuestos',
    customRender: ({ record }) => h('a', { onClick: () => verRepuestos(record) }, 'Ver detalle')
  },
  {
    title: 'Servicios',
    dataIndex: 'servicios',
    customRender: ({ record }) => h('a', { onClick: () => verServicios(record) }, 'Ver detalle')
  }
]
const columnsModalServicios = [
  { title: 'Nombre', dataIndex: 'servicio' },
  { title: 'tecnico', dataIndex: 'tecnico' },
  { title: 'Precio Unitario', dataIndex: 'precio' }
]
const columnsModalRepuestos = [
  { title: 'Nombre', dataIndex: 'repuesto' },
  { title: 'Marca', dataIndex: 'marca' },
  { title: 'Cantidad', dataIndex: 'cantidad' },
  { title: 'Precio Unitario', dataIndex: 'precio' },
  { title: 'Subtotal', dataIndex: 'total' }
]

function agregarServicio() {
  const servicio = servicios.value.find(s => s.Id_servicios === nuevoServicio.id)
  if (!servicio) return message.error('Servicio inválido')
  const yaExiste = form.servicios.find(p => p.ID_servicio === nuevoServicio.id)
  if (yaExiste) return message.warning('Servicio ya agregado')
  form.servicios.push({
    ID_mantenimiento: form.Id_mantenimientos,
    ID_servicio: nuevoServicio.id,
    precio: nuevoServicio.precio,
    tecnico: nuevoServicio.tecnico,
    nombre: servicio.nombre,
  })
  nuevoServicio.id = null
  nuevoServicio.tecnico = ''
  nuevoServicio.precio = 0
  visibleModalSer.value = false
}
function eliminarServicio(id) {
  form.servicios = form.servicios.filter(s => s.ID_servicio !== id)
}
function agregarRepuesto() {
  const producto = productos.value.find(p => p.Id_producto === nuevoRepuesto.id)
  if (!producto) return message.error('Repuesto inválido')
  const yaExiste = form.productos.find(p => p.ID_producto === nuevoRepuesto.id)
  if (yaExiste) return message.warning('Repuesto ya agregado')
  form.productos.push({
    ID_producto: nuevoRepuesto.id,
    nombre: `${producto.nombre} - ${producto.nombre_marca}`,
    cantidad: nuevoRepuesto.cantidad,
    precio: nuevoRepuesto.precio,
    ID_mantenimiento: form.Id_mantenimientos
  })
  nuevoRepuesto.id = null
  nuevoRepuesto.cantidad = 1
  nuevoRepuesto.precio = 0
  visibleModal.value = false
}
function eliminarRepuesto(id) {
  form.productos = form.productos.filter(p => p.ID_producto !== id)
}
async function registrarMantenimiento() {
  const notificacionesSeleccionadas = form.notificaciones.map(id => {
    const noti = notificaciones.value.find(n => n.Id_notificacion === id)
    return {
      ID_notificacion: id,
      tiempo_dias: noti?.tiempo_dias || 0
    }
  })
  const datos = {
    Id_mantenimientos: form.Id_mantenimientos,
    fecha: form.fecha ? form.fecha.format('YYYY-MM-DD') : null,
    descripcion: form.observaciones,
    ID_vehiculo: form.placa,
    productos: form.productos,
    servicios: form.servicios,
    notificaciones: notificacionesSeleccionadas
  }

  console.log('datos', datos)
  try {
    await mantenimientoService.postMantenimientos(datos)
    message.success('Mantenimiento registrado correctamente')
    await cargarDatos()
    await resetearFormulario()
  } catch (error) {
    message.error('Error al registrar mantenimiento')
  }
}
onMounted(() => {
  cargarDatos()
  cargarId()
})
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}
::v-deep(.ant-table-thead > tr > th) {
    background-color: #ff0000 !important;
    color: white !important;
    text-align: center;
    font-weight: bold;
}
</style>