<template>
  <div style="max-width: 1000px; margin: auto; padding: 2rem">
    <h2 style="text-align: center; margin-bottom: 2rem">Registro de Repuesto</h2>

    <a-form layout="vertical" :model="form" :rules="rules" ref="formRef">

      <div style="display: flex; gap: 20px">
        <!-- Columna 1 -->
        <div style="flex: 1">
          <a-form-item label="Codigo del repuesto" name="Id_producto">
            <a-input v-model:value="form.Id_producto" placeholder="Ingresa codigo" />
          </a-form-item>

          <a-form-item label="Nombre del repuesto" name="nombre">
            <a-input v-model:value="form.nombre" placeholder="Ingresa nombre" />
          </a-form-item>

          <a-form-item label="Linea del  vehículo" name="linea">
            <a-input v-model:value="form.linea" placeholder="Ingresa la linea" />
          </a-form-item>

          <a-form-item label="Grupo de articulo" name="descripcion">
            <a-input v-model:value="form.descripcion" placeholder="Ingresar caracteristicas" />
          </a-form-item>

          <a-form-item label="Cantidad" name="cantidad">
            <a-input v-model:value="form.cantidad" placeholder="Ingresar cantidad" />
          </a-form-item>

        </div>

        <!-- Columna 2 -->
        <div style="flex: 1">

          <a-form-item label="Marca" name="Id_marca">
            <a-select v-model:value="form.Id_marca" placeholder="Seleccione marca" :allowClear="true"
              @change="handleMarcaChange">
              <a-select-option v-for="m in marcas" :key="m.Id_marca" :value="String(m.Id_marca)">
                {{ m.nombre }}
              </a-select-option>
              <a-select-option value="__nueva_marca__">+ Nueva marca</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Proveedor" name="Id_proveedor">
            <a-select v-model:value="form.Id_proveedor" placeholder="Seleccione proveedor" :allowClear="true"
              @change="handleProveedorChange">
              <a-select-option v-for="p in proveedores" :key="p.Id_proveedor" :value="String(p.Id_proveedor)">
                {{ p.nombre }}
              </a-select-option>
              <a-select-option value="__nuevo_proveedor__">+ Nuevo proveedor</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Estado" name="estado">
            <a-select v-model:value="form.estado" placeholder="Selecciona un estado">
              <a-select-option :value="1">Existencia</a-select-option>
              <a-select-option :value="0">Agotado</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Precio unitario" name="precio">
            <a-input v-model:value="form.precio" placeholder="Ingresa precio" />
          </a-form-item>
        </div>
      </div>

      <a-form-item style="text-align: center; margin-top: 2rem">
        <a-button type="primary" @click="registrar">Registrar</a-button>
      </a-form-item>
    </a-form>
  </div>

  <a-modal v-model:open="showModalMarca" title="Crear nueva marca" :footer="null">
    <a-form layout="vertical">
      <a-form-item label="Código marca">
        <a-input v-model:value="nuevaMarca.Id_marca" />
      </a-form-item>
      <a-form-item label="Nombre marca">
        <a-input v-model:value="nuevaMarca.nombre" />
      </a-form-item>
      <a-form-item label="Procedencia">
        <a-input v-model:value="nuevaMarca.procedencia" />
      </a-form-item>

      <div style="text-align: right; margin-top: 1rem">
        <a-button @click="showModalMarca = false" style="margin-right: 10px">Cancelar</a-button>
        <a-button type="primary" @click="crearMarca">Guardar marca</a-button>
      </div>
    </a-form>
  </a-modal>

  <a-modal v-model:open="showModalProveedor" title="Crear nuevo proveedor" :footer="null">
    <a-form layout="vertical">
      <a-form-item label="Código proveedor">
        <a-input v-model:value="nuevoProovedor.Id_proveedor" />
      </a-form-item>
      <a-form-item label="Nombre">
        <a-input v-model:value="nuevoProovedor.nombre" />
      </a-form-item>
      <a-form-item label="Telefono">
        <a-input v-model:value="nuevoProovedor.telefono" />
      </a-form-item>
      <a-form-item label="Email">
        <a-input v-model:value="nuevoProovedor.email" />
      </a-form-item>
      <a-form-item label="Ciudad">
        <a-input v-model:value="nuevoProovedor.ciudad" />
      </a-form-item>

      <div style="text-align: right; margin-top: 1rem">
        <a-button @click="showModalProveedor = false" style="margin-right: 10px">Cancelar</a-button>
        <a-button type="primary" @click="crearProveedor">Guardar proveedor</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
const formRef = ref()
import axios from 'axios'
import { onMounted } from 'vue'

const showModalMarca = ref(false)
const showModalProveedor = ref(false)
const marcas = ref([])
const proveedores = ref([])

onMounted(async () => {
  try {
    const resMarcas = await axios.get('/api/marcas')
    marcas.value = resMarcas.data.result
    console.log("marcas", marcas.value);


    const resProveedores = await axios.get('/api/proveedores')
    proveedores.value = resProveedores.data.result
    console.log("proveedores", proveedores.value);
  } catch (error) {
    message.error('Error al cargar marcas o proveedores')
  }
})

const handleMarcaChange = (value) => {
  if (value === '__nueva_marca__') {
    showModalMarca.value = true
    form.Id_marca = null
  }
}

const handleProveedorChange = (value) => {
  if (value === '__nuevo_proveedor__') {
    showModalProveedor.value = true
    form.Id_proveedor = null
  }
}

const nuevaMarca = reactive({ Id_marca: '', nombre: '', procedencia: '' })

const crearMarca = async () => {
  try {
    const res = await axios.post('/api/marcas', nuevaMarca);

    const nueva = res.data.result;
    marcas.value.push({ ...nueva, Id_marca: String(nueva.Id_marca) });

    // Seleccionar automáticamente la marca
    form.Id_marca = String(nueva.Id_marca);

    // Forzar validación del campo 
    await formRef.value?.clearValidate?.(['Id_marca']);

    showModalMarca.value = false;

    nuevaMarca.Id_marca = '';
    nuevaMarca.nombre = '';
    nuevaMarca.procedencia = '';

    message.success('Marca creada');
  } catch (err) {
    message.error('Error al crear marca');
  }
};

const nuevoProovedor = reactive({ Id_proveedor: '', nombre: '', telefono: '', email: '', ciudad: '' })

const crearProveedor = async () => {
  try {
    const res = await axios.post('/api/proveedores', nuevoProovedor);

    const nueva = res.data.result;
    console.log("nuevo proveedor", nueva);

    proveedores.value.push({ ...nueva, Id_proveedor: String(nueva.Id_proveedor) });

    form.Id_proveedor = String(nueva.Id_proveedor);

    await formRef.value?.clearValidate?.(['Id_proveedor']);

    showModalProveedor.value = false;

    nuevoProovedor.Id_proveedor = '';
    nuevoProovedor.nombre = '';
    nuevoProovedor.telefono = '';
    nuevoProovedor.email = '';
    nuevoProovedor.ciudad = '';

    message.success('Proveedor creado');
  } catch (err) {
    message.error('Error al crear el proveedor');
  }
};



// validaciones ponemos campo obligatorio y solamente el tipo de dato 
const rules = {
  Id_producto: [{ required: true, message: 'El codigo es requerido', trigger: 'blur' },
  { pattern: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s.,;:()!?¿¡\-_/]+$/, message: 'Solo letras y numeros', trigger: 'blur' }
  ],
  nombre: [{ required: true, message: 'El nombre es requerido', trigger: 'blur' },
  { pattern: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s.,;:()!?¿¡\-_/]+$/, message: 'Solo letras y numeros', trigger: 'blur' }
  ],
  linea: [{ required: true, message: 'La linea es requerida', trigger: 'blur' },
  { pattern: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s.,;:()!?¿¡\-_/]+$/, message: 'Solo letras y numeros', trigger: 'blur' }
  ],
  descripcion: [
    { required: true, message: 'Las caracteristicas son requeridas', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s.,;:()!?¿¡\-_/]+$/, message: 'Solo letras y numeros', trigger: 'blur' }
  ],

  cantidad: [{ required: true, message: 'La cantidad es requerida', trigger: 'blur' },
  { pattern: /^[0-9]+$/, message: 'Solo numeros', trigger: 'blur' }
  ],
  Id_marca: [{ required: true, message: 'Selecciona una marca', trigger: 'change' }],

  Id_proveedor: [{ required: true, message: 'Selecciona un proveedor', trigger: 'change' }],

  estado: [{ required: true, message: 'Selecciona un estado', trigger: 'change' }],

  precio: [{ required: true, message: 'El precio es requerido', trigger: 'change' },
  { pattern: /^[0-9]+$/, message: 'Solo numeros', trigger: 'blur' }
  ],
}

const form = reactive({
  Id_producto: '',
  nombre: '',
  linea: '',
  descripcion: '',
  cantidad: '',
  Id_marca: null,
  Id_proveedor: null,
  estado: null,
  precio: ''
})


const registrar = async () => {
  formRef.value.validate().then(async () => {
    console.log(' Formulario válido:', form)
    
    try {
      await axios.post('/api/productos/crearcompleto', {
        Id_producto: form.Id_producto,
        nombre: form.nombre,
        linea: form.linea,
        descripcion: form.descripcion,
        estado: Number(form.estado),
        cantidad: Number(form.cantidad),
        precio: Number(form.precio),
        Id_marca: form.Id_marca,
        Id_proveedor: form.Id_proveedor,
      })

      message.success(' Registro exitoso')
    } catch (error) {
      console.error('Error en el registro:', error)

      if (error.response) {
        console.error('Status:', error.response.status)
        console.error('Data:', error.response.data)
        console.error('Headers:', error.response.headers)
        message.error(`Error: ${error.response.data.message || 'Error al registrar el producto'}`)
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor', error.request)
        message.error('No se recibió respuesta del servidor')
      } else {
        console.error('Error al configurar la solicitud', error.message)
        message.error('Error inesperado')
      }
    }

  })
    .catch(() => {
      console.log(' Validación fallida')
    })
}
</script>