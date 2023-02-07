import React, { useRef, useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import CoursePanelEdit from "../../coursePanel/CoursePanelEdit";
import "../style.scss";
import Listening from "./type/Listening";
import Quiz from "./type/Quiz";
import Reading from "./type/Reading";
import Select from "react-select";
const CreateCourse = () => {
    const titleRef = useRef();
    const contentRef = useRef();
    const benefitRef = useRef();
    const [benefit, setBenefit] = useState([]);
    const [courseExpert, setCourseExpert] = useState("");
    const [expert, setExpert] = useState(false);
    const [image, setImage] = useState("");
    const [inputForm, setInputForm] = useState(false);
    const [lesson, setLesson] = useState([]);
    const imageRef = useRef();
    const lessonRef = useRef();
    const [addLesson, setAddLesson] = useState(false);

    const [type, setType] = useState("listening");

    const handleCreateBenefit = () => {
        if (!benefitRef.current.value) {
            return toast.error("Please, enter information.");
        }
        setBenefit([...benefit, benefitRef.current?.value]);
        benefitRef.current.value = "";
    };

    const handleChooseExpert = () => {
        const check = window.confirm(
            "Bạn có muốn chọn Minh Quang thành course expert của khóa học này không?"
        );
        setCourseExpert({
            name: "Quang Minh",
        });
        setExpert(false);
    };

    const handleCreateLesson = () => {
        setLesson([
            ...lesson,
            {
                lessonTitle: lessonRef.current.value,
                numLesson: [],
            },
        ]);
        lessonRef.current.value = "";
    };

    const handleEditList = (e) => {};
    const handleDeleteList = (e) => {
        benefit.splice(e, 1);
        setBenefit([...benefit]);
    };
    const optionsKind = [
        { value: "ha-noi", label: "Software" },
        { value: "strawberry", label: "Financial" },
        { value: "vanilla", label: "Marketing" },
    ];

    const onDrop = useCallback((acceptedFiles) => {
        const url = URL.createObjectURL(acceptedFiles[0]);
        if (image) {
            URL.revokeObjectURL(image);
        }
        imageRef.current = acceptedFiles[0];
        setImage(url);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="managerCourse">
            <div className="row">
                <div className="col c-12 m-8 l-8">
                    <div className="course_detail_name">
                        <h3 ref={titleRef} contentEditable={true}>
                            Title of Course (can edit)
                        </h3>
                    </div>
                    <div className="course_detail_content">
                        <p ref={contentRef} contentEditable={true}>
                            Content of course (can edit)
                        </p>
                    </div>
                    <div className="course_detail_learn">
                        <h3>The benefits of this course:</h3>
                        <div className="create_course_input">
                            <input
                                ref={benefitRef}
                                type="text"
                                placeholder="Enter benefit"
                            />
                            <button onClick={handleCreateBenefit}>Send</button>
                        </div>
                    </div>
                    <ul className="course_detail_learn_items">
                        {benefit?.length === 0 ? (
                            <li className="benefitList">
                                Example of benefit of this course
                            </li>
                        ) : (
                            benefit?.map((item, index) => (
                                <li
                                    className="benefitList"
                                    key={item + "benefit"}
                                >
                                    {item}
                                    <div className="benefit_button">
                                        <button
                                            onClick={() =>
                                                handleEditList(index)
                                            }
                                            className="edit_button"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteList(index)
                                            }
                                            className="delete_button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="course_detail_learn">
                        <h3>Content of this course</h3>
                    </div>
                    <div className="course_detail_timeLine">
                        <ul>
                            <li>
                                <b contentEditable={true}>? (can edit)</b>{" "}
                                chương
                            </li>
                            <li>.</li>
                            <li>
                                <b contentEditable={true}>? (can edit)</b> bài
                                học
                            </li>
                            <li>.</li>
                            <li>
                                Thời lượng{" "}
                                <b contentEditable={true}>? (can edit)</b>
                            </li>
                        </ul>
                    </div>
                    <div className="CoursePanel">
                        {lesson?.map((item, index) => (
                            <CoursePanelEdit
                                setAddLesson={setAddLesson}
                                lesson={lesson}
                                key={index + "coursePanel"}
                                item={item}
                                index={index}
                            />
                        ))}
                        {inputForm && (
                            <div className="CoursePanel_wrap">
                                <div className="CoursePanel_create_input">
                                    <input
                                        ref={lessonRef}
                                        type="text"
                                        placeholder="Enter title"
                                    />
                                    <button onClick={handleCreateLesson}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="CoursePanel_wrap">
                            <div className="CoursePanel_create_container">
                                <div
                                    onClick={() => {
                                        setInputForm(!inputForm);
                                    }}
                                    title="Add more"
                                    className="plus"
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col c-12 m-4 l-4">
                    <div className="course_create_detail_img">
                        <div className="movie_drop_zone">
                            <div
                                className="movie_drop_zone_wrap"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <i className="fa-regular fa-image"></i>
                                <div className="image_create_container">
                                    <img src={image} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="course_detail_price" contentEditable={true}>
                        Enter Price
                    </div>
                    <div className="course_detail_button">
                        <button
                            title="Save this course"
                            className="save_button"
                        >
                            Save
                        </button>
                    </div>
                    <div className="type_select">
                        <Select
                            className="search_wrap_select"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={optionsKind}
                            placeholder="Kind"
                        />
                    </div>
                    <ul className="course_detail_list">
                        <li>
                            <i>
                                Course Expert:
                                {courseExpert ? (
                                    <span
                                        onClick={() => {
                                            setExpert(true);
                                        }}
                                        className="choose_expert"
                                    >
                                        {courseExpert?.name}
                                    </span>
                                ) : (
                                    <span
                                        onClick={() => {
                                            setExpert(true);
                                        }}
                                        className="choose_expert"
                                    >
                                        Choose
                                    </span>
                                )}
                            </i>
                        </li>
                        <li>
                            <i>Tự tin khi học tập</i>
                        </li>
                    </ul>
                </div>
            </div>
            {expert && (
                <div className="expertCourse">
                    <div className="expertCourse_container">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setExpert(false);
                                }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <div className="expertCourse_searching">
                            <input
                                type="text"
                                placeholder="Searching by id, name or email"
                            />
                            <button className="button">Search</button>
                        </div>
                        <div className="expertCourse_form">
                            <table className="ex_table">
                                <thead className="ex_thead">
                                    <tr className="ex_thead_wrap">
                                        <th className="ex_thead_title">User</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="ex_thead_wrap_items">
                                        <th className="ex_thead_title">
                                            <div className="ex_thead_user">
                                                <div className="ex_thead_user_img">
                                                    <img
                                                        src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                        alt="Ảnh"
                                                    />
                                                </div>
                                                <div className="ex_thead_user_infor">
                                                    <div className="ex_thead_user_infor_name">
                                                        Minh Quang
                                                    </div>
                                                    <i className="ex_thead_user_infor_email">
                                                        quangminhnguyen265@gmail.com
                                                    </i>
                                                    <i className="ex_thead_user_infor_id">
                                                        ID:1231232
                                                    </i>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="ex_thead_button">
                                            <button>Choose</button>
                                        </th>
                                    </tr>
                                    <tr className="ex_thead_wrap_items">
                                        <th className="ex_thead_title">
                                            <div className="ex_thead_user">
                                                <div className="ex_thead_user_img">
                                                    <img
                                                        src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                        alt="Ảnh"
                                                    />
                                                </div>
                                                <div className="ex_thead_user_infor">
                                                    <div className="ex_thead_user_infor_name">
                                                        Minh Quang
                                                    </div>
                                                    <i className="ex_thead_user_infor_email">
                                                        quangminhnguyen265@gmail.com
                                                    </i>
                                                    <i className="ex_thead_user_infor_id">
                                                        ID:1231232
                                                    </i>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="ex_thead_button">
                                            <button
                                                onClick={handleChooseExpert}
                                            >
                                                Choose
                                            </button>
                                        </th>
                                    </tr>
                                    <tr className="ex_thead_wrap_items">
                                        <th className="ex_thead_title">
                                            <div className="ex_thead_user">
                                                <div className="ex_thead_user_img">
                                                    <img
                                                        src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                        alt="Ảnh"
                                                    />
                                                </div>
                                                <div className="ex_thead_user_infor">
                                                    <div className="ex_thead_user_infor_name">
                                                        Minh Quang
                                                    </div>
                                                    <i className="ex_thead_user_infor_email">
                                                        quangminhnguyen265@gmail.com
                                                    </i>
                                                    <i className="ex_thead_user_infor_id">
                                                        ID:1231232
                                                    </i>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="ex_thead_button">
                                            <button>Choose</button>
                                        </th>
                                    </tr>
                                    <tr className="ex_thead_wrap_items">
                                        <th className="ex_thead_title">
                                            <div className="ex_thead_user">
                                                <div className="ex_thead_user_img">
                                                    <img
                                                        src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                        alt="Ảnh"
                                                    />
                                                </div>
                                                <div className="ex_thead_user_infor">
                                                    <div className="ex_thead_user_infor_name">
                                                        Minh Quang
                                                    </div>
                                                    <i className="ex_thead_user_infor_email">
                                                        quangminhnguyen265@gmail.com
                                                    </i>
                                                    <i className="ex_thead_user_infor_id">
                                                        ID:1231232
                                                    </i>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="ex_thead_button">
                                            <button>Choose</button>
                                        </th>
                                    </tr>
                                    <tr className="ex_thead_wrap_items">
                                        <th className="ex_thead_title">
                                            <div className="ex_thead_user">
                                                <div className="ex_thead_user_img">
                                                    <img
                                                        src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                        alt="Ảnh"
                                                    />
                                                </div>
                                                <div className="ex_thead_user_infor">
                                                    <div className="ex_thead_user_infor_name">
                                                        Minh Quang
                                                    </div>
                                                    <i className="ex_thead_user_infor_email">
                                                        quangminhnguyen265@gmail.com
                                                    </i>
                                                    <i className="ex_thead_user_infor_id">
                                                        ID:1231232
                                                    </i>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="ex_thead_button">
                                            <button>Choose</button>
                                        </th>
                                    </tr>
                                    <tr className="ex_thead_wrap_items">
                                        <th className="ex_thead_title">
                                            <div className="ex_thead_user">
                                                <div className="ex_thead_user_img">
                                                    <img
                                                        src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                        alt="Ảnh"
                                                    />
                                                </div>
                                                <div className="ex_thead_user_infor">
                                                    <div className="ex_thead_user_infor_name">
                                                        Minh Quang
                                                    </div>
                                                    <i className="ex_thead_user_infor_email">
                                                        quangminhnguyen265@gmail.com
                                                    </i>
                                                    <i className="ex_thead_user_infor_id">
                                                        ID:1231232
                                                    </i>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="ex_thead_button">
                                            <button>Choose</button>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {addLesson && (
                <div className="lessonCreate">
                    <div className="lessonCreate_wrap">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setAddLesson("");
                                    setType("listening");
                                }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <div className="lessonCreate_title">Create Lesson</div>
                        <div className="lessonCreate_type">
                            <div className="lessonCreate_type_form">
                                {type === "listening" ? (
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("listening");
                                            }
                                        }}
                                        id="listening"
                                        type="radio"
                                        name="lesson"
                                        defaultChecked
                                    />
                                ) : (
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("listening");
                                            }
                                        }}
                                        id="listening"
                                        type="radio"
                                        name="lesson"
                                    />
                                )}
                                <label htmlFor="listening">Listening</label>
                            </div>
                            <div className="lessonCreate_type_form">
                                {type === "reading" ? (
                                    <input
                                        id="reading"
                                        type="radio"
                                        name="lesson"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("reading");
                                            }
                                        }}
                                        defaultChecked
                                    />
                                ) : (
                                    <input
                                        id="reading"
                                        type="radio"
                                        name="lesson"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("reading");
                                            }
                                        }}
                                    />
                                )}
                                <label htmlFor="reading">Reading</label>
                            </div>
                            <div className="lessonCreate_type_form">
                                {type === "quiz" ? (
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("quiz");
                                            }
                                        }}
                                        id="quiz"
                                        type="radio"
                                        name="lesson"
                                        defaultChecked
                                    />
                                ) : (
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("quiz");
                                            }
                                        }}
                                        id="quiz"
                                        type="radio"
                                        name="lesson"
                                    />
                                )}
                                <label htmlFor="quiz">Quiz</label>
                            </div>
                        </div>
                        <div className="lessonCreate_form">
                            {type === "listening" && (
                                <Listening
                                    setLesson={setLesson}
                                    lesson={lesson}
                                    addLesson={addLesson}
                                    setAddLesson={setAddLesson}
                                    setType={setType}
                                />
                            )}
                            {type === "reading" && (
                                <Reading
                                    setLesson={setLesson}
                                    lesson={lesson}
                                    addLesson={addLesson}
                                    setAddLesson={setAddLesson}
                                    setType={setType}
                                />
                            )}
                            {type === "quiz" && (
                                <Quiz
                                    setLesson={setLesson}
                                    lesson={lesson}
                                    addLesson={addLesson}
                                    setAddLesson={setAddLesson}
                                    setType={setType}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCourse;
