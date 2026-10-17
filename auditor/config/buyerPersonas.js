/**
 * MATRIZ MAESTRA DE BUYER PERSONAS (AVATARES B2B & B2C) Y METODOLOGÍA MAPA
 * Proyecto: Todo Lima (todolima.com) × Hazlo Crecer (hazlocrecer.com)
 *
 * Fundamentos estratégicos:
 * - Russell Brunson (DotCom Secrets, Expert Secrets, Traffic Secrets):
 *   The Secret Formula, Value Ladder, The Big Domino, Opportunity Switch, 3 False Beliefs.
 * - Jim Edwards (Copywriting Secrets):
 *   Hook-Story-Offer, 3 M's (Myth, Mechanism, Sample), Disparadores Emocionales.
 * - Metodología MAPA (Sistema Automatizado):
 *   Mapear (Recorrido), Aislar (Cuello de botella), Poner Precio (Fuga determinista), Atacar (Intervención).
 */

import { getCategoryRankInfo } from './purchasingPowerRanking.js';
import { getNicheTemplate } from './nicheTemplates.js';

export const BUYER_PERSONAS_BY_CATEGORY = {
  // ============================================================================
  // TIER 1: ÉLITE / ALTO TICKET Y SERVICIOS ESPECIALIZADOS
  // ============================================================================

  'dentistas': {
    slug: 'dentistas',
    categoryName: 'Clínicas Odontológicas y Dentistas',
    // 1. Perfil del Decisor B2B (Quien recibe la auditoría de Hazlo Crecer)
    icpB2B: {
      decisionMaker: 'Odontólogo Propietario / Director Médico (1 a 3 sedes en Lima)',
      dailyReality: 'Atiende pacientes en el sillón clínico durante 8 a 10 horas al día mientras intenta supervisar la recepción, pagos y campañas publicitarias.',
      primaryBottleneck: 'Demora de más de 30–45 minutos en responder WhatsApp cuando la recepcionista está cobrando o atendiendo llamadas, y ausencia total de seguimiento a proformas de ortodoncia, implantes y estética dental.',
      theBigDomino: 'Si el director médico comprende que la única vía para llenar sus sillones con tratamientos de alto ticket sin contratar más recepcionistas es instalando un Sistema Autónomo de Recepción y Calificación 24/7 en su WhatsApp y ficha local, contratar la implementación se vuelve la única decisión lógica.',
      opportunitySwitch: 'Pasar de "capacitar a la secretaria para que conteste más rápido" (oferta de mejora fallida) a "instalar una Recepción Dental Autónoma 24/7 con pre-calificación de tratamientos" (nueva oportunidad).',
      falseBeliefs: {
        vehicle: 'Creencia: "Un sistema automatizado no sabe responder dudas clínicas de implantes u ortodoncia". Realidad: El agente no diagnostica; filtra la intención administrativa, resuelve dudas aprobadas de horarios/sedes y agenda la evaluación clínica.',
        internal: 'Creencia: "No tengo tiempo ni conocimientos técnicos para configurar un software". Realidad: El sistema se entrega llave en mano y se opera con reglas supervisadas.',
        external: 'Creencia: "A mis pacientes en Lima no les gusta hablar con bots". Realidad: Al paciente con dolor molar o interés estético le frustra esperar 2 horas el visto azul; agradece una respuesta útil en 10 segundos con opción de pasar a humano.'
      }
    },
    // 2. Perfil del Avatar B2C (El paciente ideal que busca a la clínica en Lima)
    endCustomerAvatar: {
      archetypeName: 'Valeria (Paciente de Estética/Ortodoncia) y Carlos (Urgencia/Implantes)',
      demographics: '25 a 52 años, NSE A/B/C+, residentes o trabajadores en distritos comerciales de Lima (Miraflores, San Borja, Surco, Jesús María, Los Olivos, San Miguel).',
      burningDesire: 'Recuperar la estética de su sonrisa y masticación sin dolor, con financiamiento claro y garantía escrita.',
      visceralFear: 'Dolor durante el procedimiento, cobros sorpresa a mitad del tratamiento o resultados artificiales por malos materiales.',
      triggerEvent: 'Evento social próximo (boda, graduación, nuevo trabajo), fractura de pieza dental el fin de semana o sangrado/dolor agudo nocturno.',
      mobileBehavior: 'Compara de 3 a 4 clínicas en Google Maps y Todo Lima desde su celular; agenda evaluación con la primera clínica que le confirma disponibilidad de horario y precio de consulta en menos de 15 minutos.'
    },
    // 3. Estructura Hook - Story - Offer & Diagnóstico MAPA
    hookStoryOffer: {
      hook: '¿Sabías que hasta el 40% de las consultas de ortodoncia e implantes en Lima se van a otra clínica por responder el WhatsApp más de 30 minutos tarde?',
      story: 'Mientras estás en el sillón atendiendo a un paciente, entran consultas de personas listas para agendar evaluación. Si la recepción demora o no hace seguimiento a los presupuestos entregados, tu inversión en publicidad termina financiando a la clínica de la cuadra siguiente.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito: identificamos tus 3 fugas principales en recepción y seguimiento con un plan de acción de 30, 60 y 90 días.'
    },
    mapaVariables: { monthlyLeads: 80, avgTicketPEN: 2500, baselineConvRate: 0.10, targetConvRate: 0.16, grossMargin: 0.45 }
  },

  'agentes-inmobiliarios': {
    slug: 'agentes-inmobiliarios',
    categoryName: 'Agentes Inmobiliarios y Corretaje',
    icpB2B: {
      decisionMaker: 'Broker Propietario / Gerente de Agencia Inmobiliaria o Agente Top Producer',
      dailyReality: 'Divide su día entre mostrar inmuebles en tráfico limeño, negociar exclusivas con propietarios y filtrar decenas de curiosos en portales que no califican para crédito hipotecario.',
      primaryBottleneck: 'Pérdida de tiempo en visitas improductivas con compradores sin pre-aprobación bancaria y fuga de propietarios que desean vender rápido en zonas prime.',
      theBigDomino: 'Si el broker comprueba que un embudo de pre-calificación hipotecaria y captación de propietarios 24/7 filtra al 80% de curiosos antes de programar una visita física, su productividad y cierre de comisiones se multiplican.',
      opportunitySwitch: 'Dejar de depender exclusivamente de portales masivos donde compites por precio con otros 50 agentes, y construir un Portal Inmobiliario Propio con pre-calificación automática.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los inmuebles solo se venden por portales tradicionales". Realidad: Los propietarios exclusivos buscan agencias con vitrina digital propia y filtro de seguridad.',
        internal: 'Creencia: "Subir propiedades a una web propia toma demasiado tiempo". Realidad: Un catálogo estructurado por fichas destacadas se actualiza en minutos.',
        external: 'Creencia: "El comprador no llenará datos financieros por WhatsApp". Realidad: Quien tiene crédito aprobado o fondos propios responde 3 preguntas clave si a cambio recibe el dossier completo y video recorrido al instante.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Familia Inversionista / Propietario Vendedor en Lima Moderna y Top',
      demographics: '32 a 60 años, NSE A/B, ingresos familiares > S/ 12,000/mes o propietarios de inmuebles en Miraflores, San Isidro, Surco, San Borja, Magdalena y Jesús María.',
      burningDesire: 'Vender o alquilar su propiedad al mejor valor de mercado sin exponer su seguridad, o comprar un departamento con título saneado.',
      visceralFear: 'Meter inquilinos morosos, sufrir estafas registrales o perder meses con corredores informales que no traen clientes reales.',
      triggerEvent: 'Cambio familiar (mudanza, herencia, matrimonio, hijos), liquidez para inversión o vencimiento de contrato de alquiler.',
      mobileBehavior: 'Investiga la seriedad de la agencia antes de entregar las llaves de su inmueble; exige ver catálogo real, RUC/registro MVCS y atención ejecutiva inmediata.'
    },
    hookStoryOffer: {
      hook: 'Una sola captación exclusiva en Lima paga 20 veces tu ecosistema digital, pero ¿cuántos propietarios descartan tu agencia al no ver un portal corporativo sólido?',
      story: 'Cuando un propietario busca vender un inmueble de $200,000 USD, investiga a la agencia en Google. Si solo encuentra una red social desactualizada o tarda horas en recibir respuesta, entrega la exclusiva a otra corredora.',
      offer: 'Recibe una Auditoría Gratuita MAPA de tu embudo inmobiliario para automatizar el filtro de compradores y la captación de propietarios.'
    },
    mapaVariables: { monthlyLeads: 45, avgTicketPEN: 15000, baselineConvRate: 0.04, targetConvRate: 0.07, grossMargin: 0.70 }
  },

  'abogados': {
    slug: 'abogados',
    categoryName: 'Estudios de Abogados y Asesoría Legal',
    icpB2B: {
      decisionMaker: 'Socio Principal / Director de Estudio Jurídico',
      dailyReality: 'Entre audiencias virtuales/presenciales, redacción de escritos y reuniones con clientes corporativos; no puede atender el teléfono cada vez que entra una consulta nueva.',
      primaryBottleneck: 'Consultas no filtradas que buscan asesoría gratuita interminable por teléfono, combinadas con la pérdida de casos corporativos o litigios de alto valor por falta de respuesta confidencial inmediata.',
      theBigDomino: 'Si el socio director instala un filtro de admisión jurídica (Legal Intake) que clasifica la materia del caso, urgencia y capacidad de pago de consulta antes de pasar a su agenda, eliminará las consultas gratuitas improductivas y captará los litigios más rentables.',
      opportunitySwitch: 'Pasar de atender llamadas en frío sin filtro a un Sistema de Admisión Legal Confidencial con cobro de consulta previa.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los servicios legales en Lima solo llegan por recomendación boca a boca". Realidad: Incluso el cliente referido busca el nombre del estudio en Google antes de firmar un contrato de honorarios.',
        internal: 'Creencia: "Automatizar el primer contacto resta solemnidad al estudio". Realidad: Una recepción digital formal proyecta orden corporativo superior al de un celular personal que no contesta.',
        external: 'Creencia: "Nadie paga la consulta inicial por adelantado". Realidad: Cuando el portal muestra credenciales, áreas de práctica y reserva estructurada, el cliente serio abona por Yape/transferencia para asegurar su hora.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Gerente de Pyme / Propietario en Conflicto Patrimonial o Contractual',
      demographics: '30 a 65 años, empresarios, comerciantes y profesionales con patrimonio o litigios activos en Lima.',
      burningDesire: 'Proteger su patrimonio, empresa o libertad con un abogado que le hable claro, cumpla plazos y tenga respaldo.',
      visceralFear: 'Contratar a un abogado que cobre el adelanto, desaparezca, no conteste el WhatsApp o deje vencer los plazos procesales.',
      triggerEvent: 'Notificación judicial/SUNAT/Indecopi, incumplimiento de contrato, problema de herencia/inmueble o urgencia penal/laboral.',
      mobileBehavior: 'Busca con alto nivel de estrés y urgencia; necesita validar colegiatura (CAL), especialidad exacta y agendar una reunión reservada hoy mismo.'
    },
    hookStoryOffer: {
      hook: '¿Cuántas horas a la semana pierde tu estudio atendiendo consultas que nunca contratan, mientras los casos de alto honorario se enfrían esperando respuesta?',
      story: 'Un empresario que recibe una notificación legal urgente busca asesoría inmediata. Si tu estudio no tiene un protocolo de admisión digital que proyecte autoridad y filtre el caso en minutos, termina contratando a otro despacho.',
      offer: 'Solicita la Auditoría Estratégica MAPA para tu estudio jurídico y ordena la captación y filtrado de clientes.'
    },
    mapaVariables: { monthlyLeads: 50, avgTicketPEN: 4500, baselineConvRate: 0.08, targetConvRate: 0.14, grossMargin: 0.65 }
  },

  'notarias': {
    slug: 'notarias',
    categoryName: 'Notarías Públicas',
    icpB2B: {
      decisionMaker: 'Notario Titular / Administrador General de Notaría',
      dailyReality: 'Alta carga documentaria presencial, teléfonos fijos saturados y usuarios preguntando repetitivamente los mismos requisitos para cartas notariales, poderes, transferencias vehiculares y escrituras.',
      primaryBottleneck: 'Saturación de la central telefónica y ventanillas por consultas repetitivas de requisitos y tarifas, provocando que clientes corporativos e inmobiliarios migren a notarías más ágiles.',
      theBigDomino: 'Al automatizar la entrega de requisitos, aranceles referenciales y recepción previa de minutas por canal digital, el personal notarial libera horas operativas y duplica la velocidad de firma.',
      opportunitySwitch: 'Reemplazar la atención telefónica congestionada por una Ventanilla Digital de Requisitos y Pre-Ingreso de Trámites.',
      falseBeliefs: {
        vehicle: 'Creencia: "Todo trámite notarial es 100% presencial por ley". Realidad: La firma es presencial, pero el 80% de la revisión de requisitos, bloqueos registrales y envío de minutas ocurre antes de pisar la notaría.',
        internal: 'Creencia: "Cambiar el flujo confundirá a los abogados/kardistas". Realidad: El sistema entrega el expediente pre-validado a cada área (vehicular, escrituras, legalizaciones).',
        external: 'Creencia: "Los usuarios prefieren ir a preguntar en persona". Realidad: Nadie quiere hacer dos viajes en el tráfico de Lima porque le faltó una copia literal o vigencia de poder.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Comprador de Vehículo/Inmueble y Gestor Empresarial',
      demographics: '28 a 65 años, ciudadanos y empresas realizando compraventas, poderes o constitución de sociedades.',
      burningDesire: 'Firmar su trámite en una sola visita, sin colas interminables ni observaciones de último minuto.',
      visceralFear: 'Perder toda una mañana en la notaría para que le digan que falta un documento o que el sistema no tiene cupo.',
      triggerEvent: 'Cierre de compraventa de auto/departamento, viaje urgente de menores, poder para cobros o constitución de empresa.',
      mobileBehavior: 'Busca en Google la notaría más cercana con horarios claros, lista exacta de requisitos y WhatsApp activo para enviar documentos previos.'
    },
    hookStoryOffer: {
      hook: '¿Tu personal notarial pasa el día repitiendo los mismos requisitos por teléfono mientras las escrituras de alto valor esperan?',
      story: 'Cuando un cliente quiere cerrar una transferencia vehicular o hipotecaria, elige la notaría que le confirma requisitos, costos y cita de firma sin obligarlo a ir dos veces.',
      offer: 'Solicita una Auditoría MAPA gratuita para descongestionar la recepción y agilizar el pre-ingreso de trámites en tu notaría.'
    },
    mapaVariables: { monthlyLeads: 150, avgTicketPEN: 650, baselineConvRate: 0.20, targetConvRate: 0.32, grossMargin: 0.55 }
  },

  'oftalmologos': {
    slug: 'oftalmologos',
    categoryName: 'Oftalmólogos y Clínicas de Ojos',
    icpB2B: {
      decisionMaker: 'Médico Oftalmólogo Director / Gerente de Clínica Oftalmológica',
      dailyReality: 'Consultas de agudeza visual combinadas con programación de sala de operaciones para cirugías refractivas (LASIK), cataratas y retina.',
      primaryBottleneck: 'Pacientes diagnosticados con catarata o candidatos a cirugía láser que se llevan la orden de exámenes/presupuesto y nunca agendan la intervención por falta de seguimiento educativo.',
      theBigDomino: 'Si la clínica sistematiza el seguimiento post-consulta y educa al paciente y a su familia sobre la seguridad de la cirugía ocular, la conversión de consulta simple a cirugía de alto ticket aumenta drásticamente.',
      opportunitySwitch: 'Pasar de vender solo consultas sueltas a operar un Embudo Quirúrgico de Educación y Seguimiento de Pacientes.',
      falseBeliefs: {
        vehicle: 'Creencia: "El paciente se opera cuando junta el dinero". Realidad: Se opera en la clínica que le transmite mayor seguridad y le facilita opciones de pago/seguros a tiempo.',
        internal: 'Creencia: "Nuestro personal de admisión ya llama a los pacientes". Realidad: Sin un registro estructurado, el 60% de candidatos quirúrgicos queda sin segundo contacto.',
        external: 'Creencia: "Los adultos mayores no usan WhatsApp". Realidad: Sus hijos de 30–50 años son quienes buscan al oftalmólogo en Google, coordinan por WhatsApp y pagan la cirugía de catarata.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Joven Profesional (Cirugía Láser) e Hijo de Adulto Mayor (Cataratas)',
      demographics: '24 a 45 años (para sí mismos o decidiendo por sus padres de 65+ años), NSE A/B/C+.',
      burningDesire: 'Dejar de depender de los lentes o devolverle la vista clara a sus padres con tecnología láser segura.',
      visceralFear: 'Miedo extremo a complicaciones en los ojos, dolor quirúrgico o médicos sin subespecialidad comprobada.',
      triggerEvent: 'Pérdida progresiva de visión al manejar de noche, diagnóstico previo de catarata/glaucoma o incomodidad constante con gafas.',
      mobileBehavior: 'Revisa detalladamente el CMP/RNE del oftalmólogo, la tecnología de la clínica y testimonios reales antes de agendar evaluación.'
    },
    hookStoryOffer: {
      hook: '¿Cuántos pacientes diagnosticados con catarata o candidatos a cirugía láser salen de tu consultorio y nunca regresan a operarse?',
      story: 'Captar al paciente para una consulta cuesta dinero y tiempo, pero la verdadera rentabilidad de la clínica está en los procedimientos quirúrgicos que se pierden por falta de seguimiento estructurado.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA para medir y recuperar presupuestos quirúrgicos en tu clínica oftalmológica.'
    },
    mapaVariables: { monthlyLeads: 90, avgTicketPEN: 3200, baselineConvRate: 0.08, targetConvRate: 0.14, grossMargin: 0.50 }
  },

  'dermatologos': {
    slug: 'dermatologos',
    categoryName: 'Dermatólogos y Clínicas de la Piel',
    icpB2B: {
      decisionMaker: 'Médico Dermatólogo Titular / Director de Centro Dermatológico',
      dailyReality: 'Agenda llena de consultas clínicas y procedimientos estéticos (láser CO2, toxina botulínica, ácido hialurónico, acné, rosácea).',
      primaryBottleneck: 'Alto porcentaje de inasistencias (no-shows) en agenda y pérdida de pacientes de dermatología estética de alto margen frente a centros estéticos no médicos con marketing más agresivo.',
      theBigDomino: 'Al posicionar la autoridad médica certificada (CMP/RNE) junto con un sistema de reserva confirmada y recordatorios automáticos para sesiones recurrentes, la clínica maximiza el valor de vida del paciente (LTV).',
      opportunitySwitch: 'Dejar de gestionar turnos en cuaderno o chat suelto para pasar a una Agenda Dermatológica con Confirmación y Recurrencia Automatizada.',
      falseBeliefs: {
        vehicle: 'Creencia: "La estética médica se vende sola por Instagram". Realidad: Los Reels dan alcance, pero el cierre de tratamientos de S/ 1,500+ requiere una página de autoridad clínica y seguimiento puntual.',
        internal: 'Creencia: "Pedir confirmación o adelanto espanta al paciente". Realidad: Ordena la agenda y reduce los huecos vacíos en más de un 35%.',
        external: 'Creencia: "El paciente no vuelve hasta que tiene otro brote". Realidad: Con recordatorios programados de control a los 3 o 6 meses, la recompra de tratamientos se vuelve predecible.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Sofía (Paciente de Estética Médica y Cuidado de la Piel)',
      demographics: '22 a 50 años, NSE A/B, alta preocupación por su imagen personal y salud cutánea.',
      burningDesire: 'Piel sana, rejuvenecida y libre de manchas o cicatrices de acné, atendida exclusivamente por un médico dermatólogo colegiado.',
      visceralFear: 'Sufrir quemaduras por láser mal calibrado, infecciones o caer en manos de intrusismo médico (cosmiatras haciéndose pasar por médicos).',
      triggerEvent: 'Brote severo de acné/rosácea, aparición de manchas solares, caída de cabello (alopecia) o preparación para evento importante.',
      mobileBehavior: 'Exige ver resultados clínicos reales, equipos dermatológicos originales y agendar turno rápido desde su smartphone.'
    },
    hookStoryOffer: {
      hook: '¿Tus pacientes de láser y estética dermatológica completan todas sus sesiones o estás dejando sillones vacíos por cancelaciones de último minuto?',
      story: 'En Lima, miles de pacientes buscan un dermatólogo real para no arriesgar su rostro en centros informales, pero si tu recepción demora en darles cita o no les recuerda su control, pierdes recurrencia.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para optimizar el agendamiento y la recurrencia de pacientes en tu centro dermatológico.'
    },
    mapaVariables: { monthlyLeads: 100, avgTicketPEN: 1200, baselineConvRate: 0.15, targetConvRate: 0.24, grossMargin: 0.55 }
  },

  'ginecologos': {
    slug: 'ginecologos',
    categoryName: 'Ginecólogos y Clínicas de la Mujer',
    icpB2B: {
      decisionMaker: 'Médico Gineco-Obstetra / Director de Consultorio o Clínica de la Mujer',
      dailyReality: 'Consultas prenatales, ecografías especializadas (4D/5D/morfológicas), chequeos preventivos anuales y atención de partos o cirugías ginecológicas.',
      primaryBottleneck: 'Pacientes que buscan atención con urgencia emocional y absoluta reserva, pero abandonan cuando nadie responde el WhatsApp con empatía y rapidez o no encuentran paquetes claros de control prenatal/chequeo.',
      theBigDomino: 'Una experiencia de admisión confidencial, cálida e inmediata convierte una consulta aislada en el seguimiento de todo un embarazo o control anual recurrente.',
      opportunitySwitch: 'Pasar de responder mensajes sueltos a un Canal Confidencial de Salud Femenina y Seguimiento Prenatal.',
      falseBeliefs: {
        vehicle: 'Creencia: "La paciente solo busca el precio de la ecografía". Realidad: Busca tranquilidad, trato humano y saber qué incluye exactamente su consulta integral.',
        internal: 'Creencia: "Un asistente digital suena frío para ginecología". Realidad: Configurado con tono cálido y empático, brinda respuesta inmediata cuando la paciente está ansiosa un domingo por la noche.',
        external: 'Creencia: "Las pacientes se acuerdan solas de su chequeo anual". Realidad: Un recordatorio anual preventivo reactiva a cientos de pacientes históricas.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Mariana (Gestante Primeriza o Mujer en Chequeo Preventivo)',
      demographics: '23 a 48 años, NSE A/B/C+, Lima Metropolitana.',
      burningDesire: 'Sentirse segura, escuchada y acompañada con tecnología ecográfica moderna y calidez médica.',
      visceralFear: 'Trato frío o apresurado, falta de privacidad o diagnósticos tardíos en su embarazo o salud hormonal.',
      triggerEvent: 'Prueba de embarazo positiva, retraso o alteración menstrual, dolor pélvico o chequeo preventivo anual (Papanicolaou/colposcopía).',
      mobileBehavior: 'Valora enormemente las reseñas de otras pacientes mujeres, la opción de elegir doctora/doctor y la facilidad de reservar sin tener que hablar en voz alta desde su oficina.'
    },
    hookStoryOffer: {
      hook: 'Cuando una paciente descubre que está embarazada o necesita un chequeo urgente, ¿tu consultorio le responde al instante o la deja en visto con incertidumbre?',
      story: 'En ginecología y obstetricia, la primera respuesta define la confianza. Quien atiende con claridad y calidez en los primeros minutos gana una paciente para todo su control prenatal y chequeos anuales.',
      offer: 'Recibe un Diagnóstico Estratégico MAPA gratuito para mejorar la recepción confidencial y el seguimiento de tus pacientes.'
    },
    mapaVariables: { monthlyLeads: 95, avgTicketPEN: 850, baselineConvRate: 0.15, targetConvRate: 0.25, grossMargin: 0.55 }
  },

  'doctores': {
    slug: 'doctores',
    categoryName: 'Médicos Especialistas y Policlínicos',
    icpB2B: {
      decisionMaker: 'Director Médico / Gerente de Policlínico o Consultorio Privado',
      dailyReality: 'Coordinación de múltiples especialidades médicas, horarios de doctores, laboratorio y admisión de pacientes particulares.',
      primaryBottleneck: 'Desorden en la central de citas: los pacientes llaman o escriben preguntando por especialidades y horarios, pero la línea está ocupada o demoran horas en confirmar si el especialista atiende ese día.',
      theBigDomino: 'Centralizar el catálogo de especialidades, tarifas transparentes y disponibilidad horaria en un embudo de admisión 24/7 elimina los cuellos de botella en recepción y llena los turnos vacíos.',
      opportunitySwitch: 'Reemplazar la recepción telefónica saturada por una Central Digital de Admisión Médica 24/7.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los pacientes particulares prefieren ir directo al hospital o clínica grande". Realidad: Huyen de las colas y sobrecostos de las clínicas grandes si encuentran un policlínico o especialista serio que los atienda hoy mismo.',
        internal: 'Creencia: "Es muy difícil coordinar los horarios de varios médicos". Realidad: Un flujo de solicitud de cita por especialidad ordena la demanda antes de que intervenga recepción.',
        external: 'Creencia: "La gente solo pregunta precios". Realidad: Preguntan precio porque no ven el valor y las credenciales del médico especialista.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Paciente Particular que Busca Atención Rápida sin Colas de Seguro',
      demographics: '28 a 65 años, familias y trabajadores independientes en Lima.',
      burningDesire: 'Ser atendido hoy o mañana por un médico especialista competente, sin esperar semanas por una cita en EsSalud o pagar tarifas excesivas.',
      visceralFear: 'Mal diagnóstico, perder horas en sala de espera o que el médico no tenga la especialidad registrada.',
      triggerEvent: 'Síntoma agudo o persistente, necesidad de riesgo quirúrgico, lectura de exámenes o segunda opinión médica.',
      mobileBehavior: 'Busca "especialista + distrito", revisa reseñas en Google Maps y escribe por WhatsApp pidiendo el turno más próximo.'
    },
    hookStoryOffer: {
      hook: '¿Cuántos pacientes particulares intentan agendar en tu centro médico cada semana y desisten porque recepción tarda horas en confirmar horarios?',
      story: 'El paciente particular elige velocidad y confianza. Si al escribir por WhatsApp no recibe al instante las especialidades, tarifas y turnos disponibles, agenda en el siguiente consultorio.',
      offer: 'Solicita tu Auditoría Gratuita MAPA y transforma tu recepción médica en un sistema ordenado de captación de citas.'
    },
    mapaVariables: { monthlyLeads: 120, avgTicketPEN: 350, baselineConvRate: 0.18, targetConvRate: 0.28, grossMargin: 0.50 }
  },

  'aire-acondicionado': {
    slug: 'aire-acondicionado',
    categoryName: 'Climatización y Aire Acondicionado',
    icpB2B: {
      decisionMaker: 'Ingeniero / Gerente General de Empresa de Climatización HVAC',
      dailyReality: 'Supervisión de instalaciones en obra, cotizaciones técnicas para oficinas/comercios y programación de cuadrillas de mantenimiento preventivo.',
      primaryBottleneck: 'En temporada alta o ante requerimientos B2B, tardan días en enviar cotizaciones o responder solicitudes urgentes de oficinas/locales, y pierden los contratos de mantenimiento recurrente anual.',
      theBigDomino: 'Estandarizar un cotizador rápido por área/BTU y automatizar el recordatorio de mantenimiento preventivo cada 6 meses a la cartera instalada convierte un negocio estacional en ingresos recurrentes todo el año.',
      opportunitySwitch: 'Pasar de apagar incendios en verano a un Sistema B2B de Cotización Rápida y Contratos de Mantenimiento Recurrente.',
      falseBeliefs: {
        vehicle: 'Creencia: "Cada proyecto requiere visita técnica antes de dar cualquier idea de costo". Realidad: El cliente B2B necesita una respuesta inmediata con rangos referenciales y agendamiento de visita técnica en 1 clic.',
        internal: 'Creencia: "Mis técnicos no usan sistemas". Realidad: El sistema lo gestiona administración para llenar la ruta diaria de visitas y mantenimientos.',
        external: 'Creencia: "En invierno nadie contrata aire acondicionado". Realidad: Las empresas, clínicas, servidores y locales comerciales ejecutan sus planes de mantenimiento e instalación todo el año si se les hace seguimiento.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Jefe de Servicios Generales / Administración B2B y Propietario Residencial',
      demographics: '30 a 58 años, administradores de oficinas, clínicas, restaurantes y propietarios de departamentos en Lima.',
      burningDesire: 'Instalación limpia, cálculo correcto de BTU, equipos con garantía y factura corporativa sin retrasos.',
      visceralFear: 'Técnicos informales que dejen fugas de agua, malogren la estética de la oficina o desaparezcan cuando el equipo falla en garantía.',
      triggerEvent: 'Ola de calor en Lima, mudanza/remodelación de oficina, auditoría de Indecopi/defensa civil o goteo/falla de equipo en sala de reuniones.',
      mobileBehavior: 'Pide 3 cotizaciones rápidas para presentar a gerencia; contrata a la empresa que demuestra experiencia corporativa y agenda la visita técnica primero.'
    },
    hookStoryOffer: {
      hook: '¿Cuántos proyectos corporativos de climatización y contratos de mantenimiento anual estás perdiendo por demorar en responder y cotizar?',
      story: 'Cuando el jefe de administración de una empresa busca instalar o reparar equipos de aire acondicionado, necesita presentar 3 propuestas rápidas a gerencia. Quien responde primero con formalidad técnica se lleva el proyecto.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para sistematizar tu captación de proyectos B2B y mantenimientos recurrentes.'
    },
    mapaVariables: { monthlyLeads: 55, avgTicketPEN: 3800, baselineConvRate: 0.10, targetConvRate: 0.17, grossMargin: 0.40 }
  },

  'contadores': {
    slug: 'contadores',
    categoryName: 'Estudios Contables y Asesoría Tributaria',
    icpB2B: {
      decisionMaker: 'Socio Director / Contador Público Colegiado Titular del Estudio',
      dailyReality: 'Cierres mensuales de PDT/PLAME, fiscalizaciones de SUNAT, liquidación de impuestos y manejo de asistentes contables.',
      primaryBottleneck: 'Atraen micro-consultas de personas que buscan trámites de S/ 50, mientras les cuesta captar empresas (MYPE/Régimen General) que paguen igualas mensuales de S/ 500 a S/ 3,500+ por falta de posicionamiento y filtro B2B.',
      theBigDomino: 'Posicionar al estudio como especialista en blindaje tributario y optimización de impuestos con un filtro de facturación mensual atrae gerentes de empresas rentables dispuestos a cambiar de contador.',
      opportunitySwitch: 'Dejar de competir por llevar contabilidades baratas a destajo y pasar a un Embudo de Captación de Igualas Corporativas y Auditoría Preventiva SUNAT.',
      falseBeliefs: {
        vehicle: 'Creencia: "Las empresas solo cambian de contador en enero". Realidad: Cambian de contador el mismo día que reciben una esquela, multa o coactiva de SUNAT por negligencia de su contador actual.',
        internal: 'Creencia: "No sabemos hacer marketing para empresas". Realidad: Tu mejor marketing es un diagnóstico tributario preventivo estructurado.',
        external: 'Creencia: "El empresario limeño solo busca al contador más barato". Realidad: El empresario que ya sufrió una multa de SUNAT paga con gusto por tranquilidad, orden y reportes financieros a tiempo.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Roberto (Gerente de Pyme en Crecimiento Harto de su Contador Actual)',
      demographics: '30 a 60 años, dueño de empresa comercial, importadora, clínica o constructora con facturación de S/ 30,000 a S/ 500,000/mes.',
      burningDesire: 'Pagar lo justo dentro de la ley, no tener sorpresas con SUNAT y contar con un contador proactivo que le avise con tiempo.',
      visceralFear: 'Embargos de cuentas bancarias, multas por declaraciones fuera de fecha o un contador que solo aparece un día antes del vencimiento.',
      triggerEvent: 'Notificación en Buzón Electrónico SUNAT, error grave del contador actual, crecimiento de planilla o necesidad de estados financieros para préstamo bancario.',
      mobileBehavior: 'Busca un estudio contable formal, con oficinas reales, CPC colegiado y capacidad de respuesta rápida por WhatsApp y correo.'
    },
    hookStoryOffer: {
      hook: '¿Tu estudio contable sigue llenándose de consultas pequeñas de bajo margen en lugar de captar empresas con igualas mensuales de S/ 800 a S/ 3,500?',
      story: 'Cada mes en Lima, cientos de gerentes de Pymes deciden cambiar de contador tras sufrir una multa o mal servicio. Si tu estudio tiene un embudo de diagnóstico tributario B2B, captas clientes con años de permanencia (alto LTV).',
      offer: 'Solicita tu Auditoría Gratuita MAPA para estructurar la captación de clientes corporativos de renta recurrente.'
    },
    mapaVariables: { monthlyLeads: 45, avgTicketPEN: 1500, baselineConvRate: 0.10, targetConvRate: 0.18, grossMargin: 0.65 }
  },

  'laboratorios-clinicos': {
    slug: 'laboratorios-clinicos',
    categoryName: 'Laboratorios Clínicos y Análisis de Sangre',
    icpB2B: {
      decisionMaker: 'Director Médico Patólogo / Gerente General de Laboratorio Clínico',
      dailyReality: 'Operación desde las 6:00 AM con toma de muestras en sede, servicio a domicilio, convenios con médicos y entrega de resultados en línea.',
      primaryBottleneck: 'Pacientes con orden médica en mano que escriben por WhatsApp para cotizar su lista de análisis o pedir toma de muestra a domicilio, y al no recibir cotización en menos de 10 minutos se van a una cadena grande.',
      theBigDomino: 'Responder y cotizar órdenes médicas en minutos (incluyendo condiciones de ayuno y agendamiento a domicilio) captura al paciente en el momento exacto de compra.',
      opportunitySwitch: 'Pasar de cotizar órdenes manualmente con demoras a una Central Rápida de Cotización de Órdenes Médicas y Toma a Domicilio.',
      falseBeliefs: {
        vehicle: 'Creencia: "Las grandes cadenas acaparan todo". Realidad: Los pacientes prefieren laboratorios con atención rápida a domicilio, precios competitivos y entrega de resultados el mismo día.',
        internal: 'Creencia: "Cotizar cada foto de receta toma mucho tiempo". Realidad: El 80% de solicitudes corresponden a 20 perfiles estándar (preoperatorio, tiroideo, lipídico, prenatal, chequeo general) que se responden al instante.',
        external: 'Creencia: "El paciente solo va al laboratorio que queda frente al hospital". Realidad: La comodidad de la toma de muestra a domicilio en Lima fideliza a toda la familia.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Paciente con Orden Médica / Familia que Requiere Toma a Domicilio',
      demographics: '25 a 70 años, pacientes pre-operatorios, gestantes, adultos mayores y personas en chequeo preventivo.',
      burningDesire: 'Toma de muestra sin dolor (al primer pinchazo), atención puntual a domicilio o sin colas en sede y resultados confiables en PDF el mismo día.',
      visceralFear: 'Resultados erróneos, perder la mañana en ayunas haciendo cola o enfermeras sin experiencia en venas difíciles/niños.',
      triggerEvent: 'Salida de consulta médica con orden de análisis, chequeo pre-operatorio urgente o control de embarazo/diabetes.',
      mobileBehavior: 'Envía foto de la orden médica por WhatsApp a 2 o 3 laboratorios a la vez; contrata al primero que le da el monto total, indicaciones de ayuno y hora de visita.'
    },
    hookStoryOffer: {
      hook: 'Cuando un paciente sale del médico y envía la foto de su orden de análisis por WhatsApp, ¿cuántos minutos tarda tu laboratorio en darle el presupuesto?',
      story: 'El paciente con orden en mano cotiza en 3 laboratorios desde su celular. Si tardas 40 minutos en responder, para cuando contestas ya agendó su toma de muestra a domicilio con otro laboratorio.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para acelerar la cotización de órdenes médicas y reservas a domicilio.'
    },
    mapaVariables: { monthlyLeads: 160, avgTicketPEN: 280, baselineConvRate: 0.22, targetConvRate: 0.35, grossMargin: 0.55 }
  },

  'traumatologos': {
    slug: 'traumatologos',
    categoryName: 'Traumatólogos y Especialistas de Columna',
    icpB2B: {
      decisionMaker: 'Médico Traumatólogo y Ortopedista / Director de Centro Traumatológico',
      dailyReality: 'Consultas de lesiones articulares (rodilla, hombro, columna), infiltraciones guiadas, artroscopías y coordinación con rehabilitación física.',
      primaryBottleneck: 'Pacientes con dolor agudo o lesión deportiva que buscan cita para hoy/mañana, pero no encuentran disponibilidad clara ni seguimiento para sus procedimientos de infiltración, cirugía o terapia.',
      theBigDomino: 'Capturar al paciente en el momento de dolor agudo con agendamiento prioritario e integrar el seguimiento hacia procedimientos (infiltraciones/cirugía/rehabilitación) multiplica la facturación por paciente.',
      opportunitySwitch: 'Dejar de atender solo consultas aisladas para operar un Circuito Integral de Diagnóstico, Tratamiento y Rehabilitación Traumatológica.',
      falseBeliefs: {
        vehicle: 'Creencia: "El paciente con seguro solo se atiende en clínicas de red". Realidad: Ante listas de espera de semanas para un traumatólogo en seguro, el paciente con dolor paga consulta y procedimiento particular de inmediato.',
        internal: 'Creencia: "Estoy en quirófano y no puedo contestar". Realidad: Por eso mismo tu sistema debe recepcionar, clasificar la lesión y agendar mientras operas.',
        external: 'Creencia: "El paciente busca cualquier médico general". Realidad: Cuando se trata de rodilla, meniscos, hernia discal o fractura, exige un traumatólogo especialista.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Deportista Lesionado / Profesional con Dolor de Columna o Articulaciones',
      demographics: '25 a 68 años, deportistas de fin de semana, trabajadores con dolor lumbar/cervical y adultos mayores con artrosis.',
      burningDesire: 'Aliviar el dolor articular de inmediato, recuperar la movilidad y evitar cirugías innecesarias o recuperarse rápido.',
      visceralFear: 'Quedar con secuelas para caminar o hacer deporte, o recibir tratamientos paliativos que no resuelven la raíz de la lesión.',
      triggerEvent: 'Lesión jugando fútbol/corriendo, bloqueo lumbar agudo (ciática), caída de adulto mayor o dolor crónico de rodilla/hombro.',
      mobileBehavior: 'Busca atención urgente cerca de su distrito; valora ver la subespecialidad del doctor (rodilla, columna, hombro) y agendar en menos de 5 minutos.'
    },
    hookStoryOffer: {
      hook: 'Un paciente con lesión de rodilla o dolor agudo de columna no espera al lunes: ¿tu consultorio está capturando esas urgencias o dejándolas pasar?',
      story: 'Los fines de semana y noches concentran gran parte de las lesiones deportivas y crisis de dolor lumbar en Lima. Tener un sistema que filtre y agende al paciente en ese instante asegura la consulta y el tratamiento completo.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para optimizar la captación de pacientes particulares y tratamientos traumatológicos.'
    },
    mapaVariables: { monthlyLeads: 85, avgTicketPEN: 650, baselineConvRate: 0.16, targetConvRate: 0.26, grossMargin: 0.55 }
  },

  'locales-de-eventos': {
    slug: 'locales-de-eventos',
    categoryName: 'Locales de Eventos y Recepciones',
    icpB2B: {
      decisionMaker: 'Propietario / Gerente Comercial de Local de Eventos o Casa Hacienda',
      dailyReality: 'Visitas guiadas al local los fines de semana, coordinación con proveedores de catering/decoración y cierre de fechas para bodas, 15 años y eventos corporativos.',
      primaryBottleneck: 'Las fechas clave (viernes y sábados) son un inventario perecedero: si el equipo demora en enviar el brochure de paquetes y agendar la visita presencial al local, los novios o empresas reservan otro espacio.',
      theBigDomino: 'Automatizar el envío instantáneo del Dossier Visual por tipo de evento (Boda, Corporativo, Social) y agendar la visita guiada al local en los primeros 5 minutos duplica la tasa de fechas bloqueadas.',
      opportunitySwitch: 'Pasar de enviar PDFs pesados manualmente horas después a un Showroom Digital con Agendamiento Instantáneo de Visitas al Local.',
      falseBeliefs: {
        vehicle: 'Creencia: "El cliente tiene que llamar para que le expliquemos todo". Realidad: El cliente moderno primero quiere ver fotos reales, aforo y rangos de inversión en su celular antes de agendar visita.',
        internal: 'Creencia: "Publicar información atrae a la competencia". Realidad: Un flujo que califica fecha, tipo de evento y número de invitados protege tu información y filtra solo prospectos reales.',
        external: 'Creencia: "La gente reserva con un año de anticipación sin prisa". Realidad: Cuando una pareja o empresa decide buscar local, visita los primeros 3 que le responden y cierra en esa misma semana.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Novios / Anfitriones de Celebración y RR.HH. de Empresas',
      demographics: '26 a 55 años, parejas próximas a casarse, padres organizando 15 años/aniversarios y áreas de RR.HH./Marketing corporativo.',
      burningDesire: 'Un evento impecable, elegante y seguro donde sus invitados queden impresionados y todo funcione sin contratiempos.',
      visceralFear: 'Que el local luzca distinto a las fotos, problemas con licencias municipales/ruido, mal servicio de baños o estacionamiento inseguro.',
      triggerEvent: 'Compromiso matrimonial, aniversario, fiesta de fin de año corporativa o lanzamiento empresarial.',
      mobileBehavior: 'Explora fotos y videos en el celular en pareja por la noche; solicita cotización según cantidad de invitados (50, 100, 200+) y pide cita para conocer el local.'
    },
    hookStoryOffer: {
      hook: 'Cada sábado que tu local de eventos queda sin reservar es facturación que jamás se recupera: ¿cuántas visitas presenciales estás perdiendo por responder tarde?',
      story: 'En el rubro de eventos, la venta se cierra cuando el cliente pisa el local y se imagina su celebración ahí. Nuestro sistema automatiza la calificación por aforo/fecha y agenda la visita guiada en segundos.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para llenar tu calendario de fechas y eventos todo el año.'
    },
    mapaVariables: { monthlyLeads: 70, avgTicketPEN: 4500, baselineConvRate: 0.08, targetConvRate: 0.14, grossMargin: 0.50 }
  },

  // ============================================================================
  // TIER 2: PODER ADQUISITIVO MEDIO-ALTO / PROYECTOS Y SERVICIOS PROFESIONALES
  // ============================================================================

  'camaras-de-seguridad': {
    slug: 'camaras-de-seguridad',
    categoryName: 'Instalación de Cámaras y Seguridad Electrónica',
    icpB2B: {
      decisionMaker: 'Gerente Técnico / Dueño de Empresa Integradora de Seguridad Electrónica (CCTV/Alarmas)',
      dailyReality: 'Instalaciones en campo, cableado estructurado, configuración de DVR/NVR y cotizaciones para condominios, almacenes y negocios.',
      primaryBottleneck: 'Demora en cotizar kits de 4, 8 o 16 cámaras cuando el cliente acaba de sufrir un robo o incidente en su cuadra, perdiendo el proyecto frente a quien envía la proforma al instante.',
      theBigDomino: 'Clasificar automáticamente la necesidad (hogar, negocio o edificio), número de puntos y entregar una pre-cotización con visita técnica agendada cierra al cliente antes de que siga buscando.',
      opportunitySwitch: 'Pasar de armar cotizaciones desde cero por la noche a un Cotizador Rápido de Proyectos CCTV con Visita Técnica Automatizada.',
      falseBeliefs: {
        vehicle: 'Creencia: "La gente compra cámaras baratas en internet". Realidad: Las empresas, juntas de propietarios y comercios buscan instalación profesional con garantía, tubería limpia y visualización móvil configurada.',
        internal: 'Creencia: "Estoy subido en la escalera instalando, no puedo responder". Realidad: Tu sistema atiende y agenda las nuevas visitas mientras tú ejecutas la obra actual.',
        external: 'Creencia: "Solo cotizan por comparar". Realidad: Quien busca cámaras suele tener urgencia real de seguridad; compra a quien le transmite mayor respaldo técnico.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Presidente de Junta de Propietarios / Dueño de Comercio o Vivienda',
      demographics: '30 a 65 años, administradores de edificios, dueños de tiendas/almacenes y padres de familia en Lima.',
      burningDesire: 'Vigilar su negocio, casa o condominio en alta definición desde su celular las 24 horas con grabación continua.',
      visceralFear: 'Que las cámaras fallen justo el día de un robo, o meter a su casa técnicos desconocidos sin antecedentes verificables.',
      triggerEvent: 'Robo o intento de robo en la zona, apertura de local comercial, cambio de directiva en edificio o contratación de nuevo personal.',
      mobileBehavior: 'Busca paquetes claros (4, 8, 16 cámaras Hikvision/Dahua), garantía de instalación y respuesta inmediata por WhatsApp.'
    },
    hookStoryOffer: {
      hook: 'Cuando ocurre un incidente de seguridad en un negocio o condominio, el cliente contrata al instalador que le cotiza hoy mismo: ¿cuántas obras estás dejando pasar?',
      story: 'Mientras estás en plena instalación técnica, entran consultas de juntas de propietarios y empresas pidiendo cotizar 8 o 16 cámaras. Si respondes a las 8:00 PM, otro instalador ya agendó la inspección.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para automatizar la pre-cotización de kits CCTV y el agendamiento de visitas técnicas.'
    },
    mapaVariables: { monthlyLeads: 65, avgTicketPEN: 2200, baselineConvRate: 0.12, targetConvRate: 0.20, grossMargin: 0.45 }
  },

  'catering': {
    slug: 'catering',
    categoryName: 'Servicios de Catering y Buffet para Eventos',
    icpB2B: {
      decisionMaker: 'Chef Ejecutivo / Director de Empresa de Catering y Eventos',
      dailyReality: 'Compras de insumos, producción gastronómica en cocina, logística de menaje/mozos y atención de degustaciones.',
      primaryBottleneck: 'Clientes corporativos y novios que piden cotización para 50 a 300 personas y tardan más de 24 horas en recibir las opciones de menú/coffee break, enfriando la venta.',
      theBigDomino: 'Entregar al instante los paquetes gastronómicos segmentados por tipo de evento (Corporativo vs. Boda/Social) y agendar una degustación o llamada de cierre acelera la contratación.',
      opportunitySwitch: 'Dejar de redactar correos manuales lentos y pasar a un Catálogo Gastronómico Interactivo con Pre-Cotización por Invitado.',
      falseBeliefs: {
        vehicle: 'Creencia: "Cada evento es único y no se puede estandarizar el primer contacto". Realidad: El 90% de prospectos necesita primero ver 3 niveles de menú/buffet para validar presupuesto antes de personalizar platos.',
        internal: 'Creencia: "En días de evento nadie puede ver el WhatsApp". Realidad: Los viernes y sábados es cuando más clientes futuros buscan proveedores.',
        external: 'Creencia: "Las empresas siempre compran al mismo proveedor". Realidad: Los asistentes de gerencia y RR.HH. rotan constantemente y buscan proveedores de catering que respondan rápido y emitan factura sin trabas.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Coordinadora de Eventos Corporativos (RR.HH.) y Anfitrión Social',
      demographics: '26 a 55 años, ejecutivos de empresas en San Isidro/Miraflores/Surco y familias organizando bodas o recepciones.',
      burningDesire: 'Comida deliciosa, abundante, servida caliente y a tiempo, con presentación impecable que deje en alto al anfitrión.',
      visceralFear: 'Que la comida no alcance, llegue fría, que los mozos tengan mala presencia o que el proveedor falle el mismo día del evento.',
      triggerEvent: 'Capacitación/directorio empresarial, desayuno corporativo, aniversario, boda o celebración familiar.',
      mobileBehavior: 'Necesita ver fotos reales del montaje, opciones por persona y cotización formal en PDF en el menor tiempo posible.'
    },
    hookStoryOffer: {
      hook: '¿Cuántos eventos corporativos y bodas de S/ 5,000+ se enfrían cada mes porque tu equipo está en cocina y demora un día entero en enviar la cotización?',
      story: 'Cuando una empresa o pareja cotiza catering para 100 invitados, quiere ver opciones y precios de inmediato. Si automatizas la calificación por número de personas y fecha, agendas la degustación antes que tu competencia.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para sistematizar tus cotizaciones y cierres de catering.'
    },
    mapaVariables: { monthlyLeads: 50, avgTicketPEN: 4800, baselineConvRate: 0.10, targetConvRate: 0.17, grossMargin: 0.42 }
  },

  'fotografia-eventos': {
    slug: 'fotografia-eventos',
    categoryName: 'Fotografía Profesional y Bodas',
    icpB2B: {
      decisionMaker: 'Fotógrafo Principal / Director de Estudio Audiovisual',
      dailyReality: 'Sesiones fotográficas en locación, cobertura de eventos los fines de semana y largas jornadas editando fotos y video en Lightroom/Premiere.',
      primaryBottleneck: 'La paradoja del fotógrafo: carecer de un portafolio web propio ultrarrápido (dependiendo solo de redes sociales donde las fotos pierden calidad) y demorar en enviar paquetes mientras edita o cubre un evento.',
      theBigDomino: 'Un Showroom Audiovisual propio unido a la entrega inmediata de paquetes de cobertura y verificación de disponibilidad de fecha convierte la emoción visual en contratos con adelanto pagado.',
      opportunitySwitch: 'Pasar de mandar links sueltos de Drive/Instagram a operar un Showroom Audiovisual con Reserva de Fecha Automatizada.',
      falseBeliefs: {
        vehicle: 'Creencia: "Con mi perfil de Instagram me basta". Realidad: En Instagram el cliente se distrae y no ve galerías completas por tipo de evento ni paquetes claros.',
        internal: 'Creencia: "No sé mantener una página web". Realidad: Tu portafolio se estructura una sola vez con tus mejores sesiones y vende por ti 24/7.',
        external: 'Creencia: "Los clientes solo buscan al fotógrafo más barato". Realidad: En bodas, 15 años y eventos corporativos, el cliente paga más a quien le muestra un portafolio profesional que le garantiza que no arruinará un recuerdo irrepetible.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Novios / Quinceañeras y Marcas Corporativas',
      demographics: '24 a 50 años, parejas comprometidas, familias y encargados de comunicación corporativa.',
      burningDesire: 'Fotografías y películas emotivas en alta calidad, entregadas en la fecha pactada, que capturen los mejores momentos.',
      visceralFear: 'Que el fotógrafo pierda los archivos, entregue las fotos 6 meses tarde o tome fotos oscuras y mal encuadradas.',
      triggerEvent: 'Reserva de iglesia/local de recepción, evento corporativo, graduación o sesión de marca personal.',
      mobileBehavior: 'Decide 100% por impacto visual en los primeros 10 segundos; quiere ver el portafolio, consultar si su fecha está libre y conocer los paquetes.'
    },
    hookStoryOffer: {
      hook: 'Tu trabajo es 100% visual, pero ¿estás intentando cerrar contratos de S/ 2,500+ enviando a tus clientes a un link genérico o tardando horas en responder?',
      story: 'Mientras estás cubriendo un evento el sábado, otras parejas están buscando fotógrafo para su boda. Si no tienes un showroom web y un asistente que verifique tu fecha y envíe tu dossier al instante, pierdes la reserva.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para convertir tu portafolio en un sistema de reserva de fechas.'
    },
    mapaVariables: { monthlyLeads: 55, avgTicketPEN: 2200, baselineConvRate: 0.10, targetConvRate: 0.18, grossMargin: 0.65 }
  },

  'vidrierias': {
    slug: 'vidrierias',
    categoryName: 'Vidrierías y Mamparas de Vidrio Templado',
    icpB2B: {
      decisionMaker: 'Maestro Vidriero / Gerente de Empresa de Cristales y Aluminio',
      dailyReality: 'Corte e instalación de mamparas de vidrio templado, duchas españolas, ventanas acústicas/sistema Nova y atención a constructoras o remodelaciones.',
      primaryBottleneck: 'Clientes que envían medidas aproximadas por WhatsApp para cotizar mamparas o duchas, pero el dueño está instalando en obra y responde al día siguiente cuando el cliente ya cerró con otra vidriería.',
      theBigDomino: 'Recoger automáticamente las medidas preliminares, tipo de cristal (templado/laminado/acústico) y distrito en el primer mensaje permite cotizar en minutos y asegurar la visita de rectificación de medidas.',
      opportunitySwitch: 'Pasar de anotar medidas en papel a un Cotizador Digital de Mamparas y Cristales con Agendamiento de Medición.',
      falseBeliefs: {
        vehicle: 'Creencia: "La vidriería solo vende a los que pasan por la calle". Realidad: Los proyectos más rentables (mamparas templadas, ventanas acústicas, oficinas) se buscan en Google desde distritos residenciales.',
        internal: 'Creencia: "No puedo dar precio sin ir a medir". Realidad: Puedes dar un presupuesto referencial por metro cuadrado/modelo que filtre al cliente real antes de gastar gasolina en ir a medir.',
        external: 'Creencia: "El cliente no sabe tomar medidas". Realidad: Con una guía simple en WhatsApp, el cliente envía ancho × alto aproximado y una foto del espacio.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Propietario en Remodelación / Arquitecto e Ingeniero Residente',
      demographics: '28 a 60 años, dueños de departamentos nuevos/remodelados y contratistas en Lima.',
      burningDesire: 'Mamparas y duchas de vidrio templado seguras, herméticas, con accesorios de acero inoxidable que duren años.',
      visceralFear: 'Vidrio falso (crudo en vez de templado) que pueda explotar, filtraciones de agua en el baño o retrasos de semanas tras dar el adelanto.',
      triggerEvent: 'Entrega de departamento nuevo, remodelación de baño/terraza, ruido excesivo de la calle o rotura de cristal.',
      mobileBehavior: 'Envía foto de su baño o balcón con medidas aproximadas por WhatsApp esperando precio referencial y tiempo de instalación.'
    },
    hookStoryOffer: {
      hook: '¿Cuántos proyectos de mamparas y duchas de vidrio templado pierdes a la semana por no poder cotizar mientras estás instalando en obra?',
      story: 'El propietario que acaba de recibir su departamento quiere instalar sus mamparas ya. Si tu sistema le pide ancho, alto y foto del área en automático, cuando terminas de instalar ya tienes la cotización lista para cerrar.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para captar más obras de vidrio templado y aluminio.'
    },
    mapaVariables: { monthlyLeads: 70, avgTicketPEN: 1800, baselineConvRate: 0.12, targetConvRate: 0.22, grossMargin: 0.42 }
  },

  'carpinteros': {
    slug: 'carpinteros',
    categoryName: 'Carpintería y Muebles de Melamina a Medida',
    icpB2B: {
      decisionMaker: 'Maestro Mueblista / Dueño de Taller de Melamina y Carpintería',
      dailyReality: 'Despiece, corte, armado e instalación de cocinas integrales (reposteros), clósets empotrados, centros de entretenimiento y mobiliario de oficina.',
      primaryBottleneck: 'Desconfianza inicial del cliente limeño ante carpinteros informales que incumplen fechas, sumada a la demora en atender cotizaciones de cocinas y clósets de alto valor.',
      theBigDomino: 'Proyectar formalidad absoluta con un catálogo real de proyectos entregados, acabados (Pelíkano/Novopan, herrajes cierre lento) y agendamiento de visita de diseño 3D permite cobrar mejor y cerrar proyectos de S/ 3,000 a S/ 12,000.',
      opportunitySwitch: 'Dejar de ser visto como un carpintero eventual y posicionarse como un Estudio de Mobiliario y Cocinas a Medida con Garantía de Entrega.',
      falseBeliefs: {
        vehicle: 'Creencia: "La gente prefiere comprar muebles armados en tiendas por departamento". Realidad: Para cocinas, clósets a medida y espacios reducidos, el cliente necesita fabricación personalizada.',
        internal: 'Creencia: "En el taller hay mucho ruido y polvo para atender el celular". Realidad: Un asistente digital captura las medidas, fotos de referencia y distrito del cliente sin que tengas que parar la máquina.',
        external: 'Creencia: "Todos regatean el precio de la melamina". Realidad: Regatean cuando no perciben diferencia entre tu taller y un informal; cuando ven garantía escrita y catálogo, pagan por seguridad.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Propietario de Departamento Nuevo / Remodelación de Cocina',
      demographics: '27 a 58 años, parejas jóvenes y familias equipando o renovando su vivienda en Lima.',
      burningDesire: 'Una cocina moderna o clóset funcional que aproveche cada centímetro, entregado exactamente en la fecha prometida.',
      visceralFear: 'El clásico terror limeño: dar el 50% de adelanto al carpintero y que desaparezca, entregue meses tarde o use melamina delgada que se pandea.',
      triggerEvent: 'Entrega de departamento en estreno, renovación de cocina antigua o llegada de un nuevo integrante a la familia.',
      mobileBehavior: 'Tiene fotos guardadas de Pinterest/Instagram; busca un taller con taller físico verificable, reseñas reales y atención formal.'
    },
    hookStoryOffer: {
      hook: 'En Lima, el cliente que quiere hacer su cocina o clóset está dispuesto a pagar bien, pero teme a la informalidad: ¿qué imagen proyecta hoy tu negocio en internet?',
      story: 'Los proyectos de cocinas integrales y clósets superan fácilmente los S/ 3,500. Quien presenta un catálogo web formal y responde en minutos con un flujo ordenado de cotización se queda con los mejores clientes.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para captar proyectos de mobiliario y cocinas a medida de alto margen.'
    },
    mapaVariables: { monthlyLeads: 65, avgTicketPEN: 2800, baselineConvRate: 0.10, targetConvRate: 0.18, grossMargin: 0.45 }
  },

  'mudanzas': {
    slug: 'mudanzas',
    categoryName: 'Empresas de Mudanzas y Fletes',
    icpB2B: {
      decisionMaker: 'Gerente / Propietario de Empresa de Mudanzas y Transporte',
      dailyReality: 'Coordinación de camiones furgón, cuadrillas de embalaje/estiba, permisos municipales y rutas en Lima.',
      primaryBottleneck: 'Cotizar una mudanza requiere conocer distrito de origen, destino, piso, uso de ascensor/poleas e inventario de muebles; hacerlo manualmente por chat toma demasiado tiempo y el cliente reserva con quien le da precio primero.',
      theBigDomino: 'Un formulario/asistente de pre-inventario en WhatsApp que recolecta automáticamente origen, destino, pisos y lista de bienes permite entregar una cotización cerrada en 10 minutos sin sorpresas.',
      opportunitySwitch: 'Pasar de preguntas interminables por chat a un Cotizador Rápido de Inventario y Ruta de Mudanza.',
      falseBeliefs: {
        vehicle: 'Creencia: "El cliente prefiere el camión informal de la esquina". Realidad: Para mudar muebles de valor, línea blanca o una oficina, el cliente exige camión cerrado y personal de confianza.',
        internal: 'Creencia: "Es imposible cotizar rápido sin ver los muebles". Realidad: Pidiendo 4 datos clave y un video corto de los ambientes por WhatsApp, tienes el 95% de precisión en minutos.',
        external: 'Creencia: "Las mudanzas solo salen a fin de mes". Realidad: Aunque hay pico a fin de mes, quien capta las reservas con 2 semanas de anticipación optimiza toda la flota del mes.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Familia en Traslado de Departamento y Administración de Oficina',
      demographics: '26 a 55 años, inquilinos o propietarios mudándose en Lima Metropolitana.',
      burningDesire: 'Que sus muebles, refrigeradora, TV y objetos frágiles lleguen intactos en un solo día, sin estrés ni cobros extras a mitad de la mudanza.',
      visceralFear: 'Rayones o roturas de electrodomésticos, pérdidas de cajas o que los estibadores exijan más dinero al llegar al edificio.',
      triggerEvent: 'Vencimiento de contrato de alquiler, entrega de departamento nuevo o traslado de local comercial.',
      mobileBehavior: 'Cotiza con 3 empresas de mudanzas 5 a 15 días antes de su fecha; contrata a la que responde rápido, detalla qué incluye (embalaje, estiba, camión cerrado) y da garantía.'
    },
    hookStoryOffer: {
      hook: '¿Cuánto tiempo pierdes chateando para sacarle al cliente de qué piso a qué piso se muda, mientras otra empresa ya le envió la cotización cerrada?',
      story: 'El cliente que se muda está estresado. Si tu WhatsApp le solicita en 1 minuto origen, destino, pisos y lista rápida de muebles, puedes cotizar y cerrar la reserva del camión en tiempo récord.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para automatizar la cotización y reserva de mudanzas.'
    },
    mapaVariables: { monthlyLeads: 90, avgTicketPEN: 950, baselineConvRate: 0.14, targetConvRate: 0.24, grossMargin: 0.45 }
  },

  'fumigacion': {
    slug: 'fumigacion',
    categoryName: 'Empresas de Fumigación y Control de Plagas',
    icpB2B: {
      decisionMaker: 'Gerente / Ingeniero Sanitario de Empresa de Saneamiento Ambiental',
      dailyReality: 'Desinsectación, desratización, desinfección y limpieza de cisternas/reservorios con emisión de certificados oficiales (DIRIS/MINSA).',
      primaryBottleneck: 'Dos fugas críticas: 1) No responder en menos de 5 minutos al dueño de restaurante/local que tiene una inspección municipal inminente, y 2) Olvidar avisar a los clientes antiguos 15 días antes de que venza su certificado semestral.',
      theBigDomino: 'Responder al instante las urgencias de certificación municipal y automatizar el aviso de renovación cada 5.5 meses convierte a cada cliente nuevo en una renta vitalicia dos veces al año.',
      opportunitySwitch: 'Dejar de buscar clientes desde cero cada mes y activar un Motor de Renovación Automática de Certificados de Fumigación.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los locales solo fumigan cuando los multan". Realidad: Todo comercio formal en Lima está obligado a renovar su certificado periódicamente para mantener su licencia y pasar fiscalización.',
        internal: 'Creencia: "Llevamos los vencimientos en un Excel". Realidad: Un Excel no envía recordatorios automáticos por WhatsApp 15 días antes del vencimiento para agendar la cuadrilla.',
        external: 'Creencia: "Cualquier fumigador entrega certificado". Realidad: Los comercios necesitan empresas autorizadas por MINSA/DIRIS con resolución vigente visible en su web.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Dueño de Restaurante/Comercio con Fiscalización Municipal y Administrador de Condominio',
      demographics: '28 a 60 años, propietarios de restaurantes, almacenes, colegios, clínicas y administradores de edificios.',
      burningDesire: 'Eliminar la plaga de raíz sin interrumpir su negocio y obtener su Certificado Oficial de Saneamiento Ambiental válido ante la municipalidad hoy mismo.',
      visceralFear: 'Clausura municipal del local por certificado vencido, presencia de plagas frente a clientes o químicos tóxicos mal aplicados.',
      triggerEvent: 'Operativo de fiscalización municipal en la zona, vencimiento del certificado semestral o avistamiento de cucarachas/roedores.',
      mobileBehavior: 'Busca "fumigación con certificado municipal + distrito", pide precio por metraje (m²) y disponibilidad para atención hoy o en horario nocturno.'
    },
    hookStoryOffer: {
      hook: 'Todo certificado de fumigación vence a los 6 meses: ¿tienes un sistema que reactive automáticamente al 100% de tu cartera antes de que llamen a otro proveedor?',
      story: 'En saneamiento ambiental, el verdadero negocio no es fumigar una sola vez, sino retener a cada restaurante, almacén y edificio en cada renovación semestral, además de responder en minutos las urgencias de fiscalización.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para automatizar la captación por metraje y la renovación semestral de certificados.'
    },
    mapaVariables: { monthlyLeads: 75, avgTicketPEN: 650, baselineConvRate: 0.18, targetConvRate: 0.30, grossMargin: 0.55 }
  },

  'talleres-mecanicos': {
    slug: 'talleres-mecanicos',
    categoryName: 'Talleres Mecánicos Automotrices',
    icpB2B: {
      decisionMaker: 'Propietario / Jefe de Taller Mecánico Multimarcas o Especializado',
      dailyReality: 'Diagnóstico con escáner, mantenimiento por kilometraje, frenos, suspensión, embrague, planchado y pintura, y compra de repuestos.',
      primaryBottleneck: 'El jefe de taller tiene las manos ocupadas supervisando los elevadores y no contesta las consultas de WhatsApp, además de no enviar recordatorios automáticos cuando al cliente le toca su siguiente cambio de aceite/mantenimiento (cada 5,000 km o 6 meses).',
      theBigDomino: 'Un sistema que agenda citas de diagnóstico en minutos y avisa automáticamente a cada propietario cuando se cumple su ciclo de mantenimiento preventivo mantiene las bahías del taller llenas de lunes a sábado.',
      opportunitySwitch: 'Pasar de esperar a que el auto se malogre a operar un Sistema de Mantenimiento Preventivo Programado y Diagnóstico con Cita.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los dueños de autos solo van al concesionario o al mecánico de barrio". Realidad: Tan pronto vence la garantía del concesionario (carísimo), el dueño busca un taller formal multimarca que le dé confianza y factura/boleta.',
        internal: 'Creencia: "No puedo dar presupuesto sin desarmar". Realidad: Puedes vender el paquete de mantenimiento preventivo o el diagnóstico computarizado a precio fijo como puerta de entrada.',
        external: 'Creencia: "El cliente se acuerda solo de su cambio de aceite". Realidad: El 70% se pasa de kilometraje; un mensaje oportuno de tu taller lo trae de vuelta de inmediato.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Conductor Particular / Dueño de Camioneta o Sedán Moderno',
      demographics: '26 a 60 años, profesionales, padres de familia y conductores de flota en Lima.',
      burningDesire: 'Un taller honesto que diagnostique con precisión, use repuestos originales/garantizados, cumpla la hora de entrega y no infle el presupuesto.',
      visceralFear: 'Que le cambien piezas buenas de su auto, que le cobren repuestos nuevos poniendo usados o que el carro quede con la misma falla.',
      triggerEvent: 'Luz de Check Engine en el tablero, ruido al frenar, vencimiento de revisión técnica o cumplimiento de los 5,000 / 10,000 km.',
      mobileBehavior: 'Revisa fotos de las instalaciones del taller, reseñas en Google Maps y escribe por WhatsApp indicando marca, modelo, año y síntoma del vehículo.'
    },
    hookStoryOffer: {
      hook: '¿Cuántos dueños de vehículos prefieren tu taller sobre el concesionario, pero terminan yendo a otro lado porque nadie les respondió el WhatsApp a tiempo?',
      story: 'Cuando a un conductor se le enciende el Check Engine o le toca mantenimiento de 20,000 km, busca un taller que le transmita orden y garantía. Automatizar la recepción por marca/modelo y el recordatorio semestral llena tus bahías.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para llenar la agenda de tu taller mecánico y fidelizar tu cartera.'
    },
    mapaVariables: { monthlyLeads: 85, avgTicketPEN: 750, baselineConvRate: 0.16, targetConvRate: 0.26, grossMargin: 0.45 }
  },

  'pediatras': {
    slug: 'pediatras',
    categoryName: 'Pediatras y Especialistas Infantiles',
    icpB2B: {
      decisionMaker: 'Médico Pediatra / Director de Consultorio Pediátrico',
      dailyReality: 'Control de niño sano (CRED), esquema de vacunación, urgencias respiratorias/digestivas y orientación constante a padres primerizos.',
      primaryBottleneck: 'Los padres buscan pediatra en momentos de alta ansiedad (fiebre nocturna o fin de semana) o para el control mensual de su bebé; si el consultorio no responde rápido ni recuerda el calendario de controles/vacunas, pierden la continuidad del paciente.',
      theBigDomino: 'Combinar una recepción digital inmediata para urgencias ambulatorias con recordatorios automáticos del calendario de control de niño sano y vacunas asegura años de atención recurrente por cada niño.',
      opportunitySwitch: 'Pasar de agendar citas sueltas a un Sistema de Seguimiento de Crecimiento Infantil y Citas Prioritarias.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los padres ya saben cuándo les toca control". Realidad: Entre el trabajo y el cuidado del bebé, agradecen enormemente que el consultorio les recuerde el control del mes y reserve su turno.',
        internal: 'Creencia: "Me van a escribir de madrugada por emergencias". Realidad: El flujo automático distingue horarios de consultorio y deriva emergencias severas a clínica/urgencias mientras agenda la consulta del primer turno de la mañana.',
        external: 'Creencia: "Solo buscan pediatra por seguro". Realidad: Los padres no escatiman en pagar consulta particular cuando se trata de su hijo y quieren atención sin esperas.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Padres Primerizos y Familias con Niños Pequeños',
      demographics: '24 a 42 años, madres y padres preocupados por el desarrollo y salud de sus hijos.',
      burningDesire: 'Un pediatra paciente, empático, actualizado y accesible que revise a su hijo con detenimiento y explique todo con claridad.',
      visceralFear: 'Fiebres altas sin diagnóstico claro, salas de espera llenas de contagios o médicos que atienden en 5 minutos sin empatía.',
      triggerEvent: 'Fiebre, tos/alergia, inicio de alimentación complementaria (6 meses), control mensual de peso/talla o vacunas.',
      mobileBehavior: 'Las madres y padres leen cada reseña de otros padres en Google y reservan por WhatsApp donde les confirman el turno más próximo.'
    },
    hookStoryOffer: {
      hook: 'Cuando un padre primerizo busca un pediatra de cabecera para su bebé, ¿tu consultorio le facilita agendar en minutos y le acompaña en cada control mensual?',
      story: 'Un paciente pediátrico bien fidelizado acompaña al consultorio durante años en controles de niño sano y vacunas. Ordenar la recepción digital y los recordatorios mensuales evita fugas y cancelaciones.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para optimizar la agenda y el seguimiento de familias en tu consultorio pediátrico.'
    },
    mapaVariables: { monthlyLeads: 95, avgTicketPEN: 250, baselineConvRate: 0.22, targetConvRate: 0.34, grossMargin: 0.65 }
  },

  'fisioterapia': {
    slug: 'fisioterapia',
    categoryName: 'Centros de Fisioterapia y Rehabilitación',
    icpB2B: {
      decisionMaker: 'Licenciado Tecnólogo Médico en Terapia Física / Director de Centro de Rehabilitación',
      dailyReality: 'Atención en camilla por turnos de 45–60 minutos, aplicación de agentes físicos, terapia manual y ejercicios terapéuticos.',
      primaryBottleneck: 'Dos problemas graves: 1) Mientras los fisioterapeutas tienen las manos ocupadas con pacientes, nadie contesta rápido el WhatsApp, y 2) Muchos pacientes toman 1 o 2 sesiones sueltas y abandonan en cuanto les baja el dolor agudo, en vez de adquirir paquetes completos de 6 a 12 sesiones.',
      theBigDomino: 'Estructurar el ingreso mediante una Evaluación Funcional que derive en paquetes de rehabilitación de 6/10 sesiones con agendamiento recurrente y control de asistencia duplica los ingresos y la recuperación real del paciente.',
      opportunitySwitch: 'Dejar de vender sesiones sueltas con huecos en la agenda y pasar a Programas Completos de Rehabilitación con Asistencia Confirmada.',
      falseBeliefs: {
        vehicle: 'Creencia: "La gente no quiere pagar paquetes por adelantado". Realidad: Cuando el paciente entiende el plan de recuperación por fases y recibe un beneficio por el paquete de 6 o 10 sesiones, se compromete con su tratamiento.',
        internal: 'Creencia: "No tenemos recepcionista a tiempo completo". Realidad: Un asistente digital responde dudas de costos/horarios, filtra la lesión y pre-agenda la evaluación inicial mientras atiendes en camilla.',
        external: 'Creencia: "El paciente falta porque se olvida". Realidad: Los recordatorios automáticos 24h antes con política de reprogramación reducen drásticamente las camillas vacías.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Paciente Post-Operatorio, Oficinista con Contractura/Hernia o Deportista',
      demographics: '25 a 70 años, personas con dolor muscular/articular, lesiones deportivas o rehabilitación post-fractura/cirugía.',
      burningDesire: 'Volver a caminar, trabajar o entrenar sin dolor, atendido por fisioterapeutas titulados y con equipos modernos.',
      visceralFear: 'Que le pongan solo compresas calientes y corriente dejándolo solo, o que una mala manipulación empeore su lesión.',
      triggerEvent: 'Orden médica del traumatólogo, contractura aguda de cuello/espalda, esguince o dolor ciático que le impide dormir.',
      mobileBehavior: 'Busca un centro cercano a su casa u oficina (o a domicilio), verifica precios por sesión/paquete y pide turno para hoy mismo.'
    },
    hookStoryOffer: {
      hook: 'Mientras tus manos están ocupadas rehabilitando a un paciente en camilla, ¿cuántas evaluaciones y paquetes de 10 sesiones estás perdiendo en WhatsApp?',
      story: 'La rentabilidad de un centro de fisioterapia depende de dos factores: responder al instante cuando el paciente tiene dolor agudo y lograr que complete su paquete de sesiones sin abandonar a la segunda cita.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para llenar tus camillas y aumentar la venta de paquetes de rehabilitación.'
    },
    mapaVariables: { monthlyLeads: 80, avgTicketPEN: 600, baselineConvRate: 0.16, targetConvRate: 0.28, grossMargin: 0.55 }
  },

  'veterinarias': {
    slug: 'veterinarias',
    categoryName: 'Veterinarias y Clínicas de Mascotas',
    icpB2B: {
      decisionMaker: 'Médico Veterinario Propietario / Administrador de Clínica Veterinaria',
      dailyReality: 'Consultas médicas, cirugías, internamiento, baño/grooming, venta de alimento/farmacia y atención de emergencias.',
      primaryBottleneck: 'Desaprovechar la recurrencia natural de cada mascota (desparasitación trimestral, vacunas anuales, antipulgas mensual y baño cada 3 semanas) por no tener recordatorios automatizados en WhatsApp, además de perder urgencias médicas por demora en recepción.',
      theBigDomino: 'Triar automáticamente las consultas (Emergencia Médica vs. Consulta/Vacuna vs. Baño/Grooming) y automatizar el calendario preventivo de cada mascota multiplica la recurrencia mensual sin gastar más en anuncios.',
      opportunitySwitch: 'Pasar de esperar a que el dueño traiga a su mascota enferma a operar un Club/Calendario Automatizado de Salud y Grooming Preventivo.',
      falseBeliefs: {
        vehicle: 'Creencia: "Le anotamos la fecha en el carnet físico de vacunas". Realidad: El dueño guarda el carnet en un cajón y olvida la fecha; un mensaje automático a su WhatsApp lo hace agendar en 1 clic.',
        internal: 'Creencia: "La recepción no se da abasto entre cobrar y recibir perros". Realidad: Un flujo de agendamiento previo para baños/recojo a domicilio y consultas ordena la jornada desde la mañana.',
        external: 'Creencia: "La gente busca la veterinaria más barata". Realidad: Para la familia moderna en Lima, la mascota es un hijo más; buscan trato amoroso, limpieza impecable y médicos colegiados (CMVP).'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Dueño "Pet Lover" de Perro o Gato en Lima',
      demographics: '22 a 55 años, familias y jóvenes profesionales que consideran a su mascota parte central de su familia.',
      burningDesire: 'Que su mascota esté sana, limpia y segura en manos de veterinarios que la traten con cariño y profesionalismo.',
      visceralFear: 'Negligencia en cirugías/anestesia, maltrato durante el baño/grooming o contagio de enfermedades en el local.',
      triggerEvent: 'Mascota decaída/vómitos (urgencia), cachorro nuevo (vacunas), necesidad de baño/corte de pelo o esterilización.',
      mobileBehavior: 'Revisa las reseñas en Google Maps con lupa antes de confiar a su mascota; necesita botón directo para emergencias y reservas de baño.'
    },
    hookStoryOffer: {
      hook: 'Cada mascota que entra a tu veterinaria necesita vacunas, antipulgas y baños todo el año: ¿cuántos ingresos recurrentes pierdes por no automatizar sus recordatorios en WhatsApp?',
      story: 'El carnet de cartón se queda olvidado en un cajón. Cuando tu clínica veterinaria automatiza la recepción 24/7 y los recordatorios de vacunas, desparasitación y grooming, tus clientes regresan puntualmente cada mes.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para automatizar las citas y el calendario de recurrencia de tu veterinaria.'
    },
    mapaVariables: { monthlyLeads: 130, avgTicketPEN: 220, baselineConvRate: 0.25, targetConvRate: 0.38, grossMargin: 0.50 }
  },

  'psicologos': {
    slug: 'psicologos',
    categoryName: 'Psicólogos y Terapeutas',
    icpB2B: {
      decisionMaker: 'Psicólogo Clínico / Psicoterapeuta o Director de Centro Psicológico',
      dailyReality: 'Sesiones de terapia individual, de pareja o infantil de 50 minutos (presenciales y online) y elaboración de informes psicológicos.',
      primaryBottleneck: 'Cuando una persona finalmente toma el valor de buscar terapia psicológica, está en un pico emocional que dura pocas horas; si el centro tarda medio día en responder porque el terapeuta está en sesión, el paciente se arrepiente o agenda con otro profesional.',
      theBigDomino: 'Brindar una respuesta cálida, confidencial e inmediata en menos de 2 minutos que oriente según el motivo de consulta (ansiedad, pareja, niños) y permita reservar el primer turno mientras el terapeuta sigue en sesión.',
      opportunitySwitch: 'Pasar de contestar mensajes entre sesiones con prisa a una Recepción Terapéutica Confidencial y Empática 24/7.',
      falseBeliefs: {
        vehicle: 'Creencia: "La psicología requiere que yo mismo conteste el primer saludo". Realidad: Si contestas 5 horas tarde porque estabas en consulta, el paciente sintió abandono antes de empezar.',
        internal: 'Creencia: "Mis pacientes agendan semana a semana de palabra". Realidad: Las cancelaciones de último minuto y el abandono a la 2da sesión caen drásticamente con recordatorios y paquetes de 4 sesiones.',
        external: 'Creencia: "La gente no confía en agendar terapia por internet". Realidad: El 90% prefiere escribir por WhatsApp de forma discreta antes que llamar por teléfono frente a otras personas.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Adulto Joven con Ansiedad/Estrés, Pareja en Crisis o Padres de Niño en Edad Escolar',
      demographics: '22 a 50 años, profesionales, parejas y padres de familia en Lima (modalidad presencial o virtual).',
      burningDesire: 'Sentirse escuchado sin juicios, recuperar su paz mental o resolver conflictos de pareja/familia con herramientas prácticas.',
      visceralFear: 'Falta de confidencialidad, no conectar con el terapeuta o sentir que las sesiones no tienen estructura ni avance.',
      triggerEvent: 'Crisis de ansiedad/insomnio, ruptura o discusión fuerte de pareja, o solicitud de evaluación psicológica del colegio.',
      mobileBehavior: 'Busca en privado (muchas veces de noche); necesita ver el enfoque del psicólogo (TCC, sistémico, infantil), colegiatura (CPSp) y agendar sin fricción.'
    },
    hookStoryOffer: {
      hook: 'Dar el paso de escribir a un psicólogo cuesta mucho valor: si tardas 4 horas en responder porque estás en sesión, ¿cuántos pacientes se enfrían o agendan en otro centro?',
      story: 'La mayoría de consultas de terapia entran de noche o mientras atiendes a otro paciente. Un sistema de admisión cálido y confidencial acoge al paciente al instante, filtra la especialidad y asegura su primera sesión.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para mejorar la admisión confidencial y la continuidad terapéutica.'
    },
    mapaVariables: { monthlyLeads: 75, avgTicketPEN: 480, baselineConvRate: 0.16, targetConvRate: 0.28, grossMargin: 0.70 }
  },

  'nutricionistas': {
    slug: 'nutricionistas',
    categoryName: 'Nutricionistas y Asesoría Dietética',
    icpB2B: {
      decisionMaker: 'Licenciado en Nutrición / Director de Consultorio Nutricional',
      dailyReality: 'Evaluaciones antropométricas/InBody, diseño de planes alimenticios personalizados (clínicos, deportivos, pérdida de peso) y controles quincenales.',
      primaryBottleneck: 'Vender consultas sueltas de S/ 100–150 donde el paciente recibe su dieta y no regresa al control, en lugar de estructurar programas trimestrales con seguimiento continuo.',
      theBigDomino: 'Cambiar el modelo de "consulta aislada" a "Programa de Transformación Nutricional de 4 a 12 semanas" con recordatorios y seguimiento automatizado triplica el ingreso por paciente y garantiza sus resultados.',
      opportunitySwitch: 'Pasar de entregar hojas de dieta sueltas a un Programa de Acompañamiento Nutricional con Seguimiento Automatizado.',
      falseBeliefs: {
        vehicle: 'Creencia: "La gente descarga dietas gratis de internet o IA". Realidad: Las personas no fallan por falta de información, sino por falta de medición corporal (InBody/pliegues), personalización clínica y acompañamiento humano.',
        internal: 'Creencia: "Hacer seguimiento semanal a cada paciente me consume todo el día". Realidad: Los check-ins de adherencia y recordatorios de control se automatizan para que solo intervengas donde hace falta.',
        external: 'Creencia: "Solo buscan nutricionista en verano". Realidad: Pacientes con hígado graso, resistencia a la insulina, embarazo, deporte o recomposición corporal buscan atención los 12 meses del año.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Paciente con Meta de Salud Metabólica, Recomposición Corporal o Nutrición Deportiva',
      demographics: '24 a 55 años, profesionales con vida sedentaria, deportistas y pacientes derivados por endocrinología/gastroenterología.',
      burningDesire: 'Mejorar su composición corporal, energía y exámenes médicos con un plan práctico adaptado a comida peruana real y a su rutina.',
      visceralFear: 'Dietas extremas imposibles de sostener, efecto rebote o pasar hambre con menús caros y complicados.',
      triggerEvent: 'Exámenes de sangre alterados (colesterol/glucosa/hígado graso), evento próximo o ropa que dejó de quedar bien.',
      mobileBehavior: 'Busca nutricionista colegiado (CNP) con evaluación InBody/antropometría, casos de éxito reales y facilidad para agendar presencial u online.'
    },
    hookStoryOffer: {
      hook: '¿Tus pacientes compran una sola consulta nutricional y desaparecen, o tienes un sistema que los convierte en planes de seguimiento de 3 meses?',
      story: 'Un paciente no logra resultados duraderos en una sola cita, ni tu consultorio alcanza estabilidad vendiendo consultas sueltas. Sistematizar la admisión y el seguimiento quincenal multiplica la retención.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para estructurar programas nutricionales recurrentes y llenar tu agenda.'
    },
    mapaVariables: { monthlyLeads: 70, avgTicketPEN: 420, baselineConvRate: 0.16, targetConvRate: 0.27, grossMargin: 0.70 }
  },

  'casas-de-cambio': {
    slug: 'casas-de-cambio',
    categoryName: 'Casas de Cambio y Divisas',
    icpB2B: {
      decisionMaker: 'Gerente General / Oficial de Cumplimiento de Casa de Cambio Registrada SBS',
      dailyReality: 'Operaciones de compra/venta de dólares en tiempo real, cotizaciones preferenciales para empresas (tesorería) y cumplimiento normativo SBS/UIF.',
      primaryBottleneck: 'El tipo de cambio fluctúa cada minuto: si un tesorero de empresa o persona natural escribe para cotizar $5,000 o $20,000 USD y tardan 5 minutos en responder o no muestran su registro SBS de forma verificable, cierra la operación con otra casa de cambio.',
      theBigDomino: 'Combinar validación institucional inmediata (Registro SBS + RUC activo) con atención en menos de 60 segundos para montos preferenciales captura a las empresas que cambian dólares todas las semanas.',
      opportunitySwitch: 'Pasar de esperar clientes de ventanilla a una Mesa de Dinero Digital con Cotización Preferencial Instantánea para Empresas.',
      falseBeliefs: {
        vehicle: 'Creencia: "Las apps grandes se llevan a todos". Realidad: Las empresas y personas que cambian montos altos buscan trato directo con mesa de dinero para negociar medio punto en el tipo de cambio.',
        internal: 'Creencia: "Publicar en internet es riesgoso". Realidad: Operar mediante transferencias bancarias verificadas y registro SBS visible protege tanto a la empresa como al cliente.',
        external: 'Creencia: "El cliente se va por 0.001 de diferencia". Realidad: En operaciones empresariales, la velocidad de liquidación y la seguridad pesan tanto como la tasa.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Jefe de Tesorería / Importador Pyme y Persona con Pago de Crédito/Inmueble en Dólares',
      demographics: '28 a 60 años, gerentes financieros, importadores y ahorristas en Lima.',
      burningDesire: 'Tipo de cambio preferencial competitivo, liquidación rápida en cuentas bancarias y 100% de seguridad jurídica y financiera.',
      visceralFear: 'Estafas cibernéticas, billetes falsos (en ventanilla), asaltos al salir del banco o demoras de horas en recibir la transferencia.',
      triggerEvent: 'Pago a proveedores en dólares, pago de cuota hipotecaria/vehicular, cambio de sueldo o cierre de compra de inmueble.',
      mobileBehavior: 'Verifica primero que la empresa tenga resolución SBS vigente; luego consulta por WhatsApp el tipo de cambio preferencial según el monto.'
    },
    hookStoryOffer: {
      hook: 'En el mercado cambiario de Lima, 3 minutos de demora en WhatsApp significan perder una operación de $10,000 USD y todas las operaciones futuras de esa empresa.',
      story: 'Cuando el tesorero de una Pyme busca cerrar tipo de cambio preferencial, escribe a 2 mesas de dinero. Quien valida su registro SBS y responde en segundos se queda con la cuenta corporativa recurrente.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para optimizar tu captación de operaciones cambiarias B2B y preferenciales.'
    },
    mapaVariables: { monthlyLeads: 110, avgTicketPEN: 800, baselineConvRate: 0.18, targetConvRate: 0.30, grossMargin: 0.50 }
  },

  'escuelas-de-manejo': {
    slug: 'escuelas-de-manejo',
    categoryName: 'Escuelas de Manejo y Brevetes',
    icpB2B: {
      decisionMaker: 'Director / Propietario de Escuela de Conductores',
      dailyReality: 'Programación de flota de vehículos doble comando, instructores, clases teóricas, simulacro en circuito (Touring Conchán/Lince) y exámenes médicos.',
      primaryBottleneck: 'Los alumnos escriben entusiasmados por sacar su brevete A1, pero se pierden entre requisitos del MTC/examen médico o la escuela tarda en responder paquetes de horas prácticas, matriculándose en la escuela que les resuelve todo el camino paso a paso.',
      theBigDomino: 'Guiar al alumno desde el primer mensaje con una Ruta Clara hacia el Brevete (Examen Médico + Horas Prácticas + Simulacro Touring) y facilitar la reserva de horarios de práctica aumenta el cierre de paquetes completos.',
      opportunitySwitch: 'Dejar de vender "horas de manejo sueltas" y vender el Programa Integral "Brevete a la Primera" con Ruta Guiada.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los alumnos solo comparan quién cobra S/ 20 menos". Realidad: Lo que más teme el alumno es jalar el examen en el Touring y tener que pagar todo de nuevo; paga más a quien le da confianza y método.',
        internal: 'Creencia: "Mis secretarias explican todo el trámite del MTC por teléfono". Realidad: Explicar lo mismo 50 veces al día satura a recepción y deja sin respuesta a los leads de WhatsApp.',
        external: 'Creencia: "El alumno que ya sabe manejar un poco no compra paquetes". Realidad: Compra el paquete de perfeccionamiento y circuito cerrado si se le presenta la oferta adecuada.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Joven Profesional o Adulto que Necesita Sacar su Brevete A1 sin Miedo',
      demographics: '18 a 45 años, estudiantes, profesionales que compraron su primer auto o trabajadores que requieren licencia.',
      burningDesire: 'Aprender a manejar en el tráfico real de Lima sin nervios y aprobar el examen de manejo en el Touring en el primer intento.',
      visceralFear: 'Instructores impacientes que griten, chocar el auto en práctica o reprobar el examen práctico en Conchán por no conocer las rutas.',
      triggerEvent: 'Compra de vehículo, requisito para un puesto de trabajo, cumplir 18 años o vencimiento de examen médico.',
      mobileBehavior: 'Pregunta en WhatsApp precios de paquetes (mecánico/automático), horarios flexibles (fines de semana/noches) y si recogen a domicilio.'
    },
    hookStoryOffer: {
      hook: '¿Cuántos alumnos que escriben hoy preguntando por clases de manejo terminan matriculándose en otra escuela porque tardaste en responder o no les diste una ruta clara para su brevete?',
      story: 'El alumno que quiere sacar su licencia está lleno de dudas sobre el examen médico, el Touring y el miedo a manejar. Automatizar esa orientación inicial y ofrecer paquetes estructurados dispara las matrículas.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para multiplicar las matrículas de paquetes completos en tu escuela de manejo.'
    },
    mapaVariables: { monthlyLeads: 140, avgTicketPEN: 580, baselineConvRate: 0.16, targetConvRate: 0.26, grossMargin: 0.48 }
  },

  'gimnasios': {
    slug: 'gimnasios',
    categoryName: 'Gimnasios y Centros de Fitness',
    icpB2B: {
      decisionMaker: 'Propietario / Gerente de Gimnasio, Box de CrossFit o Estudio Boutique',
      dailyReality: 'Operación de sala de máquinas/clases grupales, entrenadores, mantenimiento de equipos y campañas de membresías mensuales/trimestrales/anuales.',
      primaryBottleneck: 'Cientos de personas escriben "Info y precio" en redes/WhatsApp, reciben un cuadro de tarifas frío y nunca pisan el gimnasio; además, los socios cuyo plan vence no reciben un flujo estructurado de renovación.',
      theBigDomino: 'No se vende una membresía fría por chat: se agenda una "Clase de Prueba / Evaluación Física en Sede" y se automatiza la renovación antes del vencimiento, blindando el flujo de caja mensual.',
      opportunitySwitch: 'Pasar de enviar listas de precios por chat a un Embudo de Invitación a Clase de Prueba / Evaluación en Sede y Renovación Activa.',
      falseBeliefs: {
        vehicle: 'Creencia: "Las cadenas low-cost nos quitan a todos los clientes". Realidad: Miles de vecinos odian hacer cola de 20 minutos para usar una máquina en cadenas masivas; prefieren un gimnasio o estudio donde sí los asesoren.',
        internal: 'Creencia: "Si doy el precio por WhatsApp ya deberían venir". Realidad: Sin agendar día y hora de visita/clase de prueba con seguimiento, el 85% posterga su inicio para "el próximo lunes".',
        external: 'Creencia: "En invierno nadie entrena". Realidad: Con programas por objetivos de 8 a 12 semanas y seguimiento a socios por vencer, la retención se mantiene alta todo el año.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Vecino del Distrito que Quiere Ponerse en Forma con Asesoría Real',
      demographics: '20 a 50 años, residentes o trabajadores a menos de 15 minutos del gimnasio.',
      burningDesire: 'Mejorar su físico, salud y nivel de energía en un ambiente motivador, limpio, seguro y con entrenadores que sí corrijan su técnica.',
      visceralFear: 'Pagar una membresía anual y dejar de ir a la segunda semana porque nadie lo guía, o lesionarse por falta de supervisión.',
      triggerEvent: 'Inicio de mes/año, recomendación médica, estrés laboral o cercanía del verano/evento.',
      mobileBehavior: 'Busca en su celular gimnasios cercanos a su casa/oficina, quiere ver fotos reales de las máquinas/clases, horarios y agendar una visita o clase de prueba.'
    },
    hookStoryOffer: {
      hook: 'De cada 100 personas que escriben "Precio e info" al WhatsApp de tu gimnasio, ¿cuántas llegan realmente a pisar tu local y matricularse?',
      story: 'Enviar un flyer de precios por WhatsApp y esperar a que el cliente venga solo mata tus conversiones. Cuando tu sistema convierte cada consulta en una visita o clase de prueba agendada con recordatorio, tus matrículas trimestrales se disparan.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para transformar consultas de redes en socios activos y renovaciones.'
    },
    mapaVariables: { monthlyLeads: 180, avgTicketPEN: 280, baselineConvRate: 0.14, targetConvRate: 0.24, grossMargin: 0.65 }
  },

  'decoracion-de-eventos': {
    slug: 'decoracion-de-eventos',
    categoryName: 'Decoración de Eventos y Bodas',
    icpB2B: {
      decisionMaker: 'Event Planner / Dueña de Empresa de Decoración de Eventos',
      dailyReality: 'Montaje y desmontaje de estructuras, arcos orgánicos, flores, mobiliario, luces y atención de clientes en plena semana de producción.',
      primaryBottleneck: 'Los clientes piden cotizar temáticas específicas el fin de semana mientras el equipo está montando otros eventos; al no recibir un catálogo por rangos de inversión ni respuesta rápida, contratan a otro decorador.',
      theBigDomino: 'Un catálogo visual organizado por tipo de celebración y nivel de montaje que pre-califica fecha, distrito y presupuesto antes de armar una propuesta personalizada ahorra horas y cierra los mejores eventos.',
      opportunitySwitch: 'Dejar de cotizar manualmente a curiosos sin presupuesto y pasar a un Showroom de Montajes con Pre-Calificación de Fecha.',
      falseBeliefs: {
        vehicle: 'Creencia: "Todo mi catálogo ya está en mis historias de Instagram". Realidad: Buscar precios y paquetes en historias destacadas es lento y confuso para quien quiere contratar hoy.',
        internal: 'Creencia: "Tengo que diseñar primero para cotizar". Realidad: Presentar 3 colecciones base (Clásica, Premium, Luxury) filtra al cliente dispuesto a invertir.',
        external: 'Creencia: "Los clientes buscan solo globos baratos". Realidad: El cliente que busca decoración integral para boda, bautizo, cumpleaños o evento corporativo valora la puntualidad y el acabado estético.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Mamá Organizadora, Novia o Encargada de Eventos Corporativos',
      demographics: '25 a 50 años, NSE A/B/C+, Lima Metropolitana.',
      burningDesire: 'Un montaje espectacular digno de revista que sorprenda a todos los invitados y quede perfecto en las fotografías.',
      visceralFear: 'Que el montaje final no se parezca a la foto de referencia, que lleguen tarde cuando ya hay invitados o que usen flores/materiales deteriorados.',
      triggerEvent: 'Cumpleaños infantil/adulto, bautizo, pedida de mano, boda o aniversario corporativo.',
      mobileBehavior: 'Envía foto de referencia por WhatsApp preguntando cuánto cuesta un montaje similar para su fecha y distrito.'
    },
    hookStoryOffer: {
      hook: 'Mientras estás montando un evento el sábado, ¿cuántos clientes con presupuesto para el próximo mes pierdes por no responder ni mostrar tus paquetes a tiempo?',
      story: 'La decoración entra por los ojos y se cierra por la velocidad de atención. Un showroom digital que clasifique fecha, distrito y paquete mientras trabajas en campo mantiene tu agenda llena.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para profesionalizar tu catálogo y automatizar la pre-calificación de eventos.'
    },
    mapaVariables: { monthlyLeads: 95, avgTicketPEN: 1100, baselineConvRate: 0.12, targetConvRate: 0.22, grossMargin: 0.48 }
  },

  'opticas': {
    slug: 'opticas',
    categoryName: 'Ópticas y Examen Visual',
    icpB2B: {
      decisionMaker: 'Optómetra Propietario / Administrador de Óptica',
      dailyReality: 'Medición de vista computarizada, asesoría en monturas y lunas (filtro azul, antirreflejo, multifocales, transición) y órdenes de laboratorio.',
      primaryBottleneck: 'Depender solo del tráfico peatonal de la calle y no hacer seguimiento anual a los pacientes que ya se hicieron lentes hace 12 meses para renovar su medida o venderles un segundo par (lentes de sol con medida / multifocales).',
      theBigDomino: 'Atraer vecinos del distrito mediante reserva de Examen Visual y activar el recordatorio automático a los 11 meses para control de medida convierte una venta única en clientes recurrentes.',
      opportunitySwitch: 'Pasar de esperar a que entre gente de la calle a operar una Agenda de Salud Visual y Renovación Anual de Lentes.',
      falseBeliefs: {
        vehicle: 'Creencia: "Las ópticas solo venden por ubicación física". Realidad: Quien busca multifocales de gama alta o lentes para niños investiga en Google qué óptica de su distrito tiene mejores reseñas y especialistas.',
        internal: 'Creencia: "La gente no agenda para ir a una óptica". Realidad: Agendar el examen visual con optómetra elimina la espera y eleva por completo la autoridad frente a los jaladores de la calle.',
        external: 'Creencia: "El cliente cambia de lentes cada 3 años". Realidad: Con un control visual gratuito al año y promociones de segundo par, el ciclo de recompra baja a 12 meses.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Profesional que Trabaja en Pantallas, Usuario de Multifocales o Padre de Escolar',
      demographics: '20 a 65 años, oficinistas, estudiantes y adultos con presbicia/miopía/astigmatismo.',
      burningDesire: 'Ver con nitidez absoluta, aliviar la fatiga ocular y lucir una montura estética con lunas auténticas garantizadas.',
      visceralFear: 'Medida mal tomada que le cause dolor de cabeza/mareos, o que le cobren lunas con filtro/policarbonato de marca y le entreguen lunas genéricas.',
      triggerEvent: 'Cansancio visual frente a la laptop, inicio de año escolar, rotura de lentes actuales o dificultad para leer de cerca.',
      mobileBehavior: 'Busca una óptica confiable en su distrito con optómetra calificado, variedad de monturas y entrega rápida.'
    },
    hookStoryOffer: {
      hook: '¿Tu óptica depende únicamente de las personas que caminan frente a tu puerta o tienes un sistema que agenda exámenes visuales y reactiva a tus clientes cada año?',
      story: 'Los lentes multifocales y de protección digital tienen excelente margen, pero el paciente huye de las ópticas informales. Un sistema de cita visual y seguimiento anual llena tu consultorio de clientes calificados.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para captar más exámenes visuales y ventas de lunas de gama media/alta.'
    },
    mapaVariables: { monthlyLeads: 100, avgTicketPEN: 380, baselineConvRate: 0.20, targetConvRate: 0.32, grossMargin: 0.58 }
  },

  // ============================================================================
  // TIER 3: TICKET MEDIO, URGENCIAS OPERATIVAS Y COMERCIO LOCAL
  // ============================================================================

  'auxilio-mecanico': {
    slug: 'auxilio-mecanico',
    categoryName: 'Grúas y Auxilio Mecánico 24h',
    icpB2B: {
      decisionMaker: 'Propietario de Flota de Grúas / Servicio de Auxilio Mecánico',
      dailyReality: 'Remolque en plataforma, rescate vehicular, cambio de batería a domicilio y atención de emergencias en ruta las 24 horas.',
      primaryBottleneck: 'En una emergencia vial, el conductor varado llama o escribe al primer botón grande que ve en su celular; si tu negocio no tiene una landing ultrarrápida (< 1s) con captura automática de ubicación GPS y llamada en 1 toque, el servicio se lo lleva otra grúa en 20 segundos.',
      theBigDomino: 'Reducir el tiempo entre la búsqueda en Google y el envío de la ubicación GPS por WhatsApp a menos de 15 segundos captura las emergencias más rentables día y noche.',
      opportunitySwitch: 'Pasar de un anuncio estático a una Central Digital de Despacho de Emergencia con Geolocalización en 1 Toque.',
      falseBeliefs: {
        vehicle: 'Creencia: "Todos llaman a su seguro". Realidad: Miles de vehículos no tienen seguro todo riesgo o el seguro demora 2 horas en llegar, por lo que contratan grúa particular de inmediato.',
        internal: 'Creencia: "Estoy manejando la grúa, me cuesta escribir". Realidad: El mensaje preconfigurado le pide al cliente ubicación GPS y foto/modelo del vehículo en un solo paso.',
        external: 'Creencia: "Solo importa el precio por kilómetro". Realidad: Al conductor varado en la Vía Expresa o Panamericana a las 10:00 PM le importa quién le confirma tiempo real de llegada primero.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Conductor Varado en Ruta o Estacionamiento con Urgencia Inmediata',
      demographics: '22 a 65 años, propietarios de autos particulares, camionetas y vehículos comerciales en Lima.',
      burningDesire: 'Que una grúa plataforma o técnico llegue rápido a su ubicación y traslade o encienda su vehículo sin dañar la carrocería/caja automática.',
      visceralFear: 'Quedarse varado en una zona peligrosa de Lima por horas o que una grúa mal equipada dañe el parachoques/transmisión.',
      triggerEvent: 'Batería descargada, rotura de faja/embrague, recalentamiento de motor o accidente de tránsito.',
      mobileBehavior: 'Paciencia menor a 20 segundos: necesita botón gigante de "Llamar Ahora" y "Enviar mi Ubicación por WhatsApp".'
    },
    hookStoryOffer: {
      hook: 'Un conductor varado en Lima decide en menos de 20 segundos a qué grúa llamar: ¿tu presencia digital convierte esa emergencia en 1 clic?',
      story: 'Cuando un auto se queda botado, el dueño no lee textos largos: busca un botón inmediato que envíe su ubicación GPS y modelo de auto a tu WhatsApp para que le confirmes salida.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para capturar servicios de grúa y auxilio mecánico en segundos.'
    },
    mapaVariables: { monthlyLeads: 110, avgTicketPEN: 320, baselineConvRate: 0.25, targetConvRate: 0.40, grossMargin: 0.55 }
  },

  'cerrajeros': {
    slug: 'cerrajeros',
    categoryName: 'Cerrajeros 24 Horas y Apertura de Autos',
    icpB2B: {
      decisionMaker: 'Maestro Cerrajero / Dueño de Cerrajería Domiciliaria y Automotriz',
      dailyReality: 'Aperturas de emergencia de puertas y vehículos, instalación de chapas de alta seguridad (multilock/digitales) y programación de llaves con chip.',
      primaryBottleneck: 'Perder las aperturas de urgencia (20 segundos de decisión del cliente) y no capitalizar a cada cliente atendido para ofrecerle el upgrade a cerraduras de alta seguridad o cerraduras inteligentes.',
      theBigDomino: 'Capturar la urgencia en 1 clic (con foto de la chapa por WhatsApp para cotizar exacto) y ofrecer sistemáticamente el cambio o actualización de seguridad duplica el ticket promedio por visita.',
      opportunitySwitch: 'Pasar de hacer solo aperturas simples a operar un Servicio de Respuesta Rápida y Blindaje de Cerraduras.',
      falseBeliefs: {
        vehicle: 'Creencia: "El cliente llama al cerrajero de su mercado". Realidad: Cuando alguien se queda fuera de su departamento a las 9:00 PM o pierde la llave del auto, busca en su celular "cerrajero 24 horas en mi distrito".',
        internal: 'Creencia: "Los clientes desconfían de llamar por internet". Realidad: Por eso una ficha verificada con dirección de taller, reseñas reales e identificación del técnico cierra la venta al instante.',
        external: 'Creencia: "Solo quieren abrir la puerta y gastar lo mínimo". Realidad: Si se les perdió la llave o sufrieron un intento de robo, el 50% necesita cambiar el cilindro o instalar una chapa más segura en esa misma visita.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Vecino que se Quedó Fuera de Casa o Propietario que Requiere Cambiar Chapas',
      demographics: '24 a 65 años, residentes de edificios, casas y conductores en Lima.',
      burningDesire: 'Entrar a su vivienda o auto en menos de 30 minutos sin que rompan su puerta, atendido por un cerrajero identificado y honesto.',
      visceralFear: 'Llamar a un desconocido sin local fijo por temor a su seguridad domiciliaria o que le cobren el triple una vez abierta la puerta.',
      triggerEvent: 'Puerta cerrada con las llaves adentro, pérdida/robo de llaves, mudanza a nuevo departamento o llave con chip desprogramada.',
      mobileBehavior: 'Urgencia máxima: busca cerrajero en su distrito, verifica reseñas y envía foto de su cerradura por WhatsApp para saber precio y tiempo de llegada.'
    },
    hookStoryOffer: {
      hook: 'Cuando un vecino se queda fuera de su departamento, contrata al primer cerrajero que le pide foto de la chapa y le confirma llegada en 20 minutos: ¿eres tú ese cerrajero?',
      story: 'En cerrajería, la velocidad y la confianza lo son todo. Un embudo de emergencia que recolecte distrito y foto de la cerradura al instante te permite cerrar aperturas e instalaciones de alta seguridad todos los días.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para multiplicar tus servicios de cerrajería a domicilio.'
    },
    mapaVariables: { monthlyLeads: 120, avgTicketPEN: 200, baselineConvRate: 0.25, targetConvRate: 0.38, grossMargin: 0.65 }
  },

  'gasfiteros': {
    slug: 'gasfiteros',
    categoryName: 'Gasfiteros y Plomeros a Domicilio',
    icpB2B: {
      decisionMaker: 'Maestro Gasfitero / Gerente de Empresa de Gasfitería y Detección de Fugas',
      dailyReality: 'Detección de fugas de agua con geofono, desatoros con máquina, reparación de tuberías/tanques elevados e instalación de termas y sanitarios.',
      primaryBottleneck: 'Perder servicios de alto valor (detección de fugas internas, cambio de redes, bombas hidroneumáticas) porque el teléfono no se contesta mientras está trabajando bajo un lavadero o en una cisterna.',
      theBigDomino: 'Un sistema de recepción en WhatsApp que solicite automáticamente un video corto de 15 segundos de la fuga/problema y el distrito permite diagnosticar, cotizar y agendar rutas rentables sin interrumpir el trabajo.',
      opportunitySwitch: 'Pasar de perder llamadas con las manos mojadas a una Central de Diagnóstico por Video en WhatsApp y Ruteo por Distrito.',
      falseBeliefs: {
        vehicle: 'Creencia: "Cualquier conserje recomienda a un gasfitero". Realidad: Para fugas ocultas, recibos de Sedapal disparados, termas y edificios, los propietarios buscan especialistas con equipos modernos y garantía.',
        internal: 'Creencia: "Tengo que ir a ver cada caño para saber qué tiene". Realidad: Con un video de 15 segundos en WhatsApp descartas trabajos que no te convienen y vas directo con los repuestos exactos.',
        external: 'Creencia: "El cliente no paga diagnóstico". Realidad: Cuando proyectas seriedad técnica y descuentas la visita del trabajo final, el cliente acepta encantado.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Propietario con Fuga/Humedad, Recibo Alto de Agua o Atoro Urgente',
      demographics: '28 a 65 años, dueños de casas, departamentos, restaurantes y administradores de condominios.',
      burningDesire: 'Resolver la fuga, humedad o atoro hoy mismo sin que le rompan todo el piso/pared innecesariamente, con garantía real.',
      visceralFear: 'Gasfiteros informales que dejan el trabajo a medias, causan una filtración al vecino del piso inferior o no vuelven cuando sigue goteando.',
      triggerEvent: 'Filtración hacia el techo del vecino, recibo de Sedapal triplicado, inodoro/desagüe atorado o terma que no calienta.',
      mobileBehavior: 'Busca atención inmediata en su distrito; dispuesto a enviar foto/video del problema por WhatsApp para que vengan hoy mismo.'
    },
    hookStoryOffer: {
      hook: 'Mientras estás reparando una tubería, ¿cuántas llamadas de fugas, desatoros e instalaciones de termas pierdes porque no puedes contestar el celular?',
      story: 'Pedirle al cliente que envíe un video de 15 segundos del problema y su distrito de forma automática en WhatsApp te ahorra viajes en vano y asegura al cliente antes de que llame a otro técnico.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para ordenar y multiplicar tus servicios de gasfitería en Lima.'
    },
    mapaVariables: { monthlyLeads: 115, avgTicketPEN: 250, baselineConvRate: 0.22, targetConvRate: 0.35, grossMargin: 0.60 }
  },

  'electricistas': {
    slug: 'electricistas',
    categoryName: 'Electricistas a Domicilio',
    icpB2B: {
      decisionMaker: 'Técnico Electricista Titulado / Contratista Eléctrico',
      dailyReality: 'Solución de cortocircuitos, fugas a tierra (diferenciales que saltan), tableros termomagnéticos, pozos a tierra con protocolo INDECI y cableado comercial.',
      primaryBottleneck: 'Perder tanto las emergencias domiciliarias (cortes de luz) como los proyectos comerciales de alto margen (certificados de pozo a tierra, tableros trifásicos, cableado de locales) por no contar con una web y recepción que separe urgencias de proyectos.',
      theBigDomino: 'Separar en el primer contacto de WhatsApp las "Emergencias de Corte/Fuga Eléctrica" de los "Proyectos y Certificados de Pozo a Tierra INDECI" permite atender urgencias al instante y cotizar contratos B2B de alto ticket.',
      opportunitySwitch: 'Pasar de hacer solo arreglos menores a operar una Empresa de Emergencias Eléctricas y Certificación INDECI para Negocios.',
      falseBeliefs: {
        vehicle: 'Creencia: "Hay demasiados electricistas informales cobrando barato". Realidad: Ningún dueño de casa o empresa quiere que se incendie su propiedad por un empalme mal hecho; buscan técnicos con megóhmetro, pinza amperimétrica y garantía.',
        internal: 'Creencia: "En mi categoría casi nadie tiene web". Realidad: Precisamente por eso, tener una presencia digital impecable te convierte en el referente absoluto de tu zona.',
        external: 'Creencia: "Los certificados de pozo a tierra solo se piden una vez". Realidad: Todo local comercial necesita renovar su protocolo y mantenimiento de pozo a tierra anualmente para Defensa Civil.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Familia con Cortocircuito/Fuga Eléctrica y Dueño de Local que Requiere Certificado INDECI',
      demographics: '28 a 65 años, propietarios residenciales y comercios/oficinas en Lima.',
      burningDesire: 'Seguridad eléctrica total, eliminar el riesgo de incendio o descarga, restablecer su energía y aprobar la inspección de Defensa Civil.',
      visceralFear: 'Incendios por cortocircuito, electrocución en duchas eléctricas, recibos de Luz del Sur/Pluz disparados por fuga a tierra o rechazo de licencia municipal.',
      triggerEvent: 'Llave diferencial que baja constantemente, olor a cable quemado, recibo de luz excesivo o inspección de INDECI.',
      mobileBehavior: 'Busca un técnico electricista certificado que responda de inmediato y cuente con instrumentos de medición profesionales.'
    },
    hookStoryOffer: {
      hook: 'Con la electricidad nadie quiere arriesgarse con un informal: ¿tu presencia digital demuestra hoy que eres el especialista certificado que las casas y empresas de Lima necesitan?',
      story: 'Desde una fuga a tierra que dispara el recibo de luz hasta el certificado de pozo a tierra para Indecopi/INDECI, un sistema que clasifique la urgencia y agende la visita técnica multiplica tus ingresos.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para captar emergencias eléctricas y proyectos comerciales.'
    },
    mapaVariables: { monthlyLeads: 100, avgTicketPEN: 280, baselineConvRate: 0.22, targetConvRate: 0.36, grossMargin: 0.60 }
  },

  'pintores': {
    slug: 'pintores',
    categoryName: 'Pintores de Casas y Edificios',
    icpB2B: {
      decisionMaker: 'Maestro Pintor Contratista / Gerente de Empresa de Pintura y Acabados',
      dailyReality: 'Empastado, lijado, sellado y pintura de departamentos, casas, oficinas y fachadas de edificios, además de trabajos en drywall y tratamiento de salitre/humedad.',
      primaryBottleneck: 'Perder contratos de pintura completa de departamentos y edificios frente a competidores porque el cliente no percibe garantía de limpieza, protección de pisos/muebles y cumplimiento de plazos.',
      theBigDomino: 'Mostrar un protocolo profesional ("Pintura con Protección Total de Muebles y Pisos + Entrega en 48/72h") y pre-cotizar por metraje/número de habitaciones en WhatsApp elimina el miedo del propietario y cierra obras de mayor valor.',
      opportunitySwitch: 'Dejar de competir por jornal diario y vender Servicio de Pintura Residencial y Corporativa Llave en Mano con Garantía.',
      falseBeliefs: {
        vehicle: 'Creencia: "El cliente solo pregunta cuánto cobras por metro cuadrado". Realidad: Pregunta precio por m² porque nadie le explica la diferencia entre un trabajo limpio que protege sus pisos y un pintor que mancha todo y tarda el triple.',
        internal: 'Creencia: "Ir a medir cada departamento me quita medio día". Realidad: Pidiendo en WhatsApp metraje aproximado (ej. dpto de 80 m², 3 dormitorios) y fotos del estado de las paredes, das un rango previo antes de visitar.',
        external: 'Creencia: "Solo pintan en diciembre por fiestas". Realidad: Todos los meses en Lima hay miles de mudanzas y entregas de departamentos en alquiler que exigen pintado obligatorio.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Inquilino/Propietario Entregando o Recibiendo Departamento y Junta de Propietarios',
      demographics: '27 a 62 años, propietarios de inmuebles, inquilinos salientes y administradores de edificios.',
      burningDesire: 'Paredes con acabado liso impecable, pisos y zócalos limpios sin una sola gota de pintura, terminado en el plazo exacto.',
      visceralFear: 'Que le manchen el piso laminado/parquet o los muebles, que usen pintura rebajada de mala calidad o que el trabajo de 2 días se convierta en 2 semanas.',
      triggerEvent: 'Entrega de departamento alquilado (para recuperar garantía), compra de vivienda, llegada de un bebé o mantenimiento de fachada.',
      mobileBehavior: 'Busca un equipo de pintores formales con fotos reales del proceso de encintado/protección y cotización rápida por WhatsApp.'
    },
    hookStoryOffer: {
      hook: 'En Lima se mudan miles de departamentos cada mes que necesitan pintarse sí o sí: ¿tu negocio está capturando esos contratos completos o perdiéndolos por demora en cotizar?',
      story: 'El propietario o inquilino que necesita pintar un departamento de 90 m² valora por encima de todo la limpieza, el encintado de pisos y la rapidez. Automatizar la pre-cotización por ambientes te asegura las mejores obras.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para captar contratos de pintura de departamentos, oficinas y edificios.'
    },
    mapaVariables: { monthlyLeads: 65, avgTicketPEN: 1200, baselineConvRate: 0.14, targetConvRate: 0.24, grossMargin: 0.48 }
  },

  'spas': {
    slug: 'spas',
    categoryName: 'Spas y Centros de Masajes',
    icpB2B: {
      decisionMaker: 'Propietaria / Administradora de Spa, Centro de Masajes Terapéuticos o Estética Corporal',
      dailyReality: 'Gestión de cabinas de masajes descontracturantes/relajantes, circuitos de spa en pareja, limpiezas faciales y paquetes reductores.',
      primaryBottleneck: 'Cabinas vacías de lunes a jueves y pérdida de clientes de fin de semana porque el WhatsApp demora en confirmar turnos disponibles o no se venden gift cards/paquetes grupales de forma automatizada.',
      theBigDomino: 'Un menú digital sensorial con reserva inmediata de cabina y venta automatizada de "Circuitos en Pareja / Gift Cards de Regalo" llena las horas valle y multiplica el ticket medio.',
      opportunitySwitch: 'Pasar de agendar masajes individuales por chat lento a operar un Sistema de Experiencias de Spa, Paquetes y Gift Cards.',
      falseBeliefs: {
        vehicle: 'Creencia: "La gente solo viene al spa si pongo descuentos en cuponeras". Realidad: Las cuponeras atraen cazadores de ofertas que dejan margen cero; un catálogo propio atrae clientes que pagan precio completo por calidad.',
        internal: 'Creencia: "Mis terapeutas no pueden ver el celular mientras hacen masajes". Realidad: Por eso el asistente digital muestra disponibilidad y pre-reserva el turno con abono por Yape/Plin sin interrumpir la sesión.',
        external: 'Creencia: "Los días de semana son muertos por naturaleza". Realidad: Con campañas de reactivación a tu base de datos para horarios de martes a jueves, conviertes horas muertas en utilidad pura.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Ejecutivo/a con Estrés y Dolor Cervical o Pareja Buscando Experiencia Especial',
      demographics: '24 a 55 años, profesionales con alta carga laboral y parejas celebrando aniversarios o cumpleaños.',
      burningDesire: 'Desconectarse del ruido de Lima durante 60–90 minutos en un ambiente impecable, aromático, seguro y verdaderamente profesional.',
      visceralFear: 'Locales improvisados sin higiene ni privacidad, o falta de profesionalismo terapéutico.',
      triggerEvent: 'Contractura severa tras semana de oficina, aniversario de pareja, cumpleaños de un ser querido (Gift Card) o día libre.',
      mobileBehavior: 'Decide viendo fotos de las cabinas y reseñas; quiere ver el menú de paquetes con precios claros y reservar turno para hoy o el fin de semana.'
    },
    hookStoryOffer: {
      hook: '¿Cuántas cabinas de tu spa se quedan vacías entre semana y cuántos circuitos de fin de semana pierdes porque no pudiste responder el WhatsApp mientras atendías?',
      story: 'Quien busca un masaje descontracturante o un spa en pareja quiere relajarse desde el momento en que reserva. Automatizar tu carta de experiencias y la reserva con adelanto llena tus cabinas sin depender de cuponeras.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para llenar las cabinas de tu spa y vender más paquetes y gift cards.'
    },
    mapaVariables: { monthlyLeads: 130, avgTicketPEN: 220, baselineConvRate: 0.20, targetConvRate: 0.34, grossMargin: 0.62 }
  },

  'salones-de-belleza': {
    slug: 'salones-de-belleza',
    categoryName: 'Salones de Belleza y Estilistas',
    icpB2B: {
      decisionMaker: 'Estilista Propietario/a o Administrador/a de Salón de Belleza / Color Studio',
      dailyReality: 'Trabajos técnicos de colorimetría (balayage, babylights), alisados, tratamientos capilares, corte, manicure/pedicure y maquillaje social.',
      primaryBottleneck: 'Dedicar el mismo tiempo de chat a servicios de S/ 35 que a clientas de colorimetría/alisados de S/ 350–600, además de sufrir cancelaciones de turnos largos que dejan al estilista sin producir durante 3 horas.',
      theBigDomino: 'Un sistema que pre-califica los servicios de alto ticket (pidiendo foto actual del cabello e historial químico en WhatsApp) y asegura la reserva con abono previo protege la agenda de tus estilistas y eleva la facturación diaria.',
      opportunitySwitch: 'Dejar de agendar a ciegas por orden de llegada y pasar a una Agenda de Diagnóstico Capilar y Reserva Garantizada.',
      falseBeliefs: {
        vehicle: 'Creencia: "Si pido foto o reserva previa la clienta no viene". Realidad: La clienta dispuesta a invertir S/ 400 en un balayage valora que evalúes su cabello antes para darle un presupuesto honesto y reservar su bloque exclusivo.',
        internal: 'Creencia: "Estoy con el secador y los tintes en la mano, no puedo contestar". Realidad: El flujo automático recoge la foto del cabello actual, el resultado deseado y agenda la cita sin que sueltes la brocha.',
        external: 'Creencia: "Las clientas son infieles y cambian de salón". Realidad: Se van porque nadie les recuerda su retoque de raíz, hidratación o manicure a las 4 semanas.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Andrea (Clienta de Colorimetría, Alisado e Imagen Personal)',
      demographics: '20 a 52 años, mujeres profesionales, universitarias y ejecutivas en Lima.',
      burningDesire: 'Salir del salón con el color y brillo exacto que soñaba, cuidando la hebra capilar con productos originales (Olaplex, Kérastase, Wella, Schwarzkopf).',
      visceralFear: 'Que le quemen o maltraten el cabello con decoloraciones agresivas, que el tono quede naranja o que le cobren el doble al momento de pagar en caja.',
      triggerEvent: 'Crecimiento de raíz/canas, boda o fiesta el fin de semana, cambio de look o cabello dañado que requiere recuperación.',
      mobileBehavior: 'Revisa fotos de trabajos reales de balayage/color del salón, consulta precios según largo de cabello y agenda turno por WhatsApp.'
    },
    hookStoryOffer: {
      hook: 'Un turno de balayage o alisado perdido por inasistencia o respuesta tardía son 3 horas de sillón vacío y S/ 400 menos en caja: ¿cómo estás blindando hoy la agenda de tu salón?',
      story: 'Mientras tu equipo está aplicando color o secando, entran decenas de mensajes pidiendo cotización. Automatizar el envío de foto del cabello y el agendamiento con recordatorio llena tus sillones con los servicios más rentables.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para aumentar el ticket promedio y eliminar los huecos vacíos en tu salón de belleza.'
    },
    mapaVariables: { monthlyLeads: 140, avgTicketPEN: 190, baselineConvRate: 0.22, targetConvRate: 0.35, grossMargin: 0.58 }
  },

  'barberias': {
    slug: 'barberias',
    categoryName: 'Barberías y Grooming Masculino',
    icpB2B: {
      decisionMaker: 'Master Barber / Dueño de Barbería',
      dailyReality: 'Cortes fade/clásicos, perfilado de barba con toalla caliente, limpieza facial masculina y gestión de sillones de barberos.',
      primaryBottleneck: 'Saturación extrema los viernes por la tarde y sábados (donde se rechazan clientes por falta de orden en reservas) y sillones vacíos de lunes a miércoles, sumado a no recordar al cliente su corte cada 15–20 días.',
      theBigDomino: 'Implementar reserva de turno en 30 segundos por WhatsApp (eligiendo barbero, servicio y hora exacta) junto con un recordatorio automático a los 18 días del último corte estabiliza la ocupación toda la semana.',
      opportunitySwitch: 'Pasar de hacer esperar al cliente una hora sentado a una Barbería con Reserva Express y Combos VIP.',
      falseBeliefs: {
        vehicle: 'Creencia: "El hombre entra de paso sin avisar". Realidad: El profesional moderno no tiene 1 hora para perder esperando turno; prefiere reservar su hora exacta en 2 toques desde el celular.',
        internal: 'Creencia: "Mis barberos están cortando, no pueden anotar citas". Realidad: La agenda digital asigna los bloques de 40 minutos automáticamente y envía recordatorio al cliente.',
        external: 'Creencia: "Solo quieren el corte básico". Realidad: Cuando al reservar se le ofrece el upgrade a "Combo Corte + Barba + Facial Express" por S/ 25 adicionales, el 35% acepta y sube tu ticket medio.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Profesional Joven / Ejecutivo que Cuida su Imagen Semanal o Quincenalmente',
      demographics: '18 a 45 años, hombres que buscan un corte impecable sin perder tiempo en esperas.',
      burningDesire: 'Puntualidad exacta en su turno, un barbero que entienda su estilo de corte/barba, buena música y atención de primera.',
      visceralFear: 'Llegar y encontrar 4 personas esperando delante, que le arruinen el degradado/barba o falta de higiene en navajas y máquinas.',
      triggerEvent: 'Ciclo de crecimiento cada 2 a 3 semanas, reunión importante de trabajo, cita o evento de fin de semana.',
      mobileBehavior: 'Quiere ver horarios disponibles hoy mismo, elegir a su barbero de confianza y reservar por WhatsApp sin tener que llamar.'
    },
    hookStoryOffer: {
      hook: '¿Cuántos clientes se pasan de largo los viernes y sábados al ver tu barbería llena, y cuántos tardan 5 semanas en volver en lugar de venir cada 18 días?',
      story: 'El secreto de las barberías más rentables de Lima no es solo cortar bien: es eliminar la espera con reservas rápidas por WhatsApp, ofrecer combos de barba/facial al agendar y recordar al cliente su próximo corte a los 18 días.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para llenar tus sillones y subir el ticket promedio de tu barbería.'
    },
    mapaVariables: { monthlyLeads: 160, avgTicketPEN: 75, baselineConvRate: 0.28, targetConvRate: 0.42, grossMargin: 0.65 }
  },

  'car-wash': {
    slug: 'car-wash',
    categoryName: 'Car Wash y Detallado Automotriz',
    icpB2B: {
      decisionMaker: 'Propietario / Administrador de Car Wash y Estudio de Detailing',
      dailyReality: 'Lavado de salón, lavado básico/premium, pulido y tratamiento cerámico/acrílico, desinfección con ozono y limpieza de tapiz.',
      primaryBottleneck: 'Depender del lavado básico de bajo margen en lugar de llenar las bahías con servicios de alto ticket (Lavado de Salón Completo, Pulido, Tratamiento Cerámico de S/ 250 a S/ 1,200+) mediante reserva previa.',
      theBigDomino: 'Posicionar un catálogo visual de antes/después para Lavado de Salón y Detailing con reserva de bahía por WhatsApp atrae a dueños de camionetas y autos que invierten en el cuidado real de su vehículo.',
      opportunitySwitch: 'Pasar de competir por el lavado rápido de S/ 25 a un Centro de Detallado Automotriz y Lavado de Salón con Reserva.',
      falseBeliefs: {
        vehicle: 'Creencia: "Todos los lavaderos son iguales para el cliente". Realidad: El dueño de un auto cuidado jamás mete su carro a un lavadero que raya la pintura con trapos sucios; busca detailing con microfibra y champú pH neutro.',
        internal: 'Creencia: "Con el ruido de las hidrolavadoras nadie escucha el teléfono". Realidad: El agendamiento por WhatsApp organiza el ingreso de lavados de salón desde el día anterior.',
        external: 'Creencia: "El lavado de salón se hace una vez al año". Realidad: Con seguimiento y paquetes de mantenimiento de pintura/tapiz, el cliente regresa cada mes.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Dueño de Camioneta SUV / Auto Particular o Vendedor de Vehículo Seminuevo',
      demographics: '25 a 60 años, conductores orgullosos de su vehículo o familias con niños/mascotas que ensucian el tapiz.',
      burningDesire: 'Que su auto quede como recién salido de tienda (interior desinfectado y seco sin mal olor, pintura brillante sin remolinos).',
      visceralFear: 'Que dejen los asientos húmedos oliendo a moho, que rayen la pintura, que mojen el motor malogrando sensores o que se pierdan objetos de la guantera.',
      triggerEvent: 'Mancha derramada en asientos, compra/venta de auto usado, viaje de fin de semana o pérdida de brillo en la pintura.',
      mobileBehavior: 'Busca en Google Maps un Car Wash / Detailing con excelentes reseñas, fotos reales de lavado de salón y reserva de turno por WhatsApp.'
    },
    hookStoryOffer: {
      hook: 'Un solo tratamiento de pintura o lavado de salón deja el mismo margen que 10 lavados básicos: ¿tu negocio está captando a esos clientes de alto ticket en internet?',
      story: 'El propietario que quiere hacer un lavado de salón completo o tratamiento cerámico investiga en su celular antes de dejar su auto todo el día. Un catálogo visual con reserva por WhatsApp llena tu local con los servicios más rentables.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para captar más servicios de lavado de salón y detailing automotriz.'
    },
    mapaVariables: { monthlyLeads: 130, avgTicketPEN: 160, baselineConvRate: 0.22, targetConvRate: 0.35, grossMargin: 0.58 }
  },

  'llanterias': {
    slug: 'llanterias',
    categoryName: 'Llanterías y Venta de Neumáticos',
    icpB2B: {
      decisionMaker: 'Propietario / Gerente de Llantería y Centro de Alineamiento',
      dailyReality: 'Venta e instalación de neumáticos, enllante, balanceo computarizado, alineamiento 3D, parchado en frío/vulcanizado y tren delantero.',
      primaryBottleneck: 'Cuando un conductor busca cambiar 2 o 4 llantas (ticket de S/ 600 a S/ 2,400), escribe preguntando por su medida exacta (ej. 205/55 R16); si la llantería demora en confirmar stock, marca y si incluye enllante/balanceo, compra en otro local.',
      theBigDomino: 'Responder en menos de 3 minutos las consultas por medida de aro/llanta con 3 opciones de marca (Económica, Intermedia, Premium) incluyendo instalación y balanceo cierra la venta en el acto.',
      opportunitySwitch: 'Pasar de atender solo parches de paso a un Cotizador Instantáneo de Neumáticos por Medida y Alineamiento.',
      falseBeliefs: {
        vehicle: 'Creencia: "La gente compra llantas en supermercados". Realidad: En supermercados nadie les asesora ni les hace el alineamiento y balanceo profesional en el momento.',
        internal: 'Creencia: "Son demasiadas medidas para responder rápido". Realidad: Pidiendo en el primer mensaje automático la medida del neumático (ej. 185/65 R15) o foto del costado de la llanta, tu vendedor cotiza en 1 minuto.',
        external: 'Creencia: "Solo buscan la llanta china más barata". Realidad: Cuando presentas 3 alternativas claras con garantía y servicio de alineamiento incluido, más de la mitad elige gama media o alta.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Conductor que Necesita Renovar Neumáticos para Revisión Técnica o Viaje',
      demographics: '25 a 62 años, dueños de autos particulares, taxis/aplicativos y camionetas de trabajo.',
      burningDesire: 'Neumáticos nuevos con fecha de fabricación reciente (DOT actual), instalados, balanceados y alineados en menos de 45 minutos.',
      visceralFear: 'Que le vendan llantas guardadas hace 4 años (caucho vencido), mal balanceo que haga vibrar el timón o daños en los aros de magnesio.',
      triggerEvent: 'Observación en la Revisión Técnica por desgaste de cocada, llanta reventada en bache o viaje próximo por carretera.',
      mobileBehavior: 'Envía la medida de su llanta por WhatsApp a 3 llanterías cercanas; va directo a la que le confirma stock hoy mismo y paquete con balanceo/alineamiento.'
    },
    hookStoryOffer: {
      hook: 'Un cliente que busca cambiar 4 llantas representa entre S/ 800 y S/ 2,500 de venta inmediata: ¿cuántas de esas cotizaciones pierdes por no responder su medida en los primeros 3 minutos?',
      story: 'El conductor que necesita neumáticos nuevos ya tiene la medida en la mano y quiere resolverlo hoy. Si tu WhatsApp captura la medida del aro al instante y presenta tus opciones con enllante y balanceo, cierras la venta antes que nadie.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para acelerar tus cotizaciones y ventas de neumáticos y alineamiento.'
    },
    mapaVariables: { monthlyLeads: 100, avgTicketPEN: 450, baselineConvRate: 0.20, targetConvRate: 0.32, grossMargin: 0.35 }
  },

  'reparacion-laptops': {
    slug: 'reparacion-laptops',
    categoryName: 'Servicio Técnico de Laptops y PC',
    icpB2B: {
      decisionMaker: 'Ingeniero / Técnico Especialista Propietario de Laboratorio de Cómputo',
      dailyReality: 'Reparación de placas madre a nivel electrónico, cambio de pantallas/teclados/bisagras, upgrade de SSD/RAM, mantenimiento térmico y soporte a empresas.',
      primaryBottleneck: 'El cliente que trabaja o estudia con su laptop tiene pánico de dejar su equipo en galerías informales donde cambian piezas o roban información; si tu servicio técnico no transmite máxima transparencia y cotización rápida por modelo, pierdes los mejores trabajos.',
      theBigDomino: 'Un protocolo de recepción digital que registra marca, modelo exacto y falla, garantizando revisión transparente con orden de servicio y confidencialidad de datos, atrae a profesionales y empresas dispuestas a pagar el precio justo.',
      opportunitySwitch: 'Dejar de competir con puestos informales y posicionarse como un Laboratorio Técnico Certificado con Garantía Escrita y Soporte B2B.',
      falseBeliefs: {
        vehicle: 'Creencia: "Todo el mundo se va a Wilson por precio". Realidad: La mayoría de profesionales y empresas en Lima prefieren pagar más en un laboratorio de su distrito antes que perder 3 horas en el tráfico y arriesgar sus piezas.',
        internal: 'Creencia: "Estoy soldando en el microscopio, no puedo chatear". Realidad: Tu asistente digital solicita foto de la etiqueta del modelo y síntoma de la falla, dejando todo listo para tu presupuesto.',
        external: 'Creencia: "Las empresas ya tienen su propio soporte TI". Realidad: Las Pymes de 5 a 30 empleados no tienen área de sistemas y buscan un proveedor externo confiable para el mantenimiento de sus laptops.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Profesional en Teletrabajo, Estudiante Universitario y Administración de Pyme',
      demographics: '20 a 55 años, usuarios que dependen 100% de su laptop (MacBook, Lenovo, HP, Dell, Asus) para trabajar o facturar.',
      burningDesire: 'Recuperar su laptop funcionando al 100% en el menor tiempo posible, conservando intactos todos sus archivos y piezas originales.',
      visceralFear: 'El mayor miedo en Lima: que le cambien su memoria RAM, disco o pantalla original por repuestos usados, o que revisen sus archivos privados.',
      triggerEvent: 'Laptop que no enciende antes de una entrega, derrame de líquido en teclado, bisagra rota, pantalla quebrada o lentitud extrema.',
      mobileBehavior: 'Busca en Google un laboratorio técnico con local establecido, excelentes reseñas de honestidad y consulta por WhatsApp enviando el modelo de su equipo.'
    },
    hookStoryOffer: {
      hook: 'En Lima, un profesional prefiere pagar bien a un laboratorio confiable antes que arriesgar las piezas de su laptop en un puesto informal: ¿tu presencia digital transmite hoy esa garantía?',
      story: 'Cuando una laptop de trabajo falla, el dueño busca honestidad y rapidez. Automatizar la recepción por marca, modelo y falla en WhatsApp mientras muestras tu protocolo de garantía multiplica el ingreso de equipos a tu taller.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para atraer clientes profesionales y empresas a tu servicio técnico de laptops.'
    },
    mapaVariables: { monthlyLeads: 115, avgTicketPEN: 220, baselineConvRate: 0.22, targetConvRate: 0.35, grossMargin: 0.58 }
  },

  'reparacion-celulares': {
    slug: 'reparacion-celulares',
    categoryName: 'Reparación de Celulares y Pantallas',
    icpB2B: {
      decisionMaker: 'Técnico en Microelectrónica / Dueño de Centro de Servicio Técnico Móvil',
      dailyReality: 'Cambio de pantallas (OLED/Original/Glass), baterías, pines de carga, reparación de placas de iPhone/Samsung/Xiaomi en el acto.',
      primaryBottleneck: 'El usuario con el celular roto está incomunicado y ansioso: necesita saber en menos de 2 minutos si tienes la pantalla/repuesto para su modelo exacto, cuánto cuesta y si sale en 1 hora.',
      theBigDomino: 'Un flujo de consulta express por marca, modelo y falla que confirme disponibilidad y reparación en el acto a la vista del cliente convierte las búsquedas urgentes en visitas inmediatas a tienda.',
      opportunitySwitch: 'Pasar de ser un taller más a un Centro Express de Reparación Móvil con Garantía y Atención en 1 Hora.',
      falseBeliefs: {
        vehicle: 'Creencia: "El cliente solo pregunta en 10 sitios cuál es S/ 10 más barato". Realidad: Quien tiene un iPhone o gama media/alta teme perder FaceID, cámaras o datos; va al local que le ofrece repuesto original/certificado y reparación frente a él.',
        internal: 'Creencia: "No me da tiempo de responder cada modelo por WhatsApp". Realidad: Automatizando la captura de Marca + Modelo + Falla (Pantalla / Batería / Carga / Mojado), respondes con precisión en segundos.',
        external: 'Creencia: "El cliente no vuelve después de arreglar su pantalla". Realidad: Si queda satisfecho, compra mica hidrogel, case, cargador original y trae los equipos de toda su familia.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Usuario con Pantalla Rota o Falla de Batería/Carga en su Smartphone de Trabajo',
      demographics: '18 a 55 años, cualquier persona en Lima cuyo celular es su herramienta de trabajo, banca (Yape/Plin) y comunicación.',
      burningDesire: 'Que reparen su celular hoy mismo (en 45–60 minutos), con pantalla de calidad original y sin perder ni una sola foto ni acceso a sus apps bancarias.',
      visceralFear: 'Dejar el teléfono de un día para otro, que vulneren sus cuentas/billeteras digitales o que le pongan una pantalla genérica que falle a la semana.',
      triggerEvent: 'Caída del celular con rotura de pantalla/táctil, equipo que no carga o batería que se apaga al 30%.',
      mobileBehavior: 'Escribe desde otro teléfono o PC buscando respuesta instantánea: "¿Tienen pantalla para [Modelo], precio y en cuánto tiempo sale?".'
    },
    hookStoryOffer: {
      hook: 'Una persona a la que se le acaba de romper la pantalla del celular no espera 2 horas tu respuesta: va a la primera tienda que le confirma repuesto, garantía y entrega en 1 hora.',
      story: 'Hoy el celular es la oficina y el banco de cada persona en Lima. Automatizar la recepción por modelo y falla en tu WhatsApp asegura que el cliente venga directo a tu local en lugar de irse a la competencia.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para captar más reparaciones de gama media y alta todos los días.'
    },
    mapaVariables: { monthlyLeads: 150, avgTicketPEN: 180, baselineConvRate: 0.24, targetConvRate: 0.38, grossMargin: 0.55 }
  },

  'reparacion-refrigeradoras': {
    slug: 'reparacion-refrigeradoras',
    categoryName: 'Reparación de Refrigeradoras a Domicilio',
    icpB2B: {
      decisionMaker: 'Técnico en Refrigeración / Gerente de Servicio Técnico de Línea Blanca',
      dailyReality: 'Reparación a domicilio de refrigeradoras No Frost, Side by Side e Inverter (Samsung, LG, Bosch, Mabe, Electrolux), cambio de compresores, tarjetas, sensores y carga de gas.',
      primaryBottleneck: 'Una refrigeradora que deja de enfriar es una emergencia crítica porque la comida de toda la semana se malogra en horas; si no contestas en menos de 10 minutos mientras estás en otro domicilio, el cliente llama al siguiente técnico.',
      theBigDomino: 'Capturar en el primer mensaje automático la Marca, Tipo de Refrigeradora, Síntoma (no congela arriba / no enfría abajo / hace ruido) y Distrito permite agendar la visita técnica del día en menos de 5 minutos.',
      opportunitySwitch: 'Pasar de perder llamadas en ruta a una Central de Visitas Técnicas a Domicilio con Pre-Diagnóstico por Marca.',
      falseBeliefs: {
        vehicle: 'Creencia: "La gente llama al servicio oficial de la marca". Realidad: El servicio oficial de fábrica suele dar cita para dentro de 5 a 7 días hábiles; la familia con carne y alimentos descongelándose necesita un técnico especialista hoy mismo.',
        internal: 'Creencia: "Estoy revisando un motor, no puedo atender WhatsApp". Realidad: El flujo automático recoge marca, foto del modelo, falla y distrito para que solo confirmes la hora de llegada.',
        external: 'Creencia: "El cliente no quiere pagar la revisión técnica". Realidad: Cuando informas que el costo de revisión se descuenta al 100% de la reparación y entregas garantía escrita, el cierre es inmediato.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Ama de Casa / Jefe de Familia con Alimentos en Riesgo por Refrigeradora Averiada',
      demographics: '28 a 65 años, hogares y pequeños negocios gastronómicos en Lima.',
      burningDesire: 'Que un técnico especialista en la marca de su refrigeradora vaya a su domicilio hoy mismo, repare la falla en el sitio con repuesto original y deje garantía.',
      visceralFear: 'Técnicos que "adivinan" cambiando piezas que no eran, cobran por una recarga de gas innecesaria y a los 3 días la refrigeradora vuelve a calentar.',
      triggerEvent: 'Refrigeradora que amanece sin enfriar en la parte baja, pitido de alarma en panel digital o fuga de agua al piso.',
      mobileBehavior: 'Máxima urgencia: busca servicio técnico a domicilio en su distrito y contrata al primero que le confirma visita para hoy.'
    },
    hookStoryOffer: {
      hook: 'Cuando una refrigeradora deja de enfriar, la comida de la familia corre peligro y el dueño contrata al técnico que le confirma visita para hoy en los primeros 10 minutos.',
      story: 'El servicio oficial de marca tarda días en ir; esa es tu gran ventaja competitiva. Si tu WhatsApp recoge marca, falla y distrito en segundos mientras terminas otro servicio, llenas tu ruta diaria con las mejores reparaciones.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para capturar más reparaciones de refrigeradoras a domicilio en tu zona.'
    },
    mapaVariables: { monthlyLeads: 110, avgTicketPEN: 260, baselineConvRate: 0.25, targetConvRate: 0.38, grossMargin: 0.60 }
  },

  'reparacion-lavadoras': {
    slug: 'reparacion-lavadoras',
    categoryName: 'Reparación de Lavadoras a Domicilio',
    icpB2B: {
      decisionMaker: 'Técnico Especialista en Lavadoras y Secadoras / Dueño de Servicio Técnico',
      dailyReality: 'Reparación a domicilio de lavadoras de carga frontal, superior y lavasecas Inverter (LG, Samsung, Whirlpool, Bosch), bombas de desagüe, tarjetas electrónicas, rodajes y mantenimiento profundo.',
      primaryBottleneck: 'Perder solicitudes de visita técnica a domicilio porque el cliente escribe indicando que su lavadora no centrifuga o marca error en pantalla, y nadie le responde rápido para coordinar la visita del día.',
      theBigDomino: 'Pedir automáticamente la Marca, foto del código de error en el panel (ej. OE, DE, UE, 4E) y el Distrito demuestra dominio técnico instantáneo y asegura la visita a domicilio.',
      opportunitySwitch: 'Pasar de una atención telefónica improvisada a un Sistema de Pre-Diagnóstico por Código de Error y Ruta Domiciliaria.',
      falseBeliefs: {
        vehicle: 'Creencia: "Cualquier técnico de barrio ve lavadoras". Realidad: Para lavasecas y equipos modernos Inverter, el cliente exige un especialista que conozca la electrónica de la marca y no malogre la tarjeta.',
        internal: 'Creencia: "Es difícil organizar las rutas por todo Lima". Realidad: Al capturar el distrito y código de error desde el primer mensaje, agrupas tus visitas por zonas y llevas el repuesto exacto en la maleta.',
        external: 'Creencia: "Solo llaman cuando la máquina muere por completo". Realidad: El mantenimiento preventivo y limpieza de tambor (cuando la ropa sale con pelusas o mal olor) es una fuente constante de ingresos y recomendaciones.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Familia con Ropa Acumulada o Lavadora Detenida a Mitad de Ciclo',
      demographics: '26 a 65 años, hogares en departamentos y casas de Lima.',
      burningDesire: 'Que reparen su lavadora o lavaseca en su propio domicilio en una sola visita, sin tener que cargar la máquina fuera del departamento.',
      visceralFear: 'Que se lleven la tarjeta electrónica o el equipo y no aparezcan más, o que después del arreglo quede perdiendo agua.',
      triggerEvent: 'Lavadora llena de agua que no drena ni centrifuga, código de error parpadeando, ruido fuerte al girar o puerta bloqueada.',
      mobileBehavior: 'Toma foto al modelo o error de su lavadora y escribe por WhatsApp buscando un técnico que atienda su distrito hoy o mañana.'
    },
    hookStoryOffer: {
      hook: 'Cuando una lavadora se queda detenida llena de agua y ropa, ¿tu servicio técnico captura ese código de error y agenda la visita en minutos, o deja que el cliente llame a otro?',
      story: 'Pedirle al cliente en automático la marca, foto del panel/error y distrito te permite llegar a su domicilio con el repuesto preciso (bomba, electroválvula o tarjeta) y cerrar la reparación en la primera visita.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para optimizar tu ruta y captación de reparaciones de lavadoras.'
    },
    mapaVariables: { monthlyLeads: 115, avgTicketPEN: 230, baselineConvRate: 0.25, targetConvRate: 0.38, grossMargin: 0.60 }
  },

  'tortas-personalizadas': {
    slug: 'tortas-personalizadas',
    categoryName: 'Tortas Personalizadas y Temáticas',
    icpB2B: {
      decisionMaker: 'Pastelera Creativa / Propietaria de Atelier de Tortas y Bocaditos Temáticos',
      dailyReality: 'Horneado, preparación de rellenos, modelado en fondant/buttercream y decoración artesanal para cumpleaños, bodas y bautizos.',
      primaryBottleneck: 'Pasar horas en WhatsApp respondiendo a personas que envían fotos de tortas de 3 pisos esperando pagar S/ 50, mientras estás con las manos en la masa y pierdes los pedidos reales de clientes dispuestos a pagar tu arte.',
      theBigDomino: 'Un catálogo con rangos de porciones/precios claros y un formulario rápido de pedido (Fecha del evento + Cantidad de porciones + Foto de temática + Sabor) filtra a quienes valoran la pastelería artística y cierra reservas con 50% de adelanto.',
      opportunitySwitch: 'Dejar de perder horas chateando precios sueltos y pasar a un Catálogo de Pastelería Artística con Cotizador por Porciones.',
      falseBeliefs: {
        vehicle: 'Creencia: "Si pongo precios base en mi catálogo, no me van a escribir". Realidad: Poner rangos por porciones ahorra el 80% de chats improductivos y atrae directo a quien sí tiene el presupuesto.',
        internal: 'Creencia: "Cada torta es distinta, no puedo automatizar". Realidad: La cotización final la das tú, pero el asistente recoge fecha, porciones, temática y distrito antes de que te sientes a responder.',
        external: 'Creencia: "La gente prefiere tortas comerciales de vitrina". Realidad: Para el cumpleaños de un hijo, boda o aniversario, la familia busca una torta personalizada con ingredientes caseros de verdad.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Mamá Organizadora de Cumpleaños, Novia o Familiar que Busca un Detalle Único',
      demographics: '24 a 50 años, padres de familia y organizadores de celebraciones en Lima.',
      burningDesire: 'Una torta hermosa por fuera (idéntica a la temática soñada) y deliciosa/húmeda por dentro, entregada puntual para el evento.',
      visceralFear: 'El clásico "expectativa vs. realidad" (que el diseño quede deforme), que el queque sea seco o que el pedido no esté listo a la hora de la fiesta.',
      triggerEvent: 'Cumpleaños infantil o de adulto, bautizo, baby shower, matrimonio o aniversario.',
      mobileBehavior: 'Revisa fotos reales de trabajos anteriores, envía imagen de referencia y pregunta disponibilidad de agenda para la fecha de su fiesta.'
    },
    hookStoryOffer: {
      hook: '¿Cuántas horas a la semana pierdes respondiendo mensajes de personas que quieren una torta personalizada al precio de supermercado, mientras estás horneando y decorando?',
      story: 'Tu tiempo en taller vale oro. Cuando tu sistema muestra tu catálogo real y recoge en automático fecha del evento, número de porciones y foto de referencia, solo dedicas tiempo a cerrar pedidos con adelanto.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para ordenar tus pedidos de tortas temáticas y paquetes de bocaditos.'
    },
    mapaVariables: { monthlyLeads: 120, avgTicketPEN: 180, baselineConvRate: 0.18, targetConvRate: 0.30, grossMargin: 0.55 }
  },

  'podologos': {
    slug: 'podologos',
    categoryName: 'Podólogos y Cuidado del Pie',
    icpB2B: {
      decisionMaker: 'Podólogo/a Titulado/a / Administrador/a de Centro Podológico',
      dailyReality: 'Atención de uñeros (onicocriptosis), tratamiento láser/clínico de hongos (onicomicosis), pie diabético, profilaxis podológica y atención a domicilio de adultos mayores.',
      primaryBottleneck: 'Pacientes con dolor agudo por uñero que necesitan turno hoy mismo pero no reciben respuesta rápida mientras el podólogo atiende, y pacientes de onicomicosis/profilaxis que no regresan a su control mensual por falta de recordatorio.',
      theBigDomino: 'Priorizar las urgencias de dolor (uñeros) en recepción y automatizar el recordatorio mensual de profilaxis y sesiones de hongos convierte cada primera visita en un paciente fijo todo el año.',
      opportunitySwitch: 'Pasar de atender citas aisladas a operar una Agenda de Urgencias Podológicas y Control Mensual Automatizado.',
      falseBeliefs: {
        vehicle: 'Creencia: "El paciente viene solo cuando le vuelve a doler la uña". Realidad: Si tu sistema le escribe a los 28 días para su profilaxis preventiva, el paciente agenda antes de sufrir otro uñero.',
        internal: 'Creencia: "Estoy con guantes atendiendo, no puedo tocar el celular". Realidad: El asistente digital clasifica si es urgencia (uñero), tratamiento de hongos o atención a domicilio y pre-reserva el turno.',
        external: 'Creencia: "La gente confunde podología con pedicure de salón". Realidad: Quien sufre de uñeros, hongos o pie diabético busca esterilización en autoclave y especialista podológico.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Paciente con Dolor por Uñero, Tratamiento de Hongos o Familiar de Adulto Mayor',
      demographics: '22 a 75 años, deportistas, oficinistas, pacientes diabéticos y adultos mayores en Lima.',
      burningDesire: 'Alivio inmediato del dolor al caminar sin dolor en el procedimiento, instrumental 100% esterilizado y solución definitiva a los hongos.',
      visceralFear: 'Que le lastimen más al extraer el uñero, contagio de hongos por instrumentos mal desinfectados o heridas peligrosas en pie diabético.',
      triggerEvent: 'Uña encarnada inflamada que impide ponerse zapatos, cambio de color/grosor en uñas o necesidad de atención podológica a domicilio para abuelos.',
      mobileBehavior: 'Busca podólogo cercano con excelentes reseñas de higiene y mano suave; pide cita urgente para el mismo día.'
    },
    hookStoryOffer: {
      hook: 'Un paciente con uñero busca alivio hoy mismo, y un paciente de profilaxis o láser necesita volver cada 28 días: ¿tu centro podológico captura y retiene ambos de forma automática?',
      story: 'Mientras estás con guantes atendiendo a un paciente, no puedes responder WhatsApp. Automatizar la reserva de urgencias y el recordatorio mensual de control mantiene tus sillones llenos toda la semana.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para optimizar la agenda y recurrencia de tu centro podológico.'
    },
    mapaVariables: { monthlyLeads: 125, avgTicketPEN: 130, baselineConvRate: 0.25, targetConvRate: 0.38, grossMargin: 0.65 }
  },

  'alquiler-de-canchas': {
    slug: 'alquiler-de-canchas',
    categoryName: 'Alquiler de Canchas Sintéticas y Grass',
    icpB2B: {
      decisionMaker: 'Propietario / Administrador de Complejo Deportivo de Canchas Sintéticas',
      dailyReality: 'Alquiler por horas de canchas de fulbito/fútbol 7, academias deportivas, campeonatos empresariales y concesión de bebidas/snacks.',
      primaryBottleneck: 'Perder horas en WhatsApp respondiendo "¿Qué horario tienes libre hoy en la noche?" mientras los organizadores de pichangas llaman a 4 complejos a la vez, además de sufrir cancelaciones a última hora que dejan la cancha vacía.',
      theBigDomino: 'Mostrar disponibilidad inmediata, bloquear la hora con adelanto automático por Yape/Plin y ofrecer a los grupos el "Abono Fijo Mensual" (4 semanas reservadas) garantiza ocupación plena en horario estelar y promociones en horas valle.',
      opportunitySwitch: 'Dejar de anotar reservas de palabra en un cuaderno y pasar a un Sistema de Reserva Garantizada con Abono y Clientes Fijos Semanales.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los grupos ya tienen su cancha fija de siempre". Realidad: Cada semana cientos de grupos buscan cancha porque su local habitual estaba lleno o tenía el grass desgastado.',
        internal: 'Creencia: "Si pido adelanto no reservan". Realidad: Todo grupo serio transfiere el adelanto en 1 minuto por Yape; quien no abona es quien te deja la cancha plantada a las 8:00 PM.',
        external: 'Creencia: "Las mañanas y tardes no se alquilan". Realidad: Se llenan con colegios, academias y torneos relámpago de empresas cuando tienes un canal comercial B2B activo.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'El "Organizador de la Pichanga" del Grupo de Amigos o Trabajo',
      demographics: '20 a 50 años, grupos de amigos, compañeros de oficina y organizadores de campeonatos en Lima.',
      burningDesire: 'Grass sintético en buen estado (con caucho y sin huecos), buena iluminación LED nocturna, estacionamiento seguro y vestuarios limpios.',
      visceralFear: 'Llegar con los 12 jugadores y descubrir que anotaron mal su reserva (doble reserva), grass resbaloso que cause lesiones o zona insegura.',
      triggerEvent: 'Coordinación en el grupo de WhatsApp de amigos/oficina entre lunes y jueves para jugar en la noche o el fin de semana.',
      mobileBehavior: 'Escribe a 3 canchas de la zona preguntando qué horas tienen libres entre 7:00 PM y 11:00 PM; reserva en la primera que le confirma turno.'
    },
    hookStoryOffer: {
      hook: 'Una hora de cancha vacía a las 8:00 PM por una reserva no confirmada o un mensaje respondido tarde es dinero que nunca se recupera: ¿cómo estás asegurando hoy tu ocupación?',
      story: 'El organizador del partido coordina con 12 amigos y necesita respuesta en 2 minutos. Automatizar la consulta de horarios, el abono por Yape y la reactivación semanal de todos los capitanes de equipo blinda tus ingresos.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para eliminar las horas muertas y asegurar reservas fijas en tus canchas.'
    },
    mapaVariables: { monthlyLeads: 180, avgTicketPEN: 150, baselineConvRate: 0.25, targetConvRate: 0.40, grossMargin: 0.70 }
  },

  'grooming-canino': {
    slug: 'grooming-canino',
    categoryName: 'Grooming Canino y Baño de Mascotas',
    icpB2B: {
      decisionMaker: 'Groomer Profesional / Dueño de Spa Canino y Pet Shop',
      dailyReality: 'Baño medicado/estético, cortes de raza a tijera/máquina, deslanado, limpieza de oídos/glándulas, corte de uñas y movilidad de recojo/entrega.',
      primaryBottleneck: 'Mientras estás bañando o secando a un perro no puedes contestar el celular, y los dueños de mascotas se pasan a los 40–50 días entre baño y baño en vez de venir puntualmente cada 21 días.',
      theBigDomino: 'Automatizar la reserva por raza/tamaño/estado del pelaje (y ruta de movilidad) junto con un recordatorio automático a los 21 días del último baño duplica la frecuencia de visitas de tu cartera actual.',
      opportunitySwitch: 'Pasar de esperar a que el dueño llame cuando el perro ya está muy sucio a operar un Club de Grooming con Recordatorio cada 21 Días.',
      falseBeliefs: {
        vehicle: 'Creencia: "El dueño trae a su perrito cuando puede". Realidad: Cuando le llega un mensaje amigable a las 3 semanas diciendo "A Toby ya le toca su baño y tenemos cupo de movilidad mañana", agenda al instante.',
        internal: 'Creencia: "Los perros llegan llenos de motas y quieren pagar tarifa básica". Realidad: Cuando tu flujo de reserva solicita raza, peso y foto actual del pelaje en WhatsApp, el precio de desmotado queda claro desde antes.',
        external: 'Creencia: "Solo quieren el baño simple". Realidad: Ofrecer en la reserva adicionales de "Hidratación de almohadillas + Limpieza dental ultrasónica / antipulgas" incrementa el ticket en un 30%.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Dueño Consentidor de Perro de Raza (Poodle, Shih Tzu, Schnauzer, Golden, French)',
      demographics: '22 a 55 años, dueños de mascotas en departamentos y casas de Lima.',
      burningDesire: 'Que su perrito regrese hermoso, perfumado, sin estrés, con un corte prolijo y que la movilidad sea 100% puntual y segura.',
      visceralFear: 'Que seden a su mascota sin permiso, que la corten o irriten la piel con la máquina o que la traten con brusquedad.',
      triggerEvent: 'Pasaron 3 semanas desde el último baño, mascota con mal olor/nudos o visita familiar el fin de semana.',
      mobileBehavior: 'Busca un spa canino con excelentes reseñas de trato amoroso, fotos de cortes reales y reserva rápida por WhatsApp.'
    },
    hookStoryOffer: {
      hook: 'Si tus clientes bañan a su mascota cada 35 días en vez de cada 21 días, estás perdiendo el 40% de facturación anual con tu misma cartera: ¿ya tienes automatizados tus recordatorios?',
      story: 'Mientras estás con la secadora y las tijeras en la mano, tu sistema puede agendar citas por raza/tamaño y recordar automáticamente a cada dueño cuando se cumplen 21 días de su último baño.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para llenar los turnos de baño y ruta de movilidad de tu grooming.'
    },
    mapaVariables: { monthlyLeads: 150, avgTicketPEN: 85, baselineConvRate: 0.28, targetConvRate: 0.42, grossMargin: 0.60 }
  },

  'florerias': {
    slug: 'florerias',
    categoryName: 'Florerías y Arreglos Florales a Domicilio',
    icpB2B: {
      decisionMaker: 'Propietario/a de Florería y Taller de Diseño Floral',
      dailyReality: 'Armado de ramos y cajas de rosas, tulipanes, girasoles, orquídeas, arreglos fúnebres/condolencias y despacho express con motorizados en todo Lima.',
      primaryBottleneck: 'La compra de flores es impulsiva y urgente ("necesito que llegue hoy antes de las 5:00 PM"): si tardas 15 minutos en enviar el catálogo, calcular el delivery por distrito y dar el número de Yape/cuenta, el cliente compra en otra florería online.',
      theBigDomino: 'Un catálogo móvil organizado por ocasión (Aniversario, Cumpleaños, Condolencias, Nacimiento) que calcula el envío y recoge la dedicatoria de la tarjeta en 2 minutos dispara los pedidos diarios y recuerda la fecha el próximo año.',
      opportunitySwitch: 'Pasar de enviar 30 fotos sueltas por WhatsApp a una Boutique Floral Digital con Pedido Express y Recordatorio Anual de Fechas.',
      falseBeliefs: {
        vehicle: 'Creencia: "Las grandes marcas de regalos acaparan internet". Realidad: Los clientes prefieren florerías de autor con flores frescas del día, trato personalizado y foto del arreglo terminado antes de salir a ruta.',
        internal: 'Creencia: "En San Valentín y Día de la Madre colapsamos y no podemos responder a todos". Realidad: Un flujo que ordena modelo + distrito + dedicatoria + comprobante de pago permite triplicar los pedidos procesados en fechas pico.',
        external: 'Creencia: "El cliente compra una vez y se olvida". Realidad: Quien regaló flores por un cumpleaños o aniversario volverá a comprar exactamente en esa misma fecha el próximo año si tu sistema le avisa 3 días antes.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Pareja / Familiar que Envía un Detalle Sorpresa o Empresa que Envía Condolencias/Felicitación',
      demographics: '22 a 60 años, compradores locales o peruanos en el extranjero enviando flores a familiares en Lima.',
      burningDesire: 'Que el arreglo llegue fresco, idéntico o mejor que en la foto del catálogo y exactamente en el rango horario prometido.',
      visceralFear: 'Que las flores lleguen marchitas, que entreguen tarde cuando la persona ya salió de la oficina/casa o que olviden poner la tarjeta con dedicatoria.',
      triggerEvent: 'Aniversario, cumpleaños, reconciliación, nacimiento en clínica o fallecimiento (arreglos de condolencias urgentes).',
      mobileBehavior: 'Quiere elegir el arreglo en menos de 2 minutos desde el celular, pagar por Yape/tarjeta y recibir confirmación de envío.'
    },
    hookStoryOffer: {
      hook: 'Quien busca enviar flores a domicilio hoy mismo en Lima compra en la primera florería que le muestra un catálogo claro y le confirma el envío en menos de 3 minutos.',
      story: 'Además de cerrar el pedido de hoy en segundos recogiendo dirección y dedicatoria sin fricción, cada cliente que compra por un cumpleaños o aniversario es una venta segura el próximo año si automatizas el recordatorio de su fecha especial.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para acelerar tus ventas diarias por WhatsApp y fidelizar cada fecha especial.'
    },
    mapaVariables: { monthlyLeads: 160, avgTicketPEN: 145, baselineConvRate: 0.24, targetConvRate: 0.38, grossMargin: 0.55 }
  },

  'lavanderias': {
    slug: 'lavanderias',
    categoryName: 'Lavanderías y Tintorerías a Domicilio',
    icpB2B: {
      decisionMaker: 'Propietario / Administrador de Lavandería y Tintorería al Seco',
      dailyReality: 'Lavado al peso, lavado al seco de ternos/vestidos de fiesta, lavado de edredones/frazadas/cortinas y ruta de recojo y entrega a domicilio.',
      primaryBottleneck: 'Depender solo de los vecinos que caminan con su bolsa de ropa en la cuadra, desperdiciando la alta demanda de recojo a domicilio de edredones, ternos y lavado semanal en edificios residenciales cercanos.',
      theBigDomino: 'Activar el "Pedido de Recojo a Domicilio en 1 Clic" en los edificios de tu radio de cobertura y enviar avisos estacionales (cambio de temporada de edredones/alfombras) llena tus máquinas toda la semana.',
      opportunitySwitch: 'Pasar de esperar en el mostrador a operar una Lavandería con Ruta de Recojo Domiciliario y Clientes Recurrentes.',
      falseBeliefs: {
        vehicle: 'Creencia: "El delivery de ropa quita mucho margen". Realidad: Cuando estableces un pedido mínimo para recojo gratuito (ej. 2 edredones o paquete familiar) y agrupas por horarios en tu mismo distrito, el ticket se duplica.',
        internal: 'Creencia: "La gente no sabe cuánto pesa su ropa antes de enviarla". Realidad: Con paquetes claros (por edredón, por prenda al seco o por bolsa/kilos), el cliente pide el recojo sin dudas.',
        external: 'Creencia: "Todos tienen lavadora en casa". Realidad: Las lavadoras domésticas no lavan bien edredones King/Queen, ternos al seco ni vestidos delicados, y los profesionales jóvenes prefieren delegar el lavado y planchado.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Profesional Ocupado en Edificio Residencial y Familia que Lava Edredones/Prendas Delicadas',
      demographics: '24 a 60 años, residentes de departamentos en Lima con poco tiempo o espacio de tendido (especialmente en el húmedo invierno limeño).',
      burningDesire: 'Ropa y edredones impecables, secos, suaves, bien doblados o planchados, recogidos y entregados puntualmente en la recepción de su edificio.',
      visceralFear: 'Que encojan o destiñan una prenda cara, que se pierdan prendas o que la ropa regrese con olor a humedad.',
      triggerEvent: 'Humedad de invierno en Lima (la ropa no seca), cambio de temporada de edredones, matrimonio/evento (ternos y vestidos) o semana de mucho trabajo.',
      mobileBehavior: 'Busca una lavandería cercana que recoja a domicilio hoy mismo por WhatsApp con lista de precios transparente.'
    },
    hookStoryOffer: {
      hook: 'En los edificios a 10 cuadras de tu lavandería hay cientos de familias que necesitan lavar edredones, ternos y ropa cada semana: ¿les estás facilitando pedir el recojo en 1 clic?',
      story: 'En el clima húmedo de Lima, quien ofrece recojo y entrega puntual por WhatsApp con paquetes claros de edredones y lavado familiar multiplica su ticket promedio frente a quien solo espera en mostrador.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para aumentar tus pedidos a domicilio y recurrencia semanal.'
    },
    mapaVariables: { monthlyLeads: 130, avgTicketPEN: 95, baselineConvRate: 0.25, targetConvRate: 0.38, grossMargin: 0.58 }
  },

  'cevicherias': {
    slug: 'cevicherias',
    categoryName: 'Cevicherías y Pescados y Mariscos',
    icpB2B: {
      decisionMaker: 'Propietario / Chef Administrador de Cevichería y Restaurante Marino',
      dailyReality: 'Compra de pescado y mariscos frescos del día, operación intensa de cocina entre 11:30 AM y 5:00 PM, atención de salón y pedidos de delivery.',
      primaryBottleneck: 'En la hora punta del mediodía (12:00 PM a 2:30 PM), el teléfono y el WhatsApp colapsan: los clientes que quieren reservar mesa grupal o pedir delivery directo sin pagar 30% de comisión a apps de reparto se quedan sin respuesta.',
      theBigDomino: 'Una Carta Digital Interactiva que toma pedidos directos de delivery y reservas de mesas (almuerzos familiares y corporativos) libera la caja en hora punta y ahorra miles de soles en comisiones de terceros.',
      opportunitySwitch: 'Dejar de perder pedidos en hora punta o regalar el 30% de margen a apps externas, y activar un Canal Propio de Carta Digital, Delivery y Reservas.',
      falseBeliefs: {
        vehicle: 'Creencia: "La gente solo pide por aplicativos de delivery". Realidad: Tus clientes frecuentes del barrio prefieren pedirte directo por WhatsApp si tienen tu carta actualizada a un toque y entrega rápida.',
        internal: 'Creencia: "De 12 a 3 PM la cajera no puede ni mirar el celular". Realidad: Cuando el cliente arma su pedido en tu carta digital, el mensaje ya llega a WhatsApp con los platos, dirección y monto exacto listos para confirmar.',
        external: 'Creencia: "De lunes a jueves el salón siempre baja". Realidad: Con almuerzos ejecutivos marinos y promociones para oficinas de la zona vía WhatsApp, llenas las mesas entre semana.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Familia del Fin de Semana y Grupo de Oficina en Almuerzo Marino',
      demographics: '24 a 65 años, amantes de la buena comida marina fresca y bien servida en Lima.',
      burningDesire: 'Pescado y mariscos fresquísimos del día, leche de tigre potente, porciones generosas y atención rápida sin esperar 1 hora por el plato.',
      visceralFear: 'Mariscos que no estén frescos, demoras eternas en el delivery o llegar en familia el domingo y no encontrar mesa.',
      triggerEvent: 'Antojo de mediodía (11:30 AM – 1:30 PM), almuerzo de cumpleaños/oficina o fin de semana familiar.',
      mobileBehavior: 'Quiere ver la carta con fotos y precios en menos de 5 segundos en su celular para pedir delivery o reservar mesa.'
    },
    hookStoryOffer: {
      hook: 'Entre las 12:00 PM y las 2:30 PM se define el 80% de la venta del día en tu cevichería: ¿cuántos pedidos directos y reservas de grupos pierdes porque la caja está saturada?',
      story: 'Además de recuperar el margen que se llevan los aplicativos, una carta digital rápida conectada a tu WhatsApp permite que el pedido o la reserva llegue armada en segundos sin colapsar a tu personal.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para multiplicar tus pedidos directos y reservas de grupos en tu cevichería.'
    },
    mapaVariables: { monthlyLeads: 200, avgTicketPEN: 115, baselineConvRate: 0.25, targetConvRate: 0.38, grossMargin: 0.52 }
  },

  'pollerias': {
    slug: 'pollerias',
    categoryName: 'Pollerías y Pollos a la Brasa',
    icpB2B: {
      decisionMaker: 'Propietario / Administrador de Pollería y Parrillas',
      dailyReality: 'Horneado de pollos a la brasa, papas, ensaladas, parrillas, atención de salón familiar y alto volumen de despacho a domicilio por las noches y domingos.',
      primaryBottleneck: 'Colapso de llamadas y mensajes entre las 7:00 PM y 9:30 PM y los domingos al mediodía, donde decenas de pedidos directos de vecinos se pierden o terminan entrando por apps que cobran hasta 30% de comisión.',
      theBigDomino: 'Un sistema de Pedido Directo en 3 Toques (1 Pollo / Medio / Promoción Familiar + Bebida + Dirección + Pago Yape/Efectivo) multiplica la velocidad de despacho del call center y retiene el 100% del margen en casa.',
      opportunitySwitch: 'Pasar de tomar pedidos letra por letra en hora punta a una Central Digital de Pedidos Directos y Promociones Familiares.',
      falseBeliefs: {
        vehicle: 'Creencia: "Para pedir pollo la gente llama al teléfono fijo". Realidad: Hoy el 75% de familias prefiere pedir por WhatsApp en 30 segundos viendo las promociones familiares sin esperar en línea ocupada.',
        internal: 'Creencia: "Ya estamos en apps de reparto". Realidad: Cada cliente del barrio que te pide por app en vez de por tu canal directo te cuesta entre S/ 18 y S/ 25 de comisión por cada pollo.',
        external: 'Creencia: "El cliente no repite hasta el próximo mes". Realidad: Con un mensaje de promoción familiar los jueves o domingos a las 6:00 PM a tu propia base de vecinos, disparas los pedidos de inmediato.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Familia Limeña en Cena de Semana o Almuerzo Dominical',
      demographics: '22 a 65 años, hogares en un radio de 2 a 3 km alrededor de la pollería.',
      burningDesire: 'Pollo a la brasa jugoso y bien dorado, papas crujientes, buenas cremas y que el motorizado llegue rápido con el pedido caliente.',
      visceralFear: 'Esperar más de 1 hora con hambre, que llegue frío, que falten las cremas o que nadie conteste el teléfono de la pollería.',
      triggerEvent: 'Noche de viernes/sábado, almuerzo de domingo en familia, partido de la selección peruana o cumpleaños.',
      mobileBehavior: 'En hora de hambre quiere pedir en menos de 1 minuto: ver combos familiares, confirmar dirección y pagar con Yape/Plin.'
    },
    hookStoryOffer: {
      hook: 'Si vendes 300 pollos al mes por aplicativos de terceros, estás entregando más de S/ 6,000 mensuales en comisiones: ¿por qué no convertir a esos vecinos en pedidos directos por tu propio WhatsApp?',
      story: 'En las horas pico de viernes a domingo, tu teléfono colapsa. Con una carta rápida de combos familiares que envía el pedido listo a tu WhatsApp, despachas el doble de rápido y te quedas con el 100% de tu ganancia.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para recuperar tu margen de delivery y acelerar tus pedidos en hora punta.'
    },
    mapaVariables: { monthlyLeads: 240, avgTicketPEN: 90, baselineConvRate: 0.28, targetConvRate: 0.42, grossMargin: 0.50 }
  },

  'chifas': {
    slug: 'chifas',
    categoryName: 'Chifas y Comida Chino-Peruana',
    icpB2B: {
      decisionMaker: 'Propietario / Administrador de Chifa y Restaurante Oriental',
      dailyReality: 'Cocina al wok de alta velocidad (chaufa, tallarín saltado, kam lu wantán, sopas), combos personales/familiares y despacho continuo de delivery y recojo en tienda.',
      primaryBottleneck: 'La cocina al wok saca un plato en 4 minutos, pero tomar el pedido por WhatsApp o teléfono tarda 10 minutos porque el cliente pide foto de la carta borrosa y pregunta plato por plato.',
      theBigDomino: 'Digitalizar la carta de banquetes familiares y combos con pedido directo a WhatsApp iguala la velocidad de tu recepción con la velocidad de tu cocina al wok.',
      opportunitySwitch: 'Dejar de enviar fotos borrosas del menú de papel y pasar a un Menú Digital Oriental de Pedido Instantáneo.',
      falseBeliefs: {
        vehicle: 'Creencia: "Los vecinos ya conocen el chifa de memoria". Realidad: Conocen el aeropuerto o el chaufa, pero cuando ven en el celular tus Banquetes Familiares para 4 o 6 personas, el ticket de compra se triplica.',
        internal: 'Creencia: "No tenemos tiempo para manejar una web". Realidad: Tu carta digital no requiere mantenimiento diario; el cliente elige sus platos y te llega el resumen listo para comandar a cocina.',
        external: 'Creencia: "El delivery propio es complicado". Realidad: Con tu propio motorizado en un radio de 15 cuadras y pedidos ordenados por WhatsApp, entregas en 25 minutos y fidelizas a todo el barrio.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Familia / Pareja en Cena Nocturna y Trabajadores en Hora de Almuerzo',
      demographics: '20 a 65 años, vecinos del distrito y oficinas cercanas.',
      burningDesire: 'Comida al wok recién hecha, humeante, bien despachada y con entrega rapidísima a domicilio o lista para recoger sin esperar.',
      visceralFear: 'Llamar y que el teléfono suene ocupado, no entender bien qué trae cada banquete familiar o que se confundan en su orden.',
      triggerEvent: 'Almuerzo rápido entre semana o cena familiar/antojo de noche (7:00 PM a 10:30 PM).',
      mobileBehavior: 'Busca ver los Banquetes Familiares y Combos con detalle de platos y precio exacto para pedir por WhatsApp al instante.'
    },
    hookStoryOffer: {
      hook: 'Tu cocinero saca un plato al wok en 4 minutos, pero ¿cuánto demora hoy un cliente en poder ver tu carta y confirmar su pedido por WhatsApp en hora punta?',
      story: 'Cuando el vecino tiene hambre a las 8:00 PM, si ve tus Banquetes Familiares claros en el celular y puede enviar su orden lista en 30 segundos, aumentas el ticket promedio y evitas que el teléfono colapse.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para agilizar tus pedidos de delivery, recojo y banquetes familiares.'
    },
    mapaVariables: { monthlyLeads: 210, avgTicketPEN: 95, baselineConvRate: 0.26, targetConvRate: 0.40, grossMargin: 0.52 }
  },

  'pizzerias': {
    slug: 'pizzerias',
    categoryName: 'Pizzerías Artesanales y Pastas',
    icpB2B: {
      decisionMaker: 'Propietario / Maestro Pizzero de Pizzería Artesanal o Trattoria',
      dailyReality: 'Fermentación de masa, horno de piedra/leña, preparación de pastas artesanales, atención de salón nocturno y despacho de delivery.',
      primaryBottleneck: 'Perder el margen de ganancia en aplicativos de delivery donde compites al lado de cadenas industriales de comida rápida, y no reactivar directamente por WhatsApp a tus clientes en noches de jueves a domingo.',
      theBigDomino: 'Tener tu propio Club/Carta de Pedido Directo (con combos de Pizza + Pasta + Vino/Bebida exclusivos de tu web) ahorra hasta 30% de comisión y te permite activar pedidos cada viernes con un solo mensaje.',
      opportunitySwitch: 'Pasar de depender de algoritmos de apps de reparto a ser dueño de tu propia Cartera de Amantes de la Pizza Artesanal.',
      falseBeliefs: {
        vehicle: 'Creencia: "Si no doy descuento en la app no vendo". Realidad: El cliente que prueba tu masa artesanal repite por sabor; si en la caja de la pizza incluyes un QR hacia tu carta directa con un beneficio (ej. pan al ajo o delivery gratis), el segundo pedido es 100% tuyo.',
        internal: 'Creencia: "En la noche estamos frente al horno, es difícil responder chats largos". Realidad: La carta digital arma el pedido (tamaño, sabores mitad/mitad, bordes, dirección) antes de llegar a tu WhatsApp.',
        external: 'Creencia: "Solo se vende viernes y sábado". Realidad: Con promociones de martes/miércoles de pastas o 2x1 artesanal a tu lista de WhatsApp, levantas la venta de media semana.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Pareja / Grupo de Amigos en Noche de Película o Cena en Trattoria',
      demographics: '22 a 52 años, público que valora ingredientes de verdad (queso mozzarella real, masa madre/artesanal, salsa pomodoro casera).',
      burningDesire: 'Una pizza artesanal crujiente y caliente o una pasta recién hecha, sin esperar una hora ni recibir una caja fría.',
      visceralFear: 'Masa cruda o gomosa, que la pizza llegue fría/revuelta por un mal motorizado o que la reserva de mesa no esté registrada.',
      triggerEvent: 'Noche de viernes/sábado, reunión con amigos, partido de fútbol o cena romántica.',
      mobileBehavior: 'Revisa fotos tentadoras de las pizzas/pastas en su celular, elige su combo y pide directo por WhatsApp.'
    },
    hookStoryOffer: {
      hook: '¿Por qué seguir entregando hasta el 30% del valor de cada pizza artesanal a los aplicativos cuando tus clientes del barrio pueden pedirte directo en 30 segundos?',
      story: 'El cliente que ya probó tu pizza artesanal te prefiere a ti, no a la app. Con una carta digital propia que arme el pedido a tu WhatsApp y un sistema de fidelización, conviertes cada entrega en un cliente recurrente de alto margen.',
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito para aumentar tus pedidos directos y reservas de salón.'
    },
    mapaVariables: { monthlyLeads: 190, avgTicketPEN: 85, baselineConvRate: 0.25, targetConvRate: 0.38, grossMargin: 0.55 }
  },

  'cafeterias': {
    slug: 'cafeterias',
    categoryName: 'Cafeterías de Especialidad y Brunch',
    icpB2B: {
      decisionMaker: 'Propietario/a de Cafetería de Especialidad, Brunch o Pastelería de Autor',
      dailyReality: 'Extracción de café de especialidad peruano, horneado de bollería/postres, servicio de desayunos/brunch y atención de clientes que buscan trabajar o reunirse.',
      primaryBottleneck: 'Depender solo del cliente que entra por casualidad, perdiendo reservas de grupos (cumpleaños/brunch de fin de semana), pedidos de catering/coffee break para oficinas cercanas y venta de café en grano/boxes de regalo.',
      theBigDomino: 'Abrir 3 líneas de ingreso digital desde tu carta web (1. Reserva de mesas para Brunch/Cumpleaños, 2. Boxes de Desayuno/Postres a domicilio, y 3. Coffee Break para oficinas de la zona) multiplica la facturación más allá del aforo físico de tus mesas.',
      opportunitySwitch: 'Dejar de vender solo tazas individuales en barra y activar un Ecosistema de Brunch, Boxes de Regalo y Coffee Break Corporativo.',
      falseBeliefs: {
        vehicle: 'Creencia: "Una cafetería no necesita web porque el ticket es de S/ 20". Realidad: Una mesa de brunch para 4 personas, un box de desayuno sorpresa o un pedido de oficina para 15 personas supera los S/ 150 a S/ 600.',
        internal: 'Creencia: "Publicamos fotos bonitas en Instagram todos los días". Realidad: Las fotos dan likes, pero sin un catálogo de reservas de brunch, boxes y pedidos por WhatsApp no se traducen en ventas de alto ticket.',
        external: 'Creencia: "En las tardes de lunes a jueves baja el público". Realidad: Los profesionales en teletrabajo y reuniones buscan cafeterías con buen Wi-Fi, enchufes y carta clara en Google Maps.'
      }
    },
    endCustomerAvatar: {
      archetypeName: 'Amante del Café de Especialidad / Grupo de Amigas en Brunch y Profesional Remoto',
      demographics: '22 a 48 años, jóvenes profesionales, grupos de amigos celebrando cumpleaños y oficinas del distrito.',
      burningDesire: 'Café peruano bien extraído, postres y brunch recién hechos, espacio acogedor/instagrameable y atención cálida.',
      visceralFear: 'Ir un sábado con su grupo de amigos y no encontrar mesa, o pedir un box de regalo y que llegue tarde.',
      triggerEvent: 'Celebración de cumpleaños en brunch, reunión de negocios/teletrabajo, antojo de media tarde o regalo especial.',
      mobileBehavior: 'Busca en Google Maps e Instagram la carta de brunch, fotos del espacio y enlace directo de WhatsApp para reservar mesa o pedir un box.'
    },
    hookStoryOffer: {
      hook: 'Tu cafetería tiene un límite físico de mesas, pero ¿estás capturando las reservas de cumpleaños, los boxes de desayuno a domicilio y los pedidos de oficinas de tu zona?',
      story: 'Cuando combinas tu atención en barra con un catálogo digital para reservas de grupos, boxes de regalo y coffee breaks corporativos por WhatsApp, tu ticket promedio pasa de S/ 25 a más de S/ 120.',
      offer: 'Solicita tu Auditoría Gratuita MAPA para expandir las ventas de brunch, reservas y pedidos corporativos de tu cafetería.'
    },
    mapaVariables: { monthlyLeads: 170, avgTicketPEN: 75, baselineConvRate: 0.24, targetConvRate: 0.36, grossMargin: 0.60 }
  }
};

/**
 * Obtiene el Buyer Persona completo para una categoría específica.
 * Si una categoría nueva aún no está en el mapa explícito, construye un perfil canónico
 * combinando purchasingPowerRanking + nicheTemplates para garantizar cobertura 100% determinista.
 *
 * @param {string} categorySlug Slug de la categoría
 */
export function getBuyerPersona(categorySlug) {
  if (BUYER_PERSONAS_BY_CATEGORY[categorySlug]) {
    return BUYER_PERSONAS_BY_CATEGORY[categorySlug];
  }

  const rankInfo = getCategoryRankInfo(categorySlug);
  const niche = getNicheTemplate(categorySlug);
  const catName = rankInfo?.name || categorySlug;
  const avgTicket = rankInfo?.avgTicketPEN || 250;

  return {
    slug: categorySlug,
    categoryName: catName,
    icpB2B: {
      decisionMaker: `Propietario / Director Comercial de ${catName}`,
      dailyReality: 'Supervisión operativa diaria del servicio mientras intenta responder consultas y cerrar ventas.',
      primaryBottleneck: 'Demora en la primera respuesta de WhatsApp y falta de seguimiento estructurado a las cotizaciones enviadas.',
      theBigDomino: `Si el titular instala un sistema de recepción, calificación y seguimiento 24/7 en WhatsApp, multiplicará sus cierres en ${catName} sin incrementar su planilla fija.`,
      opportunitySwitch: 'Pasar de la atención manual improvisada a un Sistema Autónomo de Calificación y Conversión 24/7.',
      falseBeliefs: {
        vehicle: 'El sistema automatiza la recepción administrativa y el filtrado sin perder el toque humano en el cierre.',
        internal: 'Se despliega llave en mano sin requerir conocimientos de programación por parte del propietario.',
        external: 'El cliente en Lima valora la respuesta inmediata en segundos por encima de esperar horas en visto.'
      }
    },
    endCustomerAvatar: {
      archetypeName: `Cliente Calificado de ${catName} en Lima`,
      demographics: '25 a 60 años, residentes y empresas en Lima Metropolitana.',
      burningDesire: niche.targetAudience,
      visceralFear: niche.painPoint,
      triggerEvent: `Necesidad inmediata o programada de contratar ${catName.toLowerCase()} con garantía.`,
      mobileBehavior: 'Compara 3 opciones en su celular y contrata al negocio que le responde rápido con información clara y confianza.'
    },
    hookStoryOffer: {
      hook: `¿Sabías que más del 40% de clientes que buscan ${catName.toLowerCase()} en Lima contratan al primer negocio que les responde con claridad en WhatsApp?`,
      story: `Mientras estás concentrado en la operación diaria, entran consultas de clientes listos para contratar. Sin un sistema de recepción y seguimiento, esas oportunidades se van a la competencia.`,
      offer: 'Solicita tu Diagnóstico Estratégico MAPA gratuito y descubre cómo capturar y cerrar más clientes cada mes.'
    },
    mapaVariables: {
      monthlyLeads: 80,
      avgTicketPEN: avgTicket,
      baselineConvRate: 0.12,
      targetConvRate: 0.20,
      grossMargin: 0.50
    }
  };
}

/**
 * Calcula el escenario determinista de impacto económico según el Método MAPA
 * (Fórmula canónica del proyecto Sistema Automatizado / Hazlo Crecer):
 *   Clientes Adicionales = L * (c1 - c0)
 *   Ingreso Adicional Hipotético = Clientes Adicionales * T
 *   Contribución Bruta Adicional = Ingreso Adicional * m
 */
export function calculateMapaEconomics(categorySlug, customReviewsCount = 0) {
  const persona = getBuyerPersona(categorySlug);
  const vars = persona.mapaVariables;

  // Ajuste conservador de volumen mensual L según tracción observada en reseñas
  const L = customReviewsCount > 50
    ? Math.max(vars.monthlyLeads, Math.min(350, Math.round(customReviewsCount * 1.2)))
    : vars.monthlyLeads;
  const T = vars.avgTicketPEN;
  const c0 = vars.baselineConvRate;
  const c1 = vars.targetConvRate;
  const m = vars.grossMargin;

  const currentClients = Math.round(L * c0);
  const projectedClients = Math.round(L * c1);
  const additionalClients = Math.max(1, projectedClients - currentClients);
  const currentMonthlyRevenuePEN = Math.round(currentClients * T);
  const additionalMonthlyRevenuePEN = Math.round(additionalClients * T);
  const additionalGrossMarginPEN = Math.round(additionalMonthlyRevenuePEN * m);
  const annualOpportunityCostPEN = additionalMonthlyRevenuePEN * 12;

  return {
    formula: 'Clientes Adicionales = L × (c1 - c0) | Ingreso Adicional = Clientes Adicionales × T',
    evidenceStatus: 'HIPÓTESIS POR VALIDAR EN INTAKE (Basada en parámetros sectoriales de Lima)',
    inputs: {
      L_monthlyLeads: L,
      T_avgTicketPEN: T,
      c0_baselineConversion: `${Math.round(c0 * 100)}%`,
      c1_targetConversion: `${Math.round(c1 * 100)}%`,
      m_grossMargin: `${Math.round(m * 100)}%`
    },
    outputs: {
      currentClientsPerMonth: currentClients,
      projectedClientsPerMonth: projectedClients,
      additionalClientsPerMonth: additionalClients,
      currentMonthlyRevenuePEN,
      additionalMonthlyRevenuePEN,
      additionalGrossMarginPEN,
      annualOpportunityCostPEN
    }
  };
}
