import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { ChildProps } from "@/types";

function RootLayout({ children }: ChildProps) {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="w-full min-h-[90vh] relative bg-[#f3f3f3] dark:bg-[#1f1f1f] top-[75px] pl-[285px] px-8 py-4">
        <div className="h-[89vh] rounded-lg bg-white dark:bg-[#171717] ml-4 p-8 shadow-2xl shadow-slate-100 dark:shadow-slate-900 overflow-y-scroll">
          {children}
        </div>
      </main>
    </div>
  );
}
export default RootLayout;
