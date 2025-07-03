import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { GistPageProps } from "./types";
import { File } from "../../components";
import { getGist } from "../../repository";
import { GistDetailsType } from "../../types";

function Gist({
  addToFavorites,
  removeFromFavorites,
  favorites,
}: GistPageProps) {
  const { id } = useParams();
  const [selectedGist, setSelectedGist] = useState<GistDetailsType | null>(
    null
  );

  useEffect(() => {
    document.title = "Gist Details";
  }, []);

  useEffect(() => {
    async function fetchGist() {
      const gist = await getGist(id as GistDetailsType["id"]);
      if (gist) {
        setSelectedGist(gist);
      }
    }
    fetchGist();
  }, [id]);

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
