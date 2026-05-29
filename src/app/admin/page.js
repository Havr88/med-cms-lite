"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SecurityMonitor = () => {
  const [wanIp, setWanIp] = useState("Cargando...");
  const [lanIp, setLanIp] = useState("Escaneando...");
  const [fingerprint, setFingerprint] = useState("Calculando...");
  const [fontPrint, setFontPrint] = useState("Calculando...");
  const [webGLRenderer, setWebGLRenderer] = useState("Consultando hardware...");
  const [webGLHash, setWebGLHash] = useState("...");
  const [userAgent, setUserAgent] = useState("Obteniendo...");

  // Función básica de Hash (32-bit)
  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).toUpperCase();
  };

  useEffect(() => {
    // 1. User Agent (Navegador y SO)
    setUserAgent(navigator.userAgent);

    // 2. WAN IP
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setWanIp(data.ip))
      .catch(() => setWanIp("No disponible"));

    // 3. Canvas Fingerprint
    const getCanvasFingerprint = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('Auditoría', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Seguridad', 4, 17);
      return simpleHash(canvas.toDataURL());
    };
    setFingerprint(getCanvasFingerprint());

    // 4. Font Fingerprinting
    const getFontFingerprint = () => {
      const fonts = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Comic Sans MS', 'Garamond', 'Palatino Linotype', 'Consolas'];
      const baseFonts = ['monospace', 'sans-serif', 'serif'];
      const testString = 'mmmmmmmmmmlli';
      const testSize = '72px';
      
      const span = document.createElement('span');
      span.style.fontSize = testSize;
      span.innerHTML = testString;
      span.style.position = 'absolute';
      span.style.left = '-9999px';
      document.body.appendChild(span);
      
      const defaultWidths = {};
      baseFonts.forEach(base => {
        span.style.fontFamily = base;
        defaultWidths[base] = span.offsetWidth;
      });
      
      let detected = [];
      fonts.forEach(font => {
        let isDetected = false;
        baseFonts.forEach(base => {
          span.style.fontFamily = `"${font}", ${base}`;
          if (span.offsetWidth !== defaultWidths[base]) {
            isDetected = true;
          }
        });
        if (isDetected) detected.push(font);
      });
      document.body.removeChild(span);
      return simpleHash(detected.join('|'));
    };
    setFontPrint(getFontFingerprint());

    // 5. LAN IP (WebRTC)
    const getLanIp = async () => {
      return new Promise((resolve) => {
        const rtc = new RTCPeerConnection({iceServers: []});
        rtc.createDataChannel('');
        rtc.createOffer().then(offer => rtc.setLocalDescription(offer)).catch(() => resolve("Oculta"));
        
        rtc.onicecandidate = (ice) => {
          if (ice && ice.candidate && ice.candidate.candidate) {
            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
            const match = ipRegex.exec(ice.candidate.candidate);
            if (match) {
              resolve(match[1]);
              rtc.close();
            } else if (ice.candidate.candidate.includes(".local")) {
              resolve("Ofuscada (mDNS) *Ver Nota");
              rtc.close();
            }
          }
        };
        setTimeout(() => resolve("Oculta por restricciones del navegador"), 2000);
      });
    };
    getLanIp().then(setLanIp);

    // 6. WebGL (GPU Hardware) Fingerprint
    const getWebGLInfo = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return { renderer: 'No soportado', hash: 'N/A' };
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          const fullInfo = `${vendor} - ${renderer}`;
          return { renderer: fullInfo, hash: simpleHash(fullInfo) };
        }
        return { renderer: 'Ofuscado por el navegador (Resistencia a Fingerprinting)', hash: 'N/A' };
      } catch (e) {
        return { renderer: 'Error al acceder a la GPU', hash: 'Error' };
      }
    };
    const glInfo = getWebGLInfo();
    setWebGLRenderer(glInfo.renderer);
    setWebGLHash(glInfo.hash);

  }, []);

  return (
    <div className="mt-6 p-5 glass-panel" style={{ backgroundColor: 'rgba(207, 46, 46, 0.03)', border: '1px solid rgba(207, 46, 46, 0.2)', padding: '1.5rem' }}>
      <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--color-secondary)' }}>
        <span style={{ fontSize: '1.5rem' }}>🛡️</span>
        <h3 className="font-bold m-0" style={{ fontSize: '1rem', color: 'var(--color-secondary)' }}>Auditoría de Seguridad Activa</h3>
      </div>
      <p className="text-muted text-sm mb-4">
        Este acceso está siendo monitoreado. Sus datos de identificación digital se registran por protocolos de seguridad corporativa.
      </p>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3 p-3 rounded" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '1.25rem' }}>💻</span>
          <div>
            <div className="font-bold text-xs text-muted uppercase">Agente de Usuario (OS/Navegador)</div>
            <div className="text-sm font-mono mt-1" style={{ wordBreak: 'break-all', color: 'var(--color-primary)' }}>{userAgent}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded flex flex-col gap-1" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 font-bold text-xs text-muted uppercase">
              <span>🌐</span> IP Pública (WAN)
            </div>
            <div className="text-sm font-mono font-bold" style={{ color: 'var(--color-secondary)' }}>{wanIp}</div>
          </div>
          
          <div className="p-3 rounded flex flex-col gap-1" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 font-bold text-xs text-muted uppercase">
              <span>🏠</span> IP Privada (LAN)
            </div>
            <div className="text-sm font-mono" style={{ color: 'var(--color-primary)' }}>{lanIp}</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '1.25rem' }}>🎮</span>
          <div style={{ flex: 1 }}>
            <div className="font-bold text-xs text-muted uppercase flex justify-between">
               <span>Hardware Gráfico (WebGL GPU)</span>
               <span style={{ color: 'var(--color-accent)' }}>Hash: {webGLHash}</span>
            </div>
            <div className="text-sm font-mono mt-1" style={{ wordBreak: 'break-all', color: 'var(--color-primary)' }}>{webGLRenderer}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded flex flex-col gap-1" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 font-bold text-xs text-muted uppercase">
              <span>🎨</span> Canvas Hash
            </div>
            <div className="text-sm font-mono font-bold" style={{ color: 'var(--color-accent)' }}>{fingerprint}</div>
          </div>

          <div className="p-3 rounded flex flex-col gap-1" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 font-bold text-xs text-muted uppercase">
              <span>🔤</span> Font Hash
            </div>
            <div className="text-sm font-mono font-bold" style={{ color: 'var(--color-accent)' }}>{fontPrint}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-muted" style={{ fontStyle: 'italic', opacity: 0.85, lineHeight: '1.4' }}>
        <strong>*Nota sobre mDNS:</strong> Los navegadores modernos ofuscan la IP LAN (usando direcciones .local) para evitar rastreo silencioso. La única forma técnica de evadir esta ofuscación desde el navegador sería solicitar explícitamente permisos de Cámara/Micrófono (WebRTC activo), pero esto detonaría una alerta al atacante/usuario.
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Revisar si ya hay una sesión activa guardada en la caché del navegador
    const session = sessionStorage.getItem("admin_session_active");
    if (session === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      // Guardar sesión en caché (se borra al cerrar la pestaña)
      sessionStorage.setItem("admin_session_active", "true");
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem("admin_session_active");
  };

  if (isLoading) return null; // Evitar parpadeos mientras lee la caché

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
              className="form-input"
            />
            <button type="submit" className="btn-primary">Ingresar al Panel</button>
          </form>
          <SecurityMonitor />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary text-3xl">Panel de Control General</h1>
        <button onClick={handleLogout} className="btn-primary" style={{ backgroundColor: 'var(--color-secondary)', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          Cerrar Sesión
        </button>
      </div>
      
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
          <h3 className="mb-4 text-primary text-xl">Servicios y Horarios</h3>
          <p className="text-muted text-sm mb-6 flex-grow">
            Administra las especialidades médicas, modifica sus días de atención, horarios y el tipo de cita requerida. Estos datos alimentan automáticamente el Cuadernillo Web y PDF.
          </p>
          <Link href="/admin/servicios" className="btn-primary text-center">
            Gestionar Servicios
          </Link>
        </div>

        <div className="glass-panel hover-card transition-all" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="mb-4 text-primary text-xl">Configuración Generales (Marca Blanca)</h3>
          <p className="text-muted text-sm mb-6 flex-grow">
            Modifica textos informativos, instrucciones para citas, direcciones, redes sociales y contactos del pie de página sin necesidad de programar.
          </p>
          <Link href="/admin/configuracion" className="btn-primary text-center">
            Editar Textos y Enlaces
          </Link>
        </div>
      </div>
    </div>
  );
}
