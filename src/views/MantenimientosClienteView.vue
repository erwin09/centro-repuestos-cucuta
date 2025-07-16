<template>
    <div class="container">
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
import { useStoreApp } from '../store/store'
const storeApp = useStoreApp()


// Refs y estados
const clientes = ref([])
const servicios = ref([])
const productos = ref([])
const mantenimientos = ref([])
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
        const [c, s, p, m] = await Promise.all([
            axios.get('/api/clientes'),
            axios.get('/api/servicios'),
            axios.get('/api/productos/tabla'),
            axios.get('/api/mantenimientos'),
        ])
        clientes.value = c.data || []
        servicios.value = s.data.result || []
        productos.value = p.data.result || []
        mantenimientos.value = m.data.result || []
    } catch (error) {
        console.error(error)
        message.error('Error al cargar los datos')
    }
}
console.log("datos del backend servicio", servicios.value);


const mantenimientosFiltrados = computed(() =>
    mantenimientos.value
        .filter(m => m.Num_doc === storeApp.Num_doc)
        .filter(m =>
            (m.placa || '').toLowerCase().includes(busquedaPlaca.value.toLowerCase())
        )
)

onMounted(() => {
    cargarDatos()
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
    /* rojo fuerte */
    color: white !important;
    text-align: center;
    font-weight: bold;
}
</style>