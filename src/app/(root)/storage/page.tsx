import Header from "@/components/shared/Header";
import StorageDetails from "@/components/shared/StorageDetails";
import { getData } from "@/lib/actions/shared";
import { auth } from "@clerk/nextjs";

const StoragePage = async () => {
  const { userId } = auth();

  const files = await getData({ userId: userId!, type: "files" });

  return (
    <>
      <Header label="Storage" />
      <StorageDetails files={JSON.parse(JSON.stringify(files))} />
    </>
  );
};
export default StoragePage;
