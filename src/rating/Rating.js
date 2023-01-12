import React, { useState } from "react";
import RatingCard from "./RatingCard";
import "./style.scss";
const Rating = () => {
    const [star, setStar] = useState(null);
    const [hover, setHover] = useState(null);

    const [comment, setComment] = useState("");

    const starArr = Array(5).fill(0);
    return (
        <div className="detail_body_infor_content_2">
            <div className="detail_body_infor_content_title">
                <div>
                    <div>
                        <i
                            style={{
                                marginRight: "0.5rem",
                                marginTop: "0.5rem",
                            }}
                            className="fa-solid fa-comment"
                        ></i>
                        <h2>Đánh Giá</h2>
                    </div>
                    <div>
                        {starArr.map((_, index) => (
                            <i
                                onMouseOver={() => {
                                    setHover(index + 1);
                                }}
                                onMouseLeave={() => {
                                    setHover(null);
                                }}
                                onClick={() => {
                                    setStar(index + 1);
                                }}
                                key={index + "star"}
                                className={
                                    hover
                                        ? hover > index
                                            ? "fa-solid fa-star"
                                            : "fa-regular fa-star"
                                        : star > index
                                        ? "fa-solid fa-star"
                                        : "fa-regular fa-star"
                                }
                            ></i>
                        ))}
                    </div>
                </div>
                <div>
                    <button>Gửi</button>
                </div>
            </div>
            <div className="detail_body_infor_content_input_wrap">
                <div
                    onInput={(e) => {
                        setComment(e.target.innerHTML);
                    }}
                    contentEditable="true"
                    className="detail_body_infor_content_input"
                ></div>
                <div
                    style={!comment ? { display: "flex" } : { display: "none" }}
                    className="detail_body_infor_content_input_abs"
                >
                    Bình luận tại đây
                </div>
            </div>
            <div className="detail_body_infor_content_rating">
                <RatingCard />
                <RatingCard />
            </div>
        </div>
    );
};

export default Rating;
