import React, { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { DialogUsers } from "./dialog-users";
import { TableUsers } from "./table-users";
import { User } from "../types/types";


export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [roleFiltered, setRoleFiltered] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost/mateanddragons/api-users.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la red");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Usuarios obtenidos:", data);
        setUsers(data);
      })
      .catch((error) => console.error("Error al obtener los usuarios:", error));
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesType = roleFiltered === "" || user.role === roleFiltered;
      const matchesSearch = user.username
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [roleFiltered, search, users]);

  return (
    <section className="mt-10">
      <div className="flex justify-between mb-10">
        <div className="flex gap-4 mb-4">
          <select
            name="role"
            id="role"
            value={roleFiltered}
            onChange={(e) => setRoleFiltered(e.target.value)}
            className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 col-span-3 w-[200px]"
          >
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[200px]"
          />
        </div>
        <DialogUsers />
      </div>
      <div>
        <TableUsers filteredUsers={filteredUsers} />
      </div>
    </section>
  );
}