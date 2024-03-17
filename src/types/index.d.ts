import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface IAddFolder {
  folderName: string;
  userId: string;
}

export interface IUploadFile {
  file: File;
  userId: string;
  image: string;
}

export interface IGetData {
  userId: string;
  type: "folders" | "files";
}

export interface IFolderAndFile {
  id: string;
  name: string;
  uid: string;
  timestamp: Timestamp;
  image: string;
  type: string;
  size: number;
  isStar: boolean;
  archiveTime: Timestamp;
}
