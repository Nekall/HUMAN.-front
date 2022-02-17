import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar" >
    <Link className="human" to="/">HUMAN.</Link>
    <Link className="btn-pages" to="/concept">Concept</Link>
    <Link className="btn-pages" to="/products">Shop</Link>
    <Link className="btn-pages" to="/cart">Cart</Link>
  </nav>
);

export default Navbar;
