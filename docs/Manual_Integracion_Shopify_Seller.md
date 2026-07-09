# 🛍️ Manual de Integración Shopify — Guía para Sellers
### Full Envíos | Plataforma de Logística

---

## Índice
1. [¿Qué es la integración con Shopify?](#qué-es)
2. [Opción A: Conexión con Un Clic (OAuth)](#opción-a)
3. [Opción B: Conexión Manual (Access Token)](#opción-b)
4. [Configurar la Importación Automática](#importación-automática)
5. [Importar Pedidos Manualmente](#importación-manual)
6. [Preguntas Frecuentes](#faq)
7. [Soporte](#soporte)

---

<a id="qué-es"></a>
## 1. ¿Qué es la integración con Shopify?

La integración conecta tu tienda Shopify con Full Envíos para que tus pedidos pagados se importen **automáticamente** como envíos listos para despachar.

### ¿Qué se importa?
- ✅ Pedidos con estado **"Pagado"** y **"Abierto"**
- ✅ Nombre, dirección, teléfono y email del destinatario
- ✅ Número de pedido humano (ej: #1001, #1002)
- ✅ Solo pedidos dentro de la **Región Metropolitana**

### ¿Qué NO se importa?
- ❌ Pedidos no pagados (pendientes de pago)
- ❌ Pedidos ya importados anteriormente (no se duplican)
- ❌ Pedidos fuera de la zona de cobertura

---

<a id="opción-a"></a>
## 2. Opción A: Conexión con Un Clic (OAuth) ⭐ Recomendada

Esta es la forma más fácil y segura. No necesitas crear tokens manualmente.

### Requisitos Previos
- Tener una tienda Shopify activa
- Ser el propietario o tener permisos de administrador en la tienda
- Tener tu sesión activa en Full Envíos

### Paso a Paso

#### Paso 1: Acceder a Integraciones
1. Inicia sesión en Full Envíos con tu cuenta de seller
2. Ve a **"Mis Cuentas"** o **"Integraciones"** en el menú lateral
3. Busca la sección **Shopify**

#### Paso 2: Iniciar la Conexión
1. Haz clic en el botón **"Conectar Shopify"**
2. Se te pedirá el **dominio de tu tienda**. Ingresa solo el nombre, por ejemplo:
   - ✅ `mi-tienda.myshopify.com`
   - ✅ `mi-tienda` (el sistema agrega `.myshopify.com` automáticamente)
   - ❌ `https://mi-tienda.myshopify.com/admin` (no incluyas `https://` ni `/admin`)

#### Paso 3: Autorizar en Shopify
1. Serás redirigido a la página de autorización de Shopify
2. Revisa los permisos que solicita Full Envíos:
   - 📦 **Leer pedidos** — Para importar tus ventas
   - 👤 **Leer clientes** — Para obtener datos de envío
   - 🚚 **Leer y escribir fulfillments** — Para actualizar estados de despacho
3. Haz clic en **"Instalar app"**

#### Paso 4: Confirmación
1. Verás una pantalla verde de **"¡Conexión Exitosa!"**
2. La ventana se cerrará automáticamente en 5 segundos
3. Vuelve a tu panel de Full Envíos — tu tienda ya aparece conectada

> [!TIP]
> Si la ventana no se cierra sola, ciérrala manualmente y recarga tu panel. La conexión ya está guardada.

---

<a id="opción-b"></a>
## 3. Opción B: Conexión Manual (Access Token)

Usa este método si el flujo OAuth no está disponible o si prefieres control total sobre los permisos.

### Requisitos Previos
- Tener una tienda Shopify activa
- Acceso a **Shopify Admin** → **Settings** → **Apps and sales channels**

### Paso a Paso

#### Paso 1: Crear una App Personalizada en Shopify

1. Ve a tu **Shopify Admin** → `tu-tienda.myshopify.com/admin`
2. Navega a **Settings** (⚙️ esquina inferior izquierda)
3. Haz clic en **"Apps and sales channels"**
4. Haz clic en **"Develop apps"** (esquina superior derecha)

> [!NOTE]
> Si ves un mensaje pidiendo "Allow custom app development", haz clic en **"Allow"**. Solo aparece la primera vez.

5. Haz clic en **"Create an app"**
6. Nombre de la app: `Full Envíos`
7. Haz clic en **"Create app"**

#### Paso 2: Configurar Permisos (Scopes)

1. Dentro de la app recién creada, haz clic en **"Configure Admin API scopes"**
2. Busca y activa los siguientes permisos:

| Permiso | Descripción |
|---|---|
| `read_orders` | Leer pedidos |
| `read_shipping` | Leer información de envío |
| `read_products` | Leer productos (para etiquetas) |
| `read_customers` | Leer datos de clientes |

3. Haz clic en **"Save"**

#### Paso 3: Generar el Access Token

1. Ve a la pestaña **"API credentials"**
2. En la sección **"Admin API access token"**, haz clic en **"Install app"**
3. Confirma haciendo clic en **"Install"**
4. Se mostrará tu **Access Token** (empieza con `shpat_`)

> [!CAUTION]
> Este token se muestra **UNA SOLA VEZ**. Cópialo inmediatamente y guárdalo en un lugar seguro. Si lo pierdes, deberás crear una nueva app.

#### Paso 4: Conectar en Full Envíos

1. Inicia sesión en Full Envíos
2. Ve a **"Mis Cuentas"** o **"Integraciones"**
3. Haz clic en **"Agregar Cuenta"** → selecciona **SHOPIFY**
4. Completa los campos:

| Campo | Qué ingresar | Ejemplo |
|---|---|---|
| **Nombre** | Un alias para tu tienda | `Mi Tienda Principal` |
| **URL de la Tienda** | Tu dominio de Shopify | `mi-tienda.myshopify.com` |
| **Access Token** | El token que copiaste | `shpat_abc123def456...` |

5. Haz clic en **"Probar Conexión"** para verificar
6. Si ves ✅ **"Conexión exitosa"**, haz clic en **"Guardar"**

---

<a id="importación-automática"></a>
## 4. Configurar la Importación Automática

Una vez conectada tu tienda, puedes activar la importación automática para que tus pedidos lleguen solos a Full Envíos.

### Activar Auto-Import

1. Ve a **"Mis Cuentas"** → tu cuenta Shopify
2. Activa el switch **"Auto-Import"** ✅
3. Configura el **intervalo de sincronización** (por defecto: cada 5 minutos)

### ¿Cómo funciona?

```
Cada 5 minutos, el sistema:
  1. Consulta tus pedidos pagados y abiertos en Shopify
  2. Filtra los que están en la Región Metropolitana
  3. Verifica que no se hayan importado antes
  4. Los crea como envíos con estado "PENDIENTE"
  5. Genera un evento de tracking "Creado"
  6. Intenta geocodificar la dirección automáticamente
```

### ¿Qué datos se importan de cada pedido?

| Dato en Shopify | Se guarda como | Ejemplo |
|---|---|---|
| `shipping_address.first_name + last_name` | Destinatario | Juan Pérez |
| `shipping_address.phone` | Teléfono | +56912345678 |
| `order.email` | Email destinatario | juan@email.com |
| `shipping_address.address1 + address2` | Dirección de entrega | Av. Providencia 1234, Depto 5B |
| `shipping_address.city` | Comuna | Providencia |
| `order.order_number` | N° Referencia Shopify | #1001 |
| `order.id` (técnico) | ID anti-duplicados | 5862734209153 |

---

<a id="importación-manual"></a>
## 5. Importar Pedidos Manualmente

Si prefieres no usar auto-import, puedes importar pedidos selectivamente.

### Desde el Panel del Seller

1. Ve a tu **Dashboard**
2. Haz clic en **"Importar Pedidos"**
3. Selecciona la pestaña **"Shopify"**
4. Verás tus últimos 50 pedidos pagados
5. Selecciona los que quieras importar
6. Haz clic en **"Importar Seleccionados"**

### Desde el Panel de Admin (para operadores)

1. Ve a **"Importar Pedidos"** en el menú de administración
2. Selecciona el **cliente/seller**
3. Haz clic en **"Sincronizar Shopify"**
4. El sistema traerá los pedidos disponibles

---

<a id="faq"></a>
## 6. Preguntas Frecuentes

### ❓ ¿Se duplican los pedidos si importo varias veces?
**No.** El sistema usa el ID técnico de Shopify (`shopifyOrderId`) con una restricción de unicidad en la base de datos. Si un pedido ya fue importado, se ignora automáticamente.

### ❓ ¿Qué pasa si mi pedido está fuera de la Región Metropolitana?
No se importa. El sistema filtra automáticamente por la provincia/región del destinatario y la lista de comunas activas configuradas por el administrador.

### ❓ ¿Puedo conectar más de una tienda Shopify?
**Sí.** Full Envíos soporta multi-cuenta. Puedes agregar varias tiendas Shopify y cada una se sincroniza de forma independiente.

### ❓ ¿Cada cuánto se sincronizan los pedidos?
Por defecto cada **5 minutos**. Puedes ajustar el intervalo por cuenta desde la configuración de tu integración.

### ❓ ¿Puedo forzar una sincronización inmediata?
**Sí.** Contacta a tu operador de Full Envíos. Desde el panel administrativo pueden forzar un ciclo de sincronización con un solo clic.

### ❓ Mi token de Shopify dejó de funcionar, ¿qué hago?
Los tokens de Shopify no expiran a menos que se desinstale la app. Si recibes un error de conexión:
1. Ve a tu Shopify Admin → Settings → Apps → Develop apps
2. Verifica que la app "Full Envíos" siga instalada
3. Si fue desinstalada, créala nuevamente siguiendo la [Opción B](#opción-b)

### ❓ ¿Puedo ver el número de pedido de Shopify en la etiqueta de envío?
**Sí.** El número humano del pedido (ej: `#1001`) aparece en la etiqueta de envío como referencia secundaria, junto al ID interno de Full Envíos.

### ❓ ¿Qué permisos necesita Full Envíos en mi tienda?
Solo los mínimos necesarios para leer tus pedidos y datos de envío. Full Envíos **no puede** modificar precios, eliminar productos ni acceder a información financiera.

---

<a id="soporte"></a>
## 7. Soporte

Si tienes problemas con la integración:

| Problema | Acción |
|---|---|
| "Conexión rechazada" | Verifica que el Access Token sea correcto y que la app no haya sido desinstalada |
| "Tienda no encontrada" | Revisa el dominio. Debe ser `nombre.myshopify.com` |
| Pedidos no se importan | Verifica que Auto-Import esté activado y que el pedido esté pagado |
| Pedido fuera de cobertura | Solo se importan pedidos dentro de la Región Metropolitana |

**¿Sigues con problemas?** Contacta al equipo de soporte de Full Envíos.

---

> 📋 **Versión:** 1.0  
> 📅 **Última actualización:** Mayo 2026  
> 🏢 **Full Envíos** — Plataforma de Logística Last-Mile
