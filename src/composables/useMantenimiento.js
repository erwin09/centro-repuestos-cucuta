import { ref, reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import mantenimientoService from '../services/mantenimientoService.js'
import detalleProductoService from '../services/detalleProductoService.js'
import detalleServicioService from '../services/detalleServicioService.js'
import vehiculoService from '../services/vehiculoService.js'
import servicioService from '../services/servicioService.js'
import productoService from '../services/productoService.js'   
import notificacionService from '../services/notificacionService.js'
import usuarioService from '../services/usuarioService.js'

export function useMantenimiento() {
  const formRef = ref(null)
  const form = reactive({
    Id_mantenimientos: null,
    Num_doc: null,
    placa: null,
    fecha: null,
    observaciones: '',
    productos: [],
    servicios: [],
    notificaciones: []
  })

  const clientes = ref([])
  const vehiculos = ref([])
  const servicios = ref([])
  const productos = ref([])
  const notificaciones = ref([])
  const mantenimientos = ref([])

  const visibleModal = ref(false)
  const visibleModalSer = ref(false)
  const visibleModalRepuestos = ref(false)
  const visibleModalServicios = ref(false)

  const repuestosDetalle = ref([])
  const serviciosDetalle = ref([])
  const busquedaPlaca = ref('')

  const cargarId = async () => {
    try {
      const res = await mantenimientoService.getNuevoIdMantenimiento()
      form.Id_mantenimientos = res.data.nuevoId
    } catch (error) {
      message.error('No se pudo generar el ID de mantenimiento')
    }
  }

  const cargarDatos = async () => {
    try {
      const [c, s, p, n, m] = await Promise.all([
        usuarioService.getClientes(),
        servicioService.getServicios(),
        productoService.getProductosTable(),
        notificacionService.getNotificaciones(),
        mantenimientoService.getMantenimientos(),
      ])
      clientes.value = c.data || []
      servicios.value = s.data.result || []
      productos.value = p.data.result || []
      notificaciones.value = n.data.result || []
      mantenimientos.value = m.data.result || []
    } catch (error) {
      message.error('Error al cargar los datos')
    }

    console.log('Mantenimientos cargados:', mantenimientos.value)
  }

  const cargarVehiculosCliente = async (Num_doc) => {
    try {
      const res = await vehiculoService.getVehiculosByCliente(Num_doc)
      vehiculos.value = res.data || []
    } catch (error) {
      message.error('Error al cargar vehículos del cliente')
    }
  }

  const verRepuestos = async (mantenimiento) => {
    try {
      const res = await detalleProductoService.getDetalleProducto(mantenimiento.Id_mantenimientos)
      repuestosDetalle.value = res.data.result || []
      visibleModalRepuestos.value = true
    } catch (error) {
      message.error('No se pudieron cargar los repuestos')
    }
  }

  const verServicios = async (mantenimiento) => {
    try {
      const res = await detalleServicioService.getDetalleServicio(mantenimiento.Id_mantenimientos)
      serviciosDetalle.value = res.data.result || []
      visibleModalServicios.value = true
    } catch (error) {
      message.error('No se pudieron cargar los servicios')
    }
  }

  const resetearFormulario = async () => {
    form.Num_doc = null
    form.placa = null
    form.fecha = null
    form.observaciones = ''
    form.productos = []
    form.servicios = []
    form.notificaciones = []
    await cargarId()
  }

  const mantenimientosFiltrados = computed(() =>
    mantenimientos.value.filter(m =>
      (m.placa || '').toLowerCase().includes(busquedaPlaca.value.toLowerCase())
    )
  )

  return {
    form, formRef, clientes, vehiculos, servicios, productos, notificaciones, mantenimientos,
    visibleModal, visibleModalSer, busquedaPlaca, visibleModalRepuestos, repuestosDetalle,
    visibleModalServicios, serviciosDetalle,
    cargarId, cargarDatos, cargarVehiculosCliente, verRepuestos, verServicios, resetearFormulario,
    mantenimientosFiltrados
  }
}