"use client";

import useName from "@/hooks/useName";
import { uploadFile } from "@/lib/actions/file";
import { useUser } from "@clerk/nextjs";
import { FileUp, Folder, FolderUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, ElementRef, useRef } from "react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

const PopoverActions = () => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const { onOpen } = useName();
  const { user } = useUser();
  const router = useRouter();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user?.id) {
      toast.error(
        "You need to be registered in order to perform this operation!"
      );
    } else {
      const files = e.target.files;

      if (!files) {
        return;
      }

      const file = files[0];
      let image = "";

      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          image = e.target?.result as string;
          const res = toast.promise(
            uploadFile({ file, userId: user.id, url: image }).then(() =>
              router.refresh()
            ),
            {
              loading: "Processing",
              success: "File uploaded successfully",
              error: "Error uploading file",
            }
          );
        };
      }
    }
  };

  return (
    <div className="space-y">
      <div
        className="flex items-center justify-start gap-3 hover:bg-slate-50 dark:hover:bg-[#272727] px-4 py-2"
        role="button"
        onClick={() => onOpen("name", "null")}
      >
        <Folder className="size-5" />
        <span className="text-md">New Folder</span>
      </div>
      <Separator />
      <label>
        <div
          className="flex items-center justify-start gap-3 hover:bg-slate-50 dark:hover:bg-[#272727] px-4 py-2"
          role="button"
        >
          <FileUp className="size-5" />
          <span className="text-md">File Upload</span>
        </div>
        <input
          type="file"
          name="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
      <label>
        <div
          className="flex items-center justify-start gap-3 hover:bg-slate-50 dark:hover:bg-[#272727] px-4 py-2"
          role="button"
        >
          <FolderUp className="size-5" />
          <span className="text-md">Folder Upload</span>
        </div>
        <input
          type="file"
          name="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
    </div>
  );
};
export default PopoverActions;
