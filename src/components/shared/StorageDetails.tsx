import { byteConverter } from "@/lib/utils";
import { IFolderAndFile } from "@/types";
import { Progress } from "../ui/progress";
import Lists from "./Lists";

interface StorageDetailsProps {
  usedStorage: number;
  files: IFolderAndFile[];
}

const StorageDetails = async ({ usedStorage, files }: StorageDetailsProps) => {
  return (
    <div className="mt-8 space-y-8">
      <div className="flex space-x-2 items-end">
        <div className="text-4xl">{byteConverter(usedStorage, 1)}</div>
        <div className="opacity-75">of 1.5 GB user</div>
      </div>

      <Progress value={usedStorage / 15_000_000} />

      {files && <Lists files={JSON.parse(JSON.stringify(files))} />}
    </div>
  );
};
export default StorageDetails;
