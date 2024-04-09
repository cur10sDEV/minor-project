"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { getStorageUsage } from "@/lib/actions/shared";
import { ChildProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const SubscriptionProvider = ({ children }: ChildProps) => {
  const { user, isLoaded } = useUser();
  const { setIsLoading, setSubscription, setTotalStorage } = useSubscription();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `/api/subscription?email=${user?.emailAddresses[0].emailAddress}`
      );
      const data = await res.json();
      setSubscription(data);

      // get storage usage
      const { storageUsage: usedStorage } = await getStorageUsage({
        userId: user?.id as string,
      });
      setTotalStorage(usedStorage);

      setIsLoading(false);
    };

    if (isLoaded) {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoaded]);

  return children;
};
export default SubscriptionProvider;
