import { create } from "zustand";

type LayoutStore = {
  layout: "grid" | "list";
  setLayout: (layout: "grid" | "list") => void;
};

const useLayout = create<LayoutStore>((set) => {
  return {
    layout: "grid",
    setLayout: (layout) => set({ layout }),
  };
});

export default useLayout;
