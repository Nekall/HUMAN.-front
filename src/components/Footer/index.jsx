import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <div className="all-human">
      <hr/>
      <p>Because we are all human.</p>
    </div>
    <footer className="footer">
      <Link className="" to="/">HUMAN.</Link>
      <Link className="" to="/products">Shop</Link>
      <Link className="" to="/concept">Concept</Link>
      <Link className="" to="/privacy-policy">Privacy Policy</Link>
      <Link className="" to="/frequently-asked-questions">FAQ</Link>
      <Link className="" to="/terms-of-use">Terms of use</Link>
    </footer>
  </>
);

export default Footer;
