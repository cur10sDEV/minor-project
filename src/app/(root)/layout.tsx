import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { ChildProps } from "@/types";

function RootLayout({ children }: ChildProps) {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
}
export default RootLayout;
