import React from "react";

const Card = ({ card_img, card_number, card_title, card_description }) => {
  return (
    <div className="card_main">
      <img
        src={card_img}
        alt=""
        className="rounded-3"
        style={{ height: "121px", width: "123px" }}
      />
      <div className="card_detail">
        <div className="card_number">{card_number}</div>
        <div className="card_detail_text">
          <h1 className="card_title">{card_title}</h1>
          <p className="card_description">{card_description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
