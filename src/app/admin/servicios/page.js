"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function AdminServicios() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    icon: "🩺",
    description: "",
    dias: "Lun a Vie",
    horas: "7:00 AM a 12:00 PM",
    dias_tarde: "",
    horas_tarde: "",
    nota: "Previa Cita"
  });

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session_active");
    if (session === "true") {
      setIsAuthenticated(true);
      fetchServicios();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchServicios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("servicios").select("*").order("id", { ascending: true });
      if (error) throw error;
      setServicios(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching servicios:", err);
      setError("No se pudo conectar a la base de datos. Verifica tus credenciales de Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        const { error } = await supabase.from("servicios").update(formData).eq("id", currentId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("servicios").insert([formData]);
        if (error) throw error;
      }
      
      setFormData({ title: "", icon: "🩺", description: "", dias: "Lun a Vie", horas: "7:00 AM a 12:00 PM", dias_tarde: "", horas_tarde: "", nota: "Previa Cita" });
      setIsEditing(false);
      setCurrentId(null);
      await fetchServicios();
    } catch (err) {
      console.error("Error saving:", err);
      alert("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (servicio) => {
    setIsEditing(true);
    setCurrentId(servicio.id);
    setFormData({
      title: servicio.title,
      icon: servicio.icon,
      description: servicio.description,
      dias: servicio.dias,
      horas: servicio.horas,
      dias_tarde: servicio.dias_tarde || "",
      horas_tarde: servicio.horas_tarde || "",
      nota: servicio.nota
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este servicio?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("servicios").delete().eq("id", id);
      if (error) throw error;
      await fetchServicios();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Error al eliminar: " + err.message);
      setLoading(false);
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
          <h1 className="text-primary text-3xl">Gestor de Servicios y Horarios</h1>
        </div>
      </div>

      {error && (
        <div className="glass-panel mb-8" style={{ backgroundColor: 'rgba(207, 46, 46, 0.1)', borderLeft: '4px solid var(--color-secondary)' }}>
          <p className="text-secondary font-bold">⚠️ Advertencia</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="md:col-span-1">
          <div className="glass-panel" style={{ position: 'sticky', top: '2rem' }}>
            <h3 className="text-primary text-xl mb-4">{isEditing ? "Editar Servicio" : "Nuevo Servicio"}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="form-label">Especialidad</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="form-input" placeholder="Ej. Pediatría" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Ícono</label>
                  <input required type="text" name="icon" value={formData.icon} onChange={handleInputChange} className="form-input" placeholder="🩺" />
                </div>
                <div>
                  <label className="form-label">Nota / Cita</label>
                  <input required type="text" name="nota" value={formData.nota} onChange={handleInputChange} className="form-input" placeholder="Previa Cita" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Días (Mañana)</label>
                  <input required type="text" name="dias" value={formData.dias} onChange={handleInputChange} className="form-input" placeholder="Lun a Vie" />
                </div>
                <div>
                  <label className="form-label">Horas (Mañana)</label>
                  <input required type="text" name="horas" value={formData.horas} onChange={handleInputChange} className="form-input" placeholder="7:00 AM a 12:00 PM" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Días (Tarde) - Opcional</label>
                  <input type="text" name="dias_tarde" value={formData.dias_tarde} onChange={handleInputChange} className="form-input" placeholder="Lun y Mie" />
                </div>
                <div>
                  <label className="form-label">Horas (Tarde) - Opcional</label>
                  <input type="text" name="horas_tarde" value={formData.horas_tarde} onChange={handleInputChange} className="form-input" placeholder="1:00 PM a 5:00 PM" />
                </div>
              </div>
              <div>
                <label className="form-label">Descripción Breve (Para web)</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-textarea" rows="3" placeholder="Descripción del servicio..." style={{ resize: 'vertical' }}></textarea>
              </div>
              
              <div className="flex gap-2 mt-2">
                <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? "Guardando..." : isEditing ? "Actualizar" : "Agregar"}
                </button>
                {isEditing && (
                  <button type="button" onClick={() => {setIsEditing(false); setFormData({ title: "", icon: "🩺", description: "", dias: "Lun a Vie", horas: "7:00 AM a 12:00 PM", dias_tarde: "", horas_tarde: "", nota: "Previa Cita" });}} className="btn-primary" style={{ backgroundColor: 'var(--color-text-muted)' }}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Lista */}
        <div className="md:col-span-2">
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
              <h3 className="text-primary text-xl">Servicios Registrados ({servicios.length})</h3>
            </div>
            
            {loading && servicios.length === 0 ? (
              <div className="p-8 text-center text-muted">Cargando base de datos...</div>
            ) : servicios.length === 0 ? (
              <div className="p-8 text-center text-muted">No hay servicios registrados aún o no se pudo conectar a Supabase.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-border)' }}>
                    <tr>
                      <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Especialidad</th>
                      <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Horario</th>
                      <th style={{ padding: '1rem', fontSize: '0.875rem', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicios.map((s) => (
                      <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border)' }} className="hover-row">
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 600 }}>{s.icon} {s.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{s.nota}</div>
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                          <div style={{ fontWeight: 500, color: 'var(--color-primary)' }}>☀️ Mañana:</div>
                          <div>{s.dias} | {s.horas}</div>
                          {(s.dias_tarde || s.horas_tarde) && (
                            <div className="mt-2">
                              <div style={{ fontWeight: 500, color: 'var(--color-secondary)' }}>🌙 Tarde:</div>
                              <div>{s.dias_tarde} | {s.horas_tarde}</div>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button onClick={() => handleEdit(s)} style={{ marginRight: '10px', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Editar</button>
                          <button onClick={() => handleDelete(s.id)} style={{ color: 'var(--color-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
