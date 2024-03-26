import Header from "@/components/shared/Header";
import Lists from "@/components/shared/Lists";
import { getRecentData } from "@/lib/actions/shared";
import { auth } from "@clerk/nextjs";

const Recent = async () => {
  const { userId } = auth();

  const folders = await getRecentData({ userId: userId!, type: "folders" });
  const files = await getRecentData({ userId: userId!, type: "files" });

  return (
    <div className="px-4">
      <Header label="Recent" isHome />
      <Lists
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </div>
  );
};
export default Recent;
