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
                                <a-input v-model:value="formState.password" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="space-around">
                        <router-link to="/forgot">Olvidaste contraseña</router-link>
                    </a-row>
                    <a-row type="flex" justify="space-around">
                        <a-button type="primary">Iniciar Sesión</a-button>
                    </a-row>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>

import { reactive } from 'vue';
const formState = reactive({
    username: '',
    password: '',
    remember: true,
});
const onFinish = values => {
    console.log('Success:', values);
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
  background-size: contain; /* o un % si quieres ajustarlo más */
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
</style>