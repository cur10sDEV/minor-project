import Header from "@/components/shared/Header";
import Lists from "@/components/shared/Lists";
import { getStarredData } from "@/lib/actions/shared";
import { auth } from "@clerk/nextjs";

const Starred = async () => {
  const { userId } = auth();

  const folders = await getStarredData({ userId: userId!, type: "folders" });
  const files = await getStarredData({ userId: userId!, type: "files" });

  return (
    <div className="px-4">
      <Header label="Starred" isHome />
      <Lists
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </div>
  );
};
export default Starred;
