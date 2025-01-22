import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../../public/Context/StoreContext";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";
const LoginPopup = ({ setShowlogin }) => {
  const [currentstate, SetCurrentstate] = useState("login");
  const { url, setToken, loadCartData } = useContext(StoreContext);
  const [passwordIcon, setPasswordIcon] = useState(faEyeSlash);
  const [passwordType, setPasswordType] = useState("password");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    // Convert email to lowercase
    if (name === "email") {
      value = value.toLowerCase();
    }

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentstate == "login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/signup";
    }
    try {
      setIsLoggingIn(true);
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        if (currentstate == "login") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowlogin(false);
          loadCartData(response.data.token);
          toast.success("Login Successful", {
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
          toast.success("Account Created, Please login", {
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

          // Navigate to home page
          setShowlogin(false); // Close popup
          navigate("/"); // Redirect to home
        }
      } else {
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  };
  const passwordHandler = () => {
    if (passwordIcon == faEyeSlash) {
      setPasswordIcon(faEye);
      setPasswordType("text");
    } else {
      setPasswordIcon(faEyeSlash);
      setPasswordType("password");
    }
  };
  return (
    <>
      <div className="login-popup">
        <form className="login-popup-container" onSubmit={onLogin}>
          <div className="login-popup-title">
            <h2>{currentstate === "login" ? "Login" : "Sign up"}</h2>
            <img
              onClick={() => {
                setShowlogin(false);
              }}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-input">
            {currentstate === "login" ? (
              <></>
            ) : (
              <input
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                type="text"
                placeholder="user name"
                required
              />
            )}
            <input
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              type="text"
              placeholder="enter your email"
              required
            />
            <div className="password-container">
              <input
                name="password"
                value={data.password}
                onChange={onChangeHandler}
                type={passwordType}
                placeholder="password"
                required
              />
              <FontAwesomeIcon
                className="password-icon"
                onClick={passwordHandler}
                icon={passwordIcon}
              />
            </div>
          </div>
          <button type="submit" className="login-btn" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <Loader />
            ) : currentstate === "login" ? (
              "Login"
            ) : (
              "Sign up"
            )}
          </button>
          <div className="login-popup-checkbox">
            <p>
              {" "}
              <input type="checkbox" required />
              {""} By continuing, i agree to the terms of use & privacy policy.
            </p>
          </div>
          <div className="login-popup-change-state">
            {currentstate === "login" ? (
              <p>
                Dont't have an account? {""}{" "}
                <span
                  onClick={() => {
                    SetCurrentstate("signup");
                  }}
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Already have an account? {""}{" "}
                <span
                  onClick={() => {
                    SetCurrentstate("login");
                  }}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
