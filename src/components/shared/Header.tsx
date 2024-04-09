"use client";

import useLayout from "@/hooks/useLayout";
import { ChevronDown, LayoutPanelTop, TableProperties } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PopoverActions from "./PopoverActions";

interface HeaderProps {
  label: string;
  isHome?: boolean;
}

const Header = ({ label, isHome }: HeaderProps) => {
  const { layout, setLayout } = useLayout();

  return (
    <div className="w-full flex items-center justify-between">
      {isHome ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex gap-2 transition py-2 rounded-full">
              <h2>{label}</h2>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className="px-0 w-fit py-1">
            <PopoverActions />
          </PopoverContent>
        </Popover>
      ) : (
        <div className="text-xl">{label}</div>
      )}

      {isHome && (
        <div className="flex items-center gap-2">
          {layout === "list" ? (
            <div
              role="button"
              className="p-2 hover:bg-secondary rounded-full transition"
              onClick={() => setLayout("grid")}
            >
              <TableProperties className="size-6" />
            </div>
          ) : (
            <div
              role="button"
              className="p-2 hover:bg-secondary rounded-full transition"
              onClick={() => setLayout("list")}
            >
              <LayoutPanelTop className="size-6" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Header;
