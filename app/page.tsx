"use client";
import Image from "next/image";
import MDLogo from "../public/mate-and-dragons-logo-horizontal.png";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import { CircleX, Heart, ShoppingCart } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { DialogDemo } from "@/components/dialog-products";
import Users from "@/components/users";
import { DialogProductsEdit } from "@/components/dialog-products-edit";
import {Product} from "../types/types"

const UniqueSelects = ({
  onTypeChange,
  onBrandChange,
  selectedType,
  selectedBrand,
}: {
  onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBrandChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedType: string;
  selectedBrand: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost/mateanddragons/api-products.php")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const uniqueTypes = Array.from(new Set(products.map((item) => item.type)));
  const uniqueBrands = Array.from(new Set(products.map((item) => item.brand)));

  return (
    <div className="flex gap-4 mb-4">
      <div>
        <select
          name="type"
          id="type"
          onChange={onTypeChange}
          value={selectedType}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 col-span-3"
        >
          <option value="">All</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="brand"
          id="brand"
          onChange={onBrandChange}
          value={selectedBrand}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 col-span-3"
        >
          <option value="">All</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [typeFiltered, setTypeFiltered] = useState("");
  const [brandFiltered, setBrandFiltered] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost/mateanddragons/api-products.php")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesType = typeFiltered === "" || product.type === typeFiltered;
      const matchesBrand =
        brandFiltered === "" || product.brand === brandFiltered;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesType && matchesSearch && matchesBrand;
    });
  }, [typeFiltered, search, brandFiltered, products]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        "http://localhost/mateanddragons/api-products.php",
        {
          method: "DELETE",
          body: `id=${id}`,
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Producto eliminado exitosamente");
        setProducts((prevData) =>
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
    <>
      <header className="border p-4">
        <div className="flex items-center justify-between w-[1420px] mx-auto">
          <Image
            src={MDLogo}
            alt="Mate & Dragons Logo"
            width={300}
            height={100}
          />
          <Input
            placeholder="Search"
            type="search"
            className="w-[650px] focus-visible:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button>Login</Button>
              <Heart className="w-6 h-6" />
              <ShoppingCart className="w-6 h-6" />
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>
      <main className="w-[1420px] mx-auto">
        <section className="my-10">
          <div className="flex justify-between mb-10">
            <UniqueSelects
              onTypeChange={(e) => setTypeFiltered(e.target.value)}
              onBrandChange={(e) => setBrandFiltered(e.target.value)}
              selectedType={typeFiltered}
              selectedBrand={brandFiltered}
            />
            <DialogDemo />
          </div>
          <ul className="grid grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <li key={product.id} className="mb-5 cursor-pointer relative">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "75%" }}
                >
                  <Image
                    src={`http://localhost/mateanddragons/${product.image_url}`}
                    alt={product.name}
                    layout="fill"
                    className="object-contain"
                  />
                </div>
                <h2 className="text-center capitalize">{product.name}</h2>
                <p className="text-center">${product.price}</p>
                <p className="text-center">{product.weight}</p>

                <div className="absolute top-0 right-0 flex items-center gap-2">
                  <DialogProductsEdit products={product} />
                  <Button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-700"
                  >
                    <CircleX className="w-6 h-6" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <Users />
      </main>
    </>
  );
}
