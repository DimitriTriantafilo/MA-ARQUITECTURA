# MaArquitecturaLanding

Landing page desarrollada para el estudio de arquitectura MA Arquitectura, utilizando Angular y tecnologías modernas de frontend.

---

## Estructura del Proyecto

```
src/
  app/
    @components/
      home/              # Componente principal de la página de inicio
      topbar/            # Barra superior de navegación
      project-list/      # Listado de proyectos
      project-detail/    # Detalle de un proyecto individual
      project-display/   # Visualización de proyectos destacados
      nosotros/          # Sección "Sobre nosotros"
      footer/            # Pie de página
    transltate/          # Módulo de internacionalización (i18n)
      translation.service.ts
      translate.pipe.ts
      translations.ts
    app.component.*      # Componente raíz de la aplicación
    app.routes.*         # Definición de rutas
    cloudinary.service.ts# Servicio para integración con Cloudinary
  assets/
    fonts/               # Fuentes personalizadas (Cormorant, Manrope, Blair ITC, etc.)
    styles/variables.scss# Variables de estilos globales (colores, fuentes)
    *.jpg, *.png         # Imágenes y recursos gráficos
```

---

## Tecnologías Utilizadas

- **Angular 19**: Framework principal para el desarrollo de la SPA.
- **Angular Material & CDK**: Componentes UI y utilidades.
- **TypeScript**: Lenguaje principal.
- **Sass (SCSS)**: Preprocesador CSS para estilos personalizados.
- **Cloudinary**: Gestión y optimización de imágenes.
- **Express**: Soporte para server-side rendering (SSR).
- **Internacionalización (i18n)**: Implementada mediante un módulo propio (`transltate/`).
- **Fuentes personalizadas**: Cormorant, Manrope, Blair ITC, ModecoTrial, Ivnm.
- **Karma & Jasmine**: Testing unitario.
- **Netlify**: Configuración para despliegue (ver `netlify.toml`).

---

## Uso y Desarrollo

### Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Luego abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar los archivos fuente.

### Generación de componentes

Para generar un nuevo componente con Angular CLI:

```bash
ng generate component nombre-componente
```

Para ver todos los esquemas disponibles:

```bash
ng generate --help
```

### Compilación

Para compilar el proyecto:

```bash
ng build
```

Los archivos compilados se almacenarán en el directorio `dist/`.

### Pruebas unitarias

Para ejecutar pruebas unitarias con [Karma](https://karma-runner.github.io):

```bash
ng test
```

### Pruebas end-to-end

Para pruebas end-to-end (e2e):

```bash
ng e2e
```

Angular CLI no incluye un framework e2e por defecto, puedes elegir el que prefieras.

---

## Recursos adicionales

Para más información sobre Angular CLI, visita la [documentación oficial](https://angular.dev/tools/cli).

---

### Documentación completa del proyecto

A continuación te armo una documentación integral para tu proyecto, lista para agregar al README o compartir:

---

# MA Arquitectura - Landing Page

## Descripción

Landing page desarrollada para el estudio de arquitectura MA Arquitectura, con enfoque en diseño visual, internacionalización y presentación de proyectos destacados.

---

## Estructura del Proyecto

```
src/
  app/
    @components/
      home/              # Página principal
      topbar/            # Barra de navegación superior
      project-list/      # Listado de proyectos
      project-detail/    # Detalle de cada proyecto
      project-display/   # Visualización de proyectos destacados
      nosotros/          # Sección "Sobre nosotros"
      footer/            # Pie de página
    transltate/          # Módulo de internacionalización (i18n)
      translation.service.ts
      translate.pipe.ts
      translations.ts
    app.component.*      # Componente raíz
    app.routes.*         # Definición de rutas
    cloudinary.service.ts# Servicio para imágenes Cloudinary
  assets/
    fonts/               # Fuentes personalizadas (Cormorant, Manrope, Blair ITC, etc.)
    styles/variables.scss# Variables de estilos globales
    *.jpg, *.png         # Imágenes y recursos gráficos
  styles.scss            # Estilos globales
```

---

## Tecnologías Utilizadas

- **Angular 19**: Framework principal.
- **Angular Material & CDK**: Componentes UI.
- **TypeScript**: Lenguaje principal.
- **Sass (SCSS)**: Preprocesador CSS.
- **Cloudinary**: Gestión de imágenes.
- **Express**: Server-side rendering (SSR).
- **Internacionalización (i18n)**: Módulo propio.
- **Fuentes personalizadas**: Cormorant, Manrope, Blair ITC, ModecoTrial, Ivnm.
- **Karma & Jasmine**: Testing unitario.
- **Netlify**: Despliegue.

---

## Uso y Desarrollo

### Servidor de desarrollo

```bash
ng serve
```

Abre tu navegador en `http://localhost:4200/`.

### Generación de componentes

```bash
ng generate component nombre-componente
```

### Compilación

```bash
ng build
```

### Pruebas unitarias y coverage

```bash
ng test --code-coverage
```

Abre el reporte en `coverage/ma-arquitectura-landing/index.html`.

---

## Internacionalización

- Traducciones en `src/app/transltate/translations.ts`.
- Pipe personalizado para traducción en plantillas.
- Cambia el idioma desde el servicio `TranslationService`.

---

## Personalización visual

- Variables de color y fuentes en `src/assets/styles/variables.scss`.
- Fuentes personalizadas en `src/assets/fonts/`.
- Estilos globales en `src/styles.scss`.

---

## Despliegue

- Configuración para Netlify en `netlify.toml`.

---

¿Quieres que agregue esta documentación directamente a tu README.md o necesitas algún apartado extra?
