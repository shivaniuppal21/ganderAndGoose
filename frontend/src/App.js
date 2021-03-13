import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import AddProduct from './components/add-product';
import Cart from './components/cart';
import Login from './components/login';
import ProductsList from './components/products-list';
import SignUp from "./components/signup";

import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null,
      cart: {},
      products: []
    };
    //this.state = { apiResponse: "" };
    this.routerRef = React.createRef();
  }
  /*callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}*/
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
        <div className="App">
          <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 ">GanderAndGoose</b>
              <label
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
              <div className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    { Object.keys(this.state.cart).length }
                  </span>
                </Link>
                {!this.state.user ? (
                  <>
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                    <Link to="/register" className="navbar-item">
                    SignUp
                  </Link>
                  </>
                  
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>
                )}
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={ProductsList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductsList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}

