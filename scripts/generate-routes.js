#!/usr/bin/env node

/**
 * Script para generar el archivo de rutas dinámicas desde projects.json
 * Se ejecuta antes del build para crear las rutas de prerenderizado
 */

const fs = require("fs");
const path = require("path");

// Rutas de archivos
const PROJECTS_JSON_PATH = path.join(
  __dirname,
  "../src/assets/data/projects.json"
);
const ROUTES_OUTPUT_PATH = path.join(
  __dirname,
  "../src/app/generated-routes.ts"
);

console.log("\n🔄 Generando rutas dinámicas desde projects.json...\n");

try {
  // Leer el archivo de proyectos
  const projectsData = fs.readFileSync(PROJECTS_JSON_PATH, "utf-8");
  const projects = JSON.parse(projectsData);

  console.log(`✅ Cargados ${projects.length} proyectos desde JSON`);

  // Generar el contenido del archivo de rutas
  const routesFileContent = `/**
 * ARCHIVO GENERADO AUTOMÁTICAMENTE
 * No editar manualmente - modificar src/assets/data/projects.json
 * Generado por: scripts/generate-routes.js
 */

import { Project } from './app.component';

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;

  // Escribir el archivo
  fs.writeFileSync(ROUTES_OUTPUT_PATH, routesFileContent, "utf-8");

  console.log(
    `✅ Archivo de rutas generado: ${path.relative(
      process.cwd(),
      ROUTES_OUTPUT_PATH
    )}`
  );
  console.log(`📊 Total de proyectos: ${projects.length}\n`);

  process.exit(0);
} catch (error) {
  console.error("❌ Error generando rutas:", error.message);
  process.exit(1);
}
