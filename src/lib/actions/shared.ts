import { IFolderAndFile } from "@/types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const toggleStar = (item: IFolderAndFile) => {
  const type = item.size ? "files" : "folders";

  const ref = doc(db, type, item.id);
  return setDoc(ref, {
    ...item,
    isStar: item.isStar ? false : true,
  });
};

export const deleteItem = (item: IFolderAndFile) => {
  const type = item.size ? "files" : "folders";

  const ref = doc(db, type, item.id);
  return setDoc(ref, {
    ...item,
    isArchive: true,
    archivedTime: new Date(),
  });
};

export const renameItem = (item: IFolderAndFile, newName: string) => {
  const type = item.size ? "files" : "folders";
  const ext = type === "files" ? "." + item.type.split("/")[1] : "";

  const ref = doc(db, type, item.id);
  return setDoc(ref, {
    ...item,
    name: newName + ext,
  });
};
