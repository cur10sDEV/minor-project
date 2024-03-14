import { sidebarLinks } from "@/constants";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import NavbarItem from "./NavbarItem";

const Sidebar = () => {
  return (
    <div className="h-[100vh] fixed top-[75px] w-72 left-0 z-30 bg-[#f4f4f4] dark:bg-[#1f1f1f] border-r">
      <div className="flex flex-col p-8">
        <Button className="w-fit h-10 rounded-full p-6 space-x-2 ml-4">
          <Plus />
          <span className="text-md">New</span>
        </Button>
        <div className="flex flex-col space-y-2 mt-8">
          {sidebarLinks.map((item) => (
            <Link href={item.path} key={item.path}>
              <NavbarItem {...item} />
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-4 mx-4 mt-4">
          <Progress className="h-2" value={30} />
          <span>20 MB of 1.5GB used</span>
          <Button className="rounded-full" variant="outline">
            Get more storage
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
