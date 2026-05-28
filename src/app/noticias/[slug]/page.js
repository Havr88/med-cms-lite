"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Post() {
  const params = useParams();
  const { slug } = params;
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      setError("No se pudo encontrar el artículo.");
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="container py-20 text-center text-muted">Cargando artículo...</div>;
  }

  if (error || !post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-primary text-3xl mb-4">Artículo no encontrado</h1>
        <p className="text-muted mb-8">{error}</p>
        <Link href="/noticias" className="btn-primary">Volver a Noticias</Link>
      </div>
    );
  }

  return (
    <article className="container py-12 animate-fade-in" style={{ maxWidth: '800px' }}>
      <div className="mb-8">
        <Link href="/noticias" className="text-secondary hover:underline flex items-center gap-2 mb-6 text-sm font-medium">
          ← Volver a Noticias
        </Link>
        <span className="text-sm font-bold text-muted mb-2 block uppercase tracking-wider">
          {new Date(post.published_at).toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <h1 className="text-primary text-4xl md:text-5xl mb-6 leading-tight">{post.title}</h1>
      </div>

      {post.image_url && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg" style={{ maxHeight: '400px' }}>
          <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div 
          className="prose prose-lg max-w-none text-muted"
          style={{ lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\\n/g, '<br/>') }}
        />
      </div>
    </article>
  );
}
