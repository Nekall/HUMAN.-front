import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <div className="all-human">
      <hr/>
      <p>Because we are all human.</p>
    </div>
    <footer className="footer">
      <div>
        <Link className="" to="/">HUMAN.</Link>
        <Link className="" to="/products">Shop</Link>
        <Link className="" to="/concept">Concept</Link>
      </div>
      <div>
        <Link className="" to="/">Privacy Policy</Link>
        <Link className="" to="/">FAQ</Link>
        <Link className="" to="/">Terms of use</Link>
      </div>
    </footer>
  </>
);

export default Footer;
