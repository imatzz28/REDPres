export const SECTIONS = [
  {
    id: 'portada',
    number: '01',
    category: 'INICIO',
    title: 'R.E.D. — Ruta de Entrenamiento y Desempeño',
    subtitle: 'Así estamos cambiando la forma en que entrenamos a nuestra gente',
    description: 'Transformación digital de la excelencia operativa y formación del talento en KFC Colombia.',
    theme: 'hero',
    accentColor: '#E4002B',
    bgColor: '#111111',
    textColor: 'light',
    cameraPosition: [0, 0, 5],
    sceneType: 'hero_core',
    badge: 'ENTRENAMIENTO - EXCELENCIA OPERATIVA',
  },
  {
    id: 'contexto',
    number: '02',
    category: 'CONTEXTO',
    title: 'ASÍ TRABAJÁBAMOS ANTES',
    subtitle: 'El desafío de los procesos manuales',
    description: 'Antes de R.E.D., la gestión de entrenamiento y certificación de nuestro personal dependía completamente de procesos manuales: Excel, planillas físicas y registros dispersos por cada restaurante.',
    bullets: [
      { text: 'Falta de trazabilidad histórica de certificaciones', icon: 'AlertTriangle' },
      { text: 'Alto consumo de tiempo en consolidación manual', icon: 'Clock' },
      { text: 'Riesgo de errores en captura y pérdida de datos', icon: 'FileX' },
      { text: 'Imposible de escalar con agilidad a miles de colaboradores', icon: 'TrendingDown' }
    ],
    highlightStat: {
      value: '+2000',
      label: 'Archivos de Excel',
      sublabel: 'Al finalizar el año'
    },
    theme: 'chaos',
    accentColor: '#E4002B',
    bgColor: '#161616',
    textColor: 'light',
    cameraPosition: [0, 1.2, 5.5],
    sceneType: 'scattered_papers',
    badge: 'ANTES DE R.E.D.'
  },
  {
    id: 'problema',
    number: '03',
    category: 'EL DESAFÍO',
    title: 'EL PROBLEMA DE FONDO',
    subtitle: 'Información fragmentada y sin visibilidad',
    description: 'Las notas y evidencias de las visitas de entrenamiento quedaban dispersas por toda la red de tiendas, sin un sistema que las centralizara ni permitiera consultarlas o auditarlas fácilmente.',
    points: [
      { title: 'Evidencias Perdidas', desc: 'Notas en libretas y fotos en chats personales sin almacenamiento corporativo.' },
      { title: 'Auditorías Complejas', desc: 'Semanas para corroborar el estado real de un carnet o certificación.' },
      { title: 'Falta de Estándar', desc: 'Criterios dispares de evaluación según la región o especialista.' }
    ],
    theme: 'dark_red',
    accentColor: '#E4002B',
    bgColor: '#1A080A',
    textColor: 'light',
    cameraPosition: [1.8, -0.5, 6],
    sceneType: 'disconnected_network',
    badge: 'PUNTO CRÍTICO'
  },
  {
    id: 'nacimiento',
    number: '04',
    category: 'VISIÓN',
    title: 'DESDE LA GERENCIA DE ENTRENAMIENTO',
    subtitle: 'Una decisión estratégica de liderazgo',
    description: 'La necesidad de un cambio surgió directamente desde la gerencia: había que dejar atrás el control manual y construir una herramienta capaz de centralizar y sostener el proceso de entrenamiento a la escala que exige nuestra operación.',
    quote: '"Más que llenarnos de tableros en Power BI, necesitamos una herramienta que nos sirva como centro de control para todos los procesos de entrenamiento."',
    author: 'Gerencia',
    theme: 'transition',
    accentColor: '#E4002B',
    bgColor: '#141414',
    textColor: 'light',
    cameraPosition: [0, 0, 4.8],
    sceneType: 'converging_nodes',
    badge: 'IMPULSO GERENCIAL'
  },
  {
    id: 'por-que-red',
    number: '05',
    category: 'PROPÓSITO',
    title: '¿POR QUÉ R.E.D.?',
    subtitle: 'Más que un software, un ecosistema de confianza',
    description: 'No se trataba de actualizar unos archivos en Excel, se trataba de repensar cómo debía verse un sistema de gestión de todos los procesos de entrenamiento: trazable, centralizado y confiable.',
    pillars: [
      { name: 'Trazabilidad Total', desc: 'Cada certificación, movimiento y fecha queda inmutablemente registrado.' },
      { name: 'Centralización Única', desc: 'Una única fuente de la verdad para toda la operación nacional.' },
      { name: 'Confiabilidad y Rapidez', desc: 'Disponibilidad 24/7 en tienda o corporativo en tiempo real.' }
    ],
    theme: 'kfc_red',
    accentColor: '#ffffff',
    bgColor: '#E4002B',
    textColor: 'on_red',
    cameraPosition: [-1.5, 0.5, 5],
    sceneType: 'unified_monolith',
    badge: 'LOS TRES PILARES'
  },
  {
    id: 'desarrollo',
    number: '06',
    category: 'CONSTRUCCIÓN',
    title: 'EL DESARROLLO — CONSTRUYENDO R.E.D.',
    subtitle: 'De la necesidad en campo al código',
    description: 'Con la idea clara, pasamos de la planificación a la construcción real del sistema: definir requisitos, especificar cada funcionalidad y validar que respondiera a las necesidades reales del área de Entrenamiento.',
    milestones: [
      { step: '01', title: 'Pensado para el día a día del especialista', detail: 'Diseñado desde la experiencia real de los especialistas, que certifican al personal en cada restaurante todos los días.' },
      { step: '02', title: 'Fácil de usar, rápido de consultar', detail: 'Acceso simple para los especialistas, con reportes inmediatos que agilizan su trabajo en tienda.' },
      { step: '03', title: 'Construido para cada necesidad del Departamento', detail: 'Hecho a la medida de la operación, cubriendo todas las necesidades del Departamento de Entrenamiento.' },
      { step: '04', title: 'El eje central de la operación', detail: 'Certificaciones, reportes, Bancas y mucho más: todo en un solo lugar.' }
    ],
    theme: 'blueprint',
    accentColor: '#E4002B',
    bgColor: '#16191F',
    textColor: 'light',
    cameraPosition: [0, 0, 5.2],
    sceneType: 'blueprint_grid',
    badge: 'METODOLOGÍA ÁGIL'
  },
  {
    id: 'base-solida',
    number: '07',
    category: 'DESARROLLO IN-HOUSE',
    title: 'UNA HERRAMIENTA HECHA POR QUIENES LA VIVEN',
    subtitle: 'Nacida de la realidad operativa de KFC',
    description: 'R.E.D. no fue construido por un proveedor externo, sino por el mismo equipo que conoce a detalle cada proceso del Departamento de Entrenamiento. Eso significa una herramienta pensada desde la realidad operativa, sin depender de terceros.',
    complianceItems: [
      { title: 'Nacido en el Departamento', desc: 'Diseñado y desarrollado internamente, por quienes viven la operación día a día.' },
      { title: 'Sabíamos qué necesitábamos', desc: 'Conocíamos el problema de primera mano, así que lo construimos a la medida exacta.' },
      { title: 'Sin dependencia de terceros', desc: 'Cambios, ajustes y soporte inmediatos, sin depender de proveedores externos ni sobrecostos.' }
    ],
    theme: 'security',
    accentColor: '#E4002B',
    bgColor: '#121215',
    textColor: 'light',
    cameraPosition: [0, -0.3, 4.6],
    sceneType: 'security_shield',
    badge: 'DESARROLLO INTERNO'
  },
  {
    id: 'producto-final',
    number: '08',
    category: 'LANZAMIENTO',
    title: 'R.E.D. — EL PRODUCTO FINAL',
    subtitle: 'El centro de comando del entrenamiento KFC',
    description: 'Hoy R.E.D. es el centro de control y gestión de los principales procesos del Departamento de Entrenamiento, todo en una sola plataforma.',
    featuresOverview: [
      { label: 'Gestión de Talento', value: '100% Digital' },
      { label: 'Tiempo de Certificación', value: '-65%' },
      { label: 'Certificaciones', value: '+100.000' },
      { label: 'Disponibilidad', value: 'Tiempo Real' }
    ],
    theme: 'product_hero',
    accentColor: '#E4002B',
    bgColor: '#111111',
    textColor: 'light',
    cameraPosition: [0, 0.2, 4.2],
    sceneType: 'product_showcase_3d',
    badge: 'ECOSISTEMA ACTIVO'
  },
  {
    id: 'certificacion',
    number: '09',
    category: 'MÓDULO 01',
    title: 'CERTIFICACIÓN Y GESTIÓN DE TALENTO',
    subtitle: 'El progreso de cada colaborador, paso a paso',
    description: 'Seguimiento milimétrico a la curva de aprendizaje de cada miembro de equipo, garantizando la calidad del entrenamiento en las tiendas.',
    items: [
      {
        title: 'Certificación de Curvas de Entrenamiento',
        desc: 'Seguimiento detallado de todas las certificaciones, desde inducción y planes de capacitación hasta Star y All-Star.',
        tag: 'Curvas 100% Auditables'
      },
      {
        title: 'Gestión de Bancas',
        desc: 'Gestión absoluta de bancas de restaurantes con reportes en tiempo real de cumplimiento y certificaciones.',
        tag: 'Plan de Carrera'
      },
      {
        title: 'Control de Carnets de Manipulación de Alimentos',
        desc: 'Creación y gestión de Carnets de Manipulación de alimentos. Reportes inteligentes de vencimientos y vigencia.',
        tag: 'Cero Riesgo Sanitario'
      }
    ],
    theme: 'module_talent',
    accentColor: '#E4002B',
    bgColor: '#171213',
    textColor: 'light',
    cameraPosition: [-1.2, 0.1, 4.4],
    sceneType: 'device_module_1',
    badge: 'MÓDULO DE TALENTO',
    mockupType: 'talent_curve'
  },
  {
    id: 'planificacion',
    number: '10',
    category: 'MÓDULO 02',
    title: 'PLANIFICACIÓN Y GENTE',
    subtitle: 'Optimización de recursos y cobertura regional',
    description: 'Coordinación eficiente de la agenda de especialistas de entrenamiento y control estratégico de la fuerza operativa en tienda.',
    items: [
      {
        title: 'Planificación de Horarios de Especialistas',
        desc: 'Planificación estratégica de especialistas con base en reportes de cobertura y necesidades operativas.',
        tag: 'Cobertura Maximizada'
      },
      {
        title: 'Reportes de Ingresos y Retiros',
        desc: 'Reportes inmediatos de activos y retirados con gráficas temporales y filtros detallados.',
        tag: 'Onboarding Ágil'
      }
    ],
    theme: 'module_ops',
    accentColor: '#E4002B',
    bgColor: '#141416',
    textColor: 'light',
    cameraPosition: [1.2, -0.1, 4.4],
    sceneType: 'device_module_2',
    badge: 'MÓDULO OPERATIVO',
    mockupType: 'schedule_ops'
  },
  {
    id: 'inteligencia',
    number: '11',
    category: 'MÓDULO 03',
    title: 'INTELIGENCIA Y TOMA DE DECISIONES',
    subtitle: 'Datos precisos para decisiones estratégicas',
    description: 'Tableros interactivos con KPIs en tiempo real para Jefes de Entrenamiento, líderes y coordinadores.',
    items: [
      {
        title: 'Reportes en Tiempo Real sobre el Estado del Entrenamiento',
        desc: 'Dashboards con porcentaje de avance por región, tienda y rol con exportación automática.'
      },
      {
        title: 'R.E.D. Pulse',
        desc: 'Módulo dinámico para la creación de encuestas y evaluaciones con Dashboard integrados para seguimientos inteligentes.'
      }
    ],
    theme: 'module_bi',
    accentColor: '#E4002B',
    bgColor: '#11171E',
    textColor: 'light',
    cameraPosition: [0, 0.4, 4.0],
    sceneType: 'device_module_3',
    badge: 'ANALÍTICA & BI',
    mockupType: 'bi_charts'
  },
  {
    id: 'impacto',
    number: '12',
    category: 'RESULTADOS',
    title: 'EL IMPACTO EN NÚMEROS',
    subtitle: 'El futuro del entrenamiento KFC ya está aquí',
    description: 'R.E.D. consolida un estándar de excelencia nunca antes visto en la industria de comida rápida en Colombia.',
    metrics: [
      { value: '+170', label: 'Restaurantes Conectados', highlight: '7 Regiones Nacionales' },
      { value: '+4,500', label: 'Colaboradores Gestionados', highlight: 'Curvas Activas' },
      { value: '65%', label: 'Reducción de Tiempo', highlight: 'En Procesos Administrativos' },
      { value: '100%', label: 'Trazabilidad Digital', highlight: 'Cero Papel en Auditorías' }
    ],
    closingMessage: 'R.E.D. — Ruta de Entrenamiento y Desempeño',
    closingSub: 'Construyendo el futuro del Departamento de Entrenamiento de KFC.',
    theme: 'grand_finale',
    accentColor: '#E4002B',
    bgColor: '#111111',
    textColor: 'light',
    cameraPosition: [0, 0, 4.8],
    sceneType: 'celebration_impact',
    badge: 'KFC COLOMBIA'
  }
];

export const REGIONS_COLOMBIA = [
  'Bogotá D.C. & Sabana',
  'Antioquia & Medellín',
  'Valle del Cauca & Cali',
  'Costa Caribe & Barranquilla',
  'Santanderes & Bucaramanga',
  'Eje Cafetero & Pereira',
  'Región Tolima & Huila'
];
