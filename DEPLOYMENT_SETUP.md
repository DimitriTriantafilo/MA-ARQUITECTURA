# 🚀 Configuración de Deployment Automático

Esta guía te ayuda a configurar el pipeline de CI/CD para deployment automático a Hostinger.

## 📋 Requisitos Previos

1. ✅ Cuenta de GitHub con este repositorio
2. ✅ Cuenta de Hostinger con FTP habilitado
3. ✅ Credenciales FTP de Hostinger

---

## 🔐 Paso 1: Obtener Credenciales FTP de Hostinger

### **Opción A: Desde hPanel (Recomendado)**

1. Inicia sesión en [Hostinger hPanel](https://hpanel.hostinger.com)
2. Ve a **"Archivos" → "Administrador de archivos FTP"**
3. Busca o crea una cuenta FTP
4. Anota estos datos:
   - **Servidor FTP**: `ftp.tudominio.com` o `123.456.789.0`
   - **Usuario**: `usuario@tudominio.com`
   - **Contraseña**: (la que configuraste o creaste)
   - **Puerto**: `21` (FTP) o `22` (SFTP)

### **Opción B: Crear Nueva Cuenta FTP**

1. En hPanel → **"Archivos" → "Cuentas FTP"**
2. Haz clic en **"Crear cuenta FTP"**
3. Llena los datos:
   - **Nombre de usuario**: `deploy-bot` (o el que prefieras)
   - **Contraseña**: Genera una contraseña segura
   - **Directorio**: `/public_html`
4. Haz clic en **"Crear"**
5. Anota las credenciales

---

## 🔑 Paso 2: Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Haz clic en **"Settings"** (arriba derecha)
3. En el menú lateral, haz clic en **"Secrets and variables" → "Actions"**
4. Haz clic en **"New repository secret"** para cada uno:

### **Secret 1: FTP_SERVER**

- **Name**: `FTP_SERVER`
- **Secret**: `ftp.tudominio.com` (o la IP que te dio Hostinger)
- Haz clic en **"Add secret"**

### **Secret 2: FTP_USERNAME**

- **Name**: `FTP_USERNAME`
- **Secret**: `usuario@tudominio.com` (tu usuario FTP)
- Haz clic en **"Add secret"**

### **Secret 3: FTP_PASSWORD**

- **Name**: `FTP_PASSWORD`
- **Secret**: Tu contraseña FTP
- Haz clic en **"Add secret"**

**🔒 IMPORTANTE:**

- Estos secrets están encriptados y son seguros
- NUNCA los compartas públicamente
- NUNCA los commits en el código

---

## ✅ Paso 3: Verificar Configuración

### **Verificar que los Secrets estén creados:**

1. Ve a **Settings → Secrets and variables → Actions**
2. Deberías ver 3 secrets:
   - ✅ `FTP_SERVER`
   - ✅ `FTP_USERNAME`
   - ✅ `FTP_PASSWORD`

### **Verificar el Workflow:**

1. Verifica que existe: `.github/workflows/deploy.yml`
2. El archivo debe estar en el repositorio

---

## 🧪 Paso 4: Probar el Deploy

### **Método 1: Hacer un Cambio de Prueba**

```bash
# Edita el JSON de proyectos
# Por ejemplo, cambia la descripción de un proyecto

git add src/assets/data/projects.json
git commit -m "test: probar deploy automático"
git push origin master
```

### **Método 2: Ejecución Manual**

1. Ve a **"Actions"** en GitHub
2. Haz clic en **"Build and Deploy to Hostinger"**
3. Haz clic en **"Run workflow"**
4. Selecciona la branch `master`
5. Haz clic en **"Run workflow"**

---

## 📊 Paso 5: Monitorear el Deploy

1. Ve a la pestaña **"Actions"** en GitHub
2. Verás el workflow ejecutándose
3. Haz clic en el workflow para ver los logs en tiempo real

### **Pasos del Workflow:**

| #   | Paso     | Duración estimada | Descripción                       |
| --- | -------- | ----------------- | --------------------------------- |
| 1️⃣  | Validate | ~1 min            | Valida proyectos y ejecuta linter |
| 2️⃣  | Build    | ~2-3 min          | Build de producción               |
| 3️⃣  | Deploy   | ~1-2 min          | Sube archivos a Hostinger         |

**⏱️ Total:** ~4-6 minutos

---

## ✅ Verificar que el Deploy Funcionó

### **1. Espera el ✅ Verde en GitHub Actions**

El workflow debe mostrar:

```
✅ validate
✅ build
✅ deploy
```

### **2. Verifica el Sitio Web**

1. Abre tu sitio: `https://tudominio.com`
2. Presiona **Ctrl+F5** (Windows) o **Cmd+Shift+R** (Mac) para limpiar caché
3. Verifica que los cambios estén aplicados

### **3. Verifica una Ruta de Proyecto**

- Visita: `https://tudominio.com/reforma-bnb`
- Debería cargar correctamente

---

## 🔧 Configuración Avanzada (Opcional)

### **Cambiar el Directorio de Deploy**

Si tu Hostinger usa un directorio diferente a `/public_html`:

1. Edita `.github/workflows/deploy.yml`
2. Busca la línea `server-dir: /public_html/`
3. Cámbiala por tu directorio, ejemplo:
   ```yaml
   server-dir: /www/
   ```
   o
   ```yaml
   server-dir: /httpdocs/
   ```

### **Deploy a Subdirectorio**

Si quieres deployar a `tudominio.com/arquitectura`:

```yaml
server-dir: /public_html/arquitectura/
```

### **Usar SFTP en lugar de FTP (Más Seguro)**

1. Edita `.github/workflows/deploy.yml`
2. Reemplaza el step "Deploy via FTP" con:

```yaml
- name: Deploy via SFTP
  uses: wlixcc/SFTP-Deploy-Action@v1.2.4
  with:
    server: ${{ secrets.FTP_SERVER }}
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    port: 22
    local_path: "./deploy/*"
    remote_path: "/public_html"
```

3. Asegúrate de que Hostinger tenga SFTP habilitado (puerto 22)

---

## 📧 Agregar Notificaciones (Opcional)

### **Notificación por Email:**

Agrega al final de `.github/workflows/deploy.yml`:

```yaml
- name: Send email notification
  if: always()
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: "Deploy ${{ job.status }}: MA Arquitectura"
    body: |
      Deploy terminado con estado: ${{ job.status }}
      Commit: ${{ github.event.head_commit.message }}
      URL: https://tudominio.com
    to: tu@email.com
    from: GitHub Actions
```

**Secrets adicionales necesarios:**

- `EMAIL_USERNAME`
- `EMAIL_PASSWORD`

---

## 🐛 Solución de Problemas

### **❌ Error: "Connection refused"**

**Posibles causas:**

1. ❌ Servidor FTP incorrecto
2. ❌ Puerto bloqueado (verifica que sea 21 para FTP)
3. ❌ Firewall de Hostinger bloqueando GitHub IPs

**Solución:**

1. Verifica las credenciales FTP conectándote con FileZilla
2. Si FileZilla funciona, el problema está en los secrets
3. Verifica que los secrets estén bien copiados (sin espacios extra)

---

### **❌ Error: "Authentication failed"**

**Causas:**

1. ❌ Usuario o contraseña incorrectos
2. ❌ Secrets mal configurados

**Solución:**

1. Ve a Settings → Secrets → Actions
2. Edita cada secret y verifica que estén correctos
3. Prueba las credenciales con un cliente FTP (FileZilla)

---

### **❌ Deploy exitoso pero sitio no actualizado**

**Causas:**

1. Cache del navegador
2. CDN/Proxy de Hostinger

**Solución:**

1. Limpia caché del navegador (Ctrl+F5)
2. Prueba en modo incógnito
3. Espera 5-10 minutos (cache de Hostinger)
4. Verifica directamente en FTP que los archivos se subieron

---

### **❌ Validación falla: "ID duplicado"**

**Solución:**

1. Abre `src/assets/data/projects.json`
2. Busca el ID duplicado
3. Cambia uno de ellos
4. Commit de nuevo

---

## 📈 Métricas y Monitoreo

### **Ver Historial de Deploys:**

1. Ve a **Actions** en GitHub
2. Verás todos los workflows ejecutados
3. Filtros útiles:
   - ✅ Solo exitosos
   - ❌ Solo fallidos
   - 🔍 Por branch

### **Tiempo Promedio:**

- ⏱️ Validación: ~30-60 segundos
- ⏱️ Build: ~2-3 minutos
- ⏱️ Deploy: ~1-2 minutos
- **⏱️ Total: ~4-6 minutos**

---

## 🎯 Próximos Pasos

Una vez configurado:

1. ✅ Edita `projects.json` en GitHub
2. ✅ Haz commit
3. ✅ GitHub Actions hace todo automáticamente
4. ✅ Sitio actualizado en ~5 minutos

**¡Eso es todo!** 🎉

---

## 📞 Ayuda Adicional

Si necesitas ayuda:

1. **Revisa los logs** en GitHub Actions
2. **Verifica las credenciales** FTP con FileZilla
3. **Contacta soporte** de Hostinger si el FTP no funciona

---

**Configurado con ❤️ para MA Arquitectura**
