<div align="center">

  <h1>Pokédex Avanzada</h1>
  <p><b>Aplicación Web Full-Stack con Next.js App Router y TanStack Query</b></p>

<p>
    <a href="https://github.com/DiegoJesusAguilartadeo/pokedex" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-Ver_Repositorio-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
    </a>
    <a href="https://nextjs.org/" target="_blank">
      <img src="https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://tanstack.com/query/latest" target="_blank">
      <img src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
 </p>
  <table>
    <tr>
      <td><b>Autor</b></td>
      <td>Diego Jesús Aguilar Tadeo</td>
    </tr>
    <tr>
      <td><b>Tecnologías</b></td>
      <td>Next.js (App Router), TypeScript, TanStack Query, CSS Modules, PokéAPI</td>
    </tr>
    <tr>
      <td><b>Propósito</b></td>
      <td>Desarrollo Frontend Moderno con Arquitectura Híbrida y Estrategia de Caché Avanzada</td>
    </tr>
  </table>

</div>

<hr />

<h2>1. Descripción del Proyecto</h2>

<p>
Aplicación web moderna desarrollada con <b>Next.js (App Router)</b> y <b>TanStack Query</b>, diseñada para explorar el universo Pokémon de manera eficiente y altamente optimizada. La solución implementa una estricta arquitectura que separa las responsabilidades entre Server Components (para el SSR y la hidratación inicial), Client Components (para la interactividad) y una capa robusta de gestión de estado asíncrono y caché global.
</p>

<p>
El sistema garantiza una experiencia de navegación instantánea mediante el uso de <b>Hydration Boundaries</b>, <b>Prefetching predictivo en hover</b> y estrategias de sincronización de caché para minimizar las peticiones de red redundantes.
</p>

<hr />

<h2>2. Requisitos Funcionales y Técnicos Cumplidos</h2>

<ul>
  <li><b>Arquitectura Híbrida de Server/Client Components:</b> Uso estricto de componentes de servidor para el renderizado inicial y componentes de cliente para interacciones dinámicas.</li>
  <li><b>Hydration Boundary (<code>HydrationBoundary</code> + <code>dehydrate</code>):</b> Transferencia fluida de datos precargados desde el servidor hacia el cliente sin parpadeos de carga inicial.</li>
  <li><b>Prefetching en Hover (<code>onMouseEnter</code>):</b> Precarga anticipada de datos detallados de cada Pokémon antes de que el usuario ejecute el cambio de ruta.</li>
  <li><b>Rutas Dinámicas Seguras (<code>/pokemon/[name]</code>):</b> Gestión de parámetros de URL en tiempo de ejecución utilizando <code>useParams()</code> envuelto en límites de carga (<code>Suspense</code>).</li>
  <li><b>Optimización de Imágenes (<code>next/image</code>):</b> Configuración de patrones remotos para sprites oficiales con fallback de optimización seguro.</li>
</ul>

<hr />

<h2>3. Arquitectura y Estructura de Capas</h2>

<p>El proyecto está organizado bajo una estructura modular orientada a separar el enrutamiento, la interfaz visual y la lógica de datos:</p>

<pre>
[ Servidor / Server Components (app/pokemon-list/page.tsx) ]
        │
        │  1. Pre-fetch inicial y serialización (dehydrate)
        ▼
[ Límite de Hidratación (HydrationBoundary) ]
        │
        │  2. Sincronización transparente con el cliente
        ▼
[ Interfaz y Gestión de Estado (Client Components / TanStack Query) ]
        │
        │  3. Prefetching en hover (onMouseEnter) y navegación dinámica (/pokemon/[name])
        ▼
[ PokéAPI / Capa Externa ]
</pre>

<h3>Detalle por Componentes</h3>

<table>
  <thead>
    <tr>
      <th>Capa / Módulo</th>
      <th>Ubicación</th>
      <th>Responsabilidad</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Ruta de Listado (SSR)</b></td>
      <td><code>src/app/pokemon-list/page.tsx</code></td>
      <td>Ejecuta peticiones en el servidor, instancia el <code>QueryClient</code> y genera la hidratación inicial.</td>
    </tr>
    <tr>
      <td><b>Ruta Dinámica (Detalle)</b></td>
      <td><code>src/app/pokemon/[name]/page.tsx</code></td>
      <td>Gestiona perfiles individuales con parámetros de URL seguros y control de caché por ID/Nombre.</td>
    </tr>
    <tr>
      <td><b>Componente Grid</b></td>
      <td><code>src/components/PokemonGrid.tsx</code></td>
      <td>Renderiza la cuadrícula de elementos consumiendo el estado sincronizado de TanStack Query.</td>
    </tr>
    <tr>
      <td><b>Componente Tarjeta</b></td>
      <td><code>src/components/PokemonCard.tsx</code></td>
      <td>Gestiona la interfaz visual de cada Pokémon y dispara el evento <code>onMouseEnter</code> para el prefetch.</td>
    </tr>
  </tbody>
</table>

<hr />

<h2>4. Estrategia de Almacenamiento en Caché (Cache Strategy)</h2>

<p>La aplicación implementa un modelo avanzado de gestión de datos basado en tres pilares fundamentales provistos por <b>TanStack Query</b>:</p>

<ul>
  <li><b>A. Hidratación Servidor-Cliente (Hydration Boundary):</b> Cuando el usuario solicita la ruta principal (<code>/pokemon-list</code>), el servidor ejecuta una consulta inicial a la API (<code>prefetchQuery</code>), serializa la estructura utilizando <code>dehydrate</code> y la inyecta en el HTML mediante <code>&lt;HydrationBoundary&gt;</code> para eliminar tiempos de carga iniciales vacíos.</li>
  <li><b>B. Prefetching Predictivo por Interacción (Hover Strategy):</b> Mediante el evento <code>onMouseEnter</code> en el componente <code>&lt;PokemonCard&gt;</code>, la aplicación detecta cuando el cursor del usuario se posiciona sobre un elemento y ejecuta de forma silenciosa <code>queryClient.prefetchQuery</code>, reduciendo la latencia percibida a cero.</li>
  <li><b>C. Persistencia y Tiempo de Frescura (Stale-While-Revalidate):</b> Las consultas almacenadas poseen una política de tiempo de vida configurada (<code>staleTime</code>), asegurando que las navegaciones subsecuentes sirvan la información instantáneamente desde la memoria sin saturar la red.</li>
</ul>
