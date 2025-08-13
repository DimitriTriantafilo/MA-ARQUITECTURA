export const TRANSLATIONS: Record<string, Record<string, string>> = {
  es: {
    welcome: 'Bienvenido',
    greeting: 'Hola, {{name}}!',
    'buttons.save': 'Guardar',
    'buttons.cancel': 'Cancelar',
    studio: 'ESTUDIO',
    proyects: 'PROYECTOS',
    title: 'MA - ARQUITECTURA',
    close: 'CERRAR',
    estudioDescription:
      'EN MA <strong>CREAMOS</strong> PROYECTOS PARA EL HABITAR QUE PERMANEZCAN EN EL TIEMPO <strong>DISEÑAMOS</strong> ESPACIOS CON SENTIDO, RESALTANDO LO ESENCIAL EN CADA UNO.<br> ESTAMOS EN LA BÚSQUEDA CONSTANTE DE <strong>EQUILIBRIO</strong> Y <strong>ARMONÍA</strong> PROYECTAMOS A MEDIDA Y GUSTO DE CADA CLIENTE.<br> <strong> CONSTRUIMOS </strong> ESPACIOS DE <strong>LUJO</strong> ADAPTÁNDONOS AL PRESUPUESTO DE CADA CLIENTE.<br> EN MA, SOMOS MUCHO MÁS QUE ARQUITECTURA: SOMOS <strong>ARTE</strong>, <strong>INNOVACIÓN</strong> Y <strong>DISEÑO</strong>.',
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
    studio: 'STUDIO',
    proyects: 'PROJECTS',
    title: 'MA - ARQUITECTURE',
    close: 'CLOSE',
    estudioDescription:
      'At MA, we create projects for lasting living. We design spaces with meaning, highlighting the essential elements in each space. We constantly seek balance and harmony. We design according to the needs and tastes of each client. We build luxurious spaces, adapting to each client´s budget. At MA, we are much more than architecture: we are art, innovation, and design.',
    manuDescription:
      'We believe that architecture is based on generating unique spaces of permanence, where design and innovation are protagonists.',
    agusDescription:
      '“We like to pay attention to the details, so that each client feels comfortable and supported throughout the design and construction process.”',
    // Agrega aquí todas tus traducciones en inglés
  },
};

export type AvailableLanguages = 'es' | 'en';
