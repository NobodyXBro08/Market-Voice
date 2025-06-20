import { ArrowLeft, Home, ShoppingBag, ShoppingCart, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();

  const isHome = location.pathname === "/";
  const isProducts = location.pathname === "/products";
  const isCart = location.pathname === "/cart";
  const isOrders = location.pathname === "/orders";

  const totalItems = getTotalItems();
  const displayCount = totalItems > 99 ? "99+" : totalItems;

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Botón atrás y título */}
          <div className="flex items-center space-x-4">
            {!isHome && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-gray-800 text-gray-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
            )}
            <h1
              className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate("/")}
            >
              FutureMarket
            </h1>
          </div>

          {/* Botones de navegación */}
          <div className="flex items-center space-x-4">
            <Button
              variant={isHome ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate("/")}
              className={isHome ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-gray-800 text-gray-300 hover:text-white"}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>

            <Button
              variant={isProducts ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate("/products")}
              className={isProducts ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-gray-800 text-gray-300 hover:text-white"}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Productos
            </Button>

            <div className="relative">
              <Button
                variant={isCart ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate("/cart")}
                className={isCart ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-gray-800 text-gray-300 hover:text-white"}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrito
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                  {displayCount}
                </span>
              )}
            </div>

            <Button
              variant={isOrders ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate("/orders")}
              className={isOrders ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-gray-800 text-gray-300 hover:text-white"}
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              Pedidos
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
