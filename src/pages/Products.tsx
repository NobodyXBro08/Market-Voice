
import { useState, useEffect } from "react";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";

// Expanded mock data with 55 diverse products
const mockProducts = [
  // Electronics
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
  },
  // Gaming
  {
    id: "7",
    title: "PlayStation 5",
    description: "Consola de última generación con gráficos 4K y SSD ultrarrápido.",
    price: 499.99,
    image_url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop"
  },
  {
    id: "8",
    title: "Xbox Series X",
    description: "La consola más poderosa de Microsoft con retrocompatibilidad.",
    price: 499.99,
    image_url: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&h=500&fit=crop"
  },
  {
    id: "9",
    title: "Nintendo Switch OLED",
    description: "Consola híbrida con pantalla OLED vibrante.",
    price: 349.99,
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop"
  },
  {
    id: "10",
    title: "Steam Deck",
    description: "PC gaming portátil con acceso a toda tu biblioteca de Steam.",
    price: 649.99,
    image_url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=500&fit=crop"
  },
  // Audio
  {
    id: "11",
    title: "Sony WH-1000XM5",
    description: "Auriculares premium con cancelación de ruido líder en la industria.",
    price: 399.99,
    image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"
  },
  {
    id: "12",
    title: "Bose QuietComfort 45",
    description: "Auriculares inalámbricos con comodidad todo el día.",
    price: 329.99,
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop"
  },
  {
    id: "13",
    title: "Marshall Acton III",
    description: "Altavoz Bluetooth con diseño icónico y sonido potente.",
    price: 279.99,
    image_url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop"
  },
  {
    id: "14",
    title: "JBL Flip 6",
    description: "Altavoz portátil resistente al agua con 12 horas de batería.",
    price: 129.99,
    image_url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop"
  },
  // Smartphones
  {
    id: "15",
    title: "Samsung Galaxy S24 Ultra",
    description: "Smartphone Android flagship con S Pen y cámaras AI.",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"
  },
  {
    id: "16",
    title: "Google Pixel 8 Pro",
    description: "Teléfono con IA avanzada y la mejor cámara computacional.",
    price: 999.99,
    image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop"
  },
  {
    id: "17",
    title: "OnePlus 12",
    description: "Flagship killer con carga ultra rápida y diseño premium.",
    price: 799.99,
    image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop"
  },
  // Laptops
  {
    id: "18",
    title: "Dell XPS 13 Plus",
    description: "Ultrabook premium con diseño sin bordes y rendimiento excepcional.",
    price: 1399.99,
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
  },
  {
    id: "19",
    title: "ASUS ROG Zephyrus G14",
    description: "Laptop gaming compacta con AMD Ryzen y RTX 4070.",
    price: 1899.99,
    image_url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop"
  },
  {
    id: "20",
    title: "Microsoft Surface Laptop 5",
    description: "Laptop elegante con pantalla táctil y Windows 11.",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop"
  },
  // Tablets
  {
    id: "21",
    title: "Samsung Galaxy Tab S9 Ultra",
    description: "Tablet Android premium con pantalla AMOLED de 14.6 pulgadas.",
    price: 1199.99,
    image_url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop"
  },
  {
    id: "22",
    title: "Microsoft Surface Pro 9",
    description: "Tablet 2-en-1 con rendimiento de laptop completa.",
    price: 999.99,
    image_url: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500&h=500&fit=crop"
  },
  // Smart Home
  {
    id: "23",
    title: "Amazon Echo Studio",
    description: "Altavoz inteligente con audio espacial y Alexa.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&h=500&fit=crop"
  },
  {
    id: "24",
    title: "Google Nest Hub Max",
    description: "Pantalla inteligente con cámara y Google Assistant.",
    price: 229.99,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
  },
  {
    id: "25",
    title: "Philips Hue Starter Kit",
    description: "Sistema de iluminación inteligente multicolor.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop"
  },
  {
    id: "26",
    title: "Ring Video Doorbell Pro 2",
    description: "Timbre inteligente con video 1536p y detección de movimiento.",
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
  },
  // Wearables
  {
    id: "27",
    title: "Fitbit Charge 6",
    description: "Pulsera fitness con GPS y monitoreo de salud 24/7.",
    price: 159.99,
    image_url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop"
  },
  {
    id: "28",
    title: "Garmin Forerunner 965",
    description: "Reloj GPS para running con métricas avanzadas.",
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop"
  },
  {
    id: "29",
    title: "Samsung Galaxy Watch 6",
    description: "Smartwatch con monitoreo de composición corporal.",
    price: 329.99,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
  },
  // Cameras
  {
    id: "30",
    title: "Sony Alpha A7R V",
    description: "Cámara mirrorless de 61MP con autofocus AI avanzado.",
    price: 3899.99,
    image_url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop"
  },
  {
    id: "31",
    title: "Canon EOS R6 Mark II",
    description: "Cámara full frame para fotografía y video profesional.",
    price: 2499.99,
    image_url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop"
  },
  {
    id: "32",
    title: "GoPro Hero 12 Black",
    description: "Cámara de acción ultra resistente con video 5.3K.",
    price: 399.99,
    image_url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop"
  },
  {
    id: "33",
    title: "DJI Mini 4 Pro",
    description: "Drone compacto con cámara 4K y detección omnidireccional.",
    price: 759.99,
    image_url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop"
  },
  // Home Entertainment
  {
    id: "34",
    title: "LG OLED C3 65\"",
    description: "TV OLED 4K con Dolby Vision y gaming a 120Hz.",
    price: 1799.99,
    image_url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop"
  },
  {
    id: "35",
    title: "Samsung Frame TV 55\"",
    description: "TV que se convierte en obra de arte cuando no está en uso.",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop"
  },
  {
    id: "36",
    title: "Sonos Arc",
    description: "Barra de sonido premium con Dolby Atmos.",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
  },
  // PC Components
  {
    id: "37",
    title: "NVIDIA RTX 4090",
    description: "Tarjeta gráfica más potente para gaming y creación de contenido.",
    price: 1599.99,
    image_url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=500&fit=crop"
  },
  {
    id: "38",
    title: "AMD Ryzen 9 7950X",
    description: "Procesador de 16 núcleos para workstations de alto rendimiento.",
    price: 699.99,
    image_url: "https://images.unsplash.com/photo-1555617981-dac650c5bd90?w=500&h=500&fit=crop"
  },
  {
    id: "39",
    title: "Samsung 980 PRO 2TB",
    description: "SSD NVMe ultra rápido para gaming y aplicaciones profesionales.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop"
  },
  // Accessories
  {
    id: "40",
    title: "Logitech MX Master 3S",
    description: "Mouse inalámbrico de precisión para profesionales.",
    price: 99.99,
    image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
  },
  {
    id: "41",
    title: "Keychron K8 Pro",
    description: "Teclado mecánico inalámbrico para programadores.",
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop"
  },
  {
    id: "42",
    title: "Anker PowerCore 26800",
    description: "Batería externa de alta capacidad con carga rápida.",
    price: 79.99,
    image_url: "https://images.unsplash.com/photo-1609592713439-b1e1f2c0ee65?w=500&h=500&fit=crop"
  },
  // Fashion Tech
  {
    id: "43",
    title: "Ray-Ban Meta Smart Glasses",
    description: "Gafas inteligentes con cámara y audio premium.",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&h=500&fit=crop"
  },
  {
    id: "44",
    title: "Oura Ring Gen3",
    description: "Anillo inteligente para monitoreo de salud y sueño.",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop"
  },
  // Electric Vehicles
  {
    id: "45",
    title: "Tesla Model S Plaid",
    description: "Sedán eléctrico de lujo con aceleración record.",
    price: 129999.99,
    image_url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=500&fit=crop"
  },
  {
    id: "46",
    title: "Segway Ninebot Max G30",
    description: "Scooter eléctrico con 65km de autonomía.",
    price: 799.99,
    image_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop"
  },
  // VR/AR
  {
    id: "47",
    title: "Meta Quest 3",
    description: "Auriculares VR de última generación con realidad mixta.",
    price: 499.99,
    image_url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&h=500&fit=crop"
  },
  {
    id: "48",
    title: "Apple Vision Pro",
    description: "Computadora espacial con realidad aumentada inmersiva.",
    price: 3499.99,
    image_url: "https://images.unsplash.com/photo-1626387346567-d3d4b1ed47a2?w=500&h=500&fit=crop"
  },
  // Professional Equipment
  {
    id: "49",
    title: "MacBook Pro M3 Max",
    description: "La laptop más potente para workflows profesionales extremos.",
    price: 3999.99,
    image_url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop"
  },
  {
    id: "50",
    title: "Wacom Cintiq Pro 27",
    description: "Display pen profesional para artistas digitales.",
    price: 3499.99,
    image_url: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&h=500&fit=crop"
  },
  // Health & Fitness
  {
    id: "51",
    title: "Peloton Bike+",
    description: "Bicicleta de ejercicio inteligente con clases en vivo.",
    price: 2495.99,
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
  },
  {
    id: "52",
    title: "Theragun PRO",
    description: "Masajeador percusivo profesional para recuperación muscular.",
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
  },
  // Kitchen Tech
  {
    id: "53",
    title: "Ninja Creami",
    description: "Máquina para hacer helados y sorbetes caseros.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop"
  },
  {
    id: "54",
    title: "Breville Smart Oven Air Fryer",
    description: "Horno tostador inteligente con freidora de aire.",
    price: 349.99,
    image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop"
  },
  {
    id: "55",
    title: "Instant Pot Pro Plus",
    description: "Olla multifuncional inteligente con conectividad WiFi.",
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop"
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
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Productos
          </h1>
          <p className="text-lg text-gray-300">
            Descubre nuestra colección curada de productos premium
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              
              <div className="flex bg-gray-800 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0 text-gray-300 hover:text-white"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0 text-gray-300 hover:text-white"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-purple-900 text-purple-200 border-purple-700">
              {filteredProducts.length} productos encontrados
            </Badge>
            {searchTerm && (
              <Badge variant="outline" className="border-gray-600 text-gray-300">
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
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-400 mb-4">
              Intenta ajustar tu búsqueda o explorar otras categorías.
            </p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-900 hover:text-purple-200"
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
