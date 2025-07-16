<template>
    <div class="productos-container">
        <h2 class="titulo">Lista de repuestos</h2>

        <div class="catalogo-grid">
            <div class="producto-card" v-for="producto in productos" :key="producto.Id_producto">
                <div class="card-header">
                    <h3>{{ producto.nombre }}</h3>
                    <p class="codigo">#{{ producto.Id_producto }}</p>
                </div>
                <div class="card-body">
                    <p><strong>Marca:</strong> {{ producto.nombre_marca }}</p>
                    <p><strong>Estado:</strong> {{ producto.estado === 1 ? 'Existencia' : 'Agotado' }}</p>
                    <p><strong>Procedencia:</strong> {{ producto.procedencia }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const productos = ref([])

const cargarDatos = async () => {
    const [prodRes] = await Promise.all([
        axios.get('/api/productos/tabla'),
    ])

    productos.value = prodRes.data.result.map(p => ({
        ...p,
        editando: false
    }))
}

onMounted(cargarDatos)
</script>

<style scoped>
.productos-container {
    padding: 1rem;
}

.titulo {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

.catalogo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding: 1rem;
}

.producto-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: 0.2s;
}

.producto-card:hover {
  transform: translateY(-4px);
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #e53935;
}

.codigo {
  font-size: 0.85rem;
  color: #555;
}

.card-body p {
  margin: 4px 0;
  font-size: 0.9rem;
}

.card-actions {
  margin-top: 10px;
  text-align: right;
}
</style>