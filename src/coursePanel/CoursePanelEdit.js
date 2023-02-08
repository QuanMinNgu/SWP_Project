import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import UpdateLesson from "../admin/courseManager/update/UpdateLesson";

const CoursePanelEdit = ({
    item,
    index,
    lesson,
    setAddLesson,
    setLesson,
    setUrlArray,
    urlArray,
    urlArrayRef,
}) => {
    const [panel, setPanel] = useState(false);
    const [edit, setEdit] = useState(false);
    const contentRef = useRef();
    const [updateLesson, setUpdateLesson] = useState(false);

    const handleDeletePakage = (e) => {
        const check = window.confirm("Do you really wanna delete this pakage?");
        if (check) {
            const ar = lesson;
            ar.splice(e, 1);
            setLesson([...ar]);
        }
    };

    const handleUpdatePackageContent = () => {
        if (!contentRef.current.value) {
            return toast.error("Please enter input value.");
        }
        const ar = lesson;
        ar[index].lessonTitle = contentRef.current.value;
        setLesson([...ar]);
        setEdit(false);
    };

    const handleDeleteLesson = (e) => {
        const check = window.confirm("Do you really wanna delete this lesson?");
        if (check) {
            const ar = lesson;
            ar[index].numLesson.splice(e, 1);
            setLesson([...ar]);
        }
    };

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
                <div className="CoursePanel_edit_button_wrap">
                    <button
                        onClick={() => setEdit(true)}
                        style={{ height: "3rem", marginRight: "1rem" }}
                        className="button button_update"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            handleDeletePakage(index);
                        }}
                        style={{ height: "3rem" }}
                        className="button button_delete"
                    >
                        Delete
                    </button>
                </div>
                {edit && (
                    <div className="CoursePanel_edit_form_input">
                        <input
                            ref={contentRef}
                            type="text"
                            placeholder="Enter title"
                        />
                        <div>
                            <button
                                onClick={handleUpdatePackageContent}
                                style={{ height: "3.3rem" }}
                                className="button"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => {
                                    setEdit(false);
                                }}
                                style={{ height: "3.3rem", marginLeft: "1rem" }}
                                className="button button_cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {panel && (
                <div className="panelCard_container">
                    <div className="panelCard_create_container">
                        <div
                            onClick={() => {
                                setAddLesson("index-" + index);
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
                                className={
                                    item?.type === "quiz"
                                        ? "fa-solid fa-circle-question"
                                        : item?.type === "listening"
                                        ? "fa-solid fa-circle-play"
                                        : "fa-solid fa-book"
                                }
                            ></i>
                            {ind + 1}. {item?.title}
                        </div>
                        <div>
                            {item?.type === "quiz"
                                ? item?.value?.length
                                : item?.type === "listening"
                                ? `${
                                      Math.floor(item?.time / 60) < 10
                                          ? "0"
                                          : ""
                                  }${Math.floor(item?.time / 60)} : ${
                                      Math.floor(item?.time) -
                                          Math.floor(item?.time / 60) * 60 <
                                      10
                                          ? "0"
                                          : ""
                                  }${
                                      Math.floor(item?.time) -
                                      Math.floor(item?.time / 60) * 60
                                  }`
                                : "Reading"}
                        </div>
                        <div className="PanelCard_edit_button_wrap">
                            <button
                                onClick={() => {
                                    setUpdateLesson({
                                        item: item,
                                        index: index,
                                        ind: ind,
                                    });
                                }}
                                style={{ height: "3rem", marginRight: "1rem" }}
                                className="button button_update"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteLesson(ind)}
                                style={{ height: "3rem" }}
                                className="button button_delete"
                            >
                                Delete
                            </button>
                        </div>
                        {updateLesson && (
                            <UpdateLesson
                                setUpdateLesson={setUpdateLesson}
                                item={updateLesson}
                                setLesson={setLesson}
                                lesson={lesson}
                                setUrlArray={setUrlArray}
                                urlArray={urlArray}
                                urlArrayRef={urlArrayRef}
                            />
                        )}
                    </div>
                ))}
        </div>
    );
};

export default CoursePanelEdit;
