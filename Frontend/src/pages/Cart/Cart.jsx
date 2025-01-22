import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../../public/Context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cartitems, removeFromCart, calculateSubtotal, cartQty } =
    useContext(StoreContext);
  const subtotal = calculateSubtotal();
  const deliveryFee = 45.0;
  const total = subtotal + deliveryFee;
  const navigate = useNavigate();
  return (
    <>
      {cartQty > 0 ? (
        <div className="cart">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Item</p>
              <p>Name</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item) => {
              if (cartitems[item._id]) {
                return (
                  <React.Fragment key={item._id}>
                    <div className="cart-items-title cart-items-item">
                      <img src={item.image} alt="" />
                      <p>{item.name}</p>
                      <p>₹ {item.price}</p>
                      <p>{cartitems[item._id]}</p>
                      <p>₹ {cartitems[item._id] * item.price}</p>
                      <p
                        onClick={() => {
                          removeFromCart(item._id);
                        }}
                        className="cross"
                      >
                        X
                      </p>
                    </div>
                    <hr id="hr" />
                  </React.Fragment>
                );
              }
              return null;
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Sub Total</p>
                  <p>₹ {subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹ {deliveryFee}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>₹ {total.toFixed(2)}</b>
                </div>
              </div>
              <div className="cart-promocode">
                <div>
                  <p>If you have a promo code, Enter it here</p>
                  <div className="cart-promocode-input">
                    <input type="text" placeholder="Promo Code" />
                    <button className="submit-btn">Submit</button>
                  </div>
                </div>
                <button
                  className="checkout-btn"
                  onClick={() => navigate("/order")}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <h2>Your cart is empty, order your favorite food here</h2>
          <Link to="/">
            <button>View menu</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
