# ⚡ GUÍA RÁPIDA - 1 PÁGINA

## 🚀 SETUP INICIAL (Solo 1 vez - 20 minutos)

### 1️⃣ Obtener FTP de Hostinger (5 min)

```
hPanel → Archivos → FTP → Anotar:
  Servidor: ftp.tudominio.com
  Usuario: usuario@tudominio.com
  Contraseña: ***
```

### 2️⃣ Configurar GitHub (3 min)

```
GitHub → Settings → Secrets → Actions → New secret (×3):
  FTP_SERVER = ftp.tudominio.com
  FTP_USERNAME = usuario@tudominio.com
  FTP_PASSWORD = tu_contraseña
```

### 3️⃣ Push del Código (2 min)

```bash
git add .
git commit -m "feat: activar pipeline CI/CD"
git push origin master
```

### 4️⃣ Esperar Deploy (5 min)

```
GitHub → Actions → Ver workflow ejecutándose → Esperar ✅
```

### 5️⃣ Verificar (1 min)

```
Abrir: https://tudominio.com
Presionar: Ctrl+F5
Verificar: Que cargue OK
```

---

## ✏️ USO DIARIO (Después del setup)

### ➕ Agregar Proyecto

```
1. GitHub → src/assets/data/projects.json → Edit
2. Copiar proyecto existente, cambiar:
   "id": "proyecto-nuevo"
   "name": "PROYECTO NUEVO"
   imágenes, descripción, etc.
3. Commit changes
4. Esperar 5 min → ✅ Listo
```

### ✏️ Editar Proyecto

```
1. GitHub → projects.json → Edit
2. Buscar proyecto por "id"
3. Modificar lo que necesites (NO el "id")
4. Commit → Deploy automático
```

### 🗑️ Eliminar Proyecto

```
1. GitHub → projects.json → Edit
2. Eliminar objeto completo
3. Verificar que el JSON sea válido
4. Commit
```

---

## 📝 Estructura de Proyecto

```json
{
  "id": "reforma-ejemplo", // ⚠️ ÚNICO
  "name": "REFORMA EJEMPLO",
  "m2": "45",
  "location": "Palermo",
  "district": "CABA",
  "year": 2024,
  "showImg": "v1747.../img.jpg", // Cloudinary
  "images": [{ "src": "v1747.../img1.jpg" }, { "src": "v1747.../img2.jpg" }],
  "description": "...",
  "descriptionEn": "..." // Opcional
}
```

---

## 🔧 Comandos

```bash
npm run validate:projects  # Validar JSON
npm run add:project       # Agregar interactivo
npm run build             # Build con validación
```

---

## 📊 Monitoreo

```
GitHub → Actions → Ver deploys
  ✅ Verde = Exitoso
  ❌ Rojo = Error (ver logs)
```

---

## ⚠️ ERRORES COMUNES

| Error              | Solución                                  |
| ------------------ | ----------------------------------------- |
| "ID duplicado"     | Cambiar ID en JSON                        |
| "Auth failed"      | Verificar secrets en GitHub               |
| "Campo faltante"   | Agregar `id`, `name`, `showImg`, `images` |
| Sitio no actualiza | Ctrl+F5, esperar 5-10 min                 |

---

## 📞 AYUDA

1. `QUICK_START.md` → Uso diario
2. `PROJECTS_MANAGEMENT.md` → Guía completa
3. `PASOS_INMEDIATOS.md` → Setup inicial
4. GitHub Actions logs → Errores específicos

---

## ✅ VERIFICACIÓN RÁPIDA

**Setup correcto si:**

- [ ] 3 secrets en GitHub (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- [ ] Workflow existe: `.github/workflows/deploy.yml`
- [ ] JSON existe: `src/assets/data/projects.json`
- [ ] Push hecho a master
- [ ] Actions muestra workflow ✅ verde
- [ ] Sitio carga: `https://tudominio.com`

---

## 🎯 RESULTADO FINAL

```
Antes: 30 min para agregar proyecto + FTP manual
Ahora: 2 min editar JSON → Automático en 5 min ✨
```

**Ahorro: 90% del tiempo** 🚀

---

**Lee `PASOS_INMEDIATOS.md` para empezar →**
