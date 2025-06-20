import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Inicializar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Productos de ejemplo
const products = [
  {
    id: 1,
    title: "Auriculares Bluetooth Sony",
    description: "Auriculares inalámbricos con cancelación de ruido, ideales para trabajo remoto y música.",
  },
  {
    id: 2,
    title: "MacBook Air M2",
    description: "Portátil ligero con chip M2, excelente rendimiento y batería duradera, perfecto para productividad.",
  },
  // Puedes agregar más aquí
];

async function generateEmbeddings() {
  for (const product of products) {
    const input = `${product.title}. ${product.description}`;

    // 1. Obtener embedding
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input,
    });

    const [{ embedding }] = embeddingResponse.data;

    // 2. Subir a Supabase
    const { error } = await supabase
      .from("products")
      .update({ embedding }) // <- tu tabla debe tener un campo 'embedding' tipo vector(1536)
      .eq("id", product.id);

    if (error) {
      console.error("❌ Error al guardar en Supabase:", error);
    } else {
      console.log(`✅ Embedding guardado para producto ID ${product.id}`);
    }
  }
}

generateEmbeddings();
