<template>
    <div>

        <label for="num1">Primer numero:</label>
        <input type="number" id="edad" v-model.number=num1 step="1" />

        <label for="num2">Segundo numero:</label>
        <input type="number" id="edad" v-model.number=num2 step="1" />

        <button @click="mostrarNumPrimos">Calcular</button>

        <p v-if="lista.length">Primos: {{ lista.join(', ') }}</p>

    </div>
</template>
<script setup>

import { ref } from 'vue';
const num1 = ref(0);
const num2 = ref(0);
const lista = ref([]);

function esPrimo(n) {
    if (n < 2) {
        return false};
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function calcularPrimos(num1, num2) {
    return new Promise((resolve) => {
        const numeroPrimo = [];
        for (let i = num1; i <= num2; i++) {
            if (esPrimo(i)) {
                numeroPrimo.push(i);
            }
        }
        resolve(numeroPrimo);
    })
}

async function mostrarNumPrimos() {
    lista.value = await calcularPrimos(num1.value, num2.value)
}

</script>

<style scoped></style>