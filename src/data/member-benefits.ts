export type MemberBenefit = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  memberValue: string;
  highlights: string[];
  includes: string[];
  audience: string[];
  activation: string[];
  sourceUrl?: string;
  cta: {
    label: string;
    href: string;
    kind: "info" | "booking" | "external" | "group" | "contact";
  };
};

export const memberBenefits: MemberBenefit[] = [
  {
    slug: "personal-shopper-inmobiliario",
    title: "Personal Shopper Inmobiliario",
    shortTitle: "PSI",
    category: "Inversión inmobiliaria",
    summary:
      "Acceso a oportunidades inmobiliarias filtradas con criterio profesional para socios que quieren invertir con más información y acompañamiento.",
    memberValue:
      "Como socio puedes recibir prioridad en oportunidades internas y entrar en dinámicas privadas donde se comparten activos, análisis y opciones de inversión.",
    highlights: ["Oportunidades filtradas", "Acceso preferente", "Acompañamiento experto"],
    includes: [
      "Búsqueda y selección de activos con potencial de rentabilidad.",
      "Primer análisis de encaje según perfil, presupuesto y objetivo de inversión.",
      "Orientación sobre estrategia: compra, reforma, alquiler, venta o explotación por habitaciones.",
      "Derivación al equipo adecuado dentro del ecosistema Grupo Alfa.",
    ],
    audience: [
      "Socios que quieren invertir en inmobiliario sin buscar solos desde cero.",
      "Personas que necesitan criterio antes de entrar en una operación.",
      "Inversores que quieren acceder a oportunidades internas del Club Alfa.",
    ],
    activation: [
      "Solicita acceso desde esta ventaja.",
      "El equipo revisa tu perfil inversor y tus objetivos.",
      "Te derivamos al canal adecuado para recibir oportunidades y próximos pasos.",
    ],
    cta: {
      label: "Solicitar acceso a oportunidades",
      href: "/contacto",
      kind: "group",
    },
  },
  {
    slug: "subastos",
    title: "Subastos",
    shortTitle: "Subastos",
    category: "Subastas judiciales",
    summary:
      "Estrategia profesional para invertir en subastas judiciales con análisis jurídico, cargas, valor de mercado, ocupación y plan de puja.",
    memberValue:
      "El socio accede a una vía especializada para estudiar operaciones antes de pujar, reduciendo errores habituales del mercado de subastas.",
    highlights: ["Análisis jurídico", "Estrategia de puja", "Gestión de adjudicación"],
    includes: [
      "Estudio de expediente judicial, nota simple, cargas registrales y ocupación.",
      "Valoración real del inmueble y recomendación clara de viabilidad.",
      "Estrategia de puja y acompañamiento técnico durante el proceso.",
      "Planes de servicio adaptados al nivel de implicación del inversor.",
    ],
    audience: [
      "Inversores con una subasta concreta localizada.",
      "Socios que buscan oportunidades en subastas judiciales con respaldo profesional.",
      "Personas que necesitan entender riesgos antes de comprometer capital.",
    ],
    activation: [
      "Envía la operación o el enlace de la subasta.",
      "El equipo realiza una primera lectura de viabilidad.",
      "Si encaja, se define el plan de análisis y acompañamiento adecuado.",
    ],
    sourceUrl: "https://subastos.grupoalfa.net/",
    cta: {
      label: "Solicitar estudio de subasta",
      href: "https://subastos.grupoalfa.net/",
      kind: "external",
    },
  },
  {
    slug: "espacio-diseno",
    title: "Espacio Diseño",
    shortTitle: "E&D",
    category: "Interiorismo",
    summary:
      "Diseño, interiorismo y puesta en valor para transformar inmuebles en espacios atractivos, funcionales y mejor preparados para venta o alquiler.",
    memberValue:
      "El socio puede activar una valoración enfocada en mejorar percepción, distribución, imagen y rentabilidad potencial del inmueble.",
    highlights: ["Interiorismo", "Home staging", "Puesta en valor"],
    includes: [
      "Revisión del estado actual del inmueble y sus puntos de mejora.",
      "Propuesta de estilo, distribución y prioridades de intervención.",
      "Orientación para preparar el activo para alquiler, venta o explotación turística.",
      "Coordinación con servicios de reforma cuando el proyecto lo requiere.",
    ],
    audience: [
      "Propietarios que quieren mejorar la presentación de su inmueble.",
      "Inversores que buscan elevar valor percibido antes de comercializar.",
      "Socios con viviendas destinadas a alquiler, venta o rent to rent.",
    ],
    activation: [
      "Solicita una valoración inicial.",
      "Comparte fotos, ubicación y objetivo del inmueble.",
      "Recibe una propuesta de enfoque y siguientes pasos.",
    ],
    cta: {
      label: "Solicitar valoración de diseño",
      href: "/contacto",
      kind: "contact",
    },
  },
  {
    slug: "broker-hipotecario",
    title: "Broker Hipotecario",
    shortTitle: "Broker H.",
    category: "Financiación",
    summary:
      "Comparación y negociación hipotecaria para conseguir condiciones competitivas sin visitar bancos uno a uno.",
    memberValue:
      "El socio puede canalizar su estudio hipotecario con Broker Alfa, con análisis de perfil, viabilidad y acompañamiento hasta firma.",
    highlights: ["Estudio gratuito", "Negociación bancaria", "Acompañamiento hasta notaría"],
    includes: [
      "Análisis de ingresos, ahorros, situación laboral y capacidad real de financiación.",
      "Preparación del expediente y estrategia para presentarlo a entidades bancarias.",
      "Comparación de ofertas y explicación clara de condiciones.",
      "Acompañamiento durante el proceso hasta la firma de la hipoteca.",
    ],
    audience: [
      "Compradores de primera vivienda o segunda vivienda.",
      "Inversores que necesitan financiación para operaciones inmobiliarias.",
      "Autónomos, funcionarios o perfiles que quieren optimizar su viabilidad bancaria.",
    ],
    activation: [
      "Solicita el estudio hipotecario.",
      "Completa los datos básicos de operación y perfil financiero.",
      "Un experto revisa el caso y plantea las mejores opciones disponibles.",
    ],
    sourceUrl: "https://www.brokeralfa.com/",
    cta: {
      label: "Solicitar estudio hipotecario",
      href: "https://www.brokeralfa.com/contacto",
      kind: "external",
    },
  },
  {
    slug: "broker-bitcoin",
    title: "Broker Bitcoin",
    shortTitle: "Broker Bitcoin",
    category: "Formación financiera",
    summary:
      "Formación y orientación para entender Bitcoin antes de tomar decisiones, separando conocimiento real de ruido, hype y promesas fáciles.",
    memberValue:
      "El socio accede a una aproximación formativa para comprender Bitcoin como tecnología monetaria y reserva de valor a largo plazo.",
    highlights: ["Bitcoin 101", "Reserva de valor", "Sin promesas de rentabilidad"],
    includes: [
      "Introducción clara a qué es Bitcoin y por qué existe.",
      "Explicación del dinero como tecnología y pérdida de poder adquisitivo.",
      "Diferencia entre invertir, especular y ahorrar.",
      "Espacio de preguntas para resolver dudas básicas y avanzar con criterio.",
    ],
    audience: [
      "Personas que han oído hablar de Bitcoin y quieren entenderlo antes de actuar.",
      "Socios que no quieren improvisar con información dispersa de internet.",
      "Inversores que valoran claridad, prudencia y formación seria.",
    ],
    activation: [
      "Accede a la formación indicada.",
      "Reserva plaza o solicita información del próximo seminario.",
      "Prepara tus dudas para una sesión orientada a entender antes de decidir.",
    ],
    sourceUrl: "https://bitcoinbridgeacademy.com/seminario/",
    cta: {
      label: "Reservar formación Bitcoin",
      href: "https://bitcoinbridgeacademy.com/seminario/",
      kind: "external",
    },
  },
  {
    slug: "broker-asesor-financiero",
    title: "Broker Asesor Financiero",
    shortTitle: "Broker A.F.",
    category: "Planificación financiera",
    summary:
      "Orientación para ordenar objetivos, capacidad de inversión, financiación y estrategia patrimonial dentro del ecosistema Club Alfa.",
    memberValue:
      "El socio puede solicitar una revisión inicial para enfocar decisiones financieras con más estructura y menos improvisación.",
    highlights: ["Diagnóstico inicial", "Estrategia patrimonial", "Criterio financiero"],
    includes: [
      "Revisión de objetivos financieros y horizonte temporal.",
      "Análisis de capacidad de ahorro, inversión y endeudamiento saludable.",
      "Orientación sobre opciones dentro del ecosistema Alfa.",
      "Derivación a especialistas cuando el caso requiere asesoramiento específico.",
    ],
    audience: [
      "Socios que quieren ordenar su estrategia antes de invertir.",
      "Personas con liquidez que buscan criterio y planificación.",
      "Inversores que necesitan conectar financiación, riesgo y objetivos.",
    ],
    activation: [
      "Solicita un diagnóstico inicial.",
      "Comparte objetivos, situación y prioridades.",
      "Recibe orientación para definir el siguiente paso con criterio.",
    ],
    cta: {
      label: "Solicitar diagnóstico financiero",
      href: "/contacto",
      kind: "contact",
    },
  },
  {
    slug: "superseguros-alfa",
    title: "Superseguros Alfa",
    shortTitle: "S. Seguros Alfa",
    category: "Seguros",
    summary:
      "Comparativa y orientación en seguros para proteger inmuebles, propietarios, inquilinos y operaciones de inversión.",
    memberValue:
      "El socio puede revisar coberturas clave con un enfoque práctico: protección real, claridad y soluciones adaptadas al inmueble.",
    highlights: ["Seguros de hogar", "Impago de alquiler", "Coberturas claras"],
    includes: [
      "Revisión de necesidades aseguradoras según tipo de inmueble y uso.",
      "Orientación en seguros de hogar, propietario, inquilino e impago.",
      "Comparación de coberturas para evitar duplicidades o huecos de protección.",
      "Acompañamiento para solicitar propuesta adaptada.",
    ],
    audience: [
      "Propietarios que alquilan viviendas completas o por habitaciones.",
      "Inversores con varios inmuebles o activos en explotación.",
      "Socios que quieren revisar si su seguro actual cubre lo que necesitan.",
    ],
    activation: [
      "Solicita una revisión de seguros.",
      "Indica tipo de inmueble, uso y pólizas actuales si las tienes.",
      "Recibe orientación para comparar opciones y contratar con más claridad.",
    ],
    cta: {
      label: "Solicitar comparativa de seguros",
      href: "/contacto",
      kind: "contact",
    },
  },
  {
    slug: "alfa-24k",
    title: "Alfa 24K",
    shortTitle: "Alfa 24K",
    category: "Metales preciosos",
    summary:
      "Información y acceso a oro y plata de inversión como alternativa patrimonial para diversificar con activos tangibles.",
    memberValue:
      "El socio puede solicitar orientación sobre metales de inversión, formatos disponibles y criterios básicos antes de comprar.",
    highlights: ["Oro de inversión", "Plata de inversión", "Activo tangible"],
    includes: [
      "Explicación de los formatos habituales de oro y plata de inversión.",
      "Orientación sobre custodia, liquidez y horizonte patrimonial.",
      "Información sobre criterios de compra y trazabilidad.",
      "Derivación para solicitar disponibilidad y condiciones.",
    ],
    audience: [
      "Socios interesados en diversificación patrimonial.",
      "Personas que buscan entender metales antes de comprar.",
      "Inversores que quieren combinar inmobiliario con activos tangibles.",
    ],
    activation: [
      "Solicita información de metales.",
      "Indica objetivo, importe orientativo y horizonte.",
      "Recibe orientación sobre opciones y proceso de adquisición.",
    ],
    cta: {
      label: "Solicitar información de metales",
      href: "/contacto",
      kind: "contact",
    },
  },
  {
    slug: "flip-art",
    title: "Flip Art",
    shortTitle: "Flip Art",
    category: "Reformas e inversión",
    summary:
      "Transformación estética y funcional de inmuebles para elevar su valor de mercado mediante diseño, reforma y ejecución cuidada.",
    memberValue:
      "El socio puede valorar si un inmueble tiene recorrido de mejora para venta, alquiler o reposicionamiento en el mercado.",
    highlights: ["Reforma integral", "Diseño funcional", "Revalorización"],
    includes: [
      "Análisis inicial del potencial de transformación del inmueble.",
      "Propuesta de intervención priorizada según objetivo de rentabilidad.",
      "Coordinación de diseño, calidades y ejecución.",
      "Enfoque práctico para preparar el activo para vender o explotar mejor.",
    ],
    audience: [
      "Propietarios con inmuebles antiguos o deteriorados.",
      "Inversores que buscan operaciones de compra, reforma y venta.",
      "Socios que necesitan convertir un activo difícil en producto atractivo.",
    ],
    activation: [
      "Solicita una valoración de reforma.",
      "Comparte fotos, ubicación, metros y objetivo de salida.",
      "Recibe un enfoque inicial para decidir si merece avanzar.",
    ],
    cta: {
      label: "Solicitar valoración de reforma",
      href: "/contacto",
      kind: "contact",
    },
  },
  {
    slug: "lujo-rent",
    title: "Lujo Rent",
    shortTitle: "Lujo Rent",
    category: "Gestión de alquiler",
    summary:
      "Gestión de alquiler, habitaciones y rent to rent premium para convertir inmuebles en activos explotados con criterio operativo.",
    memberValue:
      "El socio puede solicitar un análisis de explotación para conocer qué modelo de alquiler encaja mejor con su activo.",
    highlights: ["Rent to rent", "Habitaciones premium", "Gestión integral"],
    includes: [
      "Análisis de demanda y modelo de explotación más adecuado.",
      "Optimización de distribución, equipamiento y presentación del inmueble.",
      "Gestión operativa de captación, contratos, mantenimiento y atención.",
      "Seguimiento para mejorar ocupación, ingresos y experiencia del inquilino.",
    ],
    audience: [
      "Propietarios que quieren rentabilizar mejor su inmueble.",
      "Socios interesados en alquiler por habitaciones o rent to rent.",
      "Inversores que buscan gestión pasiva y profesionalizada.",
    ],
    activation: [
      "Solicita análisis de rentabilidad.",
      "Comparte ubicación, estado, distribución y alquiler actual si existe.",
      "Recibe una propuesta de modelo de explotación y siguientes pasos.",
    ],
    cta: {
      label: "Solicitar análisis de rentabilidad",
      href: "/contacto",
      kind: "contact",
    },
  },
  {
    slug: "factura-movil-fibra-energia",
    title: "Factura Móvil, Fibra y Energía",
    shortTitle: "Factura M/E",
    category: "Ahorro operativo",
    summary:
      "Revisión de facturas recurrentes de móvil, fibra y energía para detectar oportunidades de ahorro y simplificación.",
    memberValue:
      "El socio puede revisar costes mensuales habituales y optimizar suministros personales, familiares o vinculados a inmuebles.",
    highlights: ["Móvil y fibra", "Energía", "Optimización de costes"],
    includes: [
      "Revisión de consumo, tarifas y servicios contratados.",
      "Identificación de posibles sobrecostes o servicios duplicados.",
      "Orientación para ajustar facturas a necesidades reales.",
      "Derivación para recibir una propuesta de mejora cuando haya encaje.",
    ],
    audience: [
      "Socios que quieren reducir gastos mensuales recurrentes.",
      "Propietarios con varios suministros asociados a inmuebles.",
      "Familias o empresas que quieren simplificar contratos y tarifas.",
    ],
    activation: [
      "Solicita revisión de facturas.",
      "Comparte tus últimas facturas o datos de contrato.",
      "Recibe una propuesta para optimizar costes y servicios.",
    ],
    cta: {
      label: "Solicitar revisión de facturas",
      href: "/contacto",
      kind: "contact",
    },
  },
  {
    slug: "alarmas",
    title: "Alarmas",
    shortTitle: "Alarmas",
    category: "Seguridad",
    summary:
      "Soluciones de alarma y seguridad para viviendas, inmuebles en alquiler, activos vacíos o propiedades en proceso de explotación.",
    memberValue:
      "El socio puede solicitar un presupuesto orientado a proteger el inmueble con dispositivos y servicios adaptados a su uso real.",
    highlights: ["Protección del inmueble", "Dispositivos de seguridad", "Presupuesto personalizado"],
    includes: [
      "Revisión del tipo de inmueble, uso y nivel de riesgo.",
      "Orientación sobre sensores, cámaras, control de accesos y aviso conectado.",
      "Propuesta de configuración según vivienda habitual, alquiler o activo vacío.",
      "Acompañamiento para comparar instalación, cuota y cobertura del servicio.",
    ],
    audience: [
      "Propietarios que quieren proteger viviendas o activos en alquiler.",
      "Socios con inmuebles vacíos, en reforma o en fase de venta.",
      "Inversores que buscan reducir riesgos operativos en sus propiedades.",
    ],
    activation: [
      "Solicita presupuesto de alarma.",
      "Indica ubicación, tipo de inmueble y uso previsto.",
      "Recibe orientación sobre configuración y servicio recomendado.",
    ],
    cta: {
      label: "Solicitar presupuesto de alarma",
      href: "/contacto",
      kind: "contact",
    },
  },
];

export default memberBenefits;
