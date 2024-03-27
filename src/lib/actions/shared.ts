import {
  IFolderAndFile,
  IGetArchiveData,
  IGetData,
  IGetRecentData,
  IGetStarredData,
} from "@/types";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase";

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

export const getRecentData = async ({ userId, type }: IGetRecentData) => {
  let data: any[] = [];

  const filterQuery = query(
    collection(db, type),
    where("uid", "==", userId),
    where("isArchive", "==", false),
    limit(4)
  );
  const querySnapshot = await getDocs(filterQuery);

  querySnapshot.forEach((item) => data.push({ ...item.data(), id: item.id }));

  return data;
};

export const getArchiveData = async ({ userId, type }: IGetArchiveData) => {
  let data: any[] = [];

  const filterQuery = query(
    collection(db, type),
    where("uid", "==", userId),
    where("isArchive", "==", true)
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

export const archiveItem = (item: IFolderAndFile) => {
  const type = item.size ? "files" : "folders";

  const ref = doc(db, type, item.id);
  return setDoc(ref, {
    ...item,
    isArchive: true,
    archivedTime: new Date(),
  });
};

export const restoreItem = (item: IFolderAndFile) => {
  const type = item.size ? "files" : "folders";

  const ref = doc(db, type, item.id);
  return setDoc(
    ref,
    {
      ...item,
      isArchive: false,
      archivedTime: deleteField(),
    },
    { merge: true }
  );
};

export const deleteItem = async (item: IFolderAndFile) => {
  const type = item.size ? "files" : "folders";

  const docRef = doc(db, type, item.id);
  const objRef = ref(storage, `files/${docRef.id}/image`);

  if (type === "files") {
    await deleteObject(objRef);
  }

  return deleteDoc(docRef);
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
