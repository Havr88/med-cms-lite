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
              <a href="/contacto" style={{ fontWeight: 500, transition: 'color 0.2s', color: 'var(--color-primary)' }}>Contacto</a>
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
          {/* Cumplimiento Infogobierno y Software Libre */}
          <div className="container" style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <p style={{ marginBottom: '0.25rem' }}>
                Desarrollado bajo los principios de <strong>Software Libre</strong> en cumplimiento con la <em>Ley de Infogobierno de la República Bolivariana de Venezuela</em> y normativas del CNTI.
              </p>
              <p>
                Código fuente liberado bajo licencia <strong>GNU AGPL v3.0</strong>, compatible con la Licencia Venezolana de Software Libre (LVSL). 
                <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', marginLeft: '4px' }}>Ver Licencia</a>.
              </p>
            </div>
        </footer>
      </body>
    </html>
  );
}
