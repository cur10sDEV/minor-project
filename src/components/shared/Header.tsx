import { ChevronDown, Info, TableProperties } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PopoverActions from "./PopoverActions";

interface HeaderProps {
  label: string;
  isHome?: boolean;
}

const Header = ({ label, isHome }: HeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      {isHome ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex gap-2 bg-slate-100 dark:bg-[#2f2f2f] hover:bg-slate-200 transition px-4 py-2 rounded-full">
              <h2>{label}</h2>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className="px-4 w-fit py-2">
            <PopoverActions />
          </PopoverContent>
        </Popover>
      ) : (
        <div className="text-xl">{label}</div>
      )}

      {isHome && (
        <div className="flex items-center gap-2">
          <div
            role="button"
            className="p-2 hover:bg-secondary rounded-full transition"
          >
            <TableProperties className="size-6" />
          </div>
          <div
            role="button"
            className="p-2 hover:bg-secondary rounded-full transition"
          >
            <Info className="size-6" />
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
