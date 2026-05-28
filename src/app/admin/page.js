"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta. Pista: admin123");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-12 flex justify-center items-center" style={{ minHeight: '60vh' }}>
        <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-primary mb-6 text-center">Acceso Administrativo</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
            <button type="submit" className="btn-primary">Ingresar al Panel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <h1 className="text-primary text-3xl mb-8">Panel de Control General</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel hover-card transition-all" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="mb-4 text-primary text-xl">Gestor de Noticias (Blog)</h3>
          <p className="text-muted text-sm mb-6 flex-grow">
            Publica, edita y elimina comunicados, noticias de jornadas médicas o artículos informativos de la clínica. Los datos se almacenarán en Supabase.
          </p>
          <Link href="/admin/blog" className="btn-primary text-center">
            Entrar al Gestor de Contenido
          </Link>
        </div>

        <div className="glass-panel hover-card transition-all" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="mb-4 text-primary text-xl">Configuración de Servicios</h3>
          <p className="text-muted text-sm mb-4 flex-grow">
            Para ocultar o mostrar servicios de la web (como "Odontología"), actualmente se utilizan Variables de Entorno en Vercel.
          </p>
          <ul className="text-sm text-muted mb-4" style={{ paddingLeft: '1.5rem', listStyleType: 'disc', lineHeight: '1.6' }}>
            <li>Ve a <strong>Settings &gt; Environment Variables</strong> en Vercel.</li>
            <li>Para ocultar un servicio, añade <code>SHOW_NOMBREDELSERVICIO</code> y ponle el valor <code>false</code>.</li>
            <li>Re-despliega (Redeploy) la aplicación.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
