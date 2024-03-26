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
  url: string;
}

export interface IGetData {
  userId: string;
  type: "folders" | "files";
}

export interface IGetStarredData extends IGetData {}
export interface IGetRecentData extends IGetData {}

export interface IFolderAndFile {
  id: string;
  name: string;
  uid: string;
  timestamp: Timestamp;
  url: string;
  type: string;
  size: number;
  isStar: boolean;
  archiveTime: Timestamp;
}
