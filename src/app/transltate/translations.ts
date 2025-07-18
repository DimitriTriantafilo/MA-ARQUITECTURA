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
    estudioDescription:
      ' En MA creamos proyectos para el habitar que permanezcan en el tiempo. Diseñamos espacios con sentido, resaltando lo esencial en cada uno. Estamos en la búsqueda constante de equilibrio y armonía. Proyectamos a medida y gusto de cada cliente. Construimos espacios de lujo, adaptándonos al presupuesto de cada cliente. En MA, somos mucho más que arquitectura: somos arte, innovación y diseño.',
    agusDescription:
      '“Nos gusta estar en los detalles, para que cada cliente se sienta cómodo y acompañado durante todo el proceso de diseño y construcción”',
    // Agrega aquí todas tus traducciones en español
    manuDescription:
      ' “Creemos que la arquitectura se basa en generar espacios únicos de permanencia, donde el diseño y la innovación son protagonistas.”',
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
