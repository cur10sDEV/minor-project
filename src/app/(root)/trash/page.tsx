import Header from "@/components/shared/Header";
import TrashList from "@/components/trash/TrashList";
import { getArchiveData } from "@/lib/actions/shared";
import { auth } from "@clerk/nextjs";

const Archive = async () => {
  const { userId } = auth();

  const folders = await getArchiveData({ userId: userId!, type: "folders" });
  const files = await getArchiveData({ userId: userId!, type: "files" });

  return (
    <div className="px-4">
      <Header label="Trash" />
      <TrashList
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </div>
  );
};
export default Archive;
