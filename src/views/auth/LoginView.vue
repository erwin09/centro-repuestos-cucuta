<template>
    <div class="full-screen screen-login">
        <a-row class="full-screen" justify="center" align="middle">
            <a-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="card-login">
                <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish"
                    @finishFailed="onFinishFailed">
                    <a-row type="flex" justify="space-around">
                        <h1>Ingresar</h1>
                    </a-row>
                    <a-row type="flex" justify="space-around">
                        <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                            <label>Usuario</label>
                            <a-form-item name="username"
                                :rules="[{ required: true, message: 'Este campo es obligatorio.' }]">
                                <a-input v-model:value="formState.username" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="space-around">
                        <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                            <label>Contraseña</label>
                            <a-form-item name="password"
                                :rules="[{ required: true, message: 'Este campo es obligatorio.' }]">
                                <a-input-password v-model:value="formState.password" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="space-around">
                        <router-link to="/forgot" class="enlace">Olvidaste contraseña</router-link>
                    </a-row>
                    <a-row type="flex" justify="space-around">
                        <a-button type="primary" html-type="submit">Iniciar Sesión</a-button>
                    </a-row>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import axios from 'axios';
import { message } from 'ant-design-vue'
import { notification } from 'ant-design-vue';
import { useStoreApp } from '../../store/store';
import { useRouter } from 'vue-router';
const router = useRouter();

import { reactive } from 'vue';
const formState = reactive({
    username: '',
    password: '',
    remember: true,
});
const store = useStoreApp();

const onFinish = values => {
    console.log('Success:', values);
    const body = {
        Num_doc: values.username,
        contraseña: values.password
    }

    axios.post('/api/auth/login', body).then(res => {

        console.log('Respuesta del servidor:', res); 

        if (res.status === 200) {
            const usuario = res.data.login?.usuario;
            const rol = usuario?.rol;
            console.log('Rol recibido:', rol);

            store.login(rol);

            switch (rol) {
                case "administrador":
                    router.push('/'); 
                    break;
                case "cliente":
                    router.push('/cliente'); 
                    break;
                default:
                    message.warning('Rol no reconocido. No se redirigió.');
                    break;
            }
        }

    }).catch(e => {
        if (e.response && e.response.status === 401) {
           // message.error('Contraseña incorrecta');
            notification.open({
                message: 'Contraseña incorrecta',
                description:
                    'Verifique su contraseña, ¿olvidaste tu contraseña?',
                duration: 4,
            });
        } else if (e.response && e.response.status === 404) {
            message.error(e.response.data.message || 'Ocurrió un error');
        }
        else {
            message.error(e.response.data.message || 'Error de conexión con el servidor');
        }
        console.log("Se ha producido un error.", e);

    })

};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};



</script>
<style scoped>
.screen-login {
    background-image: url('../../assets/logo-centro-repuestos.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    /* o un % si quieres ajustarlo más */
}

.full-screen {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    /* evita el scroll */
}

.card-login {
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(246, 241, 241, 0.9);
}

.enlace {
    color: black;
}

</style>