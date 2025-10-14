#!/usr/bin/env node

/**
 * Script interactivo para agregar un nuevo proyecto
 * Facilita la creación de proyectos con validación en tiempo real
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${prompt}${colors.reset}`, resolve);
  });
}

async function main() {
  log("blue", "\n🏗️  Agregar Nuevo Proyecto\n");

  const projectsJsonPath = path.join(
    __dirname,
    "../src/assets/data/projects.json"
  );

  // Leer proyectos existentes
  let projects = [];
  try {
    const fileContent = fs.readFileSync(projectsJsonPath, "utf8");
    projects = JSON.parse(fileContent);
  } catch (error) {
    log("yellow", "⚠️  No se pudo leer projects.json, se creará uno nuevo");
  }

  // Solicitar información del proyecto
  const name = await question("Nombre del proyecto (ej: REFORMA PALERMO): ");
  const nameEn = await question("Nombre en inglés (opcional): ");
  const m2 = await question("M² (ej: 45): ");
  const location = await question("Ubicación (ej: Palermo): ");
  const district = await question("Distrito (CABA/GBA): ");
  const year = await question("Año (ej: 2024): ");
  const showImg = await question(
    "Imagen principal Cloudinary ID (ej: v1747070360/xaks7ffpmupmhqrs0xwc.jpg): "
  );
  const description = await question("Descripción en español: ");
  const descriptionEn = await question("Descripción en inglés (opcional): ");

  log(
    "yellow",
    "\n📸 Agregar imágenes (una por línea, enter vacío para terminar):"
  );
  const images = [];
  while (true) {
    const imgSrc = await question(
      `  Imagen #${images.length + 1} (o enter para continuar): `
    );
    if (!imgSrc.trim()) break;
    images.push({ src: imgSrc.trim() });
  }

  // Generar ID automáticamente
  const id = generateSlug(name);

  // Crear nuevo proyecto
  const newProject = {
    id,
    name,
    ...(nameEn && { nameEn }),
    m2,
    location,
    district,
    year: parseInt(year) || new Date().getFullYear(),
    showImg,
    mainFeature: {
      type: "image",
      link: showImg,
    },
    rowSpan: 2,
    images,
    description,
    ...(descriptionEn && { descriptionEn }),
  };

  // Agregar al array
  projects.push(newProject);

  // Guardar
  fs.writeFileSync(projectsJsonPath, JSON.stringify(projects, null, 2), "utf8");

  log("green", "\n✅ Proyecto agregado exitosamente!");
  log("cyan", `   ID: ${id}`);
  log("cyan", `   Ruta: /${id}`);
  log("cyan", `   Total de proyectos: ${projects.length}\n`);
  log("yellow", "💡 Recuerda hacer commit y push para deployar los cambios\n");

  rl.close();
}

main().catch((error) => {
  console.error("Error:", error);
  rl.close();
  process.exit(1);
});
