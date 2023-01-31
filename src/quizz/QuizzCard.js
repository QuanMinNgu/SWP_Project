import React from "react";
import "./style.scss";
const QuizzCard = () => {
    return (
        <div className="quizzCard">
            <div className="quizzCard_title">
                <b>Câu 1: </b>
                <span>Tính trạng là gì ?</span>
            </div>
            <div className="quizzCard_answer">
                <div className="quizzCard_answer_items">
                    <input name="lesson" id="1" type="radio" />
                    <label htmlFor="1">
                        A.những biểu hiện của kiểu gen thành kiểu hình
                    </label>
                </div>
                <div className="quizzCard_answer_items">
                    <input name="lesson" id="2" type="radio" />
                    <label htmlFor="2">
                        B.kiểu hình bên ngoài cơ thể sinh vật.
                    </label>
                </div>
                <div className="quizzCard_answer_items">
                    <input name="lesson" id="3" type="radio" />
                    <label htmlFor="3">
                        C. các đặc điểm bên trong cơ thể sinh vật.
                    </label>
                </div>
                <div className="quizzCard_answer_items">
                    <input name="lesson" id="4" type="radio" />
                    <label htmlFor="4">
                        D. những đặc điểm về hình thái, cấu tạo, sinh lý của một
                        cơ thể.
                    </label>
                </div>
            </div>
        </div>
    );
};

export default QuizzCard;
