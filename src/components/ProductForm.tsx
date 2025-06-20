// src/components/ProductForm.jsx
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image_url: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, image_url } = product;

    const { error } = await supabase.from("products").insert([
      { title, description, price: parseFloat(price), image_url }
    ]);

    if (error) {
      toast.error("Error al crear producto");
      console.error(error);
    } else {
      toast.success("Producto creado con éxito");
      setProduct({ title: "", description: "", price: "", image_url: "" });
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-1">Agregar Producto</h2>
            <p className="text-gray-400">Crea un nuevo producto para el catálogo</p>
          </div>
          <Link to="/products">
            <Button className="bg-gray-800 hover:bg-gray-700 text-white">
              Volver a productos
            </Button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 space-y-4"
        >
          <Input
            name="title"
            placeholder="Título"
            value={product.title}
            onChange={handleChange}
            className="bg-gray-800 text-white border-gray-700 placeholder-gray-400"
          />
          <Input
            name="description"
            placeholder="Descripción"
            value={product.description}
            onChange={handleChange}
            className="bg-gray-800 text-white border-gray-700 placeholder-gray-400"
          />
          <Input
            name="price"
            type="number"
            placeholder="Precio"
            value={product.price}
            onChange={handleChange}
            className="bg-gray-800 text-white border-gray-700 placeholder-gray-400"
          />
          <Input
            name="image_url"
            placeholder="URL de imagen"
            value={product.image_url}
            onChange={handleChange}
            className="bg-gray-800 text-white border-gray-700 placeholder-gray-400"
          />

          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full text-white">
            Crear producto
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ProductForm;
