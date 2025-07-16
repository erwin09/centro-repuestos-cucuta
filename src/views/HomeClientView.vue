<template>
    <Carrousel />
    <h2 style= "display: flex; justify-content: center; font-size: 250%;">Nuestros repuestos</h2>
    <div class="galeria-servicios">

        <div class="recuadro" v-for="(img, index) in imagenes" :key="index">
            <img :src="img.item" :alt="img.titulo" />
            <h4 style="font-size: 1.5rem;">{{ img.titulo }}</h4>
        </div>
    </div>

    <div style="display: flex; flex-wrap: wrap; padding: 2rem; gap: 2rem;">
        <!-- Mitad izquierda -->
        <div
            style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 300px;gap: 1rem;">
            <h2>Nuestros servicios</h2>
            <a-image width="90%" :preview="false" x
                src="/src/assets/images/image-inicio/imagenes servicios/servicio1.png"
                style="border-radius: 12px; margin-top: 0;" />
            <p style="margin-top: 0; margin-bottom: 0; font-size: 120%;">
                En <strong>Centro Repuestos Cúcuta</strong>, tu seguridad y comodidad en la vía son nuestra prioridad.
                Te ofrecemos un servicio integral y especializado para mantener tu vehículo en óptimas condiciones.
            </p>
            <ul style="margin-top: 0; font-size: 120%;">
                <li>✅ <strong>Revisión y mantenimiento de frenos y suspensión:</strong> Detectamos y corregimos
                    cualquier falla
                    que ponga en riesgo tu seguridad.</li>
                <li>⛽ <strong>Cambio de aceites y filtros:</strong> Usamos productos de alta calidad para un mejor
                    rendimiento
                    del motor.</li>

            </ul>
        </div>

        <!-- Mitad derecha con el mapa -->
        <div
            style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 300px;">
            <h2>Nuestra ubicación</h2>
            <iframe width="90%" height="60%"
                style="border:0; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.2);" loading="lazy"
                allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="mapUrl">
            </iframe>
            <ul style="margin-top: 1.5rem; font-size: 120%;">
                <li>🔩 <strong>Sincronización profesional:</strong> Mejoramos el consumo de combustible y el
                    funcionamiento del
                    motor.</li>
                <li>⏱️ <strong>Cambio de correa de tiempos:</strong> Evita daños mayores con un cambio oportuno y
                    garantizado.
                </li>
                <li>👂 <strong>Diagnóstico de ruidos molestos en la suspensión:</strong> Si algo suena extraño,
                    ¡nosotros lo
                    solucionamos!</li>
            </ul>
        </div>
    </div>
    <a :href="'https://wa.me/573223691439'" target="_blank" class="whatsapp-float" aria-label="WhatsApp">
    <img src="/src/assets/images/Boton whatsapp.png" alt="WhatsApp" />
  </a>
</template>

<script setup>
import img1 from '../assets/images/image-inicio/imagenes repuestos/1.png';
import img2 from '../assets/images/image-inicio/imagenes repuestos/2.png';
import img3 from '../assets/images/image-inicio/imagenes repuestos/3.png';
import img4 from '../assets/images/image-inicio/imagenes repuestos/4.png';


import Carrousel from '../components/public/Carrousel.vue'
const imagenes = [
    { item: img1, titulo: 'Direcciones' },
    { item: img2, titulo: 'Suspensión' },
    { item: img3, titulo: 'Frenos' },
    { item: img4, titulo: 'Embragues' }
]
const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d289.14213032629897!2d-72.50424665255765!3d7.896477429813448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66459651fab71b%3A0xb820fec33d6136a7!2sCentro%20Repuestos%20C%C3%BAcuta!5e0!3m2!1ses!2sco!4v1752503164101!5m2!1ses!2sco'
</script>

<style>
.galeria-servicios {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.recuadro {
    text-align: center;
    width: 320px;
    padding: 0.5rem;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.recuadro:hover {
    transform: scale(1.05);
}

.recuadro img {
    width: 300px;
    height: 300px;
    object-fit: contain;
    margin-bottom: 0.5rem;
}


.whatsapp-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  background: white;
  width: 143px;
  height: 46px;
  border-radius: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.whatsapp-float img {
  width: 200px;
  height: 70px;
}
</style>