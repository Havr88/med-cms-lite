"use client";

import React from 'react';

export default function ContactoPage() {
  return (
    <div className="container py-16 animate-fade-in" style={{ minHeight: '80vh' }}>
      <h1 className="text-primary font-bold text-center mb-12" style={{ fontSize: '3rem' }}>Contacto y Ubicación</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Clínica */}
        <div className="glass-panel hover-card">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏥</div>
          <h2 className="text-primary text-2xl mb-4">Clínica Popular Jesús de Nazareth</h2>
          <p className="text-muted mb-6">
            Sector Gulf, Guanire, Puerto La Cruz.<br/>
            Estado Anzoátegui, Venezuela.
          </p>
          <a 
            href="https://www.google.com/maps/search/CLINICA+POPULAR+JESUS+DE+NAZARETH+Puerto+La+Cruz" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
            style={{ width: '100%' }}
          >
            📍 Abrir Mapa de Ubicación
          </a>
        </div>

        {/* SaludAnz Sede Central */}
        <div className="glass-panel hover-card">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
          <h2 className="text-primary text-2xl mb-4">Sede Central SaludAnz</h2>
          <p className="text-muted mb-2">
            <strong>Dirección:</strong> Av. Miranda, Barcelona.
          </p>
          <p className="text-muted mb-2">
            <strong>Teléfonos:</strong> 0281-2752482 / 0412-0572125
          </p>
          <p className="text-muted mb-6">
            <strong>Correo:</strong> <a href="mailto:saludanzrrhh2024@gmail.com" style={{ color: 'var(--color-primary)' }}>saludanzrrhh2024@gmail.com</a>
          </p>
        </div>

        {/* Redes Sociales */}
        <div className="glass-panel hover-card md:col-span-2 text-center" style={{ padding: '3rem 2rem' }}>
          <h2 className="text-primary text-2xl mb-6">Redes Sociales Institucionales</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <a 
              href="https://instagram.com/saludanz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary flex items-center gap-2"
              style={{ backgroundColor: '#E1306C' }}
            >
              📷 Instagram SaludAnz
            </a>
            <a 
              href="https://instagram.com/anzoateguigob" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary flex items-center gap-2"
              style={{ backgroundColor: '#E1306C' }}
            >
              📷 Instagram Gobernación
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
