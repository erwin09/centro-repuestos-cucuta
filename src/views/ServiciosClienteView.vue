<template>
    <div class="servicios-container">
        <h2 class="titulo">Lista de servicios</h2>

        <table class="tabla-servicios">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tiempo estimado </th>
                    <th>Descripción del servicio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="servicio in servicios" :key="servicio.Id_servicios">
                    
                    <td>{{ servicio.nombre }}</td>

                    <td>{{ servicio.tiempo_estimado }}</td>

                    <td>{{ servicio.descripcion }}</td>

                </tr>

            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const servicios = ref([])


const cargarDatos = async () => {
    const [serRes] = await Promise.all([
        axios.get('/api/servicios'),
    ])
    servicios.value = serRes.data.result.map(s => ({
        ...s,
        editando: false
    }))
    .sort((a, b) => a.Id_servicios.localeCompare(b.Id_servicios))
}


onMounted(cargarDatos)
</script>

<style scoped>
.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.servicios-container {
    padding: 1rem;
}

.titulo {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

.tabla-servicios {
    width: 100%;
    background-color: #0f0f0f0a;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tabla-servicios thead {
    background-color: #343a40;
    color: #fff;
    text-align: left;
}

.tabla-servicios th,
.tabla-servicios td {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
}

.tabla-servicios th {
    background-color: #ff0000;
}

.tabla-servicios tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.tabla-servicios tbody tr:hover {
    background-color: #eef2f7;
}

input {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
}


</style>