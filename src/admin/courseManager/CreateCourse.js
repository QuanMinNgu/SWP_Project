import React, {
    useRef,
    useState,
    useCallback,
    useEffect,
    useContext,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import CoursePanelEdit from "../../coursePanel/CoursePanelEdit";
import "../style.scss";
import Listening from "./type/Listening";
import Quiz from "./type/Quiz";
import Reading from "./type/Reading";
import Select from "react-select";
import axios from "axios";
import { UserContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
const CreateCourse = () => {
    const benefitRef = useRef();
    const [benefit, setBenefit] = useState([]);
    const [courseExpert, setCourseExpert] = useState("");
    const [expert, setExpert] = useState(false);
    const [image, setImage] = useState("");
    const [inputForm, setInputForm] = useState(false);
    const [previousLink, setPreviousLink] = useState(false);
    const [lesson, setLesson] = useState([]);
    const imageRef = useRef();
    const lessonRef = useRef();
    const priceRef = useRef();
    const [addLesson, setAddLesson] = useState(false);

    const { cache } = useContext(UserContext);

    const [selectedOption, setSelectedOption] = useState(null);

    const [title, setTitle] = useState("");
    const [contentSmall, setContentSmall] = useState("");

    const dispatch = useDispatch();

    const [types, setTypes] = useState([]);

    let optionsKind = [
        { value: "ha-noi", label: "Software" },
        { value: "strawberry", label: "Financial" },
        { value: "vanilla", label: "Marketing" },
    ];

    useEffect(() => {
        if (types) {
            optionsKind = types?.map((item) => {
                return {
                    value: item?.id,
                    label: item?.title,
                };
            });
        }
    }, [types]);
    const [courseExperts, setCourseExperts] = useState([]);

    useEffect(() => {
        let here = true;
        const url = "/api/type_course";
        if (cache.current[url]) {
            return setTypes(cache.current[url]);
        }
        dispatch(isLoading());
        axios
            .get(url)
            .then((res) => {
                if (!here) {
                    return;
                }
                setTypes(res?.data?.types);
                cache.current[url] = res?.data?.types;
                dispatch(isSuccess());
            })
            .catch((err) => {
                dispatch(isFailing());
            });
        return () => {
            here = false;
        };
    }, []);

    useEffect(() => {
        let here = true;
        const url = "/api/account/course_expert";
        if (cache.current[url]) {
            return setCourseExperts(cache.current[url]);
        }
        dispatch(isLoading());
        axios
            .get(url)
            .then((res) => {
                if (!here) {
                    return dispatch(isSuccess());
                }
                setCourseExperts(res?.data?.types);
                cache.current[url] = res?.data?.types;
                dispatch(isSuccess());
            })
            .catch((err) => {
                dispatch(isFailing());
            });
        return () => {
            here = false;
        };
    }, []);

    const [urlArray, setUrlArray] = useState([]);

    const [numberOfLesson, setNumberOfLesson] = useState({
        num: 0,
        time: 0,
    });
    const urlArrayRef = useRef([]);

    const [type, setType] = useState("listening");

    const handleCreateBenefit = () => {
        if (!benefitRef.current.value) {
            return toast.error("Please, enter information.");
        }
        setBenefit([...benefit, benefitRef.current?.value]);
        benefitRef.current.value = "";
    };

    const handleChooseExpert = (item) => {
        const check = window.confirm(
            "Bạn có muốn chọn Minh Quang thành course expert của khóa học này không?"
        );
        if (check) {
            setCourseExpert({
                ...item,
            });
            setExpert(false);
        }
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

    const onDrop = useCallback((acceptedFiles) => {
        const url = URL.createObjectURL(acceptedFiles[0]);
        if (image) {
            URL.revokeObjectURL(image);
        }
        imageRef.current = acceptedFiles[0];
        setImage(url);
    }, []);

    useEffect(() => {
        let coun = 0;
        let tim = 0;
        lesson?.forEach((item) => {
            coun += item?.numLesson?.length;
            item?.numLesson?.forEach((item) => {
                if (item?.type === "listening") {
                    tim += item?.time;
                }
            });
        });
        setNumberOfLesson({
            num: coun,
            time: tim,
        });
    }, [lesson]);

    const auth = useSelector((state) => state.auth);

    const lessonLengthRef = useRef();
    const numOfLessonRef = useRef();
    const timeOfLessonRef = useRef();

    const handleCreateNewCourse = async () => {
        let contentArr = contentSmall + "--?--";
        benefit.forEach((item) => {
            contentArr += item + "--?--";
        });
        contentArr += lessonLengthRef.current.innerHTML + "--?--";
        contentArr += numOfLessonRef.current.innerHTML + "--?--";
        contentArr += numberOfLesson?.time;

        let urlImage = "";
        if (imageRef.current) {
            const formData = new FormData();
            formData.append("file", imageRef.current);
            formData.append("upload_preset", "sttruyenxyz");
            try {
                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/sttruyen/image/upload",
                    formData
                );
                urlImage = "https:" + res.data.url.split(":")[1];
            } catch (err) {
                return;
            }
        }
        const product = {
            title: title,
            content: contentArr,
            lessons: lesson,
            image: urlImage,
            courseExpert: courseExpert?.id,
            kind: selectedOption?.value,
            price: priceRef.current.innerHTML * 1,
        };

        console.log(product);
        dispatch(isLoading());
        try {
            const data = await axios.post("/api/course/create", {
                title: title,
                content: contentArr,
                courseExpert: courseExpert?.id,
                kind: selectedOption?.value,
                price: priceRef.current.innerHTML * 1,
                token: auth.user?.accessToken,
            });
            dispatch(isSuccess());
            toast.success(data?.data?.msg);
            handleCreatePakages(data?.data?.id);
        } catch (err) {
            toast.error(err?.response?.data?.msg);
            dispatch(isFailing());
        }
    };

    useEffect(() => {
        console.log(lesson);
    }, [lesson]);

    const handleCreatePakages = async (id) => {
        dispatch(isLoading());
        console.log(lesson);
        try {
            const data = await axios.post(
                `/api/course/update_pakage?id=${id}`,
                {
                    lessons: lesson,
                    token: auth.user?.accessToken,
                }
            );
            dispatch(isSuccess());
            toast.success(data?.data?.msg);
            handleCreatePakages(data?.data?.id);
        } catch (err) {
            toast.error(err?.response?.data?.msg);
            dispatch(isFailing());
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <div className="managerCourse">
            <div className="row">
                <div className="col c-12 m-8 l-8">
                    <div className="newPost_title">
                        <div
                            className="newPost_title_edit"
                            contentEditable={true}
                            onInput={(e) => {
                                setTitle(e.target.innerHTML);
                            }}
                        ></div>
                        {!title && (
                            <div className="newPost_title_content">Tiêu đề</div>
                        )}
                    </div>
                    <div className="newPost_title">
                        <div
                            className="newPost_title_edit_meta"
                            contentEditable={true}
                            onInput={(e) => {
                                setContentSmall(e.target.innerHTML);
                            }}
                        ></div>
                        {!contentSmall && (
                            <div className="newPost_title_content_meta">
                                Nội dung
                            </div>
                        )}
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
                    <ul id="benefit" className="course_detail_learn_items">
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
                                <b ref={lessonLengthRef}>{lesson?.length}</b>{" "}
                                Pakages
                            </li>
                            <li>.</li>
                            <li>
                                <b ref={numOfLessonRef}>
                                    {numberOfLesson?.num}
                                </b>{" "}
                                Lessons
                            </li>
                            <li>.</li>
                            <li>
                                Times{" "}
                                <b ref={timeOfLessonRef}>{`${
                                    Math.floor(numberOfLesson?.time / 3600) < 10
                                        ? "0"
                                        : ""
                                }${Math.floor(numberOfLesson?.time / 3600)} :
                                
                                ${
                                    Math.floor(numberOfLesson?.time / 3600) > 0
                                        ? `${
                                              Math.floor(
                                                  numberOfLesson?.time / 60
                                              ) -
                                                  Math.floor(
                                                      numberOfLesson?.time /
                                                          3600
                                                  ) *
                                                      60 <
                                              10
                                                  ? "0"
                                                  : ""
                                          }${
                                              Math.floor(
                                                  numberOfLesson?.time / 60
                                              ) -
                                              Math.floor(
                                                  numberOfLesson?.time / 3600
                                              ) *
                                                  60
                                          }`
                                        : `${
                                              Math.floor(
                                                  numberOfLesson?.time / 60
                                              ) < 10
                                                  ? "0"
                                                  : ""
                                          }${Math.floor(
                                              numberOfLesson?.time / 60
                                          )}`
                                } : ${
                                    Math.floor(numberOfLesson?.time) -
                                        Math.floor(numberOfLesson?.time / 60) *
                                            60 <
                                    10
                                        ? "0"
                                        : ""
                                }${
                                    Math.floor(numberOfLesson?.time) -
                                    Math.floor(numberOfLesson?.time / 60) * 60
                                }`}</b>
                            </li>
                        </ul>
                    </div>
                    <div className="CoursePanel">
                        {lesson?.map((item, index) => (
                            <CoursePanelEdit
                                setUrlArray={setUrlArray}
                                urlArray={urlArray}
                                urlArrayRef={urlArrayRef.current}
                                setLesson={setLesson}
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
                    <div
                        className="course_detail_price"
                        ref={priceRef}
                        contentEditable={true}
                    >
                        Enter Price
                    </div>
                    <div className="course_detail_button">
                        <button
                            onClick={handleCreateNewCourse}
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
                <div
                    onClick={() => {
                        setExpert(false);
                    }}
                    className="user_manager_information"
                ></div>
            )}
            {expert && (
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
                                {courseExperts?.map((item) => (
                                    <tr
                                        key={item?.id + "courseExperts"}
                                        className="ex_thead_wrap_items"
                                    >
                                        <th className="ex_thead_title">
                                            <div className="ex_thead_user">
                                                <div className="ex_thead_user_img">
                                                    <img
                                                        src={item?.image}
                                                        alt="Ảnh"
                                                    />
                                                </div>
                                                <div className="ex_thead_user_infor">
                                                    <div className="ex_thead_user_infor_name">
                                                        {item?.name}
                                                    </div>
                                                    <i className="ex_thead_user_infor_email">
                                                        {item?.gmail}
                                                    </i>
                                                    <i className="ex_thead_user_infor_id">
                                                        ID:{item?.id}
                                                    </i>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="ex_thead_button">
                                            <button
                                                onClick={() =>
                                                    handleChooseExpert(item)
                                                }
                                            >
                                                Choose
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                    urlArray={urlArray}
                                    setUrlArray={setUrlArray}
                                    urlArrayRef={urlArrayRef.current}
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
                    {type === "reading" && (
                        <div
                            onClick={() => {
                                setPreviousLink(true);
                            }}
                            className="previousLink"
                        >
                            Previous Upload File Link
                        </div>
                    )}
                    {type === "reading" && previousLink && (
                        <div className="lessonCreate previousLink_form">
                            <div className="previousLink_wrap">
                                <div className="expertCourse_close">
                                    <div
                                        onClick={() => {
                                            setPreviousLink(false);
                                        }}
                                        className="expertCourse_close_icons"
                                    >
                                        &times;
                                    </div>
                                </div>
                                <div className="previousLink_list">
                                    <ul>
                                        {urlArrayRef.current?.map(
                                            (item, index) => (
                                                <li key={index + "listArray"}>
                                                    <a href="#">{item}</a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateCourse;
