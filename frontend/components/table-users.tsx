import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/types";
import { Button } from "./ui/button";
import { CircleAlert, CircleX } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { PopupUserEdit } from "./popup-users-edit";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

interface TableUsersProps {
  filteredUsers: User[];
}

export const TableUsers: React.FC<TableUsersProps> = ({ filteredUsers }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { decodedToken } = useContext(AuthContext);

  useEffect(() => {
    setUsers(
      filteredUsers.filter((user) => user.username !== decodedToken.username)
    );
  }, [filteredUsers, decodedToken]);

  const handleUserAccount = () => {
    toast("Este es el usuario que estas usando!", {
      icon: "👏",
    });
    console.log(decodedToken);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(
        `http://mate-dragons.railway.internal/api/users/${id}`,
        {
          method: "DELETE",
          body: `id=${id}`,
        }
      );

      const data = await response.json();
      if (data.success) {
        // alert("Usuario eliminado exitosamente");
        toast.success("Usuario eliminado exitosamente");
        setUsers((filteredUsers) =>
          filteredUsers.filter((user) => user.id !== id)
        );
      } else {
        alert("Error: " + data.error);
      }
    } catch (error: any) {
      console.error("Error:", error);
      // alert("Error al eliminar el usuario");
      toast.error("Error al eliminar el usuario" + error.name + error.message);
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
        <TableRow key={0}>
          <TableCell className="font-medium">{decodedToken.id}</TableCell>
          <TableCell>{decodedToken.username}</TableCell>
          <TableCell>{decodedToken.email}</TableCell>
          <TableCell>{decodedToken.roles[0]}</TableCell>
          <TableCell className="w-[150px] flex items-center gap-2">
            <Button
              onClick={handleUserAccount}
              className="bg-green-500 hover:bg-green-700"
            >
              <CircleAlert className="w-6 h-6" />
            </Button>
          </TableCell>
        </TableRow>
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
