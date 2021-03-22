import React, { Component,useState } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import AddProduct from './components/add-product';
import Cart from './components/cart';
import Login from './components/login';
import ProductsList from './components/products-list';
import SignUp from "./components/signup";
import ProductDetails from "./components/product-details";
import Context from "./Context";
import "bulma/css/bulma.css";
import {Redirect} from 'react-router';
import{ init } from 'emailjs-com';
import ContactUs from "./components/contact-us";

export default class App extends Component {
  
  constructor(props) {
    super(props);
    init("user_ROJ0kHgzv6Rrq5toZv7og");
    this.state = {
      user: null,
      cart: {},
      products: []
    };
    this.routerRef = React.createRef();
  }
  logout() {
    localStorage.clear();
  }
  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };
  openProductDetails=product => {
    debugger;
    return <Redirect to="/product-details" />
  }
  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };
  
  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };
  
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
                className="navbar-burger burger"
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
                 {this.state.user && this.state.user.isAdmin && (
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
                  <Link to="/" onClick={event=>{localStorage.clear(); this.setState({user:null})}} className="navbar-item">
                    Logout
                  </Link>
                )}
              </div>
              {this.state.user && (
              <span style={{ marginRight: "5px" }}>Hi,{this.state.user.firstName}</span>
            )}
            </nav>
            <Switch>
              <Route exact path="/" render={(props) => <ProductsList {...props}openProductDetails={this.openProductDetails} addToCart={this.addToCart} setProducts={products=>this.setState({ products: products })}/>} />
              <Route exact path="/login" render={(props) => <Login {...props} setUser={user=>this.setState({ user: user })}/>} />
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/contactUs" component={ContactUs} />
              <Route exact path="/cart" render={(props) => <Cart {...props} cart={this.state.cart} removeFromCart={this.removeFromCart} clearCart={this.clearCart}/>}/>
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" render={(props) => <ProductsList {...props} openProductDetails={this.openProductDetails} addToCart={this.addToCart} setProducts={products=>this.setState({ products: products })}/>} />
              <Route exact path="/product-details" render={(props) => <ProductDetails {...props} addToCart={this.addToCart} />}/>
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}

