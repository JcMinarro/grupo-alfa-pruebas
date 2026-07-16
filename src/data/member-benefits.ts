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
      "Servicio especializado para invertir en subastas judiciales con análisis profesional, estrategia de puja y acceso preferente para socios.",
    memberValue:
      "15% de descuento y acceso preferente a pujas en grupo.",
    highlights: ["15% de descuento", "Pujas en grupo", "Acceso preferente"],
    includes: [
      "Estudio de expediente judicial, nota simple, cargas registrales y ocupación.",
      "Valoración real del inmueble y recomendación clara de viabilidad.",
      "Estrategia de puja y acompañamiento técnico durante el proceso.",
      "Acceso preferente a pujas en grupo para socios del Club Alfa.",
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
    title: "Spazio Alfa",
    shortTitle: "Spazio Alfa",
    category: "Interiorismo",
    summary:
      "Diseño, interiorismo y puesta en valor para transformar inmuebles en espacios atractivos, funcionales y mejor preparados para venta o alquiler.",
    memberValue:
      "15% de descuento en tu proyecto de interiorismo, o hasta un 33% si contratas a nuestro equipo de expertos reformistas.",
    highlights: ["15% interiorismo", "Hasta 33% con reforma", "Puesta en valor"],
    includes: [
      "Revisión del estado actual del inmueble y sus puntos de mejora.",
      "Propuesta de estilo, distribución y prioridades de intervención.",
      "Orientación para preparar el activo para alquiler, venta o explotación turística.",
      "Descuento ampliado de hasta el 33% cuando el proyecto se contrata con nuestro equipo de expertos reformistas.",
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
    title: "Broker Alfa",
    shortTitle: "Broker Alfa",
    category: "Financiación",
    summary:
      "Comparación y negociación hipotecaria para conseguir condiciones competitivas sin visitar bancos uno a uno.",
    memberValue:
      "15% de descuento en nuestro servicio de bróker hipotecario.",
    highlights: ["15% de descuento", "Negociación bancaria", "Acompañamiento hasta notaría"],
    includes: [
      "Análisis de ingresos, ahorros, situación laboral y capacidad real de financiación.",
      "Preparación del expediente y estrategia para presentarlo a entidades bancarias.",
      "Comparación de ofertas y explicación clara de condiciones.",
      "Descuento del 15% en el servicio de bróker hipotecario para socios del Club Alfa.",
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
      "15% de descuento en nuestro servicio y formaciones.",
    highlights: ["15% de descuento", "Formaciones Bitcoin", "Servicio especializado"],
    includes: [
      "Introducción clara a qué es Bitcoin y por qué existe.",
      "Explicación del dinero como tecnología y pérdida de poder adquisitivo.",
      "Diferencia entre invertir, especular y ahorrar.",
      "Descuento del 15% en el servicio y en las formaciones disponibles para socios.",
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
    title: "Broker Finanzas",
    shortTitle: "Broker Finanzas",
    category: "Planificación financiera",
    summary:
      "Orientación para ordenar objetivos, capacidad de inversión, financiación y estrategia patrimonial dentro del ecosistema Club Alfa.",
    memberValue:
      "15% de descuento en nuestro servicio y formaciones.",
    highlights: ["15% de descuento", "Formación financiera", "Criterio financiero"],
    includes: [
      "Revisión de objetivos financieros y horizonte temporal.",
      "Análisis de capacidad de ahorro, inversión y endeudamiento saludable.",
      "Orientación sobre opciones dentro del ecosistema Alfa.",
      "Descuento del 15% en el servicio y en formaciones financieras para socios.",
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
      "Hasta un 30% de descuento en nuestros seguros.",
    highlights: ["Hasta 30% descuento", "Seguros de hogar", "Coberturas claras"],
    includes: [
      "Revisión de necesidades aseguradoras según tipo de inmueble y uso.",
      "Orientación en seguros de hogar, propietario, inquilino e impago.",
      "Comparación de coberturas para evitar duplicidades o huecos de protección.",
      "Aplicación de descuentos de hasta el 30% en seguros disponibles para socios.",
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
      "El socio puede solicitar orientación sobre metales de inversión, formatos disponibles y criterios básicos antes de comprar. 50% descuento en grabar texto en lingotes.",
    highlights: ["Oro de inversión", "Plata de inversión", "50% grabado"],
    includes: [
      "Explicación de los formatos habituales de oro y plata de inversión.",
      "Orientación sobre custodia, liquidez y horizonte patrimonial.",
      "Información sobre criterios de compra y trazabilidad.",
      "50% descuento en grabar texto en lingotes.",
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
      "15% de descuento en reformas de todo tipo, o hasta un 33% si se contrata a nuestro equipo de interiorismo.",
    highlights: ["15% reformas", "Hasta 33% con interiorismo", "Revalorización"],
    includes: [
      "Análisis inicial del potencial de transformación del inmueble.",
      "Propuesta de intervención priorizada según objetivo de rentabilidad.",
      "Coordinación de diseño, calidades y ejecución.",
      "Descuento ampliado de hasta el 33% si se contrata a nuestro equipo de interiorismo.",
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
      "Gestión de alquiler, habitaciones y rent to rent premium con inversión en adecuación para preparar la vivienda sin coste para el propietario.",
    memberValue:
      "Inversión de 3000€ a 12000€ en la vivienda sin coste alguno para el propietario. Esta inversión en la adecuación variará según la duración del contrato de alquiler y las condiciones en las que se encuentre el inmueble.",
    highlights: ["3000€ a 12000€", "Sin coste propietario", "Gestión integral"],
    includes: [
      "Análisis de demanda y modelo de explotación más adecuado.",
      "Inversión de 3000€ a 12000€ en la adecuación de la vivienda sin coste alguno para el propietario.",
      "Gestión operativa de captación, contratos, mantenimiento y atención.",
      "La inversión variará según la duración del contrato de alquiler y las condiciones del inmueble.",
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
    title: "Ahorro Alfa",
    shortTitle: "Ahorro Alfa",
    category: "Ahorro operativo",
    summary:
      "Revisión anual de facturas de energía, fibra y móvil para mejorar cada anualidad sin que el socio tenga que ocuparse de gestiones tediosas.",
    memberValue:
      "Revisión anual a inicio de cada año de sus facturas en energia, fibra y móvil por parte del equipo especializado para poder mejorar cada anualidad sus facturas sin que el interesado tenga que preocuparse de realizar estas tediosas gestiones.",
    highlights: ["Revisión anual", "Energía", "Fibra y móvil"],
    includes: [
      "Revisión anual a inicio de cada año de facturas de energia, fibra y móvil.",
      "Identificación de posibles sobrecostes o servicios duplicados.",
      "Orientación para ajustar facturas a necesidades reales.",
      "Gestión por parte del equipo especializado para mejorar las facturas sin que el interesado tenga que preocuparse.",
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
    title: "Alarmas Alfa",
    shortTitle: "Alarmas Alfa",
    category: "Seguridad",
    summary:
      "Soluciones de alarma y seguridad para viviendas, inmuebles en alquiler, activos vacíos o propiedades en proceso de explotación.",
    memberValue:
      "Descuento del 15% en la contratación de tu sistema de alarma.",
    highlights: ["15% de descuento", "Sistema de alarma", "Presupuesto personalizado"],
    includes: [
      "Revisión del tipo de inmueble, uso y nivel de riesgo.",
      "Orientación sobre sensores, cámaras, control de accesos y aviso conectado.",
      "Propuesta de configuración según vivienda habitual, alquiler o activo vacío.",
      "Descuento del 15% en la contratación del sistema de alarma para socios.",
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
