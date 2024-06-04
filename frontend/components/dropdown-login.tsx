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

export function DropdownMenuLogin() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Log in</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 pb-4">
        <DropdownMenuLabel>Iniciar sesión</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action="">
          <DropdownMenuGroup className="flex flex-col gap-4">
            <Input
              id="username"
              type="text"
              placeholder="Ingrese el nombre del usuario o email"
              className="col-span-3 focus:outline-none"
            />
            <Input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              className="col-span-3"
            />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Ingresar
            <DropdownMenuShortcut>⌘Enter</DropdownMenuShortcut>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
