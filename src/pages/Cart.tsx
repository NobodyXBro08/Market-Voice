import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart, decreaseQuantity, addToCart } = useCart();

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-6">Tu Carrito</h1>

        {cart.length === 0 ? (
          <p className="text-gray-400">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between bg-gray-900 p-4 rounded-xl border border-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-400">${item.price.toFixed(2)} c/u</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-9 h-9 border-purple-700 bg-gray-800 text-purple-400 hover:bg-purple-800 hover:text-white"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-lg font-medium">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-9 h-9 border-purple-700 bg-gray-800 text-purple-400 hover:bg-purple-800 hover:text-white"
                          onClick={() => addToCart({ ...item, quantity: 1 })}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  className="bg-gray-800 hover:bg-gray-700 text-white w-full"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>
                <Link to="/checkout" className="w-full md:w-auto">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-base px-6 py-3 rounded-xl font-semibold">
                    Proceder al Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
