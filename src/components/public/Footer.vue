<template>
    <a-row type="flex" justify="space-between" class="div-footer">
        <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <div class="logo-footer" />
        </a-col>
        <a-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <h2>Contacto</h2>
            <ul class="list-footer">
                <li>Celular: 3223691439</li>
                <li>WhatsApp: 322 3691439</li>
                <li>Correo: centrorepuestoscucuta@gmail.com</li>
            </ul>
        </a-col>
        <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <h2>Horarios</h2>
            <p style="font-weight: bold; margin: 0;">Lunes - Viernes: 07:45 am - 06:00 pm</p>
            <p style="font-weight: bold; margin: 0;">Sabados: 07:45 am - 05:00 pm</p>
            <p style="font-weight: bold; margin: 0;">Festivos: 08:00 am - 01:00 pm</p>
            <h2 style="padding-bottom: 0.2rem; margin-bottom: 0.5rem;">Síguenos</h2>
            <div style="display: flex;">
                <a target="_blank" href="https://www.facebook.com/profile.php?id=100085903656307">
                    <FacebookOutlined class="icon-footer" />
                </a>
                <a target="_blank" href="https://www.instagram.com/centrorepuestoscucuta/">
                    <InstagramOutlined class="icon-footer" />
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
    font-size: 30px;
    color: #ffffff;
    padding: 0.3rem;
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
    width: 280px;
    height: 120px;

    /* background-image: url('../../assets/logo-centro-repuestos.png');*/
    background-image: url('../../assets/images/image-inicio/logo-en-blanco.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.list-footer {
    font-weight: bold;
    list-style: none !important;
    padding: 1.8rem;
    margin-right: 0.2rem;
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