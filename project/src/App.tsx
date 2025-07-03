import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAllGists } from "./repository";
import { GistType, FavoriteType } from "./types";
import { Home, Gist, Favorites } from "./pages";
import { Navigation } from "./components";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [allGists, setGists] = useState<GistType[]>([]);
  const [favorites, setFavorites] = useState<FavoriteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (userName: string) => {
    if (userName) {
      setIsLoading(true);
      const allGists = await getAllGists(userName);
      if (allGists.length) {
        setGists(allGists);
      }
      setIsLoading(false);
    } else {
      alert("Please enter a username.");
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = ({
    gistId,
    userName,
    fileName,
    fileContent,
  }: FavoriteType) => {
    setFavorites((prevFavorites) => [
      ...prevFavorites,
      { gistId, userName, fileName, fileContent },
    ]);
  };

  const handleRemoveFromFavorites = ({
    gistId,
    fileName,
  }: Omit<FavoriteType, "userName" | "fileContent">) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (fave) => !(fave.gistId === gistId && fave.fileName === fileName)
      )
    );
  };

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userName={userName}
                setUserName={setUserName}
                allGists={allGists}
                handleSearch={handleSearch}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <Gist
                favorites={favorites}
                addToFavorites={handleAddToFavorites}
                removeFromFavorites={handleRemoveFromFavorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFromFavorites={handleRemoveFromFavorites}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
