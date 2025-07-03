import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <nav>
      <div style={{ margin: "0 25px" }}>
        {currentPath !== "/" ? <Link to="/">Home</Link> : <h1>Home</h1>}
        {currentPath !== "/favorites" ? (
          <Link to="/favorites">Favorites</Link>
        ) : (
          <h1>Favorites</h1>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
