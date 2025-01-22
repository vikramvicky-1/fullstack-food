import React, { useContext, useEffect } from "react";
import "./FoodList.css";
import { StoreContext } from "../../../public/Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodList = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                name={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
                description={item.description}
                category={item.category}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodList;
