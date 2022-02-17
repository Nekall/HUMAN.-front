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
import Error from "pages/Error";

const App = () => {

  return (
    <div>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/product/:slug">
              <Product />
            </Route>
            <Route path="/concept">
              <Concept />
            </Route>
            <Route path="/products">
              <Shop />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
