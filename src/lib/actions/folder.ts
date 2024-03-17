import { IAddFolder, IGetData } from "@/types";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const addFolder = async ({ folderName, userId }: IAddFolder) => {
  return addDoc(collection(db, "folders"), {
    name: folderName,
    timestamp: serverTimestamp(),
    uid: userId,
    isArchive: false,
  });
};

export const getData = async ({ userId, type }: IGetData) => {
  let data: any[] = [];

  const filterQuery = query(collection(db, type), where("uid", "==", userId));
  const querySnapshot = await getDocs(filterQuery);

  querySnapshot.forEach((item) => data.push({ ...item.data(), id: item.id }));

  return data;
};
