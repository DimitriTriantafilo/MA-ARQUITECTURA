# 🔄 Pipeline CI/CD - Guía de Modificación

## 📋 **Archivos del Pipeline**

### **Workflow Principal:**

- `.github/workflows/deploy.yml` - Configuración completa del pipeline

### **Scripts de Validación:**

- `scripts/validate-projects.js` - Validador de proyectos
- `scripts/add-project.js` - Creador de proyectos

### **Configuración:**

- `eslint.config.js` - Reglas de linting
- `package.json` - Scripts de build y validación

---

## ⚙️ **Modificaciones Comunes**

### **Cambiar Servidor FTP:**

```yaml
# En .github/workflows/deploy.yml
- name: Deploy via FTP
  uses: SamKirkland/FTP-Deploy-Action@v4.3.4
  with:
    server: ${{ secrets.FTP_SERVER }} # ← Cambiar aquí
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    server-dir: /domains/estudiomaarquitectura.com/public_html/ # ← Directorio de destino
```

### **Modificar Reglas de Linting:**

```javascript
// En eslint.config.js
rules: {
  "regla-que-quieres-cambiar": "error", // o "warn" o "off"
  // ... otras reglas
}
```

### **Agregar Nuevos Scripts:**

```json
// En package.json
"scripts": {
  "nuevo-comando": "node scripts/nuevo-script.js",
  // ... otros scripts
}
```

### **Cambiar Validaciones de Proyectos:**

```javascript
// En scripts/validate-projects.js
const REQUIRED_FIELDS = [
  "id",
  "name",
  "description",
  // ← Agregar/quitar campos requeridos
];
```

---

## 🔧 **GitHub Secrets Requeridos**

Para que el pipeline funcione, configurar en GitHub → Settings → Secrets:

```
FTP_SERVER: tu-servidor-ftp.com
FTP_USERNAME: tu-usuario-ftp
FTP_PASSWORD: tu-password-ftp
```

---

## 🚨 **Troubleshooting Rápido**

### **Pipeline falla:**

1. Revisar logs en GitHub Actions
2. Verificar GitHub Secrets
3. Comprobar `projects.json` con `npm run validate:projects`

### **Deploy no funciona:**

1. Verificar credenciales FTP
2. Comprobar directorio `server-dir`
3. Revisar permisos de archivos

### **Linting falla:**

1. Ejecutar `npm run lint` localmente
2. Ajustar reglas en `eslint.config.js`
3. Usar `npm run build:skip-validation` para debug

---

## 📝 **Notas Importantes**

- ✅ **No modificar** la estructura básica del pipeline
- ✅ **Siempre probar** cambios localmente primero
- ✅ **Mantener** compatibilidad con el sistema de proyectos
- ✅ **Documentar** cambios importantes en commits

---

**Para modificaciones complejas, consultar la documentación completa en README.md**
