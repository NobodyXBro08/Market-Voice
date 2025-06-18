
import { useState, useEffect } from "react";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";

// Mock data - This will be replaced with Supabase data
const mockProducts = [
  {
    id: "1",
    title: "MacBook Pro M3 16-inch",
    description: "Potente laptop profesional con chip M3, perfecta para creativos y desarrolladores.",
    price: 2499.99,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop"
  },
  {
    id: "2",
    title: "iPhone 15 Pro Max",
    description: "El smartphone más avanzado con cámara profesional y titanio.",
    price: 1199.99,
    image_url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop"
  },
  {
    id: "3",
    title: "AirPods Pro 2",
    description: "Auriculares inalámbricos con cancelación de ruido adaptativa.",
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop"
  },
  {
    id: "4",
    title: "iPad Air M2",
    description: "Tablet versátil con chip M2 para trabajo y entretenimiento.",
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop"
  },
  {
    id: "5",
    title: "Apple Watch Series 9",
    description: "Smartwatch avanzado con monitoreo de salud y fitness.",
    price: 399.99,
    image_url: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=500&h=500&fit=crop"
  },
  {
    id: "6",
    title: "Studio Display",
    description: "Monitor 5K profesional con cámara Ultra Wide integrada.",
    price: 1599.99,
    image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
  }
];

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Productos
          </h1>
          <p className="text-lg text-gray-600">
            Descubre nuestra colección curada de productos premium
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-gray-200">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {filteredProducts.length} productos encontrados
            </Badge>
            {searchTerm && (
              <Badge variant="outline" className="border-gray-300">
                Búsqueda: "{searchTerm}"
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tu búsqueda o explorar otras categorías.
            </p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Limpiar búsqueda
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
