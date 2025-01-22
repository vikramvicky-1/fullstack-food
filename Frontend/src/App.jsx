import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyFooter from "./components/MyFooter/MyFooter";
import MobileApp from "./components/MobileApp/MobileApp";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { LoaderBtn } from "./components/Loader/Loader";
import { StoreContext } from "../public/Context/StoreContext";

const App = () => {
  const [showlogin, setShowlogin] = useState(false);
  const { isAddingToCart } = useContext(StoreContext);
  const appStyle = {
    position: "relative",
  };
  return (
    <>
      <div style={appStyle}>
        {showlogin && <LoginPopup setShowlogin={setShowlogin} />}
        {isAddingToCart ? <LoaderBtn /> : ""}
        <div className="app">
          <Navbar setShowlogin={setShowlogin}></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </div>
        <MobileApp />
        <Footer />
        <MyFooter />
      </div>
    </>
  );
};

export default App;
