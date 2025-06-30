<template>
    <div class="productos-container">
        <h2 class="titulo">Lista de repuestos</h2>

        <table class="tabla-productos">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Linea</th>
                    <th>Marca</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Precio unitario</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="producto in productos" :key="producto.Id_producto">
                    <td>{{ producto.Id_producto }}</td>

                    <!-- Nombre editable -->
                    <td>
                        <input v-if="producto.editando" v-model="producto.nombre" />
                        <span v-else>{{ producto.nombre }}</span>
                    </td>

                    <!-- linea editable -->
                    <td>
                        <input v-if="producto.editando" v-model="producto.linea" />
                        <span v-else>{{ producto.linea }}</span>
                    </td>

                    <!-- descripción editable -->
                    <td>
                        <input v-if="producto.editando" v-model="producto.descripcion" />
                        <span v-else>{{ producto.descripcion }}</span>
                    </td>
                    <!-- estado editable-->
                    <td>
                        <select v-if="producto.editando" v-model="producto.estado">
                            <option :value="1">Activo</option>
                            <option :value="0">Inactivo</option>
                        </select>
                        <span v-else>{{ producto.estado === 1 ? 'Activo' : 'Inactivo' }}</span>
                    </td>
                    <td>
                        <input v-if="producto.editando" v-model="producto.precio">
                        <span v-else>{{ producto.precio }}</span>
                    </td>

                    <td>
                        <button v-if="!producto.editando" class="btn" @click="producto.editando = true">Editar</button>
                        <button v-else class="btn guardar" @click="guardarCambios(producto)">Guardar</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const productos = ref([])
//const productoSeleccionado = ref(null)
const marcas = ref([])

const cargarproductos = async () => {
    try {
        const res = await axios.get('/api/productos')
        // Agregar campo `editando` a cada producto
        productos.value = res.data.result.map(u => ({ ...u, editando: false }))
    } catch (error) {
        console.error('Error al cargar productos:', error)
    }
}
const cargarmarcas = async () =>


const guardarCambios = async (producto) => {
    try {
        await axios.put(`api/clientes/${producto.Id_producto}`, {
            nombre_producto: producto.nombre_producto,
            linea: producto.linea,
            telefono: producto.telefono,
            email: producto.email,
            estado: producto.estado,
        })
        producto.editando = false
        alert('producto actualizado')
    } catch (error) {
        console.error('Error al guardar cambios:', error)
        alert('Error al actualizar producto')
    }
}

onMounted(cargarproductos)
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
    border-collapse: collapse;
}

.tabla-productos th,
.tabla-productos td {
    font-size: 100%;
    border: 1px solid #ccc;
    padding: 6px 8px;
    text-align: left;
}

.tabla-productos th {
    background-color: #48484862;
}

input {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
}

.btn {
    background-color: #ff0000;
    color: rgb(255, 255, 255);
    border: none;
    padding: 5px 8px;
    margin: 2px;
    cursor: pointer;
    border-radius: 4px;
}

.btn:hover {
    background-color: #cc0000;
}

.btn.guardar {
    background-color: #898989fb;
}

.btn.guardar:hover {
    background-color: #727272fb;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.modal input {
    width: 100%;
    padding: 6px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
}

.modal-botones {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.btn-cancelar {
    background-color: transparent;
    border: none;
    color: #e53935;
    cursor: pointer;
}

.btn-guardar {
    background-color: #ff0000;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}
</style>