import React, { useRef, useState } from "react";

const CoursePanelEdit = ({ item, index, lesson, setLesson }) => {
    const [panel, setPanel] = useState(false);
    const [panelInput, setPanelInput] = useState(false);

    return (
        <div className="CoursePanel_wrap">
            <div
                onClick={() => {
                    setPanel(!panel);
                }}
                className="CoursePanel_container"
            >
                <div className="CoursePanel_head">
                    <i
                        style={{
                            marginRight: "1rem",
                            fontSize: "1.5rem",
                            color: "#F3744F",
                        }}
                        className={
                            !panel ? "fa-solid fa-plus" : "fa-solid fa-minus"
                        }
                    ></i>
                    {index + 1}.{item?.lessonTitle}
                </div>
                <div className="CoursePanel_body">
                    {item?.numLesson?.length} bài học
                </div>
            </div>
            {panel && (
                <div className="panelCard_container">
                    <div className="panelCard_create_container">
                        <div
                            onClick={() => {
                                setPanelInput(!panelInput);
                            }}
                            title="Add more"
                            className="plus_panel"
                        >
                            +
                        </div>
                    </div>
                </div>
            )}
            {panel &&
                lesson[index] &&
                lesson[index]?.numLesson?.map((item, ind) => (
                    <div
                        key={ind + "PanelCourseLesson"}
                        className="panelCard_container"
                    >
                        <div>
                            {" "}
                            <i
                                style={{
                                    color: "#F05123",
                                    marginRight: "0.5rem",
                                }}
                                className="fa-solid fa-circle-play"
                            ></i>
                            {ind + 1}. {item?.title}
                        </div>
                        <div>11:35</div>
                    </div>
                ))}
        </div>
    );
};

export default CoursePanelEdit;
