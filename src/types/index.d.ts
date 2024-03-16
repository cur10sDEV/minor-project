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
