import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar.svg";

const Navbar = () => {

  let isConnected = localStorage.getItem("human.__session");
  console.log(typeof JSON.parse(isConnected));



  return (
    <nav className="navbar" >
      <Link className="human" to="/">HUMAN.</Link>
      {JSON.parse(isConnected)?
        <>
          <Link className="btn-pages" to="/cart">Cart</Link>
          <Link className="btn-pages" to="/profile">Profile <img src={avatar} alt="avatar"/></Link>
          <button id="logout" className="btn-pages logout" type="button">Logout</button>
        </>
        :
        <>
          <Link className="btn-pages" to="/login">Login</Link>
          <Link className="btn-pages" to="/signup">Signup</Link>
        </>
      }
      <Link className="btn-pages" to="/concept">Concept</Link>
      <Link className="btn-pages" to="/products">Shop</Link>
    </nav>
)};

export default Navbar;
