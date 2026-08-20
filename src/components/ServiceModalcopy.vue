<template>
  <a-modal v-model:open="visible" title="Agregar Servicio Técnico" @ok="onOk" @cancel="onCancel" :width="850">
    <a-form layout="horizontal">
      <div class="contenedor">
        <img src="../assets/Tio.png" class="imagen">
      </div>
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

</script>
<style scoped>
.contenedor {
  display: flex;
  gap: 15px;
  align-items: center;
}

.imagen{
  width: 800px;
}

</style>