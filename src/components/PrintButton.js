"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn-primary mt-6 flex items-center gap-2 mx-auto" style={{ backgroundColor: 'var(--color-secondary)' }}>
      🖨️ Descargar Oficial en PDF
    </button>
  );
}
