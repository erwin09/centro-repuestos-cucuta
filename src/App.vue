<template>
  <a-config-provider :locale="esES" :theme="{
    token: {
      colorPrimary: '#1677ff',
    },
  }">
    <RouterView />

  </a-config-provider>
</template>
<script setup>
import esES from 'ant-design-vue/es/locale/es_ES';
import HelloWorld from './components/HelloWorld.vue'
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
