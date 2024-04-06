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
  folderId?: string | undefined;
}

export interface IGetData {
  userId: string;
  type: "folders" | "files";
  folderId?: string;
}

export interface IGetStarredData extends IGetData {}
export interface IGetRecentData extends IGetData {}
export interface IGetArchiveData extends IGetData {}

export interface IFolderAndFile {
  id: string;
  name: string;
  uid: string;
  timestamp: Timestamp;
  url: string;
  type: string;
  size: number;
  isStar: boolean;
  archivedTime: Timestamp;
}

export interface ParamsProps {
  params: { id: string };
}
export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface IGetFolder {
  folderId: string;
}

export interface IGetStorageUsage {
  userId: string;
}
