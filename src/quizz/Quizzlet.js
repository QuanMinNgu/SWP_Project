import React, { useEffect, useState } from "react";
import QuizzCard from "./QuizzCard";
import "./style.scss";
const Quizzlet = () => {
    const [quiz, setQuiz] = useState(false);

    const [times, setTimes] = useState(1800);

    useEffect(() => {
        if (quiz) {
            if (times < 1) {
                return window.alert("End time man");
            }
            const timesInterval = setInterval(() => {
                setTimes((prev) => {
                    if (prev < 1) {
                        return prev;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => {
                clearInterval(timesInterval);
            };
        }
    }, [times, quiz]);
    return (
        <div className="quizz">
            {!quiz ? (
                <div className="quizz_form">
                    <div>
                        <div className="quiz_title">
                            <span>Managing Safety and Security Risks Quiz</span>
                        </div>
                        <div className="quiz_times">
                            <span>
                                <i>Quiz . 30m</i>
                            </span>
                        </div>
                        <div className="quiz_content">
                            <div className="quiz_content_content">
                                <i>
                                    Managing Safety and Security Risks Quiz for
                                    this content Managing Safety and Security
                                    Risks Quiz
                                </i>
                            </div>
                            <div className="quiz_content_button">
                                <button
                                    onClick={() => {
                                        setQuiz(true);
                                    }}
                                    style={{
                                        height: "7rem",
                                        padding: "0 3rem",
                                        fontSize: "1.6rem",
                                    }}
                                    className="button"
                                >
                                    Join to the Quizz
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="quiz_abs">
                    <div className="quiz_abs_container">
                        <div className="quizz_time">
                            <span>Thời gian còn lại </span>
                            <i>
                                {Math.floor(times / 60) < 10 && "0"}
                                {Math.floor(times / 60)} :{" "}
                                {times - Math.floor(times / 60) * 60 < 10 &&
                                    "0"}
                                {times - Math.floor(times / 60) * 60}
                            </i>
                        </div>
                        <div className="quiz_abs_card_container">
                            <QuizzCard />
                            <QuizzCard />
                            <QuizzCard />
                            <QuizzCard />
                            <QuizzCard />
                            <QuizzCard />
                            <QuizzCard />
                            <div className="quiz_abs_card_button_save">
                                <button
                                    onClick={() => {
                                        setQuiz(false);
                                    }}
                                    style={{
                                        padding: "0 9rem",
                                        height: "5rem",
                                        fontSize: "2rem",
                                        borderRadius: "3rem",
                                    }}
                                    className="button"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quizzlet;
