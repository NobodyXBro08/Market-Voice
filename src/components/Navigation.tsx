
import { ArrowLeft, Home, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isProducts = location.pathname === "/products";

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
