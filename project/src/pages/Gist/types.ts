import {
  AddToFavoritesType,
  FavoriteType,
  RemoveFromFavoritesType,
} from "../../types";

export type GistPageProps = {
  addToFavorites: AddToFavoritesType;
  favorites: FavoriteType[];
  removeFromFavorites: RemoveFromFavoritesType;
};
