# ⚡ Quick Start - Sistema de Proyectos Dinámicos

## 🎯 Lo Más Importante

**Para agregar/editar proyectos:**

1. Edita `src/assets/data/projects.json` en GitHub
2. Haz commit
3. Espera ~5 minutos
4. ✅ ¡Listo!

---

## 📝 Agregar un Proyecto

### **Desde GitHub (Más Fácil):**

1. Ve a `src/assets/data/projects.json`
2. Clic en **Edit** (ícono lápiz)
3. Copia un proyecto existente
4. Cambia:
   ```json
   {
     "id": "nuevo-proyecto",        // ⚠️ Debe ser ÚNICO
     "name": "NUEVO PROYECTO",
     "m2": "50",
     "location": "Palermo",
     "district": "CABA",
     "year": 2024,
     "showImg": "v17...jpg",        // Cloudinary ID
     "images": [
       { "src": "v17...jpg" },
       { "src": "v17...jpg" }
     ],
     "description": "..."
   }
   ```
5. **Commit changes**
6. Espera ~5 min → Proyecto visible en `tudominio.com/nuevo-proyecto`

### **Desde Terminal (Local):**

```bash
npm run add:project
# Responde las preguntas
# Commit y push
```

---

## ✏️ Editar un Proyecto

1. Abre `src/assets/data/projects.json`
2. Busca el proyecto por `id`
3. Modifica lo que necesites
4. **NO cambies el `id`** (rompe la URL)
5. Commit → Deploy automático

---

## 🗑️ Eliminar un Proyecto

1. Abre `src/assets/data/projects.json`
2. Elimina el objeto JSON completo
3. Verifica que el JSON sea válido
4. Commit

---

## 🧪 Validar Antes de Commitear

```bash
# Validar localmente
npm run validate:projects

# Build con validación
npm run build
```

---

## 🚀 Deployment

**Automático:**
- Push a `master` → Deploy automático

**Manual:**
- GitHub → Actions → "Run workflow"

**Ver estado:**
- GitHub → Actions

---

## 📚 Documentación Completa

- **Gestión de Proyectos:** `PROJECTS_MANAGEMENT.md`
- **Setup de Deployment:** `DEPLOYMENT_SETUP.md`
- **Workflow Details:** `.github/workflows/deploy.yml`

---

## 🆘 Ayuda Rápida

**Problema: Build falla**
```bash
npm run validate:projects
# Corrige los errores mostrados
```

**Problema: Deploy no actualiza sitio**
- Limpia caché: Ctrl+F5
- Espera 5-10 minutos
- Verifica GitHub Actions

**Problema: Proyecto no aparece**
- Verifica que el `id` sea correcto
- Verifica que haya imágenes
- Revisa logs de GitHub Actions

---

**¡Eso es todo!** 🎉

