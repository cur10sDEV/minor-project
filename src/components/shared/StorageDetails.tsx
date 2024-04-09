"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { byteConverter } from "@/lib/utils";
import { IFolderAndFile } from "@/types";
import { Progress } from "../ui/progress";
import Lists from "./Lists";

interface StorageDetailsProps {
  files: IFolderAndFile[];
}

const StorageDetails = ({ files }: StorageDetailsProps) => {
  const { subscription, totalStorage } = useSubscription();

  const totalValue = subscription === "Basic" ? 15_000_000 : 15_000_000_0;

  return (
    <div className="mt-8 space-y-8">
      <div className="flex space-x-2 items-end">
        <div className="text-4xl">{byteConverter(totalStorage, 1)}</div>
        <div className="opacity-75">
          of {subscription === "Basic" ? "1.5" : "15"} GB user
        </div>
      </div>

      <Progress value={totalStorage / totalValue} />

      {files && <Lists files={files} forcedLayout="list" />}
    </div>
  );
};
export default StorageDetails;
