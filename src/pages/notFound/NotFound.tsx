import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Oops! The page you’re looking for doesn’t exist. <br />
        Maybe you took a wrong turn in the S&P 500 universe? 🌎
      </p>
      <Link to="/" className="home-link">Go Back Home</Link>
    </div>
  );
};

export default NotFound;