# Configuración de EmailJS y reCAPTCHA

## 📧 Configuración de EmailJS

### 1. Crear cuenta en EmailJS

1. Ve a [EmailJS.com](https://www.emailjs.com/) y crea una cuenta gratuita
2. Verifica tu email

### 2. Configurar Email Service

1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona "Gmail" como proveedor
4. Conecta tu cuenta de Gmail (Info.maarquitectura@gmail.com)
5. Guarda el **Service ID** (ej: `service_abc123`)

### 3. Crear Email Template

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este template:

```html
Nuevo mensaje de contacto desde MA Arquitectura Nombre: {{from_name}} Email: {{from_email}} Teléfono: {{from_phone}} Mensaje: {{message}} --- Enviado desde el formulario de contacto de MA Arquitectura
```

4. Guarda el **Template ID** (ej: `template_xyz789`)

### 4. Obtener Public Key

1. Ve a "Account" → "API Keys"
2. Copia tu **Public Key** (ej: `user_def456`)

## 🤖 Configuración de reCAPTCHA

### 1. Crear proyecto en Google reCAPTCHA

1. Ve a [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Haz clic en "+" para crear un nuevo sitio
3. Selecciona "reCAPTCHA v3"
4. Agrega tu dominio (ej: `maarquitectura.com`)
5. Acepta los términos y crea

### 2. Obtener Site Key

1. Copia el **Site Key** que te proporciona Google
2. Este es el que necesitas para el frontend

## ⚙️ Configurar el Proyecto

### 1. Actualizar archivo de configuración

Edita `src/app/config/email.config.ts`:

```typescript
export const EMAIL_CONFIG = {
  // EmailJS Configuration
  EMAILJS_PUBLIC_KEY: "user_def456", // Tu EmailJS Public Key
  EMAILJS_SERVICE_ID: "service_abc123", // Tu EmailJS Service ID
  EMAILJS_TEMPLATE_ID: "template_xyz789", // Tu EmailJS Template ID

  // reCAPTCHA Configuration
  RECAPTCHA_SITE_KEY: "6Lc...", // Tu reCAPTCHA Site Key

  // Email Configuration
  TO_EMAIL: "Info.maarquitectura@gmail.com",
};
```

### 2. Verificar configuración

1. Asegúrate de que todas las claves estén correctamente configuradas
2. Prueba el formulario de contacto
3. Verifica que los emails lleguen a Info.maarquitectura@gmail.com

## 🔒 Seguridad

- **EmailJS Public Key**: Es seguro incluir en el frontend
- **reCAPTCHA Site Key**: Es seguro incluir en el frontend
- **Service ID y Template ID**: Son seguros para el frontend

## 📱 Funcionalidades

- ✅ **Envío de emails** desde el frontend sin backend
- ✅ **Protección anti-spam** con reCAPTCHA v3 invisible
- ✅ **Validación de formulario** en tiempo real
- ✅ **Mensajes de feedback** para el usuario
- ✅ **Responsive design** para todos los dispositivos

## 🚀 Despliegue

1. Configura las claves en el archivo de configuración
2. Construye el proyecto: `ng build --prod`
3. Sube los archivos a tu hosting
4. Verifica que el formulario funcione correctamente

## 📞 Soporte

Si tienes problemas:

1. Verifica que todas las claves estén correctas
2. Revisa la consola del navegador para errores
3. Asegúrate de que el dominio esté configurado en reCAPTCHA
4. Verifica que el template de EmailJS esté correcto
