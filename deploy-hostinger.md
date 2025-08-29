# Guía de Deploy en Hostinger

## Preparación del Proyecto

### 1. Build de Producción

```bash
# Instalar dependencias (si no están instaladas)
npm install

# Build de producción optimizado
npm run build:prod
```

### 2. Verificar el Build

Después del build, verifica que en la carpeta `dist/ma-arquitectura-landing/` tengas:

- ✅ `index.html`
- ✅ `.htaccess`
- ✅ Carpeta `assets/`
- ✅ Archivos JS y CSS con hash
- ✅ `favicon.ico` y otros recursos

## Subida a Hostinger

### Opción 1: File Manager (Recomendado)

1. **Acceder al File Manager**:

   - Ve al panel de control de Hostinger
   - Busca "File Manager" o "Administrador de archivos"

2. **Navegar al directorio raíz**:

   - Ve a `public_html/` (o el directorio de tu dominio)

3. **Subir archivos**:

   - Selecciona todos los archivos de `dist/ma-arquitectura-landing/`
   - Arrastra y suelta o usa "Upload"
   - **Importante**: Sube los archivos directamente en la raíz, no en una subcarpeta

4. **Verificar permisos**:
   - El archivo `.htaccess` debe tener permisos 644
   - Las carpetas deben tener permisos 755

### Opción 2: FTP/SFTP

1. **Conectar via FTP**:

   - Usa FileZilla o similar
   - Host: tu dominio o IP
   - Usuario y contraseña de tu hosting

2. **Subir archivos**:
   - Navega a `public_html/`
   - Sube todo el contenido de `dist/ma-arquitectura-landing/`

## Configuración Post-Deploy

### 1. Verificar .htaccess

Asegúrate de que el archivo `.htaccess` esté en la raíz y contenga:

```apache
# Verificar que este archivo esté presente
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

### 2. Habilitar HTTPS

1. Ve al panel de control de Hostinger
2. Busca "SSL" o "Certificados SSL"
3. Activa el certificado SSL gratuito
4. Configura redirección de HTTP a HTTPS

### 3. Verificar Compresión

Para verificar que la compresión Gzip funciona:

1. Ve a tu sitio web
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña "Network"
4. Recarga la página
5. Verifica que los archivos JS/CSS muestren "gzip" en la columna "Content-Encoding"

## Testing del Deploy

### 1. Verificar Funcionalidad Básica

- ✅ Página principal carga correctamente
- ✅ Video se reproduce (lazy loading)
- ✅ Navegación entre páginas funciona
- ✅ Imágenes se cargan correctamente

### 2. Verificar Optimizaciones

```javascript
// En la consola del navegador, deberías ver:
console.log("Page Load Time:", [tiempo], "ms");
console.log("DOM Content Loaded:", [tiempo], "ms");
```

### 3. Test de Performance

1. Ve a [PageSpeed Insights](https://pagespeed.web.dev/)
2. Analiza tu sitio
3. Verifica que las métricas hayan mejorado:
   - LCP < 2.5s
   - FCP < 1.8s
   - Speed Index < 3.5s

## Troubleshooting

### Problema: Rutas no funcionan (404)

**Solución**: Verificar que el `.htaccess` esté en la raíz y contenga las reglas de rewrite.

### Problema: Video no carga

**Solución**: Verificar que la URL de Cloudinary sea correcta y accesible.

### Problema: Imágenes no se cargan

**Solución**: Verificar que las URLs de Cloudinary sean correctas.

### Problema: Compresión no funciona

**Solución**:

1. Verificar que mod_deflate esté habilitado en el servidor
2. Contactar soporte de Hostinger si es necesario

## Comandos Útiles

```bash
# Build para testing local
npm run serve:prod

# Build con análisis de bundle
npm run build:analyze

# Limpiar cache y reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## Contacto con Soporte

Si tienes problemas específicos de Hostinger:

1. **Documentación**: [Hostinger Help Center](https://www.hostinger.com/help)
2. **Chat en vivo**: Disponible en el panel de control
3. **Ticket de soporte**: Desde el panel de control

## Notas Importantes

- ✅ El archivo `.htaccess` se incluye automáticamente en el build
- ✅ Las optimizaciones están configuradas para Hostinger
- ✅ La compresión Gzip se activa automáticamente
- ✅ El caché está configurado para máximo rendimiento
- ✅ Las rutas de Angular funcionan correctamente con la configuración SPA
