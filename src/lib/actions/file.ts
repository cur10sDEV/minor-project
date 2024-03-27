import { IFolderAndFile, IUploadFile } from "@/types";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase";

export const uploadFile = async ({ file, userId, url }: IUploadFile) => {
  const doc = await addDoc(collection(db, "files"), {
    name: file.name,
    type: file.type,
    size: file.size,
    uid: userId,
    timestamp: serverTimestamp(),
    isArchive: false,
  });

  const fileRef = ref(storage, `files/${doc.id}/file`);

  await uploadString(fileRef, url, "data_url");

  const fileUrl = await getDownloadURL(fileRef);

  return await updateDoc(doc, { url: fileUrl });
};

export const getFileDownloadUrl = (item: IFolderAndFile) => {
  const fileRef = ref(storage, item.url);
  const downloadUrl = getDownloadURL(fileRef);
  return downloadUrl;
};
