import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clínica Popular Jesús de Nazareth | SaludAnz",
  description: "Centro de salud público rehabilitado en Puerto La Cruz, Anzoátegui. Ofrecemos servicios de medicina interna, pediatría, ginecología y más, para el fortalecimiento del Sistema Público Nacional de Salud.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <nav className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '1rem', flexShrink: 0, zIndex: 100 }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo SaludAnz (Izquierda) */}
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <img src="/logo-saludanz.png" alt="SaludAnz" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Enlaces de Navegación (Centro) */}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flex: 2 }}>
              <a href="/" style={{ fontWeight: 500, transition: 'color 0.2s' }}>Inicio</a>
              <a href="/servicios" style={{ fontWeight: 500, transition: 'color 0.2s' }}>Servicios</a>
              <a href="/horarios" style={{ fontWeight: 500, transition: 'color 0.2s' }}>Horarios</a>
              <a href="/noticias" style={{ fontWeight: 500, transition: 'color 0.2s' }}>Noticias</a>
            </div>

            {/* Logo Clínica (Derecha) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
              <img src="/logo-clinica.png" alt="Clínica Jesús de Nazareth" style={{ height: '55px', width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        </nav>
        
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
        
        <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '1rem 0', flexShrink: 0, zIndex: 100 }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.875rem' }}>
                <strong className="text-primary">Ubicación:</strong> Sector Gulf, Guanire, Puerto La Cruz. <a href="https://www.google.com/maps/search/CLINICA+POPULAR+JESUS+DE+NAZARETH+Puerto+La+Cruz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Ver Mapa</a>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                <a href="https://instagram.com/saludanz" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">📷 SaludAnz</a>
                <a href="https://instagram.com/anzoateguigob" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">📷 Gobernación</a>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <strong>Sede Central SaludAnz:</strong> Av. Miranda, Barcelona. <br/>
                <strong>Tel:</strong> 0281-2752482 / 0412-0572125 | <strong>Correo:</strong> saludanzrrhh2024@gmail.com
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                <a href="/admin" className="hover:text-primary transition-colors text-muted">Acceso Administrador</a>
              </div>
            </div>
        </footer>
      </body>
    </html>
  );
}
