<template>
    <a-carousel autoplay>
        <div v-for="item in items" :key="item.key">
            <img :src="item.url" />
        </div>
    </a-carousel>
</template>
<script setup>
import img1 from '../../assets/images/image-inicio/carrusel/1.png';
import img2 from '../../assets/images/image-inicio/carrusel/2.png';
import img3 from '../../assets/images/image-inicio/carrusel/3.png';
import img4 from '../../assets/images/image-inicio/carrusel/4.png';

const items = [
    { key: "1", url: img1 },
    { key: "2", url: img2 },
    { key: "3", url: img3 },
    { key: "4", url: img4 },
];

</script>
<style scoped>

.a-carousel,
.a-carousel .slick-slider,
.a-carousel .slick-list,
.a-carousel .slick-track,
.a-carousel .slick-slide,
.a-carousel .slick-slide > div {
  width: 100vw;
  height: 100vh; /* o ajusta el alto como desees */
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* para que no se distorsione */
  display: block;
}


</style>