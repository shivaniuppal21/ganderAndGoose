import React from "react";
export default function CartItem(props) {
    const { cartItem, cartKey,removeFromCart } = props;
    const { product, amount } = cartItem;
    return (
      <div className=" column is-half">
        <div className="box">
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src={product.images && 'http://localhost:3090'+product.images[0]}
                  alt={product.title}
                />
              </figure>
            </div>
            <div className="media-content">
              <b style={{ textTransform: "capitalize" }}>
                {product.title}{" "}
                <span className="tag is-primary">${product.price}</span>
              </b>
              <div>{product.shortdescription}</div>
              <small>{`${amount} in cart`}</small>
            </div>
            <div
              className="media-right"
              onClick={()=>removeFromCart(cartKey)}
            >
              <span className="delete is-large"></span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  