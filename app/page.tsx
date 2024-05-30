"use client";
import Image from "next/image";
import MDLogo from "../public/mate-and-dragons-logo-horizontal.png";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { DialogDemo } from "@/components/dialog-demo";

interface Product {
  id: number;
  name: string;
  brand: string;
  type: string;
  weight: number;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

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
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost/mateanddragons/api.php")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const uniqueTypes = Array.from(new Set(data.map((item) => item.type)));
  const uniqueBrands = Array.from(new Set(data.map((item) => item.brand)));

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
          <option value="" className="">All</option>
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
  const [Search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost/mateanddragons/api.php")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const matches = useMemo(() => {
    return data.filter((Product) => {
      const matchesType = type === "" || Product.type === type;
      const matchesBrand = brand === "" || Product.brand === brand;
      const matchesSearch = Product.name
        .toLowerCase()
        .includes(Search.toLowerCase());
      return matchesType && matchesSearch && matchesBrand;
    });
  }, [type, Search, brand, data]);

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
            value={Search}
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
              onTypeChange={(e) => setType(e.target.value)}
              onBrandChange={(e) => setBrand(e.target.value)}
              selectedType={type}
              selectedBrand={brand}
            />
            <DialogDemo />
          </div>
          <ul className="grid grid-cols-4 gap-4">
            {matches.map((Product) => (
              <li key={Product.id} className="mb-5 cursor-pointer">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "75%" }}
                >
                  <Image
                    src={`http://localhost/mateanddragons/${Product.image_url}`}
                    alt={Product.name}
                    layout="fill"
                    className="object-contain"
                  />
                </div>
                <h2 className="text-center capitalize">{Product.name}</h2>
                <p className="text-center">${Product.price}</p>
                <p className="text-center">{Product.weight}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
