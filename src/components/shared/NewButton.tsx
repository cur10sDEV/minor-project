import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PopoverActions from "./PopoverActions";

const NewButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-fit h-10 rounded-full p-6 space-x-2 ml-4">
          <Plus />
          <span className="text-md">New</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit px-0 py-1 dark:bg-[#171717]">
        <PopoverActions />
      </PopoverContent>
    </Popover>
  );
};
export default NewButton;
