import React from "react";
import QuizzCard from "./QuizzCard";
import "./style.scss";
const Quizzlet = () => {
    return (
        <div className="quizz">
            <QuizzCard />
            <QuizzCard />
            <QuizzCard />
        </div>
    );
};

export default Quizzlet;
