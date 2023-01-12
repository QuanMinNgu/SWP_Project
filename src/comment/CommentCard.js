import React, { useState } from "react";
import ReplyCard from "./ReplyCard";
import ReplyInput from "./ReplyInput";
import "./style.scss";
const CommentCard = () => {
    const [reply, setReply] = useState(false);

    return (
        <div className="commentCard">
            <div className="commentCard_img">
                <img
                    src="https://res.cloudinary.com/sttruyen/image/upload/v1670845412/Sttruyenxyz/tsmietvqzskvkakoe4fk.jpg"
                    alt="Ảnh"
                />
            </div>
            <div className="commentCard_body">
                <div className="commentCard_infor">
                    <div className="commentCard_infor_title">Minh Quang</div>
                    <div className="commentCard_infor_content">
                        Minh Quang Ngu đã bình luận bài viết này Minh Quang Ngu
                        đã bình luận bài viết này Minh Quang Ngu đã bình luận
                        bài viết này Minh Quang Ngu đã bình luận bài viết này
                    </div>
                </div>
                <div className="commentCard_navbar">
                    <div className="commentCard_navbar_items">0 Thích</div>
                    <div
                        onClick={() => {
                            setReply(!reply);
                        }}
                        className="commentCard_navbar_items"
                    >
                        Trả lời
                    </div>
                    <div className="commentCard_navbar_items">
                        <i>12 phút trước</i>
                    </div>
                </div>
                {reply && (
                    <div className="commentCard_replyInput">
                        <ReplyInput name="Quang Khon" />
                    </div>
                )}
                <div className="commentCard_reply">
                    <ReplyCard />
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
