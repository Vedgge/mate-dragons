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
import toast from "react-hot-toast";

export function PopupUsersAdd() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("role", role);

    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // alert("Usuario creado exitosamente");
        toast.success("Usuario creado exitosamente", { duration: 5000 });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("Error al crear el usuario");
      toast.error("Error al crear el usuario");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar un nuevo usuario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar un nuevo usuario</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Ingrese el nombre del usuario"
                className="col-span-3"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="text"
                placeholder="********"
                className="col-span-3"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese el email del usuario"
                className="col-span-3"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              {/* {isUserAdming ? (
   <> */}
              <Label htmlFor="role" className="text-right">
                Roles
              </Label>
              <Select onValueChange={(value) => setRole(value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccione un rol para el usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    {/* </> */}
                    {/* ))} */}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* ) : null} */}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Agregar usuario</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
