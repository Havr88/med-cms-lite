"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function AdminConfiguracion() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Mapeo de claves a nombres legibles
  const labelMap = {
    'instrucciones_cita': 'Instrucciones para Solicitar Citas',
    'footer_ubicacion_texto': 'Dirección (Pie de Página)',
    'footer_ubicacion_enlace': 'Enlace Mapa (Google Maps)',
    'footer_red_1_nombre': 'Red Social 1 (Nombre/Icono)',
    'footer_red_1_enlace': 'Red Social 1 (Enlace)',
    'footer_red_2_nombre': 'Red Social 2 (Nombre/Icono)',
    'footer_red_2_enlace': 'Red Social 2 (Enlace)',
    'footer_contacto_sede': 'Sede Central (Texto)',
    'footer_contacto_tel': 'Teléfonos de Contacto',
    'footer_contacto_correo': 'Correo Electrónico Oficial'
  };

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session_active");
    if (session === "true") {
      setIsAuthenticated(true);
      fetchConfigs();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("configuraciones").select("*").order("clave", { ascending: true });
      if (error) throw error;
      setConfigs(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching configs:", err);
      setError("No se pudo conectar a la base de datos. Asegúrate de tener configurado Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (clave, newValue) => {
    const newConfigs = configs.map(c => c.clave === clave ? { ...c, valor: newValue } : c);
    setConfigs(newConfigs);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // Upsert all configs
      const { error } = await supabase.from("configuraciones").upsert(
        configs.map(c => ({ clave: c.clave, valor: c.valor }))
      );
      if (error) throw error;
      alert("Configuraciones guardadas exitosamente.");
    } catch (err) {
      console.error("Error saving configs:", err);
      alert("Error al guardar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated && !loading) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-primary text-2xl mb-4">Acceso Denegado</h2>
        <p className="text-muted mb-6">Debes iniciar sesión para ver esta página.</p>
        <Link href="/admin" className="btn-primary">Ir al Login</Link>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin" className="text-muted hover:text-primary mb-2 inline-block">← Volver al Panel</Link>
          <h1 className="text-primary text-3xl">Configuraciones de la Marca Blanca</h1>
        </div>
        <button onClick={handleSaveAll} disabled={saving || configs.length === 0} className="btn-primary">
          {saving ? "Guardando..." : "💾 Guardar Todos los Cambios"}
        </button>
      </div>

      {error && (
        <div className="glass-panel mb-8" style={{ backgroundColor: 'rgba(207, 46, 46, 0.1)', borderLeft: '4px solid var(--color-secondary)' }}>
          <p className="text-secondary font-bold">⚠️ Advertencia</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      )}

      <div className="glass-panel">
        <p className="text-muted mb-6">Modifica los textos generales que aparecen en la plataforma. Recuerda presionar "Guardar Todos los Cambios" arriba cuando finalices.</p>
        
        {loading && configs.length === 0 ? (
          <div className="text-center p-8 text-muted">Cargando configuraciones...</div>
        ) : configs.length === 0 ? (
          <div className="text-center p-8 text-muted">Aún no hay configuraciones en la base de datos (Ejecuta el archivo SQL en Supabase).</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {configs.map((conf) => (
              <div key={conf.clave} className={conf.clave === 'instrucciones_cita' ? "md:col-span-2" : ""}>
                <label className="form-label">
                  {labelMap[conf.clave] || conf.clave}
                </label>
                {conf.clave === 'instrucciones_cita' ? (
                  <textarea 
                    value={conf.valor} 
                    onChange={(e) => handleValueChange(conf.clave, e.target.value)}
                    className="form-textarea" 
                    rows="4" 
                    style={{ resize: 'vertical' }}
                  ></textarea>
                ) : (
                  <input 
                    type="text" 
                    value={conf.valor} 
                    onChange={(e) => handleValueChange(conf.clave, e.target.value)}
                    className="form-input" 
                  />
                )}
                <div className="text-muted mt-1" style={{ fontSize: '0.7rem' }}>Key: {conf.clave}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
