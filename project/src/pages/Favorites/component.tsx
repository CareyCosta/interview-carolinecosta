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
          <>
            <h2 key={index}>
              Favorites from <strong>{userName}</strong>
            </h2>
            <ul>
              {favorites
                .filter((fav) => fav.userName === userName)
                .map(({ gistId, userName, fileName, fileContent }, index) => {
                  return (
                    <Fragment key={index}>
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
          </>
        ))}
    </div>
  );
}

export default Favorites;
