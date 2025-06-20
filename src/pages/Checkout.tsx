import { useState } from "react";
import { useCart } from "@/context/cartContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (cart.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: form.name,
        customer_email: form.email,
        customer_address: form.address,
        items: JSON.stringify(cart),
        total,
      },
    ]);

    if (error) {
      toast.error("Hubo un error al guardar el pedido");
      console.error(error);
    } else {
      toast.success("¡Pedido confirmado!");
      clearCart();
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-6">Finalizar Compra</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <Input
            placeholder="Nombre completo"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white"
          />
          <Input
            placeholder="Correo electrónico"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white"
          />
          <Input
            placeholder="Dirección de entrega"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white"
          />

          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 w-full"
          >
            Confirmar Pedido
          </Button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">Resumen del pedido</h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">No hay productos en el carrito.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between bg-gray-900 p-4 rounded-xl border border-gray-800"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="text-white font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
            <li className="text-right text-xl font-bold text-white border-t border-gray-700 pt-4">
              Total: ${total.toFixed(2)}
            </li>
          </ul>
        )}
      </main>
    </div>
  );
};

export default Checkout;
