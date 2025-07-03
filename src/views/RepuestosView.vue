<template>
    <div class="productos-container">
        <h2 class="titulo">Lista de repuestos</h2>

        <table class="tabla-productos">
            <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Linea</th>
                    <th>Marca</th>
                    <th>Grupo de repuesto</th>
                    <th>Proveedor</th>
                    <th>Procedencia</th>
                    <th>Estado</th>
                    <th>Precio unitario</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="producto in productos" :key="producto.Id_producto">
                    <td>
                    <input v-if="producto.editando" v-model="producto.cantidad" />
                        <span v-else>{{ producto.cantidad }}</span>
                    </td>
                    <td>{{ producto.Id_producto }}</td>
                    <td>
                        <input v-if="producto.editando" v-model="producto.nombre" />
                        <span v-else>{{ producto.nombre }}</span>
                    </td>

                    <td>
                        <input v-if="producto.editando" v-model="producto.linea" />
                        <span v-else>{{ producto.linea }}</span>
                    </td>

                    <td><span>{{ producto.nombre_marca }}</span></td>

                    <!-- descripción editable -->
                    <td>
                        <input v-if="producto.editando" v-model="producto.descripcion" />
                        <span v-else>{{ producto.descripcion }}</span>
                    </td>
                    <td>{{ producto.nombre_proveedor }}</td>

                    <td>{{ producto.procedencia }}</td>
                    <td>
                        <select v-if="producto.editando" v-model="producto.estado">
                            <option :value="1">Existencia</option>
                            <option :value="0">Agotado</option>
                        </select>
                        <span v-else>{{ producto.estado === 1 ? 'Existencia' : 'Agotado' }}</span>
                    </td>
                    <td>
                        <input v-if="producto.editando" v-model="producto.precio">
                        <span v-else>{{ producto.precio }}</span>
                    </td>

                    <td>
                        <template v-if="producto.editando">
                            <button class="btn guardar" @click="guardarCambios(producto)">Guardar</button>
                            <button class="btn cancelar" @click="cancelarEdicion(producto)">Cancelar</button>
                        </template>
                        <template v-else>
                            <button class="btn" @click="empezarEdicion(producto)">Editar</button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'

const productos = ref([])
const productoOriginal = ref([])


const cargarDatos = async () => {
    const [prodRes] = await Promise.all([
        axios.get('/api/productos/tabla'),
    ])

    productos.value = prodRes.data.result.map(p => ({
        ...p,
        editando: false
    }))
}

const empezarEdicion = (producto) => {
    productoOriginal.value = { ...producto }
    producto.editando = true
}

const cancelarEdicion = (producto) => {
    Object.assign(producto, productoOriginal.value)
    producto.editando = false
}

const guardarCambios = async (producto) => {
    try {
        await axios.put(`/api/productos/editar-completo/${producto.Id_producto}`, {
            Id_producto: producto.Id_producto,
            nombre: producto.nombre,
            linea: producto.linea,
            descripcion: producto.descripcion,
            estado: producto.estado,
            precio: producto.precio,
            cantidad: Number(producto.cantidad),
            Id_marca: producto.Id_marca,
            Id_proveedor: producto.Id_proveedor,
        })

        producto.editando = false
        await cargarDatos();
        message.success('producto actualizado')

    } catch (error) {
        console.error('Error al guardar cambios:', error)
        message.error('Error al actualizar producto')
    }
}


onMounted(cargarDatos)
</script>

<style scoped>
.productos-container {
    padding: 1rem;
}

.titulo {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

.tabla-productos {
    width: 100%;
    background-color: #0f0f0f0a;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tabla-productos thead {
    background-color: #343a40;
    color: #fff;
    text-align: left;
}

.tabla-productos th,
.tabla-productos td {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
}

.tabla-productos th {
    background-color: #ff0000;
}

.tabla-productos tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.tabla-productos tbody tr:hover {
    background-color: #eef2f7;
}

input {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
}

.btn {
    background-color: #e53935;
    color: rgb(255, 255, 255);
    border: none;
    padding: 5px 8px;
    margin: 2px;
    cursor: pointer;
    border-radius: 4px;
}

.btn:hover {
    background-color: #c62828;
}

.btn.guardar {
    background-color: #e53935;
    color: white;
}

.btn.guardar:hover {
    background-color: #c62828;
}

.btn.cancelar {
    background-color: #e53935;
    color: white;
}

.btn.cancelar:hover {
    background-color: #c62828;
}
</style>