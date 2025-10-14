# 🔧 Configuración del Pipeline - Paso a Paso

## ✅ Checklist Rápido

- [ ] Obtener credenciales FTP de Hostinger
- [ ] Configurar secrets en GitHub
- [ ] Hacer push del código
- [ ] Probar el primer deploy
- [ ] Verificar que funcione

---

## 📝 PASO 1: Obtener Credenciales FTP de Hostinger

### **1.1 Ingresar a Hostinger**

1. Ve a [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Inicia sesión con tus credenciales

### **1.2 Encontrar Credenciales FTP**

**Opción A - Si ya tienes FTP configurado:**

1. En hPanel, ve a **"Archivos" → "Administrador de archivos FTP"**
2. Verás tu cuenta FTP existente
3. Anota:
   ```
   Servidor: ftp.tudominio.com (o una IP)
   Usuario: usuario@tudominio.com
   Puerto: 21
   ```
4. Si no recuerdas la contraseña, puedes cambiarla haciendo clic en **"Cambiar contraseña"**

**Opción B - Crear nueva cuenta FTP:**

1. En hPanel, ve a **"Archivos" → "Cuentas FTP"**
2. Haz clic en **"Crear cuenta FTP"**
3. Llena:
   - **Usuario**: `deploy-ma` (o el que quieras)
   - **Contraseña**: Genera una segura (ej: `Ma@Deploy2024!Secure`)
   - **Directorio**: `/public_html` (o el que uses)
   - **Permisos**: Lectura y escritura
4. Haz clic en **"Crear"**
5. Anota todos los datos que aparecen

### **1.3 Anotar las Credenciales**

Copia esto en un lugar seguro (NO lo commitees):

```
FTP_SERVER=ftp.tudominio.com
FTP_USERNAME=usuario@tudominio.com
FTP_PASSWORD=tu_contraseña_aquí
DIRECTORY=/public_html
```

---

## 🔐 PASO 2: Configurar Secrets en GitHub

### **2.1 Ir a Settings**

1. Ve a tu repositorio en GitHub: `https://github.com/tu-usuario/ma-arquitectura-landing`
2. Haz clic en **"Settings"** (pestaña superior)
3. En el menú lateral izquierdo, busca **"Secrets and variables"**
4. Haz clic en **"Actions"**

### **2.2 Agregar FTP_SERVER**

1. Haz clic en **"New repository secret"** (botón verde)
2. Llena:
   - **Name**: `FTP_SERVER`
   - **Secret**: Pega tu servidor FTP (ej: `ftp.tudominio.com`)
3. Haz clic en **"Add secret"**

### **2.3 Agregar FTP_USERNAME**

1. Haz clic en **"New repository secret"** de nuevo
2. Llena:
   - **Name**: `FTP_USERNAME`
   - **Secret**: Pega tu usuario FTP (ej: `usuario@tudominio.com`)
3. Haz clic en **"Add secret"**

### **2.4 Agregar FTP_PASSWORD**

1. Haz clic en **"New repository secret"** de nuevo
2. Llena:
   - **Name**: `FTP_PASSWORD`
   - **Secret**: Pega tu contraseña FTP
3. Haz clic en **"Add secret"**

### **2.5 Verificar Secrets**

Deberías ver 3 secrets en la lista:

```
✅ FTP_SERVER
✅ FTP_USERNAME
✅ FTP_PASSWORD
```

**⚠️ IMPORTANTE:** Los valores NO se muestran, solo los nombres (por seguridad)

---

## 📤 PASO 3: Subir el Código a GitHub

### **3.1 Verificar archivos locales**

Asegúrate de tener estos archivos:

```bash
# Verificar que existen
ls -la .github/workflows/deploy.yml
ls -la src/assets/data/projects.json
ls -la scripts/validate-projects.js
```

### **3.2 Hacer Commit de todo**

```bash
# Ver estado actual
git status

# Agregar todos los archivos nuevos
git add .github/workflows/deploy.yml
git add src/assets/data/projects.json
git add scripts/validate-projects.js
git add scripts/add-project.js
git add PROJECTS_MANAGEMENT.md
git add DEPLOYMENT_SETUP.md
git add QUICK_START.md
git add SETUP_PIPELINE.md

# También los archivos modificados
git add src/app/app.config.ts
git add src/app/app.component.ts
git add src/app/app.routes.ts
git add src/app/app.routes.server.ts
git add src/app/services/projects.service.ts
git add src/app/resolvers/project.resolver.ts
git add package.json
git add angular.json

# Hacer commit
git commit -m "feat: implementar sistema de proyectos dinámicos con CI/CD

- Migrar proyectos a JSON externo
- Crear ProjectsService y Resolver para carga dinámica
- Implementar GitHub Actions para deploy automático
- Agregar validación automática de proyectos
- Crear scripts de gestión y documentación"

# Push a GitHub
git push origin master
```

---

## 🚀 PASO 4: Primer Deploy Automático

### **4.1 Monitorear GitHub Actions**

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **"Actions"** (arriba)
3. Verás un workflow ejecutándose (punto amarillo 🟡)
4. Haz clic en el workflow para ver los logs en tiempo real

### **4.2 Ver Progreso en Vivo**

Verás 3 jobs ejecutándose en orden:

```
🟡 validate → Validando proyectos y linter (1 min)
   ↓
🟡 build → Compilando aplicación (2-3 min)
   ↓
🟡 deploy → Subiendo a Hostinger (1-2 min)
```

### **4.3 Esperar el ✅ Verde**

- Si todo está bien, verás: ✅✅✅ (todo verde)
- Si algo falla, verás: ❌ (rojo)

---

## ✅ PASO 5: Verificar que Funciona

### **5.1 Verificar en GitHub**

1. En Actions, el workflow debe mostrar **✅ Success**
2. Los 3 jobs deben estar verdes:
   ```
   ✅ validate
   ✅ build
   ✅ deploy
   ```

### **5.2 Verificar en Hostinger (Opcional)**

1. Ve a hPanel → **"Archivos" → "Administrador de archivos"**
2. Navega a `/public_html`
3. Deberías ver los archivos actualizados:
   - `index.html`
   - `main-XXXXXX.js`
   - `styles-XXXXX.css`
   - carpeta `assets/`
   - etc.

### **5.3 Verificar el Sitio Web**

1. Abre `https://tudominio.com` en el navegador
2. **Presiona Ctrl+F5** (forzar recarga sin caché)
3. El sitio debería funcionar normalmente

### **5.4 Verificar Rutas de Proyectos**

Prueba algunas rutas:

- `https://tudominio.com/reforma-bnb`
- `https://tudominio.com/casa-wim`
- `https://tudominio.com/reforma-migueletes`

Todas deberían cargar correctamente ✅

---

## 🎉 PASO 6: Probar el Sistema

### **6.1 Hacer un Cambio de Prueba**

```bash
# Opción A: Editar en GitHub
# 1. Ve a src/assets/data/projects.json en GitHub
# 2. Clic en Edit
# 3. Cambia la descripción de un proyecto
# 4. Commit changes
# 5. Ve a Actions y observa el deploy automático

# Opción B: Editar localmente
# 1. Edita src/assets/data/projects.json
# 2. Cambia algo pequeño
git add src/assets/data/projects.json
git commit -m "test: probar deploy automático"
git push origin master
# 3. Ve a Actions en GitHub
```

### **6.2 Monitorear el Deploy**

1. Ve a **Actions** en GitHub
2. Verás el nuevo workflow ejecutándose
3. Espera ~4-6 minutos
4. Debería completar con ✅

### **6.3 Verificar Cambios en el Sitio**

1. Abre el sitio
2. **Ctrl+F5** para limpiar caché
3. Verifica que el cambio esté aplicado

---

## 🔍 Troubleshooting Durante Setup

### **❌ Workflow no se ejecuta**

**Verificar:**

1. ¿El archivo está en `.github/workflows/deploy.yml`?
2. ¿Hiciste push de este archivo?
3. ¿Estás pusheando a la branch `master` o `main`?

**Solución:**

```bash
# Verificar branch actual
git branch

# Si estás en otra branch, cambia a master
git checkout master
git merge tu-branch
git push origin master
```

---

### **❌ Job "deploy" falla: "Authentication failed"**

**Problema:** Credenciales FTP incorrectas

**Solución:**

1. Verifica las credenciales conectándote con **FileZilla**:

   - Host: Tu FTP_SERVER
   - Usuario: Tu FTP_USERNAME
   - Contraseña: Tu FTP_PASSWORD
   - Puerto: 21

2. Si FileZilla funciona:

   - El problema está en los secrets de GitHub
   - Ve a Settings → Secrets → Actions
   - Edita cada secret y copia de nuevo (sin espacios extras)

3. Si FileZilla NO funciona:
   - Contacta soporte de Hostinger
   - Verifica que FTP esté habilitado en tu cuenta

---

### **❌ Job "deploy" falla: "No such directory"**

**Problema:** El directorio `/public_html` no existe o es diferente

**Solución:**

1. Conéctate por FTP y verifica tu directorio raíz
2. Puede ser:

   - `/public_html` (más común)
   - `/www`
   - `/httpdocs`
   - `/`

3. Edita `.github/workflows/deploy.yml`:

   ```yaml
   server-dir: /tu-directorio-real/
   ```

4. Commit y push de nuevo

---

### **❌ Job "build" falla**

**Problema:** Error en el código o validación

**Solución:**

1. Lee los logs del job "build"
2. Busca la línea con `[ERROR]`
3. Generalmente será:

   - Error de validación de proyectos
   - Error de TypeScript
   - Error de linter

4. Corrige localmente:

   ```bash
   # Validar proyectos
   npm run validate:projects

   # Linter
   npm run lint

   # Build local
   npm run build
   ```

5. Una vez que funcione local, push de nuevo

---

## 📊 Flujo Normal de Trabajo (Después del Setup)

```
1. Editas projects.json (GitHub o local)
   ↓
2. Commit (GitHub web o git commit)
   ↓
3. GitHub Actions se activa automáticamente
   ↓
4. Validación → Build → Deploy
   ↓
5. ~5 minutos después: ✅ Sitio actualizado
```

**¡Ya no necesitas hacer nada más!** 🎉

---

## 🎯 Comandos de Verificación Rápida

```bash
# ✅ Verificar que los secrets estén configurados
# (desde GitHub web: Settings → Secrets → Actions)

# ✅ Verificar que el workflow existe
ls -la .github/workflows/deploy.yml

# ✅ Verificar que el JSON existe
ls -la src/assets/data/projects.json

# ✅ Validar proyectos localmente
npm run validate:projects

# ✅ Probar build local
npm run build

# ✅ Ver estado de Git
git status

# ✅ Ver última referencia remota
git remote -v
```

---

## 📞 Si Necesitas Ayuda

**Durante el setup:**

1. Toma screenshot del error en GitHub Actions
2. Copia los logs completos del job que falló
3. Verifica los secrets (nombres exactos en mayúsculas)

**Hostinger no permite FTP desde GitHub:**

- Algunos planes tienen restricciones IP
- Contacta soporte de Hostinger
- Pide habilitar acceso FTP desde GitHub Actions
- O usa SFTP (puerto 22)

---

## ⏱️ Timeline Esperado

| Minuto | Acción                     |
| ------ | -------------------------- |
| 0:00   | Haces push a GitHub        |
| 0:10   | GitHub Actions se activa   |
| 0:30   | Job "validate" completa ✅ |
| 1:30   | Job "build" inicia         |
| 4:00   | Job "build" completa ✅    |
| 4:10   | Job "deploy" inicia        |
| 5:30   | Job "deploy" completa ✅   |
| 6:00   | **Sitio actualizado** 🎉   |

---

## 🎊 Siguiente Deploy (Ya Configurado)

Una vez que funcione el primer deploy, los siguientes son aún más fáciles:

```bash
# Solo editas el JSON en GitHub y haces commit
# O desde terminal:

git add src/assets/data/projects.json
git commit -m "feat: agregar nuevo proyecto"
git push

# ¡Eso es todo! El resto es automático.
```

---

**¡Éxito con tu setup!** 🚀
