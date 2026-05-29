# Sistema Web y de Gestión - Clínica Popular Jesús de Nazareth

Este proyecto es la plataforma web oficial y el sistema de gestión administrativa para la **Clínica Popular Jesús de Nazareth** (Puerto La Cruz, Anzoátegui), desarrollada bajo los lineamientos de la Gobernación del Estado Anzoátegui (SaludAnz).

## Tecnologías Utilizadas

*   **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
*   **Estilos:** CSS Modules y Vanilla CSS (Diseño "Glassmorphism" y Modo Oscuro/Claro dinámico)
*   **Base de Datos y Backend:** [Supabase](https://supabase.com/) (PostgreSQL)
*   **Seguridad:** Monitoreo activo de conexiones y auditoría avanzada (WebGL Fingerprinting, Canvas Hash).
*   **Licenciamiento:** GNU AGPL v3.0, compatible con la Licencia Venezolana de Software Libre (LVSL).

## Funcionalidades Principales

1.  **Portal Informativo Público:**
    *   Información sobre los servicios médicos y especialidades.
    *   Cuadernillo virtual interactivo para la consulta de horarios.
    *   Generador de PDF integrado para imprimir el cuadernillo de horarios.
    *   Blog de noticias y comunicados oficiales.
    *   Información de contacto, redes sociales (SaludAnz, Gobernación) y ubicación georreferenciada.

2.  **Panel de Administración Segura (`/admin`):**
    *   **Gestión de Servicios:** Crear, editar y organizar las especialidades médicas, sus horarios divididos (mañana y tarde) y notas adicionales.
    *   **Gestión de Blog/Noticias:** Publicador de comunicados oficiales.
    *   **Configuración de Marca Blanca:** Editor de los textos del pie de página, correos, teléfonos y enlaces institucionales.
    *   **Auditoría Activa:** Panel de inicio de sesión reforzado con sistemas disuasorios (detección de User-Agent, WAN IP, LAN IP via WebRTC y huellas digitales de hardware/fuentes).

## Cómo ejecutar el proyecto localmente

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd infoweb
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

3.  Configura las variables de entorno en un archivo `.env.local`:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
    ```

4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Cumplimiento de Infogobierno

Este desarrollo fue realizado respetando los principios de la **Ley de Infogobierno** y los estándares del Centro Nacional de Tecnologías de Información (CNTI), garantizando la soberanía tecnológica y el uso de Software Libre en la administración pública venezolana.
