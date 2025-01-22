import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../../public/Context/StoreContext";
import { toast, Bounce } from "react-toastify";
const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("order");
  const navigate = useNavigate();
  useEffect(() => {
    const verifyOrder = async () => {
      const response = await axios.post(`${url}/api/order/verify`, {
        success: success,
        orderId: orderId,
      });
      if (response.data.success) {
        navigate("/myorders");
        toast.success("Order created Successfully", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        navigate("/");
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    };
    verifyOrder();
  }, [success, orderId, url, navigate]);
  return <div></div>;
};

export default Verify;
