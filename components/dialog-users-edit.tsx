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
import { EyeOff, Pencil } from "lucide-react";
import { useState } from "react";
import { User } from "../types/types";

interface DialogUsersEdit {
  user: User;
}

export const DialogUsersEdit = ({ user }: DialogUsersEdit) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear un objeto con los datos del usuario
    const userData = {
      id: user.id,
      username: username,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await fetch(
        "http://localhost/mateanddragons/index-users.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Especificar que los datos son JSON
          },
          body: JSON.stringify(userData), // Convertir el objeto en una cadena JSON
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Usuario editado exitosamente");
        window.location.reload();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error al editar el usuario");
    }
  };

  const handlePasswordVisibility = () => {
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
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
          <DialogTitle>Editar usuario</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditUser}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="username" className="text-right">
                Nombre de usuario
              </Label>
              <Input
                type="text"
                value={username}
                placeholder="Ingrese el nombre del usuario"
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-right">
                Email:
              </Label>
              <Input
                type="email"
                value={email}
                placeholder="Ingrese el nuevo email del usuario"
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="text-right">
                Contraseña
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                placeholder="Ingrese la nueva contraseña del usuario"
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                required
              />
              <EyeOff
                className="w-4 h-4 absolute right-3 top-[57%] cursor-pointer"
                onClick={handlePasswordVisibility}
              />
            </div>
            <div>
              <Label htmlFor="rol" className="text-right">
                Rol del usuario
              </Label>
              <Select
                onValueChange={(value) => setRole(value)}
                value={role}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccione un rol para el usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar usuario</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
