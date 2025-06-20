Buy n Large - Marketplace con Asistente de Voz AI (Gemini Live)

Este proyecto es un MVP de un marketplace inteligente construido con Supabase, Lovable, y un asistente conversacional basado en Gemini Live SDK de Google. El objetivo principal es ofrecer una experiencia de compra guiada por voz con respuestas contextuales y personalizadas, gracias al uso de RAG (Retrieval-Augmented Generation).

🚀 Tecnologías Usadas

⚙️ Supabase – Backend como servicio, base de datos y funciones RPC.

🎨 Lovable – Frontend framework para desarrollo rápido y estilizado.

🧠 Gemini Live SDK – Asistente de voz con IA de Google.

🧲 RAG – Embeddings y recuperación de productos similares.

🎤 Reconocimiento de voz Web Speech API – Captura de voz del usuario en tiempo real.

📦 OpenAI Embeddings API – Generación de vectores para contexto.

🧩 Funcionalidades

✅ Navegación fluida entre productos, carrito, checkout y pedidos.

🎙️ Asistente AI activado por voz que responde con contexto del producto.

🔍 Comparación de productos similares con embeddings.

📦 Checkout con formulario de envío y persistencia en Supabase.

🛒 Carrito de compras con cantidades, persistencia y resumen.

⚙️ Estructura del Proyecto

/src
  ├── pages/
  │   ├── Products.jsx
  │   ├── ProductDetail.jsx
  │   ├── Cart.jsx
  │   ├── Checkout.jsx
  │   ├── Orders.jsx
  ├── components/
  │   ├── ProductCard.jsx
  │   ├── VoiceAssistant.tsx ✅
  │   ├── Navigation.jsx
  │   ├── ProductForm.jsx
  ├── context/
  │   └── cartContext.jsx
  ├── lib/
  │   ├── supabaseClient.js
  │   ├── embedUtils.js ✅
  │   └── geminiClient.js ✅

📌 Configuración

1. Variables de entorno (.env)

VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx...
VITE_OPENAI_KEY=sk-xxx...
VITE_GEMINI_API_KEY=AIzaSy...

2. Función RPC en Supabase (match_products.sql)

create extension if not exists vector;

create or replace function match_products (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  title text,
  description text,
  price numeric,
  image_url text
)
language sql
as $$
  select id, title, description, price, image_url
  from products
  where embedding <#> query_embedding < match_threshold
  order by embedding <#> query_embedding
  limit match_count;
$$;

🧪 Modo de Prueba Local

Cuando la API de OpenAI falla (ej. error 429), se genera un embedding simulado para pruebas locales:

// embedUtils.js
console.warn("\u{1F9EA} Usando embedding simulada para pruebas locales");
return new Array(1536).fill(0.5);

🔉 Asistente de Voz con Gemini

El componente VoiceAssistant.tsx integra:

Reconocimiento de voz (navegador)

Generación de embeddings con createEmbedding

Consulta de productos similares con match_products

Envío del prompt a GeminiClient.js para generar respuesta

✅ Cómo ejecutar

Clonar el repositorio:

git clone https://github.com/tuusuario/market-voice.git

Instalar dependencias:

npm install

Crear .env y colocar las claves de Supabase, OpenAI y Gemini.

Ejecutar el proyecto:

npm run dev

📽️ Video Demo (YouTube)

En el video se muestra:

Navegación por el marketplace

Activación del asistente de voz

Consulta y respuesta contextual por Gemini

Flujo de compra completo con productos reales

🧠 Créditos

Este MVP fue desarrollado por Omar Bonilla en el marco de la prueba técnica para Buy n Large usando tecnologías modernas de inteligencia artificial, RAG y herramientas de desarrollo rápido.