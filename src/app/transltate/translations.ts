export const TRANSLATIONS: Record<string, Record<string, string>> = {
  es: {
    welcome: 'Bienvenido',
    greeting: 'Hola, {{name}}!',
    'buttons.save': 'Guardar',
    'buttons.cancel': 'Cancelar',
    aboutUs: 'ESTUDIO',
    proyects: 'PROYECTOS',
    title: 'MA - ARQUITECTURA',
    close: 'CERRAR',
    manuDescription:
      'El Caniche, co-fundador de MA, obtuvo su título FADU. Con su espíritu aventurero, ha sido un gran representante del AMLS. Enfocado en los travestis y el sexo tántrico, aporta una dimensión corporativa fundamental al estudio, esencial para el crecimiento de la empresa.',
    // Agrega aquí todas tus traducciones en español
  },
  en: {
    welcome: 'Welcome',
    greeting: 'Hello, {{name}}!',
    'buttons.save': 'Save',
    'buttons.cancel': 'Cancel',
    aboutUs: 'STUDIO',
    proyects: 'PROJECTS',
    title: 'MA - ARQUITECTURE',
    close: 'CLOSE',
    manuDescription:
      "El Caniche, co-founder of MA, earned his FADU degree. With his adventurous spirit, he has been a great representative of AMLS. Focusing on transgenders and tantric sex, he brings a fundamental corporate dimension to the studio, essential for the company's growth.",
    // Agrega aquí todas tus traducciones en inglés
  },
};

export type AvailableLanguages = 'es' | 'en';
