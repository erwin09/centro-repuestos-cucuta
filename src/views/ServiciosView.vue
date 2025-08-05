<template>
    <div class="servicios-container">
        <h2 class="titulo">Lista de servicios</h2>

        <table class="tabla-servicios">
            <thead>
                <tr>
                    <th>Codigo de servicio</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Tiempo estimado </th>
                    <th>Descripción del servicio</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="servicio in servicios" :key="servicio.Id_servicios">
                    <td>{{ servicio.Id_servicios }}</td>
                    <td>
                        <input v-if="servicio.editando" v-model="servicio.nombre" />
                        <span v-else>{{ servicio.nombre }}</span>
                    </td>

                    <td>
                        <input v-if="servicio.editando" v-model.number="servicio.precio" type="number" min="0"
                            step="0.01"  @input="validarNumeroPositivo(servicio, 'precio')"/>
                        <span v-else>{{ servicio.precio }}</span>
                    </td>

                    <td>
                        <input v-if="servicio.editando" v-model="servicio.tiempo_estimado" />
                        <span v-else>{{ servicio.tiempo_estimado }}</span>
                    </td>

                    <td>
                        <a-textarea v-if="servicio.editando" v-model:value="servicio.descripcion" :rows="3" />
                        <span v-else>{{ servicio.descripcion }}</span>
                    </td>

                    <td>
                        <template v-if="servicio.editando">
                            <button class="btn guardar" @click="guardarCambios(servicio)">Guardar</button>
                            <button class="btn cancelar" @click="cancelarEdicion(servicio)">Cancelar</button>
                        </template>
                        <template v-else>
                            <button class="btn" @click="empezarEdicion(servicio)">Editar</button>
                        </template>
                    </td>
                </tr>

            </tbody>
        </table>
        <div style="text-align: right; margin-top: 2rem;">
            <button @click="abrirModal" class="logout-btn">Crear servicio</button>
        </div>
        <div v-if="mostrarModal" class="modal-overlay">
            <div class="modal">
                <h3 class="modal-titulo">Registrar servicio</h3>

                <form @submit.prevent="registrarServicio">
                    <div class="form-group">
                        <label>Codigo servicio:</label>
                        <input v-model="servicio.Id_servicios" required />
                    </div>

                    <div class="form-group">
                        <label>Nombre:</label>
                        <input v-model="servicio.nombre" required />
                    </div>

                    <div class="form-group">
                        <label>Precio:</label>
                        <input v-model="servicio.precio" required />
                    </div>

                    <div class="form-group">
                        <label>Tiempo estimado:</label>
                        <input v-model="servicio.tiempo_estimado" required />
                    </div>

                    <div class="form-group">
                        <label>Descripción:</label>
                        <textarea v-model="servicio.descripcion" rows="3" required></textarea>
                    </div>

                    <div class="modal-botones">
                        <button type="button" class="btn-cancelar" @click="cerrarModal">Cancelar</button>
                        <button type="submit" class="btn-guardar">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'

const servicios = ref([])
const servicioOriginal = ref([])
const mostrarModal = ref(false)


const cargarDatos = async () => {
    const [serRes] = await Promise.all([
        axios.get('/api/servicios'),
    ])
    servicios.value = serRes.data.result.map(s => ({
        ...s,
        editando: false
    }))
        .sort((a, b) => a.Id_servicios.localeCompare(b.Id_servicios))
}

const empezarEdicion = (servicio) => {
    servicioOriginal.value = { ...servicio }
    servicio.editando = true
}

const cancelarEdicion = (servicio) => {
    Object.assign(servicio, servicioOriginal.value)
    servicio.editando = false
}

const validarNumeroPositivo = (servicio, campo) => {
    if (servicio[campo] < 0) {
        servicio[campo] = 0;
        message.warning(`El valor de ${campo} no puede ser negativo`);
    }
}

const guardarCambios = async (servicio) => {
    try {
        await axios.put(`/api/servicios/${servicio.Id_servicio}`, {
            Id_servicio: servicio.Id_servicios,
            nombre: servicio.nombre,
            precio: servicio.precio,
            tiempo_estimado: servicio.tiempo_estimado,
            descripcion: servicio.descripcion,
        })

        servicio.editando = false
        await cargarDatos();
        message.success('servicio actualizado')

    } catch (error) {
        console.error('Error al guardar cambios:', error)
        message.error('Error al actualizar servicio')
    }
}
const servicio = ref({
    Id_servicios: '',
    nombre: '',
    precio: '',
    tiempo_estimado: '',
    descripcion: ''
})

const abrirModal = () => {
    servicio.value = {
        Id_servicios: '',
        nombre: '',
        precio: '',
        tiempo_estimado: '',
        descripcion: ''
    }
    mostrarModal.value = true
}

const cerrarModal = () => {
    mostrarModal.value = false
}
console.log("servicios enviados", servicio);

const registrarServicio = async () => {
    try {
        await axios.post('/api/servicios', {
            ...servicio.value,
        })
        message.success('Servicio registrado')
        cerrarModal()
        cargarDatos()
    } catch (error) {
        console.error('Error al registrar servicio:', error)
        message.error('Error al registrar servicio')
    }
}

onMounted(cargarDatos)
</script>

<style scoped>
.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

input,
textarea {
    border-radius: 6px;
    border: 1px solid #ccc;
    padding: 8px;
    outline: none;
}

.servicios-container {
    padding: 1rem;
}

.titulo {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

.tabla-servicios {
    width: 100%;
    background-color: #0f0f0f0a;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tabla-servicios thead {
    background-color: #343a40;
    color: #fff;
    text-align: left;
}

.tabla-servicios th,
.tabla-servicios td {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
}

.tabla-servicios th {
    background-color: #ff0000;
}

.tabla-servicios tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.tabla-servicios tbody tr:hover {
    background-color: #eef2f7;
}

input {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
}

.logout-btn {
    background-color: #e53935;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
}

.logout-btn:hover {
    background-color: #c62828;
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