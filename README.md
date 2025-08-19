# MA Arquitectura - Landing Page

Landing page desarrollada para el estudio de arquitectura MA Arquitectura, con enfoque en diseño visual, internacionalización, sistema de contacto y optimización de rendimiento.

---

## Estructura del Proyecto

```
src/
  app/
    @components/
      home/              # Página principal con proyectos destacados
      topbar/            # Barra de navegación superior
      project-list/      # Listado de proyectos
      project-detail/    # Detalle de cada proyecto con planta
      project-display/   # Visualización de proyectos destacados
      nosotros/          # Sección "Sobre nosotros"
      servicios/         # Página de servicios con acordeón
      contacto/          # Página de contacto con formulario
      footer/            # Pie de página
    transltate/          # Módulo de internacionalización (i18n)
      translation.service.ts
      translate.pipe.ts
      translations.ts
    config/
      email.config.ts    # Configuración de EmailJS y reCAPTCHA
    app.component.*      # Componente raíz de la aplicación
    app.routes.*         # Definición de rutas con lazy loading
    cloudinary.service.ts# Servicio para integración con Cloudinary
  assets/
    fonts/               # Fuentes personalizadas
    styles/variables.scss# Variables de estilos globales
    logo-blanco.webp     # Logo optimizado en WebP
    *.jpg, *.png         # Imágenes y recursos gráficos
  environments/
    environment.ts       # Configuración de desarrollo
    environment.prod.ts  # Configuración de producción
  server.ts             # Servidor Express con optimizaciones
```

---

## Tecnologías Utilizadas

### 🎯 **Core Technologies**

- **Angular 19**: Framework principal con SSR (Server-Side Rendering)
- **TypeScript**: Lenguaje principal con tipado estático
- **Sass (SCSS)**: Preprocesador CSS con variables y mixins
- **Angular Material & CDK**: Componentes UI y utilidades

### 🖼️ **Gestión de Imágenes**

- **Cloudinary**: Optimización automática de imágenes con transformaciones
- **WebP**: Formato de imagen moderno para mejor rendimiento
- **Lazy Loading**: Carga diferida de imágenes para optimizar LCP

### 📧 **Sistema de Contacto**

- **EmailJS**: Envío de emails desde el frontend sin backend
- **Google reCAPTCHA v3**: Protección invisible contra spam
- **Reactive Forms**: Formularios reactivos con validación

### ⚡ **Optimización de Rendimiento**

- **Gzip Compression**: Compresión de archivos estáticos
- **Resource Hints**: Preload, preconnect y dns-prefetch
- **Lazy Loading**: Carga diferida de rutas y componentes
- **CSS Containment**: Optimización de renderizado
- **Font Optimization**: Carga optimizada de fuentes web

### 🌐 **Internacionalización & SSR**

- **i18n**: Sistema propio de traducciones
- **Express.js**: Servidor SSR con optimizaciones
- **Platform Detection**: Detección de plataforma para SSR

### 🧪 **Testing & Deployment**

- **Karma & Jasmine**: Testing unitario
- **Netlify**: Despliegue automático
- **Lighthouse**: Auditoría de rendimiento

### 🎨 **Diseño & UX**

- **Fuentes personalizadas**: Cormorant, Manrope, Blair ITC, ModecoTrial, Ivnm
- **Animaciones CSS**: Transiciones y efectos visuales
- **Responsive Design**: Diseño adaptativo para todos los dispositivos

---

## 🚀 **Uso y Desarrollo**

### **Servidor de desarrollo**

```bash
npm run serve
```

Abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente.

### **Compilación y Build**

```bash
# Desarrollo
npm run build

# Producción con optimizaciones
npm run build:prod

# Servidor de producción
npm run serve:prod
```

### **Testing**

```bash
# Pruebas unitarias
npm run test

# Pruebas con coverage
npm run test:coverage

# Pruebas e2e
npm run e2e
```

---

## ⚙️ **Configuración de Tecnologías**

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

#### **Implementación:**

- Invisible para el usuario
- Se ejecuta automáticamente al enviar formulario
- Protección contra bots y spam

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

#### **Uso en Componentes:**

```typescript
// En templates
[src]="getOptimizedImageUrl('image-id', 800, 600)"

// Con lazy loading
loading="lazy" decoding="async"
```

### ⚡ **Optimizaciones de Rendimiento**

#### **Resource Hints:**

```html
<!-- Preload críticos -->
<link rel="preload" href="assets/logo-blanco.webp" as="image" />

<!-- Preconnect a dominios externos -->
<link rel="preconnect" href="https://fonts.googleapis.com" />

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//res.cloudinary.com" />
```

#### **CSS Optimizations:**

```scss
// Containment para mejor rendimiento
contain: layout style paint;

// Will-change para animaciones
will-change: transform, opacity;

// Font optimization
font-display: swap;
```

### 🌐 **Server-Side Rendering (SSR)**

#### **Configuración del Servidor:**

- `src/server.ts` - Servidor Express optimizado
- Compresión gzip automática
- Headers de seguridad
- Caching optimizado

#### **Platform Detection:**

```typescript
// Para código que solo debe ejecutarse en browser
if (isPlatformBrowser(this.platformId)) {
  // Código específico del navegador
}
```

---

## 📁 **Estructura de Archivos Importantes**

### **Configuración:**

- `angular.json` - Configuración de build y optimizaciones
- `src/environments/` - Variables por entorno
- `src/app/config/` - Configuraciones centralizadas

### **Componentes Nuevos:**

- `src/app/@components/servicios/` - Página de servicios
- `src/app/@components/contacto/` - Formulario de contacto
- `src/app/config/email.config.ts` - Configuración de email

### **Optimizaciones:**

- `src/index.html` - Resource hints y optimizaciones
- `src/server.ts` - Servidor SSR optimizado
- `src/styles.scss` - Estilos globales optimizados

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
```

### **Producción:**

```bash
# Build optimizado
npm run build:prod

# Servidor de producción
npm run serve:prod

# Análisis de bundle
npm run analyze
```

### **Lighthouse:**

```bash
# Auditoría de rendimiento
npx lighthouse http://localhost:4200 --output html
```

---

## 🚨 **Consideraciones Importantes**

### **Seguridad:**

- ✅ **EmailJS**: Solo usa claves públicas (seguras en frontend)
- ✅ **reCAPTCHA**: Site key es pública por diseño
- ✅ **Validación**: Formularios con validación del lado cliente
- ✅ **Headers**: Headers de seguridad configurados

### **Rendimiento:**

- ✅ **Lazy Loading**: Rutas y componentes cargados bajo demanda
- ✅ **Compresión**: Gzip habilitado en servidor
- ✅ **Caching**: Headers de cache optimizados
- ✅ **Imágenes**: WebP y optimización automática

### **SSR:**

- ✅ **Platform Detection**: Código browser-only protegido
- ✅ **Hydration**: Hidratación correcta del cliente
- ✅ **SEO**: Meta tags y estructura optimizada

### **Accesibilidad:**

- ✅ **ARIA Labels**: Etiquetas de accesibilidad
- ✅ **Semantic HTML**: Estructura semántica correcta
- ✅ **Keyboard Navigation**: Navegación por teclado
- ✅ **Screen Readers**: Compatibilidad con lectores de pantalla

---

## 🔧 **Troubleshooting**

### **Problemas Comunes:**

#### **EmailJS no funciona:**

- Verificar que las claves estén correctas en `environment.ts`
- Comprobar que el template tenga las variables correctas
- Revisar la consola del navegador para errores

#### **reCAPTCHA no carga:**

- Verificar que el dominio esté configurado en Google reCAPTCHA Admin
- Comprobar que la site key sea correcta
- Asegurar que no haya bloqueadores de anuncios activos

#### **Imágenes no se optimizan:**

- Verificar que las URLs de Cloudinary sean correctas
- Comprobar que los parámetros de transformación sean válidos
- Revisar la conexión a internet

#### **Errores de SSR:**

- Usar `isPlatformBrowser()` para código browser-only
- Verificar que no haya referencias directas a `window` o `document`
- Comprobar que los scripts externos se carguen solo en browser

#### **Problemas de rendimiento:**

- Ejecutar Lighthouse para identificar cuellos de botella
- Verificar que la compresión gzip esté habilitada
- Comprobar que las imágenes estén optimizadas

### **Logs Útiles:**

```bash
# Ver logs del servidor
npm run serve:prod

# Analizar bundle
npm run analyze

# Test de rendimiento
npx lighthouse http://localhost:4200
```

---

## 📚 **Recursos Adicionales**

### **Documentación Oficial:**

- [Angular](https://angular.dev/) - Framework principal
- [EmailJS](https://www.emailjs.com/docs/) - Sistema de email
- [Google reCAPTCHA](https://developers.google.com/recaptcha) - Protección anti-spam
- [Cloudinary](https://cloudinary.com/documentation) - Gestión de imágenes
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoría de rendimiento

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

---

**Desarrollado con ❤️ para MA Arquitectura**
