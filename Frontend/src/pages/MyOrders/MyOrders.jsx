import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Cart/Cart.css";
import "./MyOrders.css";
import { StoreContext } from "../../../public/Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [myOrders, setMyOrders] = useState([]);
  const getMyOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userOrders`,
        {},
        {
          headers: { token },
        }
      );

      setMyOrders(response.data.data.reverse() || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    getMyOrders();
  }, [url, token]);

  return (
    <div>
      {myOrders.length === 0 ? (
        <div className="cart-empty">
          <h2>Your Orders are empty, order your favorite food here</h2>
          <Link to="/">
            <button>View Menu</button>
          </Link>
        </div>
      ) : (
        <div className="my-orders">
          <h2>My Orders</h2>
          {myOrders.map((order, index) => (
            <div className="my-order-container" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p id="item-name">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} X ${item.quantity}`;
                  } else {
                    return `${item.name} X ${item.quantity}, `;
                  }
                })}
              </p>
              <p>Items: {order.items.length}</p>
              <p>₹{order.amount}</p>
              <p
                id={
                  order.status == "Food Processing"
                    ? "processing"
                    : order.status == "Out for Delivery"
                    ? "out-for-delivery"
                    : "delivered"
                }
              >
                <span>&#x2022;</span>
                {order.status}
              </p>
              <button onClick={getMyOrders}>Track Order</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
