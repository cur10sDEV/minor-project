import { auth } from "@clerk/nextjs";
import { HelpCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ModeToggle } from "./ThemeToggle";
import UserBox from "./UserBox";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className="h-[75px] fixed top-0 z-30 left-0 right-0 bg-[#f3f3f3] dark:bg-[#1f1f1f]">
      <div className="flex items-center justify-between my-4 mx-6">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
            <span className="text-[22px] opacity-75">Cloud Connect Pro</span>
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <div
            className="p-2 hover:bg-secondary rounded-full transition"
            role="button"
          >
            <Settings className="size-6" />
          </div>
          <div
            className="p-2 hover:bg-secondary rounded-full transition"
            role="button"
          >
            <HelpCircle className="size-6" />
          </div>
          {userId ? (
            <UserBox />
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarFallback>SB</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
