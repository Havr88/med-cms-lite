"use client";

export default function Horarios() {
  const horarios = [
    { especialidad: "Pediatría", dias: "Lunes a Jueves", horas: "7:00 AM a 12:00 PM / L,Mi,J: 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { especialidad: "Inmunización", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM", nota: "Orden de llegada" },
    { especialidad: "Nefrología Pediátrica", dias: "Miércoles y Jueves", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { especialidad: "Obstetricia", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { especialidad: "Gastroenterología Pediátrica", dias: "Jueves", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { especialidad: "Medicina Ocupacional", dias: "L,Mi,V (Mañana) / L,M,J,V (Tarde)", horas: "7:00 AM a 12:00 PM / 1:00 PM a 5:00 PM", nota: "Orden regular" },
    { especialidad: "Ginecología", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { especialidad: "Podología", dias: "Mar, Mié, Jue, Vie", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { especialidad: "Foniatra", dias: "Según Cronograma", horas: "7:00 AM a 1:00 PM", nota: "Cronograma Semanal" },
    { especialidad: "Medicina Interna", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / L,Mi: 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { especialidad: "Cirugía General", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { especialidad: "Emergencias 24 Horas", dias: "Lunes a Domingo", horas: "24 Horas (Adulto, Pediatría, Parto)", nota: "Si Contamos" },
    { especialidad: "Traumatología", dias: "L,Mi,J,V", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { especialidad: "Cirugía Pediátrica", dias: "L,M,Mi (Mañana) / L,M,V (Tarde)", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { especialidad: "Medicina Familiar", dias: "Lunes a Viernes", horas: "M,Mi,J,V: 7AM a 12PM / L a V: 1PM a 6PM", nota: "Previa Cita" },
    { especialidad: "Laboratorio Básico - Avanzada", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM / 1:00 PM a 6:00 PM", nota: "Pruebas Rápidas / Previa Cita" },
    { especialidad: "Consulta Diferenciada Adolescentes", dias: "L,Mi,J", horas: "7:00 AM a 12:00 PM / Mi,J: 1:00 PM a 6:00 PM", nota: "Previa Cita" },
    { especialidad: "Odontología", dias: "Lunes a Viernes", horas: "8:00 AM a 12:00 PM / 1:00 PM a 5:00 PM", nota: "Previa Cita" },
    { especialidad: "Epidemiología", dias: "Según Cronograma", horas: "7:00 AM a 1:00 PM", nota: "Cronograma Semanal" },
    { especialidad: "Orientación de la Conducta", dias: "Lunes, Martes y Viernes", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { especialidad: "Dermatología", dias: "Martes", horas: "1:00 PM a 5:00 PM", nota: "Previa Cita" },
    { especialidad: "Anestesiología", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM", nota: "Previa Cita" },
    { especialidad: "Lactancia Materna", dias: "Mi (Mañana) / M,V (Tarde)", horas: "Mi: 7AM a 1PM / M,V: 1PM a 6PM", nota: "Previa Cita" },
    { especialidad: "Cirugía Oncológica", dias: "Lunes", horas: "1:00 PM a 6:00 PM (Cada 15 Días)", nota: "Previa Cita" },
    { especialidad: "Pie Diabético", dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM", nota: "Orden de Llegada" },
  ];

  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString('es-VE', { month: 'long', year: 'numeric' }).toUpperCase();

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-10 no-print">
        <h1 className="text-primary text-4xl mb-4">Cuadernillo de Servicios y Horarios</h1>
        <p className="text-muted max-w-2xl" style={{ margin: '0 auto' }}>
          Información oficial de atención al público. Recuerda que la mayoría de los servicios especializados requieren <strong>Cita Previa</strong>.
        </p>
        <button onClick={() => window.print()} className="btn-primary mt-6 flex items-center gap-2 mx-auto" style={{ backgroundColor: 'var(--color-secondary)' }}>
          🖨️ Descargar Oficial en PDF
        </button>
      </div>

      {/* DISEÑO WEB (Se oculta al imprimir) */}
      <div className="screen-only">
        <div className="glass-panel mb-10" style={{ borderLeft: '4px solid var(--color-accent)', backgroundColor: 'rgba(0, 208, 132, 0.05)' }}>
          <h3 className="text-primary mb-2 flex items-center gap-2">
            <span>📅</span> ¿Cómo solicitar una cita?
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            Las citas para las especialidades se pueden tomar de <strong>lunes a jueves</strong>, en el horario de <strong>8:00 a.m. a 11:00 a.m.</strong> y de <strong>2:00 p.m. a 5:00 p.m.</strong><br/><br/>
            Para tomar una cita, los pacientes deben <strong>dirigirse presencialmente</strong> a la institución dentro de los días y horarios especificados.
          </p>
        </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead style={{ backgroundColor: 'var(--color-primary)', color: 'white', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Especialidad</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Días de Atención</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Horario</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((item, index) => (
                <tr key={index} style={{ borderBottom: index !== horarios.length - 1 ? '1px solid var(--color-border)' : 'none', transition: 'var(--transition-smooth)' }} className="hover-row">
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{item.especialidad}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text)' }}>{item.dias}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text)' }}>{item.horas}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      backgroundColor: item.nota.includes("Previa Cita") ? 'rgba(211, 47, 47, 0.1)' : 'rgba(13, 71, 161, 0.1)', 
                      color: item.nota.includes("Previa Cita") ? 'var(--color-primary)' : 'var(--color-secondary)',
                      padding: '0.35rem 0.85rem', 
                      borderRadius: '999px', 
                      fontSize: '0.875rem', 
                      fontWeight: 500,
                      border: `1px solid ${item.nota.includes("Previa Cita") ? 'rgba(211, 47, 47, 0.2)' : 'rgba(13, 71, 161, 0.2)'}` 
                    }}>
                      {item.nota}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 text-center screen-only">
        <p className="text-muted text-sm">
          L: Lunes | M: Martes | MI: Miércoles | J: Jueves | V: Viernes
        </p>
      </div>
      </div> {/* Fin screen-only */}

      {/* DISEÑO FLYER (Solo visible al imprimir) */}
      <div className="print-flyer hidden-screen">
        <div className="flyer-background"></div>
        <div className="flyer-content">
          
          <div className="flyer-header">
            <img src="/logo-saludanz.png" alt="SaludAnz" className="flyer-logo" />
            <div className="flyer-title">
              <h2>REPÚBLICA BOLIVARIANA DE VENEZUELA</h2>
              <h3>GOBIERNO DEL ESTADO ANZOÁTEGUI</h3>
              <h1>CLÍNICA POPULAR JESÚS DE NAZARETH</h1>
              <div className="flyer-subtitle">CUADERNILLO OFICIAL DE SERVICIOS MÉDICOS Y HORARIOS</div>
            </div>
            <img src="/logo-clinica.png" alt="Clínica" className="flyer-logo" />
          </div>

          <div className="flyer-grid">
            {horarios.map((item, index) => (
              <div key={index} className="flyer-card">
                <h4>{item.especialidad}</h4>
                <div className="flyer-detail"><strong>Días:</strong> {item.dias}</div>
                <div className="flyer-detail"><strong>Horas:</strong> {item.horas}</div>
                <div className="flyer-badge" style={{ backgroundColor: item.nota.includes("Previa") ? '#ffebee' : '#e3f2fd', color: item.nota.includes("Previa") ? '#c62828' : '#1565c0' }}>
                  {item.nota}
                </div>
              </div>
            ))}
          </div>

          <div className="flyer-footer" style={{ position: 'relative' }}>
            <p><strong>Citas:</strong> Lunes a Jueves (8am a 11am / 2pm a 5pm) Presencial.</p>
            <p><strong>Ubicación:</strong> Sector Gulf, Guanire, Puerto La Cruz. | <strong>Emergencias:</strong> 24 Horas</p>
            <p style={{ marginTop: '2mm', fontSize: '8pt', color: '#555', fontStyle: 'italic' }}>
              Nota: La disponibilidad de las consultas y horarios está sujeta a cambios sin previo aviso por razones operativas.
            </p>
            <div style={{ position: 'absolute', bottom: '0', right: '0', fontSize: '8pt', fontWeight: 'bold', color: '#cf2e2e' }}>
              VIGENCIA: {monthYear}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-row:hover { background-color: rgba(13, 71, 161, 0.04); }
      `}} />
    </div>
  );
}
