
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Marketplace del Futuro
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Descubre el
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Futuro{" "}
            </span>
            de las Compras
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experimenta una nueva forma de comprar con tecnología AI avanzada, 
            recomendaciones personalizadas y asistente de voz inteligente.
          </p>
          
          <Button
            onClick={() => navigate("/products")}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Explorar Productos
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">IA Avanzada</h3>
              <p className="text-gray-600">
                Recomendaciones personalizadas basadas en tus preferencias y comportamiento de compra.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Productos Premium</h3>
              <p className="text-gray-600">
                Catálogo curado de productos de alta calidad con descripciones detalladas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Experiencia Única</h3>
              <p className="text-gray-600">
                Interfaz moderna e intuitiva diseñada para una experiencia de compra sin fricciones.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/30 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para comenzar tu experiencia?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Únete a miles de usuarios que ya disfrutan del futuro de las compras.
          </p>
          <Button
            onClick={() => navigate("/products")}
            size="lg"
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg rounded-full"
          >
            Comenzar Ahora
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
