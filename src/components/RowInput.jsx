import React from "react";
import "../App.css";

function RowInput({ numRows = 1 }) {
  return (
    <>
      {Array.from({ length: numRows }).map((_, idx) => (
        <view className="InputRow" key={idx}>
          <view className="TimeInput">
            <input className="InputBox" placeholder="00:00" />
            <text>:</text>
            <input className="InputBox" placeholder="00:00" />
          </view>
          <input
            className="InputBox InputBoxLarge"
            placeholder="Description ..."
          />
        </view>
      ))}
    </>
  );
}

export default RowInput;
