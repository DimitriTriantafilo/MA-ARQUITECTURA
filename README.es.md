# MA Arquitectura - Landing Page

Landing page moderna desarrollada para el estudio de arquitectura MA Arquitectura, con diseño visual de excelencia, internacionalización, sistema de contacto y gestión dinámica de proyectos con despliegue automatizado.

**[📖 English Documentation](./README.md)**

---

## 🚀 **Gestión Dinámica de Proyectos y CI/CD**

### **🎯 Características Principales**

- ✅ **Gestión dinámica de proyectos** desde JSON externo
- ✅ **Rutas automáticas** generadas para cada proyecto
- ✅ **Deploy automático** a Hostinger via GitHub Actions
- ✅ **Validación de proyectos** antes de cada build
- ✅ **Pipeline completo** con linting y testing

### **📁 Estructura de Datos**

Los proyectos se gestionan desde `src/assets/data/projects.json`:

```json
[
  {
    "id": "proyecto-unico",
    "name": "Nombre del Proyecto",
    "description": "Descripción del proyecto...",
    "image": "ruta/imagen.jpg",
    "gallery": ["img1.jpg", "img2.jpg"],
    "location": "Ubicación",
    "year": "2024",
    "type": "Tipo de proyecto",
    "area": "Área en m²",
    "status": "Estado del proyecto"
  }
]
```

### **✏️ Cómo Agregar/Editar Proyectos**

1. **Editar** `src/assets/data/projects.json`
2. **Agregar o modificar** datos del proyecto
3. **Commit y push** a la rama `master`
4. **Deploy automático** se ejecutará (~5 minutos)

**Nota:** Las rutas se generan automáticamente desde el archivo JSON durante el build mediante `scripts/generate-routes.js`

### **🔧 Validación**

Validar proyectos antes de hacer commit:

```bash
npm run validate:projects
```

Esto verifica:

- ✅ Campos requeridos
- ✅ IDs únicos
- ✅ Slugs correctos

---

## 🔄 **Pipeline CI/CD Automatizado**

### **GitHub Actions Workflow**

El pipeline se ejecuta automáticamente en cada push a `master`:

```yaml
# .github/workflows/deploy.yml
1. ✅ Validación de proyectos
2. ✅ Linting (ESLint)
3. ✅ Build de producción
4. ✅ Deploy automático a Hostinger
```

### **GitHub Secrets Requeridos**

Configurar en GitHub → Settings → Secrets:

```
FTP_SERVER: tu-servidor-ftp.com
FTP_USERNAME: tu-usuario-ftp
FTP_PASSWORD: tu-password-ftp
```

### **Monitoreo del Pipeline**

- ✅ **Tiempo total:** ~5 minutos
- ✅ **Notificaciones:** Email automático en caso de fallo
- ✅ **Logs detallados:** Disponibles en GitHub Actions
- ✅ **Rollback:** Manual desde Hostinger si es necesario

---

## 🛠️ **Tecnologías**

### **🎯 Core**

- **Angular 19**: Framework principal con SSR
- **TypeScript**: Lenguaje con tipado estático
- **Sass (SCSS)**: Preprocesador CSS con variables y mixins
- **Angular Material & CDK**: Componentes UI y utilidades

### **🖼️ Gestión de Imágenes**

- **Cloudinary**: Optimización automática de imágenes
- **WebP**: Formato de imagen moderno para mejor rendimiento
- **Lazy Loading**: Carga diferida de imágenes
- **Pinch-to-zoom**: Zoom nativo para galería de proyectos en móvil

### **📧 Sistema de Contacto**

- **EmailJS**: Envío de emails desde el frontend
- **Google reCAPTCHA v3**: Protección invisible contra spam
- **Reactive Forms**: Formularios reactivos con validación

### **⚡ Optimización de Rendimiento**

- **Gzip Compression**: Compresión de archivos estáticos
- **Resource Hints**: Preload, preconnect y dns-prefetch
- **Lazy Loading**: Carga diferida de rutas y componentes
- **CSS Containment**: Optimización de renderizado

### **🌐 Internacionalización y SSR**

- **i18n**: Sistema propio de traducciones
- **Express.js**: Servidor SSR con optimizaciones
- **Platform Detection**: Detección de plataforma para SSR

### **🎥 Video Optimizado**

- **YouTube Iframe API**: Videos optimizados con lazy loading
- **Autoplay inteligente**: Retry automático en modo ahorro de batería
- **Controles personalizados**: Botón de play manual como fallback

---

## 📁 **Estructura del Proyecto**

```
src/
  app/
    @components/
      home/              # Página principal con proyectos destacados
      topbar/            # Barra de navegación superior
      project-list/      # Listado de proyectos
      project-detail/    # Detalle de cada proyecto con zoom móvil
      project-display/   # Visualización de proyectos destacados
      nosotros/          # Sección "Sobre nosotros"
      servicios/         # Página de servicios con acordeón
      contacto/          # Página de contacto con formulario
      footer/            # Pie de página
      privacy-friendly-video/ # Video optimizado con controles
    services/
      projects.service.ts # Servicio de gestión de proyectos
    resolvers/
      project.resolver.ts # Resolver para rutas dinámicas
    translate/           # Módulo de internacionalización (i18n)
      translation.service.ts
      translate.pipe.ts
      translations.ts
    config/
      email.config.ts    # Configuración de EmailJS y reCAPTCHA
    app.component.*      # Componente raíz
    app.routes.*         # Definición de rutas dinámicas
    cloudinary.service.ts# Servicio de integración con Cloudinary
  assets/
    data/
      projects.json      # 🆕 Datos de proyectos (EDITABLE)
    fonts/               # Fuentes personalizadas
    styles/variables.scss# Variables de estilos globales
    logo-blanco.webp     # Logo optimizado en WebP
  environments/
    environment.ts       # Configuración de desarrollo
    environment.prod.ts  # Configuración de producción
  server.ts             # Servidor Express con optimizaciones
scripts/
  validate-projects.js   # 🆕 Validador de proyectos
  generate-routes.js    # 🆕 Generador de rutas dinámicas
.github/
  workflows/
    deploy.yml          # 🆕 Pipeline CI/CD automatizado
```

---

## 🚀 **Desarrollo y Uso**

### **Servidor de Desarrollo**

```bash
npm run serve
```

Abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente.

### **Testing**

```bash
# Pruebas unitarias
npm run test

# Linting
npm run lint

# Análisis de bundle
npm run analyze
```

### **Build de Producción**

```bash
# Build optimizado con validación
npm run build:prod

# Servidor de producción
npm run serve:prod
```

---

## ⚙️ **Configuración de Servicios**

### 📧 **Sistema de Email (EmailJS)**

#### **Configuración Inicial:**

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Obtener **Public Key** desde Account → API Keys
3. Crear **Email Service** (Gmail, Outlook, etc.)
4. Crear **Email Template** con variables:
   ```html
   Nombre: {{name}} Email: {{email}} Teléfono: {{phone}} Mensaje: {{message}}
   ```

#### **Archivos de Configuración:**

- `src/environments/environment.ts` - Desarrollo
- `src/environments/environment.prod.ts` - Producción
- `src/app/config/email.config.ts` - Configuración centralizada

#### **Variables Requeridas:**

```typescript
emailjs: {
  publicKey: 'tu_public_key',
  serviceId: 'tu_service_id',
  templateId: 'tu_template_id',
}
```

### 🛡️ **reCAPTCHA v3**

#### **Configuración:**

1. Ir a [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Crear nuevo sitio con **reCAPTCHA v3**
3. Agregar dominios: `localhost` (dev), `tu-dominio.com` (prod)
4. Copiar **Site Key**

### 🖼️ **Optimización de Imágenes (Cloudinary)**

#### **Transformaciones Disponibles:**

```typescript
// Optimización automática
getOptimizedImageUrl(publicId, width, height);

// Parámetros disponibles:
// - c_scale: Escalado
// - q_auto: Calidad automática
// - f_auto: Formato automático (WebP)
// - fl_force_strip: Eliminar metadata
// - fl_progressive: Carga progresiva
```

### 🎥 **Video Optimizado**

#### **Características:**

- **Lazy loading**: Carga solo cuando es visible
- **Autoplay inteligente**: Retry automático en modo ahorro de batería
- **Controles personalizados**: Botón de play manual como fallback
- **YouTube Iframe API**: Control completo del reproductor

---

## 📱 **Funcionalidades Móviles**

### **Pinch-to-Zoom en Proyectos**

- ✅ **Zoom nativo**: Pinch para ampliar imágenes en galería
- ✅ **Pan suave**: Desplazamiento durante el zoom
- ✅ **Reset automático**: Doble tap para resetear zoom
- ✅ **Scroll preservado**: Navegación normal cuando no hay zoom

### **Video Optimizado para Móvil**

- ✅ **Autoplay adaptativo**: Funciona en modo ahorro de batería
- ✅ **Controles táctiles**: Botón de play grande y accesible
- ✅ **Lazy loading**: Carga diferida para mejor rendimiento

---

## 🔧 **Comandos Útiles**

### **Desarrollo:**

```bash
# Servidor de desarrollo
npm run serve

# Build de desarrollo
npm run build

# Testing
npm run test

# Linting
npm run lint
```

### **Producción:**

```bash
# Build optimizado con validación
npm run build:prod

# Servidor de producción
npm run serve:prod

# Análisis de bundle
npm run analyze
```

### **Gestión de Proyectos:**

```bash
# Validar proyectos
npm run validate:projects

# Build sin validación (debug)
npm run build:skip-validation
```

---

## 🚨 **Consideraciones Importantes**

### **Seguridad:**

- ✅ **EmailJS**: Solo usa claves públicas (seguras en frontend)
- ✅ **reCAPTCHA**: Site key es pública por diseño
- ✅ **GitHub Secrets**: Credenciales FTP protegidas
- ✅ **Validación**: Formularios con validación del lado cliente

### **Rendimiento:**

- ✅ **Lazy Loading**: Rutas y componentes cargados bajo demanda
- ✅ **Compresión**: Gzip habilitado en servidor
- ✅ **Caching**: Headers de cache optimizados
- ✅ **Imágenes**: WebP y optimización automática
- ✅ **SSR**: Prerenderizado para mejor SEO

### **Deploy Automático:**

- ✅ **Pipeline completo**: Validate → Lint → Build → Deploy
- ✅ **Rollback**: Manual desde Hostinger si es necesario
- ✅ **Monitoreo**: Logs detallados en GitHub Actions
- ✅ **Notificaciones**: Email automático en caso de fallo

---

## 🔧 **Troubleshooting**

### **Problemas Comunes:**

#### **Pipeline falla en GitHub Actions:**

- Verificar que los GitHub Secrets estén configurados
- Revisar logs en GitHub Actions para errores específicos
- Comprobar que `projects.json` sea válido

#### **Proyectos no se cargan:**

- Ejecutar `npm run validate:projects` para verificar datos
- Comprobar que los IDs sean únicos
- Verificar que las rutas de imágenes existan

#### **Deploy no actualiza archivos:**

- Verificar credenciales FTP en GitHub Secrets
- Comprobar que el directorio de destino sea correcto
- Revisar logs del workflow para errores de conexión

#### **EmailJS no funciona:**

- Verificar que las claves estén correctas en `environment.ts`
- Comprobar que el template tenga las variables correctas
- Revisar la consola del navegador para errores

#### **Video no reproduce en móvil:**

- Verificar que no esté en modo ahorro de batería
- Comprobar que el botón de play manual funcione
- Revisar logs de YouTube Iframe API

---

## 📚 **Recursos Adicionales**

### **Documentación Oficial:**

- [Angular](https://angular.dev/) - Framework principal
- [EmailJS](https://www.emailjs.com/docs/) - Sistema de email
- [Google reCAPTCHA](https://developers.google.com/recaptcha) - Protección anti-spam
- [Cloudinary](https://cloudinary.com/documentation) - Gestión de imágenes
- [YouTube Iframe API](https://developers.youtube.com/iframe_api_reference) - Control de videos
- [GitHub Actions](https://docs.github.com/en/actions) - CI/CD automático

### **Herramientas de Desarrollo:**

- [Angular DevTools](https://angular.dev/tools/devtools) - Herramientas de desarrollo
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - CI/CD para rendimiento
- [WebPageTest](https://www.webpagetest.org/) - Análisis de rendimiento

---

## 📄 **Licencia**

Este proyecto está desarrollado para MA Arquitectura. Todos los derechos reservados.

---

## 🤝 **Contribución**

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

**El pipeline CI/CD se ejecutará automáticamente para validar y desplegar los cambios.**

---

**Desarrollado con ❤️ para MA Arquitectura**

_Sistema completo de gestión de proyectos con deploy automático_
