<template>
  <div style="max-width: 1000px; margin: auto; padding: 2rem">
    <h2 style="text-align: center; margin-bottom: 2rem">Registro de Vehículo</h2>

    <a-form
      layout="vertical"
      :model="form"
      :rules="rules"
      ref="formRef"
    >
      <div style="display: flex; gap: 20px">
        <!-- Columna 1 -->
        <div style="flex: 1">
          <a-form-item label="Placa" name="placa">
            <a-input v-model:value="form.placa" placeholder="Ej: ABC123" />
          </a-form-item>

          <a-form-item label="Marca" name="marca">
            <a-input v-model:value="form.marca" placeholder="Ej: Toyota" />
          </a-form-item>

          <a-form-item label="Modelo" name="modelo">
            <a-input v-model:value="form.modelo" placeholder="Ej: 2022" />
          </a-form-item>
        </div>

        <!-- Columna 2 -->
        <div style="flex: 1">
          <a-form-item label="Color" name="color">
            <a-input v-model:value="form.color" placeholder="Ej: Rojo" />
          </a-form-item>

          <a-form-item label="Tipo de Motor" name="tipoMotor">
            <a-select v-model:value="form.tipoMotor" placeholder="Selecciona tipo de motor">
              <a-select-option value="gasolina">Gasolina</a-select-option>
              <a-select-option value="diesel">Diésel</a-select-option>
              <a-select-option value="electrico">Eléctrico</a-select-option>
              <a-select-option value="hibrido">Híbrido</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="ID Usuario" name="idUsuario">
            <a-input-number v-model:value="form.idUsuario" style="width: 100%" :min="1" />
          </a-form-item>
        </div>
      </div>

      <a-form-item style="text-align: center; margin-top: 2rem">
        <a-button type="primary" @click="handleSubmit">Registrar Vehículo</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'

const formRef = ref()

const form = reactive({
  placa: '',
  marca: '',
  modelo: '',
  color: '',
  tipoMotor: '',
  idUsuario: null
})

const rules = {
  placa: [
    { required: true, message: 'La placa es requerida', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9-]{5,10}$/, message: 'Formato de placa inválido', trigger: 'blur' }
  ],
  marca: [
    { required: true, message: 'La marca es requerida', trigger: 'blur' },
    { pattern: /^[A-Za-z\s]+$/, message: 'Solo letras', trigger: 'blur' }
  ],
  modelo: [
    { required: true, message: 'El modelo es requerido', trigger: 'blur' },
    { pattern: /^[0-9]{4}$/, message: 'Debe ser un año válido', trigger: 'blur' }
  ],
  color: [
    { required: true, message: 'El color es requerido', trigger: 'blur' },
    { pattern: /^[A-Za-z\s]+$/, message: 'Solo letras', trigger: 'blur' }
  ],
  tipoMotor: [
    { required: true, message: 'Selecciona el tipo de motor', trigger: 'change' }
  ],
  idUsuario: [
    { required: true, message: 'ID Usuario requerido', trigger: 'blur' },
    { type: 'number', min: 1, message: 'Debe ser un número válido', trigger: 'blur' }
  ]
}

const handleSubmit = () => {
  formRef.value.validate().then(() => {
    console.log('Formulario válido:', form)
    message.success('Vehículo registrado exitosamente')

    // Reiniciar formulario
    Object.keys(form).forEach(key => form[key] = key === 'idUsuario' ? null : '')
  }).catch(() => {
    console.log('Validación fallida')
  })
}
</script>