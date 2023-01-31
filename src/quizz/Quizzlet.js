import React from "react";
import QuizzCard from "./QuizzCard";
import "./style.scss";
const Quizzlet = () => {
    return (
        <div className="quizz">
            <QuizzCard />
            <QuizzCard />
            <QuizzCard />
            <div className="quizz_button">
                <button title="Bạn muốn nộp bài?">Nộp bài</button>
            </div>
        </div>
    );
};

export default Quizzlet;
