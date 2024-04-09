import { useSubscription } from "@/hooks/useSubscription";
import { byteConverter } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Progress } from "../ui/progress";

const UsageBar = () => {
  const { isLoading, subscription, totalStorage } = useSubscription();

  const totalValue = subscription === "Basic" ? 15_000_000 : 15_000_000_0;

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <Loader className="animate-spin text-muted-foreground w-5 h-5" />
        </div>
      ) : (
        <>
          <Progress className="h-2" value={totalStorage / totalValue} />
          <span>
            {byteConverter(totalStorage, 1)} of{" "}
            {subscription === "Basic" ? "1.5" : "15"} GB used
          </span>
        </>
      )}
    </>
  );
};
export default UsageBar;
