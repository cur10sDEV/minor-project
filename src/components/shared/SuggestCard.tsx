import { defineImageAndFile } from "@/lib/utils";
import { IFolderAndFile } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { File, Paperclip } from "lucide-react";
import Image from "next/image";
import ListAction from "./ListAction";

interface SuggestCardProps {
  item: IFolderAndFile;
}

const SuggestCard = ({ item }: SuggestCardProps) => {
  const { user } = useUser();
  return (
    <div className="flex gap-1 flex-col shadow-lg transition bg-secondary group max-h-[400px] max-w-[300px] h-[250px] border rounded-md p-4 cursor-pointer hover:shadow-xl">
      <div className="flex items-center space-x-2" role="button">
        <Paperclip className="size-5 text-blue-500" />
        <span className="text-sm opacity-70">
          {item.name.length > 25
            ? item.name.substring(0, 25) + "..."
            : item.name}
        </span>
      </div>
      <div className="relative h-[80%] w-full bg-white dark:bg-black mt-2 rounded-md">
        {defineImageAndFile(item.type) === "file" ? (
          <div className="flex h-full items-center justify-center">
            <File className="size-16" strokeWidth={1} />
          </div>
        ) : (
          <Image fill src={item.url} alt="image" className="object-cover" />
        )}
      </div>
      <div className="flex items-center w-full justify-between space-x-2 mt-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage className="size-6 rounded-full" src={user?.imageUrl} />
          </Avatar>
          <span className="opacity-75">me</span>
        </div>

        <ListAction item={item} />
      </div>
    </div>
  );
};
export default SuggestCard;
