import { LucideIcon } from "lucide-react";

interface NavbarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
}

const NavbarItem = ({ icon: Icon, path, label }: NavbarItemProps) => {
  return (
    <div className="flex items-center transition dark:hover:bg-secondary hover:bg-slate-50 rounded-full p-4 cursor-pointer gap-2">
      <Icon className="w-5 h-5" />
      <span className="text-md opacity-75">{label}</span>
    </div>
  );
};
export default NavbarItem;
