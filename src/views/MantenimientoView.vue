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

      <a-table :columns="columnsServicios" :data-source="form.servicios" row-key="ID_servicio" :pagination="false" />

      <a-modal v-model:open="visibleModalSer" title="Agregar Servicio Técnico" @ok="agregarServicio">
        <a-form layout="vertical">
          <a-form-item label="Servicio técnico">
            <a-select show-search v-model:value="nuevoServicio.id" :options="servicios.map(s => ({
              label: s.nombre,
              value: s.Id_servicios
            }))" placeholder="Buscar por nombre"
              :filter-option="(input, option) => option.label.toLowerCase().includes(input.toLowerCase())" />
          </a-form-item>
          <a-form-item label="Técnico">
            <a-input v-model:value="nuevoServicio.tecnico" min="1" style="width: 100%" />
          </a-form-item>
          <a-form-item label="Precio">
            <a-input-number v-model:value="nuevoServicio.precio" min="0" style="width: 100%" />
          </a-form-item>
        </a-form>
      </a-modal>


      <!-- Modal de Repuestos -->
      <a-button type="dashed" @click="visibleModal = true" style="margin-bottom: 1rem">
        Agregar Repuestos
      </a-button>

      <a-table :columns="columnsRepuestos" :data-source="form.productos" row-key="ID_producto" :pagination="false" />

      <a-modal v-model:open="visibleModal" title="Agregar Repuesto" @ok="agregarRepuesto">
        <a-form layout="vertical">
          <a-form-item label="Repuesto">
            <a-select show-search v-model:value="nuevoRepuesto.id" :options="productos.map(p => ({
              label: `${p.nombre} - ${p.nombre_marca}`,
              value: p.Id_producto
            }))" placeholder="Buscar por nombre o marca"
              :filter-option="(input, option) => option.label.toLowerCase().includes(input.toLowerCase())" />
          </a-form-item>
          <a-form-item label="Cantidad">
            <a-input-number v-model:value="nuevoRepuesto.cantidad" min="1" style="width: 100%" />
          </a-form-item>
          <a-form-item label="Precio">
            <a-input-number v-model:value="nuevoRepuesto.precio" min="0" style="width: 100%" />
          </a-form-item>
        </a-form>
      </a-modal>

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
import { ref, reactive, onMounted, computed, h } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'

// Formulario
const form = reactive({
  Num_doc: null,
  placa: null,
  Id_mantenimientos: null,
  fecha: null,
  observaciones: '',
  servicios: [],
  productos: [],
  notificaciones: [],
})

const cargarId = async () => {
  try {
    const res = await axios.get('/api/mantenimientos/nuevo-id')
    form.Id_mantenimientos = res.data.nuevoId
    console.log("nuevo id", form.Id_mantenimientos);

  } catch (error) {
    console.error(error)
    message.error('No se pudo generar el ID de mantenimiento')
  }
}

console.log("productos form", form.productos);
console.log("servicios form", form.servicios);


// Refs y estados
const formRef = ref()
const clientes = ref([])
const vehiculos = ref([])
const servicios = ref([])
const productos = ref([])
const notificaciones = ref([])
const mantenimientos = ref([])
const visibleModal = ref(false)
const visibleModalSer = ref(false)
const busquedaPlaca = ref('')
const visibleModalRepuestos = ref(false)
const repuestosDetalle = ref([])
const visibleModalServicios = ref(false)
const serviciosDetalle = ref([])

//Funciones para llamar los servicios y los repuestos en los modal
const verRepuestos = async (mantenimiento) => {
  console.log("id mantenimiento", mantenimiento.Id_mantenimientos)

  try {
    const res = await axios.get(`/api/detalleproducto/${mantenimiento.Id_mantenimientos}`)
    repuestosDetalle.value = res.data.result || []
    console.log("respuesta detalles", repuestosDetalle.value);

    visibleModalRepuestos.value = true
  } catch (error) {
    message.error('No se pudieron cargar los repuestos')
    console.error(error)
  }
}

const verServicios = async (mantenimiento) => {
  console.log("id mantenimiento ser", mantenimiento.Id_mantenimientos)

  try {
    const res = await axios.get(`/api/detalleservicio/${mantenimiento.Id_mantenimientos}`)
    serviciosDetalle.value = res.data.result || []
    console.log("respuesta detalles", serviciosDetalle.value);

    visibleModalServicios.value = true
  } catch (error) {
    message.error('No se pudieron cargar los repuestos')
    console.error(error)
  }
}

//Creación de las columnas de los modales servicios y repuestos
const columnsModalServicios = [
  { title: 'Nombre', dataIndex: 'servicio' },
  { title: 'tecnico', dataIndex: 'tecnico' },
  {
    title: 'Precio Unitario',
    dataIndex: 'precio',
  },
]

const columnsModalRepuestos = [
  { title: 'Nombre', dataIndex: 'repuesto' },
  { title: 'Marca', dataIndex: 'marca' },
  { title: 'Cantidad', dataIndex: 'cantidad' },
  {
    title: 'Precio Unitario',
    dataIndex: 'precio',
  },
  {
    title: 'Subtotal',
    dataIndex: 'total',
  }
]

//Aqui se reciben los servicios y respuestos que se seleccionan
const nuevoServicio = reactive({
  id: null,
  Tecnico: '',
  precio: 0
})

const nuevoRepuesto = reactive({
  id: null,
  cantidad: 1,
  precio: 0
})

// Tabla de servicios agregados
const columnsServicios = [
  { title: 'Servicio', dataIndex: 'nombre' },
  { title: 'Tecnico', dataIndex: 'tecnico' },
  { title: 'Precio', dataIndex: 'precio' },
  {
    title: 'Acciones',
    customRender: ({ record }) => {
      return h('a', { onClick: () => eliminarServicio(record.ID_servicio) }, 'Eliminar')
    }
  }
]

// Tabla de repuestos agregados
const columnsRepuestos = [
  { title: 'Repuesto', dataIndex: 'nombre' },
  { title: 'Cantidad', dataIndex: 'cantidad' },
  { title: 'Precio', dataIndex: 'precio' },
  {
    title: 'Acciones',
    customRender: ({ record }) => {
      return h('a', { onClick: () => eliminarRepuesto(record.ID_producto) }, 'Eliminar')
    }
  }
]

// Tabla de mantenimientos
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
    customRender: ({ record }) => {
      return h('a', { onClick: () => verRepuestos(record) }, 'Ver detalle')
    }
  },
  {
    title: 'Servicios',
    dataIndex: 'servicios',
    customRender: ({ record }) => {
      return h('a', { onClick: () => verServicios(record) }, 'Ver detalle')
    }
  }
]

// Funciones
const cargarDatos = async () => {
  try {
    const [c, s, p, n, m] = await Promise.all([
      axios.get('/api/clientes'),
      axios.get('/api/servicios'),
      axios.get('/api/productos/tabla'),
      axios.get('/api/notificaciones'),
      axios.get('/api/mantenimientos'),
    ])
    clientes.value = c.data || []
    servicios.value = s.data.result || []
    productos.value = p.data.result || []
    notificaciones.value = n.data.result || []
    mantenimientos.value = m.data.result || []
  } catch (error) {
    console.error(error)
    message.error('Error al cargar los datos')
  }
}
console.log("datos del backend servicio", servicios.value);


const cargarVehiculosCliente = async (Num_doc) => {
  try {
    const res = await axios.get(`/api/vehiculos/placa/${Num_doc}`)
    vehiculos.value = res.data || []
  } catch (error) {
    message.error('Error al cargar vehículos del cliente')
  }
}

const agregarServicio = () => {
  const servicio = servicios.value.find(s => s.Id_servicios === nuevoServicio.id)
  if (!servicio) return message.error('Servicio inválido')

  const yaExiste = form.servicios.find(p => p.ID_servicio === nuevoServicio.id)
  if (yaExiste) return message.warning('Repuesto ya agregado')

  form.servicios.push({
    ID_mantenimiento: form.Id_mantenimientos,
    ID_servicio: nuevoServicio.id,
    precio: nuevoServicio.precio,
    tecnico: nuevoServicio.tecnico,
    nombre: servicio.nombre,
  })

  nuevoServicio.id = null
  nuevoServicio.nombre = null
  nuevoServicio.precio = 0
  visibleModalSer.value = false
}

const eliminarServicio = (id) => {
  form.servicios = form.servicios.filter(s => s.ID_servicio !== id)
}

const agregarRepuesto = () => {
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
  visibleModal.value = false
}

const eliminarRepuesto = (id) => {
  form.productos = form.productos.filter(p => p.ID_producto !== id)
}

const registrarMantenimiento = async () => {

  const notificacionesSeleccionadas = form.notificaciones.map(id => {
    const noti = notificaciones.value.find(n => n.Id_notificacion === id)
    return {
      ID_notificacion: id,
      tiempo_dias: noti?.tiempo_dias || 0 // usa 0 si no lo encuentra
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
  console.log("datos enviados la backend", datos);

  try {
    await axios.post('/api/mantenimientos/crear', datos)
    message.success('Mantenimiento registrado correctamente')
    await cargarDatos()
    await resetearFormulario()
  } catch (error) {
    console.error(error)
    message.error('Error al registrar mantenimiento')
  }
}

const resetearFormulario = async () => {
  form.Num_doc = null
  form.placa = null
  form.fecha = null
  form.observaciones = ''
  form.productos = []
  form.servicios = []
  form.notificacion = []

  nuevoRepuesto.id = null
  nuevoRepuesto.cantidad = 1
  nuevoRepuesto.precio = 0

  nuevoServicio.id = null
  nuevoServicio.tecnico = ''
  nuevoServicio.precio = 0

  await cargarId()
}

const mantenimientosFiltrados = computed(() =>
  mantenimientos.value.filter(m =>
    (m.placa || '').toLowerCase().includes(busquedaPlaca.value.toLowerCase())
  )
)

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
</style>