"use client";

import { IFolderAndFile } from "@/types";
import Empty from "../shared/Empty";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TrashItem from "./TrashItem";

interface TrashListProps {
  folders: IFolderAndFile[];
  files: IFolderAndFile[];
}

const TrashList = ({ folders, files }: TrashListProps) => {
  let allData: IFolderAndFile[] = [...folders, ...files];

  return (
    <>
      {allData.length > 0 ? (
        <Table className="mt-4">
          <TableHeader>
            <TableRow className="text-base">
              <TableHead>Name</TableHead>
              <TableHead>Archived Time</TableHead>
              <TableHead>File Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...folders, ...files].map((item) => (
              <TrashItem key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Empty />
      )}
    </>
  );
};
export default TrashList;
