#!/usr/bin/env node

/**
 * Script de validación de proyectos
 * Verifica que el JSON de proyectos sea válido y tenga todos los campos requeridos
 * Se ejecuta en el pipeline de CI/CD antes del build
 */

const fs = require("fs");
const path = require("path");

// Colores para consola
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Ruta al JSON de proyectos
const projectsJsonPath = path.join(
  __dirname,
  "../src/assets/data/projects.json"
);

// Verificar que el archivo existe
if (!fs.existsSync(projectsJsonPath)) {
  log("red", "❌ ERROR: projects.json no encontrado");
  log("yellow", `   Ruta esperada: ${projectsJsonPath}`);
  process.exit(1);
}

// Leer y parsear el JSON
let projects;
try {
  const fileContent = fs.readFileSync(projectsJsonPath, "utf8");
  projects = JSON.parse(fileContent);
} catch (error) {
  log("red", "❌ ERROR: No se pudo parsear projects.json");
  log("yellow", `   ${error.message}`);
  process.exit(1);
}

// Verificar que sea un array
if (!Array.isArray(projects)) {
  log("red", "❌ ERROR: projects.json debe contener un array");
  process.exit(1);
}

log("cyan", "\n🔍 Validando proyectos...\n");

// Campos requeridos
const requiredFields = ["id", "name", "showImg", "images"];
const recommendedFields = ["m2", "location", "year", "description"];

let hasErrors = false;
let hasWarnings = false;
const seenIds = new Set();
const seenSlugs = new Set();

// Función para generar slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Validar cada proyecto
projects.forEach((project, index) => {
  const projectNum = index + 1;
  const projectId = project.id || `#${projectNum}`;

  log("blue", `\n📋 Proyecto ${projectNum}/${projects.length}: ${projectId}`);

  // Verificar campos requeridos
  requiredFields.forEach((field) => {
    if (!project[field]) {
      log("red", `   ❌ Campo requerido faltante: ${field}`);
      hasErrors = true;
    }
  });

  // Verificar campos recomendados
  recommendedFields.forEach((field) => {
    if (!project[field]) {
      log("yellow", `   ⚠️  Campo recomendado faltante: ${field}`);
      hasWarnings = true;
    }
  });

  // Verificar ID único
  if (project.id) {
    if (seenIds.has(project.id)) {
      log("red", `   ❌ ID duplicado: ${project.id}`);
      hasErrors = true;
    }
    seenIds.add(project.id);
  }

  // Verificar slug único
  if (project.name) {
    const slug = generateSlug(project.name);
    if (seenSlugs.has(slug)) {
      log(
        "red",
        `   ❌ Slug duplicado: ${slug} (generado de "${project.name}")`
      );
      hasErrors = true;
    }
    seenSlugs.add(slug);
  }

  // Verificar array de imágenes
  if (project.images) {
    if (!Array.isArray(project.images)) {
      log("red", `   ❌ 'images' debe ser un array`);
      hasErrors = true;
    } else if (project.images.length === 0) {
      log("yellow", `   ⚠️  Array de imágenes vacío`);
      hasWarnings = true;
    } else {
      // Verificar cada imagen
      project.images.forEach((img, imgIndex) => {
        if (!img.src) {
          log("red", `   ❌ Imagen #${imgIndex + 1} sin campo 'src'`);
          hasErrors = true;
        }
      });
    }
  }

  // Verificar mainFeature si existe
  if (project.mainFeature) {
    if (!project.mainFeature.type || !project.mainFeature.link) {
      log("yellow", `   ⚠️  mainFeature incompleto (falta type o link)`);
      hasWarnings = true;
    }
  }

  // Info del proyecto
  if (!hasErrors) {
    log("green", `   ✓ Validación exitosa`);
    if (project.name) log("cyan", `     Nombre: ${project.name}`);
    if (project.images) log("cyan", `     Imágenes: ${project.images.length}`);
  }
});

// Resumen final
log("cyan", "\n" + "=".repeat(50) + "\n");
log("cyan", `📊 Resumen de Validación\n`);
log("blue", `   Total de proyectos: ${projects.length}`);
log("blue", `   IDs únicos: ${seenIds.size}`);
log("blue", `   Slugs únicos: ${seenSlugs.size}`);

if (hasErrors) {
  log("red", "\n❌ VALIDACIÓN FALLIDA - Se encontraron errores");
  log("yellow", "   Por favor, corrige los errores antes de deployar\n");
  process.exit(1);
}

if (hasWarnings) {
  log("yellow", "\n⚠️  VALIDACIÓN EXITOSA CON ADVERTENCIAS");
  log("cyan", "   Los proyectos son válidos pero podrían mejorarse\n");
  process.exit(0);
}

log("green", "\n✅ VALIDACIÓN EXITOSA");
log("cyan", "   Todos los proyectos son válidos\n");
process.exit(0);
