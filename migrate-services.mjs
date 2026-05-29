import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan variables de entorno");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const horarios = [
    { title: "Pediatría", dias: "Lunes a Jueves", horas: "7:00 AM a 12:00 PM / L,Mi,J: 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { title: "Inmunización", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM", nota: "Orden de llegada" },
    { title: "Nefrología Pediátrica", dias: "Miércoles y Jueves", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { title: "Obstetricia", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { title: "Gastroenterología Pediátrica", dias: "Jueves", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { title: "Medicina Ocupacional", dias: "L,Mi,V (Mañana) / L,M,J,V (Tarde)", horas: "7:00 AM a 12:00 PM / 1:00 PM a 5:00 PM", nota: "Orden regular" },
    { title: "Ginecología", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { title: "Podología", dias: "Mar, Mié, Jue, Vie", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { title: "Foniatría", dias: "Según Cronograma", horas: "7:00 AM a 1:00 PM", nota: "Cronograma Semanal" },
    { title: "Medicina Interna", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / L,Mi: 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { title: "Cirugía General", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { title: "Emergencias 24 Horas", dias: "Lunes a Domingo", horas: "24 Horas (Adulto, Pediatría, Parto)", nota: "Si Contamos" },
    { title: "Traumatología", dias: "L,Mi,J,V", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { title: "Cirugía Pediátrica", dias: "L,M,Mi (Mañana) / L,M,V (Tarde)", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { title: "Medicina Familiar", dias: "Lunes a Viernes", horas: "M,Mi,J,V: 7AM a 12PM / L a V: 1PM a 6PM", nota: "Previa Cita" },
    { title: "Laboratorio Básico - Avanzada", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Pruebas Rápidas / Previa Cita" },
    { title: "Consulta Diferenciada Adolescentes", dias: "L,Mi,J", horas: "7:00 AM a 12:00 PM / Mi,J: 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { title: "Odontología", dias: "Lunes a Viernes", horas: "8:00 AM a 12:00 PM / 1:00 PM a 5:00 PM", nota: "Previa Cita" },
    { title: "Epidemiología", dias: "Según Cronograma", horas: "7:00 AM a 1:00 PM", nota: "Cronograma Semanal" },
    { title: "Orientación de la Conducta", dias: "Lunes, Martes y Viernes", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { title: "Dermatología", dias: "Martes", horas: "1:00 PM a 5:00 PM", nota: "Previa Cita" },
    { title: "Anestesiología", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { title: "Lactancia Materna", dias: "Mi (Mañana) / M,V (Tarde)", horas: "Mi: 7AM a 1PM / M,V: 1PM a 6PM", nota: "Previa Cita" },
    { title: "Cirugía Oncológica", dias: "Lunes", horas: "1:00 PM a 6:00 PM (Cada 15 Días)", nota: "Previa Cita" },
    { title: "Pie Diabético", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM", nota: "Orden de Llegada" },
    { title: "Nutrición", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
];

const servicios = [
    { title: "Pediatría", icon: "👶", description: "Atención especializada para bebés, niños y adolescentes." },
    { title: "Nefrología Pediátrica", icon: "🩸", description: "Diagnóstico y tratamiento de enfermedades renales en niños." },
    { title: "Gastroenterología Pediátrica", icon: "🍏", description: "Cuidado del sistema digestivo infantil." },
    { title: "Cirugía Pediátrica", icon: "🩻", description: "Procedimientos quirúrgicos especializados para infantes." },
    { title: "Obstetricia", icon: "🤰", description: "Control prenatal y área de maternidad." },
    { title: "Ginecología", icon: "👩‍⚕️", description: "Atención clínica integral de la mujer." },
    { title: "Medicina Interna", icon: "🩺", description: "Evaluación integral, diagnóstico y tratamiento clínico para adultos." },
    { title: "Medicina Familiar", icon: "👨‍👩‍👧‍👦", description: "Atención médica integral continua para el individuo y la familia." },
    { title: "Medicina Ocupacional", icon: "💼", description: "Salud laboral y preventiva." },
    { title: "Traumatología", icon: "🦴", description: "Tratamiento de lesiones del sistema musculoesquelético." },
    { title: "Cirugía General", icon: "⚕️", description: "Intervenciones quirúrgicas generales." },
    { title: "Cirugía Oncológica", icon: "🎗️", description: "Consultas oncológicas especializadas (cada 15 días)." },
    { title: "Emergencias 24 Horas", icon: "🚑", description: "Servicio ininterrumpido. Adulto, Pediatría y Sala de Parto." },
    { title: "Odontología", icon: "🦷", description: "Salud bucal, tratamientos preventivos y curativos." },
    { title: "Podología", icon: "🦶", description: "Cuidado especializado integral de los pies." },
    { title: "Pie Diabético", icon: "🩸", description: "Cuidado preventivo y tratamiento para pacientes con diabetes." },
    { title: "Dermatología", icon: "🧴", description: "Cuidado clínico de la piel." },
    { title: "Foniatría", icon: "🗣️", description: "Diagnóstico y tratamiento de trastornos de la voz, habla y lenguaje." },
    { title: "Orientación de la Conducta", icon: "🧠", description: "Apoyo y orientación psicológica." },
    { title: "Consulta Diferenciada Adolescentes", icon: "🎒", description: "Atención adaptada a las necesidades médicas de los jóvenes." },
    { title: "Lactancia Materna", icon: "🍼", description: "Asesoría y apoyo para madres lactantes." },
    { title: "Inmunización", icon: "💉", description: "Esquema nacional de vacunación para todas las edades." },
    { title: "Laboratorio Básico - Avanzada", icon: "🔬", description: "Pruebas rápidas y exámenes de laboratorio completos." },
    { title: "Epidemiología", icon: "📊", description: "Vigilancia y control epidemiológico de la región." },
    { title: "Anestesiología", icon: "💤", description: "Evaluación pre-anestésica y quirófanos operativos." },
    { title: "Nutrición", icon: "🥗", description: "Evaluación, diagnóstico y tratamiento nutricional." }
];

async function migrateData() {
  console.log("Iniciando migración de datos...");
  const mergedData = horarios.map(h => {
    const s = servicios.find(s => s.title === h.title);
    return {
      title: h.title,
      icon: s ? s.icon : "🩺",
      description: s ? s.description : "",
      dias: h.dias,
      horas: h.horas,
      nota: h.nota,
      is_active: true
    };
  });

  const { data, error } = await supabase.from('servicios').insert(mergedData);
  if (error) {
    console.error("Error al insertar datos:", error);
  } else {
    console.log("¡Migración exitosa! 26 servicios insertados.");
  }
}

migrateData();
