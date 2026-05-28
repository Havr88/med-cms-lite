"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchPosts();
    } else {
      setLoading(false);
      setError("Faltan las credenciales de Supabase en .env.local");
    }
  }, [isSupabaseConfigured]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const createSlug = (title) => {
    return title.toLowerCase().trim().replace(/[\\W_]+/g, '-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Título y contenido son obligatorios");

    const slug = createSlug(title);

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, slug, excerpt, content, image_url: imageUrl }]);

    if (error) {
      alert("Error guardando: " + error.message);
    } else {
      alert("Post creado con éxito");
      setTitle(""); setExcerpt(""); setContent(""); setImageUrl("");
      fetchPosts();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este artículo?")) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      alert("Error eliminando: " + error.message);
    } else {
      fetchPosts();
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="container py-12">
        <div className="glass-panel border-highlight" style={{ borderColor: 'var(--color-primary)' }}>
          <h2 className="text-primary text-2xl mb-4">¡Supabase no está configurado!</h2>
          <p className="text-muted mb-4">
            Para usar el CMS, necesitas configurar tu base de datos. Sigue estos pasos:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted">
            <li>Abre el archivo <code>.env.local</code> (puedes usar <code>.env.example</code> de plantilla).</li>
            <li>Coloca tu <code>NEXT_PUBLIC_SUPABASE_URL</code> y <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.</li>
            <li>En Supabase, ve al Editor SQL y ejecuta el código que se encuentra en el archivo <code>supabase-schema.sql</code>.</li>
            <li>Reinicia el servidor local (<code>pnpm dev</code>).</li>
          </ol>
          <div className="mt-6">
            <Link href="/admin" className="text-secondary hover:underline">Volver al Panel</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary text-3xl">Gestor de Noticias</h1>
        <Link href="/admin" className="text-secondary hover:underline">Volver</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="glass-panel" style={{ position: 'sticky', top: '100px' }}>
            <h3 className="mb-4">Crear Nuevo Artículo</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-muted mb-1 block">Título</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded border outline-none"
                  style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-1 block">Extracto Corto</label>
                <textarea 
                  value={excerpt} 
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full p-2 rounded border outline-none"
                  style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)', minHeight: '60px' }}
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-1 block">Contenido Principal (Soporta HTML/Markdown básico)</label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 rounded border outline-none"
                  style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)', minHeight: '150px' }}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-1 block">URL de Imagen (Opcional)</label>
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2 rounded border outline-none"
                  style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>
              <button type="submit" className="btn-primary mt-2">Publicar Artículo</button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-panel">
            <h3 className="mb-4">Artículos Publicados</h3>
            {loading ? (
              <p className="text-muted">Cargando artículos...</p>
            ) : error ? (
              <p className="text-primary">{error}</p>
            ) : posts.length === 0 ? (
              <p className="text-muted italic">No hay artículos publicados todavía.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {posts.map(post => (
                  <div key={post.id} className="p-4 rounded border flex justify-between items-center hover-card" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}>
                    <div>
                      <h4 className="font-bold text-lg">{post.title}</h4>
                      <p className="text-sm text-muted">{new Date(post.published_at).toLocaleDateString('es-VE')}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/noticias/${post.slug}`} target="_blank" className="text-secondary text-sm hover:underline px-2 py-1">
                        Ver
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="text-primary text-sm hover:underline px-2 py-1">
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
