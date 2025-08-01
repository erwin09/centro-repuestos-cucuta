<template>
  <div class="usuarios-container">
    <h2 class="titulo">Lista de Usuarios</h2>

    <table class="tabla-usuarios">
      <thead>
        <tr>
          <th>N° documento</th>
          <th>Tipo de documento</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Dirección</th>
          <th>Fecha registro</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.Num_doc">
          <td>{{ usuario.Num_doc }}</td>
          <td>{{ usuario.tip_doc }}</td>

          <!-- Nombre editable -->
          <td>
            <input v-if="usuario.editando" v-model="usuario.nombre_usuario" />
            <span v-else>{{ usuario.nombre_usuario }}</span>
          </td>

          <!-- Apellidos editable -->
          <td>
            <input v-if="usuario.editando" v-model="usuario.apellidos" />
            <span v-else>{{ usuario.apellidos }}</span>
          </td>

          <!-- Teléfono editable -->
          <td>
            <input v-if="usuario.editando" v-model="usuario.telefono" />
            <span v-else>{{ usuario.telefono }}</span>
          </td>

          <td>
            <input v-if="usuario.editando" v-model="usuario.email" />
            <span v-else>{{ usuario.email }}</span>
          </td>
          <td>{{ usuario.rol }}</td>
          <td>
            <select v-if="usuario.editando" v-model="usuario.estado">
              <option :value="1">Activo</option>
              <option :value="0">Inactivo</option>
            </select>
            <span v-else>{{ usuario.estado === 1 ? 'Activo' : 'Inactivo' }}</span>
          </td>
          <td>{{ usuario.direccion }}</td>
          <td>{{ usuario.fecha_registro.split('T')[0] }}</td>

          <td>
            <button class="btn" @click="abrirModal(usuario)">Vehículo</button>
            <template v-if="usuario.editando">
              <button class="btn guardar" @click="guardarCambios(usuario)">Guardar</button>
              <button class="btn cancelar" @click="cancelarEdicion(usuario)">Cancelar</button>
            </template>
            <template v-else>
              <button class="btn" @click="empezarEdicion(usuario)">Editar</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para registrar vehículo -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <h3 class="modal-titulo">Registrar Vehículo para {{ usuarioSeleccionado?.nombre_usuario }}</h3>

        <form @submit.prevent="registrarVehiculo">
          <label>Placa:</label>
          <input v-model="vehiculo.placa" required />

          <label>Marca:</label>
          <input v-model="vehiculo.marca" required />

          <label>Modelo:</label>
          <input v-model="vehiculo.modelo" required />

          <label>Color:</label>
          <input v-model="vehiculo.color" required />

          <label>Tipo de motor:</label>
          <input v-model="vehiculo.tipo_motor" required />
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

const usuarios = ref([])
const mostrarModal = ref(false)
const usuarioSeleccionado = ref(null)
const usuarioOriginal = ref({})

const vehiculo = ref({ placa: '', marca: '' })

const cargarUsuarios = async () => {
  try {
    const res = await axios.get('/api/clientes')
    // Agregar campo `editando` a cada usuario
    usuarios.value = res.data.map(u => ({ ...u, editando: false }))
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}
const empezarEdicion = (usuario) => {
  usuarioOriginal.value = { ...usuario } 
  usuario.editando = true
}
const cancelarEdicion = (usuario) => {
  Object.assign(usuario, usuarioOriginal.value)
  usuario.editando = false
}
const abrirModal = (usuario) => {
  usuarioSeleccionado.value = usuario
  vehiculo.value = { placa: '', marca: '', modelo: '', color: '', tipo_motor: '' }
  mostrarModal.value = true
}

const cerrarModal = () => {
  mostrarModal.value = false
}

const registrarVehiculo = async () => {
  try {
    await axios.post('/api/vehiculos', {
      ...vehiculo.value,
      ID_usuario: usuarioSeleccionado.value.Num_doc
    })
    message.success('Vehículo registrado')
    cerrarModal()
  } catch (error) {
    console.error('Error al registrar vehículo:', error)
    message.error('Error al registrar vehículo')
  }
}

const guardarCambios = async (usuario) => {
  try {
    await axios.put(`api/clientes/${usuario.Num_doc}`, {
      nombre_usuario: usuario.nombre_usuario,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
      email: usuario.email,
      estado: usuario.estado,
    })
    usuario.editando = false
    message.success('Usuario Actualizado')
  } catch (error) {
    console.error('Error al guardar cambios:', error)
    message.error('Error al actualizar usuario')
  }
}

onMounted(cargarUsuarios)
</script>

<style scoped>
.usuarios-container {
  padding: 1rem;
}

.titulo {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.tabla-usuarios {
  width: 100%;
  background-color: #0f0f0f0a;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tabla-usuarios thead {
  background-color: #343a40;
  color: #fff;
  text-align: left;
}

.tabla-usuarios th,
.tabla-usuarios td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
}

.tabla-usuarios th {
  background-color: #ff0000;
}

.tabla-usuarios tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tabla-usuarios tbody tr:hover {
  background-color: #eef2f7;
}

input {
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
}

.btn {
  background-color: #e53935;
  color: white;
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

input {
  border-radius: 6px; /* Ajusta el valor según qué tan curvo lo quieras */
  border: 1px solid #ccc;
  padding: 8px;
  outline: none;
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