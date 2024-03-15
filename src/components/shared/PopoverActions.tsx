import { FileUp, Folder, FolderUp } from "lucide-react";
import { Separator } from "../ui/separator";

const PopoverActions = () => {
  return (
    <div className="space-y">
      <div
        className="flex items-center justify-start gap-3 hover:bg-slate-50 dark:hover:bg-[#272727] px-4 py-2"
        role="button"
      >
        <Folder className="size-5" />
        <span className="text-md">New Folder</span>
      </div>
      <Separator />
      <div
        className="flex items-center justify-start gap-3 hover:bg-slate-50 dark:hover:bg-[#272727] px-4 py-2"
        role="button"
      >
        <FileUp className="size-5" />
        <span className="text-md">File Upload</span>
      </div>
      <Separator />
      <div
        className="flex items-center justify-start gap-3 hover:bg-slate-50 dark:hover:bg-[#272727] px-4 py-2"
        role="button"
      >
        <FolderUp className="size-5" />
        <span className="text-md">Folder Upload</span>
      </div>
    </div>
  );
};
export default PopoverActions;
