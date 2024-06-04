import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/types";
// import { PopupProductsEdit } from "./dialog-products-edit";
import { Button } from "./ui/button";
import { CircleX, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { PopupUserEdit } from "./popup-users-edit";

interface TableUsersProps {
  filteredUsers: User[];
}

export const TableUsers: React.FC<TableUsersProps> = ({ filteredUsers }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(filteredUsers);
  }, [filteredUsers]);

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
        body: `id=${id}`,
      });

      const data = await response.json();
      if (data.success) {
        alert("Usuario eliminado exitosamente");
        setUsers((filteredUsers) =>
          filteredUsers.filter((user) => user.id !== id)
        );
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar el usuario");
    }
  };

  return (
    <Table>
      <TableCaption>Lista de los usuarios registrados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="w-[150px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="w-[150px] flex items-center gap-2">
              <PopupUserEdit user={user} />
              <Button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 hover:bg-red-700"
              >
                <CircleX className="w-6 h-6" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
