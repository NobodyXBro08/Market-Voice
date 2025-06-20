import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar pedidos");
      console.error(error);
    } else {
      setOrders(data);
      setFiltered(data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const results = orders.filter((order) =>
      order.customer_email.toLowerCase().includes(value) ||
      order.customer_name.toLowerCase().includes(value)
    );

    setFiltered(results);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-6">Historial de Pedidos</h1>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={search}
            onChange={handleSearch}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-400">No se encontraron pedidos.</p>
        ) : (
          <ul className="space-y-6">
            {filtered.map((order) => (
              <li
                key={order.id}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{order.customer_name}</h2>
                  <p className="text-sm text-gray-400">{order.customer_email}</p>
                  <p className="text-sm text-gray-500">
                    Dirección: {order.customer_address}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  {JSON.parse(order.items).map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-200">
                        {item.quantity} x {item.title}
                      </span>
                      <span className="text-gray-300 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-right text-purple-400 font-bold">
                  Total: ${order.total.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Orders;
