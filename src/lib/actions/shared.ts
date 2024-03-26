import { IFolderAndFile, IGetData, IGetStarredData } from "@/types";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const getData = async ({ userId, type }: IGetData) => {
  let data: any[] = [];

  const filterQuery = query(
    collection(db, type),
    where("uid", "==", userId),
    where("isArchive", "==", false)
  );
  const querySnapshot = await getDocs(filterQuery);

  querySnapshot.forEach((item) => data.push({ ...item.data(), id: item.id }));

  return data;
};

export const getStarredData = async ({ userId, type }: IGetStarredData) => {
  let data: any[] = [];

  const filterQuery = query(
    collection(db, type),
    where("uid", "==", userId),
    where("isArchive", "==", false),
    where("isStar", "==", true)
  );
  const querySnapshot = await getDocs(filterQuery);

  querySnapshot.forEach((item) => data.push({ ...item.data(), id: item.id }));

  return data;
};

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
