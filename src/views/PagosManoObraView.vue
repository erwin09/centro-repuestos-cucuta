<template>
    <section class="page">
        <header class="page-header">
            <div>
                <p class="eyebrow">Liquidaciones</p>
                <h1>Pagos de mano de obra</h1>
                <p class="muted">Registra pagos sobre labores aprobadas.</p>
            </div>
        </header>
        <a-card :bordered="false">
            <a-row :gutter="16" align="bottom">
                <a-col :xs="24" :md="10"><a-form-item label="Tecnico"><a-select v-model:value="selectedTechnician"
                            style="width: 100%" placeholder="Selecciona tecnico"
                            @change="loadAssignments"><a-select-option v-for="item in tecnicos" :key="item.id"
                                :value="item.id">{{ item.nombre }} {{ item.apellidos
                                }}</a-select-option></a-select></a-form-item></a-col>
                <a-col :xs="24" :md="14"><a-alert v-if="selectedAssignment" type="info"
                        :message="`Disponible: ${money(selectedAssignment.valor_tecnico)}`" /></a-col>
            </a-row>
            <a-table :data-source="assignments" :columns="columns" row-key="id" :pagination="{ pageSize: 8 }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'orden'"><strong>{{ record.id_mantenimiento }}</strong>
                        <div class="muted">{{ record.fecha }} · {{ record.placa }}</div>
                    </template>
                    <template v-else-if="column.key === 'valor_tecnico'">{{ money(record.valor_tecnico) }}</template>
                    <template v-else-if="column.key === 'estado_pago'"><a-tag>{{ record.estado_pago
                            }}</a-tag></template>
                    <template v-else-if="column.key === 'actions'"><a-button size="small"
                            :disabled="record.estado_pago !== 'aprobado'" @click="openPayment(record)">Registrar
                            pago</a-button></template>
                </template>
            </a-table>
        </a-card>

        <a-modal v-model:open="paymentOpen" title="Registrar pago" ok-text="Guardar" cancel-text="Cancelar"
            :confirm-loading="saving" @ok="savePayment">
            <a-form layout="vertical">
                <a-form-item label="Monto"><a-input-number v-model:value="payment.monto" :min="0.01"
                        :max="Number(selectedAssignment?.valor_tecnico || 0)" style="width: 100%" /></a-form-item>
                <a-form-item label="Metodo"><a-select v-model:value="payment.metodo_pago"
                        style="width: 100%"><a-select-option value="efectivo">Efectivo</a-select-option><a-select-option
                            value="transferencia">Transferencia</a-select-option><a-select-option
                            value="tarjeta">Tarjeta</a-select-option></a-select></a-form-item>
                <a-form-item label="Referencia"><a-input v-model:value="payment.referencia_pago" /></a-form-item>
            </a-form>
        </a-modal>
    </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import tecnicoService from '../services/tecnicoService';
import liquidacionService from '../services/liquidacionTecnicoService';
const tecnicos = ref([]); const assignments = ref([]); const selectedTechnician = ref(); const selectedAssignment = ref(); const paymentOpen = ref(false); const saving = ref(false);
const payment = reactive({ monto: null, metodo_pago: 'efectivo', referencia_pago: '' });
const columns = [{ title: 'Orden / vehiculo', key: 'orden' }, { title: 'Descripcion', dataIndex: 'descripcion_trabajo' }, { title: 'Valor tecnico', key: 'valor_tecnico' }, { title: 'Estado', key: 'estado_pago' }, { title: 'Acciones', key: 'actions' }];
function money(value) { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(Number(value || 0)); }
async function loadAssignments() { assignments.value = selectedTechnician.value ? (await tecnicoService.assignments(selectedTechnician.value)).data : []; }
function openPayment(record) { selectedAssignment.value = record; payment.monto = Number(record.valor_tecnico || 0); paymentOpen.value = true; }
async function savePayment() { saving.value = true; try { await liquidacionService.createLaborPayment({ mantenimiento_tecnico_id: selectedAssignment.value.id, tecnico_id: selectedTechnician.value, monto: payment.monto, metodo_pago: payment.metodo_pago, referencia_pago: payment.referencia_pago }); message.success('Pago registrado'); paymentOpen.value = false; await loadAssignments(); } catch (e) { message.error(e.response?.data?.message || 'No fue posible registrar el pago'); } finally { saving.value = false; } }
onMounted(async () => { tecnicos.value = (await tecnicoService.list()).data; });
</script>

<style scoped>
.page {
    padding: 28px clamp(18px, 4vw, 56px);
}

.page-header {
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
</style>
