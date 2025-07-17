<template>
    <div class="notificaciones-container">
        <h2 class="titulo">Lista de notificaciones</h2>

        <table class="tabla-notificaciones">
            <thead>
                <tr>
                    <th>Codigo notificación</th>
                    <th>Nombre</th>
                    <th>Meses</th>
                    <th>Descripción del notificación</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="notificacion in notificaciones" :key="notificacion.Id_notificacion">
                    <td>{{ notificacion.Id_notificacion }}</td>
                    <td>
                        <input v-if="notificacion.editando" v-model="notificacion.nombre" />
                        <span v-else>{{ notificacion.nombre }}</span>
                    </td>

                    <td>
                        <input v-if="notificacion.editando" v-model="notificacion.tiempo_dias" />
                        <span v-else>{{ notificacion.tiempo_dias }}</span>
                    </td>

                    <td>
                        <a-textarea v-if="notificacion.editando" v-model:value="notificacion.mensaje" :rows="3" />
                        <span v-else>{{ notificacion.mensaje }}</span>
                    </td>

                    <td>
                        <template v-if="notificacion.editando">
                            <button class="btn guardar" @click="guardarCambios(notificacion)">Guardar</button>
                            <button class="btn cancelar" @click="cancelarEdicion(notificacion)">Cancelar</button>
                        </template>
                        <template v-else>
                            <button class="btn" @click="empezarEdicion(notificacion)">Editar</button>
                        </template>
                    </td>
                </tr>

            </tbody>
        </table>
        <div style="text-align: right; margin-top: 2rem;">
            <button @click="abrirModal" class="logout-btn">Crear notificacion</button>
        </div>
        <div v-if="mostrarModal" class="modal-overlay">
            <div class="modal">
                <h3 class="modal-titulo">Registrar notificacion</h3>

                <form @submit.prevent="registrarnotificacion">
                    <div class="form-group">
                        <label>Codigo notificacion:</label>
                        <input v-model="notificacion.Id_notificacion" required />
                    </div>

                    <div class="form-group">
                        <label>Nombre:</label>
                        <input v-model="notificacion.nombre" required />
                    </div>

                    <div class="form-group">
                        <label>Meses:</label>
                        <input v-model="notificacion.tiempo_dias" required />
                    </div>

                    <div class="form-group">
                        <label>Mensaje:</label>
                        <textarea v-model="notificacion.mensaje" rows="3" required></textarea>
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

const notificaciones = ref([])
const notificacionOriginal = ref([])
const mostrarModal = ref(false)


const cargarDatos = async () => {
    const [serRes] = await Promise.all([
        axios.get('/api/notificaciones'),
    ])
    notificaciones.value = serRes.data.result.map(n => ({
        ...n,
        editando: false
    }))
    .sort((a, b) => a.Id_notificacion.localeCompare(b.Id_notificacion))
}

const empezarEdicion = (notificacion) => {
    notificacionOriginal.value = { ...notificacion }
    notificacion.editando = true
}

const cancelarEdicion = (notificacion) => {
    Object.assign(notificacion, notificacionOriginal.value)
    notificacion.editando = false
}

const guardarCambios = async (notificacion) => {
    try {
        await axios.put(`/api/notificaciones/${notificacion.Id_notificacion}`, {
            Id_notificacion: notificacion.Id_notificacion,
            nombre: notificacion.nombre,
            tiempo_dias: notificacion.tiempo_dias,
            mensaje: notificacion.mensaje,
        })

        notificacion.editando = false
        await cargarDatos();
        message.success('notificación actualizada')

    } catch (error) {
        console.error('Error al guardar cambios:', error)
        message.error('Error al actualizar la notificación')
    }
}
const notificacion = ref({
    Id_notificacion: '',
    nombre: '',
    tiempo_dias: '',
    mensaje: ''
})

const abrirModal = () => {
    notificacion.value = {
        Id_notificacion: '',
        nombre: '',
        tiempo_dias: '',
        mensaje: ''
    }
    mostrarModal.value = true
}

const cerrarModal = () => {
    mostrarModal.value = false
}

const registrarnotificacion = async () => {
    try {
        await axios.post('/api/notificaciones', {
            ...notificacion.value,
        })
        message.success('notificación registrada')
        cerrarModal()
        cargarDatos()
    } catch (error) {
        console.error('Error al registrar la notificación:', error)
        message.error('Error al registrar la notificación')
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

.notificaciones-container {
    padding: 1rem;
}

.titulo {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

.tabla-notificaciones {
    width: 100%;
    background-color: #0f0f0f0a;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tabla-notificaciones thead {
    background-color: #343a40;
    color: #fff;
    text-align: left;
}

.tabla-notificaciones th,
.tabla-notificaciones td {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
}

.tabla-notificaciones th {
    background-color: #ff0000;
}

.tabla-notificaciones tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.tabla-notificaciones tbody tr:hover {
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