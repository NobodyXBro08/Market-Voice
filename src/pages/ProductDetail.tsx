
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import VoiceAssistant from "@/components/VoiceAssistant";
import ProductCard from "@/components/ProductCard";

// Mock data - This will be replaced with Supabase data
const mockProducts = [
  {
    id: "1",
    title: "MacBook Pro M3 16-inch",
    description: "La MacBook Pro M3 de 16 pulgadas redefine el rendimiento profesional. Con el revolucionario chip M3, esta potente laptop ofrece un rendimiento excepcional para creativos, desarrolladores y profesionales que requieren la máxima potencia. Su pantalla Liquid Retina XDR de 16.2 pulgadas proporciona colores vibrantes y negros profundos, ideal para edición de video, diseño gráfico y desarrollo de software. La batería de larga duración te permite trabajar hasta 22 horas sin interrupciones.",
    price: 2499.99,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop"
  },
  {
    id: "2",
    title: "iPhone 15 Pro Max",
    description: "El iPhone 15 Pro Max establece un nuevo estándar en smartphones premium. Fabricado en titanio de grado aeroespacial, es más ligero y resistente que nunca. Su sistema de cámaras profesional con teleobjetivo de 5x te permite capturar fotos y videos impresionantes desde cualquier distancia. El chip A17 Pro proporciona un rendimiento excepcional para gaming, realidad aumentada y aplicaciones profesionales.",
    price: 1199.99,
    image_url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop"
  },
  {
    id: "3",
    title: "AirPods Pro 2",
    description: "Los AirPods Pro de 2ª generación ofrecen una experiencia de audio inmersiva con cancelación de ruido adaptativa que se ajusta automáticamente a tu entorno. El audio espacial personalizado te sumerge en un sonido tridimensional único. Con hasta 6 horas de reproducción y 30 horas con el estuche de carga, son perfectos para viajes largos y uso diario.",
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop"
  },
  {
    id: "4",
    title: "iPad Air M2",
    description: "El iPad Air con chip M2 combina potencia y versatilidad en un diseño elegante y portátil. Su pantalla Liquid Retina de 10.9 pulgadas es perfecta para trabajo creativo, entretenimiento y productividad. Compatible con Apple Pencil y Magic Keyboard, se transforma en la herramienta perfecta para cualquier tarea.",
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop"
  },
  {
    id: "5",
    title: "Apple Watch Series 9",
    description: "El Apple Watch Series 9 es tu compañero inteligente para salud y fitness. Con nuevos sensores avanzados, monitoreo de temperatura corporal y detección de accidentes, cuida tu bienestar las 24 horas. Su pantalla Always-On más brillante y el nuevo gesto de doble toque hacen que sea más fácil de usar que nunca.",
    price: 399.99,
    image_url: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=800&h=800&fit=crop"
  },
  {
    id: "6",
    title: "Studio Display",
    description: "El Studio Display de 27 pulgadas con resolución 5K transforma tu espacio de trabajo en un estudio profesional. Su cámara Ultra Wide de 12MP con Encuadre Centrado te mantiene en el centro de la imagen durante videollamadas. Los altavoces de seis parlantes proporcionan audio espacial envolvente para una experiencia multimedia completa.",
    price: 1599.99,
    image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - This will be replaced with Supabase query
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Get 3 random similar products (excluding current)
      const others = mockProducts.filter(p => p.id !== id);
      const shuffled = others.sort(() => 0.5 - Math.random());
      setSimilarProducts(shuffled.slice(0, 3));
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    toast.success("Producto agregado al carrito");
  };

  const handleAddToWishlist = () => {
    toast.success("Producto agregado a favoritos");
  };

  const handleShare = () => {
    toast.success("Enlace copiado al portapapeles");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900">Producto no encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
                  ${product.price.toFixed(2)}
                </Badge>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">(4.0) · 124 reseñas</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>
              
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToWishlist}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-gray-300 hover:bg-gray-50"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Favoritos
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-gray-300 hover:bg-gray-50"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="bg-gray-50 border-0">
              <CardHeader>
                <CardTitle className="text-lg">Características Destacadas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Garantía de 1 año incluida</li>
                  <li>• Envío gratuito en 24-48 horas</li>
                  <li>• Devoluciones gratuitas hasta 30 días</li>
                  <li>• Soporte técnico especializado</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Voice Assistant */}
        <div className="mb-16">
          <VoiceAssistant />
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Productos Similares
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
