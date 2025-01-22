import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../../public/Context/StoreContext";
import { toast, ToastContainer, Bounce } from "react-toastify";
const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("home");
  const [showLogout, setShowLogout] = useState(false);
  const { cartQty, token, setToken, setCartQty, userName } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const handleProfileClick = () => {
    setShowLogout((prevState) => !prevState);
  };

  const handleLogout = () => {
    setToken("");
    setCartQty(0);
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
    toast.success("Logged out Successfully", {
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
  };

  return (
    <>
      <div className="navbar nav-flex">
        <Link to={"/"}>
          <img src={assets.logo} alt="" />
        </Link>
        <ul className="nav-menu nav-flex">
          <Link
            to={"/"}
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#mobile-app"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact us
          </a>
        </ul>
        <div className="nav-right nav-flex">
          <img src={assets.search_icon} alt="" />
          <div className="nav-search nav-flex">
            <Link to={"/cart"}>
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={cartQty > 0 ? "dot" : ""}>
              <p>{cartQty > 0 ? cartQty : ""}</p>
            </div>
          </div>

          {!token ? (
            <button
              onClick={() => {
                setShowlogin(true);
              }}
            >
              Sign in
            </button>
          ) : (
            <>
              <div className="nav-profile">
                <img
                  onClick={handleProfileClick}
                  src={assets.profile_icon}
                  alt="Profile"
                />
              </div>
              {showLogout && (
                <div className="nav-profile-list">
                  <p className="username">Hi! {userName}</p>
                  <Link to={"/myorders"}>
                    <div
                      onClick={() => {
                        setShowLogout(false);
                      }}
                      className="orders nav-flex"
                    >
                      <img src={assets.bag_icon} alt="My Orders" />
                      <p>My Orders</p>
                    </div>
                  </Link>
                  <div
                    className="logout nav-flex"
                    onClick={handleLogout} // Logout handler
                  >
                    <img src={assets.logout_icon} alt="Logout" />
                    <p>Logout</p>
                  </div>
                  <img
                    className="profile-cross-icon"
                    src={assets.cross_icon}
                    alt="Close"
                    onClick={() => setShowLogout(false)} // Close logout menu
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
