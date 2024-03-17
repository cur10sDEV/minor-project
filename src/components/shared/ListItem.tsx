"use client";

import { byteConverter } from "@/lib/utils";
import { IFolderAndFile } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { File, Folder, Minus } from "lucide-react";
import { AvatarImage } from "../ui/avatar";
import { TableCell, TableRow } from "../ui/table";
import ListAction from "./ListAction";

interface ListItemProps {
  item: IFolderAndFile;
}

const ListItem = ({ item }: ListItemProps) => {
  const { user } = useUser();

  return (
    <TableRow className="group cursor-pointer text-lg">
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {item.size ? (
            <File className="size-4" />
          ) : (
            <Folder className="size-4" />
          )}
          <span>
            {item.name.length > 25
              ? item.name.substring(0, 25) + "..."
              : item.name}
          </span>
        </div>
      </TableCell>
      <TableCell className="flex items-center gap-4">
        <Avatar>
          <AvatarImage className="size-8 rounded-full" src={user?.imageUrl} />
        </Avatar>
        <span className="opacity-75">me</span>
      </TableCell>
      <TableCell>
        {format(new Date(item.timestamp.seconds * 1000), "dd-MMM-yyyy")}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end items-center">
        <ListAction item={item} />
      </TableCell>
    </TableRow>
  );
};
export default ListItem;
