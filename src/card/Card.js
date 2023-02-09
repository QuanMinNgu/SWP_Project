import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
const Card = () => {
    const [reduce, setReduce] = useState(true);
    return (
        <div className="card">
            <div className="card_img">
                <Link to="/">
                    <img
                        className="card_img_detail"
                        src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                        alt="Ảnh course"
                    />
                </Link>
                <div className="card_img_abs">
                    <Link style={{ textDecoration: "none" }} to="/course/asd">
                        <div className="card_img_abs_wrap">
                            <button>View the course</button>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="card_detail">
                <Link
                    className="card_detail_title"
                    style={{ textDecoration: "none" }}
                    to="/course/asds"
                >
                    <div>Lập Trình JavaScript Nâng Cao Nâng C o Nâng C</div>
                </Link>
                <div className="card_detail_wp">
                    {reduce ? (
                        <div className="card_detail_w">
                            <span className="card_detail_w_a">1.299.000đ</span>
                            <span className="card_detail_w_r">1.299.000đ</span>
                        </div>
                    ) : (
                        <div className="card_detail_w">
                            <span>1.200.000đ</span>
                        </div>
                    )}
                    <div className="card_detail_p">
                        <i
                            style={{ marginRight: "0.5rem" }}
                            className="fa-solid fa-users"
                        ></i>
                        <span>120</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
