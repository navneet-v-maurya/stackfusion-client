import React from "react";
import "./Error.css";

function Error({ error }) {
  return (
    <div className="error">
      <div>
        <span>{error}</span>
      </div>
      <div></div>
    </div>
  );
}

export default Error;
