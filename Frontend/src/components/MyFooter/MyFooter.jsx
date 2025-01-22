import React from "react";
import "./MyFooter.css";
import { assets } from "../../assets/assets";

const MyFooter = () => {
  return (
    <div className="my-footer" id="my-footer">
      <div className="my-footer-top">
        <p>
          Developed by Vikram @ {""}
          <a href="http://www.vickycodehub.site/" target="_blank">
            www.vickycodehub.site
          </a>
        </p>
        <br />
        <p>
          Contact: @{" "}
          <a href="mailto:vikram517879@gmail.com">vikram517879@gmail.com</a>
        </p>
      </div>
      <div className="my-footer-bottom">
        <p>Copy right © | Vikram</p>
      </div>
    </div>
  );
};

export default MyFooter;
