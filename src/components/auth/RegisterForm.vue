<template>
  <div style="max-width: 1000px; margin: auto; padding: 2rem">
    <h2 style="text-align: center; margin-bottom: 2rem">Registro de Usuario</h2>

      <a-form
      layout="vertical"
      :model="form"
      :rules="rules"
      ref="formRef"
    >
  
    <div style="display: flex; gap: 20px">  
        <!-- Columna 1 -->
        <div style="flex: 1">
          <a-form-item label="Nombre" name="nombre">
            <a-input v-model:value="form.nombre" placeholder="Ingresa tu nombre" />
          </a-form-item>

          <a-form-item label="Apellido" name="apellido">
            <a-input v-model:value="form.apellido" placeholder="Ingresa tu apellido" />
          </a-form-item>

          <a-form-item label="Teléfono" name="telefono">
            <a-input v-model:value="form.telefono" placeholder="Ingresa tu teléfono" />
          </a-form-item>

          <a-form-item label="Email" name="email">
            <a-input v-model:value="form.email" placeholder="Ingresa tu email" />
          </a-form-item>

          <a-form-item label="Tipo Documento" name="tipoDocumento">
            <a-select v-model:value="form.tipoDocumento" placeholder="Selecciona tipo">
              <a-select-option value="CC">Cédula</a-select-option>
              <a-select-option value="TI">Tarjeta de Identidad</a-select-option>
              <a-select-option value="CE">Cédula Extranjera</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <!-- Columna 2 -->
        <div style="flex: 1">
          <a-form-item label="Número Documento" name="numeroDocumento">
            <a-input v-model:value="form.numeroDocumento" placeholder="Número del documento" />
          </a-form-item>

          <a-form-item label="Contraseña" name="password">
            <a-input-password v-model:value="form.password" placeholder="Ingresa tu contraseña" />
          </a-form-item>

          <a-form-item label="Confirmar Contraseña" name="confirmPassword">
          <a-input-password v-model:value="form.confirmPassword" placeholder="Repite la contraseña" />
          </a-form-item>

          <a-form-item label="Rol" name="rol">
            <a-select v-model:value="form.rol" placeholder="Selecciona un rol">
              <a-select-option value="usuario">Usuario</a-select-option>
              <a-select-option value="admin">Administrador</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Estado" name="estado">
            <a-select v-model:value="form.estado" placeholder="Estado de cuenta">
              <a-select-option value="activo">Activo</a-select-option>
              <a-select-option value="inactivo">Inactivo</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Fecha de Registro" name="fechaRegistro">
            <a-date-picker v-model:value="form.fechaRegistro" style="width: 100%" />
          </a-form-item>
        </div>
      </div>

      <a-form-item style="text-align: center; margin-top: 2rem">
        <a-button type="primary" @click="handleSubmit">Registrar</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
const formRef = ref()

const form = reactive({
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  tipoDocumento: '',
  numeroDocumento: '',
  password: '',
  confirmPassword: '',
  rol: '',
  estado: '',
  fechaRegistro: null
})

// validaciones ponemos campo obligatorio y solamente el tipo de dato 
const rules = {
  nombre: [{ required: true, message: 'El nombre es requerido', trigger: 'blur' } ,
    { pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, message: 'Solo letras', trigger: 'blur' } 
  ],
  apellido: [{ required: true, message: 'El apellido es requerido', trigger: 'blur' },
    { pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, message: 'Solo letras', trigger: 'blur' }
  ],
  telefono: [{ required: true, message: 'El teléfono es requerido', trigger: 'blur' },
    { pattern: /^[0-9]{7,15}$/, message: 'Debe ser un número válido', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'El email es requerido', trigger: 'blur' },
    { type: 'email', message: 'El email no es válido', trigger: 'blur' }
  ],
  tipoDocumento: [{ required: true, message: 'Selecciona un tipo de documento', trigger: 'change' } ],

  numeroDocumento: [{ required: true, message: 'El número es requerido', trigger: 'blur' },
    { pattern: /^[0-9]{6,15}$/, message: 'Debe tener solo números (mín. 6 dígitos)', trigger: 'blur' }
  ],
  password: [{ required: true, message: 'Ingresa una contraseña', trigger: 'blur' },
      { min: 6, message: 'Mínimo 6 caracteres', trigger: 'blur' }
  ],

  confirmPassword: [
  { required: true, message: 'Confirma tu contraseña', trigger: 'blur' },
  {
    validator: (_, value) => {
      if (value === form.password) {
        return Promise.resolve()
      }
      return Promise.reject('Las contraseñas no coinciden')
    },
    trigger: 'blur'
  }
],
 
  rol: [{ required: true, message: 'Selecciona un rol', trigger: 'change' }],

  estado: [{ required: true, message: 'Selecciona un estado', trigger: 'change' }],

  fechaRegistro: [{ required: true, message: 'Selecciona una fecha', trigger: 'change' }],
}
const handleSubmit = () => {
  formRef.value.validate().then(() => {
    console.log(' Formulario válido:', form)

    // Mostrar mensaje de éxito
    message.success(' Registro exitoso')

    // Limpiar formulario
    Object.keys(form).forEach(key => form[key] = key === 'fechaRegistro' ? null : '')
  })
     //conectar al backend ,yo no se como se hace
    .catch(() => {
    console.log(' Validación fallida')
  })
}
</script>