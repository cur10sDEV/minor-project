import useName from "@/hooks/useName";
import { getFileDownloadUrl } from "@/lib/actions/file";
import { deleteItem, toggleStar } from "@/lib/actions/shared";
import { IFolderAndFile } from "@/types";
import {
  Download,
  MoreVertical,
  Pencil,
  Star,
  Trash,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

interface ListActionProps {
  item: IFolderAndFile;
}

const ListAction = ({ item }: ListActionProps) => {
  const { refresh } = useRouter();
  const { onOpen } = useName();

  const onDelete = (e: any) => {
    e.stopPropagation();

    toast.promise(
      deleteItem(item).then(() => refresh()),
      {
        loading: "Processing",
        success: "Archived!",
        error: "Failed to archive",
      }
    );
  };

  const onStar = (e: any) => {
    e.stopPropagation();

    toast.promise(
      toggleStar(item).then(() => refresh()),
      {
        loading: "Processing",
        success: item.isStar ? "Star removed!" : "Starred!",
        error: item.isStar ? "Failed to remove star" : "Failed to star",
      }
    );
  };

  const downloadItem = async (e: any) => {
    e.stopPropagation();

    if (!item.size) {
      toast.error("Can't download a folder!");
      return;
    }

    const downloadUrl = await getFileDownloadUrl(item);
    window.open(downloadUrl, "_blank");
  };

  const onShare = async (e: any) => {
    e.stopPropagation();

    if (!item.size) {
      toast.error("You can't share a folder!");
      return;
    }

    const downloadUrl = await getFileDownloadUrl(item);
    toast.promise(navigator.clipboard.writeText(downloadUrl), {
      success: "Link copied to clipboard!",
      error: "Unable to generate link",
      loading: "Generating link...",
    });
  };

  const onRename = async (e: any) => {
    e.stopPropagation();
    onOpen("rename", item);
  };

  return (
    <div className="flex items-center gap-2">
      <div
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
        onClick={onDelete}
      >
        <Trash className="size-5 opacity-75 hover:opacity-100" />
      </div>
      {item.isStar ? (
        <div
          role="button"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
          onClick={onStar}
        >
          <Star className="size-5 opacity-75 hover:opacity-100 fill-primary" />
        </div>
      ) : (
        <div
          role="button"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
          onClick={onStar}
        >
          <Star className="size-5 opacity-75 hover:opacity-100" />
        </div>
      )}

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
            onClick={downloadItem}
          >
            <Download className="size-5" />
            <span className="text-md">Download</span>
          </div>

          <div
            className="flex items-center justify-start gap-2 hover:bg-slate-50 dark:hover:bg-[#272727] px-6 py-2"
            role="button"
            onClick={onRename}
          >
            <Pencil className="size-5" />
            <span className="text-md">Rename</span>
          </div>
          <Separator />
          <div
            className="flex items-center justify-start gap-2 hover:bg-slate-50 dark:hover:bg-[#272727] px-6 py-2"
            role="button"
            onClick={onShare}
          >
            <UserPlus className="size-5" />
            <span className="text-md">Share</span>
          </div>
          <div
            className="flex items-center justify-start gap-2 hover:bg-slate-50 dark:hover:bg-[#272727] px-6 py-2"
            role="button"
            onClick={onDelete}
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
