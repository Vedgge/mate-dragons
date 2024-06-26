"use client";
import Image from "next/image";
import MDLogo from "../public/mate-and-dragons-logo-horizontal.png";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import { CircleX, Heart, ShoppingCart } from "lucide-react";
import { useState, useMemo, useEffect, useContext } from "react";
import { PopupProductsAdd } from "@/components/popup-products-add";
import Users from "@/components/users";
import { PopupProductsEdit } from "@/components/popup-products-edit";
import { Product } from "../types/types";
import { DropdownMenuLogin } from "@/components/dropdown-login";
import { AuthContext } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

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
    fetch("http://localhost:8000/api/products")
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
          <option value="">Todos los tipos</option>
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
          <option value="">Todas las marcas</option>
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

  const { role, logout, decodedToken } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
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
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        body: `id=${id}`,
      });

      const data = await response.json();
      if (data.success) {
        // alert("Producto eliminado exitosamente");
        toast.success("Producto eliminado exitosamente!");
        setProducts((prevData) =>
          prevData.filter((product) => product.id !== id)
        );
      } else {
        // alert("Error: " + data.error);
        toast.error("Error al eliminar el producto: " + data.error);
      }
    } catch (error) {
      // console.error("Error:", error);
      toast.error("Error al eliminar el producto: " + error);
    }
  };

  return (
    <>
      <Toaster />
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[650px] focus-visible:ring-0"
          />
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {role === null && (
                <div>
                  <DropdownMenuLogin />
                </div>
              )}
              {role === "admin" && (
                <div className="flex items-center gap-4">
                  <h2>{decodedToken.username}</h2>
                  <Button onClick={logout}>Logout</Button>
                </div>
              )}
              {role === "user" && (
                <div className="flex items-center gap-4">
                  <h2>{decodedToken.username}</h2>
                  <Button onClick={logout}>Logout</Button>
                </div>
              )}
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
            {role === "admin" && <PopupProductsAdd />}
          </div>
          <ul className="grid grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <li key={product.id} className="mb-5 cursor-pointer relative">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "75%" }}
                >
                  <Image
                    src={`/uploads/${product.image_url}`}
                    alt={product.name}
                    layout="fill"
                    className="object-contain"
                  />
                </div>
                <h2 className="text-center capitalize">{product.name}</h2>
                <p className="text-center">${product.price}</p>
                <p className="text-center">{product.weight}</p>

                <div className="absolute top-0 right-0">
                  {role === "admin" ? (
                    <div className="flex items-center gap-2">
                      <PopupProductsEdit products={product} />
                      <Button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-700"
                      >
                        <CircleX className="w-6 h-6" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Heart />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
        {role === "admin" && (
          <div className="mb-6">
            <Users />
          </div>
        )}
      </main>
    </>
  );
}
