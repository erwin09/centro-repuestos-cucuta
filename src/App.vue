<template>
  <a-config-provider :locale="esES" :theme="{
    token: {
      colorPrimary: '#1677ff',
    },
  }">
    <a-layout class="layout">
      <a-layout-header v-if="logged" :style="headerStyle">
        <Header v-if="rol === 'administrador'" />
        <HeaderClien v-else-if="rol === 'cliente'" />
      </a-layout-header>
      <a-divider style="margin: 2px;"></a-divider>
      <a-layout-content class="layout-content">
        <RouterView />
      </a-layout-content>
      <a-layout-footer v-if="logged && rol ==='cliente'" :style="footerStyle">
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>
<script setup>
import esES from 'ant-design-vue/es/locale/es_ES';
import { useStoreApp } from './store/store';
import { computed } from 'vue';
import Header from './components/public/Header.vue';
import HeaderClien from './components/public/HeaderClien.vue';
import Footer from './components/public/Footer.vue';
const store = useStoreApp()
const logged = computed(() => store.isAuth);
const rol = computed(() => store.rol);

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#000000c7'
};

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

.layout {
  min-height: 100%;
}

.layout-content {
  min-height: 80vh;
  background-color: #ffff;
}
</style>
