import React, { useState } from "react";
import CourseLearnCardD from "./CourseLearnCardD";
import "./style.scss";
const CourseLearnCard = () => {
    const [courseCard, setCourseCard] = useState(false);

    return (
        <div>
            <div
                onClick={() => {
                    setCourseCard(!courseCard);
                }}
                className="CourseLearnCard"
            >
                <div className="CourseLearnCard_head">
                    <h3>1.Bắt đầu</h3>
                    <span>2/6 | 10:20</span>
                </div>
                <div className="CourseLearnCard_body">
                    <i
                        className={
                            !courseCard
                                ? "fa-solid fa-angle-down"
                                : "fa-solid fa-angle-up"
                        }
                    ></i>
                </div>
            </div>
            {courseCard && (
                <div>
                    <CourseLearnCardD check={true} />
                    <CourseLearnCardD />
                    <CourseLearnCardD />
                    <CourseLearnCardD />
                    <CourseLearnCardD />
                    <CourseLearnCardD />
                </div>
            )}
        </div>
    );
};

export default CourseLearnCard;
