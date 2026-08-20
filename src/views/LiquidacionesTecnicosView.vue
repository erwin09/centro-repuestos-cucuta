<template>
    <section class="page">
        <header class="page-header">
            <div>
                <p class="eyebrow">Control financiero</p>
                <h1>Cuadre de tecnicos</h1>
                <p class="muted">Consulta labores y valores por dia o rango de fechas.</p>
            </div>
            <a-button type="primary" :disabled="!canCalculate" @click="calculate">Calcular liquidacion</a-button>
        </header>

        <a-card class="filters" :bordered="false">
            <a-row :gutter="16" align="bottom">
                <a-col :xs="24" :md="8"><a-form-item label="Tecnico"><a-select v-model:value="filters.tecnico_id"
                            placeholder="Selecciona tecnico" allow-clear style="width: 100%"><a-select-option
                                v-for="tecnico in tecnicos" :key="tecnico.id" :value="tecnico.id">{{ tecnico.nombre }}
                                {{ tecnico.apellidos }}</a-select-option></a-select></a-form-item></a-col>
                <a-col :xs="24" :md="12"><a-form-item label="Periodo"><a-range-picker v-model:value="dateRange"
                            value-format="YYYY-MM-DD" style="width: 100%" /></a-form-item></a-col>
                <a-col :xs="24" :md="4"><a-button block @click="loadCuadre">Consultar</a-button></a-col>
            </a-row>
        </a-card>

        <a-alert v-if="error" type="error" :message="error" show-icon closable @close="error = ''" />
        <a-spin :spinning="loading">
            <a-row :gutter="16" class="summary">
                <a-col v-for="item in summary" :key="item.label" :xs="24" :sm="12" :lg="6"><a-card>
                        <div class="summary-label">{{ item.label }}</div><strong>{{ money(item.value) }}</strong>
                    </a-card></a-col>
            </a-row>
            <a-card title="Ordenes incluidas" :bordered="false">
                <a-table :data-source="cuadre.ordenes" :columns="columns" row-key="id_mantenimiento"
                    :pagination="{ pageSize: 8 }" :scroll="{ x: 980 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'orden'"><strong>{{ record.id_mantenimiento }}</strong>
                            <div class="muted">{{ record.fecha }} · {{ record.placa }}</div>
                        </template>
                        <template v-else-if="column.key === 'servicios'">
                            <div v-for="(service, index) in record.servicios_realizados" :key="index">{{ service.nombre
                                || 'Labor' }}: {{ money(service.valor_labor) }}</div>
                        </template>
                        <template v-else-if="column.key === 'total_orden_cliente'">{{ money(record.total_orden_cliente)
                            }}</template>
                        <template v-else-if="column.key === 'total_labor'">{{ money(record.total_labor) }}</template>
                        <template v-else-if="column.key === 'total_tecnico'"><strong>{{ money(record.total_tecnico)
                                }}</strong></template>
                    </template>
                </a-table>
            </a-card>
        </a-spin>
    </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import tecnicoService from '../services/tecnicoService';
import liquidacionService from '../services/liquidacionTecnicoService';

const tecnicos = ref([]);
const loading = ref(false);
const error = ref('');
const dateRange = ref([]);
const filters = reactive({ tecnico_id: undefined });
const cuadre = ref({ ordenes: [], totales: { total_orden_cliente: 0, total_labor: 0, total_tecnico: 0, total_pagado: 0, saldo_pendiente: 0 } });
const columns = [
    { title: 'Orden / vehiculo', key: 'orden', fixed: 'left' },
    { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
    { title: 'Servicios y labores', key: 'servicios' },
    { title: 'Total orden', key: 'total_orden_cliente' },
    { title: 'Mano de obra', key: 'total_labor' },
    { title: 'Corresponde tecnico', key: 'total_tecnico' }
];
const summary = computed(() => [
    { label: 'Total ordenes', value: cuadre.value.totales.total_ordenes || 0 },
    { label: 'Total cobrado cliente', value: cuadre.value.totales.total_orden_cliente || 0 },
    { label: 'Total mano de obra', value: cuadre.value.totales.total_labor || 0 },
    { label: 'Total tecnico', value: cuadre.value.totales.total_tecnico || 0 }
]);
const canCalculate = computed(() => filters.tecnico_id && dateRange.value?.length === 2);
function money(value) { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(Number(value || 0)); }
async function loadTecnicos() { tecnicos.value = (await tecnicoService.list()).data; }
async function loadCuadre() {
    if (!canCalculate.value) { error.value = 'Selecciona tecnico y rango de fechas'; return; }
    loading.value = true;
    try { cuadre.value = (await liquidacionService.cuadre({ tecnico_id: filters.tecnico_id, fecha_inicio: dateRange.value[0], fecha_fin: dateRange.value[1] })).data; } catch (e) { error.value = e.response?.data?.message || 'No fue posible calcular el cuadre'; } finally { loading.value = false; }
}
async function calculate() {
    try { await liquidacionService.calculate({ tecnico_id: filters.tecnico_id, periodo_tipo: 'personalizado', fecha_inicio: dateRange.value[0], fecha_fin: dateRange.value[1] }); message.success('Liquidacion calculada'); await loadCuadre(); } catch (e) { message.error(e.response?.data?.message || 'No fue posible calcular la liquidacion'); }
}
onMounted(loadTecnicos);
</script>

<style scoped>
.page {
    padding: 28px clamp(18px, 4vw, 56px);
}

.page-header {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: flex-start;
    margin-bottom: 24px;
}

.eyebrow {
    color: #1677ff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    margin: 0 0 6px;
}

h1 {
    margin: 0;
}

.muted {
    color: #687386;
    font-size: 13px;
}

.filters {
    margin-bottom: 20px;
}

.summary {
    margin: 20px 0;
}

.summary-label {
    color: #687386;
    margin-bottom: 8px;
}

.summary strong {
    font-size: 20px;
}
</style>
