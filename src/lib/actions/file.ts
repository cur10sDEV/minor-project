import { IUploadFile } from "@/types";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase";

export const uploadFile = async ({ file, userId, image }: IUploadFile) => {
  const doc = await addDoc(collection(db, "files"), {
    name: file.name,
    type: file.type,
    size: file.size,
    uid: userId,
    timestamp: serverTimestamp(),
    isArchive: false,
  });

  const fileRef = ref(storage, `files/${doc.id}/image`);

  await uploadString(fileRef, image, "data_url");

  const fileUrl = await getDownloadURL(fileRef);

  return await updateDoc(doc, { url: fileUrl });
};
