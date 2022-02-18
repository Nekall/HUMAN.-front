import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar.svg";

const Navbar = () => (
  <nav className="navbar" >
    <Link className="human" to="/">HUMAN.</Link>
    <Link className="btn-pages" to="/cart">Cart</Link>
    <Link className="btn-pages" to="/products">Shop</Link>
    <Link className="btn-pages" to="/concept">Concept</Link>
    <Link className="btn-pages" to="/login">Login</Link>
    <Link className="btn-pages" to="/signup">Signup</Link>
    <Link className="btn-pages" to="/profile">Profile <img src={avatar} alt="avatar"/></Link>
  </nav>
);

export default Navbar;
