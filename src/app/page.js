import Image from "next/image";
import ServiceCarousel from "../components/ServiceCarousel";
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Home() {
  const { data: carouselServices } = await supabase
    .from('servicios')
    .select('*')
    .eq('is_active', true)
    .limit(8);

  return (
    <div className="animate-fade-in">
      <section className="hero" style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 124, 186, 0.8), rgba(0, 0, 0, 0.7)), url("/clinica-fachada.jpg")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        color: 'white',
        borderBottom: '4px solid var(--color-accent)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Logo placeholder oculto si ya está en el nav, o se puede usar uno más grande aquí */}
          
          <h1 style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Tu salud es nuestra prioridad</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            En la Clínica Popular Jesús de Nazareth, orgullo de la red <strong>SaludAnz</strong>, brindamos atención médica integral y gratuita, con instalaciones modernas y rehabilitadas al servicio de Puerto La Cruz y Anzoátegui.
          </p>
          <div className="flex justify-center gap-4 mt-4" style={{ flexWrap: 'wrap' }}>
            <a href="/servicios" className="btn-primary" style={{ backgroundColor: 'var(--color-accent)', color: '#000' }}>Ver Especialidades</a>
            <a href="/horarios" className="btn-primary" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid white' }}>Consultar Horarios</a>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          
          {/* Static Card (Inamovible) */}
          <div className="glass-panel flex flex-col justify-between" style={{ 
            flexShrink: 0,
            width: '100%', 
            maxWidth: '320px', 
            marginTop: '1rem', 
            marginBottom: '2rem', 
            padding: '2rem',
            alignSelf: 'stretch' 
          }}>
            <div>
              <h2 className="text-primary font-bold" style={{ fontSize: '2.5rem', lineHeight: '1.1' }}>
                Nuestros<br />Servicios
              </h2>
            </div>
            <div className="mt-8">
               <a href="/servicios" className="btn-primary w-full flex justify-center items-center gap-2">
                 Ver todos los servicios &rarr;
               </a>
            </div>
          </div>

          {/* Carousel (Movible) */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <ServiceCarousel services={carouselServices || []} />
          </div>
          
        </div>
      </section>


    </div>
  );
}
