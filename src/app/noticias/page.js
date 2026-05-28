"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Noticias() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchPosts();
    } else {
      setLoading(false);
      setError("Módulo de noticias en mantenimiento (Faltan credenciales).");
    }
  }, [isSupabaseConfigured]);

  const fetchPosts = async () => {
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

  return (
    <div className="container py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-primary text-4xl mb-4">Noticias y Comunicados</h1>
        <p className="text-muted max-w-2xl" style={{ margin: '0 auto' }}>
          Mantente informado sobre las últimas jornadas médicas, servicios, y comunicados oficiales de la Clínica Popular Jesús de Nazareth.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <p className="text-muted text-lg">Cargando noticias...</p>
        </div>
      ) : error ? (
        <div className="glass-panel text-center p-8">
          <p className="text-primary">{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-panel text-center p-12">
          <p className="text-muted text-lg">Próximamente estaremos publicando nuevas jornadas y comunicados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link href={`/noticias/${post.slug}`} key={post.id} className="glass-panel hover-card transition-all" style={{ display: 'flex', flexDirection: 'column', animationDelay: `${(index % 6) * 50}ms` }}>
              {post.image_url && (
                <div style={{ margin: '-1.5rem -1.5rem 1.5rem -1.5rem', height: '200px', overflow: 'hidden', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                  <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div className="flex-grow">
                <span className="text-xs font-bold text-secondary mb-2 block uppercase tracking-wider">
                  {new Date(post.published_at).toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <h3 className="text-primary text-xl mb-3 leading-tight">{post.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {post.excerpt || post.content.substring(0, 120) + '...'}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <span className="text-secondary font-medium text-sm">Leer artículo completo →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
