import React, { useEffect, useState } from "react";
import "./List.css";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [itemid, setItemid] = useState("");
  const [itemName, setItemName] = useState("");
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      console.log(response.data);
    } else {
      toast.error("Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  const deleteHandler = async (itemid) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: itemid,
    });
    if (response.data.success) {
      await fetchList();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="list">
      <p className="list-head">All Food Items</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <>
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹ {item.price}</p>
                <p
                  onClick={() => {
                    setItemid(item._id);
                    setConfirmPopup(true);
                    setItemName(item.name);
                  }}
                  className="remove"
                  on
                >
                  X
                </p>
              </div>
            </>
          );
        })}
      </div>
      {confirmPopup ? (
        <div className="confirm-popup">
          <div className="confirm-popup-title">
            <p>
              Do you really want do delete <br />{" "}
              <p className="item-name">{itemName} ?</p>
            </p>
          </div>
          <div className="confirm-popup-btn">
            <button
              onClick={() => {
                deleteHandler(itemid);
                setConfirmPopup(false);
              }}
              className="delete"
            >
              DELETE
            </button>
            <button
              onClick={() => {
                setConfirmPopup(false);
              }}
              className="cancel"
            >
              CANCEL
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default List;
