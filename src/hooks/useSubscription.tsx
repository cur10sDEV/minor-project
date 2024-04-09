import { create } from "zustand";

type subscriptionPlan = {
  subscription: "Basic" | "Pro";
  setSubscription: (subscriptionPlan: "Basic" | "Pro") => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  totalStorage: number;
  setTotalStorage: (totalStorage: number) => void;
};

export const useSubscription = create<subscriptionPlan>((set) => ({
  subscription: "Basic",
  setSubscription: (subscription) => set({ subscription }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  totalStorage: 0,
  setTotalStorage: (totalStorage) => set({ totalStorage }),
}));
