<template>
    <div class="header">
        <div class="logo-menu" /> <a-menu class="menu-ppal" v-model:selectedKeys="current" mode="horizontal"
            @select="redirectMenu" :items="items" />
        <button @click="cerrarSesion" class="logout-btn">Cerrar sesión</button>
    </div>
</template>
<script setup>
import { h, ref } from 'vue';
import { NotificationOutlined, SettingOutlined, HomeOutlined, UserOutlined, CalendarOutlined, CarOutlined, BarsOutlined } from '@ant-design/icons-vue';

import { useRouter } from 'vue-router'
import { useStoreApp } from '../../store/store';

const store = useStoreApp();


const current = ref(['mail']);
const items = ref([
    {
        key: '/',
        icon: () => h(HomeOutlined),
        label: 'Inicio',
        title: 'Inicio',
    },
    {
        key: '1',
        icon: () => h(UserOutlined),
        label: 'Usuarios',
        title: 'Usuarios',
        children: [
            {
                label: 'Lista usuarios',
                key: '/usuarios'
            },
            {
                label: 'Registrar usuario',
                key: '/registroUsuario'
            },
        ]
    },
    {
        key: '/citas',
        icon: () => h(CalendarOutlined),
        label: 'Citas',
        title: 'Citas',

    },
    {
        key: '/mantenimientos',
        icon: () => h(CarOutlined),
        label: 'Mantenimientos',
        title: 'Mantenimientos',
    },
    {
        key: '/servicios',
        icon: () => h(SettingOutlined),
        label: 'Servicios',
        title: 'Servicios',
    },
    {
        key: '6',
        label: 'Repuestos',
        icon: () => h(BarsOutlined),
        title: 'Repuestos',
        children: [
            {
                label: 'Lista repuestos',
                key: '/repuestos'
            },
            {
                label: 'Registrar repuestos',
                key: '/registroRepuesto'
            },
        ]
    },
    {
        key: '/notificaciones',
        icon: () => h(NotificationOutlined),
        label: 'Notificaciones',
        title: 'Notificaciones',
    },

]);

const router = useRouter()

const redirectMenu = (e) => {
    console.log(e);
    router.push(e.key)
}
const cerrarSesion = () => {
    store.$reset()
    localStorage.clear()
    router.push('/login')
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
    background-color: #e53935;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
}

.logout-btn:hover {
    background-color: #c62828;
}
</style>