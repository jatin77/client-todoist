import React from "react";
import "./style.scss";

const CoffeeLoader = () => {
  return (
    <>
      <input
        className="radio-extra-small"
        type="radio"
        name="size"
        id="extra-small"
        checked="checked"
        onChange={(e) => console.log(e.target.value)}
      />

      <div className="cup">
        <div className="wave">
          <svg viewBox="0 0 500 500">
            <path
              className="wave__path"
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            ></path>
          </svg>
        </div>
        <img
          className="cup-image"
          src="https://trello-attachments.s3.amazonaws.com/5a03b4a6c22e5d0ae1e5d752/59f49abbc6fcb3b7e4865eab/c4d7fa0303ff5d87ac17442850791116/coffee-cup.png"
          alt="coffee cup"
        />
        <div className="smoke">
          <div className="smoke__item"></div>
          <div className="smoke__item"></div>
          <div className="smoke__item"></div>
        </div>
      </div>
    </>
  );
};

export default CoffeeLoader;
