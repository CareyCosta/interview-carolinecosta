import { useEffect, useMemo, Fragment } from "react";
import { File } from "../../components";
import { FavoritePageTypes } from "./types";

function Favorites({ favorites, removeFromFavorites }: FavoritePageTypes) {
  useEffect(() => {
    document.title = "Favorite Gists";
  }, []);

  const users = useMemo(() => {
    const usersSet = new Set<string>();
    favorites.forEach(({ userName }) => {
      if (userName) {
        usersSet.add(userName);
      }
    });
    return Array.from(usersSet);
  }, [favorites]);

  return (
    <div className="page">
      {users.length > 0 &&
        users.map((userName, index) => (
          <Fragment key={userName}>
            <h2 key={index}>
              Favorites from <strong>{userName}</strong>
            </h2>
            <ul>
              {favorites
                .filter((fav) => fav.userName === userName)
                .map(({ gistId, fileName, fileContent }) => {
                  return (
                    <Fragment key={`${gistId}-${fileName}`}>
                      <File
                        gistId={gistId}
                        fileName={fileName}
                        fileContent={fileContent}
                        buttonText="Remove"
                        onClick={() =>
                          removeFromFavorites({ gistId, fileName })
                        }
                      />
                    </Fragment>
                  );
                })}
            </ul>
          </Fragment>
        ))}
    </div>
  );
}

export default Favorites;
