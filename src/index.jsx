import "./style/main.scss";
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
import EditProfile from "pages/EditProfile";
import SuccessOrder from "pages/SuccessOrder";
import Error from "pages/Error";
import Footer from "components/Footer";
import SessionContextProvider from "context/SessionContext";
import AlertTemplate from "react-alert-template-basic";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const App = () => {

  if(!localStorage.getItem("human.__cart")){
    localStorage.setItem("human.__cart", JSON.stringify([]));
  }

  const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
        <SessionContextProvider>
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
                <Route path="/cart" exact>
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
                <Route path="/profile/edit">
                  <EditProfile />
                  <Footer />
                </Route>
                <Route path="/cart/success">
                  <SuccessOrder />
                  <Footer />
                </Route>
                <Route>
                  <Error />
                  <Footer />
                </Route>
              </Switch>
            </main>
          </Router>
        </SessionContextProvider>
      </AlertProvider>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
