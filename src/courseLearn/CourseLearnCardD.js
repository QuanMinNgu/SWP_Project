import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const CourseLearnCardD = ({ item, index, course, parentID }) => {
	const navigate = useNavigate();

	const [check, setCheck] = useState(false);
	const [checkNew, setCheckNew] = useState(false);

	const { courseid } = useParams();

	useEffect(() => {
		if (parentID + 1 < course?.currentLearningPackage) {
			setCheck(true);
		} else if (parentID + 1 === course?.currentLearningPackage) {
			if (index < course?.currentLearningLesson) {
				setCheck(true);
			} else if (index === course?.currentLearningLesson) {
				setCheckNew(true);
			}
		}
	}, [item]);

	return (
		<div
			onClick={() => {
				if (check || checkNew) {
					navigate(`/learning/${courseid}/${item?.lessonID}`);
				} else {
					toast.error("Please learn a lesson above first.");
				}
			}}
			className={`CourseLearnCardDetail ${check ? "active" : ""}`}
		>
			<div className="CourseLearnCardDetail_head">
				<div>
					{index + 1}. {item?.title}
				</div>
				<div className="CourseLearnCardDetail_icons">
					<i
						className={`fa-solid ${
							item?.type === "listening"
								? "fa-circle-play"
								: item?.type === "reading"
								? "fa-book"
								: "fa-circle-question"
						}`}
					></i>
				</div>
			</div>
			{check ? (
				<div className="CourseLearnCardDetail_body">
					<i className="fa-solid fa-check"></i>
				</div>
			) : checkNew ? (
				<div
					style={{ backgroundColor: "#9AD0F5" }}
					className="CourseLearnCardDetail_body"
				></div>
			) : (
				<div
					style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
					className="CourseLearnCardDetail_body"
				>
					<i className="fa-solid fa-lock"></i>
				</div>
			)}
		</div>
	);
};

export default CourseLearnCardD;
