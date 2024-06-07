import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

export function DropdownMenuLogin() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(username, password);
      setError(""); // Limpiar errores previos del useState
    } catch (error: any) {
      setError(error.message);
      // alert("Error al iniciar sesión: " + error.name + error.message);
      toast.error("Error al iniciar sesión" + error.name + error.message)
      
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Log in</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 pb-4">
        <DropdownMenuLabel>Iniciar sesión</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form onSubmit={handleLogin}>
          <DropdownMenuGroup className="flex flex-col gap-4">
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Ingrese el nombre del usuario o email"
              className="col-span-3 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              className="col-span-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <button
            className="flex items-center justify-between w-full h-full p-3 text-sm duration-100 rounded-md hover:bg-gray-100"
            type="submit"
          >
            Ingresar
            <DropdownMenuShortcut>⌘Enter</DropdownMenuShortcut>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
