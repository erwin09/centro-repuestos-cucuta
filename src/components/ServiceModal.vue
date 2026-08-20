<template>
  <a-modal v-model:open="visible" title="Agregar Servicio Técnico" @ok="onOk" @cancel="onCancel">
    <a-form layout="vertical">
      <a-form-item label="Servicio técnico">
        <a-select show-search v-model:value="servicio.id" :options="serviciosOptions"
          placeholder="Buscar por nombre"
          :filter-option="(input, option) => option.label.toLowerCase().includes(input.toLowerCase())" />
      </a-form-item>
      <a-form-item label="Técnico">
        <a-select v-model:value="servicio.tecnico" style="width: 100%;">
          <option value="Fabian Illeras">Fabian Illeras</option>
          <option value="Yeison Illeras">Yeison Illeras</option>
        </a-select>
      </a-form-item>
      <a-form-item label="Precio">
        <a-input-number v-model:value="servicio.precio" min="0" style="width: 100%" @keypress="evitarLetras"
          @input="() => validarNumero(servicio, 'precio', 0)" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { toRefs, watch, reactive } from 'vue'
const props = defineProps({
  visible: Boolean,
  servicio: Object,
  serviciosOptions: Array
})
const emit = defineEmits(['update:visible', 'ok'])

const { visible } = toRefs(props)

const onCancel = () => {
  emit('update:visible', false)
}

const onOk = () => {
  emit('ok')
  emit('update:visible', false)
}

const evitarLetras = (event) => {
  const tecla = event.key
  const regex = /^[0-9.]$/
  if (!regex.test(tecla)) event.preventDefault()
}
const validarNumero = (objeto, campo, minimo) => {
  let valor = objeto[campo]
  const valorStr = String(valor)
  if (/^0[0-9]+$/.test(valorStr)) valor = parseFloat(valorStr.replace(/^0+/, ''))
  else valor = parseFloat(valor)
  if (isNaN(valor) || valor < minimo) objeto[campo] = minimo
  else objeto[campo] = valor
}
</script>