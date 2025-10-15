# MA Arquitectura - Landing Page

Modern landing page developed for MA Arquitectura studio, featuring visual design excellence, internationalization, contact system, and dynamic project management with automated deployment.

**[📖 Documentación en Español](./README.es.md)**

---

## 🚀 **Dynamic Project Management & CI/CD**

### **🎯 Key Features**

- ✅ **Dynamic project management** from external JSON
- ✅ **Automatic routes** generated for each project
- ✅ **Automated deployment** to Hostinger via GitHub Actions
- ✅ **Project validation** before each build
- ✅ **Complete pipeline** with linting and testing

### **📁 Data Structure**

Projects are managed from `src/assets/data/projects.json`:

```json
[
  {
    "id": "unique-project-id",
    "name": "Project Name",
    "description": "Project description...",
    "image": "path/to/image.jpg",
    "gallery": ["img1.jpg", "img2.jpg"],
    "location": "Location",
    "year": "2024",
    "type": "Project type",
    "area": "Area in m²",
    "status": "Project status"
  }
]
```

### **✏️ How to Add/Edit Projects**

1. **Edit** `src/assets/data/projects.json`
2. **Add or modify** project data
3. **Commit and push** to `master` branch
4. **Automatic deployment** will trigger (~5 minutes)

**Note:** Routes are automatically generated from the JSON file during build time via `scripts/generate-routes.js`

### **🔧 Validation**

Validate projects before committing:

```bash
npm run validate:projects
```

This checks:

- ✅ Required fields
- ✅ Unique IDs
- ✅ Correct slugs

---

## 🔄 **Automated CI/CD Pipeline**

### **GitHub Actions Workflow**

The pipeline runs automatically on every push to `master`:

```yaml
# .github/workflows/deploy.yml
1. ✅ Project validation
2. ✅ Linting (ESLint)
3. ✅ Production build
4. ✅ Automated deployment to Hostinger
```

### **Required GitHub Secrets**

Configure in GitHub → Settings → Secrets:

```
FTP_SERVER: your-ftp-server.com
FTP_USERNAME: your-ftp-username
FTP_PASSWORD: your-ftp-password
```

### **Pipeline Monitoring**

- ✅ **Total time:** ~5 minutes
- ✅ **Notifications:** Automatic email on failure
- ✅ **Detailed logs:** Available in GitHub Actions
- ✅ **Rollback:** Manual from Hostinger if needed

---

## 🛠️ **Technologies**

### **🎯 Core**

- **Angular 19**: Main framework with SSR
- **TypeScript**: Statically typed language
- **Sass (SCSS)**: CSS preprocessor with variables and mixins
- **Angular Material & CDK**: UI components and utilities

### **🖼️ Image Management**

- **Cloudinary**: Automatic image optimization
- **WebP**: Modern image format for better performance
- **Lazy Loading**: Deferred image loading
- **Pinch-to-zoom**: Native zoom for mobile project gallery

### **📧 Contact System**

- **EmailJS**: Send emails from frontend
- **Google reCAPTCHA v3**: Invisible spam protection
- **Reactive Forms**: Reactive forms with validation

### **⚡ Performance Optimization**

- **Gzip Compression**: Static file compression
- **Resource Hints**: Preload, preconnect and dns-prefetch
- **Lazy Loading**: Deferred route and component loading
- **CSS Containment**: Rendering optimization

### **🌐 Internationalization & SSR**

- **i18n**: Custom translation system
- **Express.js**: SSR server with optimizations
- **Platform Detection**: Platform detection for SSR

### **🎥 Optimized Video**

- **YouTube Iframe API**: Optimized videos with lazy loading
- **Smart autoplay**: Automatic retry in battery saver mode
- **Custom controls**: Manual play button as fallback

---

## 📁 **Project Structure**

```
src/
  app/
    @components/
      home/              # Home page with featured projects
      topbar/            # Top navigation bar
      project-list/      # Project listing
      project-detail/    # Project detail with mobile zoom
      project-display/   # Featured project display
      nosotros/          # About section
      servicios/         # Services page with accordion
      contacto/          # Contact page with form
      footer/            # Footer
      privacy-friendly-video/ # Optimized video with controls
    services/
      projects.service.ts # Project management service
    resolvers/
      project.resolver.ts # Resolver for dynamic routes
    translate/           # Internationalization module (i18n)
      translation.service.ts
      translate.pipe.ts
      translations.ts
    config/
      email.config.ts    # EmailJS and reCAPTCHA config
    app.component.*      # Root component
    app.routes.*         # Dynamic route definition
    cloudinary.service.ts# Cloudinary integration service
  assets/
    data/
      projects.json      # 🆕 Project data (EDITABLE)
    fonts/               # Custom fonts
    styles/variables.scss# Global style variables
    logo-blanco.webp     # Optimized WebP logo
  environments/
    environment.ts       # Development config
    environment.prod.ts  # Production config
  server.ts             # Express server with optimizations
scripts/
  validate-projects.js   # 🆕 Project validator
  generate-routes.js    # 🆕 Dynamic route generator
.github/
  workflows/
    deploy.yml          # 🆕 Automated CI/CD pipeline
```

---

## 🚀 **Development & Usage**

### **Development Server**

```bash
npm run serve
```

Opens your browser at `http://localhost:4200/`. The app will reload automatically.

### **Testing**

```bash
# Unit tests
npm run test

# Linting
npm run lint

# Bundle analysis
npm run analyze
```

### **Production Build**

```bash
# Optimized build with validation
npm run build:prod

# Production server
npm run serve:prod
```

---

## ⚙️ **Service Configuration**

### 📧 **Email System (EmailJS)**

#### **Initial Setup:**

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Get **Public Key** from Account → API Keys
3. Create **Email Service** (Gmail, Outlook, etc.)
4. Create **Email Template** with variables:
   ```html
   Name: {{name}} Email: {{email}} Phone: {{phone}} Message: {{message}}
   ```

#### **Configuration Files:**

- `src/environments/environment.ts` - Development
- `src/environments/environment.prod.ts` - Production
- `src/app/config/email.config.ts` - Centralized config

#### **Required Variables:**

```typescript
emailjs: {
  publicKey: 'your_public_key',
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
}
```

### 🛡️ **reCAPTCHA v3**

#### **Configuration:**

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Create new site with **reCAPTCHA v3**
3. Add domains: `localhost` (dev), `your-domain.com` (prod)
4. Copy **Site Key**

### 🖼️ **Image Optimization (Cloudinary)**

#### **Available Transformations:**

```typescript
// Automatic optimization
getOptimizedImageUrl(publicId, width, height);

// Available parameters:
// - c_scale: Scaling
// - q_auto: Automatic quality
// - f_auto: Automatic format (WebP)
// - fl_force_strip: Remove metadata
// - fl_progressive: Progressive loading
```

### 🎥 **Optimized Video**

#### **Features:**

- **Lazy loading**: Loads only when visible
- **Smart autoplay**: Automatic retry in battery saver mode
- **Custom controls**: Manual play button as fallback
- **YouTube Iframe API**: Full player control

---

## 📱 **Mobile Features**

### **Pinch-to-Zoom in Projects**

- ✅ **Native zoom**: Pinch to zoom images in gallery
- ✅ **Smooth pan**: Pan while zoomed
- ✅ **Auto reset**: Double tap to reset zoom
- ✅ **Preserved scroll**: Normal navigation when not zoomed

### **Mobile-Optimized Video**

- ✅ **Adaptive autoplay**: Works in battery saver mode
- ✅ **Touch controls**: Large, accessible play button
- ✅ **Lazy loading**: Deferred loading for better performance

---

## 🔧 **Useful Commands**

### **Development:**

```bash
# Development server
npm run serve

# Development build
npm run build

# Testing
npm run test

# Linting
npm run lint
```

### **Production:**

```bash
# Optimized build with validation
npm run build:prod

# Production server
npm run serve:prod

# Bundle analysis
npm run analyze
```

### **Project Management:**

```bash
# Validate projects
npm run validate:projects

# Build without validation (debug)
npm run build:skip-validation
```

---

## 🚨 **Important Considerations**

### **Security:**

- ✅ **EmailJS**: Uses only public keys (safe in frontend)
- ✅ **reCAPTCHA**: Site key is public by design
- ✅ **GitHub Secrets**: Protected FTP credentials
- ✅ **Validation**: Client-side form validation

### **Performance:**

- ✅ **Lazy Loading**: Routes and components loaded on demand
- ✅ **Compression**: Gzip enabled on server
- ✅ **Caching**: Optimized cache headers
- ✅ **Images**: WebP and automatic optimization
- ✅ **SSR**: Prerendering for better SEO

### **Automated Deployment:**

- ✅ **Complete pipeline**: Validate → Lint → Build → Deploy
- ✅ **Rollback**: Manual from Hostinger if needed
- ✅ **Monitoring**: Detailed logs in GitHub Actions
- ✅ **Notifications**: Automatic email on failure

---

## 🔧 **Troubleshooting**

### **Common Issues:**

#### **Pipeline fails in GitHub Actions:**

- Verify GitHub Secrets are configured
- Check logs in GitHub Actions for specific errors
- Ensure `projects.json` is valid

#### **Projects don't load:**

- Run `npm run validate:projects` to verify data
- Check that IDs are unique
- Verify image paths exist

#### **Deployment doesn't update files:**

- Verify FTP credentials in GitHub Secrets
- Check that target directory is correct
- Review workflow logs for connection errors

#### **EmailJS doesn't work:**

- Verify keys are correct in `environment.ts`
- Check that template has correct variables
- Review browser console for errors

#### **Video doesn't play on mobile:**

- Check if device is in battery saver mode
- Verify manual play button works
- Review YouTube Iframe API logs

---

## 📚 **Additional Resources**

### **Official Documentation:**

- [Angular](https://angular.dev/) - Main framework
- [EmailJS](https://www.emailjs.com/docs/) - Email system
- [Google reCAPTCHA](https://developers.google.com/recaptcha) - Anti-spam protection
- [Cloudinary](https://cloudinary.com/documentation) - Image management
- [YouTube Iframe API](https://developers.youtube.com/iframe_api_reference) - Video control
- [GitHub Actions](https://docs.github.com/en/actions) - Automated CI/CD

### **Development Tools:**

- [Angular DevTools](https://angular.dev/tools/devtools) - Development tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Performance CI/CD
- [WebPageTest](https://www.webpagetest.org/) - Performance analysis

---

## 📄 **License**

This project is developed for MA Arquitectura. All rights reserved.

---

## 🤝 **Contributing**

To contribute to the project:

1. Fork the repository
2. Create a branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

**The CI/CD pipeline will run automatically to validate and deploy changes.**

---

**Developed with ❤️ for MA Arquitectura**

_Complete project management system with automated deployment_
