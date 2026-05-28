import Image from "next/image";
import ServiceCarousel from "../components/ServiceCarousel";

export default function Home() {
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

      <section className="container py-12">
        <div className="text-center mb-8">
          <h2 className="text-primary" style={{ fontSize: '2.5rem' }}>Nuestros Servicios</h2>
          <p className="text-muted mt-4" style={{ maxWidth: '600px', margin: '1rem auto' }}>
            Contamos con diversas especialidades médicas para cubrir las necesidades de tu familia en un solo lugar.
          </p>
        </div>

        <ServiceCarousel />

        <div className="text-center mt-8">
           <a href="/servicios" className="text-primary" style={{ textDecoration: 'underline', fontWeight: 500 }}>Ver todos los servicios disponibles &rarr;</a>
        </div>
      </section>


    </div>
  );
}
