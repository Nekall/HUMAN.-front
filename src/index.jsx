import './style/main.scss';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Home from "pages/Home";
import Product from "pages/Product";
import Concept from "pages/Concept";
import Shop from "pages/Shop";
import Cart from "pages/Cart";
import Signup from "pages/Signup";
import Login from "pages/Login";
import Profile from "pages/Profile";
import ModifyProfile from "pages/ModifyProfile";
import Error from "pages/Error";
import Footer from "components/Footer";

const App = () => {

  //Init LocalStorage session state
  if(localStorage.getItem("human.__session") === null){
    localStorage.setItem("human.__session", false);
  }

  return (
    <div>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
              <Footer />
            </Route>
            <Route path="/product/:slug/:id">
              <Product />
              <Footer />
            </Route>
            <Route path="/concept">
              <Concept />
              <Footer />
            </Route>
            <Route path="/products" exact>
              <Shop />
              <Footer />
            </Route>
            <Route path="/cart">
              <Cart />
              <Footer />
            </Route>
            <Route path="/signup">
              <Signup />
              <Footer />
            </Route>
            <Route path="/login">
              <Login />
              <Footer />
            </Route>
            <Route path="/profile" exact>
              <Profile />
              <Footer />
            </Route>
            <Route path="/profile/modify">
              <ModifyProfile />
              <Footer />
            </Route>
            <Route>
              <Error />
              <Footer />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
