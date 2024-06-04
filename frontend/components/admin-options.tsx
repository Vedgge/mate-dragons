import React, { useState } from "react";
import { PopupProductsAdd } from "@/components/popup-products-add";
import { PopupProductsEdit } from "@/components/popup-products-edit";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { Product } from "@/types/types";

interface AdminOptionsProps {
  products: Product;
}

export default function AdminOptions({ products }: AdminOptionsProps) {
  const [productsResult, setProductsResult] = useState<Product[]>([]);
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        body: `id=${id}`,
      });

      const data = await response.json();
      if (data.success) {
        alert("Producto eliminado exitosamente");
        setProductsResult((prevData) =>
          prevData.filter((product) => product.id !== id)
        );
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar el producto");
    }
  };
  return (
    <div className="absolute top-0 right-0 flex items-center gap-2">
      <PopupProductsAdd />
      <PopupProductsEdit products={products} />
      <Button
        onClick={() => handleDelete(products.id)}
        className="bg-red-500 hover:bg-red-700"
      >
        <CircleX className="w-6 h-6" />
      </Button>
    </div>
  );
}
