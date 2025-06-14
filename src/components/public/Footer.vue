<template>
    <a-row type="flex" justify="start" class="div-footer">
        <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100086538198637">
                <FacebookOutlined class="icon-footer" /> Centro repuestos cucuta
            </a>
        </a-col>
        <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100086538198637">
                <InstagramOutlined class="icon-footer" />@centrorepuestoscucuta
            </a>
        </a-col>
        <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100086538198637">
                <WhatsAppOutlined class="icon-footer" />
            </a>
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
    align-items: center;
}

.div-footer>div>a {
    display: flex;
    align-items: center;
}
</style>