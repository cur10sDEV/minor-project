import Header from "@/components/shared/Header";
import Lists from "@/components/shared/Lists";
import { getData } from "@/lib/actions/folder";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();

  const folders = await getData({ userId: userId!, type: "folders" });
  const files = await getData({ userId: userId!, type: "files" });

  return (
    <div className="px-4">
      <Header label="My Drive" isHome />
      <Lists
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </div>
  );
}
