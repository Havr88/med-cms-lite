import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Servicios() {
  const { data: activeServices } = await supabase
    .from('servicios')
    .select('*')
    .eq('is_active', true)
    .order('title', { ascending: true });

  const services = activeServices || [];

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
        {services.map((service, index) => (
          <div key={index} className="glass-panel hover-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', animationDelay: `${(index % 5) * 50}ms` }}>
            <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>
              {service.icon}
            </div>
            <div>
              <h3 className="text-primary mb-2" style={{ fontSize: '1.25rem' }}>{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{service.description}</p>
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
