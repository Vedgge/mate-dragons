"use client";
import Image from "next/image";
import MDLogo from "../public/mate-and-dragons-logo-horizontal.png";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Catalog from "@/app/products.json";
import { useState, useMemo } from "react";

interface Product {
  name: string;
  brand: string;
  type: string;
  description: string;
  weight: string;
  price: number;
  image: string;
}

interface Catalog {
  Products: Product[];
}

const UniqueSelects = ({
  onOptionChange,
  selectedType,
}: {
  onOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedType: string;
}) => {
  const uniqueTypes = Array.from(
    new Set(Catalog.Products.map((item) => item.product.type))
  );
  return (
    <select className="w-full" onChange={onOptionChange} value={selectedType}>
      <option value="">All</option>
      {uniqueTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default function Home() {
  const [Search, setSearch] = useState("");
  const [type, setType] = useState("");

  const matches = useMemo(() => {
    return Catalog.Products.filter((item) => {
      const matchesType = type === "" || item.product.type === type;
      const matchesSearch = item.product.name
        .toLowerCase()
        .includes(Search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [type, Search]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
            value={Search}
            onChange={handleSearchChange}
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
          <div>
            <UniqueSelects
              onOptionChange={handleOptionChange}
              selectedType={type}
            />
          </div>
          <ul className="grid grid-cols-4 gap-4">
            {matches.map(({ product: Product }) => (
              <li key={Product.name} className="mb-5 cursor-pointer">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "75%" }}
                >
                  <Image
                    src={Product.image}
                    alt={Product.name}
                    layout="fill"
                    className="object-contain"
                  />
                </div>
                <h2 className="text-center">{Product.name}</h2>
                <p className="text-center">${Product.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
