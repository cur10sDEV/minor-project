"use client";

import useLayout from "@/hooks/useLayout";
import { IFolderAndFile } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ListItem from "./ListItem";
import SuggestCard from "./SuggestCard";

interface ListsProps {
  folders?: IFolderAndFile[];
  files: IFolderAndFile[];
}

const Lists = ({ folders, files }: ListsProps) => {
  const { layout } = useLayout();

  let allData: IFolderAndFile[] = [];
  allData = folders ? [...folders, ...files] : [...files];

  return layout === "list" ? (
    <Table className="mt-4">
      <TableHeader>
        <TableRow className="text-base">
          <TableHead>Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>File Size</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allData.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </TableBody>
    </Table>
  ) : (
    <>
      {files && files.length > 0 && (
        <>
          <div className="text-base opacity-70 mt-8">Suggested</div>
          <div className="grid grid-cols-4 gap-8 mt-4">
            {files.map((file) => (
              <SuggestCard item={file} key={file.id} />
            ))}
          </div>
        </>
      )}
      {folders && folders.length > 0 && (
        <>
          <div className="text-base opacity-70 mt-8">Folders</div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow className="text-base">
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...folders].map((folder) => (
                <ListItem key={folder.id} item={folder} />
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};
export default Lists;
