import React from "react";
import CartItem from "./cartItem";
import './cart.css';

export default function Cart(props) {
  const cart = props.cart;
  let total = 0 ; 
  Object.keys(cart).map(item=>{
    total += cart[item].product.price * cart[item].amount;
  })
  const cartKeys = Object.keys(cart || {});
  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">My Cart</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.removeFromCart}
              />
            ))}
            <div id="displayTotal" className="column is-12 is-clearfix">
              <br/>
              <div>
                <div className="column box" style={{textAlign:"center"}}>
                <span>Item SubTotal:&nbsp;&nbsp;&nbsp; </span><span>${total}</span>
                <br/>
                Shipping:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FREE
                <br/>
                HST:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${Math.ceil(0.13 * total,2)}
                <hr/>
                <div style={{fontWeight: '700',fontSize: '1.25rem'}}>
                Total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CAD ${total + Math.ceil(0.13 * total,2)}
                </div>
                </div>
              </div>
            </div>
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={props.clearCart}
                  className="button is-warning "
                >
                  Clear cart
                </button>{" "}
                <button
                  className="button is-success"
                  onClick={props.checkout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}
      </div>
    </>
  );
};