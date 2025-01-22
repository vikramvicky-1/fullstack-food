import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div>
      <div className="loader-2"></div>
    </div>
  );
};
const LoaderBtn = () => {
  return (
    <div>
      <div className="loader-wrap">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export { Loader, LoaderBtn };
