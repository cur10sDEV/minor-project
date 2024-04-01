import { IAddFolder, IGetFolder } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const addFolder = async ({ folderName, userId }: IAddFolder) => {
  return addDoc(collection(db, "folders"), {
    name: folderName,
    timestamp: serverTimestamp(),
    uid: userId,
    isArchive: false,
    parent: "root",
  });
};

export const getFolder = async ({ folderId }: IGetFolder) => {
  const docRef = doc(db, "folders", folderId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
// Function to download a folder with its contents in a zip file
// export const downloadFolder = async (folder: IFolderAndFile): Promise<void> => {
//   const zip = new JSZip();

//   // Recursively add files to the zip
//   const addFilesToZip = async (
//     folder: IFolderAndFile,
//     parentPath: string
//   ): Promise<void> => {
//     const filesSnapshot: QuerySnapshot<DocumentData> = await db
//       .collection("files")
//       .where("folderId", "==", folder.id)
//       .get();

//     filesSnapshot.forEach(async (fileDoc) => {
//       const fileData = fileDoc.data();
//       const fileRef: Reference = storage.ref().child(fileData.path);
//       const fileUrl: string = await getDownloadURL(fileRef);

//       const filePath = `${parentPath}/${fileData.name}`;
//       const fileBlob: Blob = await fetch(fileUrl).then((response) =>
//         response.blob()
//       );

//       zip.file(filePath, fileBlob);
//     });

//     const foldersSnapshot: QuerySnapshot<DocumentData> = await db
//       .collection("folders")
//       .where("parentId", "==", folder.id)
//       .get();

//     foldersSnapshot.forEach(async (folderDoc) => {
//       const folderData = folderDoc.data();
//       const folderPath = `${parentPath}/${folderData.name}`;

//       await addFilesToZip(folderData, folderPath);
//     });
//   };

//   await addFilesToZip(folder, folder.name);

//   // Generate the zip file
//   const zipBlob: Blob = await zip.generateAsync({ type: "blob" });

//   // Create a download link and trigger the download
//   const downloadLink: HTMLAnchorElement = document.createElement("a");
//   downloadLink.href = URL.createObjectURL(zipBlob);
//   downloadLink.download = `${folder.name}.zip`;
//   downloadLink.click();
// };
