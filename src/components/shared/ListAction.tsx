import { IFolderAndFile } from "@/types";
import {
  Download,
  MoreVertical,
  Pencil,
  Star,
  Trash,
  UserPlus,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

interface ListActionProps {
  item: IFolderAndFile;
}

const ListAction = ({ item }: ListActionProps) => {
  return (
    <div className="flex items-center gap-4">
      <div
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Trash className="size-5 opacity-75 hover:opacity-100" />
      </div>
      <div
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Star className="size-5 opacity-75 hover:opacity-100" />
      </div>
      <Popover>
        <PopoverTrigger>
          <div role="button">
            <MoreVertical className="size-5" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit px-0 py-1 ">
          <div
            className="flex items-center justify-start gap-2 hover:bg-slate-50 dark:hover:bg-[#272727] px-6 py-2"
            role="button"
          >
            <Download className="size-5" />
            <span className="text-md">Download</span>
          </div>

          <div
            className="flex items-center justify-start gap-2 hover:bg-slate-50 dark:hover:bg-[#272727] px-6 py-2"
            role="button"
          >
            <Pencil className="size-5" />
            <span className="text-md">Rename</span>
          </div>
          <Separator />
          <div
            className="flex items-center justify-start gap-2 hover:bg-slate-50 dark:hover:bg-[#272727] px-6 py-2"
            role="button"
          >
            <UserPlus className="size-5" />
            <span className="text-md">Share</span>
          </div>
          <div
            className="flex items-center justify-start gap-2 hover:bg-slate-50 dark:hover:bg-[#272727] px-6 py-2"
            role="button"
          >
            <Trash className="size-5" />
            <span className="text-md">Move to trash</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ListAction;
