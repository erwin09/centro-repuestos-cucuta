<template>
    <div class="header">
    <div class="logo-menu" /> 
    <a-menu class="menu-ppal" v-model:selectedKeys="current" mode="horizontal"
        @select="redirectMenu" :items="items" />
        <button @click="cerrarSesion" class="logout-btn">Cerrar sesión</button>
        </div>
</template>
<script setup>
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'
import { useStoreApp } from '../../store/store';

const store = useStoreApp();


const current = ref(['mail']);
const items = ref([
    {
        key: '/about',
        icon: () => h(HomeOutlined),
        label: 'Inicio',
        title: 'Inicio',
    },
    {
        key: '2',
        icon: () => h(AppstoreOutlined),
        label: 'Citas',
        title: 'Citas',
    },
    {
        key: '3',
        icon: () => h(SettingOutlined),
        label: 'Servicios',
        title: 'Servicios',
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        key: '4',
        label: 'Repuestos',
        icon: () => h(SettingOutlined),
        title: 'Repuestos', 
    },
    
]);

const router = useRouter()

const redirectMenu = (e) => {
    console.log(e);
    router.push(e.key)
}
const cerrarSesion = () => {
  store.$reset()            // Resetea el estado de autenticación
  localStorage.clear()      // Limpia el localStorage
  router.push('/login')     // Redirige al login
}
</script>
<style>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.logo-menu {
    float: left;
    width: 150px;
    height: 50px;
    background-image: url('../../assets/logo-centro-repuestos.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.menu-ppal {
    flex-grow: 1;
  justify-content: center;
  display: flex;
}
.logout-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #d9363e;
}
</style>