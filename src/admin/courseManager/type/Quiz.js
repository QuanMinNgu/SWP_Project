import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
const Quiz = () => {
    const [bars, setBars] = useState(false);
    const [edit, setEdit] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [editAnswer, setEditAnswer] = useState(false);
    const [editContentAnswer, setEditContentAnswer] = useState({});
    const editRef = useRef(null);
    const contentRef = useRef(null);
    const answerRef = useRef(null);
    const contentAnswerRef = useRef(null);
    const [editQuesion, setEditQuestion] = useState({});
    const [quesions, setQuesions] = useState([]);
    const handleCreateQuestion = () => {
        if (!contentRef.current.value) {
            return toast.error("Please, enter value.");
        }
        setQuesions([
            ...quesions,
            {
                title: contentRef.current.value,
                answers: [],
            },
        ]);
        contentRef.current.value = "";
        setBars(false);
    };

    const handleRemoveQuestion = (e) => {
        const check = window.confirm(
            "Do you really wanna delete this question?"
        );
        if (check) {
            quesions.splice(e, 1);
            setQuesions([...quesions]);
        }
    };

    const handleEditQuestion = (e) => {
        setEditQuestion({ ...quesions[e], in: e });
        setEdit(true);
    };

    const handleUpdateQuestion = () => {
        if (!editRef.current.value) {
            return toast.error("Please, enter value.");
        }
        const newArr = quesions;
        newArr[editQuesion?.in].title = editRef.current.value;
        setQuesions(newArr);
        setEdit(false);
    };

    const handleCreateAnswer = () => {
        const ind = answer.split("-")[1];
        if (!answerRef.current.value) {
            return toast.error("Please, enter value.");
        }
        const newArr = quesions?.map((item, index) => {
            if (index === ind * 1) {
                item?.answers?.push({
                    title: answerRef.current.value,
                });
                return item;
            }
            return item;
        });
        setQuesions([...newArr]);
        setAnswer(false);
    };
    const handleEditAnswer = ({ childId, parentId }) => {
        setEditContentAnswer({
            title: quesions[parentId].answers[childId]?.title,
            childId: childId,
            parentId: parentId,
        });
        setEditAnswer(true);
    };
    const handleRemoveAnswer = ({ childId, parentId }) => {
        const check = window.confirm(
            "Do you really wanna delete this question?"
        );
        if (check) {
            quesions[parentId].answers.splice(childId, 1);
            setQuesions([...quesions]);
        }
    };

    const handleUpdateAnswer = () => {
        if (!contentAnswerRef.current.value) {
            return toast.error("Please, enter value.");
        }
        const newArr = quesions;
        newArr[editContentAnswer.parentId].answers[
            editContentAnswer.childId
        ].title = contentAnswerRef.current.value;
        setQuesions([...newArr]);
        setEditAnswer(false);
    };
    return (
        <div>
            {quesions?.map((item, index) => (
                <div key={index + "Question"} className="question">
                    <div className="question_title">
                        <b>Question {index + 1}:</b>
                        <span> {item?.title}</span>
                    </div>
                    <div className="button_container">
                        <button
                            onClick={() => {
                                setAnswer("index-" + index);
                            }}
                            style={{ height: "4rem", marginTop: "1rem " }}
                            className="button"
                        >
                            Add Answer
                        </button>
                        <button
                            onClick={() => handleEditQuestion(index)}
                            style={{
                                height: "4rem",
                                marginTop: "1rem ",
                                marginLeft: "1rem",
                            }}
                            className="button button_update"
                        >
                            Edit Question
                        </button>
                        <button
                            onClick={() => handleRemoveQuestion(index)}
                            className="button button_delete"
                            style={{
                                height: "4rem",
                                marginTop: "1rem ",
                                marginLeft: "1rem",
                            }}
                        >
                            Delete Question
                        </button>
                    </div>
                    <div className="answers">
                        {item?.answers?.map((infor, ind) => (
                            <div className="answer_item">
                                <input
                                    id={item?.title + index + ind + "answer"}
                                    type="radio"
                                    name={item?.title + index + "answer"}
                                />
                                <label
                                    htmlFor={
                                        item?.title + index + ind + "answer"
                                    }
                                >
                                    {infor?.title}
                                </label>
                                <button
                                    onClick={() =>
                                        handleEditAnswer({
                                            parentId: index,
                                            childId: ind,
                                        })
                                    }
                                    style={{
                                        height: "3rem",
                                        marginLeft: "1rem",
                                    }}
                                    className="button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleRemoveAnswer({
                                            parentId: index,
                                            childId: ind,
                                        })
                                    }
                                    className="button button_delete"
                                    style={{
                                        height: "3rem",
                                        marginLeft: "1rem",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div
                onClick={() => {
                    setBars(true);
                }}
                className="createQuesion"
            >
                Create New Question
            </div>
            {bars && (
                <div className="lessonCreate_input_form">
                    <div className="lessonCreate_input_form_wrap">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setBars(false);
                                }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <div className="lessonCreate_textarea">
                            <textarea
                                ref={contentRef}
                                placeholder="Enter quesion"
                            />
                        </div>
                        <div className="lessonCreate_button_form">
                            <button
                                onClick={handleCreateQuestion}
                                style={{ height: "4rem" }}
                                className="button"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => {
                                    setBars(false);
                                }}
                                style={{ marginLeft: "1rem" }}
                                className="button cancel_button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {edit && (
                <div className="lessonCreate_input_form">
                    <div className="lessonCreate_input_form_wrap">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setEdit(false);
                                    setEditQuestion({});
                                }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <div className="lessonCreate_textarea">
                            <textarea
                                defaultValue={editQuesion?.title}
                                ref={editRef}
                                placeholder="Enter quesion"
                            />
                        </div>
                        <div className="lessonCreate_button_form">
                            <button
                                onClick={handleUpdateQuestion}
                                style={{ height: "4rem" }}
                                className="button"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => {
                                    setEdit(false);
                                    setEditQuestion({});
                                }}
                                style={{ marginLeft: "1rem" }}
                                className="button cancel_button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {answer && (
                <div className="lessonCreate_input_form">
                    <div className="lessonCreate_input_form_wrap">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setAnswer(false);
                                }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <div className="lessonCreate_textarea">
                            <textarea
                                ref={answerRef}
                                placeholder="Enter answer"
                            />
                        </div>
                        <div className="lessonCreate_button_form">
                            <button
                                onClick={handleCreateAnswer}
                                style={{ height: "4rem" }}
                                className="button"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => {
                                    setAnswer(false);
                                }}
                                style={{ marginLeft: "1rem" }}
                                className="button cancel_button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {editAnswer && (
                <div className="lessonCreate_input_form">
                    <div className="lessonCreate_input_form_wrap">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setEditAnswer(false);
                                    setEditContentAnswer({});
                                }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <div className="lessonCreate_textarea">
                            <textarea
                                defaultValue={editContentAnswer?.title}
                                ref={contentAnswerRef}
                                placeholder="Enter quesion"
                            />
                        </div>
                        <div className="lessonCreate_button_form">
                            <button
                                onClick={handleUpdateAnswer}
                                style={{ height: "4rem" }}
                                className="button"
                            >
                                Update Answer
                            </button>
                            <button
                                onClick={() => {
                                    setEditAnswer(false);
                                    setEditContentAnswer({});
                                }}
                                style={{ marginLeft: "1rem" }}
                                className="button cancel_button"
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

export default Quiz;