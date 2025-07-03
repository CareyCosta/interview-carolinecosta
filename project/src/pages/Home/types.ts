import { GistType, HandleSearchType, SetUserNameType } from "../../types";

export type HomePageProps = {
  isLoading: boolean;
  userName: string;
  setUserName: SetUserNameType;
  allGists: GistType[];
  handleSearch: HandleSearchType;
};
