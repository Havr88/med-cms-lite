import { supabase } from '@/lib/supabase';
import PrintButton from '@/components/PrintButton';

export const revalidate = 0;

export default async function Horarios() {
  const { data: horarios } = await supabase
    .from('servicios')
    .select('*')
    .eq('is_active', true)
    .order('title', { ascending: true });

  const { data: configRows } = await supabase.from('configuraciones').select('*');
  const config = {};
  if (configRows) {
    configRows.forEach(row => {
      config[row.clave] = row.valor;
    });
  }

  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString('es-VE', { month: 'long', year: 'numeric' }).toUpperCase();
  const instruccionesCita = config['instrucciones_cita'] || 'Las citas para las especialidades se pueden tomar presencialmente.';

  const displayHorarios = horarios || [];

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-10 no-print">
        <h1 className="text-primary text-4xl mb-4">Cuadernillo de Servicios y Horarios</h1>
        <p className="text-muted max-w-2xl" style={{ margin: '0 auto' }}>
          Información oficial de atención al público. Recuerda que la mayoría de los servicios especializados requieren <strong>Cita Previa</strong>.
        </p>
        <PrintButton />
      </div>

      {/* DISEÑO WEB (Se oculta al imprimir) */}
      <div className="screen-only">
        <div className="glass-panel mb-10" style={{ borderLeft: '4px solid var(--color-accent)', backgroundColor: 'rgba(0, 208, 132, 0.05)' }}>
          <h3 className="text-primary mb-2 flex items-center gap-2">
            <span>📅</span> ¿Cómo solicitar una cita?
          </h3>
          <p className="text-muted text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
            {instruccionesCita}
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
              {displayHorarios.map((item, index) => (
                <tr key={item.id || index} style={{ borderBottom: index !== displayHorarios.length - 1 ? '1px solid var(--color-border)' : 'none', transition: 'var(--transition-smooth)' }} className="hover-row">
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{item.title}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text)' }}>
                    <div>{item.dias} {item.dias_tarde ? <span style={{fontSize:'0.75rem', fontWeight:'bold', color:'var(--color-text-muted)'}}>(Mañana)</span> : ''}</div>
                    {item.dias_tarde && <div style={{ marginTop: '0.5rem' }}>{item.dias_tarde} <span style={{fontSize:'0.75rem', fontWeight:'bold', color:'var(--color-text-muted)'}}>(Tarde)</span></div>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text)' }}>
                    <div>{item.horas}</div>
                    {item.horas_tarde && <div style={{ marginTop: '0.5rem' }}>{item.horas_tarde}</div>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      backgroundColor: (item.nota || '').includes("Previa") ? 'rgba(211, 47, 47, 0.1)' : 'rgba(13, 71, 161, 0.1)', 
                      color: (item.nota || '').includes("Previa") ? 'var(--color-primary)' : 'var(--color-secondary)',
                      padding: '0.35rem 0.85rem', 
                      borderRadius: '999px', 
                      fontSize: '0.875rem', 
                      fontWeight: 500,
                      border: `1px solid ${(item.nota || '').includes("Previa") ? 'rgba(211, 47, 47, 0.2)' : 'rgba(13, 71, 161, 0.2)'}` 
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
            {displayHorarios.map((item, index) => (
              <div key={item.id || index} className="flyer-card">
                <h4>{item.title}</h4>
                <div className="flyer-detail" style={{ marginBottom: '4px' }}>
                  <div style={{ fontWeight: 'bold' }}>Mañana:</div>
                  <div>{item.dias} | {item.horas}</div>
                </div>
                
                {(item.dias_tarde || item.horas_tarde) && (
                  <div className="flyer-detail" style={{ marginBottom: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>Tarde:</div>
                    <div>{item.dias_tarde} | {item.horas_tarde}</div>
                  </div>
                )}
                
                <div className="flyer-badge" style={{ marginTop: '8px', backgroundColor: (item.nota || '').includes("Previa") ? '#ffebee' : '#e3f2fd', color: (item.nota || '').includes("Previa") ? '#c62828' : '#1565c0' }}>
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
