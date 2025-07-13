<template>
    <a-row type="flex" justify="center" class="div-footer">
        <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <div class="logo-footer" />
        </a-col>
        <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <h2>Contacto</h2>
            <ul class="list-footer">
                <li>Pbx: 987654321</li>
                <li>Celular: 987654321</li>
                <li>WhatsApp: 987654321</li>
                <li>Correo: correo@gmail.com</li>
            </ul>
        </a-col>
        <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <h2>Horarios</h2>
            <p style="font-weight: bold;">Lunes - Viernes; 08:00 am - 05:00 pm</p>
            <h2>Síguenos</h2>
            <div style="display: flex;">
                <a target="_blank" href="https://www.facebook.com/profile.php?id=100086538198637">
                    <FacebookOutlined class="icon-footer" />
                </a>
                <a target="_blank" href="https://www.facebook.com/profile.php?id=100086538198637">
                    <InstagramOutlined class="icon-footer" />
                </a>
                <a target="_blank" href="https://www.facebook.com/profile.php?id=100086538198637">
                    <WhatsAppOutlined class="icon-footer" />
                </a>
            </div>

        </a-col>
    </a-row>
</template>
<script setup>
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons-vue';
</script>
<style>
.icon-footer {
    font-size: 35px;
    color: #FF5722;
}

.div-footer {
    text-align: start;
}

.div-footer>div>a {
    display: flex;
    align-items: start;
}

.logo-footer {
    float: left;
    width: 200px;
    height: 80px;

    /* background-image: url('../../assets/logo-centro-repuestos.png');*/
    background-image: url('../../assets/images/image-inicio/logo-en-blanco.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.list-footer {
    font-weight: bold;
    list-style: none !important;
    padding: 0;
    color: #ffff !important;
}

.list-footer>li {
    font-weight: bold;
    text-decoration: none !important;
    color: #ffff !important;
}

.list-footer>li>a {
    font-weight: bold;
    color: #ffff !important;
}
</style>