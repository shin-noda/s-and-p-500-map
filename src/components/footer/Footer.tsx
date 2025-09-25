// css
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="small">
        &copy; {new Date().getFullYear()} S&P 500 Map. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;