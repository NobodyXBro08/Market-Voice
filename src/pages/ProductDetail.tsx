import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import VoiceAssistant from "@/components/VoiceAssistant";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (productError) {
        console.error("Error al obtener el producto:", productError.message);
        setProduct(null);
        setLoading(false);
        return;
      }

      setProduct(productData);

      const { data: allProducts, error: allError } = await supabase
        .from("products")
        .select("*");

      if (!allError && allProducts) {
        const filtered = allProducts.filter((p) => p.id !== id);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setSimilarProducts(shuffled.slice(0, 3));
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity: Number(quantity) });
    toast.success("Producto agregado al carrito");
  };

  const handleAddToWishlist = () => {
    toast.success("Producto agregado a favoritos");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
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
          <h1 className="text-2xl font-bold text-gray-900">
            Producto no encontrado
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Imagen */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Información */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
                  ${product.price?.toFixed(2)}
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
                  <span className="text-gray-600 ml-2">
                    (4.0) · 124 reseñas
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-24 bg-gray-100 border-gray-300 text-gray-800"
                />
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Agregar al Carrito
                </Button>
              </div>

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

            <Card className="bg-gray-50 border-0">
              <CardHeader>
                <CardTitle className="text-lg">
                  Características Destacadas
                </CardTitle>
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

        {/* Asistente de voz */}
        <div className="mb-16">
          <VoiceAssistant currentProduct={product} />
        </div>

        {/* Productos similares */}
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
