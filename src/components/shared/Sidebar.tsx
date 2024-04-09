"use client";

import { sidebarLinks } from "@/constants";
import usePlan from "@/hooks/usePlan";
import Link from "next/link";
import { Button } from "../ui/button";
import NewButton from "./NewButton";
import SidebarItem from "./SidebarItem";
import UsageBar from "./UsageBar";

const Sidebar = () => {
  const { onOpen } = usePlan();

  return (
    <div className="h-[100vh] fixed top-[75px] w-[275px] left-0 z-30 bg-[#f3f3f3] dark:bg-[#1f1f1f]">
      <div className="flex flex-col p-8">
        <NewButton />
        <div className="flex flex-col space-y-2 mt-8">
          {sidebarLinks.map((item) => (
            <Link href={item.path} key={item.path}>
              <SidebarItem {...item} />
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-4 mx-4 mt-4">
          <UsageBar />
          <Button
            className="rounded-full text-md py-6"
            variant="outline"
            onClick={onOpen}
          >
            Get more storage
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
