import React, { useState } from "react";
import "./style.scss";
const ReplyInput = ({ name }) => {
    const [content, setContent] = useState("");

    return (
        <div className="replyInput">
            <div
                onInput={(e) => {
                    setContent(e.target.innerHTML);
                }}
                contentEditable="true"
                className="replyInput_input"
            ></div>
            <div className="replyInput_button">
                <button>Gửi</button>
            </div>
            {!content && (
                <div className="replyInput_abs">
                    Trả lời bình luận của {name}
                </div>
            )}
        </div>
    );
};

export default ReplyInput;
