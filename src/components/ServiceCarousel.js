"use client";
import { useEffect, useRef } from 'react';

const allServices = [
  { title: "Medicina Interna", icon: "🩺", desc: "Evaluación integral para el diagnóstico y tratamiento de enfermedades en adultos." },
  { title: "Pediatría", icon: "👶", desc: "Atención médica especializada para el cuidado y desarrollo saludable de los más pequeños." },
  { title: "Ginecología", icon: "🤰", desc: "Cuidado de la salud femenina y seguimiento integral con área de maternidad." },
  { title: "Odontología", icon: "🦷", desc: "Prevención, diagnóstico y tratamiento para el cuidado y estética de la salud bucal." },
  { title: "Traumatología", icon: "🦴", desc: "Atención integral de lesiones y padecimientos del sistema musculoesquelético." },
  { title: "Nutrición", icon: "🥗", desc: "Evaluación, diagnóstico y tratamiento nutricional adaptado a tus necesidades." },
  { title: "Laboratorio Clínico", icon: "🔬", desc: "Pruebas rápidas y exámenes de laboratorio básicos y avanzados." }
];

export default function ServiceCarousel() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Si ya llegó al final (con un margen de 10px por redondeos), vuelve al inicio
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Desplaza el ancho de una tarjeta aproximadamente
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3500); // 3.5 segundos por desplazamiento

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div 
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: '1.5rem',
          paddingBottom: '2rem',
          paddingTop: '1rem',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none'  // IE/Edge
        }}
      >
        {allServices.map((srv, i) => (
          <a 
            href="/horarios" 
            key={i}
            className="glass-panel text-center hover-card" 
            style={{ 
              minWidth: '280px', 
              maxWidth: '320px',
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{srv.icon}</div>
              <h3 className="mb-4 text-primary">{srv.title}</h3>
              <p className="text-muted text-sm">{srv.desc}</p>
            </div>
            <div className="mt-6" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
              Consultar Horarios &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
