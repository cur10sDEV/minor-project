import { deleteItem, restoreItem } from "@/lib/actions/shared";
import { IFolderAndFile } from "@/types";
import { MoreVertical, Trash2, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { toast } from "sonner";
import ConfirmModal from "../modals/ConfirmModal";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface TrashActionProps {
  item: IFolderAndFile;
}

const TrashAction = ({ item }: TrashActionProps) => {
  const { refresh } = useRouter();

  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    toast.promise(
      deleteItem(item).then(() => refresh()),
      {
        loading: "Processing",
        success: "Premanently Deleted!",
        error: "Failed to delete",
      }
    );
  };

  const onRestore = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    toast.promise(
      restoreItem(item).then(() => refresh()),
      {
        loading: "Processing",
        success: "Restored!",
        error: "Failed to restore",
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
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
            onClick={onRestore}
          >
            <Undo className="size-5" />
            <span className="text-md">Restore</span>
          </div>
          <ConfirmModal onConfirm={onDelete}>
            <div
              className="flex items-center justify-start gap-2 hover:bg-slate-50 dark:hover:bg-[#272727] px-6 py-2"
              role="button"
            >
              <Trash2 className="size-5" />
              <span className="text-md">Delete</span>
            </div>
          </ConfirmModal>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default TrashAction;
