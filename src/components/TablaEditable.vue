<template>
  <a-table :columns="columns" :data-source="data" :row-key="rowKey" :pagination="false" />
</template>
<script setup>
defineProps({
  columns: Array,
  data: Array,
  rowKey: String
})
</script>