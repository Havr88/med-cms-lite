export default function Servicios() {
  const allServices = [
    { title: "Pediatría", icon: "👶", desc: "Atención especializada para bebés, niños y adolescentes." },
    { title: "Nefrología Pediátrica", icon: "🩸", desc: "Diagnóstico y tratamiento de enfermedades renales en niños." },
    { title: "Gastroenterología Pediátrica", icon: "🍏", desc: "Cuidado del sistema digestivo infantil." },
    { title: "Cirugía Pediátrica", icon: "🩻", desc: "Procedimientos quirúrgicos especializados para infantes." },
    { title: "Obstetricia y Ginecología", icon: "🤰", desc: "Control prenatal, atención integral de la mujer y área de maternidad." },
    { title: "Medicina Interna", icon: "🩺", desc: "Evaluación integral, diagnóstico y tratamiento clínico para adultos." },
    { title: "Medicina Familiar", icon: "👨‍👩‍👧‍👦", desc: "Atención médica integral continua para el individuo y la familia." },
    { title: "Medicina Ocupacional", icon: "💼", desc: "Salud laboral y preventiva." },
    { title: "Traumatología", icon: "🦴", desc: "Tratamiento de lesiones del sistema musculoesquelético." },
    { title: "Cirugía General y Oncológica", icon: "⚕️", desc: "Intervenciones quirúrgicas generales y consultas oncológicas (cada 15 días)." },
    { title: "Emergencias 24 Horas", icon: "🚑", desc: "Servicio ininterrumpido. Adulto, Pediatría y Sala de Parto." },
    { title: "Odontología", icon: "🦷", desc: "Salud bucal, tratamientos preventivos y curativos." },
    { title: "Podología y Pie Diabético", icon: "🦶", desc: "Cuidado especializado de los pies, especialmente para pacientes con diabetes." },
    { title: "Dermatología", icon: "🧴", desc: "Cuidado clínico de la piel." },
    { title: "Foniatría", icon: "🗣️", desc: "Diagnóstico y tratamiento de trastornos de la voz, habla y lenguaje." },
    { title: "Orientación de la Conducta", icon: "🧠", desc: "Apoyo y orientación psicológica." },
    { title: "Consulta Diferenciada Adolescentes", icon: "🎒", desc: "Atención adaptada a las necesidades médicas de los jóvenes." },
    { title: "Lactancia Materna", icon: "🍼", desc: "Asesoría y apoyo para madres lactantes." },
    { title: "Inmunización", icon: "💉", desc: "Esquema nacional de vacunación para todas las edades." },
    { title: "Laboratorio Básico - Avanzada", icon: "🔬", desc: "Pruebas rápidas y exámenes de laboratorio completos." },
    { title: "Epidemiología", icon: "📊", desc: "Vigilancia y control epidemiológico de la región." },
    { title: "Anestesiología y Área Quirúrgica", icon: "💤", desc: "Evaluación pre-anestésica y quirófanos operativos." },
    { title: "Nutrición", icon: "🥗", desc: "Evaluación, diagnóstico y tratamiento nutricional." }
  ];

  // Filtramos servicios si el administrador decide ocultarlos en Vercel
  // Ejemplo: SHOW_ODONTOLOGIA=false ocultará "Odontología"
  const activeServices = allServices.filter(service => {
    // Normalizamos el título para buscar la variable de entorno
    const varName = `SHOW_${service.title.split(" ")[0].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
    return process.env[varName] !== 'false';
  });

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-primary text-4xl mb-4">Servicios Médicos Disponibles</h1>
        <p className="text-muted max-w-2xl" style={{ margin: '0 auto', lineHeight: '1.6' }}>
          De acuerdo al cuadernillo oficial de servicios, la Clínica Popular Jesús de Nazareth cuenta con diversas especialidades e instalaciones operativas.
          Nuestros profesionales médicos están comprometidos con la salud de sus pacientes, brindando un diagnóstico y tratamiento adecuado a cada caso de manera personalizada y de calidad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {activeServices.map((service, index) => (
          <div key={index} className="glass-panel hover-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', animationDelay: `${(index % 5) * 50}ms` }}>
            <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>
              {service.icon}
            </div>
            <div>
              <h3 className="text-primary mb-2" style={{ fontSize: '1.25rem' }}>{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center p-8 glass-panel border-highlight">
        <h3 className="text-primary mb-2">Atención Continua</h3>
        <p className="text-muted text-sm">
          Recuerda que contamos con <strong>Emergencias 24 Horas</strong> (Adultos, Pediátrica y Sala de Parto) y <strong>Área Quirúrgica</strong> activa. Para consultas especializadas, verifica el cronograma y solicita tu cita previa.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-card:hover { border-color: var(--color-primary); }
        .border-highlight { border-top: 4px solid var(--color-primary); }
      `}} />
    </div>
  );
}
