import React from "react";

import Link from "next/link";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";

import { useDispatch } from "react-redux";
import { clearItems } from "@/store/slices/usersSlice";
import { EditUser } from "./EditUser";
import { UserService } from "@/services/user.service";

export default function UserItem({ item }: any) {
  const dispatch = useDispatch();

  const deleteUser = (id: number) => {
    dispatch(clearItems({ id }));
    UserService.delete(id);
  };

  return (
    <>
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <Link href={`/user/${item.id}`}>
            {item.avatarPath && (
              <img
                src={`http://localhost:4200/${item.avatarPath}`}
                alt={"title"}
              />
            )}
          </Link>
        </TableCell>
        <TableCell className="font-medium ">
          <Link href={`/user/${item.id}`} className=" hover:shadow-md">
            {item.name + " " + item.surname} / {item.gender}
          </Link>
        </TableCell>

        <TableCell>
          <Badge variant="outline">{item.placeOfResidence}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{item.height}</TableCell>
        <TableCell className="hidden md:table-cell">{item.weight}</TableCell>
        <TableCell className="hidden md:table-cell">
          {item.createdAt.slice(0, 10)} / {item.createdAt.slice(11, 19)}
        </TableCell>
        <TableCell>
          <EditUser item={item} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="destructive">
                <X className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => deleteUser(item.id)}
                className="hover:cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
