import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import toast, { Toaster } from "react-hot-toast";

const brands = [
  "Taragüi",
  "Rosamonte",
  "Playadito",
  "La Merced",
  "Cruz de Malta",
  "Union",
  "Amanda",
  "Nobleza Gaucha",
  "Santo Pipó",
  "La Tranquera",
  "Indega",
  "CBSe",
  "Colon",
  "Canarias",
  "Pajarito",
  "Kraus",
  "Cachamate",
  "La Hoja",
  "Campesino",
  "Guayaki",
  "Del Cebador",
  "Reina de Monte",
  "Baldo",
  "Piporé",
  "Aguantadora",
];

const types = [
  "Barbacuá",
  "Lemon",
  "Suave",
  "Mint",
  "Energia",
  "Compuesta con Palo",
  "Serena",
  "Con Palo",
  "Sin Palo",
  "Despalada",
  "Con Hierbas",
  "Roasted",
  "Aged",
  "Premium",
];

const weights = ["250g", "500g", "1kg", "1.5kg", "2kg", "3kg"];

export function PopupProductsAdd() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataProduct = new FormData();
    formDataProduct.append("name", name);
    formDataProduct.append("brand", brand);
    formDataProduct.append("type", type);
    formDataProduct.append("weight", weight);
    formDataProduct.append("description", description);
    formDataProduct.append("price", price.toString()); // Convertir a cadena
    formDataProduct.append("stock", stock.toString()); // Convertir a cadena
    if (image) {
      formDataProduct.append("image", image);
    }

    try {
      const response = await fetch(
        "https://mate-dragons-production.up.railway.app/api/products",
        {
          method: "POST",
          body: formDataProduct,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        // alert("Producto creado exitosamente");
        toast.success("Producto creado exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      // alert("Error al subir el producto");
      toast.error("Error al subir el producto");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar un nuevo producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar un nuevo producto</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Nombre del producto</Label>
              <Input
                type="text"
                value={name}
                placeholder="Ingrese el nombre del producto"
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Marca:</Label>
              <Select onValueChange={(value) => setBrand(value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccione una marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Marcas</SelectLabel>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type" className="text-right">
                Tipo:
              </Label>
              <Select onValueChange={(value) => setType(value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos</SelectLabel>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="weight" className="text-right">
                Peso:
              </Label>
              <Select onValueChange={(value) => setWeight(value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccione un peso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pesos</SelectLabel>
                    {weights.map((weight) => (
                      <SelectItem key={weight} value={weight}>
                        {weight}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description" className="text-right">
                Descripción:
              </Label>
              <Textarea
                placeholder="Descripción del producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-right">
                Precio:
              </Label>
              <Input
                type="number"
                min={0}
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock" className="text-right">
                Stock:
              </Label>
              <Input
                type="number"
                min={0}
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="image" className="text-right">
                Imagen:
              </Label>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                required
                className="cursor-pointer"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Agregar producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
