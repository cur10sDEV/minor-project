import { IFolderAndFile } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ListItem from "./ListItem";

interface ListsProps {
  folders: IFolderAndFile[];
  files: IFolderAndFile[];
}

const Lists = ({ folders, files }: ListsProps) => {
  return (
    <Table className="mt-6">
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
        {[...folders, ...files].map((folder) => (
          <ListItem key={folder.id} item={folder} />
        ))}
      </TableBody>
    </Table>
  );
};
export default Lists;
