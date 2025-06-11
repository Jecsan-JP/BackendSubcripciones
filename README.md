# BackendSubcripciones

## Descripción

Este proyecto es una API backend construida en Node.js (TypeScript) que permite gestionar suscripciones mensuales usando Stripe Checkout. Forma parte de una prueba técnica para el puesto de Desarrollador Fullstack, integrando una API externa (Stripe), manejo de usuarios y suscripciones, y pruebas de integración reales.

## Características principales
- Crear clientes y sesiones de pago en Stripe (modo test).
- Consultar el estado de la suscripción de un usuario por `customer_id`.
- Validación de datos de entrada.
- Persistencia de usuarios en MongoDB.
- Pruebas de integración reales con Jest y Supertest.

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/BackendSubcripciones.git
   cd BackendSubcripciones
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   STRIPE_SECRET_KEY=sk_test_...           # Tu clave secreta de Stripe (modo test)
   MONGODB_URI=mongodb://localhost:27017/tu_basededatos  # O la URI de MongoDB Atlas
   PORT=3000
   ```

4. **Arranca MongoDB:**
   - Si usas local: `mongod`
   - Si usas Atlas, asegúrate de que la URI y permisos sean correctos.

5. **Inicia el servidor:**
   ```bash
   npm run dev
   # o
   npm start
   ```

## Endpoints principales

### 1. Crear sesión de Stripe Checkout
- **POST** `/api/subscriptions/checkout-session`
- **Body ejemplo:**
  ```json
  {
    "name": "Jecsan Ortega",
    "email": "jeck@jeck.com",
    "priceId": "price_1RYJ7c2QypCxhenCgpYTvnag", // Reemplaza por el ID real de tu plan en Stripe
    "successUrl": "http://localhost:3000/success",
    "cancelUrl": "http://localhost:3000/cancel"
  }
  ```
- **Respuesta:**
  ```json
  {
    "headers": { "code": 200, "message": "Proceso exitoso", "version": 1 },
    "data": {
      "url": "https://checkout.stripe.com/...",
      "customerId": "cus_..."
    }
  }
  ```

### 2. Consultar estado de suscripción
- **GET** `/api/subscriptions/status/:customerId`
- **Respuesta ejemplo:**
  ```json
  {
    "headers": { "code": 200, "message": "Proceso exitoso", "version": 1 },
    "data": {
      "name": "Jecsan Ortega",
      "email": "jeck@jeck.com",
      "status": "active" // o "no_subscription", "incomplete", "canceled", etc.
    }
  }
  ```

## Pruebas de integración

El proyecto incluye pruebas de integración reales usando Jest y Supertest.

- Para ejecutarlas:
  ```bash
  npm run test
  ```

## Estructura del proyecto

- `src/features/subscriptions/` — Lógica de suscripciones y endpoints.
- `src/common/services/StripeService.ts` — Integración con Stripe.
- `src/common/config/database.ts` — Conexión a MongoDB.
- `src/features/subscriptions/tests/` — Pruebas de integración.

## Notas técnicas
- El backend está listo para ser consumido por un frontend (React, Vue, etc.).
- Puedes usar el endpoint de checkout-session para redirigir a Stripe Checkout desde el frontend.
- El endpoint de status permite mostrar el estado de la suscripción en un dashboard.

## Extras valorados implementados
- Validación de formularios en backend.
- Persistencia en MongoDB.
- Pruebas de integración reales.
- Código modular y buenas prácticas.

## Enlace a dashboard de Stripe (opcional)
- [Dashboard de Stripe (modo test)](https://dashboard.stripe.com/test)

## Autor
- [Tu Nombre]

---
¡Gracias por revisar el proyecto! Si tienes dudas, contacta a través de GitHub o correo. 