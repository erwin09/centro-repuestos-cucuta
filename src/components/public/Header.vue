<template>
    <div class="logo-menu" /> <a-menu class="menu-ppal" v-model:selectedKeys="current" mode="horizontal"
        @select="redirectMenu" :items="items" />
</template>
<script setup>
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'

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
</script>
<style>
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
    float: right;
}
</style>