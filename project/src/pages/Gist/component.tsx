import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { File } from "../../components";
import { getGist } from "../../repository";
import {
  GistType,
  FavoriteType,
  AddToFavoritesType,
  RemoveFromFavoritesType,
} from "../../types";

function Gist({
  addToFavorites,
  removeFromFavorites,
  favorites,
}: {
  addToFavorites: AddToFavoritesType;
  favorites: FavoriteType[];
  removeFromFavorites: RemoveFromFavoritesType;
}) {
  const { id } = useParams();
  const location = useLocation();
  const [selectedGist, setSelectedGist] = useState<GistType | null>(null);

  useEffect(() => {
    document.title = "Gist Details";
  }, []);

  useEffect(() => {
    async function fetchGist() {
      const gist = await getGist(id as GistType["id"]);
      if (gist) {
        setSelectedGist(gist);
      }
    }
    fetchGist();
  }, [id]);

  // Handle hash scrolling after content is loaded
  useEffect(() => {
    if (selectedGist && location.hash) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [selectedGist, location.hash]);

  return (
    <div className="page">
      <Link to={`/`}>Back to Gists</Link>
      {selectedGist && (
        <div style={{ textAlign: "left" }}>
          <h1>
            {selectedGist.owner.login}/{selectedGist.id}
          </h1>
          {selectedGist.description && (
            <p>Description: {selectedGist.description}</p>
          )}

          <ul>
            {Object.keys(selectedGist.files).map((fileName) => {
              const isFavorite = favorites.some(
                (fave) =>
                  fave.gistId === selectedGist.id && fave.fileName === fileName
              );
              const fileContent = selectedGist.files[fileName].content;

              return (
                <Fragment key={fileName}>
                  <File
                    fileName={fileName}
                    fileContent={fileContent}
                    buttonText={
                      isFavorite ? "Remove From Favorites" : "Add to Favorites"
                    }
                    onClick={() =>
                      isFavorite
                        ? removeFromFavorites({
                            gistId: selectedGist.id,
                            fileName,
                          })
                        : addToFavorites({
                            gistId: selectedGist.id,
                            userName: selectedGist.owner.login,
                            fileName,
                            fileContent: selectedGist.files[fileName].content,
                          })
                    }
                  />
                </Fragment>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Gist;
