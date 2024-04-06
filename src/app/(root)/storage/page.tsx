import Header from "@/components/shared/Header";
import StorageDetails from "@/components/shared/StorageDetails";
import { getStorageUsage } from "@/lib/actions/shared";
import { auth } from "@clerk/nextjs";

const StoragePage = async () => {
  const { userId } = auth();

  const { storageUsage: usedStorage, data: files } = await getStorageUsage({
    userId: userId as string,
  });

  return (
    <>
      <Header label="Storage" />
      <StorageDetails usedStorage={usedStorage} files={files} />
    </>
  );
};
export default StoragePage;
