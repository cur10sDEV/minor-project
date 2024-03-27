"use client";

import { byteConverter } from "@/lib/utils";
import { IFolderAndFile } from "@/types";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { File, Folder, Minus } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";
import TrashAction from "./TrashAction";

interface TrashItemProps {
  item: IFolderAndFile;
}

const TrashItem = ({ item }: TrashItemProps) => {
  console.log();
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
      <TableCell>
        {format(
          new Date(item.archivedTime.seconds * 1000),
          "MMM dd yyyy, hh:mm a"
        )}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end items-center">
        <TrashAction item={item} />
      </TableCell>
    </TableRow>
  );
};
export default TrashItem;
