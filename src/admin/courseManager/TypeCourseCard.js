import React, { useRef, useState } from "react";

const TypeCourseCard = () => {
    const handleDeleteType = () => {
        const check = window.confirm("Do you wanna delete this type?");
    };

    const [edit, setEdit] = useState(false);

    const titleRef = useRef();
    const handleUpdateNewType = () => {};
    return (
        <div className="expertCourse_type_remain_card">
            Software
            <div className="expertCourse_type_remain_card_abs">
                <button
                    onClick={() => {
                        setEdit(true);
                    }}
                    style={{ height: "3rem" }}
                    className="button button_update"
                >
                    Edit
                </button>
                <button
                    onClick={handleDeleteType}
                    style={{ height: "3rem" }}
                    className="button button_delete"
                >
                    Delete
                </button>
            </div>
            {edit && (
                <div className="edit_type_course">
                    <div className="edit_type_course_form">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setEdit(false);
                                }}
                                style={{ color: "black" }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <textarea
                            ref={titleRef}
                            className="textArea_type"
                            type="text"
                            placeholder="Enter title of type"
                        />
                        <div className="button_type_container">
                            <button
                                onClick={handleUpdateNewType}
                                style={{ height: "4rem" }}
                                className="button"
                            >
                                Update This Type
                            </button>
                            <button
                                onClick={() => {
                                    setEdit(false);
                                }}
                                style={{ height: "4rem", marginLeft: "0.5rem" }}
                                className="button button_cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypeCourseCard;
