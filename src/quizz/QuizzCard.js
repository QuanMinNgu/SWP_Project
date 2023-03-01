import React from "react";
import "./style.scss";
const QuizzCard = ({ item, index, setQuizLearn, quizLearn }) => {
	const handleChangeAnswer = (e) => {
		const ar = quizLearn.map((infor) => {
			if (infor?.questionID?.toString() === item?.questionID?.toString()) {
				return {
					questionID: infor?.questionID,
					answer: e,
				};
			}
			return infor;
		});
		setQuizLearn([...ar]);
	};
	return (
		<div className="quizzCard">
			<div className="quizzCard_title">
				<b>Quesion {index + 1}: </b>
				<span>{item?.title}</span>
			</div>
			<div className="quizzCard_answer">
				{item?.answers?.map((infor, inde) => (
					<div key={item?.questionID + inde} className="quizzCard_answer_items">
						<input
							onChange={(e) => handleChangeAnswer(infor)}
							name={`${item?.questionID}`}
							id={`${item?.questionID + infor}`}
							type="radio"
						/>
						<label htmlFor={`${item?.questionID + infor}`}>
							{inde === 0 ? "A" : inde === 1 ? "B" : inde === 2 ? "C" : "D"}.
							{infor}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default QuizzCard;
