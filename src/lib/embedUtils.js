import { supabase } from "@/lib/supabaseClient";

// 🧪 Función MOCK para generar embeddings desde texto (sin llamar a OpenAI)
export const createEmbedding = async (text) => {
  console.warn("🧪 Usando embedding simulada para pruebas locales");

  // Simula una embedding de 1536 dimensiones (requerido por Supabase)
  return Array(1536).fill(0.005);
};

// ✅ Función para obtener productos similares desde Supabase usando match_products
export const getSimilarProducts = async (embedding) => {
  const { data, error } = await supabase.rpc("match_products", {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: 5,
  });

  if (error) {
    console.error("🧪 Error al obtener productos similares desde Supabase:", error);
    return [];
  }

  return data;
};
