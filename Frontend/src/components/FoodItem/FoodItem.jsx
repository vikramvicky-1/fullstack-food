import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../../public/Context/StoreContext";

const FoodItem = ({ id, name, price, image, description }) => {
  const { cartitems, addToCart, removeFromCart } = useContext(StoreContext);

  // If cartitems or id is not yet available, render fallback UI
  if (!cartitems || id === undefined) {
    return <div className="food-item-placeholder">Loading...</div>;
  }

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img src={image} alt={name} className="food-item-image" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹ {price}</p>
      </div>
      {!cartitems[id] ? (
        <img
          onClick={() => addToCart(id)}
          className="add"
          src={assets.add_icon_green}
          alt="Add"
        />
      ) : (
        <div className="food-item-counter">
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_green}
            alt="Add More"
          />
          <p>{cartitems[id]}</p>
          <img
            onClick={() => removeFromCart(id)}
            src={assets.remove_icon_red}
            alt="Remove"
          />
        </div>
      )}
    </div>
  );
};

export default FoodItem;
