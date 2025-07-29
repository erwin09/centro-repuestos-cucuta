<template>
  <a-modal v-model:open="visible" title="Recuperar contraseña" @ok="handleOk" :footer="null">
    <div v-if="paso === 1">
      <a-form @submit.prevent="enviarCodigo">
        <a-form-item label="Número de documento">
          <a-input v-model:value="form.Num_doc" required />
        </a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">Enviar código</a-button>
      </a-form>
    </div>

    <div v-else-if="paso === 2">
      <a-form @submit.prevent="verificarCodigo">
        <a-form-item label="Código de verificación">
          <a-input v-model:value="form.codigo" required />
        </a-form-item>
        <a-form-item label="Nueva contraseña">
          <a-input-password v-model:value="form.contrasena" required />
        </a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">Cambiar contraseña</a-button>
      </a-form>
    </div>

    <a-alert v-if="mensaje" :message="mensaje" type="success" show-icon closable class="mt-2" />
    <a-alert v-if="error" :message="error" type="error" show-icon closable class="mt-2" />
  </a-modal>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const visible = ref(false)
const paso = ref(1)
const loading = ref(false)
const form = ref({
  Num_doc: '',
  codigo: '',
  contrasena: ''
})
const mensaje = ref('')
const error = ref('')

const abrirModal = () => {
  visible.value = true
  paso.value = 1
  mensaje.value = ''
  error.value = ''
  form.value = { Num_doc: '', codigo: '', contrasena: '' }
}

const enviarCodigo = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.post('/api/clientes/recuperar/enviar', {
      Num_doc: form.value.Num_doc
    })
    console.log("Respuesta del backend:", res.data.message)

    mensaje.value = res.data.message || 'Código enviado.'
    paso.value = 2
    setTimeout(() => {
    mensaje.value = '';
  }, 3000);

  } catch (err) {
    error.value = err.response?.data?.mensaje || 'Error al enviar el código.'
    setTimeout(() => {
    error.value = '';
  }, 3000);

  } finally {
    loading.value = false
  }
}

const verificarCodigo = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.post('/api/clientes/recuperar/verificar', {
      Num_doc: form.value.Num_doc,
      codigo: form.value.codigo,
      nuevaContrasena: form.value.contrasena
    })
    mensaje.value = '¡Contraseña actualizada correctamente!'
    paso.value = 1
  } catch (err) {
    error.value = err.response?.data?.mensaje || 'Error al actualizar la contraseña.'
  } finally {
    loading.value = false
  }
}
const handleOk = () => {
  visible.value = false
  paso.value = 1
  mensaje.value = ''
  error.value = ''
  form.value = { Num_doc: '', codigo: '', contrasena: '' }
}

defineExpose({ abrirModal })
</script>