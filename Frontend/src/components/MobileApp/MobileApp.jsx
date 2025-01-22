import React from "react";
import "./MobileApp.css";
import { assets } from "../../assets/assets";
const MobileApp = () => {
  return (
    <div className="mobile-app" id="mobile-app">
      <div className="mobile-app-content">
        <h2>
          For better Experience download <br />
          <span>Tomato.</span> App
        </h2>
      </div>
      <div className="mobile-app-image">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default MobileApp;
