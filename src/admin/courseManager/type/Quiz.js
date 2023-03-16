import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const Quiz = ({ setLesson, lesson, addLesson, setAddLesson, setType }) => {
	const [bars, setBars] = useState(false);
	const [edit, setEdit] = useState(false);
	const [answer, setAnswer] = useState(false);
	const [editAnswer, setEditAnswer] = useState(false);
	const [create, setCreate] = useState(false);

	const [editContentAnswer, setEditContentAnswer] = useState({});

	const titleRef = useRef(null);
	const editRef = useRef(null);
	const contentRef = useRef(null);
	const answerRef = useRef(null);
	const contentAnswerRef = useRef(null);
	const timesRef = useRef();
	const contentQuizRef = useRef();

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
				correctAnswer: 0,
				questionID: null,
			},
		]);
		contentRef.current.value = "";
		setBars(false);
	};

	const handleRemoveQuestion = (e) => {
		const check = window.confirm("Do you really wanna delete this question?");
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
				item?.answers?.push(answerRef.current.value);
				return item;
			}
			return item;
		});
		setQuesions([...newArr]);
		setAnswer(false);
	};
	const handleEditAnswer = ({ childId, parentId }) => {
		setEditContentAnswer({
			title: quesions[parentId].answers[childId],
			childId: childId,
			parentId: parentId,
		});
		setEditAnswer(true);
	};
	const handleRemoveAnswer = ({ childId, parentId }) => {
		const check = window.confirm("Do you really wanna delete this question?");
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
		newArr[editContentAnswer.parentId].answers[editContentAnswer.childId] =
			contentAnswerRef.current.value;
		setQuesions([...newArr]);
		setEditAnswer(false);
	};

	const handleChangeAnswer = (e, { parentid, childId }) => {
		if (e.target.checked) {
			const arr = quesions;
			arr[parentid].correctAnswer = childId;
			setQuesions([...arr]);
		}
	};

	const handleCreateQuiz = () => {
		if (
			!titleRef.current.value ||
			!contentQuizRef.current.value ||
			!timesRef.current.value
		) {
			return toast.error("Please enter value.");
		}
		if (quesions?.length == 0) {
			return toast.error("Please enter question.");
		}
		let here = false;
		quesions?.forEach((item) => {
			if (item?.answers?.length == 0) {
				here = true;
			}
		});
		if (here) {
			return toast.error("Question need to have at least one answer.");
		}
		const arr = lesson;
		const inde = addLesson.index;
		if (addLesson.type === "create") {
			arr[inde].numLesson.push({
				title: titleRef.current.value,
				type: "quiz",
				value: [...quesions],
				description: contentQuizRef.current.value,
				link: null,
				time: timesRef.current.value * 1,
				lessonID: null,
			});
		} else {
			arr[inde].numLesson.splice(addLesson?.childId, 0, {
				title: titleRef.current.value,
				type: "quiz",
				value: [...quesions],
				description: contentQuizRef.current.value,
				link: null,
				time: timesRef.current.value * 1,
				lessonID: null,
			});
		}
		setLesson([...arr]);
		setCreate(false);
		setAddLesson("");
		setType("listening");
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
									onChange={(e) =>
										handleChangeAnswer(e, {
											parentid: index,
											childId: ind,
										})
									}
									id={item + index + ind + "answer"}
									type="radio"
									name={item + index + "answer"}
									defaultChecked={ind === 0 ? true : false}
								/>
								<label htmlFor={item + index + ind + "answer"}>{infor}</label>
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
							<textarea ref={contentRef} placeholder="Enter quesion" />
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
							<textarea ref={answerRef} placeholder="Enter answer" />
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
			<div className="lesson_create_button">
				<button
					onClick={() => {
						setCreate(true);
					}}
					className="button_create"
				>
					Create
				</button>
			</div>
			{create && (
				<div className="lessonCreate_input_form">
					<div className="lessonCreate_input_form_wrap">
						<div className="expertCourse_close">
							<div
								onClick={() => {
									setCreate(false);
								}}
								className="expertCourse_close_icons"
							>
								&times;
							</div>
						</div>
						<div className="lessonCreate_textarea">
							<textarea
								style={{
									minHeight: "8rem",
									marginBottom: "3rem",
								}}
								ref={titleRef}
								placeholder="Enter title of this quiz"
							/>
						</div>
						<div className="lessonCreate_textarea">
							<textarea
								ref={contentQuizRef}
								placeholder="Enter content of this quiz"
							/>
						</div>
						<div className="lessonCreate_input">
							<input
								ref={timesRef}
								type="number"
								placeholder="Enter times of quiz (second)"
							/>
						</div>
						<div className="lessonCreate_button_form">
							<button
								onClick={handleCreateQuiz}
								style={{ height: "4rem" }}
								className="button"
							>
								Create Quiz
							</button>
							<button
								onClick={() => {
									setCreate(false);
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
