import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
const CourseLearnCardD = ({ check }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => {
                navigate(`?lesson=2`);
            }}
            className={`CourseLearnCardDetail ${check ? "active" : ""}`}
        >
            <div className="CourseLearnCardDetail_head">
                <div>1. Bạn sẽ làm được gì sau khóa học ?</div>
                <div className="CourseLearnCardDetail_icons">
                    <i className="fa-solid fa-circle-play"></i>
                </div>
            </div>
            {check ? (
                <div className="CourseLearnCardDetail_body">
                    <i className="fa-solid fa-check"></i>
                </div>
            ) : (
                <div
                    style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                    className="CourseLearnCardDetail_body"
                >
                    <i className="fa-solid fa-lock"></i>
                </div>
            )}
        </div>
    );
};

export default CourseLearnCardD;
