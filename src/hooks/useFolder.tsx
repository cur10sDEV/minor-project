import { create } from "zustand";

type FolderStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useFolder = create<FolderStore>((set, get) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});

export default useFolder;
