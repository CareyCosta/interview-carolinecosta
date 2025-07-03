import { ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { HomePageProps } from "./types";

function Home({
  userName,
  setUserName,
  allGists,
  handleSearch,
  isLoading,
}: HomePageProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  useEffect(() => {
    document.title = "Home, Search Gists";
  }, []);

  return (
    <div>
      <header className="App-header">
        <div className="isFlexible alignCenter">
          <form
            onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSearch(userName);
            }}
          >
            <input
              aria-label="Search for a user name"
              type="text"
              value={userName}
              onChange={handleInputChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      <div className="isFlexible flexColumn alignCenter">
        {allGists.length > 0 && (
          <h2>
            Results for <strong>{allGists[0].owner.login}</strong>
          </h2>
        )}

        <ul>
          {isLoading ? (
            <span>Loading results...</span>
          ) : (
            allGists.map(
              ({ id, description, files, created_at, updated_at }) => (
                <li key={id} data-testid={id}>
                  <Link to={`/${id}`} className="gist-link">
                    <div className="isFlexible alignCenter justifySpaceBetween">
                      {!!files && (
                        <h3>
                          <strong>{Object.keys(files)[0]}</strong>
                        </h3>
                      )}
                      <span>Files: {Object.keys(files).length}</span>
                    </div>

                    <p>{description}</p>
                    <p>
                      Created at: {new Date(created_at).toLocaleDateString()}
                    </p>
                    <p>
                      Last Updated: {new Date(updated_at).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              )
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
