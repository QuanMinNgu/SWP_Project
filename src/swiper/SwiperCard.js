import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
const SwiperCard = ({ item }) => {
  return (
    <Link to="/">
      <div className="swiper_card">
        <img src={item?.image} alt="Ảnh" />
      </div>
    </Link>
  );
};

export default SwiperCard;
