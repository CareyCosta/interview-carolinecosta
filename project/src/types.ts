export type FileType = {
  filename: string;
  type: string;
  language: string;
};

export type GistDetailsType = Omit<GistType, "files"> & {
  files: Record<string, FileType & { content: string }>;
};

export type GistType = {
  id: string;
  files: Record<string, FileType>;
  created_at: string;
  updated_at: string;
  description: string;
  owner: {
    login: string;
  };
};

export type FavoriteType = {
  gistId: GistType["id"];
  userName: string;
  fileName: string;
  fileContent: string;
};

export type SetUserNameType = (name: string) => void;

export type HandleSearchType = (name: string) => void;

export type FavoriteFilesType = {
  gistId: GistType["id"];
  userName: string;
  fileName: string;
  fileContent: string;
};

export type AddToFavoritesType = (file: FavoriteFilesType) => void;

export type RemoveFromFavoritesType = (
  file: Omit<FavoriteFilesType, "userName" | "fileContent">
) => void;
