"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("type", type);
    formData.append("weight", weight);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(
      "http://localhost/mateanddragons/api-products.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      alert("Producto creado exitosamente");
      router.push("/");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div>
      <h1>Alta de Producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Marca:</label>
          <select
            name="brand"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option value="">Seleccione una marca</option>
            <option value="Taragüi">Taragüi</option>
            <option value="Rosamonte">Rosamonte</option>
            <option value="Playadito">Playadito</option>
            <option value="La Merced">La Merced</option>
            <option value="Cruz de Malta">Cruz de Malta</option>
            <option value="Union">Union</option>
            <option value="Amanda">Amanda</option>
            <option value="Nobleza Gaucha">Nobleza Gaucha</option>
            <option value="Santo Pipó">Santo Pipó</option>
            <option value="La Tranquera">La Tranquera</option>
            <option value="Indega">Indega</option>
            <option value="CBSe">CBSe</option>
            <option value="Colon">Colon</option>
            <option value="Canarias">Canarias</option>
            <option value="Pajarito">Pajarito</option>
            <option value="Kraus">Kraus</option>
            <option value="Cachamate">Cachamate</option>
            <option value="La Hoja">La Hoja</option>
            <option value="Campesino">Campesino</option>
            <option value="Guayaki">Guayaki</option>
            <option value="Del Cebador">Del Cebador</option>
            <option value="Reina de Monte">Reina de Monte</option>
            <option value="Baldo">Baldo</option>
            <option value="Piporé">Piporé</option>
            <option value="Aguantadora">Aguantadora</option>
          </select>
        </div>
        <div>
          <label>Tipo:</label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="Traditional">Traditional</option>
            <option value="Especial">Especial</option>
            <option value="Organic">Organic</option>
            <option value="Barbacuá">Barbacuá</option>
            <option value="Lemon">Lemon</option>
            <option value="Suave">Suave</option>
            <option value="Mint">Mint</option>
            <option value="Energia">Energia</option>
            <option value="Compuesta con Palo">Compuesta con Palo</option>
            <option value="Serena">Serena</option>
            <option value="Con Palo">Con Palo</option>
            <option value="Sin Palo">Sin Palo</option>
            <option value="Despalada">Despalada</option>
            <option value="Con Hierbas">Con Hierbas</option>
            <option value="Roasted">Roasted</option>
            <option value="Aged">Aged</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div>
          <label>Peso:</label>
          <select
            name="weight"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          >
            <option value="250g">250g</option>
            <option value="500g">500g</option>
            <option value="1kg">1kg</option>
            <option value="2kg">2kg</option>
            <option value="3kg">3kg</option>
          </select>
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}
