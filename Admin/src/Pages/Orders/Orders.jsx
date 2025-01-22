import React from "react";
import "./Orders.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [adminOrders, setAdminOrders] = useState([]);
  const getOrders = async () => {
    const response = await axios.post(`${url}/api/order/adminOrders`, {});
    if (response.data.success) {
      setAdminOrders(response.data.data.reverse());
    }
  };
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await getOrders();
    }
  };
  useEffect(() => {
    getOrders();
  });
  return (
    <div className="admin-orders">
      <div className="my-orders">
        <h2>Orders</h2>
        {adminOrders.map((order, index) => (
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
            <select
              name="order-status"
              id="order-status"
              onChange={(event) => {
                statusHandler(event, order._id);
              }}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <p id="address">
              <b>Address:</b>
              <div>
                FirstName: <b>{order.address.firstName}</b>
              </div>
              <div>
                LastName: <b>{order.address.lastName}</b>
              </div>
              <div>
                Mail: <b>{order.address.email}</b>
              </div>
              <div>
                Phone: <b>{order.address.phone}</b>
              </div>
              <div>
                Street: <b>{order.address.street}</b>
              </div>
              <div>
                City: <b>{order.address.city}</b>
              </div>
              <div>
                State: <b>{order.address.state}</b>
              </div>
              <div>
                Country: <b>{order.address.country}</b>
              </div>
              <div>
                ZipCode: <b>{order.address.zipcode}</b>
              </div>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
