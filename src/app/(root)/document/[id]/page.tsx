import Header from "@/components/shared/Header";
import Lists from "@/components/shared/Lists";
import { getFolder } from "@/lib/actions/folder";
import { getData } from "@/lib/actions/shared";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

const Document = async ({ params }: ParamsProps) => {
  const { id } = params;
  const { userId } = auth();

  const files = await getData({
    userId: userId!,
    type: "files",
    folderId: id as string,
  });

  const folder = await getFolder({ folderId: id });

  return (
    <>
      <Header label={folder?.name} isHome />
      <Lists files={JSON.parse(JSON.stringify(files))} />
    </>
  );
};
export default Document;
