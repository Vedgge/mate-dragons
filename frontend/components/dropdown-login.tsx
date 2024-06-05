import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import { AuthContext } from "@/context/AuthContext";

export function DropdownMenuLogin() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(username, password);
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
              name="username" // Ensure this matches the name expected in handleLogin
              type="text"
              placeholder="Ingrese el nombre del usuario o email"
              className="col-span-3 focus:outline-none"
            />
            <Input
              id="password"
              name="password" // Ensure this matches the name expected in handleLogin
              type="password"
              placeholder="Ingrese su contraseña"
              className="col-span-3"
            />
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
