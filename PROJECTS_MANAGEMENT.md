# 📚 Gestión de Proyectos - MA Arquitectura

Esta guía explica cómo agregar, editar y eliminar proyectos en el sitio web de MA Arquitectura.

## 📋 Índice

1. [Estructura del Sistema](#estructura-del-sistema)
2. [Métodos para Editar Proyectos](#métodos-para-editar-proyectos)
3. [Estructura de un Proyecto](#estructura-de-un-proyecto)
4. [Deployment Automático](#deployment-automático)
5. [Solución de Problemas](#solución-de-problemas)

---

## 🏗️ Estructura del Sistema

Los proyectos se almacenan en un archivo JSON:

```
src/assets/data/projects.json
```

Cada cambio en este archivo desencadena automáticamente:

1. ✅ Validación del JSON
2. ✅ Verificación de campos requeridos
3. ✅ Build de producción
4. ✅ Deploy automático a Hostinger

---

## 🛠️ Métodos para Editar Proyectos

### **Método 1: Editar Directamente en GitHub (Recomendado)**

Es la forma más fácil y segura:

1. Ve a tu repositorio en GitHub
2. Navega a `src/assets/data/projects.json`
3. Haz clic en el botón **"Edit"** (ícono de lápiz)
4. Edita el JSON (agregar/modificar/eliminar proyectos)
5. Scroll hasta abajo y haz clic en **"Commit changes"**
6. GitHub Actions se ejecuta automáticamente
7. En ~3-5 minutos, los cambios están en producción

**✅ Ventajas:**

- No requiere conocimientos técnicos avanzados
- El navegador valida el JSON automáticamente
- Historial completo de cambios
- Fácil rollback si algo sale mal

---

### **Método 2: Usar el Script Interactivo (Local)**

Para desarrolladores que trabajan localmente:

```bash
# Agregar un nuevo proyecto
npm run add:project

# Validar proyectos
npm run validate:projects

# Build con validación
npm run build
```

**Flujo:**

1. Ejecuta `npm run add:project`
2. Responde las preguntas interactivas
3. El script genera el JSON automáticamente
4. Valida que no haya duplicados
5. Commit y push a GitHub
6. GitHub Actions hace el deploy

---

### **Método 3: Edición Manual del JSON**

Para usuarios avanzados:

1. Abre `src/assets/data/projects.json`
2. Edita el JSON manualmente
3. Ejecuta `npm run validate:projects` para verificar
4. Commit y push

---

## 📐 Estructura de un Proyecto

### **Campos Requeridos** ✅

```json
{
  "id": "reforma-palermo", // ⚠️ ÚNICO - genera la URL
  "name": "REFORMA PALERMO", // Nombre del proyecto
  "showImg": "v1747.../imagen.jpg", // Imagen principal (Cloudinary ID)
  "images": [
    // Array de imágenes
    { "src": "v1747.../img1.jpg" },
    { "src": "v1747.../img2.jpg" }
  ]
}
```

### **Campos Opcionales** (Recomendados)

```json
{
  "nameEn": "PALERMO RENOVATION", // Nombre en inglés
  "m2": "45", // Metros cuadrados
  "location": "Palermo", // Ubicación
  "district": "CABA", // Distrito (CABA/GBA)
  "year": 2024, // Año del proyecto
  "description": "Descripción...", // Descripción español
  "descriptionEn": "Description...", // Descripción inglés
  "rowSpan": 2, // Filas en grid (1-3)
  "plantaSrc": "v1755.../planta.png", // Plano del proyecto
  "plantaPreviaSrc": "v1755.../previa.png", // Plano original
  "mainFeature": {
    // Feature principal
    "type": "image",
    "link": "v1747.../imagen.jpg"
  }
}
```

---

## 🎨 Ejemplo Completo de Proyecto

```json
{
  "id": "casa-moderna-belgrano",
  "name": "CASA MODERNA BELGRANO",
  "nameEn": "MODERN HOUSE BELGRANO",
  "m2": "180",
  "location": "Belgrano",
  "district": "CABA",
  "year": 2024,
  "showImg": "v1234567890/casa-belgrano-principal.jpg",
  "mainFeature": {
    "type": "image",
    "link": "v1234567890/casa-belgrano-principal.jpg"
  },
  "rowSpan": 3,
  "images": [{ "src": "v1234567890/imagen1.jpg" }, { "src": "v1234567890/imagen2.jpg" }, { "src": "v1234567890/imagen3.jpg" }],
  "description": "Descripción completa del proyecto en español...",
  "descriptionEn": "Full project description in English...",
  "plantaSrc": "v1234567890/planta-proyecto.png",
  "plantaPreviaSrc": "v1234567890/planta-original.png"
}
```

---

## 🚀 Deployment Automático

### **Flujo Completo:**

```
1. Editas projects.json en GitHub
   ↓
2. Haces commit
   ↓
3. GitHub Actions se activa automáticamente
   ↓
4. Valida el JSON (campos, duplicados, etc.)
   ↓
5. Ejecuta el linter
   ↓
6. Build de producción
   ↓
7. Verifica que el build sea exitoso
   ↓
8. Deploy a Hostinger vía FTP
   ↓
9. ✅ Sitio actualizado (3-5 minutos)
```

### **Configurar Secrets en GitHub:**

Para que el deploy funcione, necesitas configurar estos secrets:

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Agrega estos secrets:

| Secret         | Descripción               | Ejemplo                 |
| -------------- | ------------------------- | ----------------------- |
| `FTP_SERVER`   | Servidor FTP de Hostinger | `ftp.tudominio.com`     |
| `FTP_USERNAME` | Usuario FTP               | `usuario@tudominio.com` |
| `FTP_PASSWORD` | Contraseña FTP            | `tu_password_seguro`    |

**⚠️ IMPORTANTE:** Nunca compartas estos secrets públicamente.

---

## 🔍 Validación Automática

Antes de cada build, se valida automáticamente:

### ✅ **Validaciones de Campos:**

- Todos los proyectos tienen `id`, `name`, `showImg`, `images`
- El campo `images` es un array no vacío
- Cada imagen tiene el campo `src`

### ✅ **Validaciones de Unicidad:**

- No hay IDs duplicados
- No hay slugs duplicados (generados del nombre)

### ✅ **Validaciones de Estructura:**

- El JSON es válido (sin errores de sintaxis)
- Es un array de objetos
- Los campos tienen el tipo correcto

---

## 📝 Cómo Agregar un Nuevo Proyecto

### **Opción A: Desde GitHub Web**

1. Abre `src/assets/data/projects.json` en GitHub
2. Clic en **"Edit"**
3. Copia uno de los proyectos existentes
4. Modifica los campos:
   - Cambia el `id` (debe ser único)
   - Actualiza `name`, `location`, etc.
   - Agrega las imágenes de Cloudinary
5. **Commit changes**
6. Espera ~3-5 minutos → ¡Listo!

### **Opción B: Con el Script (Local)**

```bash
# Ejecutar script interactivo
npm run add:project

# Responder las preguntas:
# - Nombre del proyecto
# - M², ubicación, año
# - Imágenes (Cloudinary IDs)
# - Descripciones

# Commit y push
git add src/assets/data/projects.json
git commit -m "feat: agregar nuevo proyecto [nombre]"
git push origin master
```

---

## ✏️ Cómo Editar un Proyecto Existente

1. Abre `src/assets/data/projects.json`
2. Busca el proyecto por su `id` o `name`
3. Modifica los campos necesarios
4. **NO cambies el `id`** (cambia la URL del proyecto)
5. Commit changes
6. Deploy automático en 3-5 minutos

**Ejemplo:**

```json
{
  "id": "reforma-palermo", // ⛔ NO CAMBIAR
  "name": "REFORMA PALERMO NUEVO", // ✅ OK cambiar
  "m2": "50" // ✅ OK cambiar
  // ... resto de campos
}
```

---

## 🗑️ Cómo Eliminar un Proyecto

1. Abre `src/assets/data/projects.json`
2. Elimina el objeto completo del proyecto
3. **Verifica que el JSON siga siendo válido** (comas, corchetes)
4. Commit changes

**⚠️ CUIDADO:** El proyecto y su URL dejarán de existir.

---

## 🖼️ Subir Imágenes a Cloudinary

Todas las imágenes deben estar en Cloudinary:

1. Ve a [Cloudinary Dashboard](https://cloudinary.com)
2. Sube la imagen
3. Copia el **Public ID** (ej: `v1747070360/xaks7ffpmupmhqrs0xwc.jpg`)
4. Úsalo en el campo `showImg` o en `images[].src`

**Formato del Public ID:**

```
v1747070360/xaks7ffpmupmhqrs0xwc.jpg
└─ versión ─┘ └─── identificador ────┘└ ext ┘
```

---

## 🔧 Comandos Útiles

```bash
# Validar proyectos localmente
npm run validate:projects

# Agregar proyecto interactivamente
npm run add:project

# Build con validación
npm run build

# Build sin validación (para testing)
npm run build:skip-validation

# Ver el build en el navegador
npm start
```

---

## 🚨 Solución de Problemas

### **❌ Error: "ID duplicado"**

**Problema:** Dos proyectos tienen el mismo `id`

**Solución:**

1. Busca el ID duplicado en el JSON
2. Cambia uno de ellos a un ID único
3. Vuelve a hacer commit

---

### **❌ Error: "Campo requerido faltante"**

**Problema:** Un proyecto no tiene `id`, `name`, `showImg` o `images`

**Solución:**

1. Abre `src/assets/data/projects.json`
2. Agrega el campo faltante al proyecto
3. Commit changes

---

### **❌ Build falla en GitHub Actions**

**Problema:** El pipeline falló

**Solución:**

1. Ve a **Actions** en GitHub
2. Haz clic en el workflow fallido
3. Lee los logs para ver el error exacto
4. Corrige el error en `projects.json`
5. Haz commit de nuevo

---

### **❌ Deploy exitoso pero sitio no actualizado**

**Problema:** GitHub Actions dice "success" pero el sitio no cambió

**Solución:**

1. Limpia el caché del navegador (Ctrl+F5 o Cmd+Shift+R)
2. Verifica que las credenciales FTP sean correctas
3. Revisa los logs del paso "Deploy via FTP"
4. Contacta a soporte de Hostinger si persiste

---

## 📊 Monitoreo del Deployment

### **Ver el Estado del Deploy:**

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **"Actions"**
3. Verás la lista de todos los deployments

### **Estados Posibles:**

| Estado         | Ícono | Descripción      |
| -------------- | ----- | ---------------- |
| ✅ Success     | 🟢    | Deploy exitoso   |
| ❌ Failure     | 🔴    | Falló (ver logs) |
| 🟡 In Progress | 🟡    | Ejecutándose     |
| ⏸️ Queued      | ⚪    | En cola          |

---

## 🎯 Mejores Prácticas

### ✅ **DO (Hacer):**

- Validar localmente antes de hacer commit: `npm run validate:projects`
- Usar nombres descriptivos en los commits: `"feat: agregar proyecto Casa Moderna"`
- Probar en ambiente de desarrollo antes de deployar
- Mantener las imágenes en Cloudinary organizadas
- Escribir descripciones claras y completas

### ❌ **DON'T (No hacer):**

- No cambiar el `id` de proyectos existentes (rompe URLs)
- No duplicar IDs
- No subir imágenes muy pesadas sin optimizar
- No hacer commits directos a `master` sin validar
- No poner información sensible en las descripciones

---

## 🔐 Seguridad de Secrets

Los secrets de FTP están protegidos:

- ✅ Encriptados por GitHub
- ✅ No se muestran en logs
- ✅ Solo accesibles por workflows autorizados
- ✅ Pueden ser rotados en cualquier momento

**Para rotar credentials:**

1. Settings → Secrets → Actions
2. Edita el secret
3. Pega la nueva contraseña
4. Save

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa esta documentación** primero
2. **Ejecuta validación local:** `npm run validate:projects`
3. **Revisa los logs** de GitHub Actions
4. **Verifica el JSON** en un validador: [jsonlint.com](https://jsonlint.com)

---

## 📝 Ejemplo de Workflow Completo

### **Escenario: Agregar "Reforma Núñez"**

```bash
# 1. Opción A: Usar script
npm run add:project
# Responder preguntas...

# 2. Validar
npm run validate:projects

# 3. Commit y push
git add src/assets/data/projects.json
git commit -m "feat: agregar Reforma Núñez"
git push origin master

# 4. Esperar ~3-5 minutos
# GitHub Actions hace todo automáticamente

# 5. Verificar
# - Ve a Actions en GitHub
# - Espera el ✅ verde
# - Visita https://tudominio.com/reforma-nunez
```

---

## 🔄 Rollback (Revertir Cambios)

Si algo sale mal y necesitas volver atrás:

### **Opción 1: Desde GitHub Web**

1. Ve a la pestaña **"History"** del archivo
2. Haz clic en el commit que quieres restaurar
3. Clic en **"View file"**
4. Clic en **"..." → Copy raw file**
5. Edita `projects.json` y pega el contenido anterior
6. Commit

### **Opción 2: Desde Git Local**

```bash
# Ver historial
git log src/assets/data/projects.json

# Revertir al commit anterior
git checkout [commit-hash] -- src/assets/data/projects.json

# Commit del rollback
git commit -m "revert: volver a versión anterior de proyectos"
git push origin master
```

---

## 🎨 Tips para Cloudinary

### **Optimización de Imágenes:**

- Subir imágenes en alta calidad (Cloudinary las optimiza)
- Formato recomendado: JPG para fotos, PNG para planos
- Tamaño máximo recomendado: 5000px ancho
- Cloudinary genera automáticamente WebP y AVIF

### **Organización:**

Usa carpetas en Cloudinary:

```
proyectos/
  ├── reforma-palermo/
  │   ├── principal.jpg
  │   ├── cocina.jpg
  │   └── bano.jpg
  ├── casa-moderna/
  └── ...
```

---

## ⚡ Performance

El sistema está optimizado para:

- ✅ **SSR/Prerendering**: Todas las rutas se prerenderizan
- ✅ **Lazy Loading**: Imágenes cargan solo cuando se ven
- ✅ **Caché**: Los proyectos se cachean en el navegador
- ✅ **CDN**: Cloudinary sirve imágenes optimizadas

---

## 📈 Métricas

Cada deploy muestra:

- ⏱️ Tiempo total de build
- 📦 Tamaño de los bundles
- ⚠️ Advertencias de presupuesto
- ✅/❌ Estado de validaciones

---

**Desarrollado con ❤️ para MA Arquitectura**
