# ⚡ PASOS INMEDIATOS - Activar Pipeline Ahora

## 🎯 Objetivo

Conectar tu repositorio actual con Hostinger para que cada cambio en `projects.json` se despliegue automáticamente.

---

## 📋 CHECKLIST (Sigue este orden exacto)

### ✅ **PASO 1: Obtener Credenciales FTP** (5 minutos)

1. Ve a: [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Inicia sesión
3. Busca **"Archivos" → "Cuentas FTP"** o **"Administrador FTP"**
4. Anota en un bloc de notas (NO en el código):
   ```
   Servidor: _____________________ (ej: ftp.maarquitectura.com)
   Usuario: ______________________ (ej: deploy@maarquitectura.com)
   Contraseña: ___________________ (la que tengas o crees)
   ```

**💡 TIP:** Si no tienes FTP, créalo con nombre `deploy-bot` y contraseña segura.

---

### ✅ **PASO 2: Configurar GitHub Secrets** (3 minutos)

1. Ve a: `https://github.com/TU-USUARIO/ma-arquitectura-landing/settings/secrets/actions`
2. Haz clic en **"New repository secret"** 3 veces (uno para cada secret):

   **Secret #1:**

   - Name: `FTP_SERVER`
   - Value: (tu servidor FTP de Hostinger)
   - Add secret

   **Secret #2:**

   - Name: `FTP_USERNAME`
   - Value: (tu usuario FTP)
   - Add secret

   **Secret #3:**

   - Name: `FTP_PASSWORD`
   - Value: (tu contraseña FTP)
   - Add secret

3. Verifica que veas los 3 secrets listados ✅

---

### ✅ **PASO 3: Push del Código** (2 minutos)

Desde tu terminal en el proyecto:

```bash
# 1. Verificar estado
git status

# 2. Agregar TODO
git add .

# 3. Commit
git commit -m "feat: implementar sistema de proyectos dinámicos con CI/CD automático"

# 4. Push (ESTO ACTIVA EL PIPELINE)
git push origin master
```

**⚠️ IMPORTANTE:** Este push va a disparar el primer deploy automático.

---

### ✅ **PASO 4: Monitorear Primer Deploy** (6 minutos)

1. **Inmediatamente después del push**, ve a:

   ```
   https://github.com/TU-USUARIO/ma-arquitectura-landing/actions
   ```

2. Verás un workflow ejecutándose (punto amarillo 🟡)

3. Haz clic en el workflow para ver progreso en tiempo real

4. Deberías ver:
   ```
   🟡 validate    (1 min)
      ↓
   🟡 build      (2-3 min)
      ↓
   🟡 deploy     (1-2 min)
      ↓
   ✅ DONE
   ```

---

### ✅ **PASO 5: Verificar Sitio** (1 minuto)

1. Espera a que todo esté ✅ verde
2. Ve a: `https://tu-dominio.com`
3. **Presiona Ctrl+F5** (limpiar caché)
4. Prueba una ruta: `https://tu-dominio.com/reforma-bnb`

**Si carga correctamente:** ✅ ¡Funcionó!

---

## 🔥 Si Algo Falla

### **❌ Deploy falla con "Authentication failed"**

**Causa:** Credenciales FTP incorrectas

**Solución INMEDIATA:**

1. Descarga [FileZilla](https://filezilla-project.org/)
2. Prueba conectarte con tus credenciales:
   - Host: tu FTP_SERVER
   - Usuario: tu FTP_USERNAME
   - Contraseña: tu FTP_PASSWORD
   - Puerto: 21
3. Si FileZilla NO conecta:
   - ❌ Las credenciales están mal
   - Ve a Hostinger hPanel y revisa/regenera credenciales
4. Si FileZilla SÍ conecta:
   - Los secrets de GitHub tienen typos
   - Ve a GitHub → Settings → Secrets → Edita cada uno
   - Copia/pega de nuevo (cuidado con espacios)

---

### **❌ Validate o Build falla**

**Causa:** Error en el código o JSON

**Solución INMEDIATA:**

```bash
# Prueba local
npm run validate:projects
npm run build

# Corrige lo que falle
# Commit y push de nuevo
```

---

### **❌ Deploy exitoso pero sitio no cambia**

**Causa:** Caché del navegador o Hostinger

**Solución:**

1. Ctrl+F5 (limpiar caché)
2. Modo incógnito
3. Espera 5-10 min (caché de Hostinger)
4. Verifica en FileZilla que los archivos estén en Hostinger

---

## 📲 Verificación Rápida de Setup

Ejecuta esto ANTES del paso 3:

```bash
# Verificar archivos necesarios
echo "Checking files..."
test -f .github/workflows/deploy.yml && echo "✅ Workflow existe" || echo "❌ Falta workflow"
test -f src/assets/data/projects.json && echo "✅ JSON existe" || echo "❌ Falta JSON"
test -f scripts/validate-projects.js && echo "✅ Validador existe" || echo "❌ Falta validador"

# Validar proyectos
echo "Validating projects..."
npm run validate:projects && echo "✅ Proyectos válidos" || echo "❌ Proyectos inválidos"

# Build local
echo "Testing build..."
npm run build && echo "✅ Build exitoso" || echo "❌ Build fallido"
```

Si todo muestra ✅, estás listo para el paso 3.

---

## 🎬 Video Tutorial (Paso a Paso)

### **Minuto 0:00-5:00: Hostinger**

1. Abrir hPanel
2. Ir a FTP
3. Copiar/crear credenciales

### **Minuto 5:00-8:00: GitHub**

1. Abrir Settings
2. Ir a Secrets
3. Agregar 3 secrets

### **Minuto 8:00-10:00: Push**

1. git add .
2. git commit
3. git push

### **Minuto 10:00-16:00: Esperar**

1. Ver Actions
2. Monitorear progreso
3. Verificar sitio

---

## 📞 Necesitas Ayuda?

**Si estás atascado en algún paso:**

1. Toma screenshot del error
2. Copia los logs completos
3. Verifica que seguiste los pasos exactos
4. Los errores más comunes son:
   - Secrets con typos (espacios extras)
   - Branch incorrecta (debe ser master)
   - Directorio FTP incorrecto

---

## ⏰ Tiempo Total Estimado

| Paso                      | Tiempo          |
| ------------------------- | --------------- |
| Obtener credenciales FTP  | 5 min           |
| Configurar secrets GitHub | 3 min           |
| Push del código           | 2 min           |
| Primer deploy automático  | 6 min           |
| Verificación              | 2 min           |
| **TOTAL**                 | **~18 minutos** |

---

## 🎊 Una Vez Configurado

**Próximos deploys son así de simples:**

```
1. Editar projects.json en GitHub
2. Commit
3. Esperar 5 min
4. ✅ LISTO
```

**¡No más FTP manual!** 🚀

---

**¡Empecemos!** 💪
