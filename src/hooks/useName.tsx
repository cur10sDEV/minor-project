import { IFolderAndFile } from "@/types";
import { create } from "zustand";

type NameStore = {
  item: IFolderAndFile | "null";
  type: "name" | "rename";
  isOpen: boolean;
  onOpen: (type: "name" | "rename", item: IFolderAndFile | "null") => void;
  onClose: () => void;
};

const useName = create<NameStore>((set, get) => {
  return {
    item: "null",
    type: "name",
    isOpen: false,
    onOpen: (type, item) => set({ isOpen: true, type, item }),
    onClose: () => set({ isOpen: false }),
  };
});

export default useName;
