
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 bg-gray-900 border border-gray-800 overflow-hidden hover:border-purple-500">
      <div className="aspect-square overflow-hidden bg-gray-800">
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <Badge variant="secondary" className="bg-purple-900 text-purple-200 border-purple-700">
          ${product.price.toFixed(2)}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
