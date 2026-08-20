<template>
    <section class="page">
        <header class="page-header">
            <div>
                <p class="eyebrow">Operacion</p>
                <h1>Tecnicos</h1>
                <p class="muted">Gestiona especialidades y porcentajes pactados de mano de obra.</p>
            </div>
            <a-button type="primary" @click="openCreate">Nuevo tecnico</a-button>
        </header>

        <a-alert v-if="error" type="error" :message="error" show-icon closable @close="error = ''" />
        <a-spin :spinning="loading">
            <a-table :data-source="tecnicos" :columns="columns" row-key="id" :pagination="{ pageSize: 10 }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'nombre'">
                        <strong>{{ record.nombre }} {{ record.apellidos }}</strong>
                        <div class="muted">{{ record.tipo_documento }} {{ record.documento }}</div>
                    </template>
                    <template v-else-if="column.key === 'porcentaje_mano_obra'">
                        {{ record.porcentaje_mano_obra === null ? 'Manual por labor' : `${record.porcentaje_mano_obra}%`
                        }}
                    </template>
                    <template v-else-if="column.key === 'estado'">
                        <a-tag :color="record.estado === 'activo' ? 'green' : 'default'">{{ record.estado }}</a-tag>
                    </template>
                    <template v-else-if="column.key === 'actions'">
                        <a-space>
                            <a-button size="small" @click="openEdit(record)">Editar</a-button>
                            <a-button size="small" danger @click="deactivate(record)">Desactivar</a-button>
                        </a-space>
                    </template>
                </template>
            </a-table>
        </a-spin>

        <a-modal v-model:open="modalOpen" :title="editing ? 'Editar tecnico' : 'Nuevo tecnico'" ok-text="Guardar"
            cancel-text="Cancelar" :confirm-loading="saving" @ok="save">
            <a-form layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="12"><a-form-item label="Nombres" required><a-input
                                v-model:value="form.nombre" /></a-form-item></a-col>
                    <a-col :span="12"><a-form-item label="Apellidos" required><a-input
                                v-model:value="form.apellidos" /></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="Tipo documento" required><a-input
                                v-model:value="form.tipo_documento" placeholder="CC" /></a-form-item></a-col>
                    <a-col :span="16"><a-form-item label="Documento" required><a-input
                                v-model:value="form.documento" /></a-form-item></a-col>
                    <a-col :span="12"><a-form-item label="Especialidad" required><a-select
                                v-model:value="form.especialidad" style="width: 100%"><a-select-option
                                    value="mecanico">Mecanico</a-select-option><a-select-option
                                    value="electricista">Electricista</a-select-option><a-select-option
                                    value="aire_acondicionado">Aire acondicionado</a-select-option><a-select-option
                                    value="otro">Otro</a-select-option></a-select></a-form-item></a-col>
                    <a-col :span="12"><a-form-item label="Porcentaje pactado"><a-input-number
                                v-model:value="form.porcentaje_mano_obra" :min="0" :max="100" :precision="2"
                                addon-after="%" style="width: 100%" /></a-form-item></a-col>
                    <a-col :span="12"><a-form-item label="Telefono"><a-input
                                v-model:value="form.telefono" /></a-form-item></a-col>
                    <a-col :span="12"><a-form-item label="Correo"><a-input
                                v-model:value="form.email" /></a-form-item></a-col>
                </a-row>
            </a-form>
        </a-modal>
    </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { message, Modal } from 'ant-design-vue';
import tecnicoService from '../services/tecnicoService';

const tecnicos = ref([]);
const loading = ref(false);
const saving = ref(false);
const error = ref('');
const modalOpen = ref(false);
const editing = ref(null);
const form = reactive({ nombre: '', apellidos: '', tipo_documento: 'CC', documento: '', especialidad: 'mecanico', porcentaje_mano_obra: null, telefono: '', email: '' });
const columns = [
    { title: 'Tecnico', key: 'nombre' },
    { title: 'Especialidad', dataIndex: 'especialidad', key: 'especialidad' },
    { title: 'Porcentaje pactado', dataIndex: 'porcentaje_mano_obra', key: 'porcentaje_mano_obra' },
    { title: 'Estado', dataIndex: 'estado', key: 'estado' },
    { title: 'Acciones', key: 'actions' }
];

async function load() {
    loading.value = true;
    try { tecnicos.value = (await tecnicoService.list()).data; } catch (e) { error.value = e.response?.data?.message || 'No fue posible cargar tecnicos'; } finally { loading.value = false; }
}
function resetForm() { Object.assign(form, { nombre: '', apellidos: '', tipo_documento: 'CC', documento: '', especialidad: 'mecanico', porcentaje_mano_obra: null, telefono: '', email: '' }); }
function openCreate() { editing.value = null; resetForm(); modalOpen.value = true; }
function openEdit(record) { editing.value = record; Object.assign(form, record); modalOpen.value = true; }
async function save() {
    saving.value = true;
    try { editing.value ? await tecnicoService.update(editing.value.id, form) : await tecnicoService.create(form); message.success('Tecnico guardado'); modalOpen.value = false; await load(); } catch (e) { message.error(e.response?.data?.message || 'No fue posible guardar'); } finally { saving.value = false; }
}
function deactivate(record) { Modal.confirm({ title: 'Desactivar tecnico', content: `¿Desactivar a ${record.nombre} ${record.apellidos}?`, okText: 'Desactivar', cancelText: 'Cancelar', onOk: async () => { await tecnicoService.remove(record.id); await load(); message.success('Tecnico desactivado'); } }); }
onMounted(load);
</script>

<style scoped>
.page {
    padding: 28px clamp(18px, 4vw, 56px);
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
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
