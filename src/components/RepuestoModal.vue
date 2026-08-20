<template>
  <a-modal v-model:open="visible" title="Agregar Repuesto" @ok="onOk" @cancel="onCancel">
    <a-form layout="vertical">
      <a-form-item label="Repuesto">
        <a-select show-search v-model:value="repuesto.id" :options="productosOptions"
          placeholder="Buscar por nombre o marca"
          :filter-option="(input, option) => option.label.toLowerCase().includes(input.toLowerCase())" />
      </a-form-item>
      <a-form-item label="Cantidad">
        <a-input-number v-model:value="repuesto.cantidad" min="1" style="width: 100%" @keypress="evitarLetras"
          @input="() => validarNumero(repuesto, 'cantidad', 0)" />
      </a-form-item>
      <a-form-item label="Precio">
        <a-input-number v-model:value="repuesto.precio" min="0" style="width: 100%" @keypress="evitarLetras"
          @input="() => validarNumero(repuesto, 'precio', 0)" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  visible: Boolean,
  repuesto: Object,
  productosOptions: Array
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