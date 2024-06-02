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
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Product } from "../types/types";

interface DialogProductsEditProps {
  products: Product;
}

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

export const DialogProductsEdit = ({ products }: DialogProductsEditProps) => {
  const [name, setName] = useState(products.name);
  const [brand, setBrand] = useState(products.brand);
  const [type, setType] = useState(products.type);
  const [weight, setWeight] = useState(products.weight);
  const [description, setDescription] = useState(products.description);
  const [price, setPrice] = useState(products.price);
  const [stock, setStock] = useState(products.stock);
  const [image, setImage] = useState(products.image_url);
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear un objeto con los datos del producto
    const productData = {
      id: products.id,
      name: name,
      brand: brand,
      type: type,
      weight: weight,
      description: description,
      price: price,
      stock: stock,
      // image: newImage ? newImage : image,
    };

    try {
      const response = await fetch(
        "http://localhost/mateanddragons/index-products.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Especificar que los datos son JSON
          },
          body: JSON.stringify(productData), // Convertir el objeto en una cadena JSON
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Producto editado exitosamente");
        window.location.reload();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error al editar el producto");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-200 hover:bg-gray-300">
          <Pencil className="w-6 h-6 text-black" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditProduct}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name" className="text-right">
                Nombre del proucto
              </Label>
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
              <Select
                onValueChange={(value) => setBrand(value)}
                value={brand}
                required
              >
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
              <Select
                onValueChange={(value) => setType(value)}
                value={type}
                required
              >
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
              <Select
                onValueChange={(value) => setWeight(value)}
                value={weight}
                required
              >
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
                // Uso parseInt para convertir el valor a un número entero ya que es el tipo usado en la base de datos
                onChange={(e) => setPrice(parseInt(e.target.value))}
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
                // Uso parseInt para convertir el valor a un número entero ya que es el tipo usado en la base de datos
                onChange={(e) => setStock(parseInt(e.target.value))}
                required
              />
            </div>
            {/* <div>
              <Label htmlFor="image" className="text-right">
                Imagen:
              </Label>
              <Input
                type="file"
                onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
            </div> */}
          </div>
          <DialogFooter>
            <Button type="submit">Guardar producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
