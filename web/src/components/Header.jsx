import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Header.css'; // Importing the CSS file for the navbar styles

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1 className="logo-text">
            <span className="logo-derma">Derma</span>
            <span className="logo-insight">Insight</span>
          </h1>
        </Link>

        <ul className="navbar-links">
          {currentUser && (
            <Link to="/" className="navbar-link">
              <li>Home</li>
            </Link>
          )}
          <Link to="/how-it-work" className="navbar-link">
            <li>How It Works</li>
          </Link>
          <Link to="/chat" className="navbar-link">
            <li>Chat</li>
          </Link>
          <Link to="/profile" className="navbar-link profile-link">
            {currentUser ? (
              <img
                className="profile-image"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
