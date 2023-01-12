import React, { useState } from "react";
import "./style.scss";
import CommentCard from "./CommentCard";
const Comment = () => {
    const [comment, setComment] = useState("");
    return (
        <div className="comment">
            <div className="comment_navbar">
                <div className="comment_navbar_title">
                    <i
                        style={{
                            marginRight: "0.5rem",
                            marginTop: "0.5rem",
                        }}
                        className="fa-solid fa-comment"
                    ></i>
                    <h2>Bình Luận</h2>
                </div>
                <div className="comment_navbar_button">
                    <button>Gửi</button>
                </div>
            </div>
            <div className="comment_input">
                <div
                    onInput={(e) => {
                        setComment(e.target.innerHTML);
                    }}
                    contentEditable="true"
                    className="comment_input_detail"
                ></div>
                <div
                    style={!comment ? { display: "flex" } : { display: "none" }}
                    className="comment_input_detail_abs"
                >
                    Bình luận tại đây
                </div>
            </div>
            <div className="comment_cards">
                <CommentCard />
                <CommentCard />
            </div>
        </div>
    );
};

export default Comment;
