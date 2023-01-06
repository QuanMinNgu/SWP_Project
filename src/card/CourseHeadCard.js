import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
const CourseHeadCard = () => {
    return (
        <Link style={{ textDecoration: "none" }} to="/">
            <div className="course_head_card">
                <div className="course_head_card_img">
                    <img
                        src="https://nordiccoder.com/app/uploads/2019/07/5-ly-do-ban-nen-hoc-html-css.jpg"
                        alt="ảnh khóa học"
                    />
                </div>
                <div className="course_head_card_detail">
                    <h3>HTML CSS từ Zero đến Hero đến Hero</h3>
                    <p>Bạn chưa học khóa này</p>
                    <h4>Bắt đầu học</h4>
                </div>
            </div>
        </Link>
    );
};

export default CourseHeadCard;
