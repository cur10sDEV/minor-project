"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { UserProfile, useUser } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import { BadgeCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const UserSettings = () => {
  const { subscription } = useSubscription();
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  const onSubmit = () => {
    const promise = fetch("/api/subscription", {
      method: "POST",
      body: JSON.stringify({
        email: user?.emailAddresses[0].emailAddress,
        fullName: user?.fullName,
        userId: user?.id,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_API_ID,
      }),
    }).then(async (res) => {
      const data = await res.json();
      window.open(data, "_blank");
    });

    toast.promise(promise, {
      loading: subscription === "Basic" ? "Subscribing..." : "Processing",
      success: subscription === "Basic" ? "Subscribed!" : "Processed",
      error: subscription === "Basic" ? "Error Subscribing!" : "Failed",
    });
  };

  return (
    <Tabs defaultValue="account" className="mt-4 text-lg">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="subscription">Manage</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <UserProfile
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : shadesOfPurple,
          }}
        />
      </TabsContent>
      <TabsContent value="subscription">
        <div className="flex space-x-4">
          <div className="border rounded-xl p-4 w-80">
            <p className="text-lg font-bold">Current Plan</p>

            <div className="mt-4">
              <div className="flex items-center border-b justify-between pb-2 mt-4">
                <p className="opacity-75">Plan: </p>
                <p>{subscription}</p>
              </div>

              <div className="flex items-center border-b justify-between pb-2 mt-4">
                <p className="opacity-75">Price: </p>
                <p>{subscription === "Pro" ? "$ 10.00" : "$ 0"}</p>
              </div>

              <div className="flex items-center border-b justify-between pb-2 mt-4">
                <p className="opacity-75">Storage: </p>
                <p>{subscription === "Pro" ? "15 GB" : "1.5 GB"}</p>
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-4 flex-1 px-12">
            <p className="text-lg font-bold">
              {subscription === "Basic"
                ? "Upgrade your benefits"
                : "Your plan benefits"}
            </p>

            <div className="grid grid-cols-2 mt-4">
              {options.split(", ").map((option) => (
                <div className="flex items-center pb-2 space-x-2" key={option}>
                  <BadgeCheck className="size-5 text-blue-500" />
                  <p className="opacity-75">{option.trim()}</p>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-center">
              <Button onClick={onSubmit} className="mt-8 text-lg">
                {subscription === "Basic" ? "Upgrade" : "Manage"}
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default UserSettings;

const options =
  "15 GB of storage, More storage, Share with upto 5 members, More features unlocked";
