import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <div className="header" id="header">
        <div className="header-content">
          <h2>Order your favorite food here.</h2>
          <p>
            Choose from diverse menu featuring delectable array of dishes
            crafted with finest ingredients and satisfy your cravings and
            elevate your dining experience, one delicious meal at a time.
          </p>
          <button>View menu</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
