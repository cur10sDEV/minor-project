"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { ChildProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const SubscriptionProvider = ({ children }: ChildProps) => {
  const { user, isLoaded } = useUser();
  const { setIsLoading, setSubscription } = useSubscription();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `/api/subscription?email=${user?.emailAddresses[0].emailAddress}`
      );
      const data = await res.json();
      setSubscription(data);
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
