# Frontend Centro Repuestos

Aplicacion web para la operacion de Centro Repuestos, construida como cliente SPA del backend central.

## Proposito

Ofrece interfaces diferenciadas para administradores y clientes. Permite gestionar catalogos, usuarios, vehiculos, citas y mantenimientos, y consultar los servicios, repuestos e historial asociados a cada vehiculo.

## Experiencia y reglas de acceso

- El acceso se determina por autenticacion y rol.
- Los administradores gestionan la operacion del centro.
- Los clientes consultan y gestionan unicamente sus propios recursos.
- La navegacion oculta opciones no disponibles, mientras la autorizacion definitiva corresponde al backend.
- Los estados de carga, errores y respuestas del backend se manejan desde las vistas y servicios de la aplicacion.

## Arquitectura

```text
src/
├── assets/       Recursos visuales
├── components/   Componentes reutilizables
├── composables/  Logica compartida de Vue
├── layouts/      Estructuras visuales
├── router/       Navegacion y guards
├── services/     Cliente HTTP y servicios de dominio
├── store/        Estado global con Pinia
├── views/        Pantallas funcionales
├── App.vue       Componente raiz
└── main.js       Inicializacion de la aplicacion
```

La aplicacion consume la API mediante Axios. La sesion se conserva en el estado de Pinia y el token JWT se adjunta a las peticiones protegidas.

## Tecnologias

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Ant Design Vue
- Chart.js y vue-chartjs
- Less

## Areas funcionales

- Inicio y paneles de operacion.
- Autenticacion y recuperacion de cuenta.
- Usuarios y clientes.
- Vehiculos.
- Productos, marcas y proveedores.
- Servicios.
- Citas.
- Mantenimientos.
- Notificaciones.

## Desarrollo

Requisitos: Node.js 18 o superior y npm.

```bash
npm install
npm run dev
```

La URL de la API se configura mediante `VITE_APP_API_URL` en `.env`, usando `.env.example` como referencia. Las variables `VITE_` son publicas en el navegador y no deben contener secretos.

## Documentacion relacionada

Los requerimientos y decisiones de arquitectura se encuentran en:

- [Analisis general y plan de mejoras](../ANALISIS_Y_PLAN_DE_MEJORAS.md)
- [Spec 001: auditoria, roles y soft delete](../docs/specs/001-auditoria-roles-soft-delete.md)
- [Spec 002: autenticacion, autorizacion y auditoria](../docs/specs/002-autenticacion-autorizacion-auditoria.md)
- [Spec 003: empleados, tecnicos, ordenes y pagos](../docs/specs/003-empleados-tecnicos-ordenes-pagos.md)
