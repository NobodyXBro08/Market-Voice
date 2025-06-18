
import { ArrowLeft, Home, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isProducts = location.pathname === "/products";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {!isHome && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
            )}
            <h1
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
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
              className="hover:bg-gray-100"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button
              variant={isProducts ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate("/products")}
              className="hover:bg-gray-100"
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
