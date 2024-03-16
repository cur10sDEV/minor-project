import { IAddFolder } from "@/types";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const addFolder = async ({ folderName, userId }: IAddFolder) => {
  return addDoc(collection(db, "folders"), {
    name: folderName,
    timestamp: serverTimestamp(),
    uid: userId,
    isArchive: false,
  });
};
