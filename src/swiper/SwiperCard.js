import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
const SwiperCard = () => {
    return (
        <Link to="/">
            <div className="swiper_card">
                <img
                    src="https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg"
                    alt="Ảnh"
                />
            </div>
        </Link>
    );
};

export default SwiperCard;
